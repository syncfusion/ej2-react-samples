export const CalendarSampleOrder = [
    {
        'path': 'calendar/default', 'component': 'Default', 'name': 'Default Functionalities', 'description': 'A simple calendar component for React to select dates easily by switching between month, year, and decade views with a rich user interface', 'order': '01', 'category': 'Calendar', 'api': '{"CalendarComponent": [ "change"]}',
        'sourceFiles': [
            { 'displayName': 'default.tsx', 'path': 'src/calendar/default.tsx' },
            { 'displayName': 'default.jsx', 'path': 'src/calendar/default.jsx' },
            { 'displayName': 'default-style.css', 'path': 'src/calendar/default-style.css' }
        ]
    },
    {
        'path': 'calendar/date-range', 'component': 'Range', 'name': 'Date Range', 'description': 'This example demonstrates how to disables the specific range of dates (min and max) in a React Calendar.', 'order': '01', 'category': 'Calendar', 'api': '{"Calendar": [ "min", "max", "change" ]}',
        'sourceFiles': [
            { 'displayName': 'dete-range.tsx', 'path': 'src/calendar/date-range.tsx' },
            { 'displayName': 'dete-range.jsx', 'path': 'src/calendar/date-range.jsx' },
            { 'displayName': 'daterange-style.css', 'path': 'src/calendar/daterange-style.css' }
        ]
    },
    {
        'path': 'calendar/disabled', 'component': 'Disabled', 'name': 'Disabled Dates', 'description': 'This example demonstrates how to disable the dates like weekends, weekdays and specific dates (past dates, future dates and current dates) in a react Calendar', 'order': '01', 'category': 'Calendar', 'api': '{"Calendar": [ "renderDayCell", "change" ]}',
        'sourceFiles': [
            { 'displayName': 'disabled.tsx', 'path': 'src/calendar/disabled.tsx' },
            { 'displayName': 'disabled.jsx', 'path': 'src/calendar/disabled.jsx' },
            { 'displayName': 'disabled-style.css', 'path': 'src/calendar/disabled-style.css' }
        ]
    },
    {
        'path': 'calendar/special-dates', 'component': 'Special', 'name': 'Special Dates', 'description': 'This example demonstrates how to highlight the specific dates like weekends, holidays and special dates in a React Calendar', 'order': '01', 'category': 'Calendar', 'api': '{"Calendar": [ "renderDayCell", "change" ]}',
        'sourceFiles': [
            { 'displayName': 'special-dates.tsx', 'path': 'src/calendar/special-dates.tsx' },
            { 'displayName': 'special-dates.jsx', 'path': 'src/calendar/special-dates.jsx' },
            { 'displayName': 'special-styles.css', 'path': 'src/calendar/special-styles.css' }
        ]
    },
    {
        'path': 'calendar/multi-selection', 'component': 'MultipleSelection', 'name': 'Multiple Selection', 'description': 'This example demonstrates how to select the multiple dates (more than one date) in a React Calendar.', 'order': '01', 'category': 'Calendar', 'api': '{"Calendar": [ "isMultiSelection", "values", "change" ]}',
        'sourceFiles': [
            { 'displayName': 'multi-selection.tsx', 'path': 'src/calendar/multi-selection.tsx' },
            { 'displayName': 'multi-selection.jsx', 'path': 'src/calendar/multi-selection.jsx' },
            { 'displayName': 'multi-style.css', 'path': 'src/calendar/multi-style.css' }
        ]
    },
    {
        'path': 'calendar/month-picker', 'component': 'MonthPicker', 'name': 'Month Picker', 'description': 'The React Calendar component can act as a month and year picker. It helps you to select a month or year quickly with all month related properties.', 'order': '01', 'category': 'Calendar', 'api': '{"Calendar": [ "start", "depth", "change" ]}',
        'sourceFiles': [
            { 'displayName': 'month-picker.tsx', 'path': 'src/calendar/month-picker.tsx' },
            { 'displayName': 'month-picker.jsx', 'path': 'src/calendar/month-picker.jsx' },
            { 'displayName': 'monthpicker-style.css', 'path': 'src/calendar/monthpicker-style.css' }
        ]
    },
    {
        'path': 'calendar/islamic-calendar', 'component': 'IslamicCalendar', 'name': 'Islamic Calendar', 'description': 'This example demonstrates how to render a React hijri calendar with default functionalities such as min, max date restriction, disabled dates, highlight dates', 'order': '01', 'category': 'Calendar', 'api': '{"Calendar": [ "values", "change", "renderDayCell" ]}',
        'sourceFiles': [
            { 'displayName': 'islamic-calendar.tsx', 'path': 'src/calendar/islamic-calendar.tsx' },
            { 'displayName': 'islamic-calendar.jsx', 'path': 'src/calendar/islamic-calendar.jsx' },
            { 'displayName': 'islamic-calendar.css', 'path': 'src/calendar/islamic-calendar.css' }
        ]
    }
];
