import { Elevator } from '../Elevator';

export class Factory_elevators {
    
    static create_elevators() {
        return new Elevator();
    }
}