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

test("generateYearsArray()", () => {
  const yearsArr = timelines.generateYearsArray();
  expect(yearsArr[0]).toBe(1963);
  expect(yearsArr[yearsArr.length - 1]).toBe(2020);
  expect(yearsArr.length).toBe(2020 - 1963 + 1);
});

test("renderTimelineAxis() output a DOM node", () => {
  const outputEl = timelines.renderTimelineAxis();
  expect(outputEl.dataset.timeline).toBe("axis");
  expect(outputEl.innerHTML).toContain("1963");
  expect(outputEl.innerHTML).toContain("1986");
  expect(outputEl.innerHTML).toContain("2020");
  expect(outputEl.className).toContain("timeline");
});

test("render() output a DOM node", () => {
  const outputEl = timelines.render();
  function findAttribute(attr, value) {
    return Array.from(outputEl.childNodes).find(
      (el) => el.dataset[attr] == value
    );
  }
  expect(outputEl.id).toBe("timelines");
  expect(findAttribute("timeline", "axis")).toBeTruthy();
  expect(findAttribute("discography", "the-beatles")).toBeTruthy();
  expect(findAttribute("discography", "the-rolling-stones")).toBeTruthy();
});
