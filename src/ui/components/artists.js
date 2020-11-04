import ObservableState from "../../state";
import Observer from "../../base/observer";
import { elFactory } from "../elements/_element_factory";
import { artistEl } from "../elements/artist";
import {
  kTimelineFirstColWidth,
  kTimelineAxisYearWidth,
} from "../../assets/constants";
import { artistDefaultEl } from "../elements/artist_default";

export default class Artists extends Observer {
  /**
   * @param {ObservableState} observableState
   */
  constructor(observableState) {
    super();
    this._appState = observableState;
  }

  /**
   *
   */
  update() {
    this.render();
  }

  /**
   * @returns {void}
   */
  render() {
    // attributes
    let attributes = {
      id: "timeline-artists",
      class: "timeline-artists",
    };

    // styles
    let style = {
      width: this._calculateWidth(),
    };

    // children
    let children = [];
    this._appState.artists.forEach((artist) => {
      let el = artistEl(artist, this._appState.earliestReleaseYear, () =>
        this._appState.removeArtist(artist.id)
      );
      children.push(el);
    });
    if (children.length == 0) children.push(artistDefaultEl());

    // create component
    let component = elFactory("div", { attributes, style }, children);

    // manipulate Dom
    document.getElementById("timeline-artists").replaceWith(component);
  }

  /**
   * @private
   */
  _calculateWidth() {
    return (
      kTimelineFirstColWidth +
      kTimelineAxisYearWidth *
        (this._appState.latestReleaseYear -
          this._appState.earliestReleaseYear +
          2) +
      "px"
    );
  }
}
