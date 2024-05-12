export class Elevator {
    private lets_floor: number;
    elevator_img: HTMLImageElement;
    free_time_elevetor: number;
    time_coming_to_floor : number;


    constructor() {
        this.free_time_elevetor = Date.now();
        this.time_coming_to_floor = 0
        this.lets_floor = 0;
        this.elevator_img = document.createElement("img");
        this.elevator_img.src = 'elv.png';
        this.elevator_img.className = "elevator";
    }

    elevator_move(floor_number: number) {
        let free_elevator: number = this.free_time_elevator() * 1000;
        let distance :number = this.distance_floors(floor_number);
        setTimeout(() => {
            this.elevator_img.style.transition =  `transform ${distance}s ease`;
            this.elevator_img.style.transform = `translateY(${(-floor_number*110) + 7}px)`;
        }, free_elevator);
        this.update_free_time(floor_number);
        this.lets_floor = floor_number;
    }

    
    elevator_available = () => {
       return this.free_time_elevetor < Date.now();
    }

    free_time_elevator = () => {
        let free_time: number = 0; 
        if (!this.elevator_available()) {
            free_time = (this.free_time_elevetor - Date.now())/1000;
        }
        return free_time;
    }

    update_free_time = (floor_number: number) => {
        if (this.elevator_available()) {
            this.free_time_elevetor = Date.now();
        }
        this.free_time_elevetor += (this.distance_floors(floor_number) + 2)*1000;
    }

    distance_floors = (floor_number: number) => {
        let distance = Math.abs((floor_number - this.lets_floor)/ 2);
        return distance;
    }

    time_coming_floor(floor_number: number){
        let time_coming: number;
        time_coming = this.free_time_elevator();
        time_coming += this.distance_floors(floor_number);
        return time_coming;
    } 
}