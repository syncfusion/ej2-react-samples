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
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var GridLines = (function (_super) {
    __extends(GridLines, _super);
    function GridLines() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.linesData = [
            { id: 'Both', type: 'Both' },
            { id: 'Vertical', type: 'Vertical' },
            { id: 'Horizontal', type: 'Horizontal' },
            { id: 'None', type: 'None' }
        ];
        _this.gridLines = 'Both';
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
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    GridLines.prototype.changeLine = function (args) {
        var lines = args.value.toString();
        this.ganttInstance.gridLines = lines;
        this.ganttInstance.refresh();
    };
    ;
    GridLines.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'GridLines', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', treeColumnIndex: 1, gridLines: this.gridLines, splitterSettings: this.splitterSettings, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                        React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '60' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Grid Lines")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (dropdown) { return _this.dropdownObj = dropdown; }, id: 'gridLines', dataSource: this.linesData, fields: { text: 'type', value: 'id' }, value: 'Both', change: this.changeLine.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the visibility of Gantt lines that separate the rows and columns.In this sample, you can change the gridlines from the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "gridLines"),
                    " property is used to control the visibility of line that separates the rows and columns. Gantt allows us to display the following grid lines:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Shows no line."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Shows both horizontal and vertical lines."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Horizontal"),
                        " - Shows the horizontal line."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Vertical"),
                        " - Shows the vertical line.")),
                React.createElement("p", null, " In this demo, you can modify the visibility of gridlines by selecting values in dropdown."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the ",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Selection)"),
                    "method.To use markers, inject the ",
                    React.createElement("code", null, "DayMarkers"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                    " method."))));
    };
    return GridLines;
}(sample_base_1.SampleBase));
exports.GridLines = GridLines;
