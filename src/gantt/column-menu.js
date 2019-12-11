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
var GanttColumnMenu = /** @class */ (function (_super) {
    __extends(GanttColumnMenu, _super);
    function GanttColumnMenu() {
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
            columnIndex: 4
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    GanttColumnMenu.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', treeColumnIndex: 1, showColumnMenu: true, allowFiltering: true, allowSorting: true, allowResizing: true, dataSource: data_1.projectNewData, highlightWeekends: true, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '100' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Dependency' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Filter, ej2_react_gantt_1.Sort, ej2_react_gantt_1.Resize, ej2_react_gantt_1.ColumnMenu] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the  column menu. Click on multiple icon of each column to open the column menu.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Gantt has an option to show column menu while clicking multiple icon of each column. The column menu has an integrated option to interact with the features such as sorting, filtering, column chooser, and autoFit. This feature can be enabled by setting ",
                    React.createElement("code", null, "showColumnMenu"),
                    " to true. The default items are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "SortAscending"),
                        " - Sorts the current column in ascending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "SortDescending"),
                        " - Sorts the current column in descending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "AutoFit"),
                        " - Auto-fit current column."),
                    React.createElement("li", null,
                        React.createElement("code", null, "AutoFitAll"),
                        " - Auto-fit all columns."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ColumnChooser"),
                        " - Chooses the column visibility."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Filter"),
                        " - Filters the current column.")),
                React.createElement("p", null,
                    "In this demo, the column menu feature is enabled by setting ",
                    React.createElement("code", null, "showColumnMenu"),
                    " to true with sorting, filtering, column chooser, and autoFit options."),
                React.createElement("b", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Gantt features are segregated into individual feature-wise modules. To use column menu feature, we need to inject ",
                    React.createElement("code", null, "ColumnMenu"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information about column menu can be found in this documentation section."))));
    };
    return GanttColumnMenu;
}(sample_base_1.SampleBase));
exports.GanttColumnMenu = GanttColumnMenu;
