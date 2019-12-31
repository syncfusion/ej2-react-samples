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
var CellAlign = (function (_super) {
    __extends(CellAlign, _super);
    function CellAlign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnNames = [
            { id: 'taskID', name: 'Task ID' },
            { id: 'duration', name: 'Duration' },
            { id: 'startDate', name: 'Start Date' },
            { id: 'progress', name: 'Progress' }
        ];
        _this.alignment = [
            { id: 'Right', name: 'Right' },
            { id: 'Left', name: 'Left' },
            { id: 'Center', name: 'Center' },
            { id: 'Justify', name: 'Justify' }
        ];
        return _this;
    }
    CellAlign.prototype.change = function (args) {
        var columnName = args.value.toString();
        var alignment = this.treegridObj.getColumnByField(columnName).textAlign;
        this.dropdownObj2.value = alignment;
    };
    CellAlign.prototype.change2 = function (args) {
        var alignment = args.value;
        var columnName = this.dropdownObj.value.toString();
        this.treegridObj.getColumnByField(columnName).textAlign = alignment;
        this.treegridObj.refreshColumns();
    };
    CellAlign.prototype.render = function () {
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
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { style: { paddingTop: '10px' } }, " Column ")),
                                React.createElement("td", { style: { width: '80%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "columns", change: this.change.bind(this), dataSource: this.columnNames, fields: { text: 'name', value: 'id' }, value: "taskID", ref: function (dropdown) { return _this.dropdownObj = dropdown; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, " Cell Alignment ")),
                                React.createElement("td", { style: { width: '50%', padding: '10px 10px 10px 0px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "alignment", change: this.change2.bind(this), dataSource: this.alignment, fields: { text: 'name', value: 'id' }, value: "Right", popupWidth: '100%', ref: function (dropdown) { return _this.dropdownObj2 = dropdown; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the text alignment functionalities of the treegrid columns.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Align both content and header text of particular column using the ",
                    React.createElement("code", null, "textAlign"),
                    " property of columns. There are four possible ways to align content and header text of column, they are."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Right")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Left")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Center")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Justify"))),
                React.createElement("p", null,
                    "In this sample, we have initially set the ",
                    React.createElement("code", null, "textAlign"),
                    " property as \u201CRight\u201D for Task ID, Start Date, Duration and Progress columns and also we have an option to align the values of content and header text dynamically by select the column and text align value from property panel."),
                React.createElement("p", null, "More information about Cell Alignment can be found in this documentation section."))));
    };
    return CellAlign;
}(sample_base_1.SampleBase));
exports.CellAlign = CellAlign;
