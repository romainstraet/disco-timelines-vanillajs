export default class User {
  /**
   * @param {string} accessToken
   */
  constructor(accessToken = "") {
    this.accessToken = accessToken;
  }

  /**
   * @returns {string}
   */
  getAndStoreStateKey() {
    let stateKey = this._generateRandomString(10);
    localStorage.setItem("state_key", stateKey);
    return stateKey;
  }

  /**
   * @param {string} stateKey
   * @returns {boolean}
   */

  isValidKey(stateKey) {
    let validKey = localStorage.getItem("state_key");
    let response = validKey === stateKey ? true : false;
    return response;
  }

  /**
   * @private
   * @param {number} length
   * @returns {string}
   */
  _generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
