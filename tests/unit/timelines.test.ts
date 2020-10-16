import Timelines from "../../src/timelines";
import beatlesArtists from "../../src/data/beatles_artists";
import rollingStonesArtists from "../../src/data/rolling_stones_artists";
import beatlesAlbums from "../../src/data/beatles_albums";
import rollingStonesAlbums from "../../src/data/rolling_stones_albums";

import Artist from "../../src/artist";

describe("Timelines class", () => {
  describe("Instantiation/Creation", () => {
    test("With constructor (should return default value", () => {
      let timelines = new Timelines();
      expect(timelines.artists.length).toBe(0);
      expect(timelines.earliestReleaseYear).toBe(0);
      expect(timelines.latestReleaseYear).toBe(0);
    });
  });

  describe("When instantiated", () => {
    let timelines: Timelines;
    let beatles = new Artist(beatlesArtists.items[0]);
    let rollingStones = new Artist(rollingStonesArtists.items[0]);
    beatles.addDiscography(beatlesAlbums.items);
    rollingStones.addDiscography(rollingStonesAlbums.items);

    beforeEach(() => {
      timelines = new Timelines();
      timelines.addArtists([beatles, rollingStones]);
    });

    describe("Add Artists method", () => {
      test("", () => {});
    });
    describe("Render()", () => {});
  });
});

//
