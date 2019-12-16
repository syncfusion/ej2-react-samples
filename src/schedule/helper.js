"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Schedule util
 */
function applyCategoryColor(args, currentView) {
    var categoryColor = args.data.CategoryColor;
    if (!args.element || !categoryColor) {
        return;
    }
    if (currentView === 'Agenda') {
        args.element.firstChild.style.borderLeftColor = categoryColor;
    }
    else {
        args.element.style.backgroundColor = categoryColor;
    }
}
exports.applyCategoryColor = applyCategoryColor;
function generateObject(start, end) {
    if (start === void 0) { start = new Date(2017, 6, 1).getTime(); }
    if (end === void 0) { end = new Date(2018, 6, 31).getTime(); }
    var data = [];
    var names = [
        'Story Time for Kids', 'Camping with Turtles', 'Wildlife Warriors', 'Parrot Talk', 'Birds of Prey', 'Croco World',
        'Venomous Snake Hunt', 'Face Painting & Drawing events', 'Pony Rides', 'Feed the Giants', 'Jungle Treasure Hunt',
        'Endangered Species Program', 'Black Cockatoos Playtime', 'Walk with Jungle King', 'Trained Climbers', 'Playtime with Chimpanzees',
        'Meet a small Mammal', 'Amazon Fish Feeding', 'Elephant Ride'
    ];
    var dayCount = 1000 * 60 * 60;
    for (var a = start, id = 1; a < end; a += (dayCount * 24) * 2) {
        var count = Math.floor((Math.random() * 9) + 1);
        for (var b = 0; b < count; b++) {
            var hour = Math.floor(Math.random() * 100) % 24;
            var minutes = Math.round((Math.floor(Math.random() * 100) % 60) / 5) * 5;
            var nCount = Math.floor(Math.random() * names.length);
            var startDate = new Date(new Date(a).setHours(hour, minutes));
            var endDate = new Date(startDate.getTime() + (dayCount * 2.5));
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
exports.generateObject = generateObject;
function getReadOnlyEventsData() {
    var msPerDay = 86400000;
    var msPerHour = 3600000;
    var currentTime = new Date().setMinutes(0, 0, 0);
    var readonlyEventsData = [
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
exports.getReadOnlyEventsData = getReadOnlyEventsData;
