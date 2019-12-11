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
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.columns = [
            { field: 'TaskID', width: 60 },
            { field: 'TaskName', width: 250 },
            { field: 'StartDate' },
            { field: 'EndDate' },
            { field: 'Duration' },
            { field: 'Predecessor' },
            { field: 'Progress' },
        ];
        _this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Search'];
        _this.editSettings = {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/24/2019');
        _this.projectEndDate = new Date('07/06/2019');
        return _this;
    }
    Events.prototype.created = function () {
        this.appendElement('Gantt <b>created</b> event called<hr>');
    };
    Events.prototype.load = function () {
        this.appendElement('Gantt <b>load</b> event called<hr>');
    };
    Events.prototype.dataBound = function () {
        this.appendElement('Gantt <b>dataBound</b> event called<hr>');
    };
    Events.prototype.toolbarClick = function () {
        this.appendElement('Gantt <b>toolbarClick</b> event called<hr>');
    };
    Events.prototype.beforeTooltipRender = function () {
        this.appendElement('Gantt <b>beforeTooltipRender</b> event called<hr>');
    };
    Events.prototype.actionBegin = function () {
        this.appendElement('Gantt <b>actionBegin</b> event called<hr>');
    };
    Events.prototype.actionComplete = function () {
        this.appendElement('Gantt <b>actionComplete</b> event called<hr>');
    };
    Events.prototype.cellEdit = function () {
        this.appendElement('Gantt <b>cellEdit</b> event called<hr>');
    };
    Events.prototype.endEdit = function () {
        this.appendElement('Gantt <b>endEdit</b> event called<hr>');
    };
    Events.prototype.taskbarEditing = function () {
        this.appendElement('Gantt <b>taskbarEditing</b> event called<hr>');
    };
    Events.prototype.taskbarEdited = function () {
        this.appendElement('Gantt <b>taskbarEdited</b> event called<hr>');
    };
    Events.prototype.rowSelecting = function () {
        this.appendElement('Gantt <b>rowSelecting</b> event called<hr>');
    };
    Events.prototype.rowSelected = function () {
        this.appendElement('Gantt <b>rowSelected</b> event called<hr>');
    };
    Events.prototype.rowDeselecting = function () {
        this.appendElement('Gantt <b>rowDeselecting</b> event called<hr>');
    };
    Events.prototype.rowDeselected = function () {
        this.appendElement('Gantt <b>rowDeselected</b> event called<hr>');
    };
    Events.prototype.columnDragStart = function () {
        this.appendElement('Gantt <b>columnDragStart</b> event called<hr>');
    };
    Events.prototype.columnDrag = function () {
        this.appendElement('Gantt <b>columnDrag</b> event called<hr>');
    };
    Events.prototype.columnDrop = function () {
        this.appendElement('Gantt <b>columnDrop</b> event called<hr>');
    };
    Events.prototype.expanding = function () {
        this.appendElement('Gantt <b>expanding</b> event called<hr>');
    };
    Events.prototype.expanded = function () {
        this.appendElement('Gantt <b>expanded</b> event called<hr>');
    };
    Events.prototype.collapsing = function () {
        this.appendElement('Gantt <b>collapsing</b> event called<hr>');
    };
    Events.prototype.collapsed = function () {
        this.appendElement('Gantt <b>collapsed</b> event called<hr>');
    };
    Events.prototype.columnMenuClick = function () {
        this.appendElement('Gantt <b>columnMenuClick</b> event called<hr>');
    };
    Events.prototype.columnMenuOpen = function () {
        this.appendElement('Gantt <b>columnMenuOpen</b> event called<hr>');
    };
    Events.prototype.contextMenuClick = function () {
        this.appendElement('Gantt <b>contextMenuClick</b> event called<hr>');
    };
    Events.prototype.contextMenuOpen = function () {
        this.appendElement('Gantt <b>contextMenuOpen</b> event called<hr>');
    };
    Events.prototype.resizeStart = function () {
        this.appendElement('Gantt <b>resizeStart</b> event called<hr>');
    };
    Events.prototype.resizing = function () {
        this.appendElement('Gantt <b>resizing</b> event called<hr>');
    };
    Events.prototype.resizeStop = function () {
        this.appendElement('Gantt <b>resizeStop</b> event called<hr>');
    };
    Events.prototype.splitterResizeStart = function () {
        this.appendElement('Gantt <b>splitterResizeStart</b> event called<hr>');
    };
    Events.prototype.splitterResizing = function () {
        this.appendElement('Gantt <b>splitterResizing</b> event called<hr>');
    };
    Events.prototype.splitterResized = function () {
        this.appendElement('Gantt <b>splitterResized</b> event called<hr>');
    };
    Events.prototype.recordDoubleClick = function () {
        this.appendElement('Gantt <b>recordDoubleClick</b> event called<hr>');
    };
    Events.prototype.onTaskbarClick = function () {
        this.appendElement('Gantt <b>onTaskbarClick</b> event called<hr>');
    };
    Events.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    Events.prototype.clear = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    Events.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'Events', dataSource: data_1.projectNewData, highlightWeekends: true, treeColumnIndex: 1, allowSelection: true, allowSorting: true, allowReordering: true, allowResizing: true, enableContextMenu: true, showColumnMenu: true, columns: this.columns, toolbar: this.toolbar, editSettings: this.editSettings, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', created: this.created.bind(this), load: this.load.bind(this), dataBound: this.dataBound.bind(this), toolbarClick: this.toolbarClick.bind(this), beforeTooltipRender: this.beforeTooltipRender.bind(this), actionBegin: this.actionBegin.bind(this), actionComplete: this.actionComplete.bind(this), cellEdit: this.cellEdit.bind(this), endEdit: this.endEdit.bind(this), taskbarEditing: this.taskbarEditing.bind(this), taskbarEdited: this.taskbarEdited.bind(this), rowSelecting: this.rowSelecting.bind(this), rowSelected: this.rowSelected.bind(this), rowDeselecting: this.rowDeselecting.bind(this), rowDeselected: this.rowDeselected.bind(this), columnDragStart: this.columnDragStart.bind(this), columnDrag: this.columnDrag.bind(this), columnDrop: this.columnDrop.bind(this), expanding: this.expanding.bind(this), expanded: this.expanded.bind(this), collapsing: this.collapsing.bind(this), collapsed: this.collapsed.bind(this), columnMenuClick: this.columnMenuClick.bind(this), columnMenuOpen: this.columnMenuOpen.bind(this), contextMenuClick: this.contextMenuClick.bind(this), contextMenuOpen: this.contextMenuOpen.bind(this), resizeStart: this.resizeStart.bind(this), resizing: this.resizing.bind(this), resizeStop: this.resizeStop.bind(this), splitterResizeStart: this.splitterResizeStart.bind(this), splitterResizing: this.splitterResizing.bind(this), splitterResized: this.splitterResized.bind(this), recordDoubleClick: this.recordDoubleClick.bind(this), onTaskbarClick: this.onTaskbarClick.bind(this), projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                        React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '60' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                            React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                        React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.ContextMenu, ej2_react_gantt_1.Reorder, ej2_react_gantt_1.Resize, ej2_react_gantt_1.ColumnMenu, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Edit, ej2_react_gantt_1.Filter, ej2_react_gantt_1.Sort] }))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Event Trace' },
                        React.createElement("table", { id: "property", className: "property-panel-table", title: "Event Trace", style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "eventarea", style: { height: '346px', overflow: 'auto' } },
                                        React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: 'normal' } })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', padding: '20px 10px 10px 80px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.clear.bind(this) }, " Clear ")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates all the events that occur on all the Gantt operations with the help of Event Trace panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Gantt triggers events based on its actions. The events can be used as an extension point to perform custom operations."),
                React.createElement("p", null,
                    "In this demo, perform Gantt actions such as load, created, dataBound, toolbarClick, beforeTooltipRender, actionBegin, actionComplete, cellEdit, endEdit, taskbarEditing, taskbarEdited, rowSelecting, rowSelected, rowDeselecting, rowDeselected, columnDragStart, columnDrag, columnDrop, expanding, expanded, collapsing, collapsed, columnMenuClick, columnMenuOpen, contextMenuClick, contextMenuOpen, resizeStart, resizing, resizeStop, splitterResizeStart, splitterResizing, splitterResized, recordDoubleClick, onTaskbarClick and see the ",
                    React.createElement("strong", null, "Event Trace"),
                    " panel for the events emitted."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Selection)"),
                    " method.To use a sorting, inject the",
                    React.createElement("code", null, "Sort"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Sort)"),
                    " method.To reorder column, inject the",
                    React.createElement("code", null, "Reorder"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Reorder)"),
                    " method.To resize column width, inject the",
                    React.createElement("code", null, "Resize"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Resize)"),
                    " method.To use a contextmenu, inject the",
                    React.createElement("code", null, "Contextmenu"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Contextmenu)"),
                    " method.To use a columnmenu, inject the",
                    React.createElement("code", null, "ColumnMenu"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(ColumnMenu)"),
                    " method.To use a toolbar, inject the",
                    React.createElement("code", null, "Toolbar"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Toolbar)"),
                    " method.To use a edit, inject the",
                    React.createElement("code", null, "Edit"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Edit)"),
                    " method.To use markers, inject the",
                    React.createElement("code", null, "DayMarkers"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                    " method."))));
    };
    return Events;
}(sample_base_1.SampleBase));
exports.Events = Events;
