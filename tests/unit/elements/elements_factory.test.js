import { elFactory } from "../../../src/elements/@element_factory";

describe("ELEMENT FACTORY FUNCTION", () => {
  test("Should create an HTML Element", async () => {
    let el = elFactory("div");
    expect(el instanceof HTMLElement).toBeTruthy();
    expect(el.tagName.toLowerCase()).toBe("div");
  });

  test("Should create the element with attributes", async () => {
    let el = elFactory("div", { id: 1, class: "element", "data-name": "el" });
    expect(el.id).toContain(1);
    expect(el.className).toContain("element");
    expect(el.dataset.name).toContain("el");
  });

  test("Should create the element with children", async () => {
    let children = [elFactory("div"), "Hello"];
    let el = elFactory("div", { id: 1 }, children);
    expect(el.childNodes.length).toBe(2);
    expect(el.children[0].tagName.toLowerCase()).toBe("div");
    expect(el.textContent).toBe("Hello");
  });
});
