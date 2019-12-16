"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var dual_list_box_1 = require("./dual-list-box");
var drag_and_drop_1 = require("./drag-and-drop");
var checkbox_1 = require("./checkbox");
var api_1 = require("./api");
exports.listboxRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/dual-list-box', component: dual_list_box_1.DualListBox }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/drag-and-drop', component: drag_and_drop_1.DragAndDrop }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/checkbox', component: checkbox_1.CheckBox }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/api', component: api_1.Api })));
exports.listboxCategory = { "default": { "name": "Default Functionalities", "category": "List Box" }, "dual-list-box": { "name": "Dual ListBox", "category": "List Box" }, "drag-and-drop": { "name": "Drag And Drop", "category": "List Box" }, "checkbox": { "name": "Checkbox", "category": "List Box" }, "api": { "name": "API", "category": "List Box" }, "defaultSample": "list-box/default" };
