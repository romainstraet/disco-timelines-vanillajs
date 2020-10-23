import Observable from "../../../src/base/observable.js";
import ObservableState from "../../../src/base/observable_state.js";

import Artist from "../../../src/models/artist";
import { ObserverImpl } from "./_mock_class.js";

/**
 * @type {Artist[]} artist
 */
let artists = [
  new Artist({
    id: "1",
    name: "The Rolling Stones",
    external_urls: { spotify: "spotifyURL" },
    images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
  }),
  new Artist({
    id: "0",
    name: "The Beatles",
    external_urls: { spotify: "spotifyURL" },
    images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
  }),
];

/**
 * @return {import("../../../src/models/album").SpotifyAlbum[][]} beatlesAlbum
 */
let albums = [
  [
    {
      id: "0",
      name: "Let it bleed",
      release_date: "1969",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    },
    {
      id: "1",
      name: "Voodoo Lounge",
      release_date: "1994",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    },
  ],
  [
    {
      id: "0",
      name: "Abbey Road",
      release_date: "1969-12-30",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    },
    {
      id: "1",
      name: "Revolver",
      release_date: "1966-10-02",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    },
    {
      id: "2",
      name: "Help",
      release_date: "1966-09-01",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    },
    {
      id: "3",
      name: "Hard day's night",
      release_date: "1964-08-10",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    },
  ],
];

artists[0].addDiscography(albums[0]);
artists[1].addDiscography(albums[1]);

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
    test("Can add artists", async () => {
      let state = new ObservableState();
      state.addArtists(artists);
      expect(state.artists.length).toBe(artists.length);
    });

    test("Artists should be ordered chronologically based on earliest release", async () => {
      let state = new ObservableState();
      state.addArtists(artists);
      expect(state.artists[0].earliestReleaseYear).toBeLessThan(
        state.artists[1].earliestReleaseYear
      );
    });

    test("Adding artists set the year earliest and latest release between all artists", async () => {
      let state = new ObservableState();
      state.addArtists(artists);
      expect(state.earliestReleaseYear).toBe(1964);
      expect(state.latestReleaseYear).toBe(1994);
    });

    test("Adding artists notifies observers upon state change", async () => {
      let state = new ObservableState();
      let observer = new ObserverImpl();
      state.subscribe(observer);
      expect(observer.state).toBe("");
      state.addArtists(artists);
      //@ts-ignorets-nocheck
      expect(observer.state.artists).toBe(state.artists);
      //@ts-ignorets-nocheck
      expect(observer.state.earliestReleaseYear).toBe(
        state.earliestReleaseYear
      );
      //@ts-ignorets-nocheck
      expect(observer.state.latestReleaseYear).toBe(state.latestReleaseYear);
    });
  });
});
