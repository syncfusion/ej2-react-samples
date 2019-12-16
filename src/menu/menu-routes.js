"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var data_binding_1 = require("./data-binding");
var scrollable_1 = require("./scrollable");
var template_1 = require("./template");
var hamburger_mode_1 = require("./hamburger-mode");
var api_1 = require("./api");
var toolbar_integration_1 = require("./toolbar-integration");
exports.menuRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/data-binding', component: data_binding_1.DataBinding }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/scrollable', component: scrollable_1.Scrollable }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/template', component: template_1.Template }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/hamburger-mode', component: hamburger_mode_1.HamburgerMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/api', component: api_1.Api }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/toolbar-integration', component: toolbar_integration_1.ToolbarIntegration })));
exports.menuCategory = { "default": { "name": "Default Functionalities", "category": "Menu Bar" }, "data-binding": { "name": "Data Binding", "category": "Menu Bar" }, "scrollable": { "name": "Scrollable", "category": "Menu Bar" }, "template": { "name": "Template", "category": "Menu Bar" }, "hamburger-mode": { "name": "Hamburger Mode", "category": "Menu Bar" }, "api": { "name": "API", "category": "Menu Bar" }, "toolbar-integration": { "name": "Toolbar Integration", "category": "Use Case" }, "defaultSample": "menu/default" };
