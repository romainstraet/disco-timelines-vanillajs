import Album from "../../src/album";
import beatlesAlbums from "../../src/data/beatles_albums";

describe("Album class", () => {
  describe("Instantiation/Creation", () => {
    test("With constructor (based on spotify data from api)", () => {
      let beatlesAlbum = beatlesAlbums.items[0];
      let album = new Album(beatlesAlbum);
      expect(album.id).toBe(beatlesAlbum.id);
      expect(album.name).toBe(beatlesAlbum.name);
      expect(album.releaseYear).toBe(2019);
      expect(album.releaseMonth).toBe(9);
      expect(album.covers.urlLarge).toBe(beatlesAlbum.images[0].url);
      expect(album.spotifyUri).toBe(beatlesAlbum.uri);
    });

    test("With constructor (based on spotify data from api with less precised release date)", () => {
      let beatlesAlbum = beatlesAlbums.items[1];
      beatlesAlbum.release_date = "2000";
      let album = new Album(beatlesAlbum);
      expect(album.releaseYear).toBe(2000);
      expect(album.releaseMonth).toBe(0);
    });
  });

  describe("Render method", () => {
    let album: Album;

    beforeEach(() => {
      let beatlesAlbum = beatlesAlbums.items[0];
      album = new Album(beatlesAlbum);
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
