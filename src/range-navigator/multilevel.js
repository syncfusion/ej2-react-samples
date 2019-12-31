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
 * Sample for MultiLevel Labels Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data = [];
exports.value = 0;
exports.point = {};
for (var j = 1; j < 1090; j++) {
    exports.value += (Math.random() * 10 - 5);
    exports.value = exports.value < 0 ? Math.abs(exports.value) : exports.value;
    exports.point = { x: new Date(2000, 0, j), y: exports.value, z: exports.value + 10 };
    exports.data.push(exports.point);
}
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px;\n    }\n    #days {\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    ";
var MultilevelLabels = (function (_super) {
    __extends(MultilevelLabels, _super);
    function MultilevelLabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultilevelLabels.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "days" }, "Multi Level Labels")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', style: { textAlign: "center" }, labelPosition: 'Outside', valueType: 'DateTime', tooltip: { enable: true, displayMode: 'Always' }, intervalType: 'Quarter', enableGrouping: true, animationDuration: 500, groupBy: 'Years', load: this.load.bind(this), dataSource: exports.data, xName: 'x', yName: 'y', value: [new Date('2001-01-01'), new Date('2002-01-01')], width: ej2_base_1.Browser.isDevice ? '100%' : '80%' },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.RangeTooltip] }))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "Axis labels are placed based on the values of the start and end ranges. You can add higher level of labels to the range navigator using multilevel labels.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "In this example, you can see how to group the axis labels. Here the interval for the second level labels can be customized using ",
                        React.createElement("code", null, "groupBy"),
                        ".")))));
    };
    MultilevelLabels.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        args.rangeNavigator.dateTimeModule = new ej2_react_charts_1.DateTime(args.rangeNavigator);
    };
    ;
    return MultilevelLabels;
}(sample_base_1.SampleBase));
exports.MultilevelLabels = MultilevelLabels;
