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
var items = new ej2_data_1.DataManager(diagram_data_1.mindMap, new ej2_data_1.Query().take(7));
var diagramInstance;
var MindMap = (function (_super) {
    __extends(MindMap, _super);
    function MindMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MindMap.prototype.rendereComplete = function () {
        diagramInstance.fitToPage();
    };
    MindMap.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { ref: function (diagram) { return (diagramInstance = diagram); }, id: "diagram", style: { width: "74%", height: "550px", float: "left" }, width: "100%", height: "550px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, tool: ej2_react_diagrams_1.DiagramTools.SingleSelect, layout: {
                            type: "MindMap",
                            getBranch: function (node, nodes) {
                                return node.data.branch;
                            },
                            horizontalSpacing: 50
                        }, 
                        //Selectionchange event for Node and connector
                        selectionChange: function (arg) {
                            if (arg.state === "Changing") {
                                if (arg.newValue[0] instanceof ej2_react_diagrams_1.Node) {
                                    for (var _i = 0, _a = diagramInstance.selectedItems
                                        .userHandles; _i < _a.length; _i++) {
                                        var handle_1 = _a[_i];
                                        handle_1.visible = true;
                                    }
                                    if (arg.newValue[0].data
                                        .branch === "Left" ||
                                        arg.newValue[0].data
                                            .branch === "subLeft") {
                                        hideUserHandle("leftHandle");
                                        changeUserHandlePosition("leftHandle");
                                    }
                                    else if (arg.newValue[0].data
                                        .branch === "Right" ||
                                        arg.newValue[0].data
                                            .branch === "subRight") {
                                        hideUserHandle("rightHandle");
                                        changeUserHandlePosition("rightHandle");
                                    }
                                    else if (arg.newValue[0].data
                                        .branch === "Root") {
                                        hideUserHandle("delete");
                                    }
                                }
                                else {
                                    hideUserHandle("leftHandle");
                                    hideUserHandle("rightHandle");
                                    hideUserHandle("delete");
                                }
                            }
                        }, selectedItems: {
                            constraints: ej2_react_diagrams_1.SelectorConstraints.UserHandle,
                            userHandles: handle
                        }, dataSourceSettings: {
                            id: "id",
                            parentId: "parentId",
                            dataSource: items,
                            root: String(1)
                        }, 
                        //sets node default value
                        getNodeDefaults: function (obj) {
                            obj.constraints =
                                ej2_react_diagrams_1.NodeConstraints.Default & ~ej2_react_diagrams_1.NodeConstraints.Drag;
                            if (obj.data.branch === "Left" ||
                                obj.data.branch === "Right" ||
                                obj.data.branch === "Root") {
                                obj.shape = { type: "Basic", shape: "Ellipse" };
                                obj.borderColor =
                                    "black"; /* tslint:disable:no-string-literal */
                                obj.style = {
                                    fill: obj.data.branch === "Root"
                                        ? "#E74C3C"
                                        : "#F39C12",
                                    strokeColor: "none",
                                    strokeWidth: 2
                                };
                                obj.annotations = [
                                    {
                                        content: obj.data.Label,
                                        margin: { left: 10, right: 10, top: 10, bottom: 10 },
                                        style: { color: "white" }
                                    }
                                ];
                                var port = getPort();
                                for (var i = 0; i < port.length; i++) {
                                    obj.ports.push(new ej2_react_diagrams_1.PointPort(obj, "ports", port[i], true));
                                }
                            }
                            else {
                                var color = void 0; /* tslint:disable:no-string-literal */
                                if (obj.data.branch === "Right" ||
                                    obj.data.branch === "subRight") {
                                    color = "#8E44AD";
                                }
                                else {
                                    color = "#3498DB";
                                }
                                obj.shape = { type: "Basic", shape: "Rectangle" };
                                obj.style = { fill: color, strokeWidth: 0 };
                                obj.minWidth = 100;
                                obj.height = 4;
                                var port = getPort();
                                for (var i = 0; i < port.length; i++) {
                                    obj.ports.push(new ej2_react_diagrams_1.PointPort(obj, "ports", port[i], true));
                                }
                                obj.annotations = [
                                    {
                                        content: obj.data.Label,
                                        offset: { x: 0.5, y: 0 },
                                        verticalAlignment: "Bottom"
                                    }
                                ];
                                obj.shape.margin = {
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0
                                };
                            }
                            return obj;
                        }, 
                        //sets connector default value
                        getConnectorDefaults: function (connector, diagram) {
                            connector.type = "Bezier";
                            connector.targetDecorator = { shape: "None" };
                            var sourceNode = diagram.getObject(connector.sourceID);
                            var targetNode = diagram.getObject(connector.targetID);
                            if (targetNode.data.branch === "Right" ||
                                targetNode.data.branch === "subRight") {
                                connector.sourcePortID = sourceNode.ports[0].id;
                                connector.targetPortID = targetNode.ports[1].id;
                                connector.style = { strokeWidth: 5, strokeColor: "#8E44AD" };
                            }
                            else if (targetNode.data.branch === "Left" ||
                                targetNode.data.branch === "subLeft") {
                                connector.sourcePortID = sourceNode.ports[1].id;
                                connector.targetPortID = targetNode.ports[0].id;
                                connector.style = { strokeWidth: 5, strokeColor: "#3498DB" };
                            }
                            connector.constraints &= ~ej2_react_diagrams_1.ConnectorConstraints.Select;
                            return connector;
                        }, getCustomTool: getTool },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.DataBinding, ej2_react_diagrams_1.MindMap, ej2_react_diagrams_1.HierarchicalTree] })),
                    React.createElement("input", { id: "palette", style: { visibility: "hidden", position: "absolute" }, type: "color", name: "favcolor", value: "#000000" }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the concept of creativity using mind map layout algorithm. User handles are used to extend the mind map interactively.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to generate a mind map from an external data source. The ",
                    React.createElement("code", null, "type"),
                    " property of the ",
                    React.createElement("code", null, "layout"),
                    " ",
                    "can be used to enable the mind map layout algorithm. The",
                    React.createElement("code", null, "getBranch"),
                    " property can also be used to define the branches at both left and right sides."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "The diagram component\u2019s features are segregated into individual feature-wise modules. To generate diagrams from an external data source, inject ",
                    React.createElement("code", null, "DataBinding"),
                    " module into",
                    " ",
                    React.createElement("code", null, "services"),
                    ". To automatically generate a mind map, inject",
                    React.createElement("code", null, "Mindmap"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null))));
    };
    return MindMap;
}(sample_base_1.SampleBase));
exports.MindMap = MindMap;
//creation of the Ports
function getPort() {
    var port = [
        {
            id: "port1",
            offset: { x: 0, y: 0.5 },
            visibility: ej2_react_diagrams_1.PortVisibility.Hidden,
            style: { fill: "black" }
        },
        {
            id: "port2",
            offset: { x: 1, y: 0.5 },
            visibility: ej2_react_diagrams_1.PortVisibility.Hidden,
            style: { fill: "black" }
        }
    ];
    return port;
}
function addNode() {
    var obj = {};
    obj.id = ej2_react_diagrams_1.randomId();
    obj.data = {};
    obj.data.Label = "Node";
    return obj;
}
function addConnector(source, target) {
    var connector = {};
    connector.id = ej2_react_diagrams_1.randomId();
    connector.sourceID = source.id;
    connector.targetID = target.id;
    return connector;
}
//Tool for Userhandles.
function getTool(action) {
    var tool;
    if (action === "leftHandle") {
        tool = new LeftExtendTool(diagramInstance.commandHandler);
    }
    else if (action === "rightHandle") {
        tool = new RightExtendTool(diagramInstance.commandHandler);
    }
    else if (action === "delete") {
        tool = new DeleteClick(diagramInstance.commandHandler);
    }
    return tool;
}
var LeftExtendTool = (function (_super) {
    __extends(LeftExtendTool, _super);
    function LeftExtendTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftExtendTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
    };
    LeftExtendTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof ej2_react_diagrams_1.Node) {
                    var node = addNode();
                    if (selectedObject[0].data.branch === "Root") {
                        node.data.branch = "Right";
                    }
                    else if (selectedObject[0].data.branch === "Right" ||
                        selectedObject[0].data.branch === "subRight") {
                        node.data.branch = "subRight";
                    }
                    var connector = addConnector(selectedObject[0], node);
                    diagramInstance.clearSelection();
                    var nd = diagramInstance.add(node);
                    diagramInstance.add(connector);
                    diagramInstance.doLayout();
                    diagramInstance.bringIntoView(nd.wrapper.bounds);
                    diagramInstance.startTextEdit(nd);
                }
            }
        }
    };
    return LeftExtendTool;
}(ej2_react_diagrams_1.ToolBase));
var RightExtendTool = (function (_super) {
    __extends(RightExtendTool, _super);
    function RightExtendTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //mouseDown event
    RightExtendTool.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
    };
    //mouseDown event
    RightExtendTool.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof ej2_react_diagrams_1.Node) {
                    var node = addNode();
                    if (selectedObject[0].data.branch === "Root") {
                        node.data.branch = "Left";
                    }
                    else if (selectedObject[0].data.branch === "Left" ||
                        selectedObject[0].data.branch === "subLeft") {
                        node.data.branch = "subLeft";
                    }
                    var connector = addConnector(selectedObject[0], node);
                    diagramInstance.clearSelection();
                    var nd = diagramInstance.add(node);
                    diagramInstance.add(connector);
                    diagramInstance.doLayout();
                    diagramInstance.bringIntoView(nd.wrapper.bounds);
                    diagramInstance.startTextEdit(nd);
                }
            }
        }
    };
    return RightExtendTool;
}(ej2_react_diagrams_1.ToolBase));
var DeleteClick = (function (_super) {
    __extends(DeleteClick, _super);
    function DeleteClick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //mouseDown event
    DeleteClick.prototype.mouseDown = function (args) {
        _super.prototype.mouseDown.call(this, args);
        this.inAction = true;
    };
    //mouseup event
    DeleteClick.prototype.mouseUp = function (args) {
        if (this.inAction) {
            var selectedObject = this.commandHandler.getSelectedObject();
            if (selectedObject[0]) {
                if (selectedObject[0] instanceof ej2_react_diagrams_1.Node) {
                    var node = selectedObject[0];
                    this.removeSubChild(node);
                }
                diagramInstance.doLayout();
            }
        }
    };
    //Remove the subchild Elements
    DeleteClick.prototype.removeSubChild = function (node) {
        for (var i = node.outEdges.length - 1; i >= 0; i--) {
            var connector = diagramInstance.getObject(node.outEdges[i]);
            var childNode = diagramInstance.getObject(connector.targetID);
            if (childNode.outEdges.length > 0) {
                this.removeSubChild(childNode);
            }
            else {
                diagramInstance.remove(childNode);
            }
        }
        diagramInstance.remove(node);
    };
    return DeleteClick;
}(ej2_react_diagrams_1.ToolBase));
//hide the require userhandle.
function hideUserHandle(name) {
    for (var _i = 0, _a = diagramInstance.selectedItems.userHandles; _i < _a.length; _i++) {
        var handle_2 = _a[_i];
        if (handle_2.name === name) {
            handle_2.visible = false;
        }
    }
}
var leftarrow = "M11.924,6.202 L4.633,6.202 L4.633,9.266 L0,4.633 L4.632,0 L4.632,3.551 L11.923,3.551 L11.923,6.202Z";
var rightarrow = "M0,3.063 L7.292,3.063 L7.292,0 L11.924,4.633 L7.292,9.266 L7.292,5.714 L0.001,5.714 L0.001,3.063Z";
var deleteicon = "M 7.04 22.13 L 92.95 22.13 L 92.95 88.8 C 92.95 91.92 91.55 94.58 88.76" +
    "96.74 C 85.97 98.91 82.55 100 78.52 100 L 21.48 100 C 17.45 100 14.03 98.91 11.24 96.74 C 8.45 94.58 7.04" +
    "91.92 7.04 88.8 z M 32.22 0 L 67.78 0 L 75.17 5.47 L 100 5.47 L 100 16.67 L 0 16.67 L 0 5.47 L 24.83 5.47 z";
