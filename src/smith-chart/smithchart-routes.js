"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var custom_1 = require("./custom");
var print_export_1 = require("./print-export");
exports.smithchartRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/smith-chart/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/smith-chart/custom', component: custom_1.Customization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/smith-chart/print-export', component: print_export_1.Print })));
exports.smithchartCategory = { "default": { "name": "Default", "category": "Smith Chart" }, "custom": { "name": "Customization", "category": "Smith Chart" }, "print-export": { "name": "Print and Export", "category": "Smith Chart" }, "defaultSample": "smith-chart/default" };
