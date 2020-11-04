import { elFactory } from "./_element_factory";


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
