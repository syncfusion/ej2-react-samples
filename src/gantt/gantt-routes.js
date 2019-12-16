"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var editing_1 = require("./editing");
var selection_1 = require("./selection");
var context_menu_1 = require("./context-menu");
var exporting_1 = require("./exporting");
var filtering_1 = require("./filtering");
var events_1 = require("./events");
var keyboard_interactions_1 = require("./keyboard-interactions");
var drag_and_drop_1 = require("./drag-and-drop");
var local_data_1 = require("./local-data");
var remote_data_1 = require("./remote-data");
var self_reference_data_1 = require("./self-reference-data");
var work_week_1 = require("./work-week");
var working_time_range_1 = require("./working-time-range");
var holidays_1 = require("./holidays");
var resource_allocation_1 = require("./resource-allocation");
var event_markers_1 = require("./event-markers");
var indicators_1 = require("./indicators");
var baseline_1 = require("./baseline");
var unscheduled_task_1 = require("./unscheduled-task");
var timeline_1 = require("./timeline");
var zooming_1 = require("./zooming");
var column_menu_1 = require("./column-menu");
var show_hide_column_1 = require("./show-hide-column");
var reorder_1 = require("./reorder");
var resizing_1 = require("./resizing");
var column_template_1 = require("./column-template");
var header_template_1 = require("./header-template");
var taskbar_template_1 = require("./taskbar-template");
var tasklabel_template_1 = require("./tasklabel-template");
var tooltip_template_1 = require("./tooltip-template");
var toolbar_template_1 = require("./toolbar-template");
var grid_lines_1 = require("./grid-lines");
var sorting_1 = require("./sorting");
var sorting_api_1 = require("./sorting-api");
exports.ganttRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/editing', component: editing_1.Editing }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/selection', component: selection_1.GanttSelection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/context-menu', component: context_menu_1.ContextMenuItem }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/exporting', component: exporting_1.Exporting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/filtering', component: filtering_1.Filtering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/events', component: events_1.Events }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/keyboard-interactions', component: keyboard_interactions_1.KeyboardInteraction }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/drag-and-drop', component: drag_and_drop_1.DragAndDrop }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/local-data', component: local_data_1.LocalData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/remote-data', component: remote_data_1.RemoteData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/self-reference-data', component: self_reference_data_1.SelfReferenceData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/work-week', component: work_week_1.WorkWeek }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/working-time-range', component: working_time_range_1.WorkingTimeRange }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/holidays', component: holidays_1.Holidays }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/resource-allocation', component: resource_allocation_1.ResourceAllocation }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/event-markers', component: event_markers_1.EventMarkers }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/indicators', component: indicators_1.Indicators }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/baseline', component: baseline_1.Baseline }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/unscheduled-task', component: unscheduled_task_1.UnscheduledTask }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/timeline', component: timeline_1.Timeline }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/zooming', component: zooming_1.Zooming }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/column-menu', component: column_menu_1.GanttColumnMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/show-hide-column', component: show_hide_column_1.ShowHideColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/reorder', component: reorder_1.ReorderColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/resizing', component: resizing_1.Resizing }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/column-template', component: column_template_1.ColumnTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/header-template', component: header_template_1.HeaderTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/taskbar-template', component: taskbar_template_1.Taskbar }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/tasklabel-template', component: tasklabel_template_1.TasklabelTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/tooltip-template', component: tooltip_template_1.TooltipTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/toolbar-template', component: toolbar_template_1.ToolbarTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/grid-lines', component: grid_lines_1.GridLines }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/sorting', component: sorting_1.Sorting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/sorting-api', component: sorting_api_1.SortingAPI })));
exports.ganttCategory = { "default": { "name": "Default Functionalities", "category": "Gantt" }, "editing": { "name": "Editing", "category": "Gantt" }, "selection": { "name": "Selection", "category": "Gantt" }, "context-menu": { "name": "Context Menu", "category": "Gantt" }, "exporting": { "name": "Exporting", "category": "Gantt" }, "filtering": { "name": "Filtering", "category": "Gantt" }, "events": { "name": "Events", "category": "Gantt" }, "keyboard-interactions": { "name": "Keyboard Interactions", "category": "Gantt" }, "drag-and-drop": { "name": "Row Drag And Drop", "category": "Gantt" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "self-reference-data": { "name": "Self Reference Data", "category": "Data Binding" }, "work-week": { "name": "Workweek", "category": "Scheduling Concepts" }, "working-time-range": { "name": "Working Time Range", "category": "Scheduling Concepts" }, "holidays": { "name": "Holidays", "category": "Scheduling Concepts" }, "resource-allocation": { "name": "Resource Allocation", "category": "Scheduling Concepts" }, "event-markers": { "name": "Event Markers", "category": "Scheduling Concepts" }, "indicators": { "name": "Indicators", "category": "Scheduling Concepts" }, "baseline": { "name": "Baseline", "category": "Scheduling Concepts" }, "unscheduled-task": { "name": "Unscheduled Tasks", "category": "Scheduling Concepts" }, "timeline": { "name": "Timeline API", "category": "Timeline" }, "zooming": { "name": "Zooming", "category": "Timeline" }, "column-menu": { "name": "Column Menu", "category": "Columns" }, "show-hide-column": { "name": "Show or Hide Column", "category": "Columns" }, "reorder": { "name": "Column Reorder", "category": "Columns" }, "resizing": { "name": "Column Resize", "category": "Columns" }, "column-template": { "name": "Column Template", "category": "Columns" }, "header-template": { "name": "Header Template", "category": "Columns" }, "taskbar-template": { "name": "Taskbar Template", "category": "Customization" }, "tasklabel-template": { "name": "Task Label Template", "category": "Customization" }, "tooltip-template": { "name": "Tooltip Template", "category": "Customization" }, "toolbar-template": { "name": "Toolbar Template", "category": "Customization" }, "grid-lines": { "name": "Grid Lines", "category": "Customization" }, "sorting": { "name": "Default", "category": "Sorting" }, "sorting-api": { "name": "Sorting API", "category": "Sorting" }, "defaultSample": "gantt/default" };
