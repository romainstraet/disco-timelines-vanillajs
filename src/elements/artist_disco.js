import Album from "../models/album";
import { elFactory } from "./@element_factory";
import { artistDiscoAlbumEl } from "./artist_disco_album";

/**
 * @param {Album[]} discography
 * @param {number} startYear
 * @returns {HTMLElement}
 */
export function artistDiscoEl(discography, startYear) {
  let attributes = {
    class: "timeline-artist-disco",
    "data-artist-discography": "",
  };

  let albumChildren = [];
  for (let i = 0; i < discography.length; i++) {
    let albumEl = artistDiscoAlbumEl(discography[i], startYear, i % 2 == 0);
    albumChildren.push(albumEl);
  }

  return elFactory("div", { attributes }, albumChildren);
}
