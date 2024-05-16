import { Floor } from '../Floor';

export class Factory_floors {
    static createFloors(numFloors: number, sendElevator: (numFloors: number, currentFloor: Floor) => void) {
        return new Floor(numFloors, sendElevator);
    }
    
} 