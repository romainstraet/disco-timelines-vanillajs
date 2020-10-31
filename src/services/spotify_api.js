/**
 * @typedef {object} Config
 * @property {string} authUrl
 * @property {string} apiUrl
 * @property {string} clientId
 * @property {string} redirectUri
 */

import Artist from "../models/artist";

/**
 * @typedef {object} SpotifyParams
 * @property {string} accessToken
 * @property {string} state
 */

export default class SpotifyApi {
  /**
   * @param {Config} config
   */
  constructor(config) {
    /**
     * @private
     */
    this._config = config;
  }

  /**
   * @param {string} userState
   * @param {Location} navigator
   */
  signOn(userState, navigator) {
    let url = "";
    url += this._config.authUrl;
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(this._config.clientId);
    url += "&redirect_uri=" + encodeURIComponent(this._config.redirectUri);
    url += "&state=" + encodeURIComponent(userState);
    navigator.assign(url);
  }

  /**
   * @param {string} hashUrl
   * @returns {SpotifyParams}
   */
  getHashParamsFromCallbackUrl(hashUrl) {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = hashUrl.substring(1); // remove the first char which is #
    while ((e = r.exec(q))) {
      if (e[1] == "access_token") {
        hashParams["accessToken"] = decodeURIComponent(e[2]);
      }
      if (e[1] == "state") {
        hashParams["state"] = decodeURIComponent(e[2]);
      }
    }
    return hashParams;
  }

  /**
   * @param {string} artistName
   * @param {string} accessToken
   * @returns {Promise<Artist>}
   */
  async getArtistWithDiscography(artistName, accessToken) {
    let artist = await this._searchArtist(artistName, accessToken);
    let artistDisco = await this._getDiscography(artist.id, accessToken);
    artist.addDiscography(artistDisco);
    return artist;
  }

  /**
   * @param {string} artistName
   * @param {string} accessToken
   * @returns {Promise<Artist>}
   */
  async _searchArtist(artistName, accessToken) {
    let url = this._config.apiUrl;
    url += "search?";
    url += `q=${artistName}`;
    url += "&type=artist";

    let res = await fetch(url, {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    });

    let body = await res.json();

    return new Artist(body.artists.items[0]);
  }

  /**
   * @param {string} artistId
   * @param {string} accessToken
   * @returns {Promise<[]>}
   */
  async _getDiscography(artistId, accessToken) {
    let url = this._config.apiUrl;
    url += `artists/${artistId}/albums`;
    url += "?include_groups=album";
    url += "&country=BE";
    url += "&limit=50";

    let res = await fetch(url, {
      method: "GET",
      headers: new Headers({ Authorization: "Bearer " + accessToken }),
    });

    let body = await res.json();

    return body.items;
  }
}
