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
 * Selection and Highlight sample for treemap
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/import.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Selection = (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist1 = [
            { value: 'Item' },
            { value: 'Child' },
            { value: 'Parent' },
            { value: 'All' },
        ];
        _this.droplist2 = [
            { value: 'Item' },
            { value: 'Child' },
            { value: 'Parent' },
            { value: 'All' },
        ];
        return _this;
    }
    Selection.prototype.highlightChange = function (args) {
        var value = args.checked;
        this.treemapInstance.highlightSettings.enable = value;
        this.treemapInstance.refresh();
    };
    Selection.prototype.highlightModeChange = function () {
        this.treemapInstance.highlightSettings.mode = this.highlightModeElement.value;
        this.treemapInstance.refresh();
    };
    Selection.prototype.selectionchange = function (args) {
        var value = args.checked;
        this.treemapInstance.selectionSettings.enable = value;
        this.treemapInstance.refresh();
    };
    Selection.prototype.selectionModeChange = function () {
        this.treemapInstance.selectionSettings.mode = this.selectionModeElement.value;
        this.treemapInstance.refresh();
    };
    // custom code start
    Selection.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Selection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, titleSettings: {
                            text: 'Import and Export details of US'
                        }, selectionSettings: {
                            enable: true,
                            fill: '#58a0d3',
                            border: { width: 0.3, color: 'black' },
                            opacity: '1'
                        }, highlightSettings: {
                            enable: true,
                            fill: '#71b0dd',
                            border: { width: 0.3, color: 'black' },
                            opacity: '1'
                        }, leafItemSettings: {
                            labelPath: 'type',
                            fill: '#8ebfe2',
                            labelPosition: 'Center',
                            gap: 10
                        }, dataSource: datasource.import, weightValuePath: 'sales' },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapHighlight, ej2_react_treemap_1.TreeMapSelection] }),
                        React.createElement(ej2_react_treemap_1.LevelsDirective, null,
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'dataType', fill: '#c5e2f7', headerStyle: { size: '16px' }, headerAlignment: 'Center', groupGap: 5 }),
                            React.createElement(ej2_react_treemap_1.LevelDirective, { groupPath: 'product', fill: '#a4d1f2', headerAlignment: 'Center', groupGap: 2 }))),
                    React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                        "Source:",
                        React.createElement("a", { href: "https://www.indexmundi.com/united_states/imports_commodities.html", target: "_blank" }, "www.indexmundi.com"))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                            React.createElement("tr", { style: { "height": "50px" } },
                                React.createElement("td", { style: { "width": "60%" } },
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Highlight")))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { "width": "60%" } },
                                    React.createElement("div", null, " Enable")),
                                React.createElement("td", { style: { "width": "40%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'highlightEnable', checked: true, change: this.highlightChange.bind(this) }, " ")))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { "width": "60%" } },
                                    React.createElement("div", null, "Mode")),
                                React.createElement("td", { style: { "width": "40%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "highlightmode", width: "100px", index: 0, change: this.highlightModeChange.bind(this), ref: function (d) { return _this.highlightModeElement = d; }, dataSource: this.droplist1, fields: { text: 'value', value: 'value' } })))),
                            React.createElement("tr", { style: { "height": "50px" } },
                                React.createElement("td", { style: { "width": "80%" } },
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Selection")))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { "width": "60%" } },
                                    React.createElement("div", null, "Enable")),
                                React.createElement("td", { style: { "width": "40%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'SelectionEnable', checked: true, change: this.selectionchange.bind(this) }, " ")))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { "width": "60%" } },
                                    React.createElement("div", null, "Mode")),
                                React.createElement("td", { style: { "width": "40%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "selectionmode", width: "100px", index: 0, change: this.selectionModeChange.bind(this), ref: function (d) { return _this.selectionModeElement = d; }, dataSource: this.droplist2, fields: { text: 'value', value: 'value' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the details of goods imported by Japan. Selection and highlight options have been enabled in this sample.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see the modes available for performing highlight and selection in TreeMap. It can be either enabled or disabled."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "TreeMap component features are segregated into individual feature-wise modules. To use highlight and selection, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapSelection)"),
                    "inject the ",
                    React.createElement("code", null, "Highlight"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapHighlight)"),
                    " method."))));
    };
    return Selection;
}(sample_base_1.SampleBase));
exports.Selection = Selection;
