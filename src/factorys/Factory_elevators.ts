import { Elevator } from '../Elevator';

export class Factory_elevator {
    
    static create_elevators() {
        return new Elevator();
    }
}