import ObservableState from "../../../src/state";
import Observer from "../../../src/base/observer";
import Config from "../../../src/config";
import SpotifyApi from "../../../src/services/spotify_api.js";
import SearchArtist from "../../../src/ui/components/search_artist";

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

    test("Sign on button should have a onclick method", async () => {
      new SearchArtist(appState).render();
      let el = document.getElementById("search-artist");
      let button = el.querySelector("button");
      expect(button.onclick).not.toBeUndefined();
    });

    test("If user is signed in, should render a search input box", async () => {
      appState._user.accessToken = "whatever";
      new SearchArtist(appState).render();
      let el = document.getElementById("search-artist");
      expect(el.childElementCount).toBe(1);
      expect(el.innerHTML).not.toContain("Sign on");
      expect(el.innerHTML).toContain("Add Artist");
    });

    test("Search box button should have an onclick method", async () => {
      appState._user.accessToken = "whatever";
      new SearchArtist(appState).render();
      let el = document.getElementById("search-artist");
      let button = el.querySelectorAll("button");
      expect(button[0].onclick).not.toBeUndefined();
    });

    describe("On Update Method", () => {
      test("When update method is called, HTMLElement is re-renderd", async () => {
        let searchArtist = new SearchArtist(appState);
        searchArtist.render();
        let el = document.getElementById("search-artist");
        appState.subscribe(searchArtist);
        localStorage.setItem("state_key", "123");
        appState.addUser("whatever", "123"); // Should notify observers with their update method
        let upatedEl = document.getElementById("search-artist");
        expect(el).not.toBe(upatedEl);
      });
    });
  });
});
