"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var date_range_1 = require("./date-range");
var day_span_1 = require("./day-span");
var date_format_1 = require("./date-format");
var presets_1 = require("./presets");
var month_range_picker_1 = require("./month-range-picker");
exports.daterangepickerRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/date-range', component: date_range_1.DateRange }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/day-span', component: day_span_1.DaySpan }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/date-format', component: date_format_1.Format }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/presets', component: presets_1.Presets }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/month-range-picker', component: month_range_picker_1.MonthRangePicker })));
exports.daterangepickerCategory = { "default": { "name": "Default Functionalities", "category": "DateRangePicker" }, "date-range": { "name": "Date Range", "category": "DateRangePicker" }, "day-span": { "name": "Day Span", "category": "DateRangePicker" }, "date-format": { "name": "Format", "category": "DateRangePicker" }, "presets": { "name": "Preset Ranges", "category": "DateRangePicker" }, "month-range-picker": { "name": "Month Range Picker", "category": "DateRangePicker" }, "defaultSample": "daterangepicker/default" };
