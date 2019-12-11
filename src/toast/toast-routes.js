"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var types_1 = require("./types");
var templates_1 = require("./templates");
var positions_1 = require("./positions");
var api_1 = require("./api");
exports.toastRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/types', component: types_1.Types }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/templates', component: templates_1.Templates }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/positions', component: positions_1.Positions }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/api', component: api_1.Api })));
exports.toastCategory = { "default": { "name": "Default", "category": "Toast" }, "types": { "name": "Types", "category": "Toast" }, "templates": { "name": "Templates", "category": "Toast" }, "positions": { "name": "Positions", "category": "Toast" }, "api": { "name": "API", "category": "Toast" }, "defaultSample": "toast/default" };
