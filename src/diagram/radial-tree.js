"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_diagrams_1 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var diagram_data_1 = require("./diagram-data");
require("./font-icons.css");
var SAMPLE_CSS = "<style>\n<div class=\"property-section\" style=\"padding-bottom: 0px\">\n";
var diagramInstance;
var Radial = (function (_super) {
    __extends(Radial, _super);
    function Radial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Radial.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
    };
    Radial.prototype.render = function () {
        return (React.createElement("div", { className: "control-panel" },
            React.createElement("style", null, "SAMPLE_CSS"),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar_diagram", clicked: onItemClick, items: [
                            {
                                type: "Button",
                                tooltipText: "ZoomIn",
                                text: "Zoom In",
                                prefixIcon: "e-diagram-icons e-diagram-zoomin"
                            },
                            { type: "Separator" },
                            {
                                type: "Button",
                                tooltipText: "ZoomOut",
                                text: "Zoom Out",
                                prefixIcon: "e-diagram-icons e-diagram-zoomout"
                            },
                            { type: "Separator" },
                            {
                                type: "Button",
                                tooltipText: "Reset",
                                text: "Reset",
                                prefixIcon: "e-diagram-icons e-diagram-reset"
                            }
                        ] }),
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "600px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, dataSourceSettings: {
                            //sets the fields to bind
                            id: "Id",
                            parentId: "ReportingPerson",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.radialTree),
                            doBinding: function (nodeModel, data, diagram) {
                                nodeModel.annotations = [
                                    {
                                        content: data.Name,
                                        style: data.Id === "parent"
                                            ? { color: "white", fontSize: 50 }
                                            : { color: "black", fontSize: 20 }
                                    }
                                ];
                                nodeModel.constraints =
                                    (ej2_react_diagrams_1.NodeConstraints.Default &
                                        ~ej2_react_diagrams_1.NodeConstraints.InheritTooltip) |
                                        ej2_react_diagrams_1.NodeConstraints.Tooltip;
                                nodeModel.tooltip = {
                                    content: data.Name + "<br/>" + data.Designation,
                                    relativeMode: "Object",
                                    position: "TopCenter",
                                    showTipPointer: true
                                };
                                if (data.Designation === "Managing Director") {
                                    nodeModel.width = 400;
                                    nodeModel.height = 400;
                                    nodeModel.shape = { shape: "Ellipse" };
                                    nodeModel.style = { fill: "black" };
                                }
                                else if (data.Designation === "Project Manager") {
                                    nodeModel.width = 130;
                                    nodeModel.height = 130;
                                    nodeModel.height = 130;
                                    nodeModel.style = { fill: "#f8ab52" };
                                }
                                else {
                                    nodeModel.width = 100;
                                    nodeModel.height = 100;
                                    nodeModel.shape = { shape: "Ellipse" };
                                    nodeModel.style = { fill: "#afeeee" };
                                }
                            }
                        }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, layout: {
                            type: "RadialTree",
                            verticalSpacing: 30,
                            horizontalSpacing: 20,
                            root: "Category"
                        }, getNodeDefaults: function (obj, diagram) {
                            return obj;
                        }, getConnectorDefaults: function (connector, diagram) {
                            connector.type = "Straight";
                            return connector;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.RadialTree] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates a huge organizational structure using a compact layout model. Radial tree layout algorithm is used to build such a layout.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to visualize a complex hierarchical data using radial tree layout algorithm that arranges the nodes in a circular structure. The ",
                    React.createElement("code", null, "type"),
                    " property of the layout can be used to enable radial tree layout. The spacing between the objects can also be customized in the tree. The",
                    " ",
                    React.createElement("code", null, "horizontalSpacing"),
                    " and ",
                    React.createElement("code", null, "verticalSpacing"),
                    " ",
                    "properties of ",
                    React.createElement("code", null, "layout"),
                    " can be used to customize the space between the objects in a tree."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a radial structure, inject ",
                    React.createElement("code", null, "RadialTree"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    Radial.prototype.nodeDefaults = function (obj) {
        return obj;
    };
    Radial.prototype.connectorDefaults = function (obj) {
        obj.type = "Straight";
        return obj;
    };
    return Radial;
}(sample_base_1.SampleBase));
exports.Radial = Radial;
//based on the option, Click event to perform ZoomIn,ZoomOut and Reset.
function onItemClick(args) {
    switch (args.item.text) {
        case "Zoom In":
            var zoomin = { type: "ZoomIn", zoomFactor: 0.2 };
            diagramInstance.zoomTo(zoomin);
            break;
        case "Zoom Out":
            var zoomout = { type: "ZoomOut", zoomFactor: 0.2 };
            diagramInstance.zoomTo(zoomout);
            break;
        case "Reset":
            diagramInstance.reset();
            diagramInstance.fitToPage();
            break;
    }
}
