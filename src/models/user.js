export default class User {
  /**
   * @param {string} accessToken
   */
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  /**
   * @returns {string}
   */
  generateStateKey() {
    let stateKey = this._generateRandomString(10);
    localStorage.setItem("stateKey", stateKey);
    return stateKey;
  }

  /**
   * @param {string} stateKey
   * @returns {boolean}
   */

  verifyStateKey(stateKey) {
    let validKey = localStorage.getItem("stateKey");
    let response = validKey === stateKey ? true : false;
    localStorage.removeItem("stateKey");
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
