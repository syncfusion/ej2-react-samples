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
 * Sample for Light Weight Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data_service_1 = require("./data-service");
var sample_base_1 = require("../common/sample-base");
exports.data = data_service_1.GetDateTimeData(new Date(2018, 0, 1), new Date(2019, 0, 1));
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .tableStyle{\n        transform:translateX(75%);\n        margin-top:20px;\n        text-align:center;font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px;\n    }\n    #rangenavigator {\n        transform: translate(0, 25%);\n    }\n    #days {\n        font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px;\n    }\n    #working{\n        width: 150px;\n    }\n    #weekend{\n        width: 150px;\n    }\n    #workingcount{\n        width: 25px;\n    }\n    #weekendcount{\n        width: 25px;\n    }\n    #holiday {\n        padding-left: 20px;\n    }\n    ";
var LightWeight = /** @class */ (function (_super) {
    __extends(LightWeight, _super);
    function LightWeight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LightWeight.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { id: "days", style: { textAlign: "center" } }, "Calculate the Business and Weekend days in a period"),
                    React.createElement("div", { id: "datetime" })),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', style: { textAlign: "center" }, valueType: 'DateTime', intervalType: 'Months', labelFormat: 'MMM', height: '52', navigatorStyleSettings: {
                            thumb: {
                                type: 'Rectangle'
                            },
                        }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', value: [new Date('2018-06-01'), new Date('2018-07-01')], dataSource: exports.data, xName: 'x', yName: 'y', changed: this.changed.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime] }))),
                React.createElement("div", { className: "row" },
                    React.createElement("table", { className: "tableStyle" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { id: "working1" },
                                    React.createElement("table", null,
                                        React.createElement("tbody", null,
                                            React.createElement("tr", null,
                                                React.createElement("td", { id: "working" }, "Total Business Days:"),
                                                React.createElement("td", { id: "workingcount" }))))),
                                React.createElement("td", { id: "holiday" },
                                    React.createElement("table", null,
                                        React.createElement("tbody", null,
                                            React.createElement("tr", null,
                                                React.createElement("td", { id: "weekend" }, "Total Weekend Days: "),
                                                React.createElement("td", { id: "weekendcount" })))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample represents the total number of business and weekend days in a selected period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a light-weight range navigator without series. You can use ",
                    React.createElement("code", null, "width"),
                    ", ",
                    React.createElement("code", null, "height"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " and ",
                    React.createElement("code", null, "boder"),
                    " properties to customize the ",
                    React.createElement("code", null, "thumb"),
                    " in range navigator. You can also change the type of the thumb using ",
                    React.createElement("code", null, "type"),
                    " property."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The range navigator component features are segregated into individual feature-wise modules. To use date-time axis, inject the",
                    React.createElement("code", null, "DateTime"),
                    " module using the",
                    React.createElement("code", null, "RangeNavigator.Inject(DateTime)"),
                    " method."))));
    };
    LightWeight.prototype.changed = function (args) {
        var currentDate = new Date(+args.start);
        var workingDaysCount = 0;
        var holidaysDaysCount = 0;
        while (currentDate <= new Date(+args.end)) {
            if (currentDate.getDay() > 0 && currentDate.getDay() <= 5) {
                workingDaysCount++;
            }
            else {
                holidaysDaysCount++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        document.getElementById('workingcount').innerHTML = ' ' + workingDaysCount;
        document.getElementById('weekendcount').innerHTML = ' ' + holidaysDaysCount;
    };
    ;
    // custom code start
    LightWeight.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return LightWeight;
}(sample_base_1.SampleBase));
exports.LightWeight = LightWeight;
