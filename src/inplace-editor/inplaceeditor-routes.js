"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var dropdowns_1 = require("./dropdowns");
var pickers_1 = require("./pickers");
var edit_post_1 = require("./edit-post");
exports.inplaceeditorRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/dropdowns', component: dropdowns_1.DropDowns }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/pickers', component: pickers_1.Pickers }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/edit-post', component: edit_post_1.UseCase })));
exports.inplaceeditorCategory = { "default": { "name": "Overview", "category": "In-place Editor" }, "dropdowns": { "name": "DropDown Components", "category": "In-place Editor" }, "pickers": { "name": "Date Components", "category": "In-place Editor" }, "edit-post": { "name": "Edit Post", "category": "Use Case" }, "defaultSample": "inplace-editor/default" };
