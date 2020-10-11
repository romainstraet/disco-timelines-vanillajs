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

  generateYearsArray() {
    const offset = 1;
    const yearsDiff =
      this.latestRelease + offset - (this.earliestRelease - offset) + 1;
    return Array.from(
      new Array(yearsDiff),
      (_, i) => i + (this.earliestRelease - offset)
    );
  }

  renderTimelineAxis() {
    const axisEl = document.createElement("div");
    axisEl.setAttribute("data-timeline", "axis");
    const years = this.generateYearsArray();
    years.forEach((year) => {
      const childEl = document.createElement("div");
      childEl.textContent = year;
      axisEl.appendChild(childEl);
    });
    return axisEl;
  }

  render() {
    const el = document.createElement("div");
    el.id = "timelines";
    this.discographies.forEach((discography) => {
      const discoEl = discography.render();
      el.appendChild(discoEl);
    });
    const axisEl = this.renderTimelineAxis();
    el.appendChild(axisEl);
    return el;
  }
}
