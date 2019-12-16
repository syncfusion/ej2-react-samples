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
 * Liveupdate sample for sparkline
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .spark {\n        float: left;\n        width: 95%;\n        margin-left: 3%;\n    }\n    .index {\n        z-index: 1000;\n    }";
var LiveUpdate = /** @class */ (function (_super) {
    __extends(LiveUpdate, _super);
    function LiveUpdate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    LiveUpdate.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    LiveUpdate.prototype.updateSparkline1 = function (args) {
        var _this = this;
        setTimeout(function () {
            if (_this.sparkInstance == null)
                _this.sparkInstance = args.sparkline;
            if (_this.temp1 == null)
                _this.temp1 = _this.sparkInstance.dataSource.length - 1;
            if (_this.timer1 != null)
                clearInterval(_this.timer1);
            _this.timer1 = setInterval(_this.update(), 500);
        }, 500);
    };
    LiveUpdate.prototype.updateSparkline2 = function (args) {
        var _this = this;
        setTimeout(function () {
            if (_this.sparkInstance1 == null)
                _this.sparkInstance1 = args.sparkline;
            if (_this.temp3 == null)
                _this.temp3 = _this.sparkInstance1.dataSource.length - 1;
            if (_this.timer2 != null)
                clearInterval(_this.timer2);
            _this.timer2 = setInterval(_this.update2(), 500);
        }, 500);
    };
    LiveUpdate.prototype.updateSparkline3 = function (args) {
        var _this = this;
        setTimeout(function () {
            if (_this.sparkInstance2 == null)
                _this.sparkInstance2 = args.sparkline;
            if (_this.temp2 == null)
                _this.temp2 = _this.sparkInstance2.dataSource.length - 1;
            if (_this.timer3 != null)
                clearInterval(_this.timer3);
            _this.timer3 = setInterval(_this.update1(), 500);
        }, 500);
    };
    LiveUpdate.prototype.updateSparkline4 = function (args) {
        var _this = this;
        setTimeout(function () {
            if (_this.sparkInstance3 == null)
                _this.sparkInstance3 = args.sparkline;
            if (_this.temp4 == null)
                _this.temp4 = _this.sparkInstance3.dataSource.length - 1;
            if (_this.timer4 != null)
                clearInterval(_this.timer4);
            _this.timer4 = setInterval(_this.update4(), 500);
        }, 500);
    };
    LiveUpdate.prototype.update = function () {
        if (this.sparkInstance.element.className.indexOf('e-sparkline') > -1) {
            var value = ((Math.random() * 100) + 5) % 50;
            this.sparkInstance.dataSource.push({ x: ++this.temp1, yval: value });
            this.sparkInstance.dataSource.shift();
            this.sparkInstance.refresh();
            var cpu = document.getElementById('cpu');
            cpu.innerHTML = ((value / 150) * 100).toFixed(0) + '% ' + ((value * 3) / 100).toFixed(2) + 'GHz';
        }
    };
    LiveUpdate.prototype.update2 = function () {
        if (this.sparkInstance1.element.className.indexOf('e-sparkline') > -1) {
            var value = ((Math.random() * 100) + 5) % 80;
            this.sparkInstance1.dataSource.push({ x: ++this.temp3, yval: value });
            this.sparkInstance1.dataSource.shift();
            this.sparkInstance1.refresh();
            var disk = document.getElementById('disk');
            disk.innerHTML = value.toFixed(0) + '%';
        }
    };
    LiveUpdate.prototype.update1 = function () {
        if (this.sparkInstance2.element.className.indexOf('e-sparkline') > -1) {
            var value = Math.random();
            if (value > 0.6) {
                value = 6 + (value / 10);
            }
            else {
                value = 6 - (value / 10);
            }
            this.sparkInstance2.dataSource.push({ x: ++this.temp2, yval: value });
            this.sparkInstance2.dataSource.shift();
            this.sparkInstance2.refresh();
            var memory = document.getElementById('memory');
            var gb = parseFloat(value.toString().replace('0', '')).toFixed(1);
            memory.innerHTML = gb + '/15.8 GB (' + ((value / 15.8) * 100).toFixed(0) + '%)';
        }
    };
    LiveUpdate.prototype.update4 = function () {
        if (this.sparkInstance3.element.className.indexOf('e-sparkline') > -1) {
            var value = ((Math.random() * 100) + 5) % 80;
            this.sparkInstance3.dataSource.push({ x: ++this.temp3, yval: value });
            this.sparkInstance3.dataSource.shift();
            this.sparkInstance3.refresh();
            var net = document.getElementById('net');
            net.innerHTML = 'R: ' + value.toFixed(0) + 'Kbps';
        }
    };
    LiveUpdate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section', style: { "align": "center" } },
                React.createElement("div", { id: 'spark-container', className: "row" },
                    React.createElement("div", { className: "cols-sample-area", style: { "align": "center", "margin-top": "8%" } },
                        React.createElement("div", { style: { "align": "center" }, className: "col-lg-3 col-m-3 col-sm-6" },
                            React.createElement("div", { style: { "align": "center" }, className: "spark", id: "spark-container1" },
                                React.createElement("div", { className: "index", style: { "color": "#000000", "font-size": "12px", "position": "absolute", "margin-top": "10px", "margin-left": "8%" } },
                                    React.createElement("b", null, "CPU")),
                                React.createElement("div", { id: "cpu", className: "index", style: { "color": "#0877d6", "position": "absolute", "margin-top": "25px", "margin-left": "8%" } }, "26% 1.2GHz"),
                                React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: this.updateSparkline1.bind(this), load: this.load.bind(this), ref: function (m) { return _this.sparkInstance = m; }, id: 'spark1-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#e8f2fc', axisSettings: {
                                        minY: 0,
                                        maxY: 150
                                    }, containerArea: {
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }, border: {
                                        color: '#0358a0',
                                        width: 1
                                    }, dataSource: [
                                        { x: 0, yval: 50 },
                                        { x: 1, yval: 30 },
                                        { x: 2, yval: 20 },
                                        { x: 3, yval: 30 },
                                        { x: 4, yval: 50 },
                                        { x: 5, yval: 40 },
                                        { x: 6, yval: 20 },
                                        { x: 7, yval: 10 },
                                        { x: 8, yval: 30 },
                                        { x: 9, yval: 10 },
                                        { x: 10, yval: 40 },
                                        { x: 11, yval: 50 },
                                        { x: 12, yval: 10 },
                                        { x: 13, yval: 30 },
                                        { x: 14, yval: 50 },
                                        { x: 15, yval: 20 },
                                        { x: 16, yval: 10 },
                                        { x: 17, yval: 40 },
                                        { x: 18, yval: 30 },
                                        { x: 19, yval: 40 }
                                    ], xName: 'x', yName: 'yval' }))),
                        React.createElement("div", { style: { "align": "center" }, className: "col-lg-3 col-m-3 col-sm-6" },
                            React.createElement("div", { style: { "align": "center" }, className: "spark", id: "spark-container2" },
                                React.createElement("div", { className: 'index', style: { "color": "#000000", "font-size": "12px", "position": "absolute", "margin-top": "10px", "margin-left": "8%" } },
                                    React.createElement("b", null, "Disk")),
                                React.createElement("div", { id: "disk", className: "index", style: { "color": "#b247c6", "position": "absolute", "margin-top": "25px", "margin-left": "8%" } }, "50%"),
                                React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: this.updateSparkline2.bind(this), load: this.load.bind(this), ref: function (m) { return _this.sparkInstance2 = m; }, id: 'spark2-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#f5e8fc', axisSettings: {
                                        minY: 4,
                                        maxY: 8
                                    }, containerArea: {
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }, border: {
                                        color: '#b247c6',
                                        width: 1
                                    }, dataSource: [
                                        { x: 0, yval: 6.05 },
                                        { x: 1, yval: 6.03 },
                                        { x: 2, yval: 6.02 },
                                        { x: 3, yval: 6.07 },
                                        { x: 4, yval: 6.05 },
                                        { x: 5, yval: 6.09 },
                                        { x: 6, yval: 6.08 },
                                        { x: 7, yval: 6.01 },
                                        { x: 8, yval: 6.03 },
                                        { x: 9, yval: 6.01 },
                                        { x: 10, yval: 6.07 },
                                        { x: 11, yval: 6.05 },
                                        { x: 12, yval: 6.01 },
                                        { x: 13, yval: 6.06 },
                                        { x: 14, yval: 6.05 },
                                        { x: 15, yval: 6.03 },
                                        { x: 16, yval: 6.01 },
                                        { x: 17, yval: 6.09 },
                                        { x: 18, yval: 6.06 },
                                        { x: 19, yval: 6.05 }
                                    ], xName: 'x', yName: 'yval' }))),
                        React.createElement("div", { style: { "align": "center" }, className: "col-lg-3 col-m-3 col-sm-6" },
                            React.createElement("div", { style: { "align": "center" }, className: "spark", id: "spark-container3" },
                                React.createElement("div", { className: "index", style: { "color": "#000000", "font-size": "12px", "position": "absolute", "margin-top": "10px", "margin-left": "8%" } },
                                    React.createElement("b", null, "Memory")),
                                React.createElement("div", { id: "memory", className: "index", style: { "color": "#5bcc8f", "position": "absolute", "margin-top": "25px", "margin-left": "8%" } }, "6.5/15.8 GB (41%)"),
                                React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: this.updateSparkline3.bind(this), load: this.load.bind(this), ref: function (m) { return _this.sparkInstance1 = m; }, id: 'spark3-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#e0f9d1', axisSettings: {
                                        minY: 0,
                                        maxY: 130
                                    }, containerArea: {
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }, border: {
                                        color: '#27ad66',
                                        width: 1
                                    }, dataSource: [
                                        { x: 0, yval: 50 },
                                        { x: 1, yval: 30 },
                                        { x: 2, yval: 20 },
                                        { x: 3, yval: 70 },
                                        { x: 4, yval: 50 },
                                        { x: 5, yval: 20 },
                                        { x: 6, yval: 80 },
                                        { x: 7, yval: 10 },
                                        { x: 8, yval: 30 },
                                        { x: 9, yval: 10 },
                                        { x: 10, yval: 70 },
                                        { x: 11, yval: 50 },
                                        { x: 12, yval: 10 },
                                        { x: 13, yval: 60 },
                                        { x: 14, yval: 50 },
                                        { x: 15, yval: 30 },
                                        { x: 16, yval: 10 },
                                        { x: 17, yval: 20 },
                                        { x: 18, yval: 60 },
                                        { x: 19, yval: 50 }
                                    ], xName: 'x', yName: 'yval' }))),
                        React.createElement("div", { style: { "align": "center" }, className: "col-lg-3 col-m-3 col-sm-6" },
                            React.createElement("div", { style: { "align": "center" }, className: "spark", id: "spark-container4" },
                                React.createElement("div", { className: "index", style: { "color": "#000000", "font-size": "12px", "position": "absolute", "margin-top": "10px", "margin-left": "8%" } },
                                    React.createElement("b", null, "Ethernet")),
                                React.createElement("div", { id: "net", className: "index", style: { "color": "#d1a990", "position": "absolute", "margin-top": "25px", "margin-left": "8%" } }, "6.5/15.8 GB (41%)"),
                                React.createElement(ej2_react_charts_1.SparklineComponent, { loaded: this.updateSparkline4.bind(this), load: this.load.bind(this), ref: function (m) { return _this.sparkInstance3 = m; }, id: 'spark4-container', height: '130px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Numeric', fill: '#F2D8C7', axisSettings: {
                                        minY: 0,
                                        maxY: 120
                                    }, containerArea: {
                                        background: 'white',
                                        border: {
                                            color: '#dcdfe0',
                                            width: 2
                                        }
                                    }, border: {
                                        color: '#AA907A',
                                        width: 1
                                    }, dataSource: [
                                        { x: 0, yval: 50 },
                                        { x: 1, yval: 30 },
                                        { x: 2, yval: 20 },
                                        { x: 3, yval: 70 },
                                        { x: 4, yval: 50 },
                                        { x: 5, yval: 20 },
                                        { x: 6, yval: 80 },
                                        { x: 7, yval: 10 },
                                        { x: 8, yval: 30 },
                                        { x: 9, yval: 10 },
                                        { x: 10, yval: 70 },
                                        { x: 11, yval: 50 },
                                        { x: 12, yval: 10 },
                                        { x: 13, yval: 60 },
                                        { x: 14, yval: 50 },
                                        { x: 15, yval: 30 },
                                        { x: 16, yval: 10 },
                                        { x: 17, yval: 20 },
                                        { x: 18, yval: 60 },
                                        { x: 19, yval: 50 }
                                    ], xName: 'x', yName: 'yval' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the various customization options available in sparklines.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see various customization options available in sparklines. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices."))));
    };
    return LiveUpdate;
}(sample_base_1.SampleBase));
exports.LiveUpdate = LiveUpdate;
