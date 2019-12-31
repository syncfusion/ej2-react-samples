"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var container_1 = require("./container");
var data_1 = require("./data");
var ranges_1 = require("./ranges");
var axes_1 = require("./axes");
var annotation_1 = require("./annotation");
var tooltip_1 = require("./tooltip");
var style_1 = require("./style");
exports.lineargaugeRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/container', component: container_1.Container }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/data', component: data_1.Data }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/ranges', component: ranges_1.Ranges }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/axes', component: axes_1.Axes }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/annotation', component: annotation_1.Annotation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/tooltip', component: tooltip_1.Tooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/style', component: style_1.Style })));
exports.lineargaugeCategory = { "default": { "name": "Default Functionalities", "category": "Linear Gauge" }, "container": { "name": "Container", "category": "Linear Gauge" }, "data": { "name": "Data Sample", "category": "Linear Gauge" }, "ranges": { "name": "Ranges", "category": "Linear Gauge" }, "axes": { "name": "Axes and Pointers", "category": "Linear Gauge" }, "annotation": { "name": "Annotation", "category": "Linear Gauge" }, "tooltip": { "name": "Tooltip", "category": "Linear Gauge" }, "style": { "name": "Styles", "category": "Linear Gauge" }, "defaultSample": "linear-gauge/default" };
