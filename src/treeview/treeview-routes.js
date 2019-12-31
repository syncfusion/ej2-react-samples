"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var icons_1 = require("./icons");
var check_box_1 = require("./check-box");
var node_editing_1 = require("./node-editing");
var multiple_selection_1 = require("./multiple-selection");
var drag_and_drop_1 = require("./drag-and-drop");
var template_1 = require("./template");
var local_data_1 = require("./local-data");
var remote_data_1 = require("./remote-data");
exports.treeviewRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/icons', component: icons_1.Icons }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/check-box', component: check_box_1.Checkbox }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/node-editing', component: node_editing_1.Editing }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/multiple-selection', component: multiple_selection_1.MultiSelect }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/drag-and-drop', component: drag_and_drop_1.Dragdrop }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/template', component: template_1.Template }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/local-data', component: local_data_1.LocalData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/remote-data', component: remote_data_1.RemoteData })));
exports.treeviewCategory = { "default": { "name": "Default Functionalities", "category": "TreeView" }, "icons": { "name": "Icons and Images", "category": "TreeView" }, "check-box": { "name": "Checkbox", "category": "TreeView" }, "node-editing": { "name": "Node Editing", "category": "TreeView" }, "multiple-selection": { "name": "Multiple Selection", "category": "TreeView" }, "drag-and-drop": { "name": "Drag and Drop", "category": "TreeView" }, "template": { "name": "Template", "category": "TreeView" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "defaultSample": "treeview/default" };
