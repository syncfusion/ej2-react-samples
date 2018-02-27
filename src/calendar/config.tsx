export const CalendarSampleOrder: Object = [
    { 'path': 'calendar/default', 'component': 'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Calendar', 'api':'{"CalendarComponent": [ "change"]}' },
    { 'path': 'calendar/range', 'component': 'Range', 'name': 'Date Range', 'order': '01', 'category': 'Calendar', 'api':'{"Calendar": [ "min", "max", "change" ]}'},
    { 'path': 'calendar/disabled', 'component': 'Disabled', 'name': 'Disabled Dates', 'order': '01', 'category': 'Calendar', 'api':'{"Calendar": [ "renderDayCell", "change" ]}' },
    { 'path': 'calendar/special', 'component': 'Special', 'name': 'Special Dates', 'order': '01', 'category': 'Calendar', 'api':'{"Calendar": [ "renderDayCell", "change" ]}' }
]