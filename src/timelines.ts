import Artist from "./artist";

export default class Timelines {
  artists: Array<Artist>;
  earliestReleaseYear: number;
  latestReleaseYear: number;

  constructor() {
    this.artists = [];
    this.earliestReleaseYear = 0;
    this.latestReleaseYear = 0;
  }

  addArtists(artists: Array<Artist>): Timelines {
    artists.forEach((artist) => {
      this.artists.push(artist);
      this.checkIfEarlierOrLaterRelease(artist);
    });
    return this;
  }

  private checkIfEarlierOrLaterRelease(artist: Artist) {
    if (this.earliestReleaseYear == 0) {
      this.earliestReleaseYear = artist.earliestReleaseYear;
      this.latestReleaseYear = artist.latestReleaseYear;
      return;
    }
    if (artist.earliestReleaseYear < this.earliestReleaseYear) {
      this.earliestReleaseYear = artist.earliestReleaseYear;
    }
    if (artist.latestReleaseYear > this.latestReleaseYear) {
      this.latestReleaseYear = artist.latestReleaseYear;
    }
  }

  render(): HTMLElement {
    let timelinesNode = document.createElement("div");
    timelinesNode.id = "timelines";
    timelinesNode.dataset.timelines = "";
    this.artists.forEach((artist) => {
      timelinesNode.appendChild(artist.render());
    });
    timelinesNode.appendChild(this.renderTimelineAxis());

    return timelinesNode;
  }

  renderTimelineAxis(): HTMLElement {
    const axisNode = document.createElement("div");
    axisNode.dataset.timelinesAxis = "";
    this.generateYearsArray().forEach((year) => {
      const yearDiv = document.createElement("div");
      yearDiv.textContent = year.toString();
      axisNode.appendChild(yearDiv);
    });
    return axisNode;
  }

  private generateYearsArray(): Array<number> {
    const yearsDiff = this.latestReleaseYear - this.earliestReleaseYear + 1;
    return Array.from(
      new Array(yearsDiff),
      (_, i) => i + this.earliestReleaseYear
    );
  }
}

// export default class Timelines {
//   constructor() {
//     this.discographies = [];
//     this.earliestRelease = 3000;
//     this.latestRelease = 0;
//   }

//   add(discography) {
//     this.discographies.push(discography);
//     this.earliestRelease =
//       discography.earliestRelease < this.earliestRelease
//         ? discography.earliestRelease
//         : this.earliestRelease;
//     this.latestRelease =
//       discography.latestRelease > this.latestRelease
//         ? discography.latestRelease
//         : this.latestRelease;
//   }

// renderTimelineAxis() {
//   const axisEl = document.createElement("div");
//   axisEl.dataset.timeline = "axis";
//   axisEl.className = "timeline";
//   const axisFirstColEl = document.createElement("div");
//   axisFirstColEl.className = "first-col";
//   axisFirstColEl.textContent = "The years";
//   axisEl.appendChild(axisFirstColEl);
//   const years = this.generateYearsArray();
//   years.forEach((year) => {
//     const childEl = document.createElement("div");
//     childEl.className = "year";
//     childEl.textContent = year;
//     axisEl.appendChild(childEl);
//   });
//   return axisEl;
// }

//   render() {
//     const timelinesEl = document.createElement("div");
//     timelinesEl.id = "timelines";
//     this.discographies.forEach((discography) => {
//       timelinesEl.appendChild(discography.render());
//     });
//     timelinesEl.appendChild(this.renderTimelineAxis());
//     return timelinesEl;
//   }
// }
