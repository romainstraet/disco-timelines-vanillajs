import Observable from "../../../src/base/observable.js";
import ObservableState from "../../../src/state.js";

import { ObserverImpl } from "../_helpers/mock_class.js";
import { artists, albums } from "../_helpers/mock_data";

let _artists = artists();
let _albums = albums();

_artists[0].addDiscography(_albums[0]);
_artists[1].addDiscography(_albums[1]);

describe("OBSERVABLE STATE CLASS", () => {
  test("Should be an implementation of the Observable base class", async () => {
    let state = new ObservableState();
    expect(state instanceof Observable).toBeTruthy();
  });

  test("Can be instantiated with a initial state and state should be marked as private", async () => {
    let initialState = {
      artists: [],
      earliestReleaseYear: 2010,
      latestReleaseYear: 2021,
    };
    let state = new ObservableState(initialState);
    expect(state.artists).toBe(initialState.artists);
    expect(state.earliestReleaseYear).toBe(initialState.earliestReleaseYear);
    expect(state.latestReleaseYear).toBe(initialState.latestReleaseYear);
  });

  describe("INSTANTIATED", () => {
    test("Can add _artists", async () => {
      let state = new ObservableState();
      state.addArtists(_artists);
      expect(state.artists.length).toBe(_artists.length);
    });

    test("_artists should be ordered chronologically based on earliest release", async () => {
      let state = new ObservableState();
      state.addArtists(_artists);
      expect(state.artists[0].earliestReleaseYear).toBeLessThan(
        state.artists[1].earliestReleaseYear
      );
    });

    test("Adding _artists set the year earliest and latest release between all _artists", async () => {
      let state = new ObservableState();
      state.addArtists(_artists);
      expect(state.earliestReleaseYear).toBe(1964);
      expect(state.latestReleaseYear).toBe(1994);
    });

    test("Adding _artists notifies observers upon state change", async () => {
      let state = new ObservableState();
      let observer = new ObserverImpl();
      state.subscribe(observer);
      expect(observer.state).toBe("");
      state.addArtists(_artists);
      //@ts-ignorets-nocheck
      expect(observer.state._artists).toBe(state._artists);
      //@ts-ignorets-nocheck
      expect(observer.state.earliestReleaseYear).toBe(
        state.earliestReleaseYear
      );
      //@ts-ignorets-nocheck
      expect(observer.state.latestReleaseYear).toBe(state.latestReleaseYear);
    });
  });
});
