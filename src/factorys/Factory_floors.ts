import { Floor } from '../Floor';

export class Factory_floor {
    static createFloors(numFloors: number, sendCloseElevator: (numFloors: number, currentFloor: Floor) => void) {
        return new Floor(numFloors, sendCloseElevator);
    }
    
}