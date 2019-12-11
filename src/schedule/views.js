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
require("./schedule-component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 * Schedule views sample
 */
var Views = /** @class */ (function (_super) {
    __extends(Views, _super);
    function Views() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.zooEventsData, null, true);
        _this.viewOptions = [
            { text: 'Day', value: 'Day' },
            { text: 'Week', value: 'Week' },
            { text: 'WorkWeek', value: 'WorkWeek' },
            { text: 'Month', value: 'Month' }
        ];
        _this.fields = { text: 'text', value: 'value' };
        return _this;
    }
    Views.prototype.onViewChange = function (args) {
        this.scheduleObj.currentView = args.value;
        this.scheduleObj.dataBind();
    };
    Views.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    Views.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', ref: function (schedule) { return _this.scheduleObj = schedule; }, selectedDate: new Date(2018, 1, 15), eventSettings: { dataSource: this.data }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { className: 'col-md-4', style: { paddingTop: '8px' } }, "Current view")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { style: { padding: '6px' }, value: 'Week', fields: this.fields, dataSource: this.viewOptions, change: this.onViewChange.bind(this) })))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases the usage of basic views available in Scheduler such as Day, Week, Work Week and Month. Here, the wildlife events being held in zoos are displayed against its respective timings.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "In this demo, Scheduler is showcased with 4 basic views namely"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Day"),
                    React.createElement("li", null, "Week"),
                    React.createElement("li", null, "Work Week"),
                    React.createElement("li", null, "Month")),
                React.createElement("p", null,
                    "The user can navigate between different view options available on the header section just by clicking on it. From any of the views, the user can switch back to the day view by clicking dates in the date header section. These view options to be displayed on the Scheduler header bar is based on the values ['Day', 'Week', 'WorkWeek', 'Month'] assigned to the ",
                    React.createElement("code", null, "views"),
                    " property."))));
    };
    return Views;
}(sample_base_1.SampleBase));
exports.Views = Views;
