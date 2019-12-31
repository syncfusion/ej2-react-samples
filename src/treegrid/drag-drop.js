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
var DragAndDrop = (function (_super) {
    __extends(DragAndDrop, _super);
    function DragAndDrop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DragAndDrop.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.dragData, treeColumnIndex: 1, childMapping: 'subtasks', height: '410', allowRowDragAndDrop: 'true', selectionSettings: { type: 'Multiple' } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right', isPrimaryKey: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.RowDD, ej2_react_treegrid_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the TreeGrid component with the row drag and drop feature within same tree grid. It provides the way to drop the row, above, below or child to the target row with the respective to the target row position.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Row drag and drop enabled by setting ",
                    React.createElement("code", null, "allowRowDragAndDrop"),
                    " property as true."),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use row drag and drop feature, we need to inject",
                    React.createElement("code", null, "RowDD"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return DragAndDrop;
}(sample_base_1.SampleBase));
exports.DragAndDrop = DragAndDrop;
