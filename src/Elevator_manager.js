var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.create_floor = function (floor_number, send_close_elevator) {
        return new Floor(floor_number, send_close_elevator);
    };
    Factory.create_elevators = function () {
        return new Elevator();
    };
    return Factory;
}());
var Floor = /** @class */ (function () {
    function Floor(floor_number, send_elevator) {
        var _this = this;
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
        this.buttonElement.onclick = function () {
            if (_this.flag_button) {
                _this.buttonElement.style.color = "green";
                send_elevator(floor_number, _this);
                _this.flag_button = false;
            }
        };
    }
    Floor.prototype.floor_release = function (time_release) {
        var _this = this;
        setTimeout(function () {
            console.log(time_release);
            _this.buttonElement.style.color = "hsla(0,0%,20%,1)";
            _this.playSound();
            _this.flag_button = true;
            _this.playSound();
        }, time_release * 1000);
    };
    Floor.prototype.screen_timer = function (time) {
        var _this = this;
        var intervalId = setInterval(function () {
            if (time <= 0) {
                clearInterval(intervalId);
                _this.timerElement.textContent = "";
            }
            else {
                var displayTime = Math.trunc(time);
                _this.timerElement.textContent = displayTime.toString();
                time = time - 0.1;
            }
        }, 100);
    };
    Floor.prototype.playSound = function () {
        this.sound.play();
    };
    return Floor;
}());
var Elevator = /** @class */ (function () {
    function Elevator() {
        var _this = this;
        this.elevator_available = function () {
            return _this.free_time_elevetor < Date.now();
        };
        this.free_time_elevator = function () {
            var free_time = 0;
            if (!_this.elevator_available()) {
                free_time = (_this.free_time_elevetor - Date.now()) / 1000;
            }
            return free_time;
        };
        this.update_free_time = function (floor_number) {
            if (_this.elevator_available()) {
                _this.free_time_elevetor = Date.now();
            }
            _this.free_time_elevetor += (_this.distance_floors(floor_number) + 2) * 1000;
        };
        this.distance_floors = function (floor_number) {
            var distance = Math.abs((floor_number - _this.lets_floor) / 2);
            return distance;
        };
        this.free_time_elevetor = Date.now();
        this.time_coming_to_floor = 0;
        this.lets_floor = 0;
        this.elevator_img = document.createElement("img");
        this.elevator_img.src = '../public/elv.png';
        this.elevator_img.className = "elevator";
    }
    Elevator.prototype.elevator_move = function (floor_number) {
        var _this = this;
        var free_elevator = this.free_time_elevator() * 1000;
        var distance = this.distance_floors(floor_number);
        setTimeout(function () {
            _this.elevator_img.style.transition = "transform ".concat(distance, "s ease");
            _this.elevator_img.style.transform = "translateY(".concat((-floor_number * 110) + 7, "px)");
        }, free_elevator);
        this.update_free_time(floor_number);
        this.lets_floor = floor_number;
    };
    Elevator.prototype.time_coming_floor = function (floor_number) {
        var time_coming;
        time_coming = this.free_time_elevator();
        time_coming += this.distance_floors(floor_number);
        return time_coming;
    };
    return Elevator;
}());
var Buildings = /** @class */ (function () {
    function Buildings(amount_floors, amount_elevators) {
        var _this = this;
        this.close_elevator = function (floor_to_move) {
            var min_time_comming = _this.elevators[0].time_coming_floor(floor_to_move);
            var index = 0;
            for (var i = 1; i < _this.elevators.length; i++) {
                var i_time_comming = _this.elevators[i].time_coming_floor(floor_to_move);
                if (i_time_comming < min_time_comming) {
                    min_time_comming = i_time_comming;
                    index = i;
                }
            }
            return index;
        };
        this.send_elevator = function (floor_number, current_floor) {
            var index = _this.close_elevator(floor_number);
            var time_coming = _this.elevators[index].time_coming_floor(floor_number);
            current_floor.screen_timer(time_coming);
            current_floor.floor_release(time_coming);
            _this.elevators[index].elevator_move(floor_number);
        };
        this.floors = [];
        this.elevators = [];
        var floorBuildings = document.createElement("div");
        floorBuildings.className = "floorBuildings";
        var building = document.createElement("div");
        building.className = "building";
        var screen = document.getElementById('screen');
        if (screen) {
            this.screen = screen;
            this.screen.appendChild(floorBuildings);
            for (var i = 0; i < amount_floors; i++) {
                var floorInstance = Factory.create_floor(i, this.send_elevator);
                this.floors.push(floorInstance);
                floorBuildings.appendChild(floorInstance.floorElement);
                if (i < amount_floors - 1) {
                    var blackLine = document.createElement("div");
                    blackLine.className = "blackLine";
                    floorInstance.floorElement.appendChild(blackLine);
                }
            }
            building.appendChild(floorBuildings);
            if (amount_floors > 1) {
                for (var i = 0; i < amount_elevators; i++) {
                    var elevatorInstance = Factory.create_elevators();
                    this.elevators.push(elevatorInstance);
                    building.appendChild(elevatorInstance.elevator_img);
                }
            }
            screen.appendChild(building);
        }
        else {
            this.screen = null;
            console.error("Element with id 'screen' not found!");
        }
    }
    return Buildings;
}());
// Create instances of Buildings
var x = new Buildings(99, 4);
var y = new Buildings(20, 3);
var z = new Buildings(15, 4);
