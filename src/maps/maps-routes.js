"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var projection_1 = require("./projection");
var multilayer_1 = require("./multilayer");
var marker_1 = require("./marker");
var marker_template_1 = require("./marker-template");
var marker_cluster_1 = require("./marker-cluster");
var label_1 = require("./label");
var bubble_1 = require("./bubble");
var navigation_line_1 = require("./navigation-line");
var legend_1 = require("./legend");
var color_mapping_1 = require("./color-mapping");
var annotation_1 = require("./annotation");
var osm_1 = require("./osm");
var osm_with_navigation_lines_1 = require("./osm-with-navigation-lines");
var osm_with_sublayers_1 = require("./osm-with-sublayers");
var tooltip_1 = require("./tooltip");
var selection_1 = require("./selection");
var zooming_1 = require("./zooming");
var programmatic_zoom_1 = require("./programmatic-zoom");
var drilldown_1 = require("./drilldown");
var print_1 = require("./print");
var export_1 = require("./export");
var heatmap_1 = require("./heatmap");
var curved_1 = require("./curved");
var earthquake_1 = require("./earthquake");
var highlight_1 = require("./highlight");
var cyber_attack_map_1 = require("./cyber-attack-map");
var dynamic_marker_1 = require("./dynamic-marker");
var map_pie_1 = require("./map-pie");
var map_with_slider_1 = require("./map-with-slider");
var sales_maps_1 = require("./sales-maps");
var seat_booking_1 = require("./seat-booking");
exports.mapsRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/default', component: default_1.DefaultMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/projection', component: projection_1.ProjectionMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/multilayer', component: multilayer_1.MultilayerMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/marker', component: marker_1.MarkerMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/marker-template', component: marker_template_1.MarkerTemplateMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/marker-cluster', component: marker_cluster_1.MarkerCluster }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/label', component: label_1.LabelMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/bubble', component: bubble_1.BubbleMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/navigation-line', component: navigation_line_1.NavigationLineMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/legend', component: legend_1.LegendMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/color-mapping', component: color_mapping_1.ColorMap }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/annotation', component: annotation_1.AnnotationMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm', component: osm_1.OSMMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm-with-navigation-lines', component: osm_with_navigation_lines_1.OSMNavigation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm-with-sublayers', component: osm_with_sublayers_1.OSMSubLayer }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/tooltip', component: tooltip_1.TooltipMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/selection', component: selection_1.SelectionMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/zooming', component: zooming_1.ZoomingMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/programmatic-zoom', component: programmatic_zoom_1.ProgrammaticZoomMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/drilldown', component: drilldown_1.DrilldownMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/print', component: print_1.PrintMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/export', component: export_1.ExportMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/heatmap', component: heatmap_1.HeatMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/curved', component: curved_1.CurvedMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/earthquake', component: earthquake_1.EarthquakeMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/highlight', component: highlight_1.HighlightMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/cyber-attack-map', component: cyber_attack_map_1.CyberAttackMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/dynamic-marker', component: dynamic_marker_1.DynamicMarker }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/map-pie', component: map_pie_1.PieMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/map-with-slider', component: map_with_slider_1.MapSlider }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/sales-maps', component: sales_maps_1.SalesMaps }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/seat-booking', component: seat_booking_1.SeatBookingMaps })));
exports.mapsCategory = { "default": { "name": "Default Functionalities", "category": "Maps" }, "projection": { "name": "Projection", "category": "Features" }, "multilayer": { "name": "Multi-layers", "category": "Features" }, "marker": { "name": "Marker", "category": "Features" }, "marker-template": { "name": "Marker template", "category": "Features" }, "marker-cluster": { "name": "Marker Clustering", "category": "Features" }, "label": { "name": "Labels", "category": "Features" }, "bubble": { "name": "Bubble", "category": "Features" }, "navigation-line": { "name": "Navigation Lines", "category": "Features" }, "legend": { "name": "Legend", "category": "Features" }, "color-mapping": { "name": "Color Mapping", "category": "Features" }, "annotation": { "name": "Annotations", "category": "Features" }, "osm": { "name": "OpenStreetMap", "category": "Map Providers" }, "osm-with-navigation-lines": { "name": "OSM with Navigation Lines", "category": "Map Providers" }, "osm-with-sublayers": { "name": "OSM with Sublayer", "category": "Map Providers" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "selection": { "name": "Selection & Highlight", "category": "User Interaction" }, "zooming": { "name": "Zooming & Panning", "category": "User Interaction" }, "programmatic-zoom": { "name": "Zoom to fit all markers", "category": "User Interaction" }, "drilldown": { "name": "Drill down", "category": "User Interaction" }, "print": { "name": "Print", "category": "Print and Export" }, "export": { "name": "Export", "category": "Print and Export" }, "heatmap": { "name": "Heat Map", "category": "Use Cases" }, "curved": { "name": "Flight routes", "category": "Use Cases" }, "earthquake": { "name": "Earthquake indication", "category": "Use Cases" }, "highlight": { "name": "Highlighted region", "category": "Use Cases" }, "cyber-attack-map": { "name": "Cyber Attack Map", "category": "Use Cases" }, "dynamic-marker": { "name": "Dynamic Markers", "category": "Use Cases" }, "map-pie": { "name": "Map with Pie chart", "category": "Use Cases" }, "map-with-slider": { "name": "Map with Slider", "category": "Use Cases" }, "sales-maps": { "name": "Sales map ", "category": "Use Cases" }, "seat-booking": { "name": "Bus seat booking", "category": "Use Cases" }, "defaultSample": "maps/default" };
