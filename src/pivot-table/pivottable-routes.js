"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var local_1 = require("./local");
var remote_1 = require("./remote");
var Olap_1 = require("./Olap");
var pivot_chart_1 = require("./pivot-chart");
var external_binding_1 = require("./external-binding");
var field_list_1 = require("./field-list");
var grouping_bar_1 = require("./grouping-bar");
var conditional_formatting_1 = require("./conditional-formatting");
var selection_1 = require("./selection");
var summary_customization_1 = require("./summary-customization");
var grouping_1 = require("./grouping");
var tool_bar_1 = require("./tool-bar");
var calculated_field_1 = require("./calculated-field");
var aggregation_1 = require("./aggregation");
var sorting_1 = require("./sorting");
var value_sorting_1 = require("./value-sorting");
var filtering_1 = require("./filtering");
var label_filtering_1 = require("./label-filtering");
var value_filtering_1 = require("./value-filtering");
var virtual_scrolling_1 = require("./virtual-scrolling");
var cell_template_1 = require("./cell-template");
var drill_through_1 = require("./drill-through");
var editing_1 = require("./editing");
var hyper_link_1 = require("./hyper-link");
var defer_update_1 = require("./defer-update");
var exporting_1 = require("./exporting");
exports.pivottableRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/local', component: local_1.Local }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/remote', component: remote_1.Remote }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/Olap', component: Olap_1.OlapSample }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/pivot-chart', component: pivot_chart_1.ChartIntegration }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/external-binding', component: external_binding_1.Integration }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/field-list', component: field_list_1.FieldList }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/grouping-bar', component: grouping_bar_1.GroupingBarSample }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/conditional-formatting', component: conditional_formatting_1.ConditionalFormattingClass }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/selection', component: selection_1.Selection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/summary-customization', component: summary_customization_1.SummaryCustomization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/grouping', component: grouping_1.Grouping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/tool-bar', component: tool_bar_1.PivotToolbar }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/calculated-field', component: calculated_field_1.CalculatedFieldClass }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/aggregation', component: aggregation_1.Aggregation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/sorting', component: sorting_1.Sorting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/value-sorting', component: value_sorting_1.ValueSorting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/filtering', component: filtering_1.Filtering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/label-filtering', component: label_filtering_1.LabelFilter }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/value-filtering', component: value_filtering_1.ValueFilter }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/virtual-scrolling', component: virtual_scrolling_1.VirtualScrolling }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/cell-template', component: cell_template_1.CellTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/drill-through', component: drill_through_1.DrillThroughComponent }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/editing', component: editing_1.Editing }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/hyper-link', component: hyper_link_1.HyperLink }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/defer-update', component: defer_update_1.DeferUpdate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/exporting', component: exporting_1.Exporting })));
exports.pivottableCategory = { "default": { "name": "Default Functionalities", "category": "Pivot Table" }, "local": { "name": "Local Data", "category": "Data Binding" }, "remote": { "name": "Remote Data", "category": "Data Binding" }, "Olap": { "name": "OLAP", "category": "Data Binding" }, "pivot-chart": { "name": "Pivot Chart", "category": "Integration" }, "external-binding": { "name": "External Binding", "category": "Integration" }, "field-list": { "name": "Field List", "category": "User Interaction" }, "grouping-bar": { "name": "Grouping Bar", "category": "User Interaction" }, "conditional-formatting": { "name": "Conditional Formatting", "category": "User Interaction" }, "selection": { "name": "Selection", "category": "User Interaction" }, "summary-customization": { "name": "Show/Hide Totals", "category": "User Interaction" }, "grouping": { "name": "Grouping", "category": "User Interaction" }, "tool-bar": { "name": "Toolbar", "category": "User Interaction" }, "calculated-field": { "name": "Calculated Field", "category": "Formula" }, "aggregation": { "name": "Aggregation", "category": "Formula" }, "sorting": { "name": "Default Sorting", "category": "Sorting" }, "value-sorting": { "name": "Value Sorting", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "label-filtering": { "name": "Label Filtering", "category": "Filtering" }, "value-filtering": { "name": "Value Filtering", "category": "Filtering" }, "virtual-scrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "cell-template": { "name": "Cell Template", "category": "Customization" }, "drill-through": { "name": "Drill Through", "category": "Miscellaneous" }, "editing": { "name": "Editing", "category": "Miscellaneous" }, "hyper-link": { "name": "Hyperlink", "category": "Miscellaneous" }, "defer-update": { "name": "Defer Layout Update", "category": "Miscellaneous" }, "exporting": { "name": "Export", "category": "Miscellaneous" }, "defaultSample": "pivot-table/default" };
