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
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./indicators.css");
var Indicators = /** @class */ (function (_super) {
    __extends(Indicators, _super);
    function Indicators() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            indicators: 'Indicators'
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    Indicators.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Indicators', dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes how to mention special moment in any mentioned day for a particular task with different icon and label.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, ",
                    React.createElement("code", null, "indicators"),
                    " are displayed with some custom text in specified day of task, which are defined in dataSource. You can define the indicators with the following properties for tasks:",
                    React.createElement("li", null,
                        React.createElement("code", null, "date"),
                        ": Defines the date value to where we want to display the indicators."),
                    React.createElement("li", null,
                        React.createElement("code", null, "iconClass "),
                        ": Defines the icon to highlight the indicator."),
                    React.createElement("li", null,
                        React.createElement("code", null, "name"),
                        ": Defines text to be displayed in the mentioned date."),
                    React.createElement("li", null,
                        React.createElement("code", null, "tooltip"),
                        ": The text to be displayed when hover the mouse over the indicator.")),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                    React.createElement("code", null, "Selection"),
                    ", ",
                    React.createElement("code", null, "DayMarkers"),
                    " modules."))));
    };
    return Indicators;
}(sample_base_1.SampleBase));
exports.Indicators = Indicators;
