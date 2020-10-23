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

  subscribe(observer) {
    if (observer instanceof Observer) {
      this.observers.push(observer);
    }
  }

  unsubscribe(observer) {
    let i = this.observers.indexOf(observer);
    if (i >= 0) this.observers.splice(i, 1);
  }

  notifyObservers(data) {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].update(data);
    }
  }
}
