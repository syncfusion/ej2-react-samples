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
var ColumnTemplate = (function (_super) {
    __extends(ColumnTemplate, _super);
    function ColumnTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = _this.columnTemplate.bind(_this);
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            resourceInfo: 'resources',
            child: 'subtasks'
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.splitterSettings = {
            columnIndex: 3
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    ColumnTemplate.prototype.columnTemplate = function (props) {
        var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
        if ((props.ganttProperties.resourceNames)) {
            return (React.createElement("div", { className: 'columnTemplate' },
                React.createElement("img", { src: src, height: '40px', width: '40px' }),
                React.createElement("div", { style: { display: "inline-block", width: '100%', position: "relative", left: "30px" } }, props.ganttProperties.resourceNames)));
        }
        else {
            return React.createElement("div", null);
        }
    };
    ColumnTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', rowHeight: 60, resourceNameMapping: 'resourceName', resourceIDMapping: 'resourceId', resources: data_1.editingResources, dataSource: data_1.templateData, highlightWeekends: true, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'Task ID', textAlign: "Left" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources', headerText: 'Resources', width: '250', template: this.template }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', width: '150' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', width: '150' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', width: '150' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of template columns in Gantt. In this sample, we have shown custom images in the Resources column.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Gantt provides a way to use a custom layout for each cell using the column template feature. The ",
                    React.createElement("code", null, "columns -> template"),
                    " property accepts the template for the cell."),
                React.createElement("p", null, "In this demo, using column template, resource column has been presented with employee photo"))));
    };
    return ColumnTemplate;
}(sample_base_1.SampleBase));
exports.ColumnTemplate = ColumnTemplate;
