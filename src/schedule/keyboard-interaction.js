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
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 *  Schedule keyboard interaction sample
 */
var KeyboardInteraction = /** @class */ (function (_super) {
    __extends(KeyboardInteraction, _super);
    function KeyboardInteraction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.zooEventsData, null, true);
        return _this;
    }
    KeyboardInteraction.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    KeyboardInteraction.prototype.rendereComplete = function () {
        document.body.addEventListener('keydown', function (e) {
            var scheduleElement = document.getElementById('schedule');
            if (e.altKey && e.keyCode === 74 && scheduleElement) {
                scheduleElement.focus();
            }
        });
    };
    KeyboardInteraction.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: 'schedule', width: '100%', height: '650px', selectedDate: new Date(2018, 1, 15), ref: function (t) { return _this.scheduleObj = t; }, eventSettings: { dataSource: this.data }, eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases the keyboard shortcuts applicable on Scheduler and also lists out in below description, how those applicable shortcuts interacts with Scheduler actions.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "All the Scheduler actions can be controlled via keyboard keys and is availed by using",
                    React.createElement("code", null, "allowKeyboardInteraction"),
                    " property which is set to true by default. The applicable key combinations and its relative functionalities are listed below."),
                React.createElement("table", { style: { width: '100%' } },
                    React.createElement("tr", null,
                        React.createElement("th", { style: { width: '200px' } },
                            React.createElement("strong", null, "Keys")),
                        React.createElement("th", null,
                            React.createElement("strong", null, "Description"))),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Alt"),
                            " +",
                            React.createElement("kbd", null, "j")),
                        React.createElement("td", null, "Focuses the Scheduler [Provided from application end].")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Tab")),
                        React.createElement("td", null, "Focuses the first or active item on the scheduler header bar and then move the focus to the next available event elements. If no events present, then focus moves out of the component.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Shift"),
                            " +",
                            React.createElement("kbd", null, "Tab")),
                        React.createElement("td", null, "Reverse focusing of the Tab functionality. Inverse focusing of event elements from the last one and then move onto the first or active item on Scheduler header bar and then moves out of the component.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Enter"),
                            " key"),
                        React.createElement("td", null, "Opens the quick popup on the selected cells or events.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Escape"),
                            " key"),
                        React.createElement("td", null, "Closes any of the popup that are in open state.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Arrow"),
                            " keys"),
                        React.createElement("td", null, "To move onto the next available cells in either of the needed directions (left, right, top and right)")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Shift"),
                            " +",
                            React.createElement("kbd", null, " Arrow"),
                            " keys"),
                        React.createElement("td", null, "For multiple cell selection on either direction.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Delete"),
                            " key"),
                        React.createElement("td", null, "Deletes one or more selected events.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Ctrl"),
                            " +",
                            React.createElement("kbd", null, "Click"),
                            " on events"),
                        React.createElement("td", null, "To select multiple events.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Alt"),
                            " +",
                            React.createElement("kbd", null, "Number"),
                            " keys (from 1 to 6)"),
                        React.createElement("td", null, "To switch between the views on Scheduler.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Ctrl"),
                            " +",
                            React.createElement("kbd", null, "Left Arrow"),
                            " keys"),
                        React.createElement("td", null, "To navigate to the previous date period.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Ctrl"),
                            " +",
                            React.createElement("kbd", null, "Right Arrow"),
                            " keys"),
                        React.createElement("td", null, "To navigate to the next date period.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Left"),
                            " or",
                            React.createElement("kbd", null, "Right Arrow"),
                            " keys"),
                        React.createElement("td", null, "On pressing any of these keys when focus is currently on the Scheduler header bar, moves the focus to the previous or next items in the header bar.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Space"),
                            " or",
                            React.createElement("kbd", null, "Enter"),
                            " keys"),
                        React.createElement("td", null, "It activates any of the focused items.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Page Up"),
                            " &",
                            React.createElement("kbd", null, "Page Down"),
                            " keys"),
                        React.createElement("td", null, "To scroll through the work cells area.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { padding: '4px 0' } },
                            React.createElement("kbd", null, "Home"),
                            " key"),
                        React.createElement("td", null, "To move the selection to the first cell of Scheduler."))))));
    };
    return KeyboardInteraction;
}(sample_base_1.SampleBase));
exports.KeyboardInteraction = KeyboardInteraction;
