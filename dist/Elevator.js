import {Settings} from "./Settings.js";
export class Elevator {
  constructor() {
    this.isElevatorAvailable = () => {
      return this.availableTime < Date.now();
    };
    this.getWaitingTime = () => {
      let free_time = 0;
      if (!this.isElevatorAvailable()) {
        free_time = (this.availableTime - Date.now()) / Settings.MILLI_SECOND;
      }
      return free_time;
    };
    this.updateAvailableTime = (targetFloor) => {
      if (this.isElevatorAvailable()) {
        this.availableTime = Date.now();
      }
      this.availableTime += (this.calculateDistance(targetFloor) + Settings.FLOOR_WAITING) * Settings.MILLI_SECOND;
    };
    this.calculateDistance = (targetFloor) => {
      const distance = Math.abs((targetFloor - this.currentFloor) * Settings.ELEVATOR_TRAVEL_TIME_SECONDS);
      return distance;
    };
    this.availableTime = Date.now();
    this.currentFloor = 0;
    this.elevatorImg = document.createElement("img");
    this.elevatorImg.src = "elv.png";
    this.elevatorImg.className = "elevator";
  }
  moveElevator(targetFloor) {
    const free_elevator = this.getWaitingTime() * Settings.MILLI_SECOND;
    const distance = this.calculateDistance(targetFloor);
    setTimeout(() => {
      this.elevatorImg.style.transition = `transform ${distance}s ease`;
      this.elevatorImg.style.transform = `translateY(${-targetFloor * Settings.FLOOR_HEIGHT + Settings.BLACK_LINE_HEIGHT}px)`;
    }, free_elevator);
    this.updateAvailableTime(targetFloor);
    this.currentFloor = targetFloor;
  }
  timeComingFloor(targetFloor) {
    let time_coming = this.getWaitingTime();
    time_coming += this.calculateDistance(targetFloor);
    return time_coming;
  }
}
