"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var expand_and_collapse_1 = require("./expand-and-collapse");
var accordion_navigation_menu_1 = require("./accordion-navigation-menu");
var details_view_1 = require("./details-view");
var outlook_style_layout_1 = require("./outlook-style-layout");
var code_editor_layout_1 = require("./code-editor-layout");
exports.splitterRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/default', component: default_1.Basic }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/expand-and-collapse', component: expand_and_collapse_1.ExpandCollapse }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/accordion-navigation-menu', component: accordion_navigation_menu_1.AccordionIntegration }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/details-view', component: details_view_1.DetailsView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/outlook-style-layout', component: outlook_style_layout_1.OutlookLayout }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/code-editor-layout', component: code_editor_layout_1.CodeEditor })));
exports.splitterCategory = { "default": { "name": "Default Functionalities", "category": "Splitter" }, "expand-and-collapse": { "name": "Expand and Collapse", "category": "Splitter" }, "accordion-navigation-menu": { "name": "Accordion Navigation Menu", "category": "Use Case" }, "details-view": { "name": "Details View", "category": "Use Case" }, "outlook-style-layout": { "name": "Outlook-style Layout", "category": "Use Case" }, "code-editor-layout": { "name": "Code Editor Layout", "category": "Use Case" }, "defaultSample": "splitter/default" };
