import Artist from "./artist";
import {
  kEndYearOffset,
  kTimelineAxisYearWitdh,
  kTimelineFirstColWidth,
} from "./style";

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
    });
    return this;
  }

  private checkIfEarlierOrLaterRelease() {
    this.earliestReleaseYear = 0;
    this.latestReleaseYear = 0;
    this.artists.forEach((artist) => {
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
    });
  }

  render(): HTMLElement {
    this.checkIfEarlierOrLaterRelease();

    let timelinesNode = document.createElement("div");
    timelinesNode.id = "timelines";
    timelinesNode.dataset.timelines = "";
    timelinesNode.classList.add("timelines");
    timelinesNode.style.width = this.calculateWidthOfTimelines();
    this.artists.forEach((artist) => {
      //// TEST/////
      let artistRemoveNode = document.createElement("button");
      artistRemoveNode.dataset.artistRemove = artist.id;
      artistRemoveNode.classList.add("button-remove");
      artistRemoveNode.innerText = "x";
      artistRemoveNode.addEventListener("click", (e: MouseEvent) => {
        let node = e.target as HTMLElement;
        let artistId = node.dataset.artistRemove as string;
        let index = this.artists.findIndex((v) => v.id == artistId);
        this.artists.splice(index, 1);
        this.render();
      });
      //////TEST//////

      timelinesNode.appendChild(
        artist.render(this.earliestReleaseYear, artistRemoveNode)
      );
    });
    timelinesNode.appendChild(this.renderTimelineAxis());
    document.getElementById("timelines")!.replaceWith(timelinesNode);
    return timelinesNode;
  }

  private renderTimelineAxis(): HTMLElement {
    const axisNode = document.createElement("div");
    axisNode.dataset.timelinesAxis = "";
    axisNode.classList.add("timeline-axis");
    axisNode.appendChild(this.renderTimelineAxisFirstCol());
    this.generateYearsArray().forEach((year) => {
      const yearNode = this.renderTimelineAxisYearCol(year);
      if (year % 10 == 0) {
        yearNode.style.color = "#1ed760";
      }
      axisNode.appendChild(yearNode);
    });
    return axisNode;
  }

  private renderTimelineAxisFirstCol(): HTMLElement {
    const axisTitleNode = document.createElement("div");
    axisTitleNode.classList.add("timeline-axis-first-col");
    return axisTitleNode;
  }

  private renderTimelineAxisYearCol(year: number): HTMLElement {
    const yearNode = document.createElement("div");
    yearNode.textContent = year.toString();
    yearNode.classList.add("timeline-axis-year");
    return yearNode;
  }

  private generateYearsArray(): Array<number> {
    const yearsDiff =
      this.latestReleaseYear - this.earliestReleaseYear + 1 + kEndYearOffset;
    return Array.from(
      new Array(yearsDiff),
      (_, i) => i + this.earliestReleaseYear
    );
  }

  private calculateWidthOfTimelines(): string {
    return (
      kTimelineFirstColWidth +
      kTimelineAxisYearWitdh *
        (this.latestReleaseYear -
          this.earliestReleaseYear +
          1 +
          kEndYearOffset) +
      "px"
    );
  }

  removeArtist() {}
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
