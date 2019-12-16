"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var time_range_1 = require("./time-range");
var time_format_1 = require("./time-format");
var list_formatting_1 = require("./list-formatting");
exports.timepickerRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/time-range', component: time_range_1.Range }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/time-format', component: time_format_1.Format }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/list-formatting', component: list_formatting_1.Formatting })));
exports.timepickerCategory = { "default": { "name": "Default Functionalities", "category": "TimePicker" }, "time-range": { "name": "Time Range", "category": "TimePicker" }, "time-format": { "name": "Format", "category": "TimePicker" }, "list-formatting": { "name": "Time Duration", "category": "TimePicker" }, "defaultSample": "timepicker/default" };
