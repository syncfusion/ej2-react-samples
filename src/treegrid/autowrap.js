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
var AutoWrap = /** @class */ (function (_super) {
    __extends(AutoWrap, _super);
    function AutoWrap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoWrap.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.textWrapData, treeColumnIndex: 1, allowPaging: 'true', childMapping: 'subtasks', allowTextWrap: 'true', pageSettings: { pageSize: 11 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '98' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the TreeGrid component with the auto wrap column cell feature. In this sample, you can see that Task Name column cell content exceeded the available width hence it has been wrapped into multiple lines.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Auto wrap cell content can be enabled using ",
                    React.createElement("code", null, "allowTextWrap"),
                    " property of the TreeGrid. Setting this property will wrap cell text on multiple lines.This feature is useful to view the cell content when it exceeds the cell width."),
                React.createElement("p", null, "Setting this property will wrap the text in both content cell and header cell."),
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "allowTextWrap"),
                    " property is enabled, and you can also see that the Task Name column whose content exceeded the cell width is wrapped into multiple lines."),
                React.createElement("p", null, "More information about Auto wrap cells can be found in this documentation section."))));
    };
    return AutoWrap;
}(sample_base_1.SampleBase));
exports.AutoWrap = AutoWrap;
