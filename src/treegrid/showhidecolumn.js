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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
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
            { id: 'taskID', name: 'Task ID' },
            { id: 'duration', name: 'Duration' },
            { id: 'startDate', name: 'Start Date' },
            { id: 'progress', name: 'Progress' }
        ];
        return _this;
    }
    ShowHideColumn.prototype.change = function (args) {
        var columnName = args.value.toString();
        var column = this.treegridObj.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            this.buttonObj2.disabled = true;
            this.buttonObj.disabled = false;
        }
        else {
            this.buttonObj.disabled = true;
            this.buttonObj2.disabled = false;
        }
    };
    ShowHideColumn.prototype.btnClick = function () {
        var columnName = this.dropdownObj.value.toString();
        var column = this.treegridObj.getColumnByField(columnName);
        if (this.treegridObj.getHeaderTable().querySelectorAll('th.e-hide').length === 3) {
            alert('Atleast one Column should be visible');
        }
        else {
            this.treegridObj.grid.hideColumns(column.headerText, 'headerText');
            this.buttonObj.disabled = true;
            this.buttonObj2.disabled = false;
            var hiddenColumns = document.getElementById('hiddencolumns');
            hiddenColumns.value = hiddenColumns.value + column.headerText + '\n';
        }
    };
    ShowHideColumn.prototype.created = function () {
        this.buttonObj2.disabled = true;
    };
    ShowHideColumn.prototype.showClick = function () {
        var columnName = this.dropdownObj.value.toString();
        var column = this.treegridObj.getColumnByField(columnName);
        this.treegridObj.grid.showColumns(column.headerText, 'headerText');
        this.buttonObj2.disabled = true;
        this.buttonObj.disabled = false;
        var hiddenColumns = document.getElementById('hiddencolumns');
        hiddenColumns.value = hiddenColumns.value.replace(column.headerText + '\n', '');
    };
    ShowHideColumn.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', ref: function (treegrid) { return _this.treegridObj = treegrid; }, pageSettings: { pageSize: 10 } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '100', type: 'date', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, " Column ")),
                                React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                    React.createElement("div", { id: 'columnddl' },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "ddlelement", change: this.change.bind(this), dataSource: this.columnsName, fields: { text: 'name', value: 'id' }, value: "taskID", ref: function (dropdown) { return _this.dropdownObj = dropdown; } })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'hide', ref: function (button) { return _this.buttonObj = button; }, onClick: this.btnClick.bind(this) }, " Hide "))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'show', created: this.created.bind(this), ref: function (button) { return _this.buttonObj2 = button; }, onClick: this.showClick.bind(this) }, " Show ")))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Hidden Columns")),
                                React.createElement("td", { style: { width: '70%', Padding: '10px 10px 10px 0px' } },
                                    React.createElement("div", null,
                                        React.createElement("textarea", { id: 'hiddencolumns', style: { resize: 'none', height: '65px', backgroundColor: '#fff', padding: '6px' }, className: 'form-control' })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the text alignment functionalities of the treegrid columns.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The TreeGrid column can be showed/hidden dynamically using ",
                    React.createElement("code", null, "showColumns"),
                    " and ",
                    React.createElement("code", null, "hideColumns"),
                    " method of the Grid."),
                React.createElement("p", null,
                    "In this demo, the columns can be showed and hidden by selecting the column name in the dropdown and click the Show or Hide buttons to toggle visibility. And the column`s visibility is toggled based on the",
                    React.createElement("code", null, "columns->headerText"),
                    " value."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "columns->visible"),
                    " property specifies the visibility of a column. To hide a column at the initial rendering, set the ",
                    React.createElement("code", null, "columns->visible"),
                    " property to false."))));
    };
    return ShowHideColumn;
}(sample_base_1.SampleBase));
exports.ShowHideColumn = ShowHideColumn;
