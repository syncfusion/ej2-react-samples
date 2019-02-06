
/**
 * Chart data service
 */


export function GetDateTimeData(start: Date, end: Date, min?: number, max?: number): object[] {
    let series1: object[] = [];
    let point: object = {};
    let value: number = 100;
    let date: number;
    for (let i: number = 0; start <= end; i++) {
        date = start.getTime();
        if (min || max) {
            value = getRandomInt(min, max);
        } else {
            if (Math.random() > .5) {
                value += Math.random();
            } else {
                value -= Math.random();
            }
        }
        point = { x: new Date(date), y: value };
        new Date(start.setDate(start.getDate() + 1));
        series1.push(point);
    }
    return series1;
}

export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GetNumericData(start: number, end: number, min?: number, max?: number): object[] {
    let series1: object[] = [];
    let point: object = {};
    let value: number = 30;

    for (let i: number = start; i <= end; i++) {
        if (min || max) {
            value = getRandomInt(min, max);
        } else {
            if (Math.random() > .5) {
                value += Math.random();
            } else {
                value -= Math.random();
            }
        }
        point = { x: i, y: Math.round(value) };
        series1.push(point);
    }
    return series1;
}