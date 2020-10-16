import Album from "../../src/album";
import AlbumCover from "../../src/album_cover";
import beatlesData from "../../src/data/beatles";

describe("Album class", () => {
  describe("Instantiation/Creation", () => {
    test("With constructor", () => {
      let albumCovers = new AlbumCover({
        urlSmall: "urlSmall",
        urlLarge: "urlLarge",
      });
      let album = new Album({
        id: "1",
        name: "Please Please me",
        releaseYear: 1963,
        releaseMonth: 3,
        covers: albumCovers,
      });
      expect(album.id).toBe("1");
      expect(album.name).toBe("Please Please me");
      expect(album.releaseYear).toBe(1963);
      expect(album.releaseMonth).toBe(3);
      expect(album.covers).toBe(albumCovers);
    });

    test("With Spotify Data", () => {
      let beatlesAlbum = beatlesData.items[0];
      let album = new Album().addFromSpotifyData(beatlesAlbum);
      expect(album.id).toBe(beatlesAlbum.id);
      expect(album.name).toBe(beatlesAlbum.name);
      expect(album.releaseYear).toBe(2019);
      expect(album.releaseMonth).toBe(9);
      expect(album.covers.urlLarge).toBe(beatlesAlbum.images[0].url);
    });

    test("With Spotify Data but with release year only (not month)", () => {
      let beatlesAlbum = beatlesData.items[1];
      beatlesAlbum.release_date = "2000";
      let album = new Album().addFromSpotifyData(beatlesAlbum);
      expect(album.releaseYear).toBe(2000);
      expect(album.releaseMonth).toBe(0);
    });
  });

  describe("Render()", () => {
    let album: Album;

    beforeEach(() => {
      let beatlesAlbum = beatlesData.items[0];
      album = new Album().addFromSpotifyData(beatlesAlbum);
    });

    test("Return an HTML Element", () => {
      let html = album.render();
      expect(html instanceof HTMLElement).toBeTruthy();
      expect(html.id).toBe(album.id);
      expect(html.dataset.album).not.toBeUndefined();
      expect(html.innerHTML).toContain(album.covers.urlSmall);
    });
  });
});

//
