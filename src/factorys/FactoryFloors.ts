import { Floor } from '../Floor';

/**
 * FactoryFloors - A class for creating Floor objects.
 */
export class FactoryFloors {
    /**
     * Creates and returns a Floor object.
     * 
     * @param numFloors - The number of floors in the building.
     * @param sendElevator - A function that sends an elevator to a specific floor.
     * @returns A Floor object with the provided data.
     */
    static createFloors(numFloors: number, sendElevator: (numFloors: number, currentFloor: Floor) => void): Floor {
        return new Floor(numFloors, sendElevator);
    }
}
