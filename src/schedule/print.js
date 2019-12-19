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
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./print.css");
var dataSource = require("./datasource.json");
/**
 *  Schedule header customization sample
 */
var PrintSchedule = (function (_super) {
    __extends(PrintSchedule, _super);
    function PrintSchedule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.scheduleData, null, true);
        return _this;
    }
    PrintSchedule.prototype.onActionBegin = function (args) {
        if (args.requestType === 'toolbarItemRendering') {
            var exportItem = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icon-schedule-print',
                text: 'Print', cssClass: 'e-schedule-print', click: this.onPrintIconClick.bind(this)
            };
            args.items.push(exportItem);
        }
    };
    PrintSchedule.prototype.onPrintIconClick = function () {
        this.scheduleObj.print();
    };
    PrintSchedule.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'print', width: '100%', height: '650px', id: 'schedule', ref: function (t) { return _this.scheduleObj = t; }, selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: this.data }, actionBegin: this.onActionBegin.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Print] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This example demonstrates how to print the Scheduler element at client-side.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this example, the Scheduler element is Printed by making use of the public method",
                    React.createElement("code", null, "print"),
                    "."),
                React.createElement("p", null,
                    React.createElement("strong", null, "Module Injection")),
                React.createElement("p", null,
                    "To start using Print functionality in Scheduler, we need to inject ",
                    React.createElement("code", null, "Print"),
                    " module into the services."))));
    };
    return PrintSchedule;
}(sample_base_1.SampleBase));
exports.PrintSchedule = PrintSchedule;
