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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_dropdowns_2 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var diagramInstance;
var portDrop;
var portVisibilityDrop;
var portFillDrop;
var portBorderDrop;
var portShapeDrop;
var portSizeNum;
var portWidthNum;
//Initializes the ports for the diagram
var node1Port = [
    {
        id: "port1",
        shape: "Circle",
        offset: { x: 0, y: 0.5 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 1"
    },
    {
        id: "port2",
        shape: "Circle",
        offset: { x: 1, y: 0.5 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "OUT - 1"
    },
    {
        id: "port3",
        shape: "Circle",
        offset: { x: 0.25, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 2"
    },
    {
        id: "port4",
        shape: "Circle",
        offset: { x: 0.5, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "OUT - 2"
    },
    {
        id: "port5",
        shape: "Circle",
        offset: { x: 0.75, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 3"
    }
];
var node2Port = [
    {
        id: "port6",
        shape: "Circle",
        offset: { x: 0, y: 0.5 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 1"
    },
    {
        id: "port7",
        shape: "Circle",
        offset: { x: 1, y: 0.35 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "OUT - 1"
    },
    {
        id: "port8",
        shape: "Circle",
        offset: { x: 1, y: 0.7 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 2"
    },
    {
        id: "port9",
        shape: "Circle",
        offset: { x: 0.5, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "OUT - 2"
    }
];
var node3Port = [
    {
        id: "port10",
        shape: "Circle",
        offset: { x: 0, y: 0.5 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "Out - 1"
    },
    {
        id: "port11",
        shape: "Circle",
        offset: { x: 0.5, y: 0 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 1"
    },
    {
        id: "port12",
        shape: "Circle",
        offset: { x: 0.5, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "OUT - 2"
    }
];
var node4Port = [
    {
        id: "port13",
        shape: "Circle",
        offset: { x: 0, y: 0.5 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 1"
    },
    {
        id: "port14",
        shape: "Circle",
        offset: { x: 0.5, y: 0 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 2"
    },
    {
        id: "port15",
        shape: "Circle",
        offset: { x: 0.5, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "OUT - 1"
    }
];
var node5Port = [
    {
        id: "port16",
        shape: "Circle",
        offset: { x: 0, y: 0.5 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "out - 1"
    },
    {
        id: "port17",
        shape: "Circle",
        offset: { x: 0.5, y: 0 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 1"
    },
    {
        id: "port18",
        shape: "Circle",
        offset: { x: 1, y: 0.5 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "OUT - 2"
    }
];
var node6Port = [
    {
        id: "port19",
        shape: "Circle",
        offset: { x: 0, y: 0.35 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 1"
    },
    {
        id: "port20",
        shape: "Circle",
        offset: { x: 0.5, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "Out - 1"
    }
];
var node7Port = [
    {
        id: "port21",
        shape: "Circle",
        offset: { x: 0.5, y: 0 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "In - 1"
    },
    {
        id: "port22",
        shape: "Circle",
        offset: { x: 0.5, y: 1 },
        height: 8,
        width: 8,
        visibility: ej2_react_diagrams_1.PortVisibility.Visible,
        text: "Out - 1"
    }
];
var shape1 = { type: "Basic", shape: "Rectangle" };
var shape2 = { type: "Basic", shape: "Diamond" };
var nodes = [
    {
        id: "node1",
        offsetX: 100,
        offsetY: 100,
        annotations: [{ content: "Publisher" }],
        ports: node1Port
    },
    {
        id: "node2",
        offsetX: 300,
        offsetY: 100,
        annotations: [{ content: "Completed Book", margin: { left: 5, right: 5 } }],
        ports: node2Port
    },
    {
        id: "node3",
        offsetX: 300,
        offsetY: 200,
        annotations: [{ content: "1st Review" }],
        ports: node3Port
    },
    {
        id: "node4",
        offsetX: 300,
        offsetY: 300,
        annotations: [{ content: "Legal Terms" }],
        ports: node4Port
    },
    {
        id: "node5",
        offsetX: 300,
        offsetY: 400,
        annotations: [{ content: "2nd Review" }],
        ports: node5Port
    },
    {
        id: "node6",
        offsetX: 500,
        offsetY: 100,
        annotations: [{ content: "Board" }],
        ports: node6Port
    },
    {
        id: "node7",
        offsetX: 500,
        offsetY: 200,
        annotations: [{ content: "Approval" }],
        ports: node7Port
    }
];
var connectors = [
    {
        id: "connector1",
        sourceID: "node1",
        sourcePortID: "port2",
        targetID: "node2",
        targetPortID: "port6"
    },
    {
        id: "connector2",
        sourceID: "node1",
        sourcePortID: "port4",
        targetID: "node4",
        targetPortID: "port13"
    },
    {
        id: "connector3",
        sourceID: "node2",
        sourcePortID: "port9",
        targetID: "node3",
        targetPortID: "port11"
    },
    {
        id: "connector4",
        sourceID: "node2",
        sourcePortID: "port7",
        targetID: "node6",
        targetPortID: "port19"
    },
    {
        id: "connector5",
        sourceID: "node3",
        sourcePortID: "port10",
        targetID: "node1",
        targetPortID: "port5"
    },
    {
        id: "connector6",
        sourceID: "node3",
        sourcePortID: "port12",
        targetID: "node4",
        targetPortID: "port14"
    },
    {
        id: "connector7",
        sourceID: "node4",
        sourcePortID: "port15",
        targetID: "node5",
        targetPortID: "port17"
    },
    {
        id: "connector8",
        sourceID: "node5",
        sourcePortID: "port18",
        targetID: "node2",
        targetPortID: "port8"
    },
    {
        id: "connector9",
        sourceID: "node5",
        sourcePortID: "port16",
        targetID: "node1",
        targetPortID: "port3"
    },
    {
        id: "connector10",
        sourceID: "node6",
        sourcePortID: "port20",
        targetID: "node7",
        targetPortID: "port21"
    },
    {
        id: "connector11",
        sourceID: "node7",
        sourcePortID: "port22",
        targetID: "node1",
        targetPortID: "port1"
    }
];
var fillColor;
var strokeColor;
//Visibility collection of the Port.
var visibility = [
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Visible, text: "Visible" },
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Hidden, text: "Hidden" },
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Hover, text: "Hover" },
    { PortVisibility: ej2_react_diagrams_1.PortVisibility.Connect, text: "Connect" }
];
//Color collection of the Port.
var color = [
    { text: "White", color: "white" },
    { text: "#008080", color: "#008080" },
    { text: "#E4B123", color: "#E4B123" },
    { text: "#F05023", color: "#F05023" },
    { text: "#3CB549", color: "#3CB549" },
    { text: "#D572AD", color: "#D572AD" },
    { text: "Black", color: "black" },
    { text: "Goldenrod", color: "goldenrod" },
    { text: "Indigo", color: "indigo" },
    { text: "Chocolate", color: "chocolate" },
    { text: "DarkGoldenRod", color: "darkgoldenrod" },
    { text: "FireBrick", color: "firebrick" },
    { text: "DarkRed", color: "darkred" }
];
//Shape collection of the Port.
var shape = [
    { shape: "X", text: "X" },
    { shape: "Circle", text: "Circle" },
    { shape: "Square", text: "Square" },
    { shape: "Custom", text: "Custom" }
];
var sample_css = " \n.sb-child-row {\n  margin-top: 8px;\n}\n\n.property-panel-header {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n\n.property-section .e-remove-selection{\n  cursor: not-allowed;\n}\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n  padding-left: 10px\n}\n\n.e-remove-selection .property-section-content {\n  pointer-events: none;\n}";
var Port = /** @class */ (function (_super) {
    __extends(Port, _super);
    function Port() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Port.prototype.rendereComplete = function () {
        diagramInstance.select([diagramInstance.nodes[0]]);
    };
    Port.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, sample_css),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: 580, nodes: nodes, connectors: connectors, selectionChange: selectChange, snapSettings: { constraints: 0 }, getNodeDefaults: function (obj) {
                        //Sets the default values of nodes
                        //Initialize shape
                        if (obj.id === "node1" ||
                            obj.id === "node2" ||
                            obj.id === "node4" ||
                            obj.id === "node6") {
                            obj.shape = shape1;
                        }
                        else if (obj.id === "node3" ||
                            obj.id === "node5" ||
                            obj.id === "node7") {
                            obj.shape = shape2;
                        }
                        //sets height and width for nodes
                        obj.height = 65;
                        obj.width = 100;
                        obj.style = { fill: "#ebf8fb", strokeColor: "#baeaf5" };
                        for (var i = 0; i < obj.ports.length; i++) {
                            //sets styles for the ports
                            obj.ports[i].style = {
                                fill: "#366f8c",
                                strokeColor: "#366f8c"
                            };
                            obj.ports[i].width = 6;
                            obj.ports[i].height = 6;
                        }
                        obj.annotations[0].style = {
                            bold: true,
                            fontSize: 13,
                            color: "black"
                        };
                    }, getConnectorDefaults: function (connector) {
                        //Sets the default values of connector
                        //defines type of the connectors
                        connector.type = "Orthogonal";
                        connector.style = { strokeColor: "#8cdcef", strokeWidth: 1 };
                        connector.targetDecorator = {
                            width: 5,
                            height: 5,
                            style: { fill: "#8cdcef", strokeColor: "#8cdcef" }
                        };
                    } })),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "property-panel-content" },
                    React.createElement("div", { id: "propertypanel", className: "e-remove-selection" },
                        React.createElement("div", { className: "property-section-content" },
                            React.createElement("div", { className: "row row-header", style: { fontSize: "13px" } }, "Port Customization"),
                            React.createElement("div", { className: "row sb-child-row" },
                                React.createElement("div", { className: "col-lg-6" },
                                    React.createElement("div", { style: { paddingBottom: "8px" } }, "Visibility"),
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_2.MultiSelectComponent, { id: "portsVisiblity", enabled: true, dataSource: visibility, fields: { value: "PortVisibility", text: "text" }, mode: "CheckBox", showSelectAll: true, showDropDownIcon: true, popupHeight: "280px", popupWidth: "180px", change: portVisibilityDropOnChange, ref: function (portVisibilityref) {
                                                return (portVisibilityDrop = portVisibilityref);
                                            } }))),
                                React.createElement("div", { className: "col-lg-6" },
                                    React.createElement("div", { style: { paddingBottom: "8px" } }, "Shape"),
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "shape", enabled: true, placeholder: "Select a Shape", dataSource: shape, value: "Circle", fields: { value: "shape", text: "text" }, change: portShapeDropOnChange, ref: function (portShapeDropref) {
                                                return (portShapeDrop = portShapeDropref);
                                            } })))),
                            React.createElement("div", { className: "row sb-child-row" },
                                React.createElement("div", { className: "col-lg-6" },
                                    React.createElement("div", { style: { paddingBottom: "8px" } }, "Fill Color"),
                                    React.createElement("div", { style: { paddingBottom: "8px" } },
                                        React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "fillcolor", value: "#000", disabled: false, change: function (arg) {
                                                var port = getPort();
                                                for (var j = 0; j < port.length; j++) {
                                                    port[j].style.fill = arg.currentValue.rgba;
                                                }
                                            }, ref: function (fillcolor) { return (fillColor = fillcolor); } }))),
                                React.createElement("div", { className: "col-lg-6" },
                                    React.createElement("div", { style: { paddingBottom: "8px" } }, "Stroke Color"),
                                    React.createElement("div", { style: { paddingBottom: "8px" } },
                                        React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "strokecolor", value: "#000", disabled: false, change: function (arg) {
                                                var port = getPort();
                                                for (var j = 0; j < port.length; j++) {
                                                    port[j].style.strokeColor = arg.currentValue.rgba;
                                                }
                                            }, ref: function (strokecolor) { return (strokeColor = strokecolor); } })))),
                            React.createElement("div", { className: "row sb-child-row" },
                                React.createElement("div", { className: "col-lg-6" },
                                    React.createElement("div", { style: { paddingBottom: "8px" } }, "Stroke Width"),
                                    React.createElement("div", { style: { paddingBottom: "8px" } },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (widthRef) { return (portWidthNum = widthRef); }, id: "width", enabled: true, format: "###.##", value: 1, step: 0.5, change: function (args) {
                                                applyportstyle("strokewidth");
                                            } }))),
                                React.createElement("div", { className: "col-lg-6" },
                                    React.createElement("div", { style: { paddingBottom: "8px" } }, "Size"),
                                    React.createElement("div", { style: { paddingBottom: "8px" } },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (sizeRef) { return (portSizeNum = sizeRef); }, id: "size", enabled: true, format: "###.##", value: 6, step: 1, change: function (args) {
                                                applyportstyle("size");
                                            } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the process flow of publishing a book using connection points. Connection points are static points over the shapes that allow creating connections to the shapes. Customizing the size and appearance of the connection points is illustrated in this example.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to add connection ports to shapes. The",
                    " ",
                    React.createElement("code", null, "ports"),
                    " property of the node defines the static connection ports. The ",
                    React.createElement("code", null, "offset"),
                    ",",
                    React.createElement("code", null, "horizontalAlignment"),
                    ", ",
                    React.createElement("code", null, "verticalAlignment"),
                    " and",
                    " ",
                    React.createElement("code", null, "margin"),
                    " properties of the ports define its position."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "style"),
                    " property of the port can be used to customize its appearance. The ",
                    React.createElement("code", null, "visibility"),
                    " property can also be used to define when the connection ports should be visible."),
                React.createElement("p", null, "In this example, the appearance and visibility of the ports can be customized using the options added to the property panel."))));
    };
    return Port;
}(sample_base_1.SampleBase));
exports.Port = Port;
function selectChange(args) {
    if (args.state === "Changed") {
        var appearance = document.getElementById("propertypanel");
        var selectedElement = document.getElementsByClassName("e-remove-selection");
        if (args.newValue) {
            if (!appearance.classList.contains("e-remove-selection")) {
                appearance.classList.add("e-remove-selection");
            }
            if (args.newValue[0] instanceof ej2_react_diagrams_1.Node && selectedElement.length) {
                selectedElement[0].classList.remove("e-remove-selection");
                var port = getPort();
                portVisibilityDrop.value = [];
                if (ej2_react_diagrams_1.PortVisibility.Visible & port[0].visibility) {
                    portVisibilityDrop.value.push(ej2_react_diagrams_1.PortVisibility.Visible);
                }
                if (ej2_react_diagrams_1.PortVisibility.Hidden & port[0].visibility) {
                    portVisibilityDrop.value.push(ej2_react_diagrams_1.PortVisibility.Hidden);
                }
                if (ej2_react_diagrams_1.PortVisibility.Hover & port[0].visibility) {
                    portVisibilityDrop.value.push(ej2_react_diagrams_1.PortVisibility.Hover);
                }
                if (ej2_react_diagrams_1.PortVisibility.Connect & port[0].visibility) {
                    portVisibilityDrop.value.push(ej2_react_diagrams_1.PortVisibility.Connect);
                }
                if (portVisibilityDrop.value.length === 0) {
                    portVisibilityDrop.placeholder = 'Select Visibility';
                }
                portVisibilityDrop.dataBind();
                portFillDrop.value = port[0].style.fill;
                portFillDrop.dataBind();
                portBorderDrop.value = port[0].style.strokeColor;
                portBorderDrop.dataBind();
                portShapeDrop.value = port[0].shape;
                portShapeDrop.dataBind();
                portSizeNum.value = port[0].height;
                portSizeNum.dataBind();
                portWidthNum.value = port[0].style.strokeWidth;
                portWidthNum.dataBind();
            }
        }
    }
}
//get the port for the selected node.
function getPort() {
    var node = diagramInstance.selectedItems.nodes[0];
    var port;
    if (node) {
        port = node.ports;
    }
    return port;
}
//change the Visibility of the Port.
function portVisibilityDropOnChange(args) {
    var port = getPort();
    if (port) {
        for (var j = 0; j < port.length; j++) {
            port[j].visibility = 0;
            for (var i = 0; i < args.value.length; i++) {
                port[j].visibility += args.value[i];
            }
            diagramInstance.dataBind();
        }
    }
}
//change the shape of the Port.
function portShapeDropOnChange(args) {
    var port = getPort();
    for (var j = 0; j < port.length; j++) {
        switch (portShapeDrop.value) {
            case "X":
                port[j].shape = "X";
                break;
            case "Circle":
                port[j].shape = "Circle";
                break;
            case "Square":
                port[j].shape = "Square";
                break;
            case "Custom":
                port[j].shape = "Custom";
                port[j].pathData = "M6.805,0L13.61,10.703L0,10.703z";
                break;
        }
        diagramInstance.dataBind();
    }
}
//set the appearence of the Port.
function applyportstyle(value) {
    var port = getPort();
    for (var j = 0; j < port.length; j++) {
        if (value === "size" && portSizeNum) {
            port[j].height = portSizeNum.value;
            port[j].width = portSizeNum.value;
        }
        else if (value === "strokewidth" && portWidthNum) {
            port[j].style.strokeWidth = portWidthNum.value;
        }
    }
    diagramInstance.dataBind();
}
