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
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule Timescale sample
 */
var Timescale = /** @class */ (function (_super) {
    __extends(Timescale, _super);
    function Timescale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.scheduleData, null, true);
        _this.instance = new ej2_base_1.Internationalization();
        _this.slotCountList = [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '5', value: 5 },
            { text: '6', value: 6 }
        ];
        _this.intervalList = [
            { text: '30', value: 30 },
            { text: '60', value: 60 },
            { text: '90', value: 90 },
            { text: '120', value: 120 },
            { text: '150', value: 150 },
            { text: '180', value: 180 },
            { text: '240', value: 240 },
            { text: '300', value: 300 },
            { text: '720', value: 720 }
        ];
        _this.timeScaleOptions = [
            { text: 'Show', value: 'enable' },
            { text: 'Hide', value: 'disable' }
        ];
        _this.templateOptions = [
            { text: 'Yes', value: true },
            { text: 'No', value: false }
        ];
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    Timescale.prototype.majorSlotTemplate = function (props) {
        return (React.createElement("div", null, this.instance.formatDate(props.date, { skeleton: 'hm' })));
    };
    Timescale.prototype.minorSlotTemplate = function (props) {
        return (React.createElement("div", { style: { textAlign: 'right', marginRight: '15px' } }, this.instance.formatDate(props.date, { skeleton: 'ms' }).replace(':00', '')));
    };
    Timescale.prototype.onSlotCountChange = function (args) {
        this.scheduleObj.timeScale.slotCount = args.value;
        this.scheduleObj.dataBind();
    };
    Timescale.prototype.onIntervalChange = function (args) {
        this.scheduleObj.timeScale.interval = args.value;
    };
    Timescale.prototype.onTimeScaleChange = function (args) {
        this.scheduleObj.timeScale.enable = (args.value === 'enable') ? true : false;
        this.scheduleObj.dataBind();
    };
    Timescale.prototype.onTemplateChange = function (args) {
        this.scheduleObj.timeScale.majorSlotTemplate = args.value ?
            this.majorSlotTemplate.bind(this) : null;
        this.scheduleObj.timeScale.minorSlotTemplate = args.value ?
            this.minorSlotTemplate.bind(this) : null;
        this.scheduleObj.dataBind();
    };
    Timescale.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { height: '550px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: this.data }, currentView: 'TimelineWeek', timeScale: { enable: true, interval: 60, slotCount: 6 } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineWeek' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Interval(in Minutes)")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 60, fields: this.fields, dataSource: this.intervalList, change: this.onIntervalChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Slot Count")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 6, fields: this.fields, dataSource: this.slotCountList, change: this.onSlotCountChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Grid lines")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 'enable', fields: this.fields, dataSource: this.timeScaleOptions, change: this.onTimeScaleChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Apply Template")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: false, fields: this.fields, dataSource: this.templateOptions, change: this.onTemplateChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo depicts how to customize the grid lines of scheduler with different duration, count and also, how to apply template customizations on it.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, scheduler has been allowed to display different number of grid lines per hour assigned with different duration to each cell, by making use of the",
                    React.createElement("code", null, "interval"),
                    " and ",
                    React.createElement("code", null, "slotCount"),
                    " properties. The grid lines can also be disabled on schedule, by setting `false` to the",
                    React.createElement("code", null, "enable"),
                    " property available within",
                    React.createElement("code", null, "timeScale"),
                    ". The time header text can be customized by making use of the",
                    React.createElement("code", null, "majorSlotTemplate"),
                    " and",
                    React.createElement("code", null, "minorSlotTemplate"),
                    " properties."))));
    };
    return Timescale;
}(sample_base_1.SampleBase));
exports.Timescale = Timescale;
