import {Settings} from "./Settings.js";
export class Floor {
  constructor(numFloor, requestElevator) {
    this.floorContainer = document.createElement("div");
    this.floorContainer.className = "floor";
    this.floorButton = document.createElement("button");
    this.floorButton.className = "metal linear";
    this.floorButton.textContent = numFloor.toString();
    this.floorContainer.appendChild(this.floorButton);
    this.timerDisplay = document.createElement("div");
    this.timerDisplay.className = "timer";
    this.floorContainer.appendChild(this.timerDisplay);
    this.isButtonClicked = true;
    this.elevatorSound = new Audio(Settings.ELEVATOR_SOUND_FILE);
    this.floorButton.onclick = () => {
      if (this.isButtonClicked && numFloor > 1) {
        this.floorButton.style.color = Settings.BUTTON_CLICKED_COLOR;
        requestElevator(numFloor, this);
        this.isButtonClicked = false;
      }
    };
  }
  processElevatorArrival(elevatorArrivalTime) {
    setTimeout(() => {
      this.floorButton.style.color = Settings.BUTTON_COLOR;
      this.playElevatorSound();
    }, elevatorArrivalTime * Settings.MILLI_SECOND);
    setTimeout(() => {
      this.isButtonClicked = true;
      this.elevatorSound.pause();
      this.elevatorSound.currentTime = 0;
    }, (elevatorArrivalTime + Settings.FLOOR_WAITING) * Settings.MILLI_SECOND);
  }
  displayTimer(time) {
    let intervalId = setInterval(() => {
      if (time <= 0) {
        clearInterval(intervalId);
        this.timerDisplay.textContent = "";
      } else {
        const displayTime = Math.trunc(time);
        this.timerDisplay.textContent = displayTime.toString();
        time -= 0.1;
      }
    }, 100);
  }
  playElevatorSound() {
    this.elevatorSound.play();
  }
}
