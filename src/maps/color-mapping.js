"use strict";
/**
 * Projection sample
 */
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
var ej2_maps_1 = require("@syncfusion/ej2-maps");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_maps_1 = require("@syncfusion/ej2-react-maps");
var data = require("./map-data/color-mapping.json");
var datasource = data;
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .toolback {\n        border-radius: 4px;\n        border: 1px #abb9c6;\n        opacity: 90%;\n        background: rgba(53, 63, 76, 0.90);\n        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);\n        padding-bottom: 10px;\n        padding-top: 10px;\n        padding-left: 10px;\n        padding-right: 10px;\n        width: 140px;\n    }\n    .listing1 {\n         font-size:13px;\n         color:#cccccc\n    }\n    .listing2 {\n         font-size:13px;\n         color:#ffffff;\n         font-weight: 500;\n    }";
// custom code end
var ColorMap = (function (_super) {
    __extends(ColorMap, _super);
    function ColorMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.dropList = [
            { text: 'Range', value: 'RangeColorMapping' },
            { text: 'Equal', value: 'EqualColorMapping' },
            { text: 'Desaturation', value: 'DesaturationColorMapping' }
        ];
        return _this;
    }
    ColorMap.prototype.minOpacityChange = function () {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            var slider = document.getElementById('minOpacity');
            var minOpacity = parseFloat(slider.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = minOpacity;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = minOpacity;
            this.mapInstance.refresh();
        }
    };
    ColorMap.prototype.maxOpacityChange = function () {
        if (this.opacityElement.checked && !this.opacityElement.disabled) {
            var slider = document.getElementById('maxOpacity');
            var maxOpacity = parseFloat(slider.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = maxOpacity;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = maxOpacity;
            this.mapInstance.refresh();
        }
    };
    ColorMap.prototype.opacityChange = function (args) {
        var value = args.checked;
        if (value) {
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(this.minOpacityElement.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(this.maxOpacityElement.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = parseFloat(this.minOpacityElement.value);
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = parseFloat(this.maxOpacityElement.value);
            this.minOpacityElement.disabled = false;
            this.maxOpacityElement.disabled = false;
        }
        else {
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].minOpacity = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].maxOpacity = null;
            this.minOpacityElement.disabled = true;
            this.maxOpacityElement.disabled = true;
        }
        this.mapInstance.refresh();
    };
    ColorMap.prototype.typeChange = function () {
        var value = this.typeElement.value.toString();
        if (value === 'RangeColorMapping') {
            this.opacityElement.disabled = true;
            this.mapInstance.layers[0].shapeSettings.colorValuePath = 'inches';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].to = 1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].label = '0 - 1';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].from = 1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].to = 2;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].label = '1 - 2';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].from = 2;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].to = 3;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].label = '2 - 3';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].from = 3;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].to = 4;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].color = '#547C84';
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].label = '3 - 4';
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].from = 4;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].to = 5;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].color = '#CEBF93';
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].label = '4 - 5';
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].from = 5;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].to = 6;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = '#a69d70';
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = '5 - 6';
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            this.mapInstance.legendSettings.title.text = 'Inches';
            this.mapInstance.refresh();
        }
        else if (value === 'EqualColorMapping') {
            this.opacityElement.disabled = true;
            this.mapInstance.layers[0].shapeSettings.colorValuePath = 'value';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].color = '#DEEBAE';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].value = 'Low';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].value = 'Moderate';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].color = '#A4D6AD';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].color = '#37AFAB';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].value = 'High';
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            this.mapInstance.legendSettings.title.text = 'Category';
            this.mapInstance.refresh();
        }
        if (value === 'DesaturationColorMapping') {
            if (this.opacityElement.checked) {
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = parseFloat(this.minOpacityElement.value);
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = parseFloat(this.maxOpacityElement.value);
            }
            else {
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].minOpacity = null;
                this.mapInstance.layers[0].shapeSettings.colorMapping[0].maxOpacity = null;
            }
            this.mapInstance.layers[0].shapeSettings.colorValuePath = 'inches';
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].from = 0.1;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].to = 6;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].color = ['#F0D6AD', '#19547B'];
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[0].label = '0 - 6';
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[1].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[2].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[3].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[4].value = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].from = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].to = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].color = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].label = null;
            this.mapInstance.layers[0].shapeSettings.colorMapping[5].value = null;
            this.mapInstance.legendSettings.title.text = 'Inches';
            this.mapInstance.refresh();
            this.opacityElement.disabled = false;
        }
    };
    // custom code start
    ColorMap.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.maps.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
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
    ;
    //custom code end
    ColorMap.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement(ej2_react_maps_1.MapsComponent, { id: "maps", load: this.load, ref: function (m) { return _this.mapInstance = m; }, titleSettings: {
                        text: 'Spring Precipitation Averages of US States',
                        textStyle: {
                            size: '16px'
                        }
                    }, zoomSettings: {
                        enable: false
                    }, legendSettings: {
                        visible: true,
                        position: 'Bottom', height: '10',
                        width: '80%', mode: 'Interactive',
                        titleStyle: {
                            size: '18px'
                        },
                        title: { text: 'Inches' }
                    } },
                    React.createElement(ej2_react_maps_1.Inject, { services: [ej2_react_maps_1.Legend, ej2_react_maps_1.MapsTooltip] }),
                    React.createElement(ej2_react_maps_1.LayersDirective, null,
                        React.createElement(ej2_react_maps_1.LayerDirective, { dataSource: datasource.color, shapeDataPath: 'State', shapeData: new ej2_maps_1.MapAjax('./src/maps/map-data/usa.json'), shapePropertyPath: 'name', shapeSettings: {
                                colorValuePath: 'inches',
                                fill: '#E5E5E5',
                                /*border: {
                                    color: 'black',
                                    width: 0.2
                                },*/
                                colorMapping: [
                                    {
                                        from: 0.1, to: 1, color: '#DEEBAE', label: '0 - 1'
                                    },
                                    {
                                        from: 1, to: 2, color: '#A4D6AD', label: '1 - 2'
                                    },
                                    {
                                        from: 2, to: 3, color: '#37AFAB', label: '2 - 3'
                                    },
                                    {
                                        from: 3, to: 4, color: '#547C84', label: '3 - 4'
                                    },
                                    {
                                        from: 4, to: 5, color: '#CEBF93', label: '4 - 5'
                                    },
                                    {
                                        from: 5, to: 6, color: '#a69d70', label: '5 - 6'
                                    },
                                ],
                            }, tooltipSettings: {
                                visible: true,
                                valuePath: 'State',
                                template: '<div id="template"><div class="toolback"><div class="listing2"><center>${State}</center></div>' +
                                    '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD"/><div><center>  <span class="listing1">Inches : </span>' +
                                    '<span class="listing2">${inches}</span></center></div><div><center>  <span class="listing1">Category : </span>' +
                                    '<span class="listing2">${value}</span> </center></div></div></div>'
                            } }))),
                React.createElement("div", { style: { float: 'right', marginright: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://simple.wikipedia.org/wiki/List_of_countries_by_population_density", target: "_blank" }, "simple.wikipedia.org"))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '110%', marginBottom: '20px' } },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Color MappingType")),
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
                                    React.createElement("input", { type: "range", id: 'maxOpacity', disabled: true, onChange: this.maxOpacityChange.bind(this), ref: function (d) { return _this.maxOpacityElement = d; }, min: "0", max: "1", step: "0.1", defaultValue: "1" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the average amount of rainfall and snowfall in spring season of all the states in US. Color mapping is applied to the shapes.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render a map with color mapping. Range color mapping and desaturation color mapping groups the shapes based on the inches value, where the equal color mapping groups based on the category (low, moderate or high) values. Legend is enabled in this example to represent each color mapping."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a marker or tap a marker in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontweight: 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Maps component features are segregated into individual feature-wise modules. To use the legend, inject the ",
                    React.createElement("code", null, "Legend"),
                    " module using the ",
                    React.createElement("code", null, "Maps.Inject(Legend)"),
                    " method."))));
    };
    return ColorMap;
}(sample_base_1.SampleBase));
exports.ColorMap = ColorMap;
