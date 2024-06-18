import { Building } from './Building';
import { Settings } from "./Settings";

class BuildingManager {
    constructor() {
        for(let i = 0; i < Settings.NUM_BUILDINGS; ++i){
            new Building(Settings.NUM_FLOORS*(i+1), Settings.NUM_ELEVATORS*(i+1));
        }

    }
}

new BuildingManager();