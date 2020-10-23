import Observable from "../../../src/base/observable.js";
import Observer from "../../../src/base/observer.js";

describe("OBSERVABLE BASE CLASS", () => {
  test("Cannot be instantiated directly", () => {
    expect(() => new Observable()).toThrowError();
  });

  test("Can be implemented", () => {
    class ObservableImpl extends Observable {}
    expect(() => new ObservableImpl()).not.toThrowError();
  });

  describe("Implemented", () => {
    let observable;
    let observer;
    let observer2;
    let notAnObserver;

    beforeEach(() => {
      class ObservableImpl extends Observable {}
      class ObserverImpl extends Observer {
        constructor() {
          super();
          this.data = "";
        }
        update(data) {
          this.data = data;
        }
      }
      class Other {}
      observable = new ObservableImpl();
      observer = new ObserverImpl();
      observer2 = new ObserverImpl();
      notAnObserver = new Other();
    });

    test("Observers can subscribe", () => {
      observable.subscribe(observer);
      expect(observable.observers.length).toBe(1);
      expect(observable.observers).toContain(observer);
      observable.subscribe(observer2);
      expect(observable.observers.length).toBe(2);
      expect(observable.observers).toContain(observer2);
    });

    test("Not Observers cannot subscribe", () => {
      observable.subscribe(notAnObserver);
      expect(observable.observers.length).toBe(0);
    });

    describe("Observes has subscribed", () => {
      beforeEach(() => {
        observable.subscribe(observer);
        observable.subscribe(observer2);
      });

      test("Observers can unsubscribe", () => {
        observable.unsubscribe(observer);
        expect(observable.observers.length).toBe(1);
        expect(() => observable.unsubscribe(notAnObserver)).not.toThrowError();
        expect(observable.observers.length).toBe(1);
        observable.unsubscribe(observer2);
        expect(observable.observers.length).toBe(0);
      });

      test("Observers can be notified with new data", () => {
        observable.notifyObservers("data");
        expect(observer.data).toBe("data");
        expect(observer2.data).toBe("data");
        observable.notifyObservers("new data");
        expect(observer.data).toBe("new data");
        expect(observer2.data).toBe("new data");
      });
    });
  });
});
