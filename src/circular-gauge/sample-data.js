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
 * Sample for data sample
 */
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .imageStyle {\n        width: 16px;\n        height: 16px;\n        margin-top: 4px;\n    }\n        \n    .fontDes {\n        float: right;\n        padding-left: 5px;\n        color:#424242;\n        font-size:20px;\n        font-family:Roboto\";\n    }\n    .fontDes1 {\n        color:#9E9E9E;\n        font-size:16px;\n        font-family:Roboto\";\n    }\n    ";
var SampleData = (function (_super) {
    __extends(SampleData, _super);
    function SampleData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.orderData = [
            {
                'Country': 'Germany',
                'Sales': 500,
                'Target': 400,
                'vsTarget': 300
            }, {
                'Country': 'USA',
                'Sales': 1000,
                'Target': 600,
                'vsTarget': 360
            }, {
                'Country': 'UK',
                'Sales': 600,
                'Target': 700,
                'vsTarget': -100
            }
        ];
        return _this;
    }
    // custom code start
    SampleData.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    SampleData.prototype.onChartLoad = function (args) {
        var _this = this;
        this.dataInterval1 = setInterval(function () {
            var value1 = Math.round(Math.random() * (90 - 55) + 55);
            var value2 = Math.round(Math.random() * (75 - 60) + 60);
            var value3 = Math.round(Math.random() * (40 - 10) + 10);
            var gridData1 = 4 * value1;
            var gridData2 = 6 * value2;
            var gridData3 = 7 * value3;
            var newVal = Math.random() * (90 - 20) + 20;
            if (document.getElementById('sample1-container')) {
                _this.sampleGauge1.axes[0].pointers[0].animation.enable = true;
                _this.sampleGauge2.axes[0].pointers[0].animation.enable = true;
                _this.sampleGauge3.axes[0].pointers[0].animation.enable = true;
                _this.sampleGauge1.setPointerValue(0, 0, value1);
                _this.sampleGauge2.setPointerValue(0, 0, value2);
                _this.sampleGauge3.setPointerValue(0, 0, value3);
                _this.sampleGauge1.setAnnotationValue(0, 0, _this.sampleGauge1.axes[0].annotations[0].content);
                _this.sampleGauge2.setAnnotationValue(0, 0, _this.sampleGauge2.axes[0].annotations[0].content);
                _this.sampleGauge3.setAnnotationValue(0, 0, _this.sampleGauge3.axes[0].annotations[0].content);
                _this.orderData = [
                    {
                        'Country': 'Germany',
                        'Sales': 500,
                        'Target': 400,
                        'vsTarget': gridData1
                    }, {
                        'Country': 'USA',
                        'Sales': 1000,
                        'Target': 600,
                        'vsTarget': gridData2
                    }, {
                        'Country': 'UK',
                        'Sales': 600,
                        'Target': 700,
                        'vsTarget': -gridData3
                    }
                ];
            }
            else {
                clearInterval(+_this.dataInterval1);
            }
        }, 2000);
    };
    ;
    SampleData.prototype.onGridLoad = function (args) {
        var _this = this;
        this.dataInterval2 = setInterval(function () {
            if (document.getElementById('sample1-container')) {
                _this.grid1.dataSource = _this.orderData;
                _this.grid1.refresh();
            }
            else {
                clearInterval(+_this.dataInterval2);
            }
        }, 2000);
    };
    SampleData.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-12" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, ref: function (gauge) { return _this.sampleGauge1 = gauge; }, id: 'sample1-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: 0, maximum: 100, lineStyle: {
                                                width: 0
                                            }, majorTicks: {
                                                width: 0
                                            }, minorTicks: {
                                                width: 0
                                            }, labelStyle: {
                                                font: { size: '0' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for Germany"/><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="fontDes1">Germany</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 50, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 50, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 75, radius: '60%', animation: { enable: false }, color: '#777777', pointerWidth: 5, cap: {
                                                        radius: 6,
                                                        border: { width: 0 },
                                                        color: '#777777'
                                                    }, needleTail: {
                                                        length: '25%',
                                                        color: '#777777'
                                                    } })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, ref: function (gauge) { return _this.sampleGauge2 = gauge; }, id: 'sample2-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: 0, maximum: 100, lineStyle: {
                                                width: 0
                                            }, majorTicks: {
                                                width: 0
                                            }, minorTicks: {
                                                width: 0
                                            }, labelStyle: {
                                                font: { size: '0' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/positive.png" alt="Positive value for USA" /><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="fontDes1">USA</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 50, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 50, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 60, radius: '60%', animation: { enable: false }, color: '#777777', pointerWidth: 5, cap: {
                                                        radius: 6,
                                                        border: { width: 0 },
                                                        color: '#777777'
                                                    }, needleTail: {
                                                        length: '25%',
                                                        color: '#777777'
                                                    } })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, ref: function (gauge) { return _this.sampleGauge3 = gauge; }, loaded: this.onChartLoad.bind(this), id: 'sample3-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, minimum: 0, maximum: 100, lineStyle: {
                                                width: 0
                                            }, majorTicks: {
                                                width: 0
                                            }, minorTicks: {
                                                width: 0
                                            }, labelStyle: {
                                                font: { size: '0' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="templateWrap"><img class="imageStyle" src="src/circular-gauge/images/negative.png" alt="Negative value for UK" /><div class="fontDes">${pointers[0].value}%</div></div></div>', angle: 180, zIndex: '1', radius: '30%' }),
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="fontDes1">UK</div>', angle: 180, zIndex: '1', radius: '65%' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 50, startWidth: 15, endWidth: 15, color: '#EC121C' }),
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 50, end: 100, startWidth: 15, endWidth: 15, color: '#45EA0C' })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 25, radius: '60%', animation: { enable: false }, color: '#777777', pointerWidth: 5, cap: {
                                                        radius: 6,
                                                        border: { width: 0 },
                                                        color: '#777777'
                                                    }, needleTail: {
                                                        length: '25%',
                                                        color: '#777777'
                                                    } }))))))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-12" },
                        React.createElement("div", { className: "row" },
                            React.createElement(ej2_react_grids_1.GridComponent, { dataBound: this.onGridLoad.bind(this), ref: function (grid) { return _this.grid1 = grid; }, dataSource: this.orderData.slice(0, 30) },
                                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Country', headerText: 'Country', width: '80' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Sales', headerText: 'Sales $', width: '80' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Target', headerText: 'Target $', width: '80' }),
                                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'vsTarget', headerText: 'vs Target', width: '80' })))))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates the live data sample in circular gauge.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "Pointer values in the gauge can be updated dynamically by using\u00A0",
                        React.createElement("code", null, "setPointerValue"),
                        "\u00A0method. In this example, a stock price changes over the countries, are showed by using a gauge."),
                    React.createElement("p", null,
                        "More information on the gauge and its methods can be found in can be found in this",
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                        ".")))));
    };
    return SampleData;
}(sample_base_1.SampleBase));
exports.SampleData = SampleData;
