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
/**
 * Print and Export sample for treemap
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/product.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n\t#btn-control {\n        width: 100%;\n\t\ttext-align: center;\n\t\ttext-transform:none !important;\n    }\n\t.e-play-icon::before {\n        content: \"\\e813\";\n    }";
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist = [
            { text: 'JPEG', value: 'JPEG' },
            { text: 'PNG', value: 'PNG' },
            { text: 'SVG', value: 'SVG' },
            { text: 'PF', value: 'PDF' },
        ];
        return _this;
    }
    Print.prototype.onClick2 = function (e) {
        this.treemapInstance.print();
    };
    Print.prototype.onClick1 = function (e) {
        var fileName = document.getElementById('fileName').value;
        this.treemapInstance.export(this.mode.value, fileName);
    };
    // custom code start
    Print.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Print.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, titleSettings: {
                            text: 'Top 10 best selling smartphone brands - 2017',
                            textStyle: { size: '15px' }
                        }, dataSource: datasource.product, layoutType: 'SliceAndDiceVertical', weightValuePath: 'Percentage', rangeColorValuePath: 'Percentage', tooltipSettings: {
                            visible: true,
                            format: '${Product} (+${Percentage}) %'
                        }, leafItemSettings: {
                            labelPath: 'Product',
                            fill: '#6699cc',
                            border: { color: 'black', width: 0.5 },
                            labelPosition: 'Center',
                            interSectAction: 'Hide',
                            labelFormat: '${Product} (+${Percentage}) %',
                            colorMapping: [
                                {
                                    from: 1.3,
                                    to: 22,
                                    color: '#FAB665',
                                    minOpacity: 0.5,
                                    maxOpacity: 1
                                }
                            ]
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapTooltip] })),
                    React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                        "Source:",
                        React.createElement("a", { href: " http://zeenews.india.com/photos/business/worlds-10-best-selling-smartphone-brands-2033958/samsung-2033959", target: "_blank" }, "zeenews.india.com"))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Export Type")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "mode", width: "90px", index: 0, placeholder: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "File Name")),
                                React.createElement("td", null,
                                    React.createElement("div", { className: "e-float-input", style: { 'margin-top': '0px' } },
                                        React.createElement("input", { id: "fileName", ref: function (d) { return _this.nameElement = d; }, type: "text", defaultValue: "TreeMap" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control" },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick1.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Export")))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control" },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick2.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Print")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the top 10 best-selling smartphone brands. Print and export options have been enabled in this sample.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to export and print the rendered TreeMap. The TreeMap can be exported to JPEG, PNG, SVG, and PDF formats."))));
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
