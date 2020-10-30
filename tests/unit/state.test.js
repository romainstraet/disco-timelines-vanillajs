import Observable from "../../src/base/observable.js";
import SpotifyApi from "../../src/services/spotify_api.js";
import ObservableState from "../../src/state.js";
import Config from "../../src/config";

import { ObserverImpl } from "./_helpers/mock_class.js";
import { artists, albums } from "./_helpers/mock_data";
import {
  mockWindowLocation,
  resetWindowlocation,
} from "./_helpers/mock_location_assign.js";
import User from "../../src/models/user.js";

let _artists = artists();
let _albums = albums();

_artists[0].addDiscography(_albums[0]);
_artists[1].addDiscography(_albums[1]);

let spotifyApi = new SpotifyApi(Config.Spotify);

describe("OBSERVABLE STATE CLASS", () => {
  test("Should be an implementation of the Observable base class", async () => {
    let state = new ObservableState(spotifyApi);
    expect(state instanceof Observable).toBeTruthy();
  });

  test("Can be instantiated with a initial state and state should be marked as private", async () => {
    let initialState = {
      artists: [],
      earliestReleaseYear: 2010,
      latestReleaseYear: 2021,
    };
    let state = new ObservableState(spotifyApi, initialState);
    expect(state.artists).toBe(initialState.artists);
    expect(state.earliestReleaseYear).toBe(initialState.earliestReleaseYear);
    expect(state.latestReleaseYear).toBe(initialState.latestReleaseYear);
  });

  describe("INSTANTIATED", () => {
    describe("Add Artists method", () => {
      test("Can add artists", async () => {
        let state = new ObservableState(spotifyApi);
        state.addArtists(_artists);
        expect(state.artists.length).toBe(_artists.length);
      });

      test("Artists should be ordered chronologically based on earliest release", async () => {
        let state = new ObservableState(spotifyApi);
        state.addArtists(_artists);
        expect(state.artists[0].earliestReleaseYear).toBeLessThan(
          state.artists[1].earliestReleaseYear
        );
      });

      test("Adding artists set the year earliest and latest release between all artists", async () => {
        let state = new ObservableState(spotifyApi);
        state.addArtists(_artists);
        expect(state.earliestReleaseYear).toBe(1964);
        expect(state.latestReleaseYear).toBe(1994);
      });

      test("Adding artists notifies observers upon state change", async () => {
        let state = new ObservableState(spotifyApi);
        let observer = new ObserverImpl();
        state.subscribe(observer);
        expect(observer.state).toBe("");
        state.addArtists(_artists);
        expect(observer.state).toBe("updated");
      });
    });

    describe("Remove Artists method", () => {
      test("Can remove artist", async () => {
        let state = new ObservableState(spotifyApi);
        state.addArtists(_artists);
        expect(state.artists.length).toBe(_artists.length);
        state.removeArtist(_artists[0].id);
        expect(state.artists.length).toBe(_artists.length - 1);
        expect(
          state.artists.find((v) => v.id == _artists[0].id)
        ).toBeUndefined();
      });

      test("Removing artist resets earliest/latest release year", async () => {
        let state = new ObservableState(spotifyApi);
        state.addArtists(_artists);
        state.removeArtist(_artists[0].id);
        expect(state.earliestReleaseYear).toBe(1964);
        expect(state.latestReleaseYear).toBe(1969); // changed
      });

      test("Removing artists notifies observers upon state change", async () => {
        let state = new ObservableState(spotifyApi);
        let observer = new ObserverImpl();
        state.addArtists(_artists);
        expect(observer.state).toBe("");
        state.subscribe(observer);
        state.removeArtist(_artists[0].id);
        expect(observer.state).toBe("updated");
      });
    });
    describe("Sign On Spotify Method", () => {
      test("Should call Spotify Api Services > Sign On Method", async () => {
        mockWindowLocation();
        let state = new ObservableState(spotifyApi);
        let spySignOnApi = jest.spyOn(spotifyApi, "signOn");
        state.signOnSpotify();
        expect(spySignOnApi).toHaveBeenCalled();
        resetWindowlocation();
      });
    });
    describe("Add User method", () => {
      beforeEach(() => mockWindowLocation());
      afterEach(() => resetWindowlocation());

      test("Should sign user in if access token provided and valid state", async () => {
        let state = new ObservableState(spotifyApi);
        state.signOnSpotify();
        let accessToken = "wH4theVer";
        let stateKeyMocked = new User().getAndStoreStateKey();
        state.addUser(accessToken, stateKeyMocked);
        expect(state.isAuth).toBe(true);
      });

      test("Signing a user should store the access token", async () => {
        let state = new ObservableState(spotifyApi);
        state.signOnSpotify();
        let accessToken = "wH4theVer";
        let stateKeyMocked = new User().getAndStoreStateKey();
        state.addUser(accessToken, stateKeyMocked);
        //@ts-ignore
        expect(state._user.accessToken).toBe(accessToken);
      });

      test("Signing a user in should notify observers", async () => {
        let state = new ObservableState(spotifyApi);
        let observer = new ObserverImpl();
        expect(observer.state).toBe("");
        state.subscribe(observer);
        state.signOnSpotify();
        let accessToken = "wH4theVer";
        let stateKeyMocked = new User().getAndStoreStateKey();
        state.addUser(accessToken, stateKeyMocked);
        expect(observer.state).toBe("updated");
      });

      test("Should NOT sign user in if access token provided but invalid state", async () => {
        let state = new ObservableState(spotifyApi);
        state.signOnSpotify();
        let accessToken = "wH4theVer";
        let wrongKey = "wrongKey";
        state.addUser(accessToken, wrongKey);
        expect(state.isAuth).toBe(false);
      });

      test("Should NOT sign user in if no access token provided (even if valid state)", async () => {
        let state = new ObservableState(spotifyApi);
        state.signOnSpotify();
        let accessToken = "";
        let stateKeyMocked = new User().getAndStoreStateKey();
        state.addUser(accessToken, stateKeyMocked);
        expect(state.isAuth).toBe(false);
      });
    });
  });
});
