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
require("./date-header-template.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule date header template sample
 */
var DateHeaderTemplate = /** @class */ (function (_super) {
    __extends(DateHeaderTemplate, _super);
    function DateHeaderTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.scheduleData, null, true);
        _this.instance = new ej2_base_1.Internationalization();
        return _this;
    }
    DateHeaderTemplate.prototype.getDateHeaderText = function (value) {
        return this.instance.formatDate(value, { skeleton: 'Ed' });
    };
    DateHeaderTemplate.prototype.getWeather = function (value) {
        switch (value.getDay()) {
            case 0:
                return '<img class="weather-image"  src= "src/schedule/images/weather-clear.svg" /><div class="weather-text">25°C</div>';
            case 1:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">18°C</div>';
            case 2:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">10°C</div>';
            case 3:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">16°C</div>';
            case 4:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg"/><div class="weather-text">8°C</div>';
            case 5:
                return '<img class="weather-image" src="src/schedule/images/weather-clear.svg"/><div class="weather-text">27°C</div>';
            case 6:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg"/><div class="weather-text">17°C</div>';
            default:
                return null;
        }
    };
    DateHeaderTemplate.prototype.dateHeaderTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("div", null, this.getDateHeaderText(props.date)),
            React.createElement("div", { className: "date-text", dangerouslySetInnerHTML: { __html: this.getWeather(props.date) } })));
    };
    DateHeaderTemplate.prototype.onRenderCell = function (args) {
        if (args.elementType === 'monthCells' && this.scheduleObj.currentView === 'Month') {
            var ele = document.createElement('div');
            ele.innerHTML = this.getWeather(args.date);
            (args.element).appendChild(ele.firstChild);
        }
    };
    DateHeaderTemplate.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    DateHeaderTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', cssClass: 'schedule-date-header-template', ref: function (t) { return _this.scheduleObj = t; }, renderCell: this.onRenderCell.bind(this), eventRendered: this.onEventRendered.bind(this), selectedDate: new Date(2019, 0, 10), eventSettings: { dataSource: this.data }, dateHeaderTemplate: this.dateHeaderTemplate.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo depicts the way to add images and custom text to the date header bar by making use of the date header template option.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "dateHeaderTemplate"),
                    " option is used to customize the date header cells of day, week and workweek views. In month view, the date header is not applicable and therefore the same customizations can be added beside the date text in the month cells by making use of the ",
                    React.createElement("code", null, "renderCells"),
                    " event."))));
    };
    return DateHeaderTemplate;
}(sample_base_1.SampleBase));
exports.DateHeaderTemplate = DateHeaderTemplate;
