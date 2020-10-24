import { elFactory } from "./@element_factory";

/**
 * @param {number} year
 * @returns {HTMLElement}
 */
export function timelineAxisYearEl(year) {
  let attributes = {
    class: "timeline-axis-year",
  };

  if (year % 10 == 0) {
    attributes.color = "#1ed760";
  }

  return elFactory("div", attributes, [year.toString()]);
}
