"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var grouping_icon_1 = require("./grouping-icon");
var data_binding_1 = require("./data-binding");
var template_1 = require("./template");
var highlight_1 = require("./highlight");
var custom_filtering_1 = require("./custom-filtering");
var diacritics_filtering_1 = require("./diacritics-filtering");
exports.autocompleteRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/grouping-icon', component: grouping_icon_1.Grouping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/data-binding', component: data_binding_1.Data }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/template', component: template_1.Templates }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/highlight', component: highlight_1.Highlight }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/custom-filtering', component: custom_filtering_1.CustomFiltering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/diacritics-filtering', component: diacritics_filtering_1.DiacriticsFiltering })));
exports.autocompleteCategory = { "default": { "name": "Default Functionalities", "category": "AutoComplete" }, "grouping-icon": { "name": "Grouping and Icons", "category": "AutoComplete" }, "data-binding": { "name": "Data Binding", "category": "AutoComplete" }, "template": { "name": "Templates", "category": "AutoComplete" }, "highlight": { "name": "Highlight", "category": "AutoComplete" }, "custom-filtering": { "name": "Custom Filtering", "category": "AutoComplete" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "AutoComplete" }, "defaultSample": "auto-complete/default" };
