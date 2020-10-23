import Observable from "../../../src/base/observable.js";
import ObservableState from "../../../src/base/observable_state.js";

describe("OBSERVABLE STATE CLASS", () => {
  test("Should be an implementation of the Observable base class", async () => {
    expect(new ObservableState() instanceof Observable).toBeTruthy();
  });

  test("Can be instantiated with a initial state and state should be marked as private", async () => {
    let initialState = {
      artists: [],
      earliestReleaseYear: 2010,
      latestReleaseYear: 2021,
    };
    let state = new ObservableState(initialState);
    expect(state._state.artists).toBe(initialState.artists);
    expect(state._state.earliestReleaseYear).toBe(
      initialState.earliestReleaseYear
    );
    expect(state._state.latestReleaseYear).toBe(initialState.latestReleaseYear);
  });
});
