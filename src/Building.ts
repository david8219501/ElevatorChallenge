import type { Floor } from "./Floor";
import type { Elevator } from './Elevator';
import { FactoryElevators } from './factorys/FactoryElevators';
import { FactoryFloors } from './factorys/FactoryFloors';

/**
 * Building - A class representing a building with floors and elevators.
 */
export class Building {
    private elevators: Elevator[];
    private screen: HTMLDivElement | null;
    private floorBuilding: HTMLDivElement;
    private building: HTMLDivElement;

    /**
     * Constructs a Building object with the specified number of floors and elevators.
     * 
     * @param numFloors - The number of floors in the building.
     * @param numElevators - The number of elevators in the building.
     */
    constructor(numFloors: number, numElevators: number) {
        this.elevators = [];
        this.floorBuilding = document.createElement("div");
        this.floorBuilding.className = "floorBuilding";
        this.building = document.createElement("div");
        this.building.className = "building";

        const screen = document.getElementById('screen');
        if (screen) {
            this.screen = screen as HTMLDivElement;

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

    /**
     * Finds the closest elevator to the specified floor.
     * 
     * @param floorToMove - The floor to move the elevator to.
     * @returns The index of the closest elevator.
     */
    private getClosestElevator = (floorToMove: number): number => {
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
    }

    /**
     * Sends the closest elevator to the specified floor.
     * 
     * @param numFloors - The number of floors in the building.
     * @param currentFloor - The current floor object requesting the elevator.
     */
    private sendElevator = (numFloors: number, currentFloor: Floor): void => {
            const index = this.getClosestElevator(numFloors);
            const timeComing = this.elevators[index].timeComingFloor(numFloors);
            currentFloor.displayTimer(timeComing);
            currentFloor.processElevatorArrival(timeComing);
            this.elevators[index].moveElevator(numFloors);
    }
}



