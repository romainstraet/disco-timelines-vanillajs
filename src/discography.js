export default class Discography {
  constructor() {
    this.name = "";
    this.earliestRelease = 3000;
    this.latestRelease = 0;
    this.albumList = [];
  }

  fromSpotifyJsonData(spotifyJsonData) {
    this.name = spotifyJsonData.items[0].artists[0].name;
    this.albumList = spotifyJsonData.items;
    this.setEarliestandLatestReleaseYear();
    return this;
  }

  setEarliestandLatestReleaseYear() {
    this.albumList.forEach((album) => {
      const releaseYear = parseInt(album.release_date.substring(0, 4));
      this.earliestRelease =
        releaseYear < this.earliestRelease ? releaseYear : this.earliestRelease;
      this.latestRelease =
        releaseYear > this.latestRelease ? releaseYear : this.latestRelease;
    });
  }
}
