import ObservableState from "../../../src/state";
import Observer from "../../../src/base/observer";
import TimelineAxis from "../../../src/components/timelines_axis";
import { artists, albums } from "../_helpers/mock_data";
import Artists from "../../../src/components/artists";

let _artists = artists();
let _albums = albums();
_artists[0].addDiscography(_albums[0]);
_artists[1].addDiscography(_albums[1]);

describe("ARTISTS OBSERVER CLASS", () => {
  let appState;

  beforeEach(() => {
    appState = new ObservableState();
    appState.addArtists(_artists);
  });

  test("Should be an implementation of the Observable base class", async () => {
    let artistsComp = new TimelineAxis(appState);
    expect(artistsComp instanceof Observer).toBeTruthy();
  });

  describe("Render Method", () => {
    let artistsInitialEl;

    beforeEach(() => {
      artistsInitialEl = document.createElement("div");
      artistsInitialEl.id = "timeline-artists";
      document.body.appendChild(artistsInitialEl);
    });

    afterEach(() => {
      let el = document.getElementById("timeline-artists");
      document.body.removeChild(el);
    });

    test("Render method should replace #artists component", async () => {
      let el = document.getElementById("timeline-artists");
      expect(el).toBe(artistsInitialEl);
      new Artists(appState).render();
      el = document.getElementById("timeline-artists");
      expect(el).not.toBe(artistsInitialEl);
    });

    test("Render method should 1 child element by artist in state", async () => {
      new Artists(appState).render();
      let el = document.getElementById("timeline-artists");
      expect(el.children.length).toBe(2);
      expect(el.children[0].id).toBe(appState.artists[0].id);
      expect(el.children[1].id).toBe(appState.artists[1].id);
      expect(el.children[0].getAttribute("data-artist")).toBe(
        appState.artists[0].name
      );
      expect(el.children[1].getAttribute("data-artist")).toBe(
        appState.artists[1].name
      );
    });

    test("Artist child should contain 2 childrens", async () => {
      new Artists(appState).render();
      let artistEl = document.getElementById(appState.artists[0].id);
      expect(artistEl.children.length).toBe(2);
      expect(artistEl.children[0].className).toContain(
        "timeline-artist-first-col"
      );
      expect(artistEl.children[1].className).toContain("timeline-artist-disco");
    });

    describe("Timeline-artists > Artist > Children", () => {
      test("First child should contain the artist name", async () => {
        new Artists(appState).render();
        let firstColEl1 = document.getElementsByClassName(
          "timeline-artist-first-col"
        )[0];
        expect(firstColEl1.innerHTML.toLowerCase()).toContain("the beatles");
        let firstColEl2 = document.getElementsByClassName(
          "timeline-artist-first-col"
        )[1];
        expect(firstColEl2.innerHTML.toLowerCase()).toContain(
          "the rolling stones"
        );
      });

      test("Second child should contain the album of the artist", async () => {
        new Artists(appState).render();
        let discoEl = document.getElementsByClassName(
          "timeline-artist-disco"
        )[0];
        expect(discoEl.childElementCount).toBe(4);
        expect(
          discoEl.getElementsByClassName("timeline-artist-disco-album").length
        ).toBe(4);
      });
    });

    // test first child should contain name
    // test second child should contain albums
  });
});
