import Discography from "../../src/discography";
import beatlesData from "../../src/data/beatles.json";

let beatlesDisco;

beforeEach(() => {
  beatlesDisco = new Discography().fromSpotifyJsonData(beatlesData);
});

test("instantiate class with spotify json data", () => {
  expect(beatlesDisco.name).toBe("The Beatles");
  expect(beatlesDisco.albumList.length).toBe(beatlesData.items.length);
  expect(beatlesDisco.earliestRelease).toBe(1963);
  expect(beatlesDisco.latestRelease).toBe(2019);
});

test("renderAlbum()", () => {
  const album = beatlesData.items[0];
  const outputEl = beatlesDisco.renderAlbum(album);
  expect(outputEl.dataset.discographyAlbum).toBe(album.id);
  expect(outputEl.innerHTML).toContain(album.images[2].url);
});

test("render() output a DOM node", () => {
  const outputEl = beatlesDisco.render();
  expect(outputEl.getAttribute("data-discography")).toBe("the-beatles");
  expect(outputEl.className).toContain("timeline");
  expect(outputEl.innerHTML).toContain("The Beatles");
});
