import ObservableState from "./base/observable_state";
import TimelineAxis from "./components/timelines_axis";

let appState = new ObservableState();
new TimelineAxis(appState).render();
