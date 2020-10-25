import Artist from "../models/artist";
import { elFactory } from "./@element_factory";
import { artistDiscoEl } from "./artist_disco";
import { artistFirstColEl } from "./artist_first_col";

/**
 * @param {Artist} artist
 * @param {number} startYear
 * @returns {HTMLElement}
 */
export function artistEl(artist, startYear) {
  let attributes = {
    id: artist.id,
    class: "timeline-artist",
    "data-artist": artist.name,
  };

  let children = [
    artistFirstColEl(artist),
    artistDiscoEl(artist.discography, startYear),
  ];

  return elFactory("div", { attributes }, children);
}
