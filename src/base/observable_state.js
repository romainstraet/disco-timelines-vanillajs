import Observable from "./observable";

/**
 * @typedef {Object} State
 * @property {Array} artists
 * @property {number} earliestReleaseYear
 * @property {number} latestReleaseYear
 */

export default class ObservableState extends Observable {
  /**
   * @param {State} state
   */
  constructor(
    state = {
      artists: [],
      earliestReleaseYear: 0,
      latestReleaseYear: 0,
    }
  ) {
    super();
    this._state = state;
  }
}
