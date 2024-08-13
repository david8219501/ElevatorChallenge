import { Building } from './Building';

class BuildingManager {
    constructor() {
        new Building(6, 1);
        new Building(11, 2);
        new Building(16, 3);
    }
}

new BuildingManager();