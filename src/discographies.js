export default class Discographies {
  constructor() {
    this.list = [];
    this.earliestRelease = 3000;
    this.latestRelease = 0;
  }
  add(discography) {
    this.list.push(discography);
    this.earliestRelease =
      discography.earliestRelease < this.earliestRelease
        ? discography.earliestRelease
        : this.earliestRelease;
    this.latestRelease =
      discography.latestRelease > this.latestRelease
        ? discography.latestRelease
        : this.latestRelease;
  }
}
