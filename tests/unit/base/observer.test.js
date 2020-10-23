import Observer from "../../../src/base/observer.js";

describe("OBSERVER BASE CLASS", () => {
  test("Cannot be instantiated directly", () => {
    expect(() => new Observer()).toThrowError();
  });

  test("Can be implemented", () => {
    class ObserverImpl extends Observer {}
    expect(() => new ObserverImpl()).not.toThrowError();
  });
  describe("Implemented", () => {
    let observer;

    beforeEach(() => {
      class ObserverImpl extends Observer {}
      observer = new ObserverImpl();
    });

    test("Update method should be implemented", () => {
      expect(() => observer.update("data")).toThrowError();
    });

    test("Update method should be implemented", () => {
      observer.update = (x) => x;
      let res = observer.update("data");
      expect(res).toBe("data");
    });
  });
});
