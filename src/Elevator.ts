import { Settings } from "./Settings";

/**
 * Elevator - A class representing an elevator.
 */
export class Elevator {
    private currentFloor: number;
    private availableTime: number;
    public elevatorImg: HTMLImageElement;

    /**
     * Constructs an Elevator object.
     */
    constructor() {
        this.availableTime = Date.now();
        this.currentFloor = 0;
        this.elevatorImg = document.createElement("img");
        this.elevatorImg.src = 'elv.png';
        this.elevatorImg.className = "elevator";
    }

    /**
     * Moves the elevator to the specified target floor.
     * 
     * @param targetFloor - The floor to move the elevator to.
     */
    moveElevator(targetFloor: number): void {
        const free_elevator: number = this.getWaitingTime() * Settings.MILLI_SECOND;
        const distance: number = this.calculateDistance(targetFloor);
        setTimeout(() => {
            // Apply transition effect to smoothly move the elevator
            this.elevatorImg.style.transition = `transform ${distance}s ease`;
            // Move the elevator to the target floor
            this.elevatorImg.style.transform = `translateY(${(-targetFloor * Settings.FLOOR_HEIGHT) + Settings.BLACK_LINE_HEIGHT}px)`;
        }, free_elevator);
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
    getWaitingTime = (): number => {
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
        let time_coming: number = this.getWaitingTime();
        time_coming += this.calculateDistance(targetFloor);
        return time_coming;
    }
}
