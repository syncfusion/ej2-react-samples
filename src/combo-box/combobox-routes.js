"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var grouping_icon_1 = require("./grouping-icon");
var data_binding_1 = require("./data-binding");
var custom_value_1 = require("./custom-value");
var filtering_1 = require("./filtering");
var template_1 = require("./template");
var cascading_1 = require("./cascading");
var diacritics_filtering_1 = require("./diacritics-filtering");
exports.comboboxRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/grouping-icon', component: grouping_icon_1.Grouping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/data-binding', component: data_binding_1.Data }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/custom-value', component: custom_value_1.Custom }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/filtering', component: filtering_1.Filtering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/template', component: template_1.Templates }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/cascading', component: cascading_1.Cascading }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/diacritics-filtering', component: diacritics_filtering_1.DiacriticsFiltering })));
exports.comboboxCategory = { "default": { "name": "Default Functionalities", "category": "ComboBox" }, "grouping-icon": { "name": "Grouping and Icons", "category": "ComboBox" }, "data-binding": { "name": "Data Binding", "category": "ComboBox" }, "custom-value": { "name": "Custom Value", "category": "ComboBox" }, "filtering": { "name": "Filtering", "category": "ComboBox" }, "template": { "name": "Templates", "category": "ComboBox" }, "cascading": { "name": "Cascading", "category": "ComboBox" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "ComboBox" }, "defaultSample": "combo-box/default" };
