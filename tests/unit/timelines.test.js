import Discography from "../../src/discography";
import Timelines from "../../src/timelines";
import beatlesData from "../../src/data/beatles.json";
import rollingStonesData from "../../src/data/rollingstones.json";

let beatlesDisco;
let rollingStonesDisco;

beforeEach(() => {
  beatlesDisco = new Discography().fromSpotifyJsonData(beatlesData);
  rollingStonesDisco = new Discography().fromSpotifyJsonData(rollingStonesData);
});

test("instantiate class by adding discography", () => {
  let timelines = new Timelines();
  timelines.add(beatlesDisco);
  timelines.add(rollingStonesDisco);
  expect(timelines.discographies.length).toBe(2);
  expect(timelines.discographies[0]).toBe(beatlesDisco);
  expect(timelines.discographies[1]).toBe(rollingStonesDisco);
});

test("set earliest and latest release year of all discographies", () => {
  let timelines = new Timelines();
  timelines.add(beatlesDisco);
  timelines.add(rollingStonesDisco);
  expect(timelines.earliestRelease).toBe(1963);
  expect(timelines.latestRelease).toBe(2020);
});

test("render() output a DOM node", () => {});
