import Timelines from "./timelines";
import Discography from "./discography";
import beatlesData from "./data/beatles.json";
import rollingStonesData from "./data/rollingstones.json";

const beatlesDisco = new Discography().fromSpotifyJsonData(beatlesData);
const rollingStonesDisco = new Discography().fromSpotifyJsonData(
  rollingStonesData
);
const timelines = new Timelines();
timelines.add(beatlesDisco);
timelines.add(rollingStonesDisco);
const timelinesDom = timelines.render();

document.getElementById("timelines").replaceWith(timelinesDom);
