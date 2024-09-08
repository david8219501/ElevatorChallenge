import {Elevator} from "../Elevator.js";
export class FactoryElevators {
  static createElevators() {
    return new Elevator();
  }
}
