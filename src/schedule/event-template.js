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
require("./event-template.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule event template sample
 */
var EventTemplate = (function (_super) {
    __extends(EventTemplate, _super);
    function EventTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.webinarData, null, true);
        _this.instance = new ej2_base_1.Internationalization();
        return _this;
    }
    EventTemplate.prototype.getTimeString = function (value) {
        return this.instance.formatDate(value, { skeleton: 'hm' });
    };
    EventTemplate.prototype.eventTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap", style: { background: props.SecondaryColor } },
            React.createElement("div", { className: "subject", style: { background: props.PrimaryColor } }, props.Subject),
            React.createElement("div", { className: "time", style: { background: props.PrimaryColor } },
                "Time: ",
                this.getTimeString(props.StartTime),
                " - ",
                this.getTimeString(props.EndTime)),
            React.createElement("div", { className: "image" },
                React.createElement("img", { src: "src/schedule/images/" + props.ImageName + ".svg", alt: props.ImageName })),
            React.createElement("div", { className: "event-description" }, props.Description),
            React.createElement("div", { className: "footer", style: { background: props.PrimaryColor } })));
    };
    EventTemplate.prototype.timelineEventTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap", style: { background: props.PrimaryColor } },
            React.createElement("div", { className: "subject", style: { background: props.SecondaryColor, borderRightWidth: 15, borderLeftWidth: 15, borderLeftColor: props.PrimaryColor, borderRightColor: props.PrimaryColor, borderLeftStyle: 'solid', borderRightStyle: 'solid' } }, props.Subject)));
    };
    EventTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'event-template', width: '100%', height: '550px', selectedDate: new Date(2018, 1, 15), readonly: true, startHour: '08:00', endHour: '18:00', workHours: { start: '08:00' }, eventSettings: { dataSource: this.data } },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: ej2_base_1.Browser.isDevice ? 'Day' : 'Week', eventTemplate: this.eventTemplate.bind(this) }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: ej2_base_1.Browser.isDevice ? 'TimelineDay' : 'TimelineWeek', eventTemplate: this.timelineEventTemplate.bind(this) })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo illustrates the way of customizing the default editor window with custom template option and the customized design is automatically replaced onto the usual event editor. Here, a doctor\u2019s daily appointment with his patients is listed out and shaded with specific color based on its status.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "With the usage of template, the user can format and change the default appearance of the events by making use of the ",
                    React.createElement("code", null, "template"),
                    " option which is available within the ",
                    React.createElement("code", null, "eventSettings"),
                    " property. Here, the HTML template design is compiled and then the resultant output will be displayed directly on the events."))));
    };
    return EventTemplate;
}(sample_base_1.SampleBase));
exports.EventTemplate = EventTemplate;
