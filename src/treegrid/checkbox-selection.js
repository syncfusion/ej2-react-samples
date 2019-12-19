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
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var CheckboxSelection = (function (_super) {
    __extends(CheckboxSelection, _super);
    function CheckboxSelection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectionsettings = { persistSelection: true };
        return _this;
    }
    CheckboxSelection.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 2, childMapping: 'subtasks', allowPaging: 'true', selectionSettings: this.selectionsettings },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { type: 'checkbox', width: '50' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', isPrimaryKey: true, headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the selection functionality of the TreeGrid using checkbox selection, To select and unselect all rows use header checkbox. To select/unselect particular row, click the desired row.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "TreeGrid mutliple selection can be achieved with help of checkbox in each row. To render checkbox in each treegrid row, you need to define column type as ",
                    React.createElement("code", null, "checkbox"),
                    " using ",
                    React.createElement("code", null, "columns->type"),
                    " property."),
                React.createElement("p", null,
                    "Selection can be persisted on all the operations using ",
                    React.createElement("code", null, "selectionSettings-> persistSelection"),
                    " property. For persisting selection on the TreeGrid, any one of the column should be defined as a primary key using ",
                    React.createElement("code", null, " columns->isPrimaryKey"),
                    " property."),
                React.createElement("p", null, "In this demo, Tree Grid mutliple selection has been enabled with selection persistance."),
                React.createElement("p", null, "More information on the checkbox selection configuration can be found in this documentation section."))));
    };
    return CheckboxSelection;
}(sample_base_1.SampleBase));
exports.CheckboxSelection = CheckboxSelection;
