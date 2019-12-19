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
var ej2_react_heatmap_1 = require("@syncfusion/ej2-react-heatmap");
var data = require("./data.json");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
// custom code start
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n#source{\n    float: right; margin-right: 10p\n}";
// custom code end
/**
 * Heatmap Palette mode sample
 */
var Palette = (function (_super) {
    __extends(Palette, _super);
    function Palette() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Palette.prototype.fixed = function (args) {
        this.checkboxObj.disabled = false;
        this.heatmap.paletteSettings.type = 'Fixed';
        this.heatmap.dataBind();
    };
    Palette.prototype.gradient = function (args) {
        this.checkboxObj.disabled = true;
        this.heatmap.paletteSettings.type = 'Gradient';
        this.heatmap.dataBind();
    };
    Palette.prototype.valueChange = function (args) {
        this.heatmap.legendSettings.enableSmartLegend = this.checkboxObj.checked;
        this.heatmap.dataBind();
    };
    Palette.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_heatmap_1.HeatMapComponent, { id: 'heatmap-container', ref: function (t) { return _this.heatmap = t; }, titleSettings: {
                        text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
                        textStyle: {
                            size: '15px',
                            fontWeight: '500',
                            fontStyle: 'Normal',
                            fontFamily: 'Segoe UI'
                        }
                    }, xAxis: {
                        labels: ['2005', '2006', '2007', '2008', '2009', '2010',
                            '2011', '2012', '2013', '2014', '2015'],
                        labelRotation: 45,
                        labelIntersectAction: 'None',
                    }, yAxis: {
                        labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior',
                            'Justice', 'NASA', 'Transportation']
                    }, dataSource: data.palatteSampleData, paletteSettings: {
                        palette: [{ value: 4.3, color: '#FFFFDA' },
                            { value: 7, color: '#EDF8B6' },
                            { value: 9, color: '#CAE8B4' },
                            { value: 15, color: '#78D1BD' },
                            { value: 18, color: '#36BCC6' },
                            { value: 25, color: '#208FC6' },
                            { value: 30, color: '#253494' },
                            { value: 32, color: '#081D58' }
                        ],
                        type: 'Fixed'
                    }, cellSettings: {
                        border: { width: 0 },
                        showLabel: false,
                    }, load: this.load.bind(this), legendSettings: {
                        position: 'Bottom',
                        width: '400px',
                        enableSmartLegend: true
                    } },
                    React.createElement(ej2_react_heatmap_1.Inject, { services: [ej2_react_heatmap_1.Legend, ej2_react_heatmap_1.Tooltip] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Palette Type:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'fixed', checked: true, label: 'Fixed', name: 'paletteType', value: "Fixed", change: this.fixed.bind(this) })),
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: 'gradient', label: 'Gradient', name: 'paletteType', value: "Gradient", change: this.gradient.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Enable Smart Legend:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'smartLegend', checked: true, disabled: false, name: 'enableSmartLegend', ref: function (scope) { _this.checkboxObj = scope; }, change: this.valueChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the energy consumption in trillion British thermal units (btu) by the various public sectors in US government over the years. The data label is disabled in this sample, the tooltip displays the data point values.  In property panel, the options are available to change palette type in Heatmap by means of radio button.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to change the palette type between ",
                    React.createElement("code", null, "Fixed "),
                    " and ",
                    React.createElement("code", null, "Gradient"),
                    " types in Heatmap. The palette type can be defined using the ",
                    React.createElement("code", null, "type "),
                    " property in ",
                    React.createElement("code", null, "paletteSettings "),
                    ". Legend is enabled in this example, changing the palette mode the legend type will be automatically switched between gradient legend and list type legend."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Heatmap component features are segregated into individual feature-wise modules. To use a tooltip, inject the",
                    React.createElement("code", null, "Tooltip "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Tooltip) "),
                    " method, and use a legend by injecting the ",
                    React.createElement("code", null, "Legend "),
                    " module using the ",
                    React.createElement("code", null, "Heatmap.Inject(Legend) "),
                    " method."))));
    };
    Palette.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    ;
    return Palette;
}(sample_base_1.SampleBase));
exports.Palette = Palette;
