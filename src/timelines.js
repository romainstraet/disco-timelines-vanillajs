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

  render() {
    const el = document.createElement("div");
    el.id = "timelines";
    this.discographies.forEach((discography, i) => {
      const childEl = document.createElement("div");
      childEl.setAttribute("data-timeline", i);
      childEl.textContent = discography.name;
      el.appendChild(childEl);
    });
    const axisEl = document.createElement("div");
    axisEl.setAttribute("data-timeline", "axis");
    const offset = 1;
    const yearsDiff =
      this.latestRelease + offset - (this.earliestRelease - offset) + 1;
    const years = Array.from(
      new Array(yearsDiff),
      (x, i) => i + (this.earliestRelease - offset)
    );
    years.forEach((year) => {
      const childEl = document.createElement("div");
      childEl.textContent = year;
      axisEl.appendChild(childEl);
    });
    el.appendChild(axisEl);

    return el;
  }
}
