import { elFactory } from "./@element_factory";

/**
 * @param {function} onClick
 *@returns {HTMLElement}
 */
export function searchArtistInput(onClick) {
  let inputText = elFactory("input", { attributes: { type: "text" } });
  let inputSubmit = elFactory("input", {
    attributes: { type: "submit", value: "Add Artist" },
  });
  inputSubmit.onclick = (e) => {
    //@ts-ignore
    onClick(e.target.previousSibling.value);
    //@ts-ignore
    e.target.previousSibling.value = "";
    e.preventDefault();
  };

  return elFactory("form", {}, [inputText, inputSubmit]);
}
