"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var range_1 = require("./range");
var labels_1 = require("./labels");
var annotation_1 = require("./annotation");
var customization_1 = require("./customization");
var semi_circular_gauge_1 = require("./semi-circular-gauge");
var arc_gauge_1 = require("./arc-gauge");
var legend_1 = require("./legend");
var direction_1 = require("./direction");
var image_1 = require("./image");
var pointers_1 = require("./pointers");
var axes_1 = require("./axes");
var drag_1 = require("./drag");
var tooltip_1 = require("./tooltip");
var sample_data_1 = require("./sample-data");
var apple_watch_rings_1 = require("./apple-watch-rings");
var speedometer_1 = require("./speedometer");
exports.circulargaugeRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/range', component: range_1.Range }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/labels', component: labels_1.Labels }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/annotation', component: annotation_1.AnnotationsSample }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/customization', component: customization_1.Customization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/semi-circular-gauge', component: semi_circular_gauge_1.SemiGauge }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/arc-gauge', component: arc_gauge_1.ArcGauge }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/legend', component: legend_1.Circle }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/direction', component: direction_1.Direction }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/image', component: image_1.Image }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/pointers', component: pointers_1.Pointers }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/axes', component: axes_1.Axes }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/drag', component: drag_1.Drag }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/tooltip', component: tooltip_1.Tooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/sample-data', component: sample_data_1.SampleData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/apple-watch-rings', component: apple_watch_rings_1.AppleWatchGauge }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/speedometer', component: speedometer_1.Speedometer })));
exports.circulargaugeCategory = { "default": { "name": "Default Functionalities", "category": "Circular Gauge" }, "range": { "name": "Range", "category": "Circular Gauge" }, "labels": { "name": "Tick and Labels", "category": "Circular Gauge" }, "annotation": { "name": "Annotations", "category": "Circular Gauge" }, "customization": { "name": "Gauge Customization", "category": "Circular Gauge" }, "semi-circular-gauge": { "name": "Semi-Circular Gauge", "category": "Circular Gauge" }, "arc-gauge": { "name": "Arc Gauge", "category": "Circular Gauge" }, "legend": { "name": "Legend", "category": "Circular Gauge" }, "direction": { "name": "Direction Compass", "category": "Circular Gauge" }, "image": { "name": "Pointer Image", "category": "Pointer" }, "pointers": { "name": "Pointer Customization", "category": "Pointer" }, "axes": { "name": "Multiple Axis", "category": "Axes" }, "drag": { "name": "Pointer Drag", "category": "User Interaction" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "sample-data": { "name": "Data Sample", "category": "Use Cases" }, "apple-watch-rings": { "name": "Apple Watch Rings", "category": "Use Cases" }, "speedometer": { "name": "Speedometer", "category": "Use Cases" }, "defaultSample": "circular-gauge/default" };
