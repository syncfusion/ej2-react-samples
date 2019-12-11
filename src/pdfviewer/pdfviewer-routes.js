"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var custom_toolbar_1 = require("./custom-toolbar");
var right_to_left_1 = require("./right-to-left");
var form_filling_1 = require("./form-filling");
exports.pdfviewerRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/custom-toolbar', component: custom_toolbar_1.CustomToolbar }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/right-to-left', component: right_to_left_1.RightToLeft }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/form-filling', component: form_filling_1.FormFilling })));
exports.pdfviewerCategory = { "default": { "name": "Default", "category": "PDF Viewer" }, "custom-toolbar": { "name": "Custom Toolbar", "category": "PDF Viewer" }, "right-to-left": { "name": "Right To Left", "category": "PDF Viewer" }, "form-filling": { "name": "Form Filling", "category": "PDF Viewer" }, "defaultSample": "pdfviewer/default" };
