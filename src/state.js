import { AppError } from "./base/errors";
import Observable from "./base/observable";
import Artist from "./models/artist";
import User from "./models/user";
import SpotifyApi from "./services/spotify_api";

/**
 * @typedef {Object} State
 * @property {Artist[]} artists
 * @property {number} earliestReleaseYear
 * @property {number} latestReleaseYear
 */

export default class ObservableState extends Observable {
  /**
   * @param {State} state
   * @param {SpotifyApi} spotifyApi
   */
  constructor(
    spotifyApi,
    state = {
      artists: [],
      latestReleaseYear: new Date(Date.now()).getFullYear() - 1,
      earliestReleaseYear: new Date(Date.now()).getFullYear() - 10,
    }
  ) {
    super();
    /** @private */
    this._spotifyApi = spotifyApi;
    /** @private */
    this._state = state;
    /** @private */
    this._user = new User();
    /** @private */
    this._errorMessage = "";
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

  get isAuth() {
    return this._user.accessToken != "" ? true : false;
  }

  get errorMessage() {
    return this._errorMessage;
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
   * @param {string} artistName
   */
  async searchAndAddArtist(artistName) {
    try {
      this._setErrorMessage("");
      this._checkIfArtistAlreadyInStore(artistName);
      let artist = await this._spotifyApi.getArtistWithDiscography(
        artistName.trim(),
        this._user.accessToken
      );
      this.addArtists([artist]);
    } catch (e) {
      let message;
      if (e.name == "AppError") {
        message = e.message;
      } else if (e.name == "AuthError") {
        message = e.message;
        this._user = new User();
        window.location.hash = "";
      } else {
        message = "Something went wrong. Please retry.";
      }
      this._setErrorMessage(message);
    }
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
   * @returns {void}
   */
  signOnSpotify() {
    let stateKey = this._user.getAndStoreStateKey();
    this._spotifyApi.signOn(stateKey, window.location);
  }

  /**
   * @param {string} accessToken
   * @param {string} stateKey
   * @returns {boolean}
   */
  addUser(accessToken, stateKey) {
    if (accessToken == "") return false;
    if (!this._user.isValidKey(stateKey)) return false;
    this._user.accessToken = accessToken;
    this.notifyObservers(this._state);
    return true;
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
    if (this._state.artists.length == 0) {
      let currentYear = new Date(Date.now()).getFullYear();
      this._state.latestReleaseYear = currentYear - 1;
      this._state.earliestReleaseYear = currentYear - 10;
      return;
    }
    this._state.earliestReleaseYear = this._state.artists[0].earliestReleaseYear;
    this._state.latestReleaseYear = 0;
    this._state.artists.forEach((artist) => {
      if (artist.latestReleaseYear > this._state.latestReleaseYear) {
        this._state.latestReleaseYear = artist.latestReleaseYear;
      }
    });
  }

  /**
   * @private
   * @param {string} artistName
   */
  _checkIfArtistAlreadyInStore(artistName) {
    let existingArtist = this.artists.find(
      (v) => v.name.toLowerCase() == artistName.toLowerCase().trim()
    );
    if (existingArtist !== undefined) {
      throw new AppError("Artist is already included in the timelines.");
    }
  }

  /**
   * @private
   * @param {string} message
   */
  _setErrorMessage(message) {
    this._errorMessage = message;
    this.notifyObservers(this._state);
  }
}
