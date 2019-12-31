"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var range_validation_1 = require("./range-validation");
var custom_format_1 = require("./custom-format");
var restrict_decimals_1 = require("./restrict-decimals");
exports.numerictextboxRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/range-validation', component: range_validation_1.Range }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/custom-format', component: custom_format_1.Format }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/restrict-decimals', component: restrict_decimals_1.Restrict })));
exports.numerictextboxCategory = { "default": { "name": "Default Functionalities", "category": "Numeric Textbox" }, "range-validation": { "name": "Range Validation", "category": "Numeric Textbox" }, "custom-format": { "name": "Custom Format", "category": "Numeric Textbox" }, "restrict-decimals": { "name": "Restrict Decimals", "category": "Numeric Textbox" }, "defaultSample": "numerictextbox/default" };
