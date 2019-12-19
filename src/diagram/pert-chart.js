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
function getTextElement(text, alignment, width, valignment) {
    var textElement = new ej2_react_diagrams_1.TextElement();
    textElement.content = text;
    textElement.id = ej2_react_diagrams_1.randomId();
    textElement.width = width;
    textElement.height = 25;
    textElement.horizontalAlignment = alignment;
    textElement.verticalAlignment = valignment;
    textElement.style.strokeWidth = 1;
    textElement.style.strokeColor = "#b5b5b5";
    textElement.style.fill = "transparent";
    textElement.style.color = "#3c3c3c";
    textElement.relativeMode = "Object";
    return textElement;
}
var sDate = "startDate";
var eDate = "endDate";
var duration = "duration";
var addRows = function (column, node) {
    column.children.push(getTextElement(node.data[sDate], "Left", 70));
    column.children.push(getTextElement(node.data[duration], "Center", 30));
    column.children.push(getTextElement(node.data[eDate], "Right", 70));
};
var diagramInstance;
var PertChart = (function (_super) {
    __extends(PertChart, _super);
    function PertChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PertChart.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
    };
    PertChart.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "499px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, dataSourceSettings: {
                            id: "id",
                            parentId: "Category",
                            dataSource: new ej2_data_1.DataManager(diagram_data_1.pertChartData),
                            doBinding: function (nodeModel, data, diagram) {
                                var shape = "shape";
                                var name = "id";
                                /* tslint:disable:no-string-literal */
                                nodeModel["shape"] = { type: "Text" };
                            }
                        }, layout: {
                            type: "ComplexHierarchicalTree",
                            orientation: "LeftToRight",
                            verticalSpacing: 100,
                            horizontalSpacing: 70
                        }, getConnectorDefaults: function (connector, diagram) {
                            connector.type = "Straight";
                            connector.style.strokeColor = "#979797";
                            connector.targetDecorator.width = 10;
                            connector.targetDecorator.height = 10;
                            connector.targetDecorator.style = {
                                fill: "#979797",
                                strokeColor: "#979797"
                            };
                            return connector;
                        }, 
                        //used to customize template of the node.
                        setNodeTemplate: function (node) {
                            return getNodeTemplate(node);
                        }, tool: ej2_react_diagrams_1.DiagramTools.ZoomPan },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [
                                ej2_react_diagrams_1.DataBinding,
                                ej2_react_diagrams_1.HierarchicalTree,
                                ej2_react_diagrams_1.ComplexHierarchicalTree
                            ] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes a project development process using Program Evaluation Review\u00A0Technique (PERT). Complex hierarchical tree layout algorithm is used to automatically arrange the nodes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to generate a PERT chart from an external data source. The ",
                    React.createElement("code", null, "dataSourceSettings"),
                    " property can be used to map an external data source with the diagram control. The",
                    " ",
                    React.createElement("code", null, "layout"),
                    " property can be used to automatically position the nodes. In this example, the nodes are arranged from left to right of the diagram. The ",
                    React.createElement("code", null, "orientation"),
                    " property can be used to define the orientation of the layouts."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically arrange the objects in a PERT Chart, inject",
                    React.createElement("code", null, "ComplexHierarchicalTree"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return PertChart;
}(sample_base_1.SampleBase));
exports.PertChart = PertChart;
//customization of the node template.
function getNodeTemplate(node) {
    var table = new ej2_react_diagrams_1.StackPanel();
    table.style.fill = "#0069d9";
    table.id = ej2_react_diagrams_1.randomId();
    table.orientation = "Vertical";
    var nameKey = "id";
    var stack = new ej2_react_diagrams_1.StackPanel();
    stack.children = [];
    stack.id = ej2_react_diagrams_1.randomId();
    stack.height = 25;
    stack.orientation = "Horizontal";
    stack.style.fill = "white";
    stack.horizontalAlignment = "Stretch";
    addRows(stack, node);
    table.children = [
        getTextElement(node.data[nameKey], "Stretch", 170, "Stretch"),
        stack
    ];
    table.children[0].style.color = "white";
    table.children[0].style.fontSize = 14;
    return table;
}
