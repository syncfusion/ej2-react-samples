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
require("./sample.css");
var sample_base_1 = require("../common/sample-base");
var RowHeight = /** @class */ (function (_super) {
    __extends(RowHeight, _super);
    function RowHeight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = [
            { prefixIcon: 'e-big-icon', id: 'small', align: 'Left', tooltipText: 'Small' },
            { prefixIcon: 'e-medium-icon', id: 'medium', align: 'Left', tooltipText: 'Medium' },
            { prefixIcon: 'e-small-icon', id: 'big', align: 'Left', tooltipText: 'Large' }
        ];
        return _this;
    }
    RowHeight.prototype.toolbarClick = function (args) {
        if (args.item.id === 'small') {
            this.treegridObj.rowHeight = 20;
        }
        if (args.item.id === 'medium') {
            this.treegridObj.rowHeight = 40;
        }
        if (args.item.id === 'big') {
            this.treegridObj.rowHeight = 60;
        }
    };
    RowHeight.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', rowHeight: '20', toolbar: this.toolbarOptions, ref: function (treegrid) { return _this.treegridObj = treegrid; }, toolbarClick: this.toolbarClick.bind(this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', type: 'date', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', type: 'date', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'progress', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the row height feature of the TreeGrid. In this demo, the rowHeight for all the TreeGrid rows can be changed as 20px, 40px and 60px through ToolBar button click.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "TreeGrid has provide an option to customize the row height by using ",
                    React.createElement("code", null, "rowHeight"),
                    " property of treegrid."),
                React.createElement("p", null, "In this sample, we have enabled an option in Toolbar to customize the row height of TreeGrid to 20px, 40px and 60px."))));
    };
    return RowHeight;
}(sample_base_1.SampleBase));
exports.RowHeight = RowHeight;
