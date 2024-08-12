import { Building } from './Building';

class BuildingManager {
    constructor() {
        new Building(7, 2);
        new Building(12, 3);
        new Building(1, 4);
    }
}

new BuildingManager();