import AlbumCover from "../../src/album_cover";
import beatlesData from "../../src/data/beatles";


describe("AlbumCover class", () => {
  test("Instantiate with constructor", () => {
    let urlSmall = "https//whatever.com/small_image.jpg"
    let urlLarge = "https//whatever.com/large_image.jpg"
    let albumCover = new AlbumCover({ urlSmall, urlLarge })
    expect(albumCover.urlSmall).toBe(urlSmall);
    expect(albumCover.urlLarge).toBe(urlLarge);
  });

  test("Instantiate with Spotify Data from API", () => {
    let covers = beatlesData.items[0].images
    let albumCover = new AlbumCover().addFromSpotifyData(covers)
    expect(albumCover.urlSmall).toBe(covers[covers.length-1].url);
    expect(albumCover.urlLarge).toBe(covers[0].url);
  });
});
