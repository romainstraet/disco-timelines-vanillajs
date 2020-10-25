import Observable from "./base/observable";
import Artist from "./models/artist";

/**
 * @typedef {Object} State
 * @property {Artist[]} artists
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
      latestReleaseYear: new Date(Date.now()).getFullYear() - 1,
      earliestReleaseYear: new Date(Date.now()).getFullYear() - 10,
    }
  ) {
    super();
    /** @private */
    this._state = state;
  }

  get artists() {
    return this._state.artists;
  }

  get earliestReleaseYear() {
    return this._state.earliestReleaseYear;
  }

  get latestReleaseYear() {
    return this._state.latestReleaseYear;
  }

  /**
   * @param {Artist[]} artists
   */
  addArtists(artists) {
    this._state.artists.push(...artists);
    this._sortArtistsChronologically();
    this._setEarliestAndLatestReleaseYear();
    this.notifyObservers(this._state);
  }

  /**
   * @param {string} id
   */
  removeArtist(id) {
    let index = this._state.artists.findIndex((v) => v.id == id);
    this._state.artists.splice(index, 1);
    this._setEarliestAndLatestReleaseYear();
    this.notifyObservers(this._state);
  }

  /**
   * @private
   */
  _sortArtistsChronologically() {
    this._state.artists.sort((a, b) => {
      return a.earliestReleaseYear - b.earliestReleaseYear;
    });
  }

  /**
   * @private
   */
  _setEarliestAndLatestReleaseYear() {
    this._state.earliestReleaseYear = this._state.artists[0].earliestReleaseYear;
    let lastArtistIndex = this.artists.length - 1;
    this._state.latestReleaseYear = this._state.artists[
      lastArtistIndex
    ].latestReleaseYear;
  }
}
