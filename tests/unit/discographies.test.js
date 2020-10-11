import Discography from "../../src/discography";
import Discographies from "../../src/discographies";
import beatlesData from "../../src/data/beatles.json";
import rollingStonesData from "../../src/data/rollingstones.json";

let beatlesDisco;
let rollingStonesDisco;

beforeEach(() => {
  beatlesDisco = new Discography().fromSpotifyJsonData(beatlesData);
  rollingStonesDisco = new Discography().fromSpotifyJsonData(rollingStonesData);
});

test("instantiate class by adding discography", () => {
  let discographies = new Discographies();
  discographies.add(beatlesDisco);
  discographies.add(rollingStonesDisco);
  expect(discographies.list.length).toBe(2);
  expect(discographies.list[0]).toBe(beatlesDisco);
  expect(discographies.list[1]).toBe(rollingStonesDisco);
});

test("set earliest and latest release year of all discographies", () => {
  let discographies = new Discographies();
  discographies.add(beatlesDisco);
  discographies.add(rollingStonesDisco);
  expect(discographies.earliestRelease).toBe(1963);
  expect(discographies.latestRelease).toBe(2020);
});
