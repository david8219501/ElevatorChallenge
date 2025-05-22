/**
 * Settings - A class containing configuration constants for the building simulation.
 */
export class Settings {
    /** Height of each floor in pixels. */
    static readonly FLOOR_HEIGHT_PX = 110; // הוספתי _PX להבהרת היחידות

    /** Time the elevator waits at a floor, in seconds. */
    static readonly ELEVATOR_WAIT_TIME_SEC = 2; // שם ברור יותר למה ממתינים

    /** Conversion factor from seconds to milliseconds. */
    static readonly SEC_TO_MS = 1000; // מדויק יותר מהשם הכללי MILLI_SECOND

    /** Default color of the floor button. */
    static readonly FLOOR_BUTTON_DEFAULT_COLOR = "hsla(0,0%,20%,1)"; // עקביות

    /** Color of the floor button when clicked. */
    static readonly FLOOR_BUTTON_ACTIVE_COLOR = "green"; // מתאים למצב לחיצה

    /** File path to the elevator sound effect. */
    static readonly ELEVATOR_DING_SOUND_PATH = 'ding.mp3'; // מתאר גם מה הסאונד

    /** Height of the black line between floors in pixels. */
    static readonly FLOOR_SEPARATOR_HEIGHT_PX = 7; // שם יותר אינפורמטיבי

    /** Time for elevator to move between floors, in seconds. */
    static readonly ELEVATOR_MOVE_DURATION_SEC = 0.5; // תיאור עקבי וברור
}
