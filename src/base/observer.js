export default class Observer {
  constructor() {
    if (this.constructor === Observer) {
      throw new TypeError(
        `Abstract class "${this.constructor.name}" cannot be instantiated directly`
      );
    }
  }

  /**
   * @param {any} data
   */
  update(data) {
    throw new Error("Unimplemented method");
  }
}
