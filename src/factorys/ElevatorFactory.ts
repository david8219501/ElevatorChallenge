import { Elevator } from '../Elevator';

/**
 * ElevatorFactory - Responsible for creating Elevator instances.
 */
export class ElevatorFactory {
    /**
     * Creates and returns a new Elevator instance.
     *
     * @returns A new Elevator instance.
     */
    static createElevator(): Elevator {
        return new Elevator();
    }
}
