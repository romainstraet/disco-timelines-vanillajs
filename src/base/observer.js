export default class Observer {
  constructor() {
    if (this.constructor === Observer) {
      throw new TypeError(
        `Abstract class "${this.constructor.name}" cannot be instantiated directly`
      );
    }
  }

  update(data) {
    throw new Error("Unimplemented method");
  }
}