var leftuserhandle = setUserHandle(
//it is in dedicated line here.
"leftHandle", leftarrow, "Left", 1, { top: 0, bottom: 0, left: 0, right: 10 }, "Left", "Top");
var rightuserhandle = setUserHandle(
//it is in dedicated line here.
"rightHandle", rightarrow, "Right", 1, { top: 0, bottom: 0, left: 10, right: 0 }, "Right", "Top");
var deleteuserhandle = setUserHandle(
//it is in dedicated line here.
"delete", deleteicon, "Top", 0.5, { top: 0, bottom: 10, left: 0, right: 0 }, "Center", "Center");
var handle = [
    leftuserhandle,
    rightuserhandle,
    deleteuserhandle
];
//set and creation of the Userhandle.
function setUserHandle(//it is in dedicated line here.
    name, pathData, side, offset, margin, halignment, valignment) {
    var userhandle = {
        name: name,
        pathData: pathData,
        backgroundColor: "black",
        pathColor: "white",
        side: side,
        offset: offset,
        margin: margin,
        horizontalAlignment: halignment,
        verticalAlignment: valignment
    };
    return userhandle;
}
//Change the Position of the UserHandle.
function changeUserHandlePosition(change) {
    for (var _i = 0, _a = diagramInstance.selectedItems.userHandles; _i < _a.length; _i++) {
        var handle_3 = _a[_i];
        if (handle_3.name === "delete" && change === "leftHandle") {
            applyHandle(handle_3, "Left", 1, { top: 0, bottom: 0, left: 0, right: 10 }, "Left", "Top");
        }
        else if (handle_3.name === "delete" && change === "rightHandle") {
            applyHandle(handle_3, "Right", 1, { top: 0, bottom: 0, left: 10, right: 0 }, "Right", "Top");
        }
    }
}
//set the value for UserHandle element.
function applyHandle(//it is in dedicated line here.
    handle, side, offset, margin, halignment, valignment) {
    handle.side = side;
    handle.offset = offset;
    handle.margin = margin;
    handle.horizontalAlignment = halignment;
    handle.verticalAlignment = valignment;
}
