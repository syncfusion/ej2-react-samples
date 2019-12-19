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
var ej2_react_diagrams_2 = require("@syncfusion/ej2-react-diagrams");
var ej2_react_diagrams_3 = require("@syncfusion/ej2-react-diagrams");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var diagramInstance;
//Initialize shape
var shape = {
    type: "Basic",
    shape: "Rectangle",
    cornerRadius: 10
};
//Initialize Diagram Nodes
var nodes = [
    { id: "node1", annotations: [{ content: "Promotion" }] },
    { id: "node2", annotations: [{ content: "Lead" }] },
    { id: "node3", annotations: [{ content: "Account" }] },
    { id: "node4", annotations: [{ content: "Information" }] },
    { id: "node5", annotations: [{ content: "Opportunity" }] },
    { id: "node6", offsetX: 540, offsetY: 290, excludeFromLayout: true }
];
//Initialize Diagram connectors
var connectors = [
    { id: "connectr", sourceID: "node1", targetID: "node2" },
    {
        id: "connectr1",
        sourceID: "node2",
        sourcePortID: "port1",
        targetID: "node3",
        targetPortID: "portIn"
    },
    {
        id: "connectr2",
        sourceID: "node2",
        sourcePortID: "port2",
        targetID: "node4",
        targetPortID: "portIn"
    },
    {
        id: "connectr3",
        sourceID: "node2",
        sourcePortID: "port3",
        targetID: "node5",
        targetPortID: "portIn"
    },
    {
        id: "connectr4",
        sourceID: "node6",
        sourcePortID: "port4",
        targetID: "node3",
        targetPortID: "portOut"
    },
    {
        id: "connectr5",
        sourceID: "node6",
        sourcePortID: "port5",
        targetID: "node4",
        targetPortID: "portOut"
    },
    {
        id: "connectr7",
        sourceID: "node6",
        sourcePortID: "port6",
        targetID: "node5",
        targetPortID: "portOut"
    }
];
var SAMPLE_CSS = ".image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 45px;\n        width: calc((100% - 13px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n\n    .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .row {\n        margin-left: 0px;\n        margin-right: 0px;\n    }\n\n    .row-header {\n        font-size: 13px;\n        font-weight: 500;\n    }\n\n    .e-checkbox-wrapper .e-label {\n        font-size: 12px;\n    }\n\n    .e-selected-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }";
var Connectors = (function (_super) {
    __extends(Connectors, _super);
    function Connectors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Connectors.prototype.lock = function () {
        var lock = document.getElementById("lock");
        for (var i = 0; i < diagramInstance.connectors.length; i++) {
            this.connector = diagramInstance.connectors[i];
            if (lock.checked) {
                this.connector.constraints &= ~(ej2_react_diagrams_1.ConnectorConstraints.DragSourceEnd |
                    ej2_react_diagrams_1.ConnectorConstraints.DragTargetEnd |
                    ej2_react_diagrams_1.ConnectorConstraints.DragSegmentThumb);
                this.connector.constraints |= ej2_react_diagrams_1.ConnectorConstraints.ReadOnly;
            }
            else {
                this.connector.constraints |=
                    ej2_react_diagrams_1.ConnectorConstraints.Default & ~ej2_react_diagrams_1.ConnectorConstraints.ReadOnly;
            }
            diagramInstance.dataBind();
        }
    };
    Connectors.prototype.rendereComplete = function () {
        document.getElementById("appearance").onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (target.className === "image-pattern-style") {
                switch (target.id) {
                    case "normalconnector1":
                        defaultConnectorStyle("Straight", target);
                        break;
                    case "normalconnector2":
                        defaultConnectorStyle("Orthogonal", target);
                        break;
                    case "normalconnector3":
                        defaultConnectorStyle("Bezier", target);
                        break;
                    case "connector1withstroke":
                        applyConnectorStyle(false, false, false, "Straight", target);
                        break;
                    case "connector2withstroke":
                        applyConnectorStyle(false, false, false, "Orthogonal", target);
                        break;
                    case "connector3withstroke":
                        applyConnectorStyle(false, false, false, "Bezier", target);
                        break;
                    case "connector1withdasharray":
                        applyConnectorStyle(true, false, false, "Straight", target);
                        break;
                    case "connector2withdasharray":
                        applyConnectorStyle(true, false, false, "Orthogonal", target);
                        break;
                    case "connector3withdasharray":
                        applyConnectorStyle(true, false, false, "Bezier", target);
                        break;
                    case "cornerradious":
                        applyConnectorStyle(false, false, true, "Orthogonal", target);
                        break;
                    case "sourcedecorator":
                        applyConnectorStyle(false, true, false, "Straight", target);
                        break;
                    case "sourcedecoratorwithdasharray":
                        applyConnectorStyle(true, true, false, "Straight", target);
                        break;
                }
            }
        };
    };
    Connectors.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane diagram-control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-9 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%", background: "white" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: 580, nodes: nodes, connectors: connectors, selectedItems: {
                            constraints: ej2_react_diagrams_1.SelectorConstraints.ConnectorSourceThumb |
                                ej2_react_diagrams_1.SelectorConstraints.ConnectorTargetThumb
                        }, 
                        //Configrues hierarchical tree layout
                        layout: {
                            type: "HierarchicalTree",
                            orientation: "LeftToRight",
                            verticalSpacing: 75,
                            margin: { left: 30, right: 0, top: 0, bottom: 0 }
                        }, snapSettings: { constraints: 0 }, 
                        //Sets the default values of nodes
                        getNodeDefaults: function (obj) {
                            if (obj.id !== "node1") {
                                //Set ports
                                obj.ports = getPorts(obj);
                            }
                            if (obj.id !== "node6") {
                                obj.shape = shape;
                                obj.width = 80;
                                obj.style.strokeWidth = 2;
                                obj.style.strokeColor = "#6F409F";
                                obj.height = 35;
                            }
                        }, 
                        //Sets the default values of connector
                        getConnectorDefaults: function (obj) {
                            obj.type = "Bezier";
                            obj.style.strokeColor = "#6f409f";
                            obj.style.strokeWidth = 2;
                            obj.targetDecorator = {
                                style: {
                                    strokeColor: "#6f409f",
                                    fill: "#6f409f"
                                }
                            };
                        }, 
                        //Customize the content of the node
                        setNodeTemplate: function (obj) {
                            if (obj.id === "node6") {
                                return setNodeTemplate();
                            }
                            return null;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.HierarchicalTree] })))),
            React.createElement("div", { className: "col-lg-3 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                    React.createElement("div", { className: "row row-header" }, "Appearance"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "normalconnector1", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_1.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "normalconnector2", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_2.png')",
                                margin: "0px 3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "normalconnector3", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_3.png')",
                                marginLeft: "3px"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "connector1withstroke", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_4.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "connector2withstroke", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_5.png')",
                                margin: "0px 3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "connector3withstroke", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_6.png')",
                                marginLeft: "3px"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "connector1withdasharray", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_7.png')",
                                margin: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "connector2withdasharray", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_8.png')",
                                marginRight: "0px 3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "connector3withdasharray", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_9.png')",
                                marginLeft: "3px"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "cornerradious", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_10.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "sourcedecorator", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_11.png')",
                                margin: "0px 3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "sourcedecoratorwithdasharray", style: {
                                backgroundImage: "url('src/diagram/Images/connector/Connectors_12.png')",
                                marginLeft: "3px"
                            } }))),
                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: "Lock", id: "lock", change: this.lock.bind(this) })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the data flow in a marketing process using predefined shapes and connectors. Different types of connectors and decorators are used to customize the appearance, path, and direction of the data flow.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to add connectors to connect the shapes and how to customize the appearance of the connectors. You can use the ",
                    React.createElement("code", null, "style"),
                    " property of the connector to customize its stroke style. You can use the",
                    React.createElement("code", null, "cornerRadius"),
                    " property to add connectors with rounded corners."),
                React.createElement("p", null, "To change the appearance, click different styles in the property panel."),
                React.createElement("p", null,
                    "Additionally, you can see how to lock the connectors to disable editing. The",
                    React.createElement("code", null, "constraints"),
                    " property of connector enables/disables editing. In this example, the shapes are automatically arranged using hierarchical tree layout."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Diagram component's features are segregated into individual feature-wise modules. To automatically arrange the shapes, we need to Inject ",
                    React.createElement("code", null, "HierarchicalTree"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return Connectors;
}(sample_base_1.SampleBase));
exports.Connectors = Connectors;
//Customize the content of the node
function setNodeTemplate() {
    var canvas = new ej2_react_diagrams_2.StackPanel();
    canvas.children = [];
    canvas.id = ej2_react_diagrams_1.randomId();
    canvas.style.strokeWidth = 0;
    canvas.style.fill = "#e6e0eb";
    canvas.children.push(getTextElement("Events", "#a6a1e0"));
    canvas.children.push(getTextElement("Emails", "#db8ec9"));
    canvas.children.push(getTextElement("Calls", "#db8ec9"));
    canvas.children.push(getTextElement("Smart Contents", "#db8ec9"));
    return canvas;
}
//creation of the TextElement.
function getTextElement(text, color) {
    var textElement = new ej2_react_diagrams_1.TextElement();
    textElement.id = ej2_react_diagrams_1.randomId();
    textElement.width = 80;
    textElement.height = 35;
    textElement.content = text;
    textElement.style.fill = "#6f409f";
    textElement.style.color = "white";
    textElement.style.strokeColor = "#6f409f";
    textElement.cornerRadius = 5;
    textElement.margin = { top: 10, bottom: 10, left: 10, right: 10 };
    textElement.relativeMode = "Object";
    return textElement;
}
//creation of Port for Node.
function getPorts(obj) {
    if (obj.id === "node2") {
        var node2Ports = [
            {
                id: "port1",
                offset: { x: 1, y: 0.25 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            },
            {
                id: "port2",
                offset: { x: 1, y: 0.5 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            },
            {
                id: "port3",
                offset: { x: 1, y: 0.75 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            }
        ];
        return node2Ports;
    }
    else if (obj.id === "node6") {
        var node6Ports = [
            {
                id: "port4",
                offset: { x: 0, y: 0.46 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            },
            {
                id: "port5",
                offset: { x: 0, y: 0.5 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            },
            {
                id: "port6",
                offset: { x: 0, y: 0.54 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            }
        ];
        return node6Ports;
    }
    else {
        var ports = [
            {
                id: "portIn",
                offset: { x: 0, y: 0.5 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            },
            {
                id: "portOut",
                offset: { x: 1, y: 0.5 },
                visibility: ej2_react_diagrams_3.PortVisibility.Hidden
            }
        ];
        return ports;
    }
}
//ConnectorStyle customization
function applyConnectorStyle(dashedLine, sourceDec, isRounded, type, target) {
    for (var i = 0; i < diagramInstance.connectors.length; i++) {
        diagramInstance.connectors[i].style.strokeWidth = 2;
        diagramInstance.connectors[i].type = type;
        if (isRounded) {
            diagramInstance.connectors[i].cornerRadius = 5;
        }
        if (sourceDec) {
            diagramInstance.connectors[i].sourceDecorator = {
                style: {
                    strokeColor: "#6f409f",
                    fill: "#6f409f",
                    strokeWidth: 2
                },
                shape: "Circle"
            };
        }
        else {
            diagramInstance.connectors[i].sourceDecorator = { shape: "None" };
        }
        if (dashedLine) {
            diagramInstance.connectors[i].style.strokeDashArray = "5,5";
        }
        else {
            diagramInstance.connectors[i].style.strokeDashArray = "";
        }
        diagramInstance.connectors[i].targetDecorator = {
            style: {
                strokeColor: "#6f409f",
                fill: "#6f409f",
                strokeWidth: 2
            },
            shape: "Arrow"
        };
        diagramInstance.dataBind();
    }
    // custom code start
    target.classList.add("e-selected-style");
    // custom code end
}
//ConnectorStyle customization
function defaultConnectorStyle(type, target) {
    for (var i = 0; i < diagramInstance.connectors.length; i++) {
        diagramInstance.connectors[i].style.strokeWidth = 1;
        diagramInstance.connectors[i].type = type;
        diagramInstance.connectors[i].sourceDecorator = { shape: "None" };
        diagramInstance.connectors[i].style.strokeDashArray = "";
        diagramInstance.connectors[i].targetDecorator = {
            style: {
                strokeColor: "#6f409f",
                fill: "#6f409f",
                strokeWidth: 1
            },
            shape: "Arrow"
        };
        diagramInstance.dataBind();
    }
    // custom code start
    target.classList.add("e-selected-style");
    // custom code end
}
