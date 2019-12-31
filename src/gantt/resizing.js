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
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Resizing = (function (_super) {
    __extends(Resizing, _super);
    function Resizing() {
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
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.splitterSettings = {
            columnIndex: 6
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    Resizing.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', treeColumnIndex: 1, allowResizing: true, dataSource: data_1.projectNewData, highlightWeekends: true, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'ID', width: '60' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', width: '250', minWidth: '120', maxWidth: '300' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', minWidth: '8', width: '135' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', minWidth: '8', width: '135' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', allowResizing: false, width: '120' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', minWidth: '8', headerText: 'Progress', textAlign: 'Right', width: '120' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor', minWidth: '8', headerText: 'Dependency', textAlign: 'Left', width: '135' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Resize] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Gantt column resizing feature. Click and drag at the right corner of each column header to resize the column.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Gantt columns can be resized by clicking and dragging at the right corner of columns header. Set the ",
                    React.createElement("code", null, "allowResizing"),
                    " property to true to enable column resizing behavior in Gantt. You can also prevent the resize of a particular column by setting ",
                    React.createElement("code", null, "columns -> allowResizing"),
                    " to false in columns definition"),
                React.createElement("p", null,
                    " In this demo, the allowResizing feature has been enabled by setting the ",
                    React.createElement("code", null, "allowResizing"),
                    " property to true. Task Name column can be resized between a range of ",
                    React.createElement("code", null, "minWidth (120 pixels)"),
                    " and ",
                    React.createElement("code", null, "maxWidth (300 pixels)"),
                    ". The column resizing has been disabled in the ",
                    React.createElement("b", null, "Duration"),
                    " column"),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module:"),
                    React.createElement("p", null,
                        "Gantt component features are segregated into individual feature-wise modules. To use Resize feature, we need to inject ",
                        React.createElement("code", null, "Resize"),
                        " module into the ",
                        React.createElement("code", null, "services"),
                        ".")))));
    };
    return Resizing;
}(sample_base_1.SampleBase));
exports.Resizing = Resizing;
