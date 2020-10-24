/**
 * @param {string} type
 * @param {object} attributes - https://developer.mozilla.org/fr/docs/Web/HTML/Attributs
 * @param {(HTMLElement|string)[]} children
 * @returns {HTMLElement}
 */
export function elFactory(type, attributes = {}, children = []) {
  let el = document.createElement(type);
  //let el = Object.assign(newEl, attributes);

  for (let key in attributes) {
    el.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
}
