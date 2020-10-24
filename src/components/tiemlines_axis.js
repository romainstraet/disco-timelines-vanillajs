import ObservableState from "../base/observable_state";
import Observer from "../base/observer";

export default class TimelineAxis extends Observer {
  /**
   * @param {ObservableState} observableState
   */
  constructor(observableState) {
    super();
    this._appState = observableState;
  }

  /**
   * @param {import("../base/observable_state").State} newState
   */
  update(newState) {
    this.render();
  }

  render() {}
}
