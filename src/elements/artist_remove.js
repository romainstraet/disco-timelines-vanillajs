import Artist from "../models/artist";
import { elFactory } from "./@element_factory";
import { artistDiscoEl } from "./artist_disco";
import { artistFirstColEl } from "./artist_first_col";

/**
 * @param {string} artistId
 * @returns {HTMLElement}
 */
export function artistRemoveButton(artistId) {
  let attributes = {
    class: "button-remove",
    "data-artist-id": artistId,
  };

  return elFactory("div", { attributes }, ["×"]);
}
