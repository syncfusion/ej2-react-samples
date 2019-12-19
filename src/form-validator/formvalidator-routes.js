"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
exports.formvalidatorRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/form-validator/default', component: default_1.Default })));
exports.formvalidatorCategory = { "default": { "name": "Default Functionalities", "category": "Form Validator" }, "defaultSample": "form-validator/default" };
