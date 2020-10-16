import Artist from "../../src/artist";
import beatlesArtists from "../../src/data/beatles_artists";
import beatlesAlbums from "../../src/data/beatles_albums";
import Album from "../../src/album";

describe("Artist class", () => {
  describe("Instantiation/Creation", () => {
    test("With constructor (based on spotify data from api)", () => {
      let beatlesArtist = beatlesArtists.items[0];
      let artist = new Artist(beatlesArtist);
      expect(artist.id).toBe(beatlesArtist.id);
      expect(artist.name).toBe(beatlesArtist.name);
      expect(artist.spotifyUri).toBe(beatlesArtist.uri);
      expect(artist.imageUrl).toBe(beatlesArtist.images[1].url);
    });
  });
  describe("When instantiated", () => {
    let artist: Artist;

    beforeEach(() => {
      let beatlesArtist = beatlesArtists.items[0];
      artist = new Artist(beatlesArtist);
      artist.addDiscography(beatlesAlbums.items);
    });

    describe("Add Discography method", () => {
      test("Discography property should not be empty anymore", () => {
        expect(artist.discography[0] instanceof Album).toBeTruthy();
        expect(artist.discography.length).toBeGreaterThan(10);
      });

      test("Discography should be sort chronologically (from earliest to latest release", () => {
        let discoLen = artist.discography.length;
        //when year precision is enough
        expect(artist.discography[discoLen - 1].releaseYear).toBeGreaterThan(
          artist.discography[discoLen - 2].releaseYear
        );
        //when month precision is required
        expect(artist.discography[1].releaseYear).toBe(
          artist.discography[0].releaseYear
        );
        expect(artist.discography[1].releaseMonth).toBeGreaterThan(
          artist.discography[0].releaseMonth
        );
      });

      test("Earliest and Latest release property should be set", () => {
        expect(artist.earliestReleaseYear).toBe(1963);
        expect(artist.latestReleaseYear).toBe(2019);
      });

      test("Discography should not have duplicates", () => {
        let findings = [];
        artist.discography.forEach((album) => {
          if (album.name.includes("Sgt. Pepper")) {
            findings.push(album);
          }
        });
        expect(findings.length).toBe(1);
      });
    });

    describe("Render()", () => {
      test("Return an HTML Element", () => {
        let html = artist.render();
        expect(html instanceof HTMLElement).toBeTruthy();
        expect(html.id).toBe(artist.id);
        expect(html.dataset.artist).toBe("the-beatles");
      });
      test("HTML Element have two nodes", () => {
        let html = artist.render();
        expect(html.childNodes.length).toBe(2);
        expect(html.children[0].getAttribute("data-artist-name")).toBe("");
        expect(html.children[1].getAttribute("data-artist-discography")).toBe(
          ""
        );
      });
      test("ArtistName node should contain the name of the artist", () => {
        let html = artist.render();
        expect(html.children[0].innerHTML).toContain("The Beatles");
      });
      test("ArtistDiscography node should contain the albums info", () => {
        let html = artist.render();
        expect(html.children[1].children.length).toBe(
          artist.discography.length
        );
        expect(html.children[1].innerHTML).toContain(
          beatlesAlbums.items[0].images[2].url
        );
        expect(html.children[1].innerHTML).toContain(
          beatlesAlbums.items[5].images[2].url
        );
      });
    });
  });
});
