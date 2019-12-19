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
var Holidays = (function (_super) {
    __extends(Holidays, _super);
    function Holidays() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    Holidays.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Holidays', dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.HolidaysDirective, null,
                        React.createElement(ej2_react_gantt_1.HolidayDirective, { from: '04/04/2019', to: '04/04/2019', label: 'Local Holiday' }),
                        React.createElement(ej2_react_gantt_1.HolidayDirective, { from: '04/19/2019', to: '04/19/2019', label: 'Good Friday' }),
                        React.createElement(ej2_react_gantt_1.HolidayDirective, { from: '04/30/2019', to: '04/30/2019', label: 'Release Holiday' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes how to define the holidays in between the project timeline. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example,",
                    React.createElement("code", null, " holidays "),
                    " are displayed with vertical bar with the desired text using the ",
                    React.createElement("code", null, "label"),
                    " property. You can also mention the continuous holidays by specifying the ",
                    React.createElement("code", null, "from"),
                    " and ",
                    React.createElement("code", null, "to"),
                    " range. For single holiday, you can define from value alone. Holidays are defined as an array of object collection, so that we can display more than one holiday in the project."),
                React.createElement("p", null,
                    "You can even assign the ",
                    React.createElement("code", null, "cssClass"),
                    " to each holiday to change the default color of label and background."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                    React.createElement("code", null, "Selection"),
                    ", ",
                    React.createElement("code", null, "DayMarkers"),
                    " modules."))));
    };
    return Holidays;
}(sample_base_1.SampleBase));
exports.Holidays = Holidays;
