import { elFactory } from "./@element_factory";

/**
 * @returns {HTMLElement}
 */
export function timelineAxisFirstColEl() {
  let attributes = {
    class: "timeline-axis-first-col",
  };

  return elFactory("div", { attributes });
}
