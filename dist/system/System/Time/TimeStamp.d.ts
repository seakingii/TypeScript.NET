import { ITimeStamp } from "./ITimeStamp";
import { IDateTime } from "./IDateTime";
import { Gregorian } from "./Calendars";
export declare class TimeStamp implements ITimeStamp, IDateTime {
    readonly year: number;
    readonly month: Gregorian.Month;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly tick: number;
    constructor(year: number, month: Gregorian.Month, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number, tick?: number);
    toJsDate(): Date;
    static from(d: Date | IDateTime): TimeStamp;
}
export default TimeStamp;
