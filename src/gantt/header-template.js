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
var SAMPLE_CSS = "\n    .e-header {\n        margin-left: 8px;\n    }";
var HeaderTemplate = /** @class */ (function (_super) {
    __extends(HeaderTemplate, _super);
    function HeaderTemplate() {
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
            child: 'subtasks'
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.splitterSettings = {
            columnIndex: 4
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    HeaderTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', resourceNameMapping: 'resourceName', resourceIDMapping: 'resourceId', resources: data_1.editingResources, dataSource: data_1.templateData, highlightWeekends: true, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/gantt/images/Task name.png", width: "20", height: "20", className: "e-image" }),
                                    React.createElement("b", { className: 'e-header' }, "Task Name")));
                            }, width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/gantt/images/Start date.png", width: "20", height: "20", className: "e-image" }),
                                    React.createElement("b", { className: 'e-header' }, "Start Date")));
                            } }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources', headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/gantt/images/Resources.png", width: "20", height: "20", className: "e-image" }),
                                    React.createElement("b", { className: 'e-header' }, "Resources")));
                            } }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/gantt/images/Duration.png", width: "20", height: "20", className: "e-image" }),
                                    React.createElement("b", { className: 'e-header' }, "Duration")));
                            } }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/gantt/images/Progress.png", width: "20", height: "20", className: "e-image" }),
                                    React.createElement("b", { className: 'e-header' }, "Progress")));
                            } })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Gantt header template feature. In this sample, custom icons have been shown in the column headers.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Gantt provides a way to define a custom element in header element. The ",
                    React.createElement("code", null, "columns -> headerTemplate"),
                    " property accepts the template for the header cell."),
                React.createElement("p", null, "In this demo, we have rendered the customized template for all column headers."))));
    };
    return HeaderTemplate;
}(sample_base_1.SampleBase));
exports.HeaderTemplate = HeaderTemplate;
