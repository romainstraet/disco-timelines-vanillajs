import ObservableState from "./state";
import TimelineAxis from "./ui/components/timelines_axis";
import Artists from "./ui/components/artists";
import SearchArtist from "./ui/components/search_artist";
import SpotifyApi from "./services/spotify_api";
import Config from "./config";
import "./assets/style.scss";
import { initPrepopulatedData } from "./data";
import ErrorMessage from "./ui/components/error_message";

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
let errorMessage = new ErrorMessage(appState);

// SUBSCRIBE COMPONENTS TO STATE CHANGE
appState.subscribe(timelineAxis);
appState.subscribe(artists);
appState.subscribe(searchArtist);
appState.subscribe(errorMessage);

// CHECK IF ACCESS TOKEN
let authRes; // Via callback url with params
if (window.location.hash !== "") {
  authRes = spotifyApi.getHashParamsFromCallbackUrl(window.location.hash);
  appState.addUser(authRes.accessToken, authRes.state);
}

// RENDER
timelineAxis.render();
artists.render();
searchArtist.render();

// CONFIGURE MODAL
let modal = document.getElementById("modal-info");
let openBtn = document.getElementById("button-open-modal-info");
let closeBtn = document.getElementById("button-close-modal-info");
openBtn.onclick = function () {
  modal.style.display = "flex";
};
closeBtn.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
