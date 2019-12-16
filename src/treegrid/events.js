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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
{ }
var SAMPLE_CSS = "\n    #EventLog b{\n      color: #388e3c;\n    }\n    hr {\n      margin: 1px 10px 1px 0px;\n      border-top: 1px solid #eee;\n    }";
{ }
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editparams2 = { params: { format: 'n' } };
        _this.taskNameRule = { required: true };
        return _this;
    }
    Events.prototype.created = function () {
        this.appendElement('TreeGrid <b>created</b> event called<hr>');
    };
    Events.prototype.collapsing = function () {
        this.appendElement('TreeGrid <b>collapsing</b> event called<hr>');
    };
    Events.prototype.collapsed = function () {
        this.appendElement('TreeGrid <b>collapsed</b> event called<hr>');
    };
    Events.prototype.expanded = function () {
        this.appendElement('TreeGrid <b>expanded</b> event called<hr>');
    };
    Events.prototype.expanding = function () {
        this.appendElement('TreeGrid <b>expanding</b> event called<hr>');
    };
    Events.prototype.beginEdit = function () {
        this.appendElement('TreeGrid <b>beginEdit</b> event called<hr>');
    };
    Events.prototype.columnDragStart = function () {
        this.appendElement('TreeGrid <b>columnDragStart</b> event called<hr>');
    };
    Events.prototype.columnDrop = function () {
        this.appendElement('TreeGrid <b>columnDrop</b> event called<hr>');
    };
    Events.prototype.columnDrag = function () {
        this.appendElement('TreeGrid <b>columnDrag</b> event called<hr>');
    };
    Events.prototype.load = function () {
        this.appendElement('TreeGrid <b>load</b> event called<hr>');
    };
    Events.prototype.create = function () {
        this.appendElement('TreeGrid <b>create</b> event called<hr>');
    };
    Events.prototype.actionBegin = function () {
        this.appendElement('TreeGrid <b>actionBegin</b> event called<hr>');
    };
    Events.prototype.actionComplete = function () {
        this.appendElement('TreeGrid <b>actionComplete</b> event called<hr>');
    };
    Events.prototype.dataBound = function () {
        this.appendElement('TreeGrid <b>dataBound</b> event called<hr>');
    };
    Events.prototype.rowSelecting = function () {
        this.appendElement('TreeGrid <b>rowSelecting</b> event called<hr>');
    };
    Events.prototype.rowSelected = function () {
        this.appendElement('TreeGrid <b>rowSelected</b> event called<hr>');
    };
    Events.prototype.rowDeselecting = function () {
        this.appendElement('TreeGrid <b>rowDeselecting</b> event called<hr>');
    };
    Events.prototype.rowDeselected = function () {
        this.appendElement('TreeGrid <b>rowDeselected</b> event called<hr>');
    };
    Events.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    Events.prototype.btnClick = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    Events.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', ref: function (treegrid) { return _this.treegridObj = treegrid; }, editSettings: { allowEditing: true }, allowReordering: 'true', allowSorting: 'true', pageSettings: { pageCount: 5 }, load: this.load.bind(this), created: this.created.bind(this), actionBegin: this.actionBegin.bind(this), actionComplete: this.actionComplete.bind(this), dataBound: this.dataBound.bind(this), rowSelecting: this.rowSelecting.bind(this), rowSelected: this.rowSelected.bind(this), columnDrag: this.columnDrag.bind(this), columnDragStart: this.columnDragStart.bind(this), columnDrop: this.columnDrop.bind(this), beginEdit: this.beginEdit.bind(this), collapsing: this.collapsing.bind(this), collapsed: this.collapsed.bind(this), expanded: this.expanded.bind(this), expanding: this.expanding.bind(this) },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', isPrimaryKey: true, width: '100', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '215', validationRules: this.taskNameRule }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '160', type: 'date', format: 'yMd', textAlign: 'Right', editType: 'datepickeredit' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '110', editType: 'numericedit', textAlign: 'Right', edit: this.editparams2 }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '110', textAlign: 'Right', editType: 'numericedit', edit: this.editparams2 })),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Reorder, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Edit] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'eventarea', style: { height: '245px', overflow: 'auto' } },
                                        React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: 'normal' } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'evtbtn', style: { paddingBottom: '10px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.btnClick.bind(this) }, " Clear ")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates all the events that have been triggered on all the TreeGrid operations with the help of Event Trace panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The TreeGrid triggers events based on its actions. The events can be used as an extension point to perform custom operations."),
                React.createElement("p", null,
                    "In this demo, perform TreeGrid actions like paging, sorting, reordering, filtering etc. and see the ",
                    React.createElement("strong", null, "Event Trace"),
                    " panel for the events emitted."),
                React.createElement("p", null, "More information on the Grid events can be found in the documentation section."))));
    };
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
