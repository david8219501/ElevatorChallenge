import {FactoryElevators} from "./factorys/FactoryElevators.js";
import {FactoryFloors} from "./factorys/FactoryFloors.js";
export class Building {
  constructor(numFloors, numElevators) {
    this.getClosestElevator = (floorToMove) => {
      let minTimeComing = this.elevators[0].timeComingFloor(floorToMove);
      let index = 0;
      for (let i = 1; i < this.elevators.length; i++) {
        const timeComming = this.elevators[i].timeComingFloor(floorToMove);
        if (timeComming < minTimeComing) {
          minTimeComing = timeComming;
          index = i;
        }
      }
      return index;
    };
    this.sendElevator = (numFloors, currentFloor) => {
      const index = this.getClosestElevator(numFloors);
      const timeComing = this.elevators[index].timeComingFloor(numFloors);
      currentFloor.displayTimer(timeComing);
      currentFloor.processElevatorArrival(timeComing);
      this.elevators[index].moveElevator(numFloors);
    };
    this.elevators = [];
    this.floorBuilding = document.createElement("div");
    this.floorBuilding.className = "floorBuilding";
    this.building = document.createElement("div");
    this.building.className = "building";
    const screen = document.getElementById("screen");
    if (screen) {
      this.screen = screen;
      for (let i = 0; i < numFloors; i++) {
        const floorInstance = FactoryFloors.createFloors(i, this.sendElevator);
        this.floorBuilding.appendChild(floorInstance.floorContainer);
        if (i < numFloors - 1) {
          const blackLine = document.createElement("div");
          blackLine.className = "blackLine";
          floorInstance.floorContainer.appendChild(blackLine);
        }
      }
      this.building.appendChild(this.floorBuilding);
      if (numFloors > 1) {
        for (let i = 0; i < numElevators; i++) {
          const elevatorInstance = FactoryElevators.createElevators();
          this.elevators.push(elevatorInstance);
          this.building.appendChild(elevatorInstance.elevatorImg);
        }
      }
      this.screen.appendChild(this.building);
    } else {
      this.screen = null;
      console.error("Element with id 'screen' not found!");
    }
  }
}
