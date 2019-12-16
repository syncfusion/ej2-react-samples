"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var date_range_1 = require("./date-range");
var disabled_1 = require("./disabled");
var special_dates_1 = require("./special-dates");
var multi_selection_1 = require("./multi-selection");
var month_picker_1 = require("./month-picker");
var islamic_calendar_1 = require("./islamic-calendar");
exports.calendarRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/date-range', component: date_range_1.Range }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/disabled', component: disabled_1.Disabled }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/special-dates', component: special_dates_1.Special }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/multi-selection', component: multi_selection_1.MultipleSelection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/month-picker', component: month_picker_1.MonthPicker }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/islamic-calendar', component: islamic_calendar_1.IslamicCalendar })));
exports.calendarCategory = { "default": { "name": "Default Functionalities", "category": "Calendar" }, "date-range": { "name": "Date Range", "category": "Calendar" }, "disabled": { "name": "Disabled Dates", "category": "Calendar" }, "special-dates": { "name": "Special Dates", "category": "Calendar" }, "multi-selection": { "name": "Multiple Selection", "category": "Calendar" }, "month-picker": { "name": "Month Picker", "category": "Calendar" }, "islamic-calendar": { "name": "Islamic Calendar", "category": "Calendar" }, "defaultSample": "calendar/default" };
