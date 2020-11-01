/**
 * @typedef {object} Options
 * @property {object=} attributes - https://developer.mozilla.org/fr/docs/Web/HTML/Attributs
 * @property {object=} style
 */

/**
 * @param {string} type
 * @param {Options=} options
 * @param {(HTMLElement|string)[]=} children
 * @returns {HTMLElement}
 */
export function elFactory(type, options = {}, children = []) {
  let el = document.createElement(type);

  for (let key in options.attributes) {
    el.setAttribute(key, options.attributes[key]);
  }

  for (let key in options.style) {
    el.style[key] = options.style[key];
  }

  children.forEach((child) => {
    if (typeof child === "string") {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });
  //options.children.forEach((child) => {});
  return el;
}
