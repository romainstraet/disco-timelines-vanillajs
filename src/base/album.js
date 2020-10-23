/**
 * @typedef {Object} SpotifyAlbum
 * @property {string} id
 * @property {string} name
 * @property {string} release_date - "yyyy-mm-dd"
 * @property {ExternalUrls} external_urls
 * @property {AlbumCoverUrls[]} images
 */

/**
 * @typedef {Object} ExternalUrls
 * @property {string} spotify - url
 */

/**
 * @typedef {Object} AlbumCoverUrls
 * @property {String} url
 */

export default class Album {
  /**
   * @param {SpotifyAlbum} spotifyAlbum
   */
  constructor(spotifyAlbum) {
    this.id = spotifyAlbum.id;
    this.name = this._cleanName(spotifyAlbum.name);
    this.releaseYear = this._getReleaseYear(spotifyAlbum.release_date);
    this.releaseMonth = this._getReleaseMonth(spotifyAlbum.release_date);
    this.spotifyUrl = spotifyAlbum.external_urls.spotify;
    this.coverUrl = this._getCoverUrl(spotifyAlbum.images);
  }

  /**
   * @private
   * @param {string} name
   * @returns {string}
   */
  _cleanName(name) {
    let exclTerms = ["deluxe", "remaster", "re-master", "version", "edition"];
    let arrStr = name.split(/[()]+/).filter((e) => e);
    let lastTerms = arrStr[arrStr.length - 1].toLowerCase();
    let includeTerm = exclTerms.find((term) => lastTerms.includes(term));
    if (includeTerm) {
      arrStr.pop();
      return arrStr.join().trim();
    } else {
      return name;
    }
  }

  /**
   * @private
   * @param {string} releaseDate
   * @returns {number}
   */
  _getReleaseYear(releaseDate) {
    return parseInt(releaseDate.substr(0, 4));
  }

  /**
   * @private
   * @param {string} releaseDate
   * @returns {number}
   */
  _getReleaseMonth(releaseDate) {
    return releaseDate.length <= 4 ? 0 : parseInt(releaseDate.substr(5, 2));
  }

  /**
   * @private
   * @param {AlbumCoverUrls[]} images
   * @returns {string}
   */
  _getCoverUrl(images) {
    if (images[1].url !== "") return images[1].url;
    if (images[0].url !== "") return images[0].url;
    return images[2].url;
  }
}
