import ObservableState from "./state";
import TimelineAxis from "./components/timelines_axis";
import Artists from "./components/artists";

import "./scss/style.scss";

import beatlesArtists from "./data/beatles_artists";
import rollingStonesArtists from "./data/rolling_stones_artists";
import beatlesAlbums from "./data/beatles_albums";
import rollingStonesAlbums from "./data/rolling_stones_albums";
import Artist from "./models/artist";

let beatles = new Artist(beatlesArtists.items[0]);
let rollingStones = new Artist(rollingStonesArtists.items[0]);
beatles.addDiscography(beatlesAlbums.items);
rollingStones.addDiscography(rollingStonesAlbums.items);

let appState = new ObservableState();
appState.addArtists([beatles, rollingStones]);

new TimelineAxis(appState).render();
new Artists(appState).render();
