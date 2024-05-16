import { Elevator } from '../Elevator';

/**
 * Factory_elevators - A class for creating Elevator objects.
 */
export class Factory_elevators {
    /**
     * Creates and returns an Elevator object.
     * 
     * @returns A new instance of the Elevator class.
     */
    static create_elevators(): Elevator {
        return new Elevator();
    }
}
