"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var light_weight_1 = require("./light-weight");
var date_time_1 = require("./date-time");
var double_1 = require("./double");
var logarithmic_1 = require("./logarithmic");
var multilevel_1 = require("./multilevel");
var period_selector_1 = require("./period-selector");
var period_selector_stocks_1 = require("./period-selector-stocks");
var empty_data_1 = require("./empty-data");
var filter_1 = require("./filter");
var export_1 = require("./export");
var right_to_left_1 = require("./right-to-left");
exports.rangenavigatorRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/light-weight', component: light_weight_1.LightWeight }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/date-time', component: date_time_1.DateTimeAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/double', component: double_1.NumericAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/logarithmic', component: logarithmic_1.LogarithmicAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/multilevel', component: multilevel_1.MultilevelLabels }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/period-selector', component: period_selector_1.PeriodSelectorCandle }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/period-selector-stocks', component: period_selector_stocks_1.StockChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/empty-data', component: empty_data_1.EmptyData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/filter', component: filter_1.Customization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/export', component: export_1.RangeExport }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/right-to-left', component: right_to_left_1.RTL })));
exports.rangenavigatorCategory = { "default": { "name": "Default", "category": "Range Selector" }, "light-weight": { "name": "Lightweight", "category": "Range Selector" }, "date-time": { "name": "DateTime", "category": "Axis" }, "double": { "name": "Numeric Axis", "category": "Axis" }, "logarithmic": { "name": "Logarithmic Axis", "category": "Axis" }, "multilevel": { "name": "Multilevel Labels", "category": "Axis" }, "period-selector": { "name": "Default", "category": "Period Selector" }, "period-selector-stocks": { "name": "Stock Chart", "category": "Period Selector" }, "empty-data": { "name": "Empty Points", "category": "Customization" }, "filter": { "name": "Filter", "category": "Customization" }, "export": { "name": "Print and Export", "category": "Export" }, "right-to-left": { "name": "RTL", "category": "RTL" }, "defaultSample": "range-navigator/default" };
