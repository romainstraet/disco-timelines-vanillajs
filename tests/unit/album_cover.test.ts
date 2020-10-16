import AlbumCover from "../../src/album_cover";
import beatlesData from "../../src/data/beatles";

describe("AlbumCover class", () => {
  describe("Instantiation/Creation", () => {
    test("With constructor", () => {
      let urlSmall = "https//whatever.com/small_image.jpg";
      let urlLarge = "https//whatever.com/large_image.jpg";
      let albumCover = new AlbumCover({ urlSmall, urlLarge });
      expect(albumCover.urlSmall).toBe(urlSmall);
      expect(albumCover.urlLarge).toBe(urlLarge);
    });

    test("With Spotify Data", () => {
      let covers = beatlesData.items[0].images;
      let albumCover = new AlbumCover().addFromSpotifyData(covers);
      expect(albumCover.urlSmall).toBe(covers[covers.length - 1].url);
      expect(albumCover.urlLarge).toBe(covers[0].url);
    });
  });
  describe("Render()", () => {
    let albumCover: AlbumCover;

    beforeEach(() => {
      let covers = beatlesData.items[0].images;
      albumCover = new AlbumCover().addFromSpotifyData(covers);
    });

    test("Return an HTML Element", () => {
      let html = albumCover.render();
      expect(html instanceof HTMLElement).toBeTruthy();
      expect(html.tagName).toBe("IMG");
      expect(html.src).toContain(albumCover.urlSmall);
    });
  });
});
