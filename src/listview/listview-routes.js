"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var remote_list_1 = require("./remote-list");
var check_list_1 = require("./check-list");
var nested_list_1 = require("./nested-list");
var virtualization_1 = require("./virtualization");
var template_1 = require("./template");
var group_template_1 = require("./group-template");
var call_history_1 = require("./call-history");
exports.listviewRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/remote-list', component: remote_list_1.Remote }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/check-list', component: check_list_1.Checklist }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/nested-list', component: nested_list_1.Nested }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/virtualization', component: virtualization_1.UiVirtualization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/template', component: template_1.Template }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/group-template', component: group_template_1.GroupTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/call-history', component: call_history_1.CallHistory })));
exports.listviewCategory = { "default": { "name": "Default Functionalities", "category": "ListView" }, "remote-list": { "name": "Remote Data", "category": "ListView" }, "check-list": { "name": "Checklist", "category": "ListView" }, "nested-list": { "name": "Nested List", "category": "ListView" }, "virtualization": { "name": "Virtualization", "category": "ListView" }, "template": { "name": "Template", "category": "Customization" }, "group-template": { "name": "Group Template", "category": "Customization" }, "call-history": { "name": "Call History", "category": "Use Case" }, "defaultSample": "listview/default" };
