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
var point_1 = require("@syncfusion/ej2-diagrams/src/diagram/primitives/point");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
//Initializes the nodes for the diagram
var sdlc = [
    { id: "sdlc", text: "SDLC" },
    { id: "analysis", text: "Analysis" },
    { id: "design", text: "Design" },
    { id: "implement", text: "Implement" },
    { id: "deploy", text: "Deploy" },
    { id: "support", text: "Support" }
];
//arranges the nodes in a circular path
var count = 5;
var space = 80;
var radius = (count * 100 + space * count) / (2 * Math.PI);
sdlc[0].offsetX = 300;
sdlc[0].offsetY = 300;
var delta = 360 / 5;
var angle = 270;
for (var i = 1; i < 6; i++) {
    var offset = point_1.Point.transform({ x: 300, y: 300 }, angle, radius);
    sdlc[i].offsetX = offset.x;
    sdlc[i].offsetY = offset.y;
    angle += delta;
}
//Initializes the connector for the diagram
var connections = [];
for (var i = 1; i < 6; i++) {
    connections.push({ sourceID: sdlc[i].id, targetID: sdlc[(i % 5) + 1].id });
}
var SAMPLE_CSS = ".image-pattern-style {\n        background-color: white;\n        background-size: contain;\n        background-repeat: no-repeat;\n        height: 75px;\n        width: calc((100% - 12px) / 3);\n        cursor: pointer;\n        border: 1px solid #D5D5D5;\n        background-position: center;\n        float: left;\n    }\n\n    .image-pattern-style:hover {\n        border-color: gray;\n        border-width: 2px;\n    }\n\n    .row {\n        margin-left: 0px;\n        margin-right: 0px;\n    }\n\n    .row-header {\n        font-size: 13px;\n        font-weight: 500;\n    }\n\n    .e-selected-style {\n        border-color: #006CE6;\n        border-width: 2px;\n    }\n\n    .e-checkbox-wrapper .e-label {\n        font-size: 12px;\n    }";
var diagramInstance;
var node;
var GettingStartedNodes = (function (_super) {
    __extends(GettingStartedNodes, _super);
    function GettingStartedNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GettingStartedNodes.prototype.rendereComplete = function () {
        //Click event for Appearance of the Property Panel
        document.getElementById("appearance").onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName("e-selected-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-style");
            }
            if (target.className === "image-pattern-style") {
                for (var i = 0; i < diagramInstance.nodes.length; i++) {
                    node = diagramInstance.nodes[i];
                    switch (target.id) {
                        case "preview0":
                            applyStyle(node, 0, undefined, ~ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, undefined, target);
                            break;
                        case "preview1":
                            applyStyle(node, 2, undefined, ~ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, undefined, target);
                            break;
                        case "preview2":
                            applyStyle(node, 2, "5 5", ~ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, undefined, target);
                            break;
                        case "preview3":
                            applyStyle(node, 2, "5 5", ~ej2_react_diagrams_1.NodeConstraints.Shadow, "Radial", undefined, target);
                            break;
                        case "preview4":
                            var shadow = {
                                angle: 45,
                                distance: 15,
                                opacity: 0.3,
                                color: "grey"
                            };
                            applyStyle(node, 2, "5 5", ej2_react_diagrams_1.NodeConstraints.Shadow, undefined, shadow, target);
                            break;
                    }
                }
            }
        };
    };
    GettingStartedNodes.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "645px", nodes: sdlc, connectors: connections, getNodeDefaults: function (node) {
                            //Sets the default values of a node
                            var obj = {};
                            obj.width = 100;
                            obj.height = 100;
                            obj.shape = { shape: "Ellipse" };
                            obj.style = { fill: "#37909A", strokeColor: "#024249" };
                            obj.annotations = [
                                {
                                    content: node.text,
                                    margin: { left: 10, right: 10 },
                                    style: {
                                        color: "white",
                                        fill: "none",
                                        strokeColor: "none",
                                        bold: true
                                    }
                                }
                            ];
                            return obj;
                        }, getConnectorDefaults: function (obj) {
                            //Sets the default values of a Connector
                            obj.targetDecorator.style = {
                                fill: "#024249",
                                strokeColor: "#024249"
                            };
                            return { style: { strokeColor: "#024249", strokeWidth: 2 } };
                        }, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo] })))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                    React.createElement("div", { className: "row row-header", style: { paddingTop: "8px" } }, "Appearance"),
                    React.createElement("div", { className: "row", style: { paddingTop: "3px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "preview0", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_1.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "preview1", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_2.png')",
                                marginRight: "0px 3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "preview2", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_3.png')",
                                margin: "0px 3px"
                            } })),
                    React.createElement("div", { className: "row", style: { paddingTop: "3px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "preview3", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_4.png')",
                                marginRight: "3px"
                            } }),
                        React.createElement("div", { className: "image-pattern-style", id: "preview4", style: {
                                backgroundImage: "url('src/diagram/Images/node/Nodes_5.png')",
                                margin: "3px"
                            } }))),
                React.createElement("div", { className: "row property-panel-content", style: { paddingTop: "10px" } },
                    React.createElement("div", { className: "row row-header" }, "Behavior"),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: "Aspect ratio", id: "aspectRatio", change: changed })),
                    React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: "Lock", id: "lock", change: changed })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the different stages of a software development life cycle using a circular flow diagram. Customizing the appearance of the nodes is illustrated in this example.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to add nodes to a diagram control and how to customize the appearance of the nodes. The",
                    React.createElement("code", null, "style"),
                    " property of the node can be used to customize the appearance of the nodes."),
                React.createElement("p", null, "To change the appearance, click different styles in the property panel."),
                React.createElement("p", null,
                    "Here, you can see how to lock nodes to disable editing and how to enable proportional resizing. The",
                    React.createElement("code", null, "constraints"),
                    " property of the node allows you to enable/disable editing and proportional resizing."),
                React.createElement("br", null))));
    };
    return GettingStartedNodes;
}(sample_base_1.SampleBase));
exports.GettingStartedNodes = GettingStartedNodes;
//Set customStyle for Node.
function applyStyle(//it is in dedicated line here.
    node, width, array, con, type, sh, target) {
    node.style.fill = "#37909A";
    node.style.strokeWidth = width;
    node.style.strokeColor = "#024249";
    node.style.strokeDashArray = array;
    if (!type) {
        node.style.gradient.type = "None";
    }
    else {
        var gradient = void 0;
        gradient = {
            cx: 50,
            cy: 50,
            fx: 50,
            fy: 50,
            stops: [
                { color: "#00555b", offset: 0 },
                { color: "#37909A", offset: 90 }
            ],
            type: "Radial"
        };
        node.style.gradient = gradient;
    }
    if (con & ej2_react_diagrams_1.NodeConstraints.Shadow) {
        node.shadow = { angle: 45, distance: 15, opacity: 0.3, color: "grey" };
        node.constraints |= con;
    }
    else {
        node.constraints &= con;
    }
    diagramInstance.dataBind();
    // custom code start
    target.classList.add("e-selected-style");
    // custom code end
}
//Enable or disable the Constraints for Node.
function changed(args) {
    var element = document.getElementById("aspectRatio");
    for (var i = 0; i < diagramInstance.nodes.length; i++) {
        node = diagramInstance.nodes[i];
        if (args.event.target.id === "lock") {
            if (args.checked) {
                node.constraints &= ~(ej2_react_diagrams_1.NodeConstraints.Resize |
                    ej2_react_diagrams_1.NodeConstraints.Rotate |
                    ej2_react_diagrams_1.NodeConstraints.Drag);
                node.constraints |= ej2_react_diagrams_1.NodeConstraints.ReadOnly;
            }
            else {
                node.constraints |= ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.ReadOnly;
            }
        }
        else {
            if (element.checked) {
                node.constraints |= ej2_react_diagrams_1.NodeConstraints.AspectRatio;
            }
            else {
                node.constraints &= ~ej2_react_diagrams_1.NodeConstraints.AspectRatio;
            }
        }
        diagramInstance.dataBind();
    }
}
