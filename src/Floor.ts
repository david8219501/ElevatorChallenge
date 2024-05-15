import { Settings } from './Settings';

export class Floor {
    private numFloors: number;
    private floorButton: HTMLButtonElement;
    private isButtonClicked: boolean;
    private elevatorSound: HTMLAudioElement;
    private timerDisplay: HTMLDivElement;
    public floorContainer: HTMLDivElement;

    constructor(numFloors: number, requestElevator: (numFloors: number, currentFloor: Floor) => void) {
        this.numFloors = numFloors;
        this.floorContainer = document.createElement("div");
        this.floorContainer.className = "floor";
        this.floorButton = document.createElement("button");
        this.floorButton.className = "metal linear";
        this.floorButton.textContent = numFloors.toString();
        this.floorContainer.appendChild(this.floorButton);
        this.timerDisplay = document.createElement("div");
        this.timerDisplay.className = "timer";
        this.floorContainer.appendChild(this.timerDisplay);
        this.isButtonClicked = true;
        this.elevatorSound = new Audio(Settings.ELEVATOR_SOUND_FILE);

        this.floorButton.onclick = () => {
            if (this.isButtonClicked) {
                this.floorButton.style.color = Settings.BUTTON_CLICKED_COLOR;
                requestElevator(numFloors, this);
                this.isButtonClicked = false;
            }
        };
    }

    processElevatorArrival(arrivalTime: number) {
        setTimeout(() => {
            this.floorButton.style.color = Settings.BUTTON_COLOR;
            this.playElevatorSound();
        }, arrivalTime * Settings.MILLI_SECOND);

        setTimeout(() => {
            this.isButtonClicked = true;
        }, (arrivalTime + Settings.FLOOR_WAITING) * Settings.MILLI_SECOND);
    }

    displayTimer(time: number) {
        let intervalId = setInterval(() => {
            if (time <= 0) {
                clearInterval(intervalId);
                this.timerDisplay.textContent = "";
            } else {
                const displayTime = Math.trunc(time);
                this.timerDisplay.textContent = displayTime.toString();
                time = time - 0.1;
            }
        }, 100);
    }

    private playElevatorSound() {
        this.elevatorSound.play();
    }
}