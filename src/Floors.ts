export class Floor {
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