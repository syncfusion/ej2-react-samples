export const CalendarSampleOrder: Object = [
    { 'path': 'calendar/default', 'component': 'Default', 'name': 'Default Functionalities', 'order': '01', 'category': 'Calendar', 'api':'{"CalendarComponent": [ "change"]}' },
    { 'path': 'calendar/date-range', 'component': 'Range', 'name': 'Date Range', 'order': '01', 'category': 'Calendar', 'api':'{"Calendar": [ "min", "max", "change" ]}'},
    { 'path': 'calendar/disabled', 'component': 'Disabled', 'name': 'Disabled Dates', 'order': '01', 'category': 'Calendar', 'api':'{"Calendar": [ "renderDayCell", "change" ]}' },
    { 'path': 'calendar/special-dates', 'component': 'Special', 'name': 'Special Dates', 'order': '01', 'category': 'Calendar', 'api':'{"Calendar": [ "renderDayCell", "change" ]}' },
    { 'path': 'calendar/multi-selection', 'component': 'MultipleSelection', 'name': 'Multiple Selection', 'order': '01', 'category': 'Calendar', 'api':'{"Calendar": [ "isMultiSelection", "values", "change" ]}' },
    { 'path': 'calendar/islamic-calendar', 'component': 'IslamicCalendar', 'name': 'Islamic Calendar', 'order': '01', 'category': 'Calendar', 'type': 'new', 'api':'{"Calendar": [ "values", "change", "renderDayCell" ]}' }
]