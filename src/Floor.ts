import { Settings } from './Settings';

/**
 * Floor - A class representing a floor in a building.
 */
export class Floor {
    private floorButton: HTMLButtonElement;
    private isButtonClicked: boolean;
    private elevatorSound: HTMLAudioElement;
    private timerDisplay: HTMLDivElement;
    public floorContainer: HTMLDivElement;

    /**
     * Constructs a Floor object.
     * 
     * @param numFloors - The floor number.
     * @param requestElevator - A function to request an elevator.
     */
    constructor(numFloors: number, requestElevator: (numFloors: number, currentFloor: Floor) => void) {
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

    /**
     * Processes the arrival of the elevator at the floor.
     * 
     * @param arrivalTime - The time in seconds until the elevator arrives.
     */
    processElevatorArrival(arrivalTime: number): void {
        setTimeout(() => {
            this.floorButton.style.color = Settings.BUTTON_COLOR;
            this.playElevatorSound();
        }, arrivalTime * Settings.MILLI_SECOND);

        setTimeout(() => {
            this.isButtonClicked = true;
        }, (arrivalTime + Settings.FLOOR_WAITING) * Settings.MILLI_SECOND);
    }

    /**
     * Displays a countdown timer showing the time until the elevator arrives.
     * 
     * @param time - The time in seconds until the elevator arrives.
     */
    displayTimer(time: number): void {
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

    /**
     * Plays the elevator sound.
     */
    private playElevatorSound(): void {
        this.elevatorSound.play();
    }
}
