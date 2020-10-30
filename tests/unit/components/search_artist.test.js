import ObservableState from "../../../src/state";
import Observer from "../../../src/base/observer";
import Config from "../../../src/config";
import SpotifyApi from "../../../src/services/spotify_api.js";
import SearchArtist from "../../../src/components/search_artist";

let spotifyApi = new SpotifyApi(Config.Spotify);

describe("SEARCH ARTIST OBSERVER CLASS", () => {
  let appState;

  beforeEach(() => {
    appState = new ObservableState(spotifyApi);
  });

  test("Should be an implementation of the Observable base class", async () => {
    let searchArtistComp = new SearchArtist(appState);
    expect(searchArtistComp instanceof Observer).toBeTruthy();
  });

  describe("Render Method", () => {
    let searchArtistEl;

    beforeEach(() => {
      searchArtistEl = document.createElement("div");
      searchArtistEl.id = "search-artist";
      document.body.appendChild(searchArtistEl);
    });

    afterEach(() => {
      let el = document.getElementById("search-artist");
      document.body.removeChild(el);
    });

    test("Render method should replace #search-artist component", async () => {
      let el = document.getElementById("search-artist");
      expect(el).toBe(searchArtistEl);
      new SearchArtist(appState).render();
      el = document.getElementById("search-artist");
      expect(el).not.toBe(searchArtistEl);
    });

    test("If user is not signed in, should render a sign in button", async () => {
      new SearchArtist(appState).render();
      let el = document.getElementById("search-artist");
      expect(el.childElementCount).toBe(1);
      expect(el.innerHTML).toContain("Sign on");
      expect(el.innerHTML).not.toContain("Add Artist");
    });
  });

  describe("On Update Method", () => {
    test("When update method is called, HTMLElement is re-renderd", async () => {
      // let artists = new Artists(appState);
      // artists.render();
      // appState.subscribe(artists);
      // appState.addArtists(_artists); // Should notify observers with their update method
      // let el = document.getElementById("timeline-artists");
      // appState.removeArtist(_artists[0].id);
      // let updatedEl = document.getElementById("timeline-artists");
      // expect(updatedEl.children.length).toBe(el.children.length - 1);
    });
  });
});
