"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var orientation_1 = require("./orientation");
var responsive_modes_1 = require("./responsive-modes");
var wizard_1 = require("./wizard");
exports.tabRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/orientation', component: orientation_1.Orientation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/responsive-modes', component: responsive_modes_1.Responsive }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/wizard', component: wizard_1.Wizard })));
exports.tabCategory = { "default": { "name": "Default Functionalities", "category": "Tabs" }, "orientation": { "name": "Orientation", "category": "Tabs" }, "responsive-modes": { "name": "Responsive Modes", "category": "Tabs" }, "wizard": { "name": "Wizard", "category": "Tabs" }, "defaultSample": "tab/default" };
