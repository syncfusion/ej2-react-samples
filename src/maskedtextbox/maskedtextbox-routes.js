"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var custom_mask_1 = require("./custom-mask");
var formats_1 = require("./formats");
exports.maskedtextboxRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maskedtextbox/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maskedtextbox/custom-mask', component: custom_mask_1.CustomMask }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maskedtextbox/formats', component: formats_1.Formats })));
exports.maskedtextboxCategory = { "default": { "name": "Default Functionalities", "category": "Input Mask" }, "custom-mask": { "name": "Custom Mask", "category": "Input Mask" }, "formats": { "name": "Formats", "category": "Input Mask" }, "defaultSample": "maskedtextbox/default" };
