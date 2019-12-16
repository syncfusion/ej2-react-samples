"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var date_range_1 = require("./date-range");
var date_format_1 = require("./date-format");
var disabled_1 = require("./disabled");
var special_dates_1 = require("./special-dates");
var month_picker_1 = require("./month-picker");
exports.datepickerRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/date-range', component: date_range_1.Range }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/date-format', component: date_format_1.Dateformat }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/disabled', component: disabled_1.Disabled }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/special-dates', component: special_dates_1.Special }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/month-picker', component: month_picker_1.MonthPicker })));
exports.datepickerCategory = { "default": { "name": "Default Functionalities", "category": "DatePicker" }, "date-range": { "name": "Date Range", "category": "DatePicker" }, "date-format": { "name": "Format", "category": "DatePicker" }, "disabled": { "name": "Disabled Dates", "category": "DatePicker" }, "special-dates": { "name": "Special Dates", "category": "DatePicker" }, "month-picker": { "name": "Month Picker", "category": "DatePicker" }, "defaultSample": "datepicker/default" };
