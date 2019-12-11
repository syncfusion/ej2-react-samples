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
var helper_1 = require("./helper");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./schedule-component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
/**
 * Schedule agenda sample
 */
var AgendaView = /** @class */ (function (_super) {
    __extends(AgendaView, _super);
    function AgendaView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.virtualScrollOptions = [
            { text: 'True', value: true },
            { text: 'False', value: false }
        ];
        _this.hideEmptyAgendaDaysOptions = [
            { text: 'True', value: true },
            { text: 'False', value: false }
        ];
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    AgendaView.prototype.onVitrualChange = function (args) {
        this.scheduleObj.views = [{ option: 'Agenda', allowVirtualScrolling: args.value }];
    };
    AgendaView.prototype.onEmptyAgendaDaysChange = function (args) {
        this.scheduleObj.hideEmptyAgendaDays = args.value;
    };
    AgendaView.prototype.onCountChange = function (args) {
        this.scheduleObj.agendaDaysCount = args.value !== null ? args.value : 7;
    };
    AgendaView.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, currentView: 'Agenda', selectedDate: new Date(2018, 1, 15), eventSettings: { dataSource: helper_1.generateObject() } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda', allowVirtualScrolling: false })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Agenda] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Allow Virtual Scrolling")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: false, dataSource: this.virtualScrollOptions, fields: this.fields, change: this.onVitrualChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Hide empty Days")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: true, dataSource: this.hideEmptyAgendaDaysOptions, fields: this.fields, change: this.onEmptyAgendaDaysChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Days Count")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: 'n0', value: 7, min: 1, max: 15, change: this.onCountChange.bind(this) })))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases the agenda view and the configurations available in it.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, Agenda view is set as active view on Scheduler and made its ",
                    React.createElement("code", null, "allowVirtualScrolling"),
                    " option as false. With this settings, the Agenda view loads the initial data for the next 7 days count from the date value assigned to the ",
                    React.createElement("code", null, "selectedDate"),
                    " property of the Scheduler. The initial data loading for 7 days count is due to the default value assigned to the ",
                    React.createElement("code", null, "agendaDaysCount"),
                    " property which can be customized as per the user needs."),
                React.createElement("p", null,
                    "When the ",
                    React.createElement("code", null, "allowVirtualScrolling"),
                    " property is set to true, the user is allowed to scroll through all the events simply by scrolling up and down upto the last event available in Scheduler."),
                React.createElement("p", null,
                    "By default, the days which doesn\u2019t have any events will be hidden on this view \u2013 but by setting ",
                    React.createElement("code", null, "hideEmptyAgendaDays"),
                    " property to false will allow the ",
                    React.createElement("code", null, "No Events"),
                    " text to be displayed against the dates that has no events."))));
    };
    return AgendaView;
}(sample_base_1.SampleBase));
exports.AgendaView = AgendaView;
