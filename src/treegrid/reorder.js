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
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var Reorders = (function (_super) {
    __extends(Reorders, _super);
    function Reorders() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnNames = [
            { id: 'taskID', name: 'Task ID' },
            { id: 'taskName', name: 'Task Name' },
            { id: 'startDate', name: 'Start Date' },
            { id: 'duration', name: 'Duration' },
            { id: 'progress', name: 'Progress' }
        ];
        _this.columnsIndex = [
            { id: '0', name: '1' },
            { id: '1', name: '2' },
            { id: '2', name: '3' },
            { id: '3', name: '4' },
            { id: '4', name: '5' }
        ];
        return _this;
    }
    Reorders.prototype.change = function (args) {
        var columnName = args.value.toString();
        var index = this.treegridObj.getColumnIndexByField(columnName);
        this.dropdownObj2.value = index.toString();
    };
    Reorders.prototype.change2 = function (args) {
        var columnName = this.dropdownObj.value.toString();
        var toColumnIndex = args.value;
        var column = this.treegridObj.columns[toColumnIndex];
        this.treegridObj.reorderColumns(columnName, column.field);
    };
    Reorders.prototype.actionComplete = function (args) {
        if (args.requestType === 'reorder') {
            var columnName = this.dropdownObj.value;
            var index = this.treegridObj.getColumnIndexByField(columnName);
            this.dropdownObj2.value = index.toString();
        }
    };
    Reorders.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, allowPaging: 'true', childMapping: 'subtasks', allowReordering: 'true', pageSettings: { pageCount: 4, pageSize: 11 }, ref: function (treegrid) { return _this.treegridObj = treegrid; }, actionComplete: this.actionComplete.bind(this) },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '105', format: 'yMd', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Reorder] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Column ")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columns", change: this.change.bind(this), dataSource: this.columnNames, fields: { text: 'name', value: 'id' }, value: "taskID", ref: function (dropdown) { return _this.dropdownObj = dropdown; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, " Column Index ")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columnindex", change: this.change2.bind(this), dataSource: this.columnsIndex, fields: { text: 'name', value: 'id' }, value: "0", ref: function (dropdown) { return _this.dropdownObj2 = dropdown; } }))))))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates reordering feature of the TreeGrid columns.You can reorder columns by simply drag and drop in the desired column position. You can also reorder columns by simply drag and drop in the desired column position.")),
                React.createElement("div", { id: 'description' },
                    React.createElement("p", null,
                        "Reordering can be enabled by setting ",
                        React.createElement("code", null, "allowReordering"),
                        " property as true. Reordering can be done by drag and drop the column header from one index to another index within the TreeGrid. The location in which the column to be placed, will be indicated by two arrows symbols"),
                    React.createElement("p", null, "In this demo, you can reorder columns by drag and drop."),
                    React.createElement("p", null, "Injecting Module:"),
                    React.createElement("p", null,
                        "TreeGrid features are segregated into individual feature-wise modules. To use reordering feature, we need to inject ",
                        React.createElement("code", null, "Reorder"),
                        " module into the ",
                        React.createElement("code", null, "services"),
                        "."),
                    React.createElement("p", null, "More information about Column Reorder can be found in this documentation section.")))));
    };
    return Reorders;
}(sample_base_1.SampleBase));
exports.Reorders = Reorders;
