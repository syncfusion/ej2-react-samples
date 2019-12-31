"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var ajax_1 = require("./ajax");
var icon_1 = require("./icon");
exports.accordionRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/accordion/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/accordion/ajax', component: ajax_1.AjaxContent }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/accordion/icon', component: icon_1.Icons })));
exports.accordionCategory = { "default": { "name": "Default Functionalities", "category": "Accordion" }, "ajax": { "name": "Ajax Content", "category": "Accordion" }, "icon": { "name": "Icons", "category": "Accordion" }, "defaultSample": "accordion/default" };
