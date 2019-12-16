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
var ContextMenuItem = /** @class */ (function (_super) {
    __extends(ContextMenuItem, _super);
    function ContextMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks',
            notes: 'info',
            resourceInfo: 'resources'
        };
        _this.editSettings = {
            allowAdding: true,
            allowEditing: true,
            allowDeleting: true,
            allowTaskbarEditing: true,
            showDeleteConfirmDialog: true
        };
        _this.splitterSettings = {
            columnIndex: 2
        };
        _this.projectStartDate = new Date('03/25/2019');
        _this.projectEndDate = new Date('07/28/2019');
        _this.gridLines = 'Both';
        _this.toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
        _this.timelineSettings = {
            topTier: {
                unit: 'Week',
                format: 'MMM dd, y',
            },
            bottomTier: {
                unit: 'Day',
            },
        };
        _this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'resources'
        };
        _this.contextMenuItems = ['AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
            'SortAscending', 'SortDescending', 'Add', 'DeleteDependency', 'Convert',
            { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
            { text: 'Expand the Row', target: '.e-content', id: 'expandrow' }];
        _this.eventMarkerDay1 = new Date('4/17/2019');
        _this.eventMarkerDay2 = new Date('5/3/2019');
        _this.eventMarkerDay3 = new Date('6/7/2019');
        _this.eventMarkerDay4 = new Date('7/16/2019');
        return _this;
    }
    ContextMenuItem.prototype.contextMenuOpen = function (args) {
        var record = args.rowData;
        if (args.type !== 'Header') {
            if (!record.hasChildRecords) {
                args.hideItems.push('Collapse the Row');
                args.hideItems.push('Expand the Row');
            }
            else {
                if (record.expanded) {
                    args.hideItems.push('Expand the Row');
                }
                else {
                    args.hideItems.push('Collapse the Row');
                }
            }
        }
    };
    ContextMenuItem.prototype.contextMenuClick = function (args) {
        var record = args.rowData;
        if (args.item.id === 'collapserow') {
            this.ganttInstance.collapseByID(Number(record.ganttProperties.taskId));
        }
        if (args.item.id === 'expandrow') {
            this.ganttInstance.expandByID(Number(record.ganttProperties.taskId));
        }
    };
    ContextMenuItem.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ContextMenu', ref: function (gantt) { return _this.ganttInstance = gantt; }, dataSource: data_1.editingData, dateFormat: 'MMM dd, y', enableContextMenu: true, treeColumnIndex: 1, allowSelection: true, showColumnMenu: false, highlightWeekends: true, allowSorting: true, allowResizing: true, contextMenuItems: this.contextMenuItems, contextMenuOpen: this.contextMenuOpen.bind(this), contextMenuClick: this.contextMenuClick.bind(this), allowUnscheduledTasks: true, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, taskFields: this.taskFields, timelineSettings: this.timelineSettings, labelSettings: this.labelSettings, splitterSettings: this.splitterSettings, height: '410px', editSettings: this.editSettings, gridLines: this.gridLines, toolbar: this.toolbar, resourceNameMapping: 'resourceName', resourceIDMapping: 'resourceId', resources: data_1.editingResources },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '50' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' })),
                    React.createElement(ej2_react_gantt_1.EditDialogFieldsDirective, null,
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'General', headerText: 'General' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Dependency' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Resources' }),
                        React.createElement(ej2_react_gantt_1.EditDialogFieldDirective, { type: 'Notes' })),
                    React.createElement(ej2_react_gantt_1.EventMarkersDirective, null,
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay1, label: 'Project approval and kick-off' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay2, label: 'Foundation inspection' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay3, label: 'Site manager inspection' }),
                        React.createElement(ej2_react_gantt_1.EventMarkerDirective, { day: this.eventMarkerDay4, label: 'Property handover and sign-off' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Selection, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.ContextMenu, ej2_react_gantt_1.Resize, ej2_react_gantt_1.Sort] })),
                React.createElement("div", { style: { float: 'right', margin: '10px' } },
                    "Source:",
                    React.createElement("a", { href: "https://en.wikipedia.org/wiki/Construction", target: '_blank' }, "https://en.wikipedia.org/"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the various phases involved in constructing a residential house, from testing the soil to handing over the fully constructed property to the owner. This also demonstrates the usage of default and custom context menu in Gantt component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Gantt has an option to show the context menu while performing right click on it. You can configure the default and custom menu items in the context menu using the ",
                    React.createElement("code", null, "contextMenuItems"),
                    " property. Each menu item will be displayed contextually based on its target. In this demo we have rendered following default and custom menu items"),
                React.createElement("p", null, "Default items:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "AutoFitAll"),
                        " - Auto fit all columns."),
                    React.createElement("li", null,
                        React.createElement("code", null, "AutoFit"),
                        " - Auto fit the current column."),
                    React.createElement("li", null,
                        React.createElement("code", null, "TaskInformation"),
                        " - Edit the current record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DeleteTask"),
                        " - Delete the current record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Save"),
                        " - Save the edited record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cancel"),
                        " - Cancel the edited state."),
                    React.createElement("li", null,
                        React.createElement("code", null, "SortAscending "),
                        " - Sort the current column in ascending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "SortDescending "),
                        " - Sort the current column in descending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DeleteDependency "),
                        " - Delete the dependency of the current record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Convert "),
                        " - Convert the normal task in to milestone task and vice versa."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Add"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("code", null, "Above"),
                                " - Add a new row above the selected row "),
                            React.createElement("li", null,
                                React.createElement("code", null, "Below"),
                                " - Add a new row below the selected row"),
                            React.createElement("li", null,
                                React.createElement("code", null, "Child"),
                                " - Add a new row as child to the selected row"),
                            React.createElement("li", null,
                                React.createElement("code", null, "Milestone"),
                                " - Add a milestone task below to selected row")))),
                React.createElement("p", null, "Custom items:"),
                React.createElement("p", null,
                    "In this demo, custom menu items have been enabled in the context menu to perform expanding and collapsing the parent rows,",
                    React.createElement("li", null,
                        React.createElement("code", null, "Expand the Row"),
                        " - Used to expand the parent row and it will render where the row is in a collapsed state."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Collapse the Row"),
                        " - Used to collapse the parent row and it will render  where the row is in a expanded state."),
                    "To use context menu feature, we need to inject ",
                    React.createElement("code", null, "ContextMenu"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    return ContextMenuItem;
}(sample_base_1.SampleBase));
exports.ContextMenuItem = ContextMenuItem;
