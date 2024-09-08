import {Floor} from "../Floor.js";
export class FactoryFloors {
  static createFloors(numFloors, sendElevator) {
    return new Floor(numFloors, sendElevator);
  }
}
