"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var template_1 = require("./template");
var grid_1 = require("./grid");
exports.querybuilderRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/template', component: template_1.Template }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/grid', component: grid_1.DataGrid })));
exports.querybuilderCategory = { "default": { "name": "Default Functionalities", "category": "Query Builder" }, "template": { "name": "Template", "category": "Query Builder" }, "grid": { "name": "Integration with Data Grid", "category": "Query Builder" }, "defaultSample": "query-builder/default" };
