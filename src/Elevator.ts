import { Settings } from "./Settings";

export class Elevator {
    private currentFloor: number;
    private availableTime: number;
    elevatorImg: HTMLImageElement;


    constructor() {
        this.availableTime = Date.now();
        this.currentFloor = 0;
        this.elevatorImg = document.createElement("img");
        this.elevatorImg.src = 'elv.png';
        this.elevatorImg.className = "elevator";
    }

    moveElevator(targetFloor: number) {
        let free_elevator: number = this.getWaitingTime() * Settings.MILLI_SECOND;
        let distance :number = this.calculateDistance(targetFloor);
        setTimeout(() => {
            this.elevatorImg.style.transition =  `transform ${distance}s ease`;
            this.elevatorImg.style.transform = `translateY(${(-targetFloor*Settings.FLOOR_HEIGHT)+Settings.BLACK_LINE_HEIGHT}px)`;
        }, free_elevator);
        this.updateAvailableTime(targetFloor);
        this.currentFloor = targetFloor;
    }

    
    isElevatorAvailable = () => {
       return this.availableTime < Date.now();
    }

    getWaitingTime = () => {
        let free_time: number = 0; 
        if (!this.isElevatorAvailable()) {
            free_time = (this.availableTime - Date.now())/Settings.MILLI_SECOND;
        }
        return free_time;
    }

    updateAvailableTime = (floor_number: number) => {
        if (this.isElevatorAvailable()) {
            this.availableTime = Date.now();
        }
        this.availableTime += (this.calculateDistance(floor_number)+Settings.FLOOR_WAITING)*Settings.MILLI_SECOND;
    }

    calculateDistance = (floor_number: number) => {
        let distance = Math.abs((floor_number - this.currentFloor)/Settings.FLOOR_WAITING);
        return distance;
    }

    timeComingFloor(floor_number: number){
        let time_coming: number;
        time_coming = this.getWaitingTime();
        time_coming += this.calculateDistance(floor_number);
        return time_coming;
    } 
}