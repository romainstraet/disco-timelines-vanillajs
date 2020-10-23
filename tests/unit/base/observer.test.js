import Observer from "../../../src/base/observer.js";

describe("OBSERVER BASE CLASS", () => {
  test("Cannot be instantiated directly", async () => {
    expect(() => new Observer()).toThrowError();
  });

  test("Can be implemented", async () => {
    class ObserverImpl extends Observer {}
    expect(() => new ObserverImpl()).not.toThrowError();
  });

  describe("Implemented", () => {
    let observer;

    beforeEach(() => {
      class ObserverImpl extends Observer {}
      observer = new ObserverImpl();
    });

    test("Update method should be implemented", async () => {
      expect(() => observer.update("data")).toThrowError();
    });

    test("Update method should be implemented", async () => {
      /** @param {any} x */
      observer.update = (x) => x;
      let res = observer.update("data");
      expect(res).toBe("data");
    });
  });
});
