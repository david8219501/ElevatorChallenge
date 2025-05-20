import { Floor } from '../Floor';

/**
 * FloorFactory - Responsible for creating Floor instances.
 */
export class FloorFactory {
    /**
     * Creates and returns a new Floor instance.
     * 
     * @param floorNumber - The number of the floor .
     * @param requestElevator - A callback function to request an elevator to this floor.
     * @returns A new Floor instance.
     */
    static createFloor(
        floorNumber: number, 
        requestElevator: (floorNumber: number, currentFloor: Floor) => void
    ): Floor {
        return new Floor(floorNumber, requestElevator);
    }
}
