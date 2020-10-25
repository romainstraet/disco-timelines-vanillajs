import Observer from "../../../src/base/observer";

export class ObserverImpl extends Observer {
  constructor() {
    super();
    this.state = "";
  }

  update() {
    this.state = "updated";
  }
}
