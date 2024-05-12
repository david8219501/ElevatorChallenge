import { Floor } from '../Floors';


export class Factory_floor {
    static create_floor(floor_number: number, send_close_elevator: (floor_number:number, current_floor :Floor) => void) {
        return new Floor(floor_number, send_close_elevator);
    }
    
}