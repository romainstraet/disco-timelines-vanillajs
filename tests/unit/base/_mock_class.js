import Observer from "../../../src/base/observer";

export class ObserverImpl extends Observer {
  constructor() {
    super();
    this.state = "";
  }

  /** @param {any} state */
  update(state) {
    this.state = state;
  }
}
