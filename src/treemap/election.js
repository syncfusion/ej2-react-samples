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
 * Legend sample for treemap
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/election-data.json");
var datasource = data;
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
// custom code end
var Legend = (function (_super) {
    __extends(Legend, _super);
    function Legend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist = [
            { text: 'Default', value: 'Default' },
            { text: 'Interactive', value: 'Interactive' },
        ];
        _this.positionList = [
            { text: 'Top', value: 'Top' },
            { text: 'Bottom', value: 'Bottom' },
            { text: 'Left', value: 'Left' },
            { text: 'Right', value: 'Right' },
            { text: 'Auto', value: 'Auto' }
        ];
        return _this;
    }
    Legend.prototype.legendChange = function () {
        this.treemapInstance.legendSettings.mode = this.legendElement.value;
        if (this.legendElement.value === 'Interactive') {
            if (this.treemapInstance.legendSettings.orientation === 'Horizontal' || this.treemapInstance.legendSettings.orientation === 'None') {
                this.treemapInstance.legendSettings.height = '10';
                this.treemapInstance.legendSettings.width = '';
            }
            else {
                this.treemapInstance.legendSettings.height = '70%';
                this.treemapInstance.legendSettings.width = '10';
            }
        }
        else {
            this.treemapInstance.legendSettings.height = '';
            this.treemapInstance.legendSettings.width = '';
        }
        this.treemapInstance.refresh();
    };
    Legend.prototype.legendPositionChange = function () {
        this.treemapInstance.legendSettings.position = this.legendPositionElement.value;
        if (this.legendPositionElement.value === 'Left' || this.legendPositionElement.value === 'Right') {
            this.treemapInstance.legendSettings.orientation = 'Vertical';
            if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                this.treemapInstance.legendSettings.height = '70%';
                this.treemapInstance.legendSettings.width = '10';
            }
            else {
                this.treemapInstance.legendSettings.height = '';
                this.treemapInstance.legendSettings.width = '';
            }
        }
        else if (this.legendPositionElement.value === 'Auto') {
            if (this.treemapInstance.availableSize.width > this.treemapInstance.availableSize.height) {
                this.treemapInstance.legendSettings.orientation = 'Vertical';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '70%';
                    this.treemapInstance.legendSettings.width = '10';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
            else {
                this.treemapInstance.legendSettings.orientation = 'Horizontal';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '10';
                    this.treemapInstance.legendSettings.width = '';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
        }
        else {
            this.treemapInstance.legendSettings.orientation = 'Horizontal';
            if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                this.treemapInstance.legendSettings.height = '10';
                this.treemapInstance.legendSettings.width = '';
            }
        }
        this.treemapInstance.refresh();
    };
    // custom code start
    Legend.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Legend.prototype.resize = function (args) {
        if (args.currentSize.width > args.currentSize.height && this.treemapInstance.legendSettings.position === 'Auto') {
            this.treemapInstance.legendSettings.orientation = 'Vertical';
            if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                this.treemapInstance.legendSettings.height = '70%';
                this.treemapInstance.legendSettings.width = '10';
            }
            else {
                this.treemapInstance.legendSettings.height = '';
                this.treemapInstance.legendSettings.width = '';
            }
        }
        else if (this.legendPositionElement.value === 'Auto') {
            if (this.treemapInstance.availableSize.width > this.treemapInstance.availableSize.height) {
                this.treemapInstance.legendSettings.orientation = 'Vertical';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '70%';
                    this.treemapInstance.legendSettings.width = '10';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
            else {
                this.treemapInstance.legendSettings.orientation = 'Horizontal';
                if (this.treemapInstance.legendSettings.mode === 'Interactive') {
                    this.treemapInstance.legendSettings.height = '10';
                    this.treemapInstance.legendSettings.width = '';
                }
                else {
                    this.treemapInstance.legendSettings.height = '';
                    this.treemapInstance.legendSettings.width = '';
                }
            }
        }
    };
    Legend.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, titleSettings: {
                            text: 'US presidential election result - 2016',
                            textStyle: { size: '15px' }
                        }, dataSource: datasource.election, weightValuePath: 'Population', tooltipSettings: {
                            visible: true,
                            format: ' <b>${Winner}</b><br>State : ${State}<br>Trump : ${Trump} %<br>Clinton : ${Clinton} %'
                        }, legendSettings: {
                            visible: true,
                            position: 'Top',
                            shape: 'Rectangle',
                            height: '10'
                        }, format: "n", useGroupingSeparator: true, rangeColorValuePath: 'WinPercentage', equalColorValuePath: 'Winner', leafItemSettings: {
                            labelPath: 'State',
                            fill: '#6699cc',
                            border: { color: 'white', width: 0.5 },
                            colorMapping: [
                                {
                                    value: 'Trump', color: '#D84444'
                                },
                                {
                                    value: 'Clinton', color: '#316DB5'
                                }
                            ]
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapLegend, ej2_react_treemap_1.TreeMapTooltip] })),
                    React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                        "Source:",
                        React.createElement("a", { href: " https://en.wikipedia.org/wiki/United_States_presidential_election,_2016", target: "_blank" }, "en.wikipedia.org"))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Type")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendmode", width: "120px", index: 0, change: this.legendChange.bind(this), ref: function (d) { return _this.legendElement = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Position")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "legendPosition", width: "120px", index: 0, change: this.legendPositionChange.bind(this), ref: function (d) { return _this.legendPositionElement = d; }, dataSource: this.positionList, fields: { text: 'text', value: 'value' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the 2016 United States presidential election results. The type and position of the legends can be changed using the Type and Position options in the properties panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see the type of legend available in TreeMap. The equal color mapping is applied based on certain value.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "The TreeMap component features are segregated into individual  modules by feature. To use a legend, inject the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapLegend)"),
                    " method."))));
    };
    return Legend;
}(sample_base_1.SampleBase));
exports.Legend = Legend;
