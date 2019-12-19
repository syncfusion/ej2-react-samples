"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var api_1 = require("./api");
exports.chipsRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chips/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chips/api', component: api_1.Api })));
exports.chipsCategory = { "default": { "name": "Default Functionalities", "category": "Chips" }, "api": { "name": "API", "category": "Chips" }, "defaultSample": "chips/default" };
