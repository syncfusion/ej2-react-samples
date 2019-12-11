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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var SAMPLE_CSS = "#historyPropertySection .row {\n            margin-left: 0px;\n            margin-right: 0px;\n        }\n        #historyControlSection.content-wrapper {\n            border: 1px solid #D7D7D7;\n        }\n\n        #historyPropertySection .listbox {\n            width: 100%;\n            height: 50%;\n        }\n\n        #historyPropertySection .property-panel-content div:not(.heading) {\n         padding: 0px;\n        }\n\n        #historyPropertySection .heading {\n            color: #807f7f;\n            font-size: 15px;\n            height: 50px;\n            width: 100%;\n            border-bottom: 1px solid #d9dedd;\n            padding: 10px;\n        }";
var nodes = [
    {
        id: 'node1', offsetX: 400, offsetY: 30, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
        shape: { type: 'Flow', shape: 'Terminator' },
        annotations: [{ id: 'label1', content: 'Start' }],
    },
    {
        id: 'node2', offsetX: 400, offsetY: 100, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
        shape: { type: 'Flow', shape: 'Process' }, annotations: [{ id: 'label1', content: 'Design' }],
        ports: [{ id: 'designPort', offset: { x: 0, y: 0.5 } }]
    },
    {
        id: 'node3', offsetX: 400, offsetY: 180, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
        annotations: [{ id: 'label1', content: 'Coding' }],
        shape: { type: 'Flow', shape: 'Process' }, ports: [{ id: 'codingPort', offset: { x: 0, y: 0.5 } }]
    },
    {
        id: 'node4', offsetX: 400, offsetY: 260, style: { fill: '#DCDCDC', strokeColor: '#DCDCDC' },
        annotations: [{ id: 'label1', content: 'Testing' }], shape: { type: 'Flow', shape: 'Process' }
    },
    {
        id: 'node5', offsetX: 400, offsetY: 340, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, width: 80, height: 60,
        annotations: [{ id: 'label1', content: 'Errors?' }], shape: { type: 'Flow', shape: 'Decision' }
    },
    {
        id: 'node6', offsetX: 400, offsetY: 430, style: { fill: '#FFB2B2', strokeColor: '#FFB2B2' }, width: 70, height: 40,
        annotations: [{ id: 'label1', content: 'End' }], shape: { type: 'Flow', shape: 'Terminator' }
    },
    {
        id: 'node7', width: 100, offsetX: 220, offsetY: 180, style: { fill: '#A2D8B0', strokeColor: '#A2D8B0' }, height: 60,
        annotations: [{ id: 'label1', content: 'Design Error?' }], shape: { type: 'Flow', shape: 'Decision' },
        ports: [
            { id: 'porterror', offset: { x: 0.5, y: 0 } },
            { id: 'portcoding', offset: { x: 1, y: 0.5 } },
            { id: 'portdesign', offset: { x: 0.5, y: 1 } }
        ]
    }
];
var connectors = [
    { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
    { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
    { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
    { id: 'connector4', sourceID: 'node4', targetID: 'node5' },
    {
        id: 'connector5', sourceID: 'node5', targetID: 'node6',
        annotations: [{ content: 'No', style: { fill: 'white' } }]
    },
    {
        id: 'connector6', sourceID: 'node5', targetID: 'node7', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 150, direction: 'Left' }],
        annotations: [{ content: 'Yes', style: { fill: 'white' } }]
    },
    {
        id: 'connector7', sourceID: 'node7', targetID: 'node3', sourcePortID: 'portcoding',
        targetPortID: 'codingPort', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 10, direction: 'left' }],
        annotations: [{ content: 'No', style: { fill: 'white' } }]
    },
    {
        id: 'connector8', sourceID: 'node7', targetID: 'node2', sourcePortID: 'porterror',
        targetPortID: 'designPort', type: 'Orthogonal',
        annotations: [{ content: 'Yes', style: { fill: 'white' } }]
    }
];
var diagramInstance;
var clearHistory;
var startActionInstance;
var endGroupAction;
var redoListInstance;
var undoListInstance;
var undoInstance;
var redoInstance;
var HistoryManager = /** @class */ (function (_super) {
    __extends(HistoryManager, _super);
    function HistoryManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HistoryManager.prototype.rendereComplete = function () {
        diagramInstance.fitToPage({ mode: 'Width' });
        document.getElementById("undo").onclick = function (args) {
            diagramInstance.undo();
        };
        document.getElementById("redo").onclick = function (args) {
            diagramInstance.redo();
        };
        document.getElementById("StackLimit").onclick = function (args) {
            diagramInstance.setStackLimit(args.value);
        };
        document.getElementById("startGroupAction").onclick = function (args) {
            startAction();
        };
        document.getElementById("clearHistory").onclick = function (args) {
            diagramInstance.clearHistory();
            getValue();
        };
    };
    HistoryManager.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane1" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { id: "historyControlSection", className: "content-wrapper", style: { width: "100%" } },
                    React.createElement("style", null, SAMPLE_CSS),
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "500px", height: "580px", snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, nodes: nodes, connectors: connectors, getConnectorDefaults: getConnectorDefaults, historyChange: function (arg) {
                            getValue();
                        }, getNodeDefaults: function (obj) {
                            obj.annotations[0].style.color = '#717171';
                            return obj;
                        } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo] })))),
            React.createElement("div", { id: "historyPropertySection", className: "col-lg-4 property-section", style: { paddingRight: "0px" } },
                React.createElement("div", { className: "property-panel-header" }, "History manager settings"),
                React.createElement("div", { className: "row property-panel-content", id: "appearance" },
                    React.createElement("div", { className: "row property-panel-content" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "listbox", style: { height: "100%", border: "1px solid #e0e0e0" } },
                                React.createElement("div", { className: "heading", style: { height: "40px" } },
                                    React.createElement("span", null, "Undo Stack"),
                                    React.createElement("div", { style: { float: "right", marginTop: "-5px" } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "undo", style: { width: "100%" }, disabled: true, ref: function (undoList) { return (undoInstance = undoList); } }, "Undo"))),
                                React.createElement("div", { id: 'undoList' }),
                                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'undoList', height: '180px', ref: function (undoList) { return (undoListInstance = undoList); } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "8px" } },
                            React.createElement("div", { className: "listbox", style: { height: "100%", border: "1px solid #e0e0e0" } },
                                React.createElement("div", { className: "heading", style: { height: "40px" } },
                                    React.createElement("span", null, "Redo Stack"),
                                    React.createElement("div", { style: { float: "right", marginTop: "-5px" } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "redo", style: { width: "100%" }, disabled: true, ref: function (redoList) { return (redoInstance = redoList); } }, "Redo"))),
                                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'redoList', height: '180px', ref: function (redoList) { return (redoListInstance = redoList); } }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "10px" } },
                            React.createElement("div", { style: { display: "table", height: "35px", paddingLeft: "0px" }, className: "col-xs-6" },
                                React.createElement("div", { style: { display: "table-cell", verticalAlign: "middle" } }, "Stack Limit")),
                            React.createElement("div", { className: "col-xs-6", style: { paddingLeft: "0px", paddingRight: "0px" } },
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "StackLimit", value: 0, min: 0, max: 50, width: '100%', format: '##.##', step: 1 }))),
                        React.createElement("div", { className: "row", style: { paddingTop: "10px" } },
                            React.createElement("div", { className: "col-xs-6", style: { paddingLeft: "0px" } },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (startGroupAction) { return (startActionInstance = startGroupAction); }, id: "startGroupAction", title: 'startGroupAction', style: { width: "100%", overflow: "hidden", textOverflow: "ellipsis" }, isToggle: true }, "Start Group Action")),
                            React.createElement("div", { className: "col-xs-6", title: 'clearHistory', style: { paddingLeft: "0px", paddingReft: "0px" } },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clearHistory", style: { width: "100%" } }, "Clear History")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates viewing, deleting, limiting diagram history and groups diagram actions and stores it as a single entry in the history manager.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Diagram history are being handle all the diagram history. Using ",
                    React.createElement("code", null, "stackLimit"),
                    " property of the history manager we limit the no. of entries can be stored on the diagram history. Also, we can get the list of entries in the undo list and redo list using ",
                    React.createElement("code", null, "undoStack"),
                    " and ",
                    React.createElement("code", null, "redoStack"),
                    ". Also diagram history manager have the option to group the action as the single entry by the help of the ",
                    React.createElement("code", null, "startGroupAction"),
                    " and ",
                    React.createElement("code", null, "endGroupAction"),
                    "        public Api. Also, we can add the custom entries to the diagram history. method can be used to print the diagrams."))));
    };
    return HistoryManager;
}(sample_base_1.SampleBase));
exports.HistoryManager = HistoryManager;
function getConnectorDefaults(connector) {
    connector.type = 'Orthogonal';
    connector.style.strokeColor = "#717171";
    connector.sourceDecorator.style.strokeColor = "#717171";
    connector.targetDecorator.style.strokeColor = "#717171";
    connector.sourceDecorator.style.fill = "#717171";
    connector.targetDecorator.style.fill = "#717171";
    return connector;
}
function getValue() {
    var undoStack = diagramInstance.historyManager.undoStack;
    var redoStack = diagramInstance.historyManager.redoStack;
    var undo = [];
    for (var i = 0; i < undoStack.length; i++) {
        undo.push({ 'text': undoStack[i].type, 'value': undoStack[i].type });
    }
    var redo = [];
    for (var i = 0; i < redoStack.length; i++) {
        redo.push({ 'text': redoStack[i].type, 'value': redoStack[i].type });
    }
    var itemsCount = diagramInstance.historyManager.stackLimit ? diagramInstance.historyManager.stackLimit : 0;
    undoListInstance.dataSource = undo;
    undoListInstance.fields = { text: 'text', value: 'text' };
    undoListInstance.index = 0;
    undoListInstance.dataBind();
    undoInstance.disabled = undo.length ? false : true;
    redoInstance.disabled = redo.length ? false : true;
    redoListInstance.dataSource = redo;
    redoListInstance.fields = { text: 'text', value: 'text' };
    redoListInstance.index = 0;
    redoListInstance.dataBind();
}
function startAction() {
    if (startActionInstance.element.classList.contains('e-active')) {
        startActionInstance.content = 'End Group Action';
        diagramInstance.startGroupAction();
    }
    else {
        diagramInstance.endGroupAction();
        startActionInstance.content = 'Start Group Action';
    }
}
;
