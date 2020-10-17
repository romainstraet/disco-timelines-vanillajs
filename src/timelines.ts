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
    timelinesNode.style.width =
      200 +
      128 * (this.latestReleaseYear - this.earliestReleaseYear + 3) +
      "px";
    this.artists.forEach((artist) => {
      timelinesNode.appendChild(artist.render());
    });
    timelinesNode.appendChild(this.renderTimelineAxis());
    return timelinesNode;
  }

  private renderTimelineAxis(): HTMLElement {
    const axisNode = document.createElement("div");
    axisNode.dataset.timelinesAxis = "";
    axisNode.classList.add("flex");

    axisNode.appendChild(this.renderTimelineAxisFirstCol());
    this.generateYearsArray().forEach((year) => {
      const yearDiv = document.createElement("div");
      yearDiv.textContent = year.toString();
      yearDiv.classList.add("item");
      axisNode.appendChild(yearDiv);
    });
    return axisNode;
  }

  private renderTimelineAxisFirstCol(): HTMLElement {
    const axisTitleNode = document.createElement("div");
    axisTitleNode.classList.add("first-col");
    return axisTitleNode;
  }

  private generateYearsArray(): Array<number> {
    const yearsDiff = this.latestReleaseYear - this.earliestReleaseYear + 3;
    return Array.from(
      new Array(yearsDiff),
      (_, i) => i + this.earliestReleaseYear - 1
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
