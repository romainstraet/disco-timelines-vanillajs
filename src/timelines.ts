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
    return this;
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

//   generateYearsArray() {
//     const yearsDiff = this.latestRelease - this.earliestRelease + 1;
//     return Array.from(new Array(yearsDiff), (_, i) => i + this.earliestRelease);
//   }

//   renderTimelineAxis() {
//     const axisEl = document.createElement("div");
//     axisEl.dataset.timeline = "axis";
//     axisEl.className = "timeline";
//     const axisFirstColEl = document.createElement("div");
//     axisFirstColEl.className = "first-col";
//     axisFirstColEl.textContent = "The years";
//     axisEl.appendChild(axisFirstColEl);
//     const years = this.generateYearsArray();
//     years.forEach((year) => {
//       const childEl = document.createElement("div");
//       childEl.className = "year";
//       childEl.textContent = year;
//       axisEl.appendChild(childEl);
//     });
//     return axisEl;
//   }

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
