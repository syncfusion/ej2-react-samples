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
var EventMarkers = /** @class */ (function (_super) {
    __extends(EventMarkers, _super);
    function EventMarkers() {
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
        _this.eventMarkerDay1 = new Date('04/02/2019');
        _this.eventMarkerDay2 = new Date('04/09/2019');
        _this.eventMarkerDay3 = new Date('04/19/2019');
        _this.eventMarkerDay4 = new Date('05/23/2019');
        _this.eventMarkerDay5 = new Date('06/20/2019');
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    EventMarkers.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'EventMarkers', dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay1 }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay2, label: 'Design phase' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay3, label: 'Research phase' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay4, label: 'Production phase' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay5, label: 'Sales and marketing phase' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes how to notify the important dates in the project timeline.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the ",
                    React.createElement("code", null, "eventMarkers"),
                    " are used like a bookmark to show the different stages of the project life cycle. You can show the desired text on the date. The Event Markers model has the below properties to customize the marker:",
                    React.createElement("li", null,
                        React.createElement("code", null, "cssClass"),
                        ": Used to assign external CSS styles to that particular marker."),
                    React.createElement("li", null,
                        React.createElement("code", null, "day"),
                        ": Used to set date of the event marker."),
                    React.createElement("li", null,
                        React.createElement("code", null, "label"),
                        ": The desired text can be shown on the vertical line using this property.")),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the",
                    React.createElement("code", null, "Selection"),
                    ", ",
                    React.createElement("code", null, "DayMarkers"),
                    " modules."))));
    };
    return EventMarkers;
}(sample_base_1.SampleBase));
exports.EventMarkers = EventMarkers;
