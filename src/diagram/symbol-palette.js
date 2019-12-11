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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./font-icons.css");
var SAMPLE_CSS = ".property-panel-header {\npadding-top: 15px;\npadding-bottom: 15px;\n}\n\n.row {\n  margin-left: 0px;\n  margin-right: 0px;\n}\n\n.row-header {\n  font-size: 13px;\n  font-weight: 500;\n}\n\n.diagram-control-pane .col-xs-6 {\n  padding-left: 0px;\n  padding-right: 0px;\n}";
//Initialize the flowshapes for the symbol palatte
var flowshapes = [
    { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
    { id: "Process", shape: { type: "Flow", shape: "Process" } },
    { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
    { id: "Document", shape: { type: "Flow", shape: "Document" } },
    {
        id: "PreDefinedProcess",
        shape: { type: "Flow", shape: "PreDefinedProcess" }
    },
    { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
    { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
    { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } }
];
var basicShapes = [
    { id: "Rectangle", shape: { type: "Basic", shape: "Rectangle" } },
    { id: "Ellipse", shape: { type: "Basic", shape: "Ellipse" } },
    { id: "Parallelogram", shape: { type: "Basic", shape: "Parallelogram" } },
    { id: "Triangle", shape: { type: "Basic", shape: "Triangle" } },
    { id: "Hexagon", shape: { type: "Basic", shape: "Hexagon" } },
    { id: "Pentagon", shape: { type: "Basic", shape: "Pentagon" } },
    { id: "Cylinder", shape: { type: "Basic", shape: "Cylinder" } },
    { id: "Star", shape: { type: "Basic", shape: "Star" } }
];
//Initializes connector symbols for the symbol palette
var connectorSymbols = [
    {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link3",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "Link21",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        targetDecorator: { shape: "Arrow" },
        style: { strokeWidth: 2 }
    },
    {
        id: "link23",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    },
    {
        id: "link33",
        type: "Bezier",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 40, y: 40 },
        style: { strokeWidth: 2 },
        targetDecorator: { shape: "None" }
    }
];
var expandMode = [
    { type: "Single", text: "Single" },
    { type: "Multiple", text: "Multiple" }
];
var palette;
var size;
var expand;
var SymbolPalette = /** @class */ (function (_super) {
    __extends(SymbolPalette, _super);
    function SymbolPalette() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SymbolPalette.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-8 control-section", id: "palette-space" },
                React.createElement("div", { className: "content-wrapper", style: { width: "100%" } },
                    React.createElement(ej2_react_diagrams_1.SymbolPaletteComponent, { id: "symbolpalette", ref: function (symbolpal) { return (palette = symbolpal); }, expandMode: "Multiple", allowDrag: true, palettes: [
                            {
                                id: "flow",
                                expanded: true,
                                symbols: flowshapes,
                                title: "Flow Shapes",
                                iconCss: "e-diagram-icons1 e-diagram-flow"
                            },
                            {
                                id: "basic",
                                expanded: true,
                                symbols: basicShapes,
                                title: "Basic Shapes",
                                iconCss: "e-diagram-icons1 e-diagram-basic"
                            },
                            {
                                id: "connectors",
                                expanded: true,
                                symbols: connectorSymbols,
                                title: "Connectors",
                                iconCss: "e-diagram-icons1 e-diagram-connector"
                            }
                        ], enableAnimation: true, width: "100%", height: "100%", symbolWidth: 80, symbolHeight: 80, getNodeDefaults: this.nodeDefaults.bind(this), getSymbolInfo: this.symbolInfo.bind(this), symbolMargin: { left: 15, right: 15, top: 15, bottom: 15 } }))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, "Properties"),
                React.createElement("table", { id: "property", title: "Properties" },
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "45%" } },
                            React.createElement("div", null, "Expandable: ")),
                        React.createElement("td", { style: { width: "60%" } },
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "expand", index: 1, ref: function (expandRef) { return (expand = expandRef); }, dataSource: expandMode, change: function () {
                                    palette.expandMode = expand.value;
                                    palette.dataBind();
                                } }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "45%" } },
                            React.createElement("div", null, "Symbol Size: ")),
                        React.createElement("td", { style: { width: "60%" } },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "size", value: 80, min: 40, max: 100, width: 120, step: 5, format: "##.##", change: function () {
                                    palette.symbolHeight = size.value;
                                    palette.symbolWidth = size.value;
                                }, ref: function (sizeRef) { return (size = sizeRef); } }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "45%", paddingBottom: "10px" } },
                            React.createElement("div", null, "Animation: ")),
                        React.createElement("td", { style: { width: "60%", paddingBottom: "10px" } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "animation", checked: true, change: onAnimationChange }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: "45%", paddingBottom: "10px" } },
                            React.createElement("div", null, "Item Text: ")),
                        React.createElement("td", { style: { width: "60%", paddingBottom: "10px" } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "itemtext", change: onItemTextChange }))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { width: '45%', paddingBottom: '10px' } },
                            React.createElement("div", null, "Header Icon: ")),
                        React.createElement("td", { style: { width: '60%', paddingBottom: '10px' } },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "headericon", checked: true, change: onHeaderIconChange }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the customizable options of symbol palette.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example shows how to add shapes to symbol palette and customize the symbol palette. The",
                    React.createElement("code", null, "symbols"),
                    " property can be used to add shapes to symbol palette. The",
                    React.createElement("code", null, "symbolWidth"),
                    " and",
                    React.createElement("code", null, "symbolHeight"),
                    " properties allow you to define the size of the symbols."),
                React.createElement("p", null, "In this example, options to enable/disable animation, show/hide symbol descriptions are provided."),
                React.createElement("br", null))));
    };
    SymbolPalette.prototype.nodeDefaults = function (symbol) {
        if (symbol.id === "Terminator" || symbol.id === "Process") {
            symbol.width = 80;
            symbol.height = 40;
        }
        else if (symbol.id === "Document" ||
            symbol.id === "PreDefinedProcess" ||
            symbol.id === "PaperTap" ||
            symbol.id === "DirectData") {
            symbol.width = 50;
            symbol.height = 40;
        }
        symbol.style = { strokeWidth: 2 };
        return symbol;
    };
    SymbolPalette.prototype.symbolInfo = function (symbol) {
        symbol.fit = true;
        return symbol;
    };
    return SymbolPalette;
}(sample_base_1.SampleBase));
exports.SymbolPalette = SymbolPalette;
function onAnimationChange(args) {
    palette.enableAnimation = args.checked;
}
//Add or Remove the Text for Symbol palette item.
function onItemTextChange(args) {
    if (args.checked) {
        palette.getSymbolInfo = function (symbol) {
            if (symbol.text !== undefined) {
                return { description: { text: symbol.text, overflow: "Wrap" } };
            }
            return { description: { text: symbol.id } };
        };
    }
    else {
        palette.getSymbolInfo = function (symbol) {
            return { description: { text: "" } };
        };
    }
    palette.dataBind();
}
function onHeaderIconChange(args) {
    for (var i = 0; i < palette.palettes.length; i++) {
        if (args.checked) {
            if (i === 0) {
                palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-basic';
            }
            else if (i === 1) {
                palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-flow';
            }
            else if (i === 2) {
                palette.palettes[i].iconCss = 'e-diagram-icons1 e-diagram-connector';
            }
        }
        else {
            palette.palettes[i].iconCss = '';
        }
    }
}
