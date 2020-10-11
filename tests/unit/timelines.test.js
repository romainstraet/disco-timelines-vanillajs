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
  expect(yearsArr[0]).toBe(1962); // 1 year before earliest release
  expect(yearsArr[yearsArr.length - 1]).toBe(2021); // A year after latest release
  expect(yearsArr.length).toBe(2021 - 1962 + 1);
});

test("renderTimelineAxis()", () => {
  const outputEl = timelines.renderTimelineAxis();
  expect(outputEl.getAttribute("data-timeline")).toBe("axis");
  expect(outputEl.innerHTML).toContain("1962");
  expect(outputEl.innerHTML).toContain("1986");
  expect(outputEl.innerHTML).toContain("2021");
});

test("render() output a DOM node", () => {
  const outputEl = timelines.render();
  const childNodesArray = Array.from(outputEl.childNodes);
  function findDataTimelineAttribute(value) {
    return childNodesArray.find(
      (el) => el.getAttribute("data-timeline") == value
    );
  }
  expect(outputEl.id).toBe("timelines");
  expect(findDataTimelineAttribute("axis")).toBeTruthy();
  expect(findDataTimelineAttribute("the-beatles")).toBeTruthy();
  expect(findDataTimelineAttribute("the-rolling-stones")).toBeTruthy();
});
