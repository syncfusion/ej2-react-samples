import { EventRenderedArgs, View } from '@syncfusion/ej2-schedule';

/**
 * Schedule util
 */

export function applyCategoryColor(args: EventRenderedArgs, currentView: View): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
        return;
    }
    if (currentView === 'Agenda') {
        (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
        args.element.style.backgroundColor = categoryColor;
    }
}

export function generateObject(start: number = new Date(2020, 6, 1).getTime(), end: number = new Date(2021, 11, 31).getTime(), isWeekDaysOnly: boolean = false): Record<string, any>[] {
    let data: Record<string, any>[] = [];
    let names: string[] = [
        'Story Time for Kids', 'Camping with Turtles', 'Wildlife Warriors', 'Parrot Talk', 'Birds of Prey', 'Croco World',
        'Venomous Snake Hunt', 'Face Painting & Drawing events', 'Pony Rides', 'Feed the Giants', 'Jungle Treasure Hunt',
        'Endangered Species Program', 'Black Cockatoos Playtime', 'Walk with Jungle King', 'Trained Climbers', 'Playtime with Chimpanzees',
        'Meet a small Mammal', 'Amazon Fish Feeding', 'Elephant Ride'
    ];
    let dayCount: number = 1000 * 60 * 60;
    const appCount: number = isWeekDaysOnly ? 4 : 9;
    for (let a: number = start, id: number = 1; a < end; a += (dayCount * 24)) {
        let count: number = Math.floor((Math.random() * appCount) + 1);
        for (let b: number = 0; b < count; b++) {
            let hour: number = Math.floor(Math.random() * 100) % 24;
            let minutes: number = Math.round((Math.floor(Math.random() * 100) % 60) / 5) * 5;
            let nCount: number = Math.floor(Math.random() * names.length);
            let startDate: Date = new Date(new Date(a).setHours(hour, minutes));
            let endDate: Date = new Date(startDate.getTime() + (dayCount * 2.5));

            if (isWeekDaysOnly && [0, 6].indexOf(startDate.getDay()) > -1 || [0, 6].indexOf(endDate.getDay()) > -1) {
                continue;
            }

            data.push({
                Id: id,
                Subject: names[nCount],
                StartTime: startDate,
                EndTime: endDate,
                IsAllDay: (id % 10) ? false : true
            });
            id++;
        }
    }
    return data;
}

const msPerDay: number = 86400000;
const msPerHour: number = 3600000;

export function getReadOnlyEventsData(): Record<string, any>[] {
    const currentTime: number = new Date().setMinutes(0, 0, 0);

    let readonlyEventsData: Record<string, any>[] = [
        {
            Id: 1,
            Subject: 'Project Workflow Analysis',
            StartTime: new Date(currentTime + msPerDay * -2 + msPerHour * 2),
            EndTime: new Date(currentTime + msPerDay * -2 + msPerHour * 4),
            IsReadonly: true
        }, {
            Id: 2,
            Subject: 'Project Requirement Planning',
            StartTime: new Date(currentTime + msPerDay * -1 + msPerHour * 2),
            EndTime: new Date(currentTime + msPerDay * -1 + msPerHour * 4),
            IsReadonly: true
        }, {
            Id: 3,
            Subject: 'Meeting with Developers',
            StartTime: new Date(currentTime + msPerDay * -1 + msPerHour * -3),
            EndTime: new Date(currentTime + msPerDay * -1 + msPerHour * -1),
            IsReadonly: true
        }, {
            Id: 4,
            Subject: 'Team Fun Activities',
            StartTime: new Date(currentTime + msPerHour * -4),
            EndTime: new Date(currentTime + msPerHour * -2),
            IsReadonly: true
        }, {
            Id: 5,
            Subject: 'Quality Analysis',
            StartTime: new Date(currentTime + msPerHour * 1),
            EndTime: new Date(currentTime + msPerHour * 3),
            IsReadonly: false
        }, {
            Id: 6,
            Subject: 'Customer meeting – John Mackenzie',
            StartTime: new Date(currentTime + msPerHour * 5),
            EndTime: new Date(currentTime + msPerHour * 6),
            IsReadonly: false
        }, {
            Id: 7,
            Subject: 'Meeting with Core team',
            StartTime: new Date(currentTime + msPerHour * 9),
            EndTime: new Date(currentTime + msPerHour * 10),
            IsReadonly: false
        }, {
            Id: 8,
            Subject: 'Project Review',
            StartTime: new Date(currentTime + msPerDay * 1 + msPerHour * 3),
            EndTime: new Date(currentTime + msPerDay * 1 + msPerHour * 5),
            IsReadonly: false
        }, {
            Id: 9,
            Subject: 'Project demo meeting with Andrew',
            StartTime: new Date(currentTime + msPerDay * 1 + msPerHour * -4),
            EndTime: new Date(currentTime + msPerDay * 1 + msPerHour * -3),
            IsReadonly: false
        }, {
            Id: 10,
            Subject: 'Online Hosting of Project',
            StartTime: new Date(currentTime + msPerDay * 2 + msPerHour * 4),
            EndTime: new Date(currentTime + msPerDay * 2 + msPerHour * 6),
            IsReadonly: false
        }
    ];
    return readonlyEventsData;
}

export function getReminderEvents(): Record<string, any>[] {
    const today: number = new Date().getTime();

    const reminderEvents: Record<string, any>[] = [
        {
            Id: 1,
            Subject: 'Explosion of Betelgeuse Star',
            Location: 'Space Center USA',
            StartTime: new Date(today + 5000),
            EndTime: new Date(today + (msPerHour * 2) + 5000),
            StartTimezone: "UTC",
            EndTimezone: "UTC"
        }, {
            Id: 2,
            Subject: 'Thule Air Crash Report',
            Location: 'Newyork City',
            StartTime: new Date(today - msPerDay - (msPerHour * 2)),
            EndTime: new Date(today - msPerDay),
            StartTimezone: "UTC",
            EndTimezone: "UTC"
        }, {
            Id: 3,
            Subject: 'Milky Way as Melting pot',
            Location: 'Space Center USA',
            StartTime: new Date(today - msPerDay),
            EndTime: new Date(today - msPerDay + (msPerHour * 2)),
            StartTimezone: "UTC",
            EndTimezone: "UTC"
        }, {
            Id: 4,
            Subject: 'Blue Moon Eclipse',
            Location: 'Space Center USA',
            StartTime: new Date(today + msPerDay + (msPerHour * 2)),
            EndTime: new Date(today + msPerDay + (msPerHour * 4)),
            StartTimezone: "UTC",
            EndTimezone: "UTC"
        }, {
            Id: 5,
            Subject: 'Mysteries of Bermuda Triangle',
            Location: 'Bermuda',
            StartTime: new Date(today + msPerDay),
            EndTime: new Date(today + msPerDay + (msPerHour * 2)),
            StartTimezone: "UTC",
            EndTimezone: "UTC"
        }
    ];
    return reminderEvents;
}

export function generateResourceData(startId: number, endId: number, text: string): Record<string, any>[] {
    let data: Record<string, any>[] = [];
    let colors: string[] = [
        '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c', '#fdd835', '#748ffc',
        '#9775fa', '#df5286', '#7fa900', '#fec200', '#5978ee', '#00bdae', '#ea80fc'
    ];
    for (let a: number = startId; a <= endId; a++) {
        let n: number = Math.floor(Math.random() * colors.length);
        data.push({ Id: a, Text: text + ' ' + a, Color: colors[n] });
    }
    return data;
}