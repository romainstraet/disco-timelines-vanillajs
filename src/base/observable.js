import Observer from "./observer";

export default class Observable {
  constructor() {
    if (this.constructor === Observable) {
      throw new TypeError(
        `Abstract class "${this.constructor.name}" cannot be instantiated directly`
      );
    }
    this.observers = [];
  }

  /**
   * @param {Observer} observer
   */
  subscribe(observer) {
    if (observer instanceof Observer) {
      this.observers.push(observer);
    }
  }

  /**

   * @param {Observer} observer
   */
  unsubscribe(observer) {
    let i = this.observers.indexOf(observer);
    if (i >= 0) this.observers.splice(i, 1);
  }

  /**
   * @param {any} data
   */
  notifyObservers(data) {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update(data);
    }
  }
}
