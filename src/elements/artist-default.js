import Artist from "../models/artist";
import { elFactory } from "./@element_factory";
import { artistDiscoEl } from "./artist_disco";
import { artistFirstColEl } from "./artist_first_col";

/**

 * @returns {HTMLElement}
 */
export function artistDefaultEl() {
  let attributes = {
    class: "timeline-artist",
  };

  let el = elFactory("div", { attributes });

  el.innerHTML = `
    <div class="timeline-artist-first-col">
        <h2>Add an artist</h2>
    </div>
    <div class="timeline-artist-disco"></div>
    `;

  return el;
}
