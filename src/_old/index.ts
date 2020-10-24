import beatlesArtists from "./data/beatles_artists";
import "./style.scss";

import rollingStonesArtists from "./data/rolling_stones_artists";
import beatlesAlbums from "./data/beatles_albums";
import rollingStonesAlbums from "./data/rolling_stones_albums";

import Timelines from "./timelines";
import Artist from "./artist";

// const beatlesDisco = new Discography().fromSpotifyJsonData(beatlesData);
// const rollingStonesDisco = new Discography().fromSpotifyJsonData(
//   rollingStonesData
// );
// const timelines = new Timelines();
// timelines.add(beatlesDisco);
// timelines.add(rollingStonesDisco);
// const timelinesDom = timelines.render();

// document.getElementById("timelines").replaceWith(timelinesDom);

let beatles = new Artist(beatlesArtists.items[0]);
let rollingStones = new Artist(rollingStonesArtists.items[0]);

beatles.addDiscography(beatlesAlbums.items);
rollingStones.addDiscography(rollingStonesAlbums.items);

let timelines = new Timelines().addArtists([beatles, rollingStones]);

let timelinesNode = timelines.render();
