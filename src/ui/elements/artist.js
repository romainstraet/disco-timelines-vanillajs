import Artist from "../../models/artist";
import { elFactory } from "./_element_factory";
import { artistDiscoEl } from "./artist_disco";
import { artistFirstColEl } from "./artist_first_col";
import { artistRemoveButton } from "./artist_remove";

/**
 * @param {Artist} artist
 * @param {number} startYear
 * @param {function} onRemove
 * @returns {HTMLElement}
 */
export function artistEl(artist, startYear, onRemove) {
  let attributes = {
    id: artist.id,
    class: "timeline-artist",
    "data-artist": artist.name,
  };

  let removeButtonChild = artistRemoveButton(artist.id);
  removeButtonChild.onclick = () => onRemove();

  let firstColChild = artistFirstColEl(artist);
  firstColChild.appendChild(removeButtonChild);

  let discoChild = artistDiscoEl(artist.discography, startYear);

  let children = [firstColChild, discoChild];

  return elFactory("div", { attributes }, children);
}
