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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ReorderColumn = (function (_super) {
    __extends(ReorderColumn, _super);
    function ReorderColumn() {
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
        _this.columnNames = [
            { id: 'TaskID', name: 'ID' },
            { id: 'TaskName', name: 'Name' },
            { id: 'StartDate', name: 'Start Date' },
            { id: 'EndDate', name: 'End Date' },
            { id: 'Duration', name: 'Duration' },
            { id: 'Progress', name: 'Progress' },
            { id: 'Predecessor', name: 'Dependency' }
        ];
        _this.columnsIndex = [
            { id: '0', name: '1' },
            { id: '1', name: '2' },
            { id: '2', name: '3' },
            { id: '3', name: '4' },
            { id: '4', name: '5' },
            { id: '5', name: '6' },
            { id: '6', name: '7' }
        ];
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
    ReorderColumn.prototype.columnNameChange = function (args) {
        var columnName = args.value.toString();
        var index = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
        this.columnIndexDropdownObj.value = index.toString();
    };
    ReorderColumn.prototype.columnIndexChange = function (args) {
        var columnName = this.columnsDropdownObj.value.toString();
        var toColumnIndex = args.value;
        var column = this.ganttObj.treeGrid.columns[toColumnIndex];
        this.ganttObj.reorderColumns(columnName, column.field);
    };
    ReorderColumn.prototype.actionComplete = function (args) {
        if (args.requestType === 'reorder') {
            var columnName = this.columnsDropdownObj.value;
            var index = this.ganttObj.treeGrid.getColumnIndexByField(columnName);
            this.columnIndexDropdownObj.value = index.toString();
        }
    };
    ReorderColumn.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ReorderColumn', treeColumnIndex: 1, allowReordering: true, ref: function (gantt) { return _this.ganttObj = gantt; }, splitterSettings: this.splitterSettings, actionComplete: this.actionComplete.bind(this), dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                        React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '100' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', headerText: 'Dependency' })),
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Reorder] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Column ")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columns", change: this.columnNameChange.bind(this), dataSource: this.columnNames, fields: { text: 'name', value: 'id' }, value: "TaskID", ref: function (dropdown) { return _this.columnsDropdownObj = dropdown; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, " Column Index ")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columnindex", change: this.columnIndexChange.bind(this), dataSource: this.columnsIndex, fields: { text: 'name', value: 'id' }, value: "0", ref: function (dropdown) { return _this.columnIndexDropdownObj = dropdown; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the reordering feature of the Gantt columns. Select column name and index from properties panel to reorder the columns. You can also reorder columns by simply dragging and dropping them to the desired position.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Reordering can be enabled by setting the ",
                    React.createElement("code", null, "allowReordering"),
                    " property to true. Reordering can be done by dragging and dropping the column header from one index to another index within the TreeGrid part."),
                React.createElement("p", null, "The location in which the column to be placed will be indicated by two arrows symbols."),
                React.createElement("p", null, "In this demo, you can either reorder columns by dragging and dropping or by selecting column name and column index from dropdown to reorder the columns."),
                React.createElement("b", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Gantt features are segregated into individual feature-wise modules. To use reordering feature, we need to inject ",
                    React.createElement("code", null, "Reorder"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null, "More information about Column Reorder can be found in this documentation section."))));
    };
    return ReorderColumn;
}(sample_base_1.SampleBase));
exports.ReorderColumn = ReorderColumn;
