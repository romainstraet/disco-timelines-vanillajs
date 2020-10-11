export default class Timelines {
  constructor() {
    this.discographies = [];
    this.earliestRelease = 3000;
    this.latestRelease = 0;
  }
  add(discography) {
    this.discographies.push(discography);
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
