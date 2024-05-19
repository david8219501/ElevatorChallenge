import { Elevator } from '../Elevator';

/**
 * FactoryElevators - A class for creating Elevator objects.
 */
export class FactoryElevators {
    /**
     * Creates and returns an Elevator object.
     * 
     * @returns A new instance of the Elevator class.
     */
    static createElevators(): Elevator {
        return new Elevator();
    }
}
