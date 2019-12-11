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
require("./header-bar.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 *  Schedule header customization sample
 */
var HeaderBar = /** @class */ (function (_super) {
    __extends(HeaderBar, _super);
    function HeaderBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.employeeEventData, null, true);
        return _this;
    }
    HeaderBar.prototype.onActionBegin = function (args) {
        if (args.requestType === 'toolbarItemRendering') {
            var userIconItem = {
                align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon'
            };
            args.items.push(userIconItem);
        }
    };
    HeaderBar.prototype.onActionComplete = function (args) {
        var _this = this;
        var scheduleElement = document.getElementById('schedule');
        if (args.requestType === 'toolBarItemRendered') {
            var userIconEle_1 = scheduleElement.querySelector('.e-schedule-user-icon');
            userIconEle_1.onclick = function () {
                _this.profilePopup.relateTo = userIconEle_1;
                _this.profilePopup.dataBind();
                if (_this.profilePopup.element.classList.contains('e-popup-close')) {
                    _this.profilePopup.show();
                }
                else {
                    _this.profilePopup.hide();
                }
            };
        }
        var userContentEle = ej2_base_1.createElement('div', {
            className: 'e-profile-wrapper'
        });
        scheduleElement.parentElement.appendChild(userContentEle);
        var userIconEle = scheduleElement.querySelector('.e-schedule-user-icon');
        var getDOMString = ej2_base_1.compile('<div class="profile-container"><div class="profile-image">' +
            '</div><div class="content-wrap"><div class="resource-name">Nancy</div>' +
            '<div class="destination">Product Manager</div><div class="status">' +
            '<div class="status-icon"></div>Online</div></div></div>');
        var output = getDOMString({});
        this.profilePopup = new ej2_popups_1.Popup(userContentEle, {
            content: output[0],
            relateTo: userIconEle,
            position: { X: 'left', Y: 'bottom' },
            collision: { X: 'flip', Y: 'flip' },
            targetType: 'relative',
            viewPortElement: scheduleElement,
            width: 185,
            height: 80
        });
        this.profilePopup.hide();
    };
    HeaderBar.prototype.onEventRendered = function (args) {
        helper_1.applyCategoryColor(args, this.scheduleObj.currentView);
    };
    // function to handle the CheckBox change event
    HeaderBar.prototype.onChange = function (args) {
        this.profilePopup.hide();
        this.scheduleObj.showHeaderBar = args.checked;
        this.scheduleObj.dataBind();
    };
    HeaderBar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'schedule-header-bar', width: '100%', height: '650px', id: 'schedule', ref: function (t) { return _this.scheduleObj = t; }, selectedDate: new Date(2018, 1, 15), eventSettings: { dataSource: this.data }, actionBegin: this.onActionBegin.bind(this), actionComplete: this.onActionComplete.bind(this), eventRendered: this.onEventRendered.bind(this) },
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '90%' } },
                                    React.createElement("div", { className: 'headerbar' },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'headerbar', checked: true, label: 'Show/Hide Header bar', ref: function (scope) {
                                                _this.checkboxObj = scope;
                                            }, change: this.onChange.bind(this) })))))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo shows the way of adding custom items into the Scheduler header bar. Here, an employee image is added to the header bar, clicking on which will open the popup showing that person's short profile information.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, a popup has been designed separately with a person\u2019s profile info and kept in a hidden state initially. A custom item has been added to the Scheduler header bar within the ",
                    React.createElement("code", null, "actionBegin"),
                    " event by checking for the request type as",
                    React.createElement("code", null, "toolbarItemRendering"),
                    " which triggers at the time of header bar items rendering on the Scheduler."),
                React.createElement("p", null,
                    "Once the items are added, the click action is being bound to it in the ",
                    React.createElement("code", null, "actionComplete"),
                    " event by checking for the request type as ",
                    React.createElement("code", null, "toolbarItemRendered"),
                    " which triggers after the items are rendered on the Scheduler. The appropriate action of showing or hiding the popup on clicking the custom item has been done within it."),
                React.createElement("p", null,
                    "In case, if the header bar of Scheduler needs to be hidden, it can be done by setting false to ",
                    React.createElement("code", null, "showHeaderBar"),
                    " property."))));
    };
    return HeaderBar;
}(sample_base_1.SampleBase));
exports.HeaderBar = HeaderBar;
