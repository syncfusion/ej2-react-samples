"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var series_types_1 = require("./series-types");
var axis_types_1 = require("./axis-types");
var spark_grid_1 = require("./spark-grid");
var customization_1 = require("./customization");
var live_update_1 = require("./live-update");
var range_band_1 = require("./range-band");
exports.sparklineRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/series-types', component: series_types_1.Series }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/axis-types', component: axis_types_1.Axis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/spark-grid', component: spark_grid_1.SparkGrid }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/customization', component: customization_1.Customization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/live-update', component: live_update_1.LiveUpdate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/range-band', component: range_band_1.RangeBand })));
exports.sparklineCategory = { "default": { "name": "Default", "category": "Sparkline Charts" }, "series-types": { "name": "Series Types", "category": "Sparkline Charts" }, "axis-types": { "name": "Axis Value Types", "category": "Sparkline Charts" }, "spark-grid": { "name": "Sparkline in Grid", "category": "Sparkline Charts" }, "customization": { "name": "Customization", "category": "Sparkline Charts" }, "live-update": { "name": "Live Update", "category": "Sparkline Charts" }, "range-band": { "name": "Range Band", "category": "Sparkline Charts" }, "defaultSample": "sparkline/default" };
