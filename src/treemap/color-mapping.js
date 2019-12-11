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
 * Color Mapping sample for treemap
 */
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_treemap_1 = require("@syncfusion/ej2-react-treemap");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var data = require("./treemap-data/color.json");
var datasource = data;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var ColorMapping = /** @class */ (function (_super) {
    __extends(ColorMapping, _super);
    function ColorMapping() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.dropList = [
            { text: 'Range', value: 'RangeColorMapping' },
            { text: 'Equal', value: 'EqualColorMapping' },
            { text: 'Desaturation', value: 'DesaturationColorMapping' }
        ];
        return _this;
    }
    ColorMapping.prototype.minOpacityChange = function () {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            var slider = document.getElementById('minOpacity');
            var minOpacity = parseFloat(slider.value);
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = minOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = minOpacity;
            this.treemapInstance.refresh();
        }
    };
    ColorMapping.prototype.maxOpacityChange = function () {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            var slider = document.getElementById('maxOpacity');
            var maxOpacity = parseFloat(slider.value);
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = maxOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = maxOpacity;
            this.treemapInstance.refresh();
        }
    };
    ColorMapping.prototype.opacityChange = function (args) {
        var value = args.checked;
        var minOpacity = parseFloat(this.minOpacityElement.value.toString());
        var maxOpacity = parseFloat(this.maxOpacityElement.value.toString());
        if (value) {
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = minOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = maxOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = minOpacity;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = maxOpacity;
            this.minOpacityElement.disabled = false;
            this.maxOpacityElement.disabled = false;
        }
        else {
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = null;
            this.minOpacityElement.disabled = true;
            this.maxOpacityElement.disabled = true;
        }
        this.treemapInstance.refresh();
    };
    ColorMapping.prototype.typeChange = function () {
        var value = this.typeElement.value.toString();
        if (value === 'RangeColorMapping') {
            this.opacityElement.disabled = true;
            this.treemapInstance.rangeColorValuePath = 'Area';
            this.treemapInstance.leafItemSettings.colorMapping[2].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].from = 100000;
            this.treemapInstance.leafItemSettings.colorMapping[0].to = 250000;
            this.treemapInstance.leafItemSettings.colorMapping[0].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].label = '0.1M - 0.25M';
            this.treemapInstance.leafItemSettings.colorMapping[0].color = '#547C84';
            this.treemapInstance.leafItemSettings.colorMapping[1].from = 250000;
            this.treemapInstance.leafItemSettings.colorMapping[1].to = 500000;
            this.treemapInstance.leafItemSettings.colorMapping[1].label = '0.25M - 0.50M';
            this.treemapInstance.leafItemSettings.colorMapping[1].color = '#37AFAB';
            this.treemapInstance.leafItemSettings.colorMapping[2].from = 500000;
            this.treemapInstance.leafItemSettings.colorMapping[2].to = 750000;
            this.treemapInstance.leafItemSettings.colorMapping[2].label = '0.5M - 0.75M';
            this.treemapInstance.leafItemSettings.colorMapping[2].color = '#A4D6AD';
            this.treemapInstance.leafItemSettings.colorMapping[2].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].from = 750000;
            this.treemapInstance.leafItemSettings.colorMapping[3].to = 2200000;
            this.treemapInstance.leafItemSettings.colorMapping[3].label = '0.75M - 2M';
            this.treemapInstance.leafItemSettings.colorMapping[3].color = '#DEEBAE';
            this.treemapInstance.leafItemSettings.colorMapping[4].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[5].from = null;
            this.treemapInstance.legendSettings.title.text = 'Area';
            this.treemapInstance.refresh();
        }
        else if (value === 'EqualColorMapping') {
            this.opacityElement.disabled = true;
            this.treemapInstance.rangeColorValuePath = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].value = 'North America';
            this.treemapInstance.leafItemSettings.colorMapping[0].color = '#DEEBAE';
            this.treemapInstance.leafItemSettings.colorMapping[1].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].value = 'Oceania';
            this.treemapInstance.leafItemSettings.colorMapping[1].color = '#A4D6AD';
            this.treemapInstance.leafItemSettings.colorMapping[2].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].value = 'Asia';
            this.treemapInstance.leafItemSettings.colorMapping[2].color = '#37AFAB';
            this.treemapInstance.leafItemSettings.colorMapping[3].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].value = 'Africa';
            this.treemapInstance.leafItemSettings.colorMapping[3].color = '#547C84';
            this.treemapInstance.leafItemSettings.colorMapping[4].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].value = 'Europe';
            this.treemapInstance.leafItemSettings.colorMapping[4].color = '#CEBF93';
            this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].maxOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].minOpacity = null;
            this.treemapInstance.leafItemSettings.colorMapping[4].maxOpacity = null;
            this.treemapInstance.equalColorValuePath = 'Location';
            this.treemapInstance.legendSettings.title.text = 'Continent';
            this.treemapInstance.refresh();
        }
        else if (value === 'DesaturationColorMapping') {
            this.opacityElement.disabled = false;
            this.treemapInstance.rangeColorValuePath = 'Area';
            this.treemapInstance.equalColorValuePath = null;
            var minOpacity = document.getElementById('minOpacity');
            var maxOpacity = document.getElementById('maxOpacity');
            this.treemapInstance.leafItemSettings.colorMapping[2].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].label = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].from = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].to = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].from = 100000;
            this.treemapInstance.leafItemSettings.colorMapping[0].to = 2230800;
            this.treemapInstance.leafItemSettings.colorMapping[0].label = '0.1M - 2M';
            this.treemapInstance.leafItemSettings.colorMapping[0].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].value = null;
            this.treemapInstance.leafItemSettings.colorMapping[2].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[1].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[3].color = null;
            this.treemapInstance.leafItemSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
            if (this.opacityElement.checked) {
                this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = parseFloat(minOpacity.value);
                this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = parseFloat(maxOpacity.value);
            }
            else {
                this.treemapInstance.leafItemSettings.colorMapping[0].minOpacity = null;
                this.treemapInstance.leafItemSettings.colorMapping[0].maxOpacity = null;
            }
            this.treemapInstance.legendSettings.title.text = 'Area';
            this.treemapInstance.refresh();
        }
    };
    // custom code start
    ColorMapping.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.treemap.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
        var sliderMin = document.getElementById('hideOne');
        var sliderMax = document.getElementById('hideTwo');
        var opacityCheck = document.getElementById('hideThree');
        var dropListValue = document.getElementById('Type');
        var opacityChecked = document.getElementById('opacity');
        if (dropListValue.value === 'Desaturation') {
            sliderMin.style.visibility = "visible";
            if (opacityChecked.checked) {
                sliderMax.style.visibility = "visible";
                opacityCheck.style.visibility = "visible";
            }
            else {
                sliderMax.style.visibility = "hidden";
                opacityCheck.style.visibility = "hidden";
            }
        }
        else {
            sliderMin.style.visibility = "hidden";
            sliderMax.style.visibility = "hidden";
            opacityCheck.style.visibility = "hidden";
        }
    };
    // custom code end
    ColorMapping.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treemap_1.TreeMapComponent, { load: this.load.bind(this), id: 'treemap-container', ref: function (m) { return _this.treemapInstance = m; }, titleSettings: {
                            text: 'Top 10 largest islands in the World',
                            textStyle: { size: '15px' }
                        }, format: "n", useGroupingSeparator: true, rangeColorValuePath: 'Area', dataSource: datasource.color, legendSettings: {
                            visible: true,
                            position: 'Bottom',
                            mode: 'Interactive',
                            height: '10',
                            title: {
                                text: 'Area'
                            }
                        }, tooltipSettings: {
                            visible: true,
                            format: 'Name: ${Name}<br>Area: ${Area} per square kms<br>Continent: ${Location}',
                            opacity: 0.8
                        }, weightValuePath: 'Area', leafItemSettings: {
                            labelPath: 'Name',
                            border: { color: 'white', width: 0.5 },
                            colorMapping: [
                                { from: 100000, to: 250000, label: '0.1M - 0.25M', color: '#547C84' },
                                { from: 250000, to: 550000, label: '0.25M - 0.55M', color: '#37AFAB' },
                                { from: 550000, to: 750000, label: '0.55M - 0.75M', color: '#A4D6AD' },
                                { from: 750000, to: 2250000, label: '0.75M - 2M', color: '#DEEBAE' },
                                { to: null, from: null, color: 'null' },
                                { to: null, from: null, color: 'null' },
                            ]
                        } },
                        React.createElement(ej2_react_treemap_1.Inject, { services: [ej2_react_treemap_1.TreeMapLegend, ej2_react_treemap_1.TreeMapTooltip] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '110%', marginBottom: '20px' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Color Mapping Type")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "Type", width: "120px", index: 0, change: this.typeChange.bind(this), ref: function (d) { return _this.typeElement = d; }, dataSource: this.dropList, fields: { text: 'text', value: 'value' } })))),
                            React.createElement("tr", { id: "hideOne" },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Change Opacity")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'opacity', checked: false, change: this.opacityChange.bind(this), ref: function (d) { return _this.opacityElement = d; }, disabled: true })))),
                            React.createElement("tr", { id: "hideTwo" },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Min Opacity")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: 'minOpacity', disabled: true, onChange: this.minOpacityChange.bind(this), ref: function (d) { return _this.minOpacityElement = d; }, min: "0", max: "1", step: "0.1", defaultValue: "0.5" })))),
                            React.createElement("tr", { id: "hideThree" },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Max Opacity")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: 'maxOpacity', disabled: true, onChange: this.maxOpacityChange.bind(this), ref: function (d) { return _this.maxOpacityElement = d; }, min: "0", max: "1", step: "0.1", defaultValue: "1" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the top 10 largest islands in the world based on area. The color mapping is applied to the items to differentiate them from other items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a tree map with color mapping. The range color mapping and desaturation color mapping group the shapes based on the area size, whereas the equal color mapping groups the shapes based on the continent value. The legend is enabled in this example to represent each color mapping.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "The TreeMap component features are segregated into individual modules by feature. To use a legend, inject the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "TreeMap.Inject(TreeMapLegend)"),
                    " method."))));
    };
    return ColorMapping;
}(sample_base_1.SampleBase));
exports.ColorMapping = ColorMapping;
