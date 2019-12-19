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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ShowHideColumn = (function (_super) {
    __extends(ShowHideColumn, _super);
    function ShowHideColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnsName = [
            { id: 'TaskID', name: 'ID' },
            { id: 'StartDate', name: 'Start Date' },
            { id: 'EndDate', name: 'End Date' },
            { id: 'Duration', name: 'Duration' },
            { id: 'Predecessor', name: 'Dependency' },
            { id: 'Progress', name: 'Progress' }
        ];
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
    ShowHideColumn.prototype.change = function (args) {
        var columnName = args.value.toString();
        var column = this.ganttObj.treeGrid.grid.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            this.showButtonObj.disabled = true;
            this.hideButtonObj.disabled = false;
        }
        else {
            this.hideButtonObj.disabled = true;
            this.showButtonObj.disabled = false;
        }
    };
    ShowHideColumn.prototype.hideButtonClick = function () {
        var dropValue = this.dropdownObj.value.toString();
        var columnName = this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
        this.ganttObj.hideColumn(columnName);
        this.hideButtonObj.disabled = true;
        this.showButtonObj.disabled = false;
        var hiddenColumns = document.getElementById('hiddencolumns');
        hiddenColumns.value = hiddenColumns.value + columnName + '\n';
    };
    ShowHideColumn.prototype.created = function () {
        this.showButtonObj.disabled = true;
    };
    ShowHideColumn.prototype.showButtonClick = function () {
        var dropValue = this.dropdownObj.value.toString();
        var columnName = this.ganttObj.treeGrid.getColumnByField(dropValue).headerText;
        this.ganttObj.showColumn(columnName);
        this.showButtonObj.disabled = true;
        this.hideButtonObj.disabled = false;
        var hiddenColumns = document.getElementById('hiddencolumns');
        hiddenColumns.value = hiddenColumns.value.replace(columnName + '\n', '');
    };
    ShowHideColumn.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-md-9 control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', treeColumnIndex: 1, allowFiltering: true, allowSorting: true, ref: function (gantt) { return _this.ganttObj = gantt; }, allowResizing: true, dataSource: data_1.projectNewData, highlightWeekends: true, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
            React.createElement("div", { className: 'col-md-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", null, " Column ")),
                            React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                React.createElement("div", { id: 'columnddl' },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "dropDown", change: this.change.bind(this), dataSource: this.columnsName, fields: { text: 'name', value: 'id' }, value: "TaskID", ref: function (dropdown) { return _this.dropdownObj = dropdown; } })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'hide', ref: function (button) { return _this.hideButtonObj = button; }, onClick: this.hideButtonClick.bind(this) }, " Hide "))),
                            React.createElement("td", { style: { width: '70%' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'show', created: this.created.bind(this), ref: function (button) { return _this.showButtonObj = button; }, onClick: this.showButtonClick.bind(this) }, " Show ")))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", { style: { paddingTop: '10px' } }, " Hidden Columns")),
                            React.createElement("td", { style: { width: '70%', Padding: '10px 10px 10px 0px' } },
                                React.createElement("div", null,
                                    React.createElement("textarea", { id: 'hiddencolumns', style: { resize: 'none', height: '65px', backgroundColor: '#fff', padding: '6px' }, className: 'form-control' }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates dynamic show/hide columns feature of Gantt. Select column name from the properties panel, and then click hide/show to toggle visibility.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Gantt column can be shown or hidden dynamically using the ",
                    React.createElement("code", null, "showColumn"),
                    " and ",
                    React.createElement("code", null, "hideColumn"),
                    " methods of the Gantt."),
                React.createElement("p", null,
                    "In this demo, the columns can be shown and hidden by selecting the column name in dropdown. Click the Show or Hide button to toggle the visibility. The visibility of column is toggled based on the ",
                    React.createElement("code", null, "columns -> headerText"),
                    " value."),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "columns -> visible"),
                    " property specifies the visibility of a column. To hide a column at the initial rendering, set the ",
                    React.createElement("code", null, "columns -> visible"),
                    " property to false."))));
    };
    return ShowHideColumn;
}(sample_base_1.SampleBase));
exports.ShowHideColumn = ShowHideColumn;
