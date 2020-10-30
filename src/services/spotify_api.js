/**
 * @typedef {object} Config
 * @property {string} authUrl
 * @property {string} apiUrl
 * @property {string} clientId
 * @property {string} redirectUri
 */

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
}
