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
      test("Artists property should not be empty anymore", () => {
        expect(timelines.artists.length).toBe(2);
        expect(timelines.artists[0].name).toBe("The Beatles");
      });
      test("Earliest and Latest release property should be set ", () => {
        expect(timelines.earliestReleaseYear).toBe(1963); // form the beatles
        expect(timelines.latestReleaseYear).toBe(2020); // from the rolling stones
      });
    });

    describe("Render()", () => {
      let html: HTMLElement;

      beforeEach(() => {
        html = timelines.render();
      });

      test("Return an HTML Element", () => {
        expect(html instanceof HTMLElement).toBeTruthy();
        expect(html.id).toBe("timelines");
        expect(html.dataset.timelines).toBe("");
      });

      test("HTML Element have 3 nodes", () => {
        expect(html.childNodes.length).toBe(3);
        expect(html.children[0].getAttribute("data-artist")).toBe(
          "the-beatles"
        );
        expect(html.children[1].getAttribute("data-artist")).toBe(
          "the-rolling-stones"
        );
        expect(html.children[2].getAttribute("data-timelines-axis")).toBe("");
      });

      test("TimelineAxis node should contain every year from earliest to latest release with 1 year offset", () => {
        expect(html.children[2].innerHTML).toContain("1962"); // earliest
        expect(html.children[2].innerHTML).toContain("1986"); // random
        expect(html.children[2].innerHTML).toContain("2001"); // random
        expect(html.children[2].innerHTML).toContain("2021"); // latest
      });
      //   test("ArtistName node should contain the name of the artist", () => {
      //     let html = artist.render();
      //     expect(html.children[0].innerHTML).toContain("The Beatles");
      //   });
      //   test("ArtistDiscography node should contain the albums info", () => {
      //     let html = artist.render();
      //     expect(html.children[1].children.length).toBe(
      //       beatlesAlbums.items.length
      //     );
      //     expect(html.children[1].innerHTML).toContain(
      //       beatlesAlbums.items[0].images[2].url
      //     );
      //     expect(html.children[1].innerHTML).toContain(
      //       beatlesAlbums.items[5].images[2].url
      //     );
      //   });
    });
  });
});

//
