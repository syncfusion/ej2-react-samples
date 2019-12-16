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
require("./resource-grouping.css");
var sample_base_1 = require("../common/sample-base");
/**
 * schedule resources group sample
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resourceData = [
            { AirlineName: 'Airways 1', AirlineId: 1, AirlineColor: '#EA7A57' },
            { AirlineName: 'Airways 2', AirlineId: 2, AirlineColor: '#357cd2' },
            { AirlineName: 'Airways 3', AirlineId: 3, AirlineColor: '#7fa900' }
        ];
        return _this;
    }
    Group.prototype.getAirlineImage = function (value) {
        var airlineName = this.getAirlineName(value);
        return airlineName.replace(' ', '-').toLowerCase();
    };
    Group.prototype.getAirlineName = function (value) {
        return ((value.resourceData) ?
            value.resourceData[value.resource.textField] :
            value.resourceName);
    };
    Group.prototype.getAirlineModel = function (value) {
        var airlineName = this.getAirlineName(value);
        return (airlineName === 'Airways 1') ? 'CRJ 700' : (airlineName === 'Airways 2') ? 'Airbus A330' : 'ATR 72-600';
    };
    Group.prototype.getAirlineSeats = function (value) {
        var airlineName = this.getAirlineName(value);
        return (airlineName === 'Airways 1') ? 50 : (airlineName === 'Airways 2') ? 75 : 100;
    };
    // custom code start
    Group.prototype.generateEvents = function () {
        var subjectCollection = ['Barcelona to Los Angeles', 'Los Angeles to Barcelona'];
        var collections = [];
        var dataCollections = [1, 2, 3];
        var id = 1;
        for (var _i = 0, dataCollections_1 = dataCollections; _i < dataCollections_1.length; _i++) {
            var data = dataCollections_1[_i];
            var startDate = new Date(2018, 3, 1);
            startDate.setMilliseconds(1000 * 60 * 60 * .5 * (data - 1));
            var lastDate = new Date((+startDate) + (1000 * 60 * 60 * 24 * 30));
            for (var date = startDate; date.getTime() < lastDate.getTime(); date = new Date(date.getTime() + (1000 * 60 * 60 * 5))) {
                var strDate = new Date(+date);
                var endDate = new Date((+strDate) + (1000 * 60 * 60 * (2.5 + (0.5 * data))));
                collections.push({
                    Id: id,
                    Subject: subjectCollection[id % 2],
                    StartTime: new Date(+strDate),
                    EndTime: new Date(+endDate),
                    AirlineId: data
                });
                id += 1;
            }
        }
        return collections;
    };
    // custom code end
    Group.prototype.resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "airline-image " + this.getAirlineImage(props) }),
            React.createElement("div", { className: "airline-details" },
                React.createElement("div", { className: "airline-name" }, this.getAirlineName(props)),
                React.createElement("div", { className: "airline-model" },
                    " Model no: ",
                    this.getAirlineModel(props)),
                React.createElement("div", { className: "airline-seats" },
                    " No.of seats: ",
                    this.getAirlineSeats(props)))));
    };
    Group.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement("div", { className: 'schedule-demo-heading' }, "Flight timings between Barcelona and Los Angeles"),
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'schedule-group', width: '100%', height: '650px', selectedDate: new Date(2018, 3, 1), eventSettings: {
                            dataSource: this.generateEvents(), fields: {
                                subject: { title: 'Travel Summary', name: 'Subject' },
                                location: { title: 'Source', name: 'Location' },
                                description: { title: 'Comments', name: 'Description' },
                                startTime: { title: 'Departure Time', name: 'StartTime' },
                                endTime: { title: 'Arrival Time', name: 'EndTime' }
                            }
                        }, group: { resources: ['Airlines'] }, resourceHeaderTemplate: this.resourceHeaderTemplate.bind(this) },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'AirlineId', title: 'Airline Name', name: 'Airlines', allowMultiple: true, dataSource: this.resourceData, textField: 'AirlineName', idField: 'AirlineId', colorField: 'AirlineColor' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Agenda' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Week, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demo illustrates the timings of different flight services on a specific route say between Barcelona and Los Angeles, on a daily basis. Here, the Scheduler is grouped based on the 3 Airline services.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, the scheduler has been grouped with multiple resources by making use of the property",
                    React.createElement("code", null, "group"),
                    ". The resources to be grouped depends on the values of",
                    React.createElement("code", null, "resources"),
                    " option within the",
                    React.createElement("code", null, "group"),
                    " property, which accepts the array of resource names. The resource header has been customized by making use of the ",
                    React.createElement("code", null, "resourceHeaderTemplate"),
                    " property."),
                React.createElement("p", null,
                    "In mobile mode, when the grouping is enabled, the resources will be listed out in a treeview as a side-panel which opens or closes, on clicking the hamburger icon at the resource header. Only a single resource will be viewable at a time, due to the space constraints on mobile. If in case, the users want to view the grouped layout on mobile with scrolling content, then it is necessary to set",
                    React.createElement("code", null, "false"),
                    " to the",
                    React.createElement("code", null, "enableCompactView"),
                    " option within the",
                    React.createElement("code", null, "group"),
                    " property which is set to",
                    React.createElement("code", null, "true"),
                    " by default. This option is not applicable on desktop mode. "),
                React.createElement("p", null,
                    "Note: If the",
                    React.createElement("code", null, "group"),
                    " property is not defined, then the default scheduler will be rendered with no grouping on layout, but the appointments of all the resources will be displayed on a single scheduler."))));
    };
    return Group;
}(sample_base_1.SampleBase));
exports.Group = Group;
