import ObservableState from "../../state";
import Observer from "../../base/observer";
import { elFactory } from "../elements/_element_factory";
import { timelineAxisFirstColEl } from "../elements/timeline_axis_first_col";
import { timelineAxisYearEl } from "../elements/timeline_axis_year";
import {
  kTimelineAxisYearWidth,
  kTimelineFirstColWidth,
} from "../../assets/constants";
import { artistEvent } from "../../base/events";

export default class TimelineAxis extends Observer {
  /**
   * @param {ObservableState} observableState
   */
  constructor(observableState) {
    super();
    this._appState = observableState;
  }

  /**
   * @param {string} event
   */
  update(event) {
    if (event == artistEvent) {
      this.render();
    }
  }

  /**
   * @returns {void}
   */
  render() {
    // attributes
    let attributes = {
      id: "timeline-axis",
      class: "timeline-axis",
      "data-timeline-axis": "",
    };

    // styles
    let style = {
      width: this._calculateWidth(),
    };

    // children
    let firstCol = timelineAxisFirstColEl();
    let yearsArray = this._generateArrayOfYears();
    let yearsElements = [];
    for (let i = 0; i < yearsArray.length; i++) {
      yearsElements.push(timelineAxisYearEl(yearsArray[i]));
    }
    let children = [firstCol, ...yearsElements];

    // create component
    let component = elFactory("div", { attributes, style }, children);

    // manipulate Dom
    document.getElementById("timeline-axis").replaceWith(component);
  }

  /**
   * @private
   * @returns {number[]}
   */
  _generateArrayOfYears() {
    const yearsDiff =
      this._appState.latestReleaseYear - this._appState.earliestReleaseYear + 2; // +2 to include all the years in range + 1 additional year
    return Array.from(
      new Array(yearsDiff),
      (_, i) => i + this._appState.earliestReleaseYear
    );
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
