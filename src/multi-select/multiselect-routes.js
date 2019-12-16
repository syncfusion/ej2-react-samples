"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var data_binding_1 = require("./data-binding");
var grouping_1 = require("./grouping");
var template_1 = require("./template");
var filtering_1 = require("./filtering");
var custom_value_1 = require("./custom-value");
var chip_customization_1 = require("./chip-customization");
var checkbox_1 = require("./checkbox");
var grouping_with_checkbox_1 = require("./grouping-with-checkbox");
var selection_limit_1 = require("./selection-limit");
var diacritics_filtering_1 = require("./diacritics-filtering");
exports.multiselectRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/data-binding', component: data_binding_1.Data }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/grouping', component: grouping_1.Grouping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/template', component: template_1.Templates }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/filtering', component: filtering_1.Filtering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/custom-value', component: custom_value_1.CustomTag }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/chip-customization', component: chip_customization_1.ChipCustomization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/checkbox', component: checkbox_1.CheckBox }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/grouping-with-checkbox', component: grouping_with_checkbox_1.CheckBoxGrouping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/selection-limit', component: selection_limit_1.SelectionLimit }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/diacritics-filtering', component: diacritics_filtering_1.DiacriticsFiltering })));
exports.multiselectCategory = { "default": { "name": "Default Functionalities", "category": "MultiSelect Dropdown" }, "data-binding": { "name": "Data Binding", "category": "MultiSelect Dropdown" }, "grouping": { "name": "Grouping", "category": "MultiSelect Dropdown" }, "template": { "name": "Templates", "category": "MultiSelect Dropdown" }, "filtering": { "name": "Filtering", "category": "MultiSelect Dropdown" }, "custom-value": { "name": "Custom Values", "category": "MultiSelect Dropdown" }, "chip-customization": { "name": "Chip Customization", "category": "MultiSelect Dropdown" }, "checkbox": { "name": "CheckBox", "category": "MultiSelect Dropdown" }, "grouping-with-checkbox": { "name": "Grouping with CheckBox", "category": "MultiSelect Dropdown" }, "selection-limit": { "name": "Selection Limit", "category": "MultiSelect Dropdown" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "MultiSelect Dropdown" }, "defaultSample": "multi-select/default" };
