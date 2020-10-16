import AlbumCover from "../../src/album_cover";
import beatlesAlbums from "../../src/data/beatles_albums";

describe("AlbumCover class", () => {
  describe("Instantiation/Creation", () => {
    test("With constructor (based on spotify data from api with 3 images size)", () => {
      let covers = beatlesAlbums.items[0].images;
      let albumCover = new AlbumCover(covers);
      expect(albumCover.urlSmall).toBe(covers[covers.length - 1].url);
      expect(albumCover.urlMedium).toBe(covers[1].url);
      expect(albumCover.urlLarge).toBe(covers[0].url);
    });
    test("With constructor (based on spotify data from api with only 2 images size)", () => {
      let covers = beatlesAlbums.items[0].images;
      covers[2].url = "";
      let albumCover = new AlbumCover(covers);
      expect(albumCover.urlSmall).toBe(covers[1].url); // Match with the larger one
      expect(albumCover.urlMedium).toBe(covers[1].url);
      expect(albumCover.urlLarge).toBe(covers[0].url);
    });
  });
  describe("Render method", () => {
    let albumCover: AlbumCover;

    beforeEach(() => {
      let covers = beatlesAlbums.items[0].images;
      albumCover = new AlbumCover(covers);
    });

    test("Return an HTML Element", () => {
      let html = albumCover.render();
      expect(html instanceof HTMLElement).toBeTruthy();
      expect(html.tagName).toBe("IMG");
      expect(html.src).toContain(albumCover.urlSmall);
    });
  });
});
