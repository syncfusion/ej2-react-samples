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
require("./search-events.css");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var dataSource = require("./datasource.json");
/**
 * Sample for searching appointments
 */
var SearchEvents = (function (_super) {
    __extends(SearchEvents, _super);
    function SearchEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = ej2_base_1.extend([], dataSource.scheduleData, null, true);
        return _this;
    }
    SearchEvents.prototype.globalSearch = function (args) {
        var _this = this;
        var searchString = args.target.value;
        if (searchString !== '') {
            new ej2_data_1.DataManager(this.scheduleObj.getEvents(null, null, true)).executeQuery(new ej2_data_1.Query().
                search(searchString, ['Subject', 'Location', 'Description'], null, true, true)).then(function (e) {
                if (e.result.length > 0) {
                    _this.showSearchEvents('show', e.result);
                }
                else {
                    _this.showSearchEvents('hide');
                }
            });
        }
        else {
            this.showSearchEvents('hide');
        }
    };
    SearchEvents.prototype.searchOnclick = function () {
        var searchObj = [];
        var startDate;
        var endDate;
        var formElements = [].slice.call(document.querySelectorAll('.event-search .search-field'));
        formElements.forEach(function (node) {
            if (node.value && node.value !== '') {
                var fieldOperator = 'contains';
                var predicateCondition = 'or';
                var fieldValue = node.value;
                var matchCase = true;
                if (node.classList.contains('e-datepicker')) {
                    fieldOperator = node.classList.contains('e-start-time') ? 'greaterthanorequal' : 'lessthanorequal';
                    predicateCondition = 'and';
                    var fieldInstance = node.ej2_instances[0];
                    fieldValue = fieldInstance.value;
                    if (node.classList.contains('e-start-time')) {
                        startDate = new Date(+fieldValue);
                    }
                    if (node.classList.contains('e-end-time')) {
                        var date = new Date(+fieldInstance.value);
                        fieldValue = new Date(date.setDate(date.getDate() + 1));
                        endDate = fieldValue;
                    }
                    matchCase = false;
                }
                searchObj.push({
                    field: node.getAttribute('data-name'), operator: fieldOperator, value: fieldValue, predicate: predicateCondition,
                    matchcase: matchCase
                });
            }
        });
        if (searchObj.length > 0) {
            var filterCondition = searchObj[0];
            var predicate = new ej2_data_1.Predicate(filterCondition.field, filterCondition.operator, filterCondition.value, filterCondition.matchcase);
            for (var i = 1; i < searchObj.length; i++) {
                predicate = predicate.and(searchObj[i].field, searchObj[i].operator, searchObj[i].value, searchObj[i].matchcase);
            }
            var result = new ej2_data_1.DataManager(this.scheduleObj.getEvents(startDate, endDate, true)).
                executeLocal(new ej2_data_1.Query().where(predicate));
            this.showSearchEvents('show', result);
        }
        else {
            this.showSearchEvents('hide');
        }
    };
    SearchEvents.prototype.clearOnClick = function () {
        document.getElementById('schedule').style.display = 'block';
        document.getElementById('form-search').reset();
        this.showSearchEvents('hide');
    };
    SearchEvents.prototype.showSearchEvents = function (type, data) {
        if (type === 'show') {
            if (document.getElementById('grid').classList.contains('e-grid')) {
                var gridObj = document.querySelector('#grid').ej2_instances[0];
                gridObj.dataSource = data;
                gridObj.dataBind();
            }
            else {
                var gridObj = new ej2_react_grids_1.GridComponent({
                    dataSource: data,
                    height: 505,
                    width: 'auto',
                    columns: [
                        { field: 'Subject', headerText: 'Subject', width: 120 },
                        { field: 'Location', headerText: 'Location', width: 120 },
                        { field: 'StartTime', headerText: 'StartTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                        { field: 'EndTime', headerText: 'EndTime', width: 120, format: { type: 'dateTime', format: 'M/d/y hh:mm a' } },
                    ]
                });
                gridObj.appendTo(document.querySelector('#grid'));
                this.scheduleObj.element.style.display = 'none';
            }
        }
        else {
            var gridObj = document.querySelector('#grid').ej2_instances;
            if (gridObj && gridObj.length > 0 && !gridObj[0].isDestroyed) {
                gridObj[0].destroy();
            }
            this.scheduleObj.element.style.display = 'block';
        }
    };
    SearchEvents.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement("div", { className: 'col-md-12' },
                        React.createElement(ej2_react_schedule_1.ScheduleComponent, { id: 'schedule', cssClass: 'resource', width: '100%', height: '650px', selectedDate: new Date(2019, 0, 10), ref: function (schedule) { return _this.scheduleObj = schedule; }, eventSettings: {
                                dataSource: this.data,
                            } },
                            React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })),
                        React.createElement("div", { id: "grid" })))),
            React.createElement("div", { className: 'col-lg-3 property-section property-customization' },
                React.createElement("div", { className: "property-panel-section" },
                    React.createElement("p", { className: "property-panel-header header-customization", style: { width: '100%' } }, "Search by all event fields"),
                    React.createElement("div", { className: "property-panel-content" },
                        React.createElement("input", { className: "e-input", type: "text", placeholder: "Enter the Search text", onKeyUp: this.globalSearch.bind(this) })),
                    React.createElement("form", { className: "event-search", id: "form-search" },
                        React.createElement("p", { className: "property-panel-header header-customization", style: { width: '100%' } }, "Search by specific event fields"),
                        React.createElement("table", { id: "property-specific", style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { className: "row" },
                                    React.createElement("td", { className: "property-panel-content", colSpan: 2 },
                                        React.createElement("input", { type: "text", className: "e-input search-field", id: "searchEventName", "data-name": "Subject", placeholder: "Subject" }))),
                                React.createElement("tr", { className: "row", style: { height: '45px' } },
                                    React.createElement("td", { className: "property-panel-content", colSpan: 2 },
                                        React.createElement("input", { type: "text", className: "e-input search-field", id: "searchEventLocation", "data-name": "Location", placeholder: "Location" }))),
                                React.createElement("tr", { className: "row", style: { height: '45px' } },
                                    React.createElement("td", { className: "property-panel-content", colSpan: 2 },
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { className: "search-field e-start-time", value: null, "data-name": "StartTime", showClearButton: false, placeholder: "Start Time" }))),
                                React.createElement("tr", { className: "row", style: { height: '45px' } },
                                    React.createElement("td", { className: "property-panel-content", colSpan: 2 },
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { className: "search-field e-end-time", value: null, "data-name": "EndTime", showClearButton: false, placeholder: "End Time" }))),
                                React.createElement("tr", { className: "row", style: { height: '45px' } },
                                    React.createElement("td", { className: "e-field button-customization", style: { width: '50%', padding: '15px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { title: 'Search', type: 'button', onClick: this.searchOnclick.bind(this) }, "Search")),
                                    React.createElement("td", { className: "e-field button-customization", style: { width: '50%', padding: '15px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { title: 'Clear', type: 'button', onClick: this.clearOnClick.bind(this) }, "Clear")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example showcases the search results of Scheduler appointments in a grid. When the user provides the search string on appropriate fields, the resulting event collection based on the search criteria will be displayed in a Grid.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, the search text value is compared with the event field values of Scheduler DataSource and then the filtered resultant event data collection is assigned to the DataSource of Grid."))));
    };
    return SearchEvents;
}(sample_base_1.SampleBase));
exports.SearchEvents = SearchEvents;
