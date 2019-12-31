"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var date_time_range_1 = require("./date-time-range");
var date_time_format_1 = require("./date-time-format");
var disabled_1 = require("./disabled");
var special_dates_1 = require("./special-dates");
exports.datetimepickerRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/date-time-range', component: date_time_range_1.Range }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/date-time-format', component: date_time_format_1.Dateformat }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/disabled', component: disabled_1.Disabled }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/special-dates', component: special_dates_1.Special })));
exports.datetimepickerCategory = { "default": { "name": "Default Functionalities", "category": "DateTimePicker" }, "date-time-range": { "name": "DateTime Range", "category": "DateTimePicker" }, "date-time-format": { "name": "Format", "category": "DateTimePicker" }, "disabled": { "name": "Disabled Dates", "category": "DateTimePicker" }, "special-dates": { "name": "Special Dates", "category": "DateTimePicker" }, "defaultSample": "datetimepicker/default" };
