import Artist from "../../src/album";
import beatlesData from "../../src/data/beatles";

describe("Artist class", () => {
  describe("Instantiation/Creation", () => {
    test("With constructor", () => {});

    test("With Spotify Data", () => {
      let artist = new Artist().addFromSpotifyData(beatlesData);
      expect(artist.id).toBe();
      expect(artist.name).toBe();
      expect(artist.discography).toBe();
      expect(artist.earliestRelease).toBe();
      expect(artist.latestRelease).toBe();
    });
  });

  //   describe("Render()", () => {
  //     let album: Album;

  //     beforeEach(() => {
  //       let beatlesAlbum = beatlesData.items[0];
  //       album = new Album().addFromSpotifyData(beatlesAlbum);
  //     });

  //     test("Return an HTML Element", () => {
  //       let html = album.render();
  //       expect(html instanceof HTMLElement).toBeTruthy();
  //       expect(html.id).toBe(album.id);
  //       expect(html.dataset.album).not.toBeUndefined();
  //       expect(html.innerHTML).toContain(album.covers.urlSmall);
  //     });
  //   });
});

//
