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
var TooltipTemplate = (function (_super) {
    __extends(TooltipTemplate, _super);
    function TooltipTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            resourceInfo: 'resources',
            baselineStartDate: 'BaselineStartDate',
            baselineEndDate: 'BaselineEndDate',
            child: 'subtasks'
        };
        _this.templateTaskbar = _this.taskbarTooltip;
        _this.templateBaseline = _this.baselineTooltip;
        _this.tooltipSettings = {
            showTooltip: true,
            taskbar: _this.templateTaskbar.bind(_this),
            baseline: _this.templateBaseline.bind(_this)
        };
        _this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('05/04/2019');
        return _this;
    }
    TooltipTemplate.prototype.taskbarTooltip = function (props) {
        var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
        return (React.createElement("table", null,
            props.ganttProperties.resourceNames &&
                React.createElement("tr", null,
                    React.createElement("td", { rowSpan: 3, style: { padding: '3px' } },
                        React.createElement("img", { src: src, height: '40px' })),
                    React.createElement("td", { style: { padding: '3px' } }, "Task done By:"),
                    React.createElement("td", { style: { padding: '3px' } }, props.ganttProperties.resourceNames)),
            React.createElement("tr", null,
                React.createElement("td", { style: { padding: '3px' } }, "Starts On:"),
                React.createElement("td", { style: { padding: '3px' } }, this.ganttInstance.getFormatedDate(props.StartDate))),
            React.createElement("tr", null,
                React.createElement("td", { style: { padding: '3px' } }, "Ends On:"),
                React.createElement("td", { style: { padding: '3px' } }, this.ganttInstance.getFormatedDate(props.EndDate)))));
    };
    ;
    TooltipTemplate.prototype.baselineTooltip = function (props) {
        return (React.createElement("table", null,
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "Planned Start Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.BaselineStartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Planned End Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.BaselineEndDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Current Start Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.StartDate))),
                React.createElement("tr", null,
                    React.createElement("td", null, "Current End Date: "),
                    React.createElement("td", null, this.ganttInstance.getFormatedDate(props.EndDate))))));
    };
    ;
    TooltipTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TooltipTemplate', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.tooltipData, highlightWeekends: true, renderBaseline: true, treeColumnIndex: 1, tooltipSettings: this.tooltipSettings, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, resourceNameMapping: 'resourceName', resourceIDMapping: 'resourceId', resources: data_1.editingResources },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '60' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineStartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'BaselineEndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample explains the way of rendering tooltip template for taskbar and baseline by mapping template elements to the property of taskbar and baseline in ",
                    React.createElement("code", null, "tooltipSettings"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Tooltip can be enabled or disabled using ",
                    React.createElement("code", null, "tooltipSettings.showTooltip"),
                    " property.In this demo, the tooltip template is rendered for ",
                    React.createElement("code", null, "taskbar"),
                    " and ",
                    React.createElement("code", null, "baseline"),
                    " using the",
                    React.createElement("code", null, "tooltipSettings.taskbar"),
                    " and ",
                    React.createElement("code", null, "tooltipSettings.baseline"),
                    " properties."),
                React.createElement("p", null,
                    "The baseline feature enables the user to view the deviation between the planned dates and the actual dates of the tasks in a project. Baselines can be enabled in Gantt chart by enabling the ",
                    React.createElement("code", null, "renderBaseline"),
                    " property along with mapping the data source values for ",
                    React.createElement("code", null, "baselineStartDate"),
                    " and ",
                    React.createElement("code", null, "baselineEndDate"),
                    " properties."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Selection)"),
                    " method.To use markers, inject the",
                    React.createElement("code", null, "DayMarkers"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                    " method."))));
    };
    return TooltipTemplate;
}(sample_base_1.SampleBase));
exports.TooltipTemplate = TooltipTemplate;
