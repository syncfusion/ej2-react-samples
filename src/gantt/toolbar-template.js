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
require("./toolbar-template.css");
var ToolbarTemplate = /** @class */ (function (_super) {
    __extends(ToolbarTemplate, _super);
    function ToolbarTemplate() {
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
        _this.toolbar = ['ExpandAll', 'CollapseAll', { text: 'Quick Filter', tooltipText: 'Quick Filter', id: 'Quick Filter', prefixIcon: 'e-quickfilter' }, { text: 'Clear Filter', tooltipText: 'Clear Filter', id: 'Clear Filter' }];
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    ToolbarTemplate.prototype.toolbarClick = function (args) {
        if (args.item.text === 'Quick Filter') {
            this.ganttInstance.filterByColumn('TaskName', 'startswith', 'Identify');
        }
        if (args.item.text === 'Clear Filter') {
            this.ganttInstance.clearFiltering();
        }
    };
    ToolbarTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ToolbarTemplate', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.projectNewData, highlightWeekends: true, allowFiltering: true, treeColumnIndex: 1, splitterSettings: this.splitterSettings, toolbar: this.toolbar, toolbarClick: this.toolbarClick.bind(this), taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '70' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Filter, ej2_react_gantt_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains the way of rendering built-in and custom toolbar items at the same time.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Custom toolbar items can be added by defining the toolbar as a collection of ItemModels. Actions for this customized toolbar items are defined in the ",
                    React.createElement("code", null, "toolbarClick"),
                    " event."),
                React.createElement("p", null,
                    "In this sample, the custom toolbar element ",
                    React.createElement("code", null, "Quick Filter"),
                    " and ",
                    React.createElement("code", null, "Clear Filter"),
                    " is rendered along with predefined toolbar items ExpandAll and CollapseAll. While clicking the ",
                    React.createElement("code", null, "Quick Filter"),
                    " toolbar item, the filtering occurs for ",
                    React.createElement("code", null, "Task Name"),
                    "column.Filtered column can be cleared using ",
                    React.createElement("code", null, "Clear Filter"),
                    " toolbar item."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Selection)"),
                    " method.To use a filter, inject the",
                    React.createElement("code", null, "Filter"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Filter)"),
                    " method.To use a toolbar, inject the",
                    React.createElement("code", null, "Toolbar"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Toolbar)"),
                    " method.To use markers, inject the",
                    React.createElement("code", null, "DayMarkers"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                    " method."))));
    };
    return ToolbarTemplate;
}(sample_base_1.SampleBase));
exports.ToolbarTemplate = ToolbarTemplate;
