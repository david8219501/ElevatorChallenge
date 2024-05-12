class Factory {
    static create_floor(floor_number: number, send_close_elevator: (floor_number:number, current_floor :Floor) => void) {
        return new Floor(floor_number, send_close_elevator);
    }
    
    static create_elevators() {
        return new Elevator();
    }
}

class Floor {
    private floor_number: number;
    buttonElement: HTMLButtonElement;
    floorElement: HTMLDivElement;
    flag_button: boolean;
    private sound: HTMLAudioElement;
    timerElement: HTMLDivElement;

    constructor(floor_number: number, send_elevator: (floor_number:number, current_floor :Floor) => void, ) {
        this.floor_number = floor_number;
        this.floorElement = document.createElement("div");
        this.floorElement.className = "floor";
        this.buttonElement = document.createElement("button");
        this.buttonElement.className = "metal linear";
        this.buttonElement.textContent = this.floor_number.toString();
        this.floorElement.appendChild(this.buttonElement);
        this.timerElement = document.createElement("div");
        this.timerElement.className = "timer";
        this.floorElement.appendChild(this.timerElement);
        this.flag_button = true;
        this.sound = new Audio('../public/ding.mp3');
        this.buttonElement.onclick = () => {
        if (this.flag_button) {
            this.buttonElement.style.color = "green";
            send_elevator(floor_number, this);
            this.flag_button = false;}
        }; 
    }
    
    floor_release(time_release:number) {
        setTimeout(() => {
            console.log(time_release)
            this.buttonElement.style.color =  "hsla(0,0%,20%,1)";
            this.playSound();
            this.flag_button = true;
            this.playSound();
        }, time_release * 1000);
    }

    screen_timer(time) {
        let intervalId = setInterval(() => {
            if (time <= 0) {
                clearInterval(intervalId);
                this.timerElement.textContent = "";
            } else {
                let displayTime = Math.trunc(time); 
                this.timerElement.textContent = displayTime.toString(); 
                time = time - 0.1;
            }
        }, 100);
    }

    private playSound() {
        this.sound.play();
    }
}

class Elevator {
    private lets_floor: number;
    elevator_img: HTMLImageElement;
    free_time_elevetor: number;
    time_coming_to_floor : number;


    constructor() {
        this.free_time_elevetor = Date.now();
        this.time_coming_to_floor = 0
        this.lets_floor = 0;
        this.elevator_img = document.createElement("img");
        this.elevator_img.src = '../public/elv.png';
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

class Buildings {
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
                let floorInstance = Factory.create_floor(i, this.send_elevator);
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
                    let elevatorInstance = Factory.create_elevators();
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

// Create instances of Buildings
const x = new Buildings(99, 4);
const y = new Buildings(20, 3);
const z = new Buildings(15, 4);
