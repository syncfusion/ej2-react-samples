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
 * Rangeband sample for sparkline
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
var data_source_1 = require("./data-source");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    td{\n        padding: 10px;\n    }\n    .e-headertext{\n        font-weight: bolder;\n    }\n    #range-min > * {\n        padding: 0px !important;\n    }\n    #range-max > * {\n        padding: 0px !important;\n    }";
var RangeBand = (function (_super) {
    __extends(RangeBand, _super);
    function RangeBand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // custom code end
        _this.lineData = [
            [0, 6, 4, 1, 3, 2, 5],
            [5, 4, 6, 3, 1, 2, 0],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6],
            [2, 4, 0, 3, 5, 6, 1],
            [5, 4, 6, 3, 1, 2, 0],
            [0, 6, 4, 1, 3, 2, 5],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6],
            [2, 4, 0, 3, 5, 6, 1],
            [5, 4, 6, 3, 1, 2, 0],
            [0, 6, 4, 1, 3, 2, 5],
            [6, 4, 0, 3, 2, 5, 1],
            [4, 6, 3, 0, 1, 2, 5],
            [2, 4, 0, 3, 5, 6, 1],
            [3, 5, 6, 4, 0, 1, 2],
            [1, 3, 4, 2, 5, 0, 6]
        ];
        _this.minChange = function () {
            var value = parseInt(_this.minElement.value.toString(), 10);
            _this.changeRangeMin(value);
        };
        _this.maxChange = function () {
            var value = parseInt(_this.maxElement.value.toString(), 10);
            _this.changeRangeMax(value);
        };
        _this.changeRangeMin = function (min) {
            for (var i = 1; i < 6; i++) {
                var first = ej2_base_1.getInstance('#sparkline2010' + i, ej2_react_charts_1.Sparkline);
                var second = ej2_base_1.getInstance('#sparkline2011' + i, ej2_react_charts_1.Sparkline);
                first.rangeBandSettings[0].startRange = min;
                second.rangeBandSettings[0].startRange = min;
                document.getElementById('range1').innerHTML = 'Range Band Min <span>' + _this.minElement.value;
                first.refresh();
                second.refresh();
            }
        };
        _this.changeRangeMax = function (max) {
            for (var i = 1; i < 6; i++) {
                var first = ej2_base_1.getInstance('#sparkline2010' + i, ej2_react_charts_1.Sparkline);
                var second = ej2_base_1.getInstance('#sparkline2011' + i, ej2_react_charts_1.Sparkline);
                first.rangeBandSettings[0].endRange = max;
                second.rangeBandSettings[0].endRange = max;
                document.getElementById('range2').innerHTML = 'Range Band Max <span>' + _this.maxElement.value;
                first.refresh();
                second.refresh();
            }
        };
        return _this;
    }
    // custom code start
    RangeBand.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    RangeBand.prototype.renderSparkline = function () {
        var _this = this;
        var sparkline = {
            height: '50px',
            width: '150px',
            lineWidth: 2,
            fill: '#0d3c9b',
            dataSource: this.lineData[0],
            rangeBandSettings: [{ startRange: 1, endRange: 3, color: '#bfd4fc' }]
        };
        setTimeout(function () {
            for (var i = 1; i < 6; i++) {
                var first = new ej2_react_charts_1.SparklineComponent(sparkline);
                first.dataSource = _this.lineData[i];
                first.appendTo('#sparkline2010' + i);
                var second = new ej2_react_charts_1.SparklineComponent(sparkline);
                second.dataSource = _this.lineData[i + 5];
                second.appendTo('#sparkline2011' + i);
            }
        }, 500);
    };
    RangeBand.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-md-8 control-section' },
                React.createElement("div", { style: { "font-size": "16px", "textAlign": "center" } }, "Sales Growth Comparison with various Products"),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_source_1.products, resizing: this.renderSparkline.bind(this), load: this.renderSparkline.bind(this), height: '400', allowSelection: false, enableHover: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', headerText: 'Name', textAlign: 'Right', width: '50' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: '2010', template: function (props) {
                                return (React.createElement("div", { id: "sparkline2010" + props.id }));
                            }, textAlign: 'Center', width: '100' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'One Day Index', template: function (props) {
                                return (React.createElement("div", { id: "sparkline2011" + props.id }));
                            }, textAlign: 'Center', width: '100' })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'range1' },
                                        "Range Band Min ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A01"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inputs_1.SliderComponent, { type: 'MinRange', change: this.minChange.bind(this), ref: function (slider) { return _this.minElement = slider; }, step: 1, id: "range-min", value: 1, min: 0, max: 6, style: { width: '100px' } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { id: 'range2' },
                                        "Range Band Max ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A03"),
                                        " ")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inputs_1.SliderComponent, { type: 'MinRange', change: this.maxChange.bind(this), ref: function (slider) { return _this.maxElement = slider; }, step: 1, id: "range-max", value: 3, min: 0, max: 6, style: { width: '100px' } }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the range band feature and its customization options available in sparklines.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render sparkline with range band and the customization options available in range band. Here, the sparklines are placed inside the data grid control."))));
    };
    return RangeBand;
}(sample_base_1.SampleBase));
exports.RangeBand = RangeBand;
