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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
/**
 * Tooltip sample
 */
var SAMPLE_CSS = "#tooltipDiagramSection .image-pattern-style {\n    background-color: white;\n    background-size: contain;\n    background-repeat: no-repeat;\n    height: 75px;\n    width: calc((100% - 12px) / 3);\n    cursor: pointer;\n    border: 1px solid #D5D5D5;\n    background-position: center;\n    float: left;\n}\n\n#tooltipDiagramSection .image-pattern-style:hover {\n    border-color: gray;\n    border-width: 2px;\n}\n\n#tooltipDiagramSection .row {\n    margin-left: 0px;\n    margin-right: 0px;\n}\n\n#tooltipDiagramSection .row-header {\n    font-size: 13px;\n    font-weight: 500;\n}\n\n#tooltipDiagramSection .e-selected-style {\n    border-color: #006CE6;\n    border-width: 2px;\n}\n\n#tooltipDiagramSection .e-checkbox-wrapper .e-label {\n    font-size: 12px;\n}\n.content-wrapper {\n    border: 1px solid #D7D7D7;\n}\n#tooltipPropertySection .property-panel-header {\n    margin-left: 10px;\n}";
// FontType Collection
exports.modevalue = [
    { type: 'Object', text: 'Object' },
    { type: 'Mouse', text: 'Mouse' },
];
// FontType Collection
exports.PositionValue = [
    { type: 'TopLeft', text: 'TopLeft' },
    { type: 'TopCenter', text: 'TopCenter' },
    { type: 'TopRight', text: 'TopRight' },
    { type: 'BottomLeft', text: 'BottomLeft' },
    { type: 'BottomCenter', text: 'BottomCenter' },
    { type: 'BottomRight', text: 'BottomRight' },
    { type: 'LeftTop', text: 'LeftTop' },
    { type: 'LeftCenter', text: 'LeftCenter' },
    { type: 'LeftBottom', text: 'LeftBottom' },
    { type: 'RightTop', text: 'RightTop' },
    { type: 'RightCenter', text: 'RightCenter' },
    { type: 'RightBottom', text: 'RightBottom' },
];
//FontType Collection
exports.EffectValue = [
    { type: 'FadeIn', text: 'FadeIn' },
    { type: 'FadeOut', text: 'FadeOut' },
    { type: 'FadeZoomIn', text: 'FadeZoomIn' },
    { type: 'FadeZoomOut', text: 'FadeZoomOut' },
    { type: 'FlipXDownIn', text: 'FlipXDownIn' },
    { type: 'FlipXDownOut', text: 'FlipXDownOut' },
    { type: 'FlipXUpIn', text: 'FlipXUpIn' },
    { type: 'FlipXUpOut', text: 'FlipXUpOut' },
    { type: 'FlipYLeftIn', text: 'FlipYLeftIn' },
    { type: 'FlipYLeftOut', text: 'FlipYLeftOut' },
    { type: 'FlipYRightIn', text: 'FlipYRightIn' },
    { type: 'FlipYRightOut', text: 'FlipYRightOut' },
    { type: 'ZoomIn', text: 'ZoomIn' },
    { type: 'ZoomOut', text: 'ZoomOut' },
    { type: 'None', text: 'None' },
];
exports.contentValue = [
    { type: 'HTML Element', text: 'HTML Element' },
    { type: 'Text', text: 'Text' },
];
var diagramInstance;
var modeDropdown;
var positionDropdown;
var contentDropdown;
var effectDropdown;
var nodes = [
    {
        id: 'node1', width: 60, height: 60, offsetX: 35, offsetY: 120,
        annotations: [{ content: 'Customer query', offset: { x: 0.5, y: 1 }, margin: { top: 15 } }],
        tooltip: { content: 'Queries from the customer' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
    },
    {
        id: 'node2', width: 75, height: 70, offsetX: 140, offsetY: 120,
        annotations: [{ content: 'Enough details?', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Whether the provided information is enough?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
    },
    {
        id: 'node3', width: 60, height: 50, offsetX: 270, offsetY: 120,
        annotations: [{ content: 'Analyse', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Analysing the query' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } },
    },
    {
        id: 'node4', width: 75, height: 70, offsetX: 370, offsetY: 120, shape: {
            type: 'Bpmn', shape: 'Gateway',
            gateway: { type: 'Exclusive' }
        },
        tooltip: { content: 'proceed to validate?' },
    },
    {
        id: 'node5', width: 75, height: 70, offsetX: 570, offsetY: 120,
        annotations: [{ content: 'Validate', offset: { x: 0.50, y: 0.50 } }],
        tooltip: { content: 'Whether the reported/requested bug/feature is valid?' }, shape: { type: 'Bpmn', shape: 'Gateway' }
    },
    {
        id: 'node6', width: 60, height: 60, offsetX: 720, offsetY: 120,
        tooltip: { content: 'Send the invalid message to customer' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node7', width: 60, height: 50, offsetX: 140, offsetY: 280,
        annotations: [{ content: 'Request', offset: { x: 0.50, y: 0.50 }, margin: { top: 5 } }],
        tooltip: { content: 'Requesting for more information' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task', task: { type: 'Send' } } }
    },
    {
        id: 'node8', width: 60, height: 60, offsetX: 370, offsetY: 280,
        tooltip: { content: 'Share the User Guide/Knowledge Base link' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'Start', trigger: 'Message' } }
    },
    {
        id: 'node9', width: 70, height: 50, offsetX: 570, offsetY: 280,
        annotations: [{ content: 'Log bug/feature', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Log the bug/feature' },
        shape: { type: 'Bpmn', shape: 'Activity', activity: { activity: 'Task' } }
    },
    {
        id: 'node10', width: 75, height: 55, offsetX: 390, offsetY: 430,
        annotations: [{ content: 'Implement', offset: { x: 0.50, y: 0.50 } }], tooltip: { content: 'Fix the bug/Add the feature' },
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'SubProcess', subProcess: {
                    collapsed: false,
                    events: [{ event: 'Intermediate', trigger: 'Timer', offset: { x: 0.5, y: 1 }, width: 25, height: 25 }]
                }
            }
        }
    },
    {
        id: 'node12', width: 60, height: 60, offsetX: 265, offsetY: 430, tooltip: { content: 'Provide the solution' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node13', width: 60, height: 60, offsetX: 720, offsetY: 430, tooltip: { content: 'Share the task details' },
        shape: { type: 'Bpmn', shape: 'Event', event: { event: 'End', trigger: 'Message' } }
    },
    {
        id: 'node14', width: 60, height: 60, offsetX: 570, offsetY: 430, shape: {
            type: 'Bpmn', shape: 'Gateway',
            gateway: { type: 'Parallel' }
        },
        tooltip: { content: 'can log?' },
    },
];
var connectors = [
    { id: 'connector1', sourceID: 'node1', targetID: 'node2' },
    { id: 'connector2', sourceID: 'node2', targetID: 'node3' },
    { id: 'connector3', sourceID: 'node3', targetID: 'node4' },
    {
        id: 'connector4', sourceID: 'node4', targetID: 'node5',
        annotations: [{ content: 'Feature/Bug', offset: 0.5, style: { fill: 'white', textWrapping: 'Wrap' } }]
    },
    {
        id: 'connector5', sourceID: 'node5', targetID: 'node6',
        annotations: [{ content: 'Invalid', offset: 0.5, style: { fill: 'white' } }]
    },
    { id: 'connector6', sourceID: 'node2', targetID: 'node7' },
    {
        id: 'connector7', sourceID: 'node4', targetID: 'node8',
        annotations: [{ content: 'How to?', offset: 0.5, style: { fill: 'white' } }]
    },
    { id: 'connector8', sourceID: 'node5', targetID: 'node9' },
    { id: 'connector9', sourceID: 'node14', targetID: 'node13' },
    {
        id: 'connector10', sourceID: 'node7', targetID: 'node3', type: 'Orthogonal',
        segments: [{ type: 'Orthogonal', length: 100, direction: 'Right' }, { type: 'Orthogonal', length: 100, direction: 'Top' }]
    },
    { id: 'connector11', sourceID: 'node14', targetID: 'node10' },
    { id: 'connector12', sourceID: 'node10', targetID: 'node12' },
    { id: 'connector13', sourceID: 'node9', targetID: 'node14' },
];
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'text', value: 'type' };
        return _this;
    }
    Tooltip.prototype.rendereComplete = function () {
        diagramInstance.fitToPage({ mode: 'Width' });
    };
    Tooltip.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { id: "tooltipDiagramSection", className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: 'diagram', ref: function (diagram) { return (diagramInstance = diagram); }, width: '100%', height: '645px', nodes: nodes, connectors: connectors, snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None }, getConnectorDefaults: getConnectorDefaults, getNodeDefaults: getNodeDefaults, tooltip: { content: getcontent(), position: 'TopLeft', relativeMode: 'Object', animation: { open: { effect: 'FadeZoomIn', delay: 0 }, close: { effect: 'FadeZoomOut', delay: 0 } } } },
                        React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.BpmnDiagrams] })))),
            React.createElement("div", { id: 'tooltipPropertySection', className: 'col-lg-4 property-section' },
                React.createElement("div", { className: 'property-panel-header', style: { marginLeft: '0px' } }, "Properties"),
                React.createElement("table", { id: 'property', title: 'Properties' },
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null, "Relative Mode")),
                        React.createElement("td", null,
                            React.createElement("div", { style: { paddingLeft: "15px" } },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'mode', ref: function (dropdown) { return (modeDropdown = dropdown); }, dataSource: exports.modevalue, fields: this.fields, placeholder: 'select a mode value', popupWidth: '150', width: '100%', index: '0', change: function (args) {
                                        if (args.value === 'Mouse') {
                                            diagramInstance.tooltip.relativeMode = 'Mouse';
                                        }
                                        else {
                                            diagramInstance.tooltip.relativeMode = 'Object';
                                        }
                                        diagramInstance.dataBind();
                                    } })))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null, "Position")),
                        React.createElement("td", null,
                            React.createElement("div", { style: { paddingLeft: "15px" } },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'position', ref: function (dropdown) { return (positionDropdown = dropdown); }, dataSource: exports.PositionValue, fields: this.fields, index: '0', placeholder: 'select a position', popupWidth: '150', width: '100%', change: function (args) {
                                        var nodes = diagramInstance.nodes;
                                        for (var i = 0; i < nodes.length; i++) {
                                            if (nodes[i].tooltip) {
                                                nodes[i].tooltip.position = args.value;
                                                diagramInstance.dataBind();
                                            }
                                        }
                                    } })))),
                    React.createElement("tr", null,
                        React.createElement("td", null),
                        React.createElement("td", null,
                            React.createElement("div", { id: 'textContentDiv', className: 'row', style: { display: 'none' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: 'textContent', placeholder: 'Enter text content', floatLabelType: 'Auto', change: function (args) {
                                            diagramInstance.tooltip.content = args.value.toString();
                                            diagramInstance.dataBind();
                                        } }))),
                            React.createElement("div", { id: 'htmlContentDiv', className: 'row', style: { display: 'none' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: 'htmlContent', placeholder: 'Enter html content', floatLabelType: 'Auto', change: function (args) {
                                            var tooltipContent = document.createElement('div');
                                            var Description = args.value.toString();
                                            tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;corner-radius:2px;white-space: nowrap;"> <span style="margin: 10px;"> ' + Description + ' </span>';
                                            diagramInstance.tooltip.content = tooltipContent;
                                            diagramInstance.dataBind();
                                        } }))))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null, "Animation")),
                        React.createElement("td", { style: { paddingLeft: "15px" } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'duration', value: 1000, min: 1000, max: 6000, step: 100, change: function (args) {
                                    diagramInstance.tooltip.animation.close.duration = args.value;
                                    diagramInstance.tooltip.animation.open.duration = args.value;
                                    diagramInstance.dataBind();
                                } }))),
                    React.createElement("tr", null,
                        React.createElement("td", null,
                            React.createElement("div", null, "Effect")),
                        React.createElement("td", null,
                            React.createElement("div", { style: { paddingLeft: "15px" } },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'effect', ref: function (dropdown) { return (effectDropdown = dropdown); }, dataSource: exports.EffectValue, fields: this.fields, placeholder: 'select a effect', popupWidth: '150', width: '100%', index: '0', change: function (args) {
                                        diagramInstance.tooltip.animation.open.effect = args.value;
                                        diagramInstance.tooltip.animation.close.effect = args.value;
                                        diagramInstance.dataBind();
                                    } })))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates how to add the extra information to the nodes and connectors and how to show the information through the common graphical user interface element.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Using diagram\u2019s ",
                    React.createElement("code", null, "tooltip"),
                    " we can define the tooltip for the diagram nodes as well as connector. We can control the ",
                    React.createElement("code", null, "animation"),
                    ",",
                    React.createElement("code", null, "position"),
                    ", ",
                    React.createElement("code", null, "effects"),
                    " of the tooltip using ",
                    React.createElement("code", null, "tooltip"),
                    " property of the diagram. Also, we can define the custom tooltip as either text or HTML element using ",
                    React.createElement("code", null, "content"),
                    " property of the tooltip. We can control the different tooltip settings to each connector and node."),
                React.createElement("br", null))));
    };
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
function getConnectorDefaults(connector, diagram) {
    connector.type = 'Orthogonal';
    connector.style = { strokeWidth: 2 };
    return connector;
}
function getNodeDefaults(obj) {
    obj.offsetX += 0.5;
    obj.offsetY += 0.5;
    obj.constraints = ej2_react_diagrams_1.NodeConstraints.Default | ej2_react_diagrams_1.NodeConstraints.Tooltip;
    obj.style = { strokeWidth: 2 };
    return obj;
}
function getcontent() {
    var tooltipContent = document.createElement('div');
    tooltipContent.innerHTML = '<div style="background-color: #f4f4f4; color: black; border-width:1px;border-style: solid;border-color: #d3d3d3; border-radius: 8px;white-space: nowrap;"> <span style="margin: 10px;"> Tooltip !!! </span> </div>';
    return tooltipContent;
}
