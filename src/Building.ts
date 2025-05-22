import type { Floor } from "./Floor";
import type { Elevator } from './Elevator';
import { ElevatorFactory } from './factorys/ElevatorFactory';
import { FloorFactory } from './factorys/FloorFactory';

/**
 * Building - A class representing a building with floors and elevators.
 */
export class Building {
    private elevatorList: Elevator[];
    private screenElement: HTMLDivElement | null;
    private floorContainer: HTMLDivElement;
    private buildingContainer: HTMLDivElement;

    /**
     * Constructs a Building object with the specified number of floors and elevators.
     * 
     * @param totalFloors - Total number of floors in the building.
     * @param totalElevators - Total number of elevators in the building.
     */
    constructor(totalFloors: number, totalElevators: number) {
        this.elevatorList = [];
        this.floorContainer = document.createElement("div");
        this.floorContainer.className = "floorBuilding";
        this.buildingContainer = document.createElement("div");
        this.buildingContainer.className = "building";

        const screen = document.getElementById('screen');
        if (screen) {
            this.screenElement = screen as HTMLDivElement;

            for (let floorIndex = 0; floorIndex < totalFloors; floorIndex++) {
                const floorInstance = FloorFactory.createFloor(floorIndex, this.handleElevatorRequest);
                this.floorContainer.appendChild(floorInstance.floorElement);

                if (floorIndex < totalFloors - 1) {
                    const floorSeparator = document.createElement("div");
                    floorSeparator.className = "blackLine";
                    floorInstance.floorElement.appendChild(floorSeparator);
                }
            }

            this.buildingContainer.appendChild(this.floorContainer);

            for (let i = 0; i < totalElevators; i++) {
                const elevatorInstance = ElevatorFactory.createElevator();
                this.elevatorList.push(elevatorInstance);
                this.buildingContainer.appendChild(elevatorInstance.elevatorImageElement);
            }

            this.screenElement.appendChild(this.buildingContainer);
        } else {
            this.screenElement = null;
            console.error("Element with id 'screen' not found!");
        }
    }

    /**
     * Returns the index of the elevator closest (in time) to the requested floor.
     * 
     * @param targetFloor - Floor number requesting the elevator.
     */
    private findClosestElevator = (targetFloor: number): number => {
        let minArrivalTime = this.elevatorList[0].timeComingFloor(targetFloor);
        let closestElevatorIndex = 0;

        for (let i = 1; i < this.elevatorList.length; i++) {
            const arrivalTime = this.elevatorList[i].timeComingFloor(targetFloor);
            if (arrivalTime < minArrivalTime) {
                minArrivalTime = arrivalTime;
                closestElevatorIndex = i;
            }
        }
        return closestElevatorIndex;
    }

    /**
     * Handles elevator request and sends the closest elevator.
     * 
     * @param targetFloorNumber - The floor number that requested the elevator.
     * @param floorInstance - The floor instance requesting the elevator.
     */
    private handleElevatorRequest = (targetFloorNumber: number, floorInstance: Floor): void => {
        const elevatorIndex = this.findClosestElevator(targetFloorNumber);
        const arrivalTime = this.elevatorList[elevatorIndex].timeComingFloor(targetFloorNumber);
        
        floorInstance.displayTimer(arrivalTime);
        floorInstance.processElevatorArrival(arrivalTime);
        this.elevatorList[elevatorIndex].moveElevator(targetFloorNumber);
    }
}
