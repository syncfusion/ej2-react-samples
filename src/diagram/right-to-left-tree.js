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
var diagram_data_1 = require("./diagram-data");
var RTLTree = /** @class */ (function (_super) {
    __extends(RTLTree, _super);
    function RTLTree() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTLTree.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", width: "100%", height: "600px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, dataSourceSettings: {
                            id: "Name",
                            parentId: "Category",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.artificialIntelligence),
                            doBinding: function (nodeModel, data, diagram) {
                                var nameKey = "Name";
                                nodeModel.annotations = [{ content: data[nameKey] }];
                            }
                        }, layout: {
                            type: "HierarchicalTree",
                            orientation: "RightToLeft",
                            verticalAlignment: "Center",
                            horizontalAlignment: "Center",
                            verticalSpacing: 100,
                            horizontalSpacing: -10
                        }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan, getNodeDefaults: function (obj, diagram) {
                            obj.width = 120;
                            obj.style = { fill: "#034d6d", strokeWidth: 1 };
                            var key = "branch";
                            //Initialize shape
                            if (obj.data[key] === "root") {
                                obj.shape = { type: "Basic", shape: "Ellipse" };
                                obj.height = 120;
                            }
                            else {
                                obj.shape = {
                                    type: "Native",
                                    content: '<svg width="120" height="61"><g><line x1="0" x2="120" y1="60" y2="60" stroke-width="1" stroke= "black"></line>' +
                                        '<rect x="0" y="0" width="120" height="60" fill="transparent" stroke="none"></rect></g></svg>'
                                };
                                obj.style.strokeWidth = 0;
                                obj.height = 60;
                            }
                            //Set ports and annotations
                            obj.ports = getPorts(obj.data[key] === "root");
                            var annotation = obj.annotations[0];
                            if (obj.data[key] !== "root") {
                                annotation.offset = { y: 1 };
                                annotation.verticalAlignment = "Bottom";
                                annotation.margin = { bottom: 10 };
                            }
                            else {
                                annotation.style = { color: "white" };
                            }
                            return obj;
                        }, 
                        //Sets the default values of a Connector
                        getConnectorDefaults: function (connector, diagram) {
                            connector.type = "Bezier";
                            connector.sourcePortID = "port1";
                            connector.targetPortID = "port2";
                            connector.targetDecorator = { shape: "None" };
                            return connector;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.HierarchicalTree] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the concept of artificial intelligence using hierarchical tree layout algorithm.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to generate a RTL (right to left) tree from an external data source. The",
                    React.createElement("code", null, "orientation"),
                    " property of the layout can be used to generate RTL tree."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a hierarchical structure, inject",
                    React.createElement("code", null, "HierarchicalTree"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return RTLTree;
}(sample_base_1.SampleBase));
exports.RTLTree = RTLTree;
//Create and add ports for Node.
function getPorts(root) {
    var ports = [
        {
            id: "port1",
            shape: "Circle",
            offset: { x: 0, y: 0.5 },
            horizontalAlignment: "Left",
            verticalAlignment: "Bottom",
            margin: { right: -2, bottom: -5.5 }
        },
        {
            id: "port2",
            shape: "Circle",
            offset: { x: 1, y: 0.99 },
            horizontalAlignment: "Right",
            verticalAlignment: "Bottom",
            margin: { right: -2, bottom: -5.5 }
        }
    ];
    if (!root) {
        ports[0].offset.y = 1;
    }
    else {
        ports[0].verticalAlignment = "Center";
        ports[0].horizontalAlignment = "Center";
    }
    return ports;
}
