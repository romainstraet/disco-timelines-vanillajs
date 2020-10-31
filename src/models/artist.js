import Album from "./album";

/**
 * @typedef {object} SpotifyArtist
 * @property {string} id
 * @property {string} name
 * @property {ExternalUrls} external_urls
 * @property {ArtistImageUrl[]} images
 */

/**
 * @typedef {Object} ExternalUrls
 * @property {string} spotify - url
 */

/**
 * @typedef {Object} ArtistImageUrl
 * @property {String} url
 */

export default class Artist {
  /**
   * @param {SpotifyArtist} spotifyArtist
   */
  constructor(spotifyArtist) {
    this.id = spotifyArtist.id;
    this.name = spotifyArtist.name;
    this.spotifyUrl = spotifyArtist.external_urls.spotify;
    this.imageUrl = spotifyArtist.images[1].url;
    /** @type {Album[]} */
    this.discography = [];
    this.earliestReleaseYear = 0;
    this.latestReleaseYear = 0;
  }

  /**
   * @param {import("./album").SpotifyAlbum[]} albums
   */
  addDiscography(albums) {
    for (let i = 0; i < albums.length; i++) {
      let album = new Album(albums[i]);
      this._addAlbumAndAvoidDuplication(album);
    }
    this._sortDiscographyChronologically();
    this._setEarliestAndLatestReleaseYear();
  }

  /**
   * @private
   * @param {Album} album
   */
  _addAlbumAndAvoidDuplication(album) {
    let duplicateIndex = this.discography.findIndex(
      (v) => v.name.toLowerCase() == album.name.toLowerCase()
    );
    if (duplicateIndex == -1) {
      return this.discography.push(album);
    }
    let duplicate = this.discography[duplicateIndex];
    if (album.releaseYear < duplicate.releaseYear) {
      this.discography.splice(duplicateIndex, 1);
      return this.discography.push(album);
    }
  }

  /**
   * @private
   */
  _sortDiscographyChronologically() {
    this.discography.sort((a, b) => {
      if (a.releaseYear == b.releaseYear) {
        return a.releaseMonth - b.releaseMonth;
      }
      return a.releaseYear - b.releaseYear;
    });
  }

  /**
   * @private
   */
  _setEarliestAndLatestReleaseYear() {
    this.earliestReleaseYear = this.discography[0].releaseYear;
    let lastItemIndex = this.discography.length - 1;
    this.latestReleaseYear = this.discography[lastItemIndex].releaseYear;
  }
}
