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
var Sorting = (function (_super) {
    __extends(Sorting, _super);
    function Sorting() {
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
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.sortSettings = {
            columns: [{ field: 'TaskName', direction: 'Ascending' }, { field: 'TaskID', direction: 'Ascending' }]
        };
        _this.projectStartDate = new Date('03/25/2019');
        _this.projectEndDate = new Date('07/28/2019');
        return _this;
    }
    Sorting.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Sorting', dataSource: data_1.editingData, highlightWeekends: true, allowSelection: true, taskFields: this.taskFields, splitterSettings: this.splitterSettings, labelSettings: this.labelSettings, height: '410px', selectedRowIndex: 0, sortSettings: this.sortSettings, allowSorting: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Sort] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Gantt multi-sorting feature. To sort two or more columns, hold the CTRL key, and click the column header.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The sorting feature enables you to order data in a particular direction. It can be enabled by setting ",
                    React.createElement("code", null, "allowSorting"),
                    " to true."),
                React.createElement("p", null, "To sort a Gantt column, click the column header. The icons (ascending) and (descending) specifies the sort direction of a column."),
                React.createElement("p", null,
                    "By default, the multi-sorting feature is enabled in Gantt. To sort multiple columns, hold the ",
                    React.createElement("strong", null, "CTRL"),
                    " key, and then click the column header. To clear sort for a column, hold the ",
                    React.createElement("strong", null, "SHIFT"),
                    " key, and then click the column header."),
                React.createElement("p", null,
                    "In this demo, multiple sorting enabled on load time by assigning multiple columns into ",
                    React.createElement("code", null, "sortSettings"),
                    " property."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Selection)"),
                    " method. To use sort, inject the",
                    React.createElement("code", null, "Sort"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Sort)"),
                    " method.To use markers, inject the",
                    React.createElement("code", null, "DayMarkers"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                    " method."))));
    };
    return Sorting;
}(sample_base_1.SampleBase));
exports.Sorting = Sorting;
