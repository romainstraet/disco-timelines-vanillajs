import ObservableState from "../base/observable_state";
import Observer from "../base/observer";
import { elFactory } from "../elements/@element_factory";
import { timelineAxisFirstColEl } from "../elements/timeline_axis_first_col";
import { timelineAxisYearEl } from "../elements/timeline_axis_year";

export default class TimelineAxis extends Observer {
  /**
   * @param {ObservableState} observableState
   */
  constructor(observableState) {
    super();
    this._appState = observableState;
  }

  /**
   * @returns {void}
   */
  render() {
    // attributes
    let attributes = {
      id: "timeline-axis",
      class: "timeline-axis",
    };
    // children
    let firstCol = timelineAxisFirstColEl();
    let yearsArray = this._generateArrayOfYears();
    let yearsElements = [];
    for (let i = 0; i < yearsArray.length; i++) {
      yearsElements.push(timelineAxisYearEl(yearsArray[i]));
    }

    // create component
    let component = elFactory("div", attributes, [firstCol, ...yearsElements]);

    // manipulate Dom
    document.getElementById("timeline-axis").replaceWith(component);
  }

  /**
   *
   */
  update() {
    this.render();
  }

  /**
   * @private
   * @returns {number[]}
   */
  _generateArrayOfYears() {
    let currentYear =
      this._appState.latestReleaseYear == 0
        ? new Date(Date.now()).getFullYear()
        : null;
    let endingYear =
      currentYear == null ? this._appState.latestReleaseYear : currentYear - 1; // current year will be re-added in year diff
    let startingYear =
      currentYear == null
        ? this._appState.earliestReleaseYear
        : currentYear - 10;
    const yearsDiff = endingYear - startingYear + 2; // +2 to include all the years in range + 1 additional year
    return Array.from(new Array(yearsDiff), (_, i) => i + startingYear);
  }
}
