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
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var diagram_events_details_1 = require("./diagram-events-details");
/**
 * Diagram Events sample
 */
var SAMPLE_CSS = "#diagramEventsControlSection .sb-mobile-palette {\n    width: 200px;\n    height: 100%;\n    float: left;\n  }\n\n #diagramEventsControlSection .sb-mobile-palette-bar {\n    display: none;\n}\n\n #diagramEventsControlSection .sb-mobile-diagram {\n    width: calc(100% - 200px);\n    height: 100%;\n    float: left;\n    border: 1px solid #d9dedd;\n  }\n  \n  .material #diagramEventsControlSection  #palette-space .e-accordion {\n      border: none;\n  }\n  .material #diagramEventsControlSection #palette-space {\n     border: 1px solid rgba(0, 0, 0, 0.12);\n  }\n\n  @media (max-width: 550px) {\n    #diagramEventsControlSection .sb-mobile-palette {\n      z-index: 19;\n      position: absolute;\n      display: none;\n      transition: transform 300ms linear, visibility 0s linear 300ms;\n      width: 39%;\n      height: 100%;\n    }\n\n    #diagramEventsControlSection .sb-mobile-palette-bar {\n      display: block;\n      width: 100%;\n      background: #fafafa;\n      padding: 10px 10px;\n      border: 0.5px solid #e0e0e0;\n      min-height: 40px;\n    }\n\n    #diagramEventsControlSection .sb-mobile-diagram {\n      width: 100%;\n      height: 100%;\n      float: left;\n      left: 0px;\n    }\n\n    #diagramEventsControlSection #palette-icon {\n      font-size: 20px;\n    }\n  }\n\n  #diagramEventsControlSection .sb-mobile-palette-open {\n    position: absolute;\n    display: block;\n    right: 15px;\n  }\n\n  @font-face {\n    font-family: \"e-ddb-icons1\";\n    src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1tSfIAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmdC1P4gAAAcgAAAAwaGVhZBJhohMAAADQAAAANmhoZWEIVQQDAAAArAAAACRobXR4CAAAAAAAAYAAAAAIbG9jYQAYAAAAAAHAAAAABm1heHABDgAUAAABCAAAACBuYW1lm+wy9gAAAfgAAAK1cG9zdLnsYngAAASwAAAAMAABAAAEAAAAAFwEAAAAAAAD+AABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAAgNcenF8PPPUACwQAAAAAANelrs4AAAAA16WuzgAAAAAD+AN6AAAACAACAAAAAAAAAAEAAAACAAgAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAAQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAAGAAAAAIAAAAAA/gDegACAAcAACUhCQEhATUhAQQC9P6G/YoBMQFF/YqGAjf+hgH0QwAAAAAAEgDeAAEAAAAAAAAAAQAAAAEAAAAAAAEAEwABAAEAAAAAAAIABwAUAAEAAAAAAAMAEwAbAAEAAAAAAAQAEwAuAAEAAAAAAAUACwBBAAEAAAAAAAYAEwBMAAEAAAAAAAoALABfAAEAAAAAAAsAEgCLAAMAAQQJAAAAAgCdAAMAAQQJAAEAJgCfAAMAAQQJAAIADgDFAAMAAQQJAAMAJgDTAAMAAQQJAAQAJgD5AAMAAQQJAAUAFgEfAAMAAQQJAAYAJgE1AAMAAQQJAAoAWAFbAAMAAQQJAAsAJAGzIERpYWdyYW1fU2hhcGVzX0ZPTlRSZWd1bGFyRGlhZ3JhbV9TaGFwZXNfRk9OVERpYWdyYW1fU2hhcGVzX0ZPTlRWZXJzaW9uIDEuMERpYWdyYW1fU2hhcGVzX0ZPTlRGb250IGdlbmVyYXRlZCB1c2luZyBTeW5jZnVzaW9uIE1ldHJvIFN0dWRpb3d3dy5zeW5jZnVzaW9uLmNvbQAgAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAUgBlAGcAdQBsAGEAcgBEAGkAYQBnAHIAYQBtAF8AUwBoAGEAcABlAHMAXwBGAE8ATgBUAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAVgBlAHIAcwBpAG8AbgAgADEALgAwAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAdQBzAGkAbgBnACAAUwB5AG4AYwBmAHUAcwBpAG8AbgAgAE0AZQB0AHIAbwAgAFMAdAB1AGQAaQBvAHcAdwB3AC4AcwB5AG4AYwBmAHUAcwBpAG8AbgAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgECAQMABlNoYXBlcwAA)\n      format(\"truetype\");\n    font-weight: normal;\n    font-style: normal;\n  }\n\n  .e-ddb-icons1 {\n    font-family: \"e-ddb-icons1\";\n    speak: none;\n    font-size: 16px;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  #diagramEventsControlSection .e-toggle-palette::before {\n    content: \"e700\";\n  }\n\n  \n  #diagramEventsPropertySection .event-tracer {\n    width: 240px;\n    height: 700px;\n    min-height: 700px;\n    float: left;\n  }\n\n #diagramEventsPropertySection .heading {\n    color: #807f7f;\n    font-size: 15px;\n    height: 50px;\n    width: 100%;\n    border-bottom: 1px solid #d9dedd;\n    padding: 10px;\n  }\n\n  #EventLog b {\n    color: #388e3c;\n  }\n\n  hr {\n    margin: 1px 10px 1px 0px;\n    border-top: 1px solid #eee;\n  }\n\n  .property-section {\n    padding-top: 20px;\n    padding-bottom: 20px;\n    height: 740px;\n    padding-right: 0px;\n  }\n\n  #diagramEventsPropertySection .evtbtn { \n    float: right; \n  }\n\n  #diagramEventsPropertySection .listbox {\n    width: 100%;\n    height: 50%;\n  }\n\n #diagramEventsPropertySection .event-tracer .prop-grid {\n    width: 100%;\n    height: 50%;\n  }\n\n #diagramEventsPropertySection #EventLog {\n    height: calc(100% - 50px);\n    padding: 15px;\n    overflow: auto;\n    width: 100%;\n  }";
var diagramInstance;
//Initialize the basicshapes for the symbol palatte
var basicShapes = [
    { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
    { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
    { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
    { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
    { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
    { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
    { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
    { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
    { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
    { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
    { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } },
    { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' } },
    { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' } },
    { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' } },
    { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
];
//Initializes connector symbols for the symbol palette
var connectorSymbols = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
    },
    {
        id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 1 }
    },
    {
        id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1 }, targetDecorator: { shape: 'None' }
    },
];
var Events = (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [
            { text: 'Drag enter', id: 'dragEnter' },
            { text: 'Drag leave', id: 'dragLeave' },
            { text: 'Drag over', id: 'dragOver' },
            { text: 'Click', id: 'click', isChecked: true },
            { text: 'History change', id: 'historyChange', isChecked: true },
            { text: 'Double click', id: 'doubleClick' },
            { text: 'Text edit', id: 'textEdit', isChecked: true },
            { text: 'Scroll change', id: 'scrollChange' },
            { text: 'Selection change', id: 'selectionChange', isChecked: true },
            { text: 'Size change', id: 'sizeChange', isChecked: true },
            { text: 'Connection change', id: 'connectionChange', isChecked: true },
            { text: 'SourcePoint change', id: 'sourcePointChange' },
            { text: 'TargetPoint change', id: 'targetPointChange' },
            { text: 'Position change', id: 'positionChange', isChecked: true },
            { text: 'Rotate change', id: 'rotateChange', isChecked: true },
            { text: 'Collection change', id: 'collectionChange', isChecked: true },
            { text: 'Mouse enter', id: 'mouseEnter' },
            { text: 'Mouse leave', id: 'mouseLeave' },
            { text: 'Mouse over', id: 'mouseOver' },
            { text: 'Context menu open', id: 'contextMenuOpen' },
            { text: 'Context menu before item render', id: 'contextMenuBeforeItemRender' },
            { text: 'Context menu click', id: 'contextMenuClick' }
        ];
        return _this;
    }
    Events.prototype.rendereComplete = function () {
        document.getElementById('clearbtn').onclick = function (args) {
            var data = document.getElementById('EventLog');
            for (var i = data.childNodes.length - 1; i >= 0; i--) {
                data.removeChild(data.childNodes[i]);
            }
        };
    };
    Events.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { id: "diagramEventsControlSection", className: "content-wrapper", style: { width: "100%", background: "white" } },
                    React.createElement("div", { id: "palette-space", className: "sb-mobile-palette" },
                        React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", expandMode: "Multiple", palettes: [
                                {
                                    id: "basic",
                                    expanded: true,
                                    symbols: basicShapes,
                                    iconCss: "e-ddb-icons e-basic",
                                    title: "Basic Shapes"
                                },
                                {
                                    id: "connectors",
                                    expanded: true,
                                    symbols: connectorSymbols,
                                    iconCss: "e-ddb-icons e-connector",
                                    title: "Connectors"
                                }
                            ], width: "100%", height: "700px", symbolHeight: 60, symbolWidth: 60, symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 }, getNodeDefaults: function (symbol) {
                                symbol.width = 50;
                                symbol.height = 50;
                                symbol.constraints = ej2_react_diagrams_1.NodeConstraints.Default | ej2_react_diagrams_1.NodeConstraints.AllowDrop;
                            }, getSymbolInfo: function (symbol) {
                                return { fit: true };
                            } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.DiagramContextMenu] }))),
                    React.createElement("div", { id: "diagram-space", className: "sb-mobile-diagram" },
                        React.createElement(ej2_react_diagrams_1.DiagramComponent, { id: "diagram", ref: function (diagram) { return (diagramInstance = diagram); }, width: "100%", height: "700px", dragEnter: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, dragLeave: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, dragOver: function (args) {
                                if (args.target) {
                                    diagram_events_details_1.getEventDetails(args);
                                }
                            }, click: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, historyChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, doubleClick: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, textEdit: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, scrollChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, selectionChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, sizeChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, connectionChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, sourcePointChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, targetPointChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, propertyChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, positionChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, rotateChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, collectionChange: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, mouseEnter: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, mouseLeave: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, mouseOver: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, contextMenuOpen: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, contextMenuBeforeItemRender: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, contextMenuClick: function (args) {
                                diagram_events_details_1.getEventDetails(args);
                            }, 
                            //Sets the constraints of the SnapSettings
                            snapSettings: { constraints: ej2_react_diagrams_1.SnapConstraints.None } },
                            React.createElement(ej2_react_diagrams_1.Inject, { services: [ej2_react_diagrams_1.UndoRedo, ej2_react_diagrams_1.DiagramContextMenu] }))))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { id: "diagramEventsPropertySection", style: { height: "100%", border: "1px solid #e0e0e0" } },
                    React.createElement("div", { className: "listbox" },
                        React.createElement("div", { className: "heading", style: { height: "40px" } },
                            React.createElement("span", null, "Client-side events")),
                        React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'listview-def', dataSource: this.data, showCheckBox: true, height: 'calc(100% - 40px)' })),
                    React.createElement("div", { className: "prop-grid content", style: { height: "50%", borderTop: "1px solid #e0e0e0" } },
                        React.createElement("div", { className: "heading" },
                            React.createElement("span", { style: { display: "inline-block", marginTop: "5px" } }, "Event arguments"),
                            React.createElement("div", { className: "evtbtn" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'clearbtn', content: 'clear' }))),
                        React.createElement("div", { id: "EventLog" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualize what are the client side events are available in the diagram.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Diagram events are the actions that can be detected by ",
                    React.createElement("code", null, "JavaScript"),
                    " and the event argument are the information about the event that has occurred. Some time we want to execute some JavaScript when and event occurs, such as when the user clicks on the node. We can achieve this scenario using ",
                    React.createElement("code", null, "click"),
                    " event of the diagram. So, in this shows how to hook all the diagram events and how to handle its ",
                    React.createElement("code", null, "arguments"),
                    "."),
                React.createElement("br", null))));
    };
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
