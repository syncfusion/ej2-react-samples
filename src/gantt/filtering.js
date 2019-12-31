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
var Filtering = (function (_super) {
    __extends(Filtering, _super);
    function Filtering() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.projectStartDate = new Date('07/16/1969 01:00:00 AM');
        _this.projectEndDate = new Date('07/25/1969');
        _this.timelineSettings = {
            timelineUnitSize: 60,
            topTier: {
                format: 'MMM dd, yyyy',
                unit: 'Day',
            },
            bottomTier: {
                unit: 'Hour',
                format: 'h.mm a'
            },
        };
        _this.splitterSettings = {
            columnIndex: 3
        };
        _this.toolbar = ['Search'];
        _this.dayWorkingTime = [{ from: 0, to: 24 }];
        _this.labelSettings = {
            rightLabel: 'TaskName'
        };
        return _this;
    }
    Filtering.prototype.actionCompleteEvent = function (args) {
        if (args.requestType == "filterafteropen" && (args.columnName === "StartDate" || args.columnName === "EndDate")) {
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].min = new Date(1969, 5, 1);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].max = new Date(1969, 8, 30);
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].showTodayButton = false;
            args.filterModel.dlgDiv.querySelector('.e-datetimepicker').ej2_instances[0].dataBind();
        }
    };
    Filtering.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Filtering', dataSource: data_1.filteredData, durationUnit: 'Hour', treeColumnIndex: 0, toolbar: this.toolbar, allowFiltering: true, includeWeekend: true, allowSorting: true, dateFormat: 'MM/dd/yyyy hh:mm:ss', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, timelineSettings: this.timelineSettings, splitterSettings: this.splitterSettings, labelSettings: this.labelSettings, dayWorkingTime: this.dayWorkingTime, height: '410px', actionComplete: this.actionCompleteEvent.bind(this) },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerText: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Predecessor' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Filter, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Selection] })),
                React.createElement("div", { style: { float: 'right', margin: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Apollo_11#Launch_and_flight_to_lunar_orbit", target: '_blank' }, "https://en.wikipedia.org/"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the manned lunar mission, which landed the first human on the Moon using the Apollo 11 spacecraft in the year 1969. This sample demonstrates the Filtering feature available in Gantt chart. You can filter a particular column using filter menu available in the columns. This sample is also enabled with toolbar searching option, using which you can filter the Gantt content across all the columns.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The filtering feature enables the user to view reduced amount of records based on filter criteria. The column menu filtering can be enabled by setting ",
                    React.createElement("code", null, "allowFiltering"),
                    " property as ",
                    React.createElement("code", null, "true"),
                    " and toolbar search box can be enabled by including the search item in the ",
                    React.createElement("code", null, "toolbar"),
                    " property. Gantt chart also provides support for a set of filtering modes with ",
                    React.createElement("code", null, "hierarchyMode"),
                    " property. The below are the type of filter mode available in Gantt chart.",
                    React.createElement("li", null,
                        React.createElement("code", null, "Parent"),
                        " - This is the default filter hierarchy mode in Gantt chart. The filtered records are displayed with its parent records, if the filtered records not have any parent record then the filtered record alone will be displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Child"),
                        " - The filtered records are displayed with its child record, if the filtered records do not have any child record then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - The filtered records are displayed with its both parent and child record. If the filtered records do not have any parent and child record then only the filtered records are displayed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Only the filtered records are displayed.")),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use filtering feature, we need to inject ",
                    React.createElement("code", null, "Filter"),
                    " module, and use the toolbar support we need to inject ",
                    React.createElement("code", null, "Toolbar"),
                    " module. To use a selection, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module."))));
    };
    return Filtering;
}(sample_base_1.SampleBase));
exports.Filtering = Filtering;
