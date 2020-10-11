import Discography from "../../src/discography";
import Timelines from "../../src/timelines";
import beatlesData from "../../src/data/beatles.json";
import rollingStonesData from "../../src/data/rollingstones.json";

let beatlesDisco;
let rollingStonesDisco;
let timelines;

beforeEach(() => {
  beatlesDisco = new Discography().fromSpotifyJsonData(beatlesData);
  rollingStonesDisco = new Discography().fromSpotifyJsonData(rollingStonesData);
  timelines = new Timelines();
  timelines.add(beatlesDisco);
  timelines.add(rollingStonesDisco);
});

test("instantiate class by adding discography", () => {
  expect(timelines.discographies.length).toBe(2);
  expect(timelines.discographies[0]).toBe(beatlesDisco);
  expect(timelines.discographies[1]).toBe(rollingStonesDisco);
});

test("set earliest and latest release year of all discographies", () => {
  expect(timelines.earliestRelease).toBe(1963);
  expect(timelines.latestRelease).toBe(2020);
});

test("render() output a DOM node", () => {
  const outputEl = timelines.render();
  expect(outputEl.id).toBe("timelines");
  expect(outputEl.innerHTML).toContain("The Beatles");
  expect(outputEl.innerHTML).toContain("The Rolling Stones");
  const childNodesArray = Array.from(outputEl.childNodes);
  expect(
    childNodesArray.find((el) => el.getAttribute("data-timeline") == "axis")
  ).toBeTruthy();
  expect(outputEl.innerHTML).toContain("1962"); // 1 year before earliest release
  expect(outputEl.innerHTML).toContain("1986"); // random year
  expect(outputEl.innerHTML).toContain("2021"); // A year after latest release
});
