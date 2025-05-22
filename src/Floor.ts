import { Settings } from './Settings';

/**
 * Floor - A class representing a floor in a building.
 */
export class Floor {
    private callButton: HTMLButtonElement;
    private isCallAllowed: boolean;
    private arrivalSound: HTMLAudioElement;
    private countdownElement: HTMLDivElement;
    public floorElement: HTMLDivElement;

    /**
     * Constructs a Floor object.
     * 
     * @param floorNumber - The floor number.
     * @param elevatorRequest - A function to request an elevator.
     */
    constructor(floorNumber: number, elevatorRequest: (floorNumber: number, floor: Floor) => void) {
        this.floorElement = document.createElement("div");
        this.floorElement.className = "floor";

        this.callButton = document.createElement("button");
        this.callButton.className = "metal linear";
        this.callButton.textContent = floorNumber.toString();
        this.floorElement.appendChild(this.callButton);

        this.countdownElement = document.createElement("div");
        this.countdownElement.className = "timer";
        this.floorElement.appendChild(this.countdownElement);

        this.isCallAllowed = true;

        this.arrivalSound = new Audio(Settings.ELEVATOR_DING_SOUND_PATH);

        this.callButton.onclick = () => {
            if (this.isCallAllowed) {
                this.callButton.style.color = Settings.FLOOR_BUTTON_ACTIVE_COLOR;
                elevatorRequest(floorNumber, this);
                this.isCallAllowed = false;
            }
        };
    }

    /**
     * Handles elevator arrival: updates button, plays sound, and resets state.
     * 
     * @param arrivalTimeSec - Time in seconds until elevator arrives.
     */
    processElevatorArrival(arrivalTimeSec: number): void {
        // Restore button color and play sound when elevator arrives
        setTimeout(() => {
            this.callButton.style.color = Settings.FLOOR_BUTTON_DEFAULT_COLOR;
            this.playArrivalSound();
        }, arrivalTimeSec * Settings.SEC_TO_MS);

        // Allow button to be clicked again and stop sound after delay
        setTimeout(() => {
            this.isCallAllowed = true;
            this.arrivalSound.pause();
            this.arrivalSound.currentTime = 0;
        }, (arrivalTimeSec + Settings.ELEVATOR_WAIT_TIME_SEC) * Settings.SEC_TO_MS);
    }

    /**
     * Displays a countdown timer for elevator arrival.
     * 
     * @param secondsUntilArrival - Time in seconds until arrival.
     */
    displayTimer(secondsUntilArrival: number): void {
        let timerId = setInterval(() => {
            if (secondsUntilArrival <= 0) {
                clearInterval(timerId);
                this.countdownElement.textContent = "";
            } else {
                this.countdownElement.textContent = Math.trunc(secondsUntilArrival).toString();
                secondsUntilArrival -= 0.1;
            }
        }, 100);
    }

    /**
     * Plays the elevator arrival sound.
     */
    private playArrivalSound(): void {
        this.arrivalSound.play();
    }
}
