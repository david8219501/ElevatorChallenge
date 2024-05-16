/**
 * Settings - A class containing configuration constants for the building simulation.
 */
export class Settings {
    /** Height of each floor in pixels. */
    static readonly FLOOR_HEIGHT = 110; 

    /** Waiting time in seconds for the elevator to stay at a floor. */
    static readonly FLOOR_WAITING = 2; 

    /** Conversion factor from seconds to milliseconds. */
    static readonly MILLI_SECOND = 1000; 

    /** Default color of the floor button. */
    static readonly BUTTON_COLOR = "hsla(0,0%,20%,1)"; 

    /** Color of the floor button when clicked. */
    static readonly BUTTON_CLICKED_COLOR = "green"; 

    /** File path to the elevator sound effect. */
    static readonly ELEVATOR_SOUND_FILE = 'ding.mp3'; 

    /** Height of the black line between floors in pixels. */
    static readonly BLACK_LINE_HEIGHT = 7; 
}
