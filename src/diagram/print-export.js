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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
require("./font-icons.css");
var shape = {
    type: "Basic",
    shape: "Rectangle",
    cornerRadius: 10
};
var nodes = [
    {
        id: "sourceNode1",
        width: 100,
        height: 50,
        offsetX: 120,
        offsetY: 100,
        style: { strokeColor: "#868686", fill: "#d5f5d5" },
        annotations: [
            {
                content: "Source Document",
                margin: { left: 15, right: 15, bottom: 15, top: 15 }
            }
        ]
    },
    {
        id: "censusNode2",
        width: 100,
        height: 75,
        offsetX: 120,
        offsetY: 200,
        shape: { type: "Basic", shape: "Diamond" },
        style: { strokeColor: "#8f908f", fill: "#e2f3fa" },
        annotations: [
            {
                content: "Census Record",
                margin: { left: 15, right: 15, bottom: 15, top: 15 }
            }
        ]
    },
    {
        id: "booksNode3",
        width: 100,
        height: 75,
        offsetX: 120,
        offsetY: 325,
        shape: { type: "Basic", shape: "Diamond" },
        style: { strokeColor: "#8f908f", fill: "#e2f3fa" },
        annotations: [{ content: "Books and Magazine" }]
    },
    {
        id: "recordNode4",
        width: 125,
        height: 50,
        offsetX: 320,
        offsetY: 200,
        style: { strokeColor: "#868686", fill: "#d5f5d5" },
        annotations: [{ content: "Record Template" }]
    },
    {
        id: "traditionalNode5",
        width: 125,
        height: 50,
        offsetX: 320,
        offsetY: 325,
        style: { strokeColor: "#868686", fill: "#d5f5d5" },
        annotations: [{ content: "Traditional Template" }]
    },
    {
        id: "nontraditionalNode6",
        width: 135,
        height: 50,
        offsetX: 120,
        offsetY: 425,
        style: { strokeColor: "#a8a8a8", fill: "#faebee" },
        annotations: [{ content: "Nontraditional" }]
    },
    {
        id: "Radial1",
        width: 125,
        height: 50,
        offsetX: 850,
        offsetY: 225,
        shape: { type: "Basic", shape: "Ellipse" },
        style: { strokeColor: "#a8a8a8", fill: "#fef0db" },
        annotations: [{ content: "Health Fitness" }]
    },
    {
        id: "Radial2",
        width: 125,
        height: 75,
        offsetX: 850,
        offsetY: 100,
        shape: { type: "Basic", shape: "Ellipse" },
        style: { strokeColor: "#a8a8a8", fill: "#faebee" },
        annotations: [{ content: "Diet" }]
    },
    {
        id: "Radial3",
        width: 125,
        height: 75,
        offsetX: 1025,
        offsetY: 175,
        shape: { type: "Basic", shape: "Ellipse" },
        style: { strokeColor: "#a8a8a8", fill: "#faebee" },
        annotations: [{ content: "Flexibility" }]
    },
    {
        id: "Radial4",
        width: 125,
        height: 75,
        offsetX: 1000,
        offsetY: 350,
        shape: { type: "Basic", shape: "Ellipse" },
        style: { strokeColor: "#a8a8a8", fill: "#faebee" },
        annotations: [{ content: "Muscular Endurance" }]
    },
    {
        id: "Radial5",
        width: 125,
        height: 75,
        offsetX: 675,
        offsetY: 175,
        shape: { type: "Basic", shape: "Ellipse" },
        style: { strokeColor: "#a8a8a8", fill: "#faebee" },
        annotations: [{ content: "Cardiovascular Strength" }]
    },
    {
        id: "Radial6",
        width: 125,
        height: 75,
        offsetX: 770,
        offsetY: 350,
        shape: { type: "Basic", shape: "Ellipse" },
        style: { strokeColor: "#a8a8a8", fill: "#faebee" },
        annotations: [{ content: "Muscular Strength" }]
    }
];
var connectors = [
    {
        id: "flowChartConnector1",
        sourceID: "sourceNode1",
        targetID: "censusNode2"
    },
    {
        id: "flowChartConnector2",
        sourceID: "censusNode2",
        targetID: "booksNode3",
        annotations: [{ content: "No", style: { fill: "White" } }]
    },
    {
        id: "flowChartConnector3",
        sourceID: "booksNode3",
        targetID: "nontraditionalNode6",
        annotations: [{ content: "No", style: { fill: "White" } }]
    },
    {
        id: "flowChartConnector4",
        sourceID: "censusNode2",
        targetID: "recordNode4",
        annotations: [{ content: "Yes", style: { fill: "White" } }]
    },
    {
        id: "flowChartConnector5",
        sourceID: "booksNode3",
        targetID: "traditionalNode5",
        annotations: [{ content: "Yes", style: { fill: "White" } }]
    },
    {
        id: "RadialConnector1",
        sourceID: "Radial1",
        targetID: "Radial2",
        annotations: [{ content: "Yes", style: { fill: "White" } }]
    },
    {
        id: "RadialConnector2",
        sourceID: "Radial1",
        targetID: "Radial3",
        annotations: [{ content: "Yes", style: { fill: "White" } }]
    },
    {
        id: "RadialConnector3",
        sourceID: "Radial1",
        targetID: "Radial4",
        annotations: [{ content: "Yes", style: { fill: "White" } }]
    },
    {
        id: "RadialConnector4",
        sourceID: "Radial1",
        targetID: "Radial5",
        annotations: [{ content: "Yes", style: { fill: "White" } }]
    },
    {
        id: "RadialConnector5",
        sourceID: "Radial1",
        targetID: "Radial6",
        annotations: [{ content: "Yes", style: { fill: "White" } }]
    }
];
var diagramInstance;
var checkBoxObj;
var exportOptions = {};
var items = [
    {
        text: "JPG"
    },
    {
        text: "PNG"
    },
    {
        text: "BMP"
    },
    {
        text: "SVG"
    }
];
var SAMPLE_CSS = "   .e-bigger #toolbar_diagram .e-icons.e-caret,\n#toolbar_diagram .e-icons.e-caret {\n    font-size: 12px;\n    margin-right: 0px;\n}\n\n#custombtn {\n    padding: 4px 0px 2px 4px;\n}";
var PrintExport = /** @class */ (function (_super) {
    __extends(PrintExport, _super);
    function PrintExport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrintExport.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
    };
    PrintExport.prototype.render = function () {
        function contentTemplate() {
            return (React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { items: items, iconCss: "e-diagram-icons e-diagram-export", content: "Export", select: onselect }));
        }
        function checkboxTemplate() {
            return (React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "checkBox", checked: false, ref: function (checkBox) { return (checkBoxObj = checkBox); }, label: "Multiple Page" }));
        }
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, "SAMPLE_CSS"),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { style: { width: "100%", height: "10%", marginTop: "10px" }, id: "toolbar_diagram", clicked: onItemClick },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Input", text: "Export", template: contentTemplate }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Button", text: "Print", prefixIcon: "e-diagram-icons e-diagram-print" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: "Input", template: checkboxTemplate }))),
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "580px", nodes: nodes, connectors: connectors, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, pageSettings: { width: 550, height: 500, multiplePage: true }, getConnectorDefaults: function (connector, diagram) {
                            connector.style.strokeColor = "#6d6d6d";
                            return connector;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.PrintAndExport] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates printing and exporting the diagram as images.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to print the diagram and how to export the diagram as image (*.jpg, *.png, and *bmp) and in SVG format. The",
                    " ",
                    React.createElement("code", null, "exportDiagram"),
                    " method can be used to export the diagram. The ",
                    React.createElement("code", null, "exportDiagram"),
                    " method takes the exporting options (file formats, mode of export, and the region to export) as input. The ",
                    React.createElement("code", null, "print"),
                    " method can be used to print the diagrams."),
                React.createElement("br", null))));
    };
    return PrintExport;
}(sample_base_1.SampleBase));
exports.PrintExport = PrintExport;
function newFunction() {
    return "Export";
}
//click event to perform printing the diagraming objects.
function onItemClick(args) {
    var printOptions = {};
    switch (args.item.text) {
        case "Print":
            {
                printOptions.mode = "Data";
                printOptions.region = "PageSettings";
                printOptions.multiplePage = checkBoxObj.checked;
                printOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
                diagramInstance.print(printOptions);
            }
            break;
    }
}
//Export the diagraming object based on the format.
function onselect(args) {
    var exportOptions = {};
    switch (args.item.text) {
        case "JPG":
            exportOptions.format = args.item.text;
            break;
        case "PNG":
            exportOptions.format = args.item.text;
            break;
        case "BMP":
            exportOptions.format = args.item.text;
            break;
        case "SVG":
            exportOptions.format = args.item.text;
            break;
    }
    exportOptions.mode = "Download";
    exportOptions.region = "PageSettings";
    exportOptions.multiplePage = checkBoxObj.checked;
    exportOptions.fileName = "Export";
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagramInstance.exportDiagram(exportOptions);
}
