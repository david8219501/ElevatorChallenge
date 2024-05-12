import { Elevator } from '../Elevators';

export class Factory_elevator {
    
    static create_elevators() {
        return new Elevator();
    }
}