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
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./resource.css");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var dataSource = require("./datasource.json");
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.resourceSampleData, null, true);
        _this.resourceData = [
            { Text: 'Margaret', Id: 1, Color: '#ea7a57' },
            { Text: 'Robert', Id: 2, Color: '#df5286' },
            { Text: 'Laura', Id: 3, Color: '#865fcf' }
        ];
        return _this;
    }
    Resource.prototype.onChange = function () {
        var predicate;
        var proxy = this;
        var checkBoxes = [this.ownerOneObj, this.ownerTwoObj, this.ownerThreeObj];
        checkBoxes.forEach(function (checkBoxObj) {
            if (checkBoxObj.checked) {
                if (predicate) {
                    predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
                else {
                    predicate = new ej2_data_1.Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
            }
        });
        proxy.scheduleObj.eventSettings.query = new ej2_data_1.Query().where(predicate);
    };
    Resource.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'resource', width: '100%', height: '650px', selectedDate: new Date(2018, 5, 5), ref: function (schedule) { return _this.scheduleObj = schedule; }, eventSettings: {
                            dataSource: this.data,
                        } },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'OwnerId', title: 'Owners', name: 'Owners', allowMultiple: true, dataSource: this.resourceData, textField: 'Text', idField: 'Id', colorField: 'Color' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement("table", { id: "property", title: "Resources", className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (checkboxObj) { return _this.ownerOneObj = checkboxObj; }, value: '1', id: 'margaret', cssClass: 'margaret', checked: true, label: 'Margaret', change: this.onChange.bind(this) }))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (checkboxObj) { return _this.ownerTwoObj = checkboxObj; }, value: '2', id: 'robert', cssClass: 'robert', checked: true, label: 'Robert', change: this.onChange.bind(this) }))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (checkboxObj) { return _this.ownerThreeObj = checkboxObj; }, value: '3', id: 'laura', cssClass: 'laura', checked: true, label: 'Laura', change: this.onChange.bind(this) })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to dynamically show or hide the appointments of resources on Scheduler based on the resource selection.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the resource appointments are dynamically shown or hidden on the Scheduler, by passing the filtered event data of selected resources to the ",
                    React.createElement("code", null, "Query"),
                    " option of the ",
                    React.createElement("code", null, "Eventsettings"),
                    "."))));
    };
    return Resource;
}(sample_base_1.SampleBase));
exports.Resource = Resource;
