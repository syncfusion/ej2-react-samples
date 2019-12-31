"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var formula_1 = require("./formula");
var cell_data_binding_1 = require("./cell-data-binding");
var remote_data_binding_1 = require("./remote-data-binding");
var cell_formatting_1 = require("./cell-formatting");
var number_formatting_1 = require("./number-formatting");
exports.spreadsheetRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/formula', component: formula_1.Formula }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/cell-data-binding', component: cell_data_binding_1.CellDataBinding }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/remote-data-binding', component: remote_data_binding_1.RemoteDataBinding }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/cell-formatting', component: cell_formatting_1.CellFormatting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/number-formatting', component: number_formatting_1.NumberFormatting })));
exports.spreadsheetCategory = { "default": { "name": "Default Functionalities", "category": "Spreadsheet" }, "formula": { "name": "Formula", "category": "Spreadsheet" }, "cell-data-binding": { "name": "Cell Data Binding", "category": "Data Binding" }, "remote-data-binding": { "name": "Remote Data Binding", "category": "Data Binding" }, "cell-formatting": { "name": "Cell Formatting", "category": "Formatting" }, "number-formatting": { "name": "Number Formatting", "category": "Formatting" }, "defaultSample": "spreadsheet/default" };
