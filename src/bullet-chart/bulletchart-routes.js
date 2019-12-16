"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var multiple_data_1 = require("./multiple-data");
var right_to_left_1 = require("./right-to-left");
var bar_customization_1 = require("./bar-customization");
var customization_1 = require("./customization");
var tooltip_1 = require("./tooltip");
exports.bulletchartRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/default', component: default_1.BulletChartDefault }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/multiple-data', component: multiple_data_1.BulletChartMultipleData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/right-to-left', component: right_to_left_1.BulletChartRightToLeft }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/bar-customization', component: bar_customization_1.BulletChartBarCustomization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/customization', component: customization_1.BulletChartCustomization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/tooltip', component: tooltip_1.BulletChartTooltip })));
exports.bulletchartCategory = { "default": { "name": "Default", "category": "Bullet Chart" }, "multiple-data": { "name": "Multiple Data", "category": "Bullet Chart" }, "right-to-left": { "name": "RTL", "category": "Bullet Chart" }, "bar-customization": { "name": "Feature and Target Bar", "category": "Bullet Chart" }, "customization": { "name": "Range and Label Settings", "category": "Bullet Chart" }, "tooltip": { "name": "Tooltip Template", "category": "Bullet Chart" }, "defaultSample": "bullet-chart/default" };
