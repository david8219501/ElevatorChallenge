import { Floor } from "./Floor";
import { Elevator } from './Elevator';
// import {Factory_floor} from './factorys/Factory_floors';
// import {Factory_elevator} from './factorys/Factory_elevators';


class Factory {
    static create_floor(floor_number: number, send_close_elevator: (floor_number:number, current_floor :Floor) => void) {
        return new Floor(floor_number, send_close_elevator);
    }
    
    static create_elevators() {
        return new Elevator();
    }
}



class Buildings {
    floors: Floor[];
    elevators: Elevator[];

    screen: HTMLDivElement | null;
    floorBuildings: HTMLDivElement;
    building: HTMLDivElement;

    constructor(amount_floors: number, amount_elevators: number) {
        this.floors = [];
        this.elevators = []; 

        this.floorBuildings = document.createElement("div");
        this.floorBuildings.className = "floorBuildings";
        this.building = document.createElement("div");
        this.building.className = "building";

        const screen = document.getElementById('screen');
        if (screen) {
            this.screen = screen as HTMLDivElement;
            this.screen.appendChild(this.floorBuildings);

            for (let i = 0; i < amount_floors; i++) {
                let floorInstance = Factory.create_floor(i, this.send_elevator);
                this.floors.push(floorInstance);
                this.floorBuildings.appendChild(floorInstance.floorElement);
                
                if (i < amount_floors - 1) {
                    let blackLine = document.createElement("div");
                    blackLine.className = "blackLine";
                    floorInstance.floorElement.appendChild(blackLine);
                }
            }

            this.building.appendChild(this.floorBuildings);

            if (amount_floors > 1) {
                for (let i = 0; i < amount_elevators; i++) {
                    let elevatorInstance = Factory.create_elevators();
                    this.elevators.push(elevatorInstance);
                    this.building.appendChild(elevatorInstance.elevator_img);
                }
            }

            screen.appendChild(this.building);
        } else {
            this.screen = null;
            console.error("Element with id 'screen' not found!");
        }
    }
    

    close_elevator = (floor_to_move: number) => {
        let min_time_comming:number = this.elevators[0].time_coming_floor(floor_to_move);
        let index: number = 0;
    
        for (let i = 1; i < this.elevators.length; i++) {
            let i_time_comming = this.elevators[i].time_coming_floor(floor_to_move);
            if (i_time_comming < min_time_comming) {
                min_time_comming = i_time_comming;
                index = i;
            }
        }
        return index;
    }

    send_elevator = (floor_number: number, current_floor :Floor)=>{
        let index = this.close_elevator(floor_number);
        let time_coming = this.elevators[index].time_coming_floor(floor_number);
        current_floor.screen_timer(time_coming)
        current_floor.floor_release(time_coming);

        this.elevators[index].elevator_move(floor_number);
    }

    
    
}

// Create instances of Buildings
const x = new Buildings(99, 4);
const y = new Buildings(20, 3);
const z = new Buildings(15, 4);
