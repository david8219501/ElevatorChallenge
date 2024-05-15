import { Floor } from "./Floor";
import { Elevator } from './Elevator';

class Factory {
    static createFloor(numFloors: number, sendCloseElevator: (numFloors: number, currentFloor: Floor) => void) {
        return new Floor(numFloors, sendCloseElevator);
    }

    static createElevator() {
        return new Elevator();
    }
}

class Buildings {
    private floors: Floor[];
    private elevators: Elevator[];
    private screen: HTMLDivElement | null;
    private floorBuildings: HTMLDivElement;
    private building: HTMLDivElement;

    constructor(numFloors: number, numElevators: number) {
        this.floors = [];
        this.elevators = [];
        this.floorBuildings = document.createElement("div");
        this.floorBuildings.className = "floorBuildings";
        this.building = document.createElement("div");
        this.building.className = "building";

        const screen = document.getElementById('screen');
        if (screen) {
            this.screen = screen as HTMLDivElement;
            this.screen.appendChild(this.floorBuildings);

            for (let i = 0; i < numFloors; i++) {
                const floorInstance = Factory.createFloor(i, this.sendElevator);
                this.floors.push(floorInstance);
                this.floorBuildings.appendChild(floorInstance.floorContainer);

                if (i < numFloors - 1) {
                    const blackLine = document.createElement("div");
                    blackLine.className = "blackLine";
                    floorInstance.floorContainer.appendChild(blackLine);
                }
            }

            this.building.appendChild(this.floorBuildings);

            if (numFloors > 1) {
                for (let i = 0; i < numElevators; i++) {
                    const elevatorInstance = Factory.createElevator();
                    this.elevators.push(elevatorInstance);
                    this.building.appendChild(elevatorInstance.elevatorImg);
                }
            }

            screen.appendChild(this.building);
        } else {
            this.screen = null;
            console.error("Element with id 'screen' not found!");
        }
    }

    private getClosestElevator = (floorToMove: number) => {
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

    private sendElevator = (numFloors: number, currentFloor: Floor) => {
        const index = this.getClosestElevator(numFloors);
        const timeComing = this.elevators[index].timeComingFloor(numFloors);
        currentFloor.displayTimer(timeComing);
        currentFloor.processElevatorArrival(timeComing);
        this.elevators[index].moveElevator(numFloors);
    }
}

// Create instances of Buildings
const y = new Buildings(20, 3);
const z = new Buildings(15, 4);
const j = new Buildings(20, 3);
const l = new Buildings(15, 4);