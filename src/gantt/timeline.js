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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Timeline = /** @class */ (function (_super) {
    __extends(Timeline, _super);
    function Timeline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'taskID',
            name: 'taskName',
            startDate: 'startDate',
            endDate: 'endDate',
            duration: 'duration',
            progress: 'progress',
            dependency: 'predecessor',
            child: 'subtasks'
        };
        _this.projectStartDate = new Date('02/03/2019');
        _this.projectEndDate = new Date('03/23/2019');
        _this.timelineSettings = {
            topTier: {
                format: 'MMM dd, yyyy',
                unit: 'Week',
            },
            bottomTier: {
                unit: 'Day',
            }
        };
        _this.labelSettings = {
            rightLabel: 'taskName'
        };
        _this.splitterSettings = {
            columnIndex: 0
        };
        _this.yearformat = [
            { id: 'MMM "yy', format: 'Jan "18' },
            { id: 'y', format: '2018' },
            { id: 'MMMM, y', format: 'January, 18' },
        ];
        _this.monthformat = [
            { id: 'MMM dd, yyyy', format: 'Jan 01, 2018' },
            { id: 'MMMM', format: 'January' },
            { id: 'MMM', format: 'Jan' },
        ];
        _this.weekformat = [
            { id: 'MMM dd, yyyy', format: 'Jan 01, 2019' },
            { id: 'EEE MMM dd, "yy', format: 'Mon Jan 01, "19' },
            { id: 'EEE MMM dd', format: 'Mon Jan 01' },
        ];
        _this.dayformat = [
            { id: 'EEE, dd', format: 'Mon, 01' },
            { id: 'E', format: 'Mon' },
            { id: 'dd', format: '01' },
        ];
        _this.hourformat = [
            { id: 'hh', format: '00' },
            { id: 'hh : mm a', format: '00 : 00 AM' },
            { id: 'h : mm a', format: '0 : 00 AM' },
        ];
        _this.unit = [
            { id: 'Year', unit: 'Year' },
            { id: 'Month', unit: 'Month' },
            { id: 'Week', unit: 'Week' },
            { id: 'Day', unit: 'Day' },
            { id: 'Hour', unit: 'Hour' }
        ];
        _this.unitField = { text: 'unit', value: 'id' };
        _this.formatField = { text: 'format', value: 'id' };
        return _this;
    }
    Timeline.prototype.topTierCick = function (props) {
        if (this.topTierCheckbox.checked) {
            this.ganttInstance.timelineSettings.topTier.unit = 'Week';
            this.topTierCount.enabled = true;
            this.topTierformat.enabled = true;
            this.topTierUnit.enabled = true;
        }
        else {
            this.ganttInstance.timelineSettings.topTier.unit = 'None';
            this.topTierCount.enabled = false;
            this.topTierformat.enabled = false;
            this.topTierUnit.enabled = false;
        }
    };
    Timeline.prototype.bottomTierCick = function (props) {
        if (this.bottomTierCheckbox.checked) {
            this.ganttInstance.timelineSettings.bottomTier.unit = 'Day';
            this.bottomTierCount.enabled = true;
            this.bottomTierformat.enabled = true;
            this.bottomTierUnit.enabled = true;
        }
        else {
            this.ganttInstance.timelineSettings.bottomTier.unit = 'None';
            this.bottomTierCount.enabled = false;
            this.bottomTierformat.enabled = false;
            this.bottomTierUnit.enabled = false;
        }
    };
    Timeline.prototype.topTierCountchange = function (e) {
        var count = e.value;
        this.ganttInstance.timelineSettings.topTier.count = count;
    };
    Timeline.prototype.bottomTierCountchange = function (e) {
        var count = e.value;
        this.ganttInstance.timelineSettings.bottomTier.count = count;
    };
    Timeline.prototype.topUnitChange = function (e) {
        var unit = e.value;
        this.ganttInstance.timelineSettings.topTier.unit = unit;
        if (unit === 'Year') {
            this.topTierformat.dataSource = this.yearformat;
        }
        else if (unit === 'Month') {
            this.topTierformat.dataSource = this.monthformat;
        }
        else if (unit === 'Week') {
            this.topTierformat.dataSource = this.weekformat;
        }
        else if (unit === 'Day') {
            this.topTierformat.dataSource = this.dayformat;
        }
        else {
            this.topTierformat.dataSource = this.hourformat;
        }
        this.topTierformat.refresh();
        this.updateUnitWidth(unit, 'top');
        this.ganttInstance.timelineSettings.topTier.unit = unit;
    };
    Timeline.prototype.bottomUnitChange = function (e) {
        var unit = e.value;
        this.ganttInstance.timelineSettings.bottomTier.unit = unit;
        if (unit === 'Year') {
            this.bottomTierformat.dataSource = this.yearformat;
        }
        else if (unit === 'Month') {
            this.bottomTierformat.dataSource = this.monthformat;
        }
        else if (unit === 'Week') {
            this.bottomTierformat.dataSource = this.weekformat;
        }
        else if (unit === 'Day') {
            this.bottomTierformat.dataSource = this.dayformat;
        }
        else {
            this.bottomTierformat.dataSource = this.hourformat;
        }
        this.bottomTierformat.refresh();
        this.updateUnitWidth(unit, 'bottom');
        this.ganttInstance.timelineSettings.bottomTier.unit = unit;
    };
    Timeline.prototype.bottomFormatChange = function (e) {
        var format = e.value;
        this.ganttInstance.timelineSettings.bottomTier.format = format.toString();
    };
    Timeline.prototype.topFormatChange = function (e) {
        var format = e.value;
        this.ganttInstance.timelineSettings.topTier.format = format.toString();
    };
    Timeline.prototype.unitWidth = function (e) {
        var width = e.value;
        this.ganttInstance.timelineSettings.timelineUnitSize = width;
    };
    Timeline.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Timeline', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.projectData, renderBaseline: true, allowSorting: true, treeColumnIndex: 1, allowSelection: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, timelineSettings: this.timelineSettings, highlightWeekends: true, height: '410px', resourceNameMapping: 'resourceName', resourceIDMapping: 'resourceId', resources: data_1.projectResources, labelSettings: this.labelSettings, splitterSettings: this.splitterSettings },
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.Sort, ej2_react_gantt_1.DayMarkers] }))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Unit width")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.timelineUnitSize = NumericTextBox; }, format: 'n', value: 33, min: 10, change: this.unitWidth.bind(this) })))),
                            React.createElement("tr", null),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Top tier"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (CheckBox) { return _this.topTierCheckbox = CheckBox; }, id: "topTierCheck", onClick: this.topTierCick.bind(this), className: "checkbox", checked: true })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Count")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.topTierCount = NumericTextBox; }, id: "count", format: 'n', min: 1, max: 50, value: 1, className: "form-control", change: this.topTierCountchange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Unit")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.topTierUnit = DropDownList; }, id: 'unit', tabIndex: 1, dataSource: this.unit, fields: this.unitField, value: 'Week', change: this.topUnitChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Format")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.topTierformat = DropDownList; }, id: 'topformat', tabIndex: 1, dataSource: this.weekformat, fields: this.formatField, value: 'MMM dd, yyyy', change: this.topFormatChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null,
                                        React.createElement("b", null, "Bottom tier"))),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (CheckBox) { return _this.bottomTierCheckbox = CheckBox; }, id: "bottomTierCheck", onClick: this.bottomTierCick.bind(this), className: "checkbox", checked: true })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Count")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { ref: function (NumericTextBox) { return _this.bottomTierCount = NumericTextBox; }, id: "count", format: 'n', min: 1, max: 50, value: 1, className: "form-control", change: this.bottomTierCountchange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Unit")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.bottomTierUnit = DropDownList; }, id: 'unit', tabIndex: 1, dataSource: this.unit, fields: this.unitField, value: 'Day', change: this.bottomUnitChange.bind(this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", null, "Format")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.bottomTierformat = DropDownList; }, id: 'btFormat', tabIndex: 1, dataSource: this.dayformat, fields: this.formatField, change: this.bottomFormatChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the different phases from planning to delivery, involved in a software development lifecycle. This sample demonstrates the different timeline modes available in Gantt chart. Options are available to change the unit, format and count of the header texts for both top and bottom timeline headers.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to change the timeline settings in Gantt chart. The top and bottom timeline header texts can be customized by using the ",
                    React.createElement("code", null, "timelineSettings.topTier"),
                    " and ",
                    React.createElement("code", null, "timelineSettings.bottomTier"),
                    " properties                                                          Using these properties, you can change the format, count, and units of the timeline header texts."),
                React.createElement("p", null, "Gantt chart has built-in support for many timeline modes such as minutes, hour, day, week, month and year."),
                React.createElement("p", null,
                    "The default timeline headers can also be replaced with custom header texts by using the ",
                    React.createElement("code", null, "formatter"),
                    " method."),
                React.createElement("p", null, "Tooltip is enabled by default for the timeline headers, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the",
                    React.createElement("code", null, "Selection"),
                    " module. To use markers in Gantt, inject the ",
                    React.createElement("code", null, "DayMarkers"),
                    " module."))));
    };
    Timeline.prototype.updateUnitWidth = function (unit, tier) {
        var topUnit = tier === 'top' ? unit : this.ganttInstance.timelineSettings.topTier.unit;
        var bottomUnit = tier === 'bottom' ? unit : this.ganttInstance.timelineSettings.bottomTier.unit;
        var units = ['None', 'Hour', 'Day', 'Week', 'Month', 'Year'];
        var bootomCellUnit;
        var unitWidth;
        if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = 'Day';
        }
        else if (units.indexOf(topUnit) === 0 && units.indexOf(bottomUnit) > 0) {
            bootomCellUnit = bottomUnit;
        }
        else if (units.indexOf(topUnit) > 0 && units.indexOf(bottomUnit) === 0) {
            bootomCellUnit = topUnit;
        }
        else if (units.indexOf(topUnit) <= units.indexOf(bottomUnit)) {
            bootomCellUnit = topUnit;
        }
        else {
            bootomCellUnit = bottomUnit;
        }
        if (bootomCellUnit === 'Year') {
            unitWidth = 2000;
        }
        else if (bootomCellUnit === 'Month') {
            unitWidth = 300;
        }
        else if (bootomCellUnit === 'Week') {
            unitWidth = 150;
        }
        else if (bootomCellUnit === 'Day') {
            unitWidth = 33;
        }
        else if (bootomCellUnit === 'Hour') {
            unitWidth = 25;
        }
        this.timelineUnitSize.value = unitWidth;
    };
    return Timeline;
}(sample_base_1.SampleBase));
exports.Timeline = Timeline;
