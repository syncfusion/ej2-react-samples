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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
{ }
var SAMPLE_CSS = "\n    .datalink {\n      text-align: right;\n      padding: 10px 0;\n    }\n    @media screen and (max-width: 480px) {\n      .datalink {\n        padding-bottom: 0;\n        padding-top: 15px;\n    }";
{ }
var SelectionAPI = /** @class */ (function (_super) {
    __extends(SelectionAPI, _super);
    function SelectionAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionAPI.prototype.btnClick = function () {
        var startRow = this.numericObj.value;
        var toRow = this.numericObj2.value;
        var rows = [];
        for (var i = startRow; i <= toRow; i++) {
            rows.push(i);
        }
        this.treegridObj.selectRows(rows);
    };
    SelectionAPI.prototype.btnClick2 = function () {
        this.treegridObj.clearSelection();
    };
    SelectionAPI.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', allowSelection: 'true', ref: function (treegrid) { return _this.treegridObj = treegrid; }, pageSettings: { pageSize: 10 }, selectionSettings: { type: 'Multiple' } },
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
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Select Rows")))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '5px !important' } },
                                    React.createElement("div", { style: { paddingTop: '8px' } }, "Start")),
                                React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                    React.createElement("div", { id: 'numericbox', style: { minWidth: '130px' } },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'start', format: '##', min: 0, max: 11, ref: function (numeric) { return _this.numericObj = numeric; }, width: '110px' })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { style: { paddingTop: '8px' } }, " To ")),
                                React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                    React.createElement("div", { id: 'numericbox', style: { minWidth: '130px' } },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'to', format: '##', min: 0, max: 11, ref: function (numeric) { return _this.numericObj2 = numeric; }, width: '110px' })))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", { className: 'col-md-6' },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.btnClick.bind(this) }, "Select Row")))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "col-md-12" },
                                        React.createElement("b", null, "Clear Selection")))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", { className: "col-md-6", style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.btnClick2.bind(this) }, "Clear Selection")))))))),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Selection provides an interactive support to highlight the row or cell that you select. Selection can be done through a simple Mouse down or Keyboard interaction. To enable selection, set ",
                    React.createElement("code", null, "allowSelection"),
                    " as true."),
                React.createElement("p", null,
                    "TreeGrid supports two types of selection which can be set using",
                    React.createElement("code", null, "selectionSettings->type"),
                    " property. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "single"),
                        " - Enabled by default. Allows the user to select single row/cell at a time."),
                    React.createElement("li", null,
                        React.createElement("code", null, "multiple"),
                        " - Allows the user to select more than one row/cell at a time.")),
                React.createElement("p", null,
                    "Also, supports three modes of selection which can be set using",
                    React.createElement("code", null, "selectionSettings->mode"),
                    " property. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row"),
                        " - Enabled by default. Enables row selection in TreeGrid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell"),
                        " - Enables cell selection in TreeGrid."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Enables both row and cell selection in TreeGrid. Clicking any cell will select both the row and cell simultaneously.")),
                React.createElement("p", null,
                    "The treegrid supports two types of cell selection mode that can be set by using the",
                    React.createElement("code", null, "selectionSettings->cellSelectionMode"),
                    " property. They are,"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Flow"),
                        " - The Flow value is set by default. The range of cells are selected between the start index and end index that includes in between cells of rows."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Box"),
                        " - Range of cells are selected from the start and end column indexes that includes in between cells of rows within the range.")),
                React.createElement("p", null,
                    "To perform the multi-selection, hold ",
                    React.createElement("strong", null, "CTRL"),
                    " key and click the desired rows/cells. To select range of rows/cells, hold ",
                    React.createElement("strong", null, "SHIFT"),
                    " key and click the rows/cells."),
                React.createElement("p", null, "While using the TreeGrid in a touch device environment, there is an option for multi-selection through single tap on the row and it will show a popup with the multi-selection symbol. Tap the icon to enable multi-selection in a single tap."),
                React.createElement("p", null, "In this demo, enter the values in the Start and To text box to select range of rows. And click the Clear Selection button to deselect the rows."),
                React.createElement("p", null, "More information on the selection configuration can be found in this documentation section."))));
    };
    return SelectionAPI;
}(sample_base_1.SampleBase));
exports.SelectionAPI = SelectionAPI;
