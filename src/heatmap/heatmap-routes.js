"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var calendar_heatmap_1 = require("./calendar-heatmap");
var bubble_types_1 = require("./bubble-types");
var color_and_size_attributes_1 = require("./color-and-size-attributes");
var array_row_1 = require("./array-row");
var array_cell_1 = require("./array-cell");
var row_json_binding_1 = require("./row-json-binding");
var cell_json_binding_1 = require("./cell-json-binding");
var empty_points_1 = require("./empty-points");
var inversed_axis_1 = require("./inversed-axis");
var opposed_axis_1 = require("./opposed-axis");
var MultiLevelLabels_1 = require("./MultiLevelLabels");
var cell_selection_1 = require("./cell-selection");
var legend_1 = require("./legend");
var large_data_1 = require("./large-data");
var palette_1 = require("./palette");
var render_mode_1 = require("./render-mode");
var tooltip_template_1 = require("./tooltip-template");
exports.heatmapRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/calendar-heatmap', component: calendar_heatmap_1.CalendarHeatmap }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/bubble-types', component: bubble_types_1.BubbleTypes }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/color-and-size-attributes', component: color_and_size_attributes_1.ColorAndSizeAttributes }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/array-row', component: array_row_1.ArrayRow }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/array-cell', component: array_cell_1.ArrayCell }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/row-json-binding', component: row_json_binding_1.JsonRow }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/cell-json-binding', component: cell_json_binding_1.JsonCell }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/empty-points', component: empty_points_1.EmptyPoints }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/inversed-axis', component: inversed_axis_1.InversedAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/opposed-axis', component: opposed_axis_1.OpposedAxis }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/MultiLevelLabels', component: MultiLevelLabels_1.MultiLevelLabels }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/cell-selection', component: cell_selection_1.CellSelection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/legend', component: legend_1.LegendPlacement }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/large-data', component: large_data_1.LargeData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/palette', component: palette_1.Palette }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/render-mode', component: render_mode_1.RenderMode }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap/tooltip-template', component: tooltip_template_1.TooltipTemplate })));
exports.heatmapCategory = { "default": { "name": "Default Functionalities", "category": "Heatmap Chart" }, "calendar-heatmap": { "name": "Calendar Heatmap", "category": "Heatmap Chart" }, "bubble-types": { "name": "Bubble Types", "category": "Bubble Heatmap" }, "color-and-size-attributes": { "name": "Color and Size Attributes", "category": "Bubble Heatmap" }, "array-row": { "name": "Row", "category": "Data Binding" }, "array-cell": { "name": "Cell", "category": "Data Binding" }, "row-json-binding": { "name": "JSON Row", "category": "Data Binding" }, "cell-json-binding": { "name": "JSON Cell", "category": "Data Binding" }, "empty-points": { "name": "Empty points", "category": "Features" }, "inversed-axis": { "name": "Inversed Axis", "category": "Features" }, "opposed-axis": { "name": "Opposed Axis", "category": "Features" }, "MultiLevelLabels": { "name": "Multi Level Labels", "category": "Features" }, "cell-selection": { "name": "Selection", "category": "Features" }, "legend": { "name": "Legend Placement", "category": "Features" }, "large-data": { "name": "Large Data", "category": "Features" }, "palette": { "name": "Palette Mode", "category": "Features" }, "render-mode": { "name": "Rendering mode", "category": "Features" }, "tooltip-template": { "name": "Tooltip Template", "category": "Features" }, "defaultSample": "heatmap/default" };
