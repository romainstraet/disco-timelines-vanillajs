import { elFactory } from "./_element_factory";


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
