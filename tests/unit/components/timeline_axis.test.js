import ObservableState from "../../../src/state";
import Observer from "../../../src/base/observer";
import TimelineAxis from "../../../src/ui/components/timelines_axis";
import { artists, albums } from "../_helpers/mock_data";
import SpotifyApi from "../../../src/services/spotify_api";
import Config from "../../../src/config";

let _artists = artists();
let _albums = albums();
_artists[0].addDiscography(_albums[0]);
_artists[1].addDiscography(_albums[1]);

let spotifyApi = new SpotifyApi(Config.Spotify);

describe("TIMELINE AXIS OBSERVER CLASS", () => {
  let appState;

  beforeEach(() => {
    appState = new ObservableState(spotifyApi);
  });

  test("Should be an implementation of the Observable base class", async () => {
    let timelineAxis = new TimelineAxis(appState);
    expect(timelineAxis instanceof Observer).toBeTruthy();
  });

  describe("Render Method", () => {
    let timelineAxisInitialEl;

    beforeEach(() => {
      timelineAxisInitialEl = document.createElement("div");
      timelineAxisInitialEl.id = "timeline-axis";
      document.body.appendChild(timelineAxisInitialEl);
    });

    afterEach(() => {
      let el = document.getElementById("timeline-axis");
      document.body.removeChild(el);
    });

    test("Render method should replace #timeline-axis component", async () => {
      let el = document.getElementById("timeline-axis");
      expect(el).toBe(timelineAxisInitialEl);
      new TimelineAxis(appState).render();
      el = document.getElementById("timeline-axis");
      expect(el).not.toBe(timelineAxisInitialEl);
    });

    test("If earliest/latest release year state are 0, component should be a default axis", async () => {
      new TimelineAxis(appState).render();
      let el = document.getElementById("timeline-axis");
      let currentYear = new Date(Date.now()).getFullYear();
      expect(el.childNodes.length).toBe(12); // First-col + 11 years (ex: 2010 - 2020 incl)
      expect(el.children[0].className).toContain("timeline-axis-first-col");
      expect(el.innerHTML).toContain(currentYear);
      expect(el.innerHTML).not.toContain(currentYear + 1);
      expect(el.innerHTML).toContain(currentYear - 10);
      expect(el.innerHTML).not.toContain(currentYear - 11);
    });

    test("If earliest/latest release year are set, HTMLElement should returns a custom axis", async () => {
      let appState = new ObservableState(spotifyApi, {
        artists: [],
        earliestReleaseYear: 1960,
        latestReleaseYear: 1975,
      });
      new TimelineAxis(appState).render();
      let el = document.getElementById("timeline-axis");
      expect(el.childNodes.length).toBe(18); // First-col + 17 years (ex: 1960 - 1976 incl)
      expect(el.children[0].className).toContain("timeline-axis-first-col");
      expect(el.innerHTML).toContain(1976);
      expect(el.innerHTML).not.toContain(1977);
      expect(el.innerHTML).toContain(1960);
      expect(el.innerHTML).not.toContain(1959);
    });

    describe("On Update Method", () => {
      test("When update method is called, HTMLElement is re-renderd", async () => {
        let timelineAxis = new TimelineAxis(appState);
        timelineAxis.render();
        let el = document.getElementById("timeline-axis");
        appState.subscribe(timelineAxis);
        appState.addArtists(_artists); // Should notify observers with their update method
        let updatedEl = document.getElementById("timeline-axis");
        expect(updatedEl).not.toBe(el);
        expect(updatedEl.innerHTML).toContain(1964);
        expect(updatedEl.innerHTML).toContain(1995);
      });
    });
  });
});
