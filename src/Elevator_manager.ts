import { Floor } from './Floors';
import { Elevator } from './Elevators';
import {Factory_floor} from './factorys/Factory_floors';
import {Factory_elevator} from './factorys/Factory_elevators';


class Building {
    floors: Floor[];
    elevators: Elevator[];

    screen: HTMLDivElement | null;
    floorBuildings: HTMLDivElement;
    building: HTMLDivElement;

    constructor(amount_floors: number, amount_elevators: number) {
        this.floors = [];
        this.elevators = []; 

        let floorBuildings = document.createElement("div");
        floorBuildings.className = "floorBuildings";
        let building = document.createElement("div");
        building.className = "building";

        const screen = document.getElementById('screen');
        if (screen) {
            this.screen = screen as HTMLDivElement;
            this.screen.appendChild(floorBuildings);

            for (let i = 0; i < amount_floors; i++) {
                let floorInstance = Factory_floor.create_floor(i, this.send_elevator);
                this.floors.push(floorInstance);
                floorBuildings.appendChild(floorInstance.floorElement);
                
                if (i < amount_floors - 1) {
                    let blackLine = document.createElement("div");
                    blackLine.className = "blackLine";
                    floorInstance.floorElement.appendChild(blackLine);
                }
            }

            building.appendChild(floorBuildings);

            if (amount_floors > 1) {
                for (let i = 0; i < amount_elevators; i++) {
                    let elevatorInstance = Factory_elevator.create_elevators();
                    this.elevators.push(elevatorInstance);
                    building.appendChild(elevatorInstance.elevator_img);
                }
            }

            screen.appendChild(building);
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

const x = new Building(99, 4);
const y = new Building(20, 3);
const z = new Building(15, 4);
