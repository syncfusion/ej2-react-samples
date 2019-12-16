"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_1 = require("./overview");
var default_1 = require("./default");
var grouping_1 = require("./grouping");
var grid_lines_1 = require("./grid-lines");
var hierarchy_1 = require("./hierarchy");
var clipboard_1 = require("./clipboard");
var context_menu_1 = require("./context-menu");
var master_detail_1 = require("./master-detail");
var scrolling_1 = require("./scrolling");
var virtualization_1 = require("./virtualization");
var local_binding_1 = require("./local-binding");
var remote_data_1 = require("./remote-data");
var custom_binding_1 = require("./custom-binding");
var auto_wrap_1 = require("./auto-wrap");
var show_hide_1 = require("./show-hide");
var stacked_header_1 = require("./stacked-header");
var reorder_1 = require("./reorder");
var column_chooser_1 = require("./column-chooser");
var column_resizing_1 = require("./column-resizing");
var column_spanning_1 = require("./column-spanning");
var column_template_1 = require("./column-template");
var frozen_rows_1 = require("./frozen-rows");
var column_menu_1 = require("./column-menu");
var foreign_key_1 = require("./foreign-key");
var row_height_1 = require("./row-height");
var row_template_1 = require("./row-template");
var detail_template_1 = require("./detail-template");
var row_drag_drop_1 = require("./row-drag-drop");
var drag_drop_within_grid_1 = require("./drag-drop-within-grid");
var row_spanning_1 = require("./row-spanning");
var sorting_1 = require("./sorting");
var filtering_1 = require("./filtering");
var filter_menu_1 = require("./filter-menu");
var searching_1 = require("./searching");
var paging_1 = require("./paging");
var selection_1 = require("./selection");
var selection_api_1 = require("./selection-api");
var checkbox_selection_1 = require("./checkbox-selection");
var aggregate_default_1 = require("./aggregate-default");
var aggregate_group_1 = require("./aggregate-group");
var reactive_aggregate_1 = require("./reactive-aggregate");
var normal_edit_1 = require("./normal-edit");
var dialog_edit_1 = require("./dialog-edit");
var dialog_template_1 = require("./dialog-template");
var batch_1 = require("./batch");
var command_column_1 = require("./command-column");
var default_exporting_1 = require("./default-exporting");
var advanced_exporting_1 = require("./advanced-exporting");
var master_details_export_1 = require("./master-details-export");
var print_1 = require("./print");
exports.gridRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/overview', component: overview_1.OverView }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/grouping', component: grouping_1.Grouping }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/grid-lines', component: grid_lines_1.GridLines }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/hierarchy', component: hierarchy_1.Hierarchy }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/clipboard', component: clipboard_1.Clipboard }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/context-menu', component: context_menu_1.ContextMenuSample }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/master-detail', component: master_detail_1.MasterDetail }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/scrolling', component: scrolling_1.Scrolling }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/virtualization', component: virtualization_1.Virtualization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/local-binding', component: local_binding_1.Localbinding }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/remote-data', component: remote_data_1.RemoteDataBinding }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/custom-binding', component: custom_binding_1.CustomBinding }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/auto-wrap', component: auto_wrap_1.AutoWrap }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/show-hide', component: show_hide_1.ShowHide }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/stacked-header', component: stacked_header_1.StackedHeader }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/reorder', component: reorder_1.Reordering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-chooser', component: column_chooser_1.ColChooser }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-resizing', component: column_resizing_1.ColumnResizing }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-spanning', component: column_spanning_1.ColumnSpanning }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-template', component: column_template_1.ColumnTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/frozen-rows', component: frozen_rows_1.FrozenRows }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-menu', component: column_menu_1.ColumnMenuSample }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/foreign-key', component: foreign_key_1.ForeignKeyColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-height', component: row_height_1.RowHeight }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-template', component: row_template_1.RowTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/detail-template', component: detail_template_1.DetailTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-drag-drop', component: row_drag_drop_1.Source }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/drag-drop-within-grid', component: drag_drop_within_grid_1.DragWithinGrid }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-spanning', component: row_spanning_1.RowSpanning }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/sorting', component: sorting_1.Sorting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/filtering', component: filtering_1.Filtering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/filter-menu', component: filter_menu_1.FilterMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/searching', component: searching_1.Searching }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/paging', component: paging_1.Paging }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/selection', component: selection_1.Selectioning }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/selection-api', component: selection_api_1.SelectionAPI }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/checkbox-selection', component: checkbox_selection_1.CheckboxSelection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/aggregate-default', component: aggregate_default_1.AggregateDefault }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/aggregate-group', component: aggregate_group_1.AggregateGroup }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/reactive-aggregate', component: reactive_aggregate_1.ReactiveAggregate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/normal-edit', component: normal_edit_1.NormalEdit }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/dialog-edit', component: dialog_edit_1.DialogEdit }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/dialog-template', component: dialog_template_1.DialogTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/batch', component: batch_1.BatchEdit }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/command-column', component: command_column_1.CommandColumnEdit }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/default-exporting', component: default_exporting_1.Exporting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/advanced-exporting', component: advanced_exporting_1.AdvancedExporting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/master-details-export', component: master_details_export_1.HierarchyExport }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/print', component: print_1.Print })));
exports.gridCategory = { "overview": { "name": "Overview", "category": "Data Grid" }, "default": { "name": "Default Functionalities", "category": "Data Grid" }, "grouping": { "name": "Grouping", "category": "Data Grid" }, "grid-lines": { "name": "GridLines", "category": "Data Grid" }, "hierarchy": { "name": "Hierarchy Grid", "category": "Data Grid" }, "clipboard": { "name": "Clipboard", "category": "Data Grid" }, "context-menu": { "name": "Context Menu", "category": "Data Grid" }, "master-detail": { "name": "Master/Detail", "category": "Data Grid" }, "scrolling": { "name": "Default Scrolling", "category": "Scrolling" }, "virtualization": { "name": "Virtual Scrolling", "category": "Scrolling" }, "local-binding": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "custom-binding": { "name": "Custom Binding", "category": "Data Binding" }, "auto-wrap": { "name": "AutoWrap Column cells", "category": "Columns" }, "show-hide": { "name": "Show or Hide Column", "category": "Columns" }, "stacked-header": { "name": "Stacked Header", "category": "Columns" }, "reorder": { "name": "Reorder", "category": "Columns" }, "column-chooser": { "name": "Column Chooser", "category": "Columns" }, "column-resizing": { "name": "Column Resize", "category": "Columns" }, "column-spanning": { "name": "Column Spanning", "category": "Columns" }, "column-template": { "name": "Column Template", "category": "Columns" }, "frozen-rows": { "name": "Frozen Rows And Columns", "category": "Columns" }, "column-menu": { "name": "Column Menu", "category": "Columns" }, "foreign-key": { "name": "Foreign Key Column", "category": "Columns" }, "row-height": { "name": "Row Height", "category": "Rows" }, "row-template": { "name": "Row Template", "category": "Rows" }, "detail-template": { "name": "Detail Template", "category": "Rows" }, "row-drag-drop": { "name": "Row Drag and Drop", "category": "Rows" }, "drag-drop-within-grid": { "name": "Row Drag And Drop Within Grid", "category": "Rows" }, "row-spanning": { "name": "Row Spanning", "category": "Rows" }, "sorting": { "name": "Sorting", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "filter-menu": { "name": "Filter Menu", "category": "Filtering" }, "searching": { "name": "Search", "category": "Filtering" }, "paging": { "name": "Paging", "category": "Paging" }, "selection": { "name": "Default Selection", "category": "Selection" }, "selection-api": { "name": "Selection API", "category": "Selection" }, "checkbox-selection": { "name": "Checkbox Selection", "category": "Selection" }, "aggregate-default": { "name": "Default Aggregate", "category": "Aggregates" }, "aggregate-group": { "name": "Group and Caption aggregate", "category": "Aggregates" }, "reactive-aggregate": { "name": "Reactive Aggregate", "category": "Aggregates" }, "normal-edit": { "name": "Inline Editing", "category": "Editing" }, "dialog-edit": { "name": "Dialog Editing", "category": "Editing" }, "dialog-template": { "name": "Dialog Template", "category": "Editing" }, "batch": { "name": "Batch Editing", "category": "Editing" }, "command-column": { "name": "CommandColumn", "category": "Editing" }, "default-exporting": { "name": "Default Exporting", "category": "Exporting" }, "advanced-exporting": { "name": "Advanced Exporting", "category": "Exporting" }, "master-details-export": { "name": "Hierarchy Exporting", "category": "Exporting" }, "print": { "name": "Print", "category": "Exporting" }, "defaultSample": "grid/overview" };
