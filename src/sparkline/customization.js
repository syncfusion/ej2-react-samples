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
 * Customization samples for sparkline
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #axis > * {\n        padding: 0px !important;\n    }";
var slidercss = "  \n    .content-wrapper {\n        width: 40%;\n        margin: 0 auto;\n        min-width: 170px;\n    }";
var Customization = /** @class */ (function (_super) {
    __extends(Customization, _super);
    function Customization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Code for Property Panel
        _this.droplist = [
            { value: 'Sales Percentage' },
            { value: 'Sales Count' },
        ];
        return _this;
    }
    Customization.prototype.sparklineChange = function () {
        var element1 = document.getElementById('spark');
        if (element1.value === 'Sales Percentage') {
            this.axisElement.value = this.percentage.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 10;
        }
        else {
            this.axisElement.value = this.sales.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 5000000;
        }
        if ((element1.value === 'Sales Percentage' && this.percentage.markerSettings.visible.length) ||
            (element1.value === 'Sales Count' && this.sales.markerSettings.visible.length)) {
            this.markerElement.checked = true;
        }
        else {
            this.markerElement.checked = false;
        }
        this.markerChange();
        if ((element1.value === 'Sales Percentage' && this.percentage.dataLabelSettings.visible.length) ||
            (element1.value === 'Sales Count' && this.sales.dataLabelSettings.visible.length)) {
            this.datalabelElement.checked = true;
        }
        else {
            this.datalabelElement.checked = false;
        }
        var all = this.allElement;
        var negative = this.negativeElement;
        var first = this.firstElement;
        var last = this.lastElement;
        var high = this.highElement;
        var low = this.lowElement;
        var label = this.datalabelElement;
        var marker = this.markerElement;
        var rtl = this.rtlElement;
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        if (!marker.checked && !label.checked) {
            all.checked = false;
            negative.checked = false;
            first.checked = false;
            last.checked = false;
            high.checked = false;
            low.checked = false;
        }
        if (marker.checked) {
            var spark_1 = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            all.checked = spark_1.markerSettings.visible.indexOf('All') > -1;
            negative.checked = spark_1.markerSettings.visible.indexOf('Negative') > -1;
            first.checked = spark_1.markerSettings.visible.indexOf('Start') > -1;
            last.checked = spark_1.markerSettings.visible.indexOf('End') > -1;
            high.checked = spark_1.markerSettings.visible.indexOf('High') > -1;
            low.checked = spark_1.markerSettings.visible.indexOf('Low') > -1;
        }
        if (label.checked) {
            var spark_2 = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
            all.checked = spark_2.dataLabelSettings.visible.indexOf('All') > -1;
            negative.checked = spark_2.dataLabelSettings.visible.indexOf('Negative') > -1;
            first.checked = spark_2.dataLabelSettings.visible.indexOf('Start') > -1;
            last.checked = spark_2.dataLabelSettings.visible.indexOf('End') > -1;
            high.checked = spark_2.dataLabelSettings.visible.indexOf('High') > -1;
            low.checked = spark_2.dataLabelSettings.visible.indexOf('Low') > -1;
        }
        this.datalabelChange();
        if ((element1.value === 'Sales Percentage' && this.percentage.tooltipSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.tooltipSettings.visible === true)) {
            this.tooltipElement.checked = true;
        }
        else {
            this.tooltipElement.checked = false;
        }
        this.tooltipChange();
        if ((element1.value === 'Sales Percentage' && this.percentage.tooltipSettings.trackLineSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.tooltipSettings.trackLineSettings.visible === true)) {
            this.tracklineElement.checked = true;
        }
        else {
            this.tracklineElement.checked = false;
        }
        this.tracklineChange();
        if ((element1.value === 'Sales Percentage' && this.percentage.axisSettings.lineSettings.visible === true) ||
            (element1.value === 'Sales Count' && this.sales.axisSettings.lineSettings.visible === true)) {
            this.axislineElement.checked = true;
        }
        else {
            this.axislineElement.checked = false;
        }
        this.axislineChange();
        this.rtlChange();
        if ((element1.value === 'Sales Percentage' && this.percentage.enableRtl === true) ||
            (element1.value === 'Sales Count' && this.sales.enableRtl === true)) {
            this.rtlElement.checked = true;
        }
        else {
            this.rtlElement.checked = false;
        }
        if (element1.value === 'Sales Percentage' && this.percentage.axisSettings.value !== 0) {
            this.axisElement.value = this.percentage.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 10;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + this.percentage.axisSettings.value;
        }
        if (element1.value === 'Sales Count' && this.sales.axisSettings.value !== 0) {
            this.axisElement.value = this.sales.axisSettings.value;
            this.axisElement.min = 0;
            this.axisElement.max = 5000000;
            document.getElementById('axisval').innerHTML = 'Axis value: <span> ' + this.sales.axisSettings.value;
        }
        this.axisChange();
        all.checked = !(negative.checked || high.checked || low.checked || first.checked || last.checked);
        negative.disabled = high.disabled = low.disabled = first.disabled = last.disabled = all.checked;
    };
    Customization.prototype.allColorChange = function () {
        var negative = this.negativeElement;
        var first = this.firstElement;
        var last = this.lastElement;
        var high = this.highElement;
        var low = this.lowElement;
        if (this.allElement.checked == true) {
            this.negativeElement.disabled = true;
            this.firstElement.disabled = true;
            this.lastElement.disabled = true;
            this.highElement.disabled = true;
            this.lowElement.disabled = true;
        }
        else {
            this.negativeElement.disabled = false;
            this.firstElement.disabled = false;
            this.lastElement.disabled = false;
            this.highElement.disabled = false;
            this.lowElement.disabled = false;
        }
        var marker = this.markerElement;
        var label = this.datalabelElement;
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.markerSettings.visible = (true && marker.checked) ? ['All'] : (marker.checked) ? this.getVisible() : [];
        spark.dataLabelSettings.visible = (true && label.checked) ? ['All'] : (label.checked) ? this.getVisible() : [];
        spark.refresh();
    };
    Customization.prototype.colorChange = function () {
        this.processMarkerLabel();
    };
    Customization.prototype.processMarkerLabel = function () {
        var marker = this.markerElement;
        var label = this.datalabelElement;
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        if (marker.checked) {
            spark.markerSettings.visible = this.getVisible();
            spark.refresh();
        }
        if (label.checked) {
            spark.dataLabelSettings.visible = this.getVisible();
            spark.refresh();
        }
    };
    Customization.prototype.getVisible = function () {
        var visible = [];
        if (this.allElement.checked)
            return ['All'];
        else {
            if (this.negativeElement.checked)
                visible.push("Negative");
            if (this.firstElement.checked)
                visible.push("Start");
            if (this.lastElement.checked)
                visible.push("End");
            if (this.firstElement.checked)
                visible.push("High");
            if (this.lowElement.checked)
                visible.push("Low");
        }
        return visible;
    };
    Customization.prototype.markerChange = function () {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.markerSettings.visible = this.markerElement.checked ? this.getVisible() : [];
        spark.refresh();
    };
    Customization.prototype.datalabelChange = function () {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.dataLabelSettings.visible = this.datalabelElement.checked ? this.getVisible() : [];
        spark.refresh();
    };
    Customization.prototype.rtlChange = function () {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.enableRtl = this.rtlElement.checked ? true : false;
        spark.refresh();
    };
    Customization.prototype.tooltipChange = function () {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.tooltipSettings.visible = this.tooltipElement.checked;
        spark.tooltipSettings.format = '${xval}: ${yval}';
        spark.refresh();
    };
    Customization.prototype.tracklineChange = function () {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.tooltipSettings.trackLineSettings.visible = this.tracklineElement.checked;
        spark.tooltipSettings.trackLineSettings.color = 'red';
        spark.tooltipSettings.trackLineSettings.width = 1;
        spark.refresh();
    };
    Customization.prototype.axislineChange = function () {
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.axisSettings.lineSettings.visible = this.axislineElement.checked;
        spark.axisSettings.lineSettings.color = 'red';
        spark.axisSettings.lineSettings.width = 2;
        spark.refresh();
    };
    Customization.prototype.axisChange = function () {
        var value = parseInt(this.axisElement.value.toString(), 10);
        var element1 = document.getElementById('spark');
        var spark = element1.value === 'Sales Percentage' ? this.percentage : this.sales;
        spark.axisSettings.value = value;
        document.getElementById('axisval').innerHTML = "Axis Value <span>" + value;
        spark.refresh();
    };
    // custom code start
    Customization.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Customization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { id: "spark-container", className: "row" },
                    React.createElement("div", { className: "cols-sample-area", style: { "margin": "auto", "textAlign": "center" } },
                        React.createElement("p", { style: { "font-size": "18px" } }, " Worldwide car sales by brand - 2017"),
                        React.createElement("table", { style: { "width": "100%", "margin": "auto" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { "margin": "auto" } }, "Sales Percentage"),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), ref: function (m) { return _this.percentage = m; }, id: 'spark1-container', height: '200px', width: '200px', lineWidth: 1, type: 'Column', valueType: 'Category', tooltipSettings: {
                                                format: '${xval} : ${yval}',
                                                trackLineSettings: {
                                                    color: 'red',
                                                    width: 1
                                                }
                                            }, markerSettings: {
                                                fill: 'red',
                                                size: 5
                                            }, axisSettings: {
                                                lineSettings: {
                                                    color: 'red',
                                                    width: 2
                                                }
                                            }, dataSource: [
                                                { x: 0, xval: 'AUDI', yval: 1 },
                                                { x: 1, xval: 'BMW', yval: 5 },
                                                { x: 2, xval: 'BUICK', yval: -1 },
                                                { x: 3, xval: 'CETROEN', yval: -6 },
                                                { x: 4, xval: 'CHEVROLET', yval: 0 },
                                                { x: 5, xval: 'FIAT', yval: 1 },
                                                { x: 6, xval: 'FORD', yval: -2 },
                                                { x: 7, xval: 'HONDA', yval: 7 },
                                                { x: 8, xval: 'HYUNDAI', yval: -9 },
                                                { x: 9, xval: 'JEEP', yval: 0 },
                                                { x: 10, xval: 'KIA', yval: -10 },
                                                { x: 11, xval: 'MAZDA', yval: 3 },
                                                { x: 12, xval: 'MERCEDES', yval: 13 },
                                                { x: 13, xval: 'NISSAN', yval: 5 },
                                                { x: 14, xval: 'OPEL/VHALL', yval: -6 },
                                                { x: 15, xval: 'PEUGEOT', yval: 0 },
                                                { x: 16, xval: 'RENAULT', yval: 7 },
                                                { x: 17, xval: 'SKODA', yval: 5 },
                                                { x: 18, xval: 'SUBARU', yval: 5 },
                                                { x: 19, xval: 'SUZUKI', yval: 11 },
                                                { x: 20, xval: 'TOYOTA', yval: 5 },
                                                { x: 21, xval: 'VOLKSWAGEN', yval: 3 },
                                            ], xName: 'xval', yName: 'yval' },
                                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { "margin": "auto" } }, "Sales Count"),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), ref: function (m) { return _this.sales = m; }, id: 'spark2-container', height: '200px', width: '200px', lineWidth: 1, type: 'Column', valueType: 'Category', tooltipSettings: {
                                                format: '${xval} : ${yval}',
                                                trackLineSettings: {
                                                    color: 'red',
                                                    width: 1
                                                }
                                            }, markerSettings: {
                                                fill: 'red',
                                                size: 5
                                            }, axisSettings: {
                                                lineSettings: {
                                                    color: 'red',
                                                    width: 2
                                                }
                                            }, dataSource: [
                                                { x: 0, xval: 'AUDI', yval: 1847613 },
                                                { x: 1, xval: 'BMW', yval: 2030331 },
                                                { x: 2, xval: 'BUICK', yval: 1465823 },
                                                { x: 3, xval: 'CETROEN', yval: 999888 },
                                                { x: 4, xval: 'CHEVROLET', yval: 3857388 },
                                                { x: 5, xval: 'FIAT', yval: 1503806 },
                                                { x: 6, xval: 'FORD', yval: 5953122 },
                                                { x: 7, xval: 'HONDA', yval: 4967689 },
                                                { x: 8, xval: 'HYUNDAI', yval: 3951176 },
                                                { x: 9, xval: 'JEEP', yval: 1390130 },
                                                { x: 10, xval: 'KIA', yval: 2511293 },
                                                { x: 11, xval: 'MAZDA', yval: 1495557 },
                                                { x: 12, xval: 'MERCEDES', yval: 2834181 },
                                                { x: 13, xval: 'NISSAN', yval: 4834694 },
                                                { x: 14, xval: 'OPEL/VHALL', yval: 996559 },
                                                { x: 15, xval: 'PEUGEOT', yval: 1590300 },
                                                { x: 16, xval: 'RENAULT', yval: 2275227 },
                                                { x: 17, xval: 'SKODA', yval: 1180672 },
                                                { x: 18, xval: 'SUBARU', yval: 1050390 },
                                                { x: 19, xval: 'SUZUKI', yval: 2891415 },
                                                { x: 20, xval: 'TOYOTA', yval: 7843423 },
                                                { x: 21, xval: 'VOLKSWAGEN', yval: 6639250 },
                                            ], xName: 'xval', yName: 'yval' },
                                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] })))))))),
                React.createElement("div", { style: { "float": "right", "margin-right": "10px" } },
                    "Source: ",
                    React.createElement("a", { href: " http://carsalesbase.com/global-car-sales-2017", target: "_blank" }, "carsalesbase.com"))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", null,
                                    React.createElement("div", null, " Sparkline ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "spark", width: "100%", index: 0, change: this.sparklineChange.bind(this), ref: function (d) { return _this.sparklineElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' } })))),
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null, " Special Points ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("table", null,
                                        React.createElement("tr", null,
                                            React.createElement("td", { style: { "padding": "5px" } }, "All"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.allColorChange.bind(this), ref: function (d) { return _this.allElement = d; }, id: 'all', checked: true })),
                                            React.createElement("td", { style: { "padding": "5px" } }, "Negative"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.colorChange.bind(this), ref: function (d) { return _this.negativeElement = d; }, id: 'negative', disabled: true }))),
                                        React.createElement("tr", null,
                                            React.createElement("td", { style: { "padding": "5px" } }, "First"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.colorChange.bind(this), ref: function (d) { return _this.firstElement = d; }, id: 'first', disabled: true })),
                                            React.createElement("td", { style: { "padding": "5px" } }, "Last"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.colorChange.bind(this), ref: function (d) { return _this.lastElement = d; }, id: 'last', disabled: true }))),
                                        React.createElement("tr", null,
                                            React.createElement("td", { style: { "padding": "5px" } }, "High"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.colorChange.bind(this), ref: function (d) { return _this.highElement = d; }, id: 'high', disabled: true })),
                                            React.createElement("td", { style: { "padding": "5px" } }, "Low"),
                                            React.createElement("td", null,
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.colorChange.bind(this), ref: function (d) { return _this.lowElement = d; }, id: 'low', disabled: true })))))),
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null, " Marker ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.markerChange.bind(this), ref: function (d) { return _this.markerElement = d; }, id: 'marker', disabled: false })))),
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null, " Data Label ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.datalabelChange.bind(this), ref: function (d) { return _this.datalabelElement = d; }, id: 'datalabel', disabled: false })))),
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null, " EnableRTL ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.rtlChange.bind(this), ref: function (d) { return _this.rtlElement = d; }, id: 'rtl', disabled: false })))),
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null, " Tooltip ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.tooltipChange.bind(this), ref: function (d) { return _this.tooltipElement = d; }, id: 'tooltip', disabled: false })))),
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null, " Track Line ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.tracklineChange.bind(this), ref: function (d) { return _this.tracklineElement = d; }, id: 'trackline', disabled: false })))),
                            React.createElement("tr", { style: { "height": "30px" } },
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null, " Axis Line ")),
                                React.createElement("td", { style: { "width": "50%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.axislineChange.bind(this), ref: function (d) { return _this.axislineElement = d; }, id: 'axis1', disabled: false })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'axisval' },
                                        "Axis Value ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A00"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement("div", { className: "content-wrapper" },
                                        React.createElement("style", null,
                                            " ",
                                            slidercss,
                                            " "),
                                        React.createElement(ej2_react_inputs_1.SliderComponent, { change: this.axisChange.bind(this), ref: function (slider) { return _this.axisElement = slider; }, type: 'MinRange', step: 1, id: "axis", value: 0, min: 0, max: 10, style: { width: '100px' }, disabled: false })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the various customization options available in sparklines.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see various customization options available in sparklines. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices."))));
    };
    return Customization;
}(sample_base_1.SampleBase));
exports.Customization = Customization;
