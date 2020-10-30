import ObservableState from "./state";
import TimelineAxis from "./components/timelines_axis";
import Artists from "./components/artists";
import SpotifyApi from "./services/spotify_api";
import Config from "./config";
import "./scss/style.scss";
import { initPrepopulatedData } from "./data";
import SearchArtist from "./components/search_artist";

// PRE-POPULATE DATA
let artistsArray = initPrepopulatedData();

// INIT SERVICES
let spotifyApi = new SpotifyApi(Config.Spotify);

// INIT STATE WITH PRE-POPULATED DATA
let appState = new ObservableState(spotifyApi);
appState.addArtists(artistsArray);

// INIT COMPONENTS
let timelineAxis = new TimelineAxis(appState);
let artists = new Artists(appState);
let searchArtist = new SearchArtist(appState);

// SUBSCRIBE COMPONENTS TO STATE CHANGE
appState.subscribe(timelineAxis);
appState.subscribe(artists);
appState.subscribe(searchArtist);

// CHECK IF ACCESS TOKEN
let authRes; // Via callback url with params
if (window.location.hash !== "") {
  authRes = spotifyApi.getHashParamsFromCallbackUrl(window.location.hash);
  appState.addUser(authRes.accessToken, authRes.state);
  console.log("here");
}

// RENDER
timelineAxis.render();
artists.render();
searchArtist.render();
