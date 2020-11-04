import { elFactory } from "./_element_factory";

/**
 * @param {number} year
 * @returns {HTMLElement}
 */
export function timelineAxisYearEl(year) {
  let attributes = {
    class: "timeline-axis-year",
  };

  let style = year % 10 == 0 ? { color: "#1ed760" } : {};

  return elFactory("div", { attributes, style }, [year.toString()]);
}
