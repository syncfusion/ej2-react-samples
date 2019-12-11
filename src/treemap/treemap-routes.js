"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var layout_1 = require("./layout");
var drilldown_1 = require("./drilldown");
var customization_1 = require("./customization");
var label_1 = require("./label");
var tooltip_1 = require("./tooltip");
var election_1 = require("./election");
var color_mapping_1 = require("./color-mapping");
var selection_1 = require("./selection");
var print_1 = require("./print");
var pie_1 = require("./pie");
var rtl_1 = require("./rtl");
exports.treemapRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/layout', component: layout_1.Layout }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/drilldown', component: drilldown_1.Drilldown }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/customization', component: customization_1.Customization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/label', component: label_1.Datalabel }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/tooltip', component: tooltip_1.Tooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/election', component: election_1.Legend }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/color-mapping', component: color_mapping_1.ColorMapping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/selection', component: selection_1.Selection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/print', component: print_1.Print }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/pie', component: pie_1.Pie }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/rtl', component: rtl_1.RTL })));
exports.treemapCategory = { "default": { "name": "Default Functionalities", "category": "TreeMap" }, "layout": { "name": "Layout", "category": "TreeMap" }, "drilldown": { "name": "Drilldown", "category": "TreeMap" }, "customization": { "name": "Customization", "category": "TreeMap" }, "label": { "name": "Data Label", "category": "TreeMap" }, "tooltip": { "name": "Tooltip", "category": "TreeMap" }, "election": { "name": "Legend", "category": "TreeMap" }, "color-mapping": { "name": "Color Mapping", "category": "TreeMap" }, "selection": { "name": "Selection & Highlight", "category": "TreeMap" }, "print": { "name": "Print & Export", "category": "TreeMap" }, "pie": { "name": "Treemap with Pie", "category": "TreeMap" }, "rtl": { "name": "RTL", "category": "TreeMap" }, "defaultSample": "treemap/default" };
