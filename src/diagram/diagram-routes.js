"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functionality_1 = require("./default-functionality");
var shape_gallery_1 = require("./shape-gallery");
var getting_started_node_1 = require("./getting-started-node");
var connectors_1 = require("./connectors");
var getting_started_annotation_1 = require("./getting-started-annotation");
var port_1 = require("./port");
var swim_lane_1 = require("./swim-lane");
var diagram_events_1 = require("./diagram-events");
var tooltip_1 = require("./tooltip");
var history_manager_1 = require("./history-manager");
var flow_execution_1 = require("./flow-execution");
var custom_shapes_1 = require("./custom-shapes");
var line_routing_1 = require("./line-routing");
var bpmn_editor_1 = require("./bpmn-editor");
var logic_circuit_1 = require("./logic-circuit");
var uml_activity_1 = require("./uml-activity");
var network_diagram_1 = require("./network-diagram");
var Uml_class_diagram_1 = require("./Uml-class-diagram");
var hierarchical_model_1 = require("./hierarchical-model");
var organization_model_1 = require("./organization-model");
var radial_tree_1 = require("./radial-tree");
var mind_map_1 = require("./mind-map");
var symmetric_layout_1 = require("./symmetric-layout");
var complex_hierarchical_tree_1 = require("./complex-hierarchical-tree");
var right_to_left_tree_1 = require("./right-to-left-tree");
var pert_chart_1 = require("./pert-chart");
var drawing_tool_1 = require("./drawing-tool");
var key_board_functions_1 = require("./key-board-functions");
var quick_commands_1 = require("./quick-commands");
var symbol_palette_1 = require("./symbol-palette");
var overview_1 = require("./overview");
var serialization_1 = require("./serialization");
var print_export_1 = require("./print-export");
var local_data_1 = require("./local-data");
var remote_data_1 = require("./remote-data");
var crud_1 = require("./crud");
var venn_diagram_1 = require("./venn-diagram");
var fishbone_diagram_1 = require("./fishbone-diagram");
exports.diagramRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/default-functionality', component: default_functionality_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/shape-gallery', component: shape_gallery_1.ShapeGallery }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/getting-started-node', component: getting_started_node_1.GettingStartedNodes }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/connectors', component: connectors_1.Connectors }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/getting-started-annotation', component: getting_started_annotation_1.GettingStartedAnnotation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/port', component: port_1.Port }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/swim-lane', component: swim_lane_1.SwimLane }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/diagram-events', component: diagram_events_1.Events }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/tooltip', component: tooltip_1.Tooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/history-manager', component: history_manager_1.HistoryManager }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/flow-execution', component: flow_execution_1.FlowExecution }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/custom-shapes', component: custom_shapes_1.HtmlNode }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/line-routing', component: line_routing_1.LineRoutingSample }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/bpmn-editor', component: bpmn_editor_1.BpmnEditor }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/logic-circuit', component: logic_circuit_1.LogicCircuit }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/uml-activity', component: uml_activity_1.UmlActivityDiagram }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/network-diagram', component: network_diagram_1.NetworkShapes }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/Uml-class-diagram', component: Uml_class_diagram_1.UMLClassDiagram }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/hierarchical-model', component: hierarchical_model_1.HierarchicalModel }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/organization-model', component: organization_model_1.OrganizationModel }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/radial-tree', component: radial_tree_1.Radial }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/mind-map', component: mind_map_1.MindMap }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/symmetric-layout', component: symmetric_layout_1.SymmetricLayout }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/complex-hierarchical-tree', component: complex_hierarchical_tree_1.ComplexHierarchicalModel }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/right-to-left-tree', component: right_to_left_tree_1.RTLTree }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/pert-chart', component: pert_chart_1.PertChart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/drawing-tool', component: drawing_tool_1.DrawingTools }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/key-board-functions', component: key_board_functions_1.KeyBoardInteraction }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/quick-commands', component: quick_commands_1.UserHandle }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/symbol-palette', component: symbol_palette_1.SymbolPalette }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/overview', component: overview_1.Overview }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/serialization', component: serialization_1.Serialization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/print-export', component: print_export_1.PrintExport }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/local-data', component: local_data_1.LocalData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/remote-data', component: remote_data_1.RemoteData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/crud', component: crud_1.Crud }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/venn-diagram', component: venn_diagram_1.VennDiagram }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/diagram/fishbone-diagram', component: fishbone_diagram_1.Fishbone })));
exports.diagramCategory = { "default-functionality": { "name": "Default Functionalities", "category": "Getting Started" }, "shape-gallery": { "name": "Shapes", "category": "Getting Started" }, "getting-started-node": { "name": "Nodes", "category": "Getting Started" }, "connectors": { "name": "Connectors", "category": "Getting Started" }, "getting-started-annotation": { "name": "Annotations", "category": "Getting Started" }, "port": { "name": "Ports", "category": "Getting Started" }, "swim-lane": { "name": "SwimLane", "category": "Getting Started" }, "diagram-events": { "name": "Events", "category": "Getting Started" }, "tooltip": { "name": "Tooltip", "category": "Getting Started" }, "history-manager": { "name": "HistoryManager", "category": "Getting Started" }, "flow-execution": { "name": "Flow Execution", "category": "Getting Started" }, "custom-shapes": { "name": "Complex Shapes", "category": "Getting Started" }, "line-routing": { "name": "LineRouting", "category": "Getting Started" }, "bpmn-editor": { "name": "BPMN Editor", "category": "Use Case Diagram" }, "logic-circuit": { "name": "Logic circuit Diagram", "category": "Use Case Diagram" }, "uml-activity": { "name": "UML Activity Diagram", "category": "Use Case Diagram" }, "network-diagram": { "name": "Network Diagram", "category": "Use Case Diagram" }, "Uml-class-diagram": { "name": "UML Class Diagram", "category": "Use Case Diagram" }, "hierarchical-model": { "name": "Hierarchical Tree", "category": "Automatic Layouts" }, "organization-model": { "name": "Organization Chart", "category": "Automatic Layouts" }, "radial-tree": { "name": "Radial Tree", "category": "Automatic Layouts" }, "mind-map": { "name": "Mind Map", "category": "Automatic Layouts" }, "symmetric-layout": { "name": "Symmetric Layout", "category": "Automatic Layouts" }, "complex-hierarchical-tree": { "name": "Complex Hierarchical Tree", "category": "Automatic Layouts" }, "right-to-left-tree": { "name": "RTL Tree", "category": "Automatic Layouts" }, "pert-chart": { "name": "PERT Chart", "category": "Automatic Layouts" }, "drawing-tool": { "name": "Drawing Tools", "category": "User Interaction" }, "key-board-functions": { "name": "Keyboard Interaction", "category": "User Interaction" }, "quick-commands": { "name": "User Handle", "category": "User Interaction" }, "symbol-palette": { "name": "Symbol Palette", "category": "User Interaction" }, "overview": { "name": "Overview Panel", "category": "User Interaction" }, "serialization": { "name": "Serialization", "category": "Print and Export" }, "print-export": { "name": "Print and Export", "category": "Print and Export" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "crud": { "name": "CRUD", "category": "Data Binding" }, "venn-diagram": { "name": "Venn Diagram", "category": "Static Diagram" }, "fishbone-diagram": { "name": "Fishbone Diagram", "category": "Static Diagram" }, "defaultSample": "diagram/default-functionality" };
