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

test("render() output a DOM node", () => {
  const outputEl = beatlesDisco.render();
  expect(outputEl.getAttribute("data-timeline")).toBe("the-beatles");
  expect(outputEl.innerHTML).toContain("The Beatles");
});
