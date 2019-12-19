"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var popup_1 = require("./popup");
var alignment_1 = require("./alignment");
exports.toolbarRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/popup', component: popup_1.Popup }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/alignment', component: alignment_1.Alignment })));
exports.toolbarCategory = { "default": { "name": "Default Functionalities", "category": "Toolbar" }, "popup": { "name": "Popup", "category": "Toolbar" }, "alignment": { "name": "Alignment", "category": "Toolbar" }, "defaultSample": "toolbar/default" };
