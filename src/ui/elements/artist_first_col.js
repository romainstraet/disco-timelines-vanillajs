import Artist from "../../models/artist";
import { elFactory } from "./_element_factory";

/**
 * @param {Artist} artist
 * @returns {HTMLElement}
 */
export function artistFirstColEl(artist) {
  let attributes = {
    class: "timeline-artist-first-col",
  };

  let style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${artist.imageUrl})`,
  };

  let children = [elFactory("h2", {}, [artist.name])];

  return elFactory("div", { attributes, style }, children);
}
