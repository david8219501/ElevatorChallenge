import { Settings } from "./Settings";

/**
 * Elevator - A class representing an elevator.
 */
export class Elevator {
    private currentFloor: number;
    private availableTime: number;
    public elevatorImageElement: HTMLImageElement;

    /**
     * Constructs an Elevator object.
     */
    constructor() {
        this.availableTime = Date.now();
        this.currentFloor = 0;
        this.elevatorImageElement = document.createElement("img");
        this.elevatorImageElement.src = 'elv.png';
        this.elevatorImageElement.className = "elevator";
    }

    /**
     * Moves the elevator to the specified target floor.
     * 
     * @param targetFloor - The floor to move the elevator to.
     */
    moveElevator(targetFloor: number): void {
        const delayBeforeMoveMs: number = this.getRemainingWaitTimeSec() * Settings.MILLI_SECOND;
        const travelDurationSec: number = this.calculateDistance(targetFloor);
        setTimeout(() => {
            // Apply transition effect to smoothly move the elevator
            this.elevatorImageElement.style.transition = `transform ${travelDurationSec}s ease`;
            // Move the elevator to the target floor
            this.elevatorImageElement.style.transform = `translateY(${(-targetFloor * Settings.FLOOR_HEIGHT) + Settings.BLACK_LINE_HEIGHT}px)`;
        }, delayBeforeMoveMs);
        this.updateAvailableTime(targetFloor);
        this.currentFloor = targetFloor;
    }


    /**
     * Checks if the elevator is available.
     * 
     * @returns True if the elevator is available, false otherwise.
     */
    isElevatorAvailable = (): boolean => {
        return this.availableTime < Date.now();
    }

    /**
     * Gets the waiting time until the elevator becomes available.
     * 
     * @returns The waiting time in milliseconds.
     */
    getRemainingWaitTimeSec = (): number => {
        let free_time: number = 0;
        if (!this.isElevatorAvailable()) {
            free_time = (this.availableTime - Date.now()) / Settings.MILLI_SECOND;
        }
        return free_time;
    }

    /**
     * Updates the available time for the elevator based on the number of floors to travel.
     * 
     * @param targetFloor - The number of floors to travel.
     */
    updateAvailableTime = (targetFloor: number): void => {
        if (this.isElevatorAvailable()) {
            this.availableTime = Date.now();
        }
        this.availableTime += (this.calculateDistance(targetFloor) + Settings.FLOOR_WAITING) * Settings.MILLI_SECOND;
    }

    /**
     * Calculates the distance (in terms of time) to travel to the specified floor.
     * 
     * @param targetFloor - The target floor.
     * @returns The calculated distance.
     */
    calculateDistance = (targetFloor: number): number => {
        const distance = Math.abs((targetFloor - this.currentFloor) * Settings.ELEVATOR_TRAVEL_TIME_SECONDS);
        return distance;
    }

    /**
     * Calculates the time needed to arrive at the specified floor.
     * 
     * @param targetFloor - The target floor.
     * @returns The time needed to arrive at the target floor.
     */
    timeComingFloor(targetFloor: number): number {
        let time_coming: number = this.getRemainingWaitTimeSec();
        time_coming += this.calculateDistance(targetFloor);
        return time_coming;
    }
}
