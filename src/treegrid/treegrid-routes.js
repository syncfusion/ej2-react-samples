"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var treegrid_overview_1 = require("./treegrid-overview");
var default_1 = require("./default");
var localdata_1 = require("./localdata");
var remote_data_1 = require("./remote-data");
var selfreference_1 = require("./selfreference");
var columnformatting_1 = require("./columnformatting");
var columntemplate_1 = require("./columntemplate");
var reorder_1 = require("./reorder");
var column_menu_1 = require("./column-menu");
var cellalignment_1 = require("./cellalignment");
var autowrap_1 = require("./autowrap");
var showhidecolumn_1 = require("./showhidecolumn");
var header_template_1 = require("./header-template");
var stacked_header_1 = require("./stacked-header");
var checkbox_column_1 = require("./checkbox-column");
var frozencolumn_1 = require("./frozencolumn");
var rowhover_1 = require("./rowhover");
var rowheight_1 = require("./rowheight");
var row_template_1 = require("./row-template");
var detail_template_1 = require("./detail-template");
var drag_drop_1 = require("./drag-drop");
var inline_editing_1 = require("./inline-editing");
var dialog_editing_1 = require("./dialog-editing");
var lockrow_1 = require("./lockrow");
var celledittype_1 = require("./celledittype");
var commandcolumn_1 = require("./commandcolumn");
var edittemplate_1 = require("./edittemplate");
var sorting_1 = require("./sorting");
var sortingapi_1 = require("./sortingapi");
var filtering_1 = require("./filtering");
var filter_menu_1 = require("./filter-menu");
var searching_1 = require("./searching");
var paging_1 = require("./paging");
var pagingapi_1 = require("./pagingapi");
var defaultscrolling_1 = require("./defaultscrolling");
var virtualscrolling_1 = require("./virtualscrolling");
var selection_1 = require("./selection");
var selectionapi_1 = require("./selectionapi");
var checkbox_selection_1 = require("./checkbox-selection");
var aggregate_default_1 = require("./aggregate-default");
var custom_aggregate_1 = require("./custom-aggregate");
var contextmenu_1 = require("./contextmenu");
var customcontextmenu_1 = require("./customcontextmenu");
var export_1 = require("./export");
var print_1 = require("./print");
var conditionalformatting_1 = require("./conditionalformatting");
var toolbar_template_1 = require("./toolbar-template");
var events_1 = require("./events");
var keyboard_1 = require("./keyboard");
var gridlines_1 = require("./gridlines");
exports.treegridRoutes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/treegrid-overview', component: treegrid_overview_1.Overview }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/default', component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/localdata', component: localdata_1.LocalData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/remote-data', component: remote_data_1.RemoteData }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/selfreference', component: selfreference_1.SelfReference }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/columnformatting', component: columnformatting_1.ColumnFormat }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/columntemplate', component: columntemplate_1.ColumnTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/reorder', component: reorder_1.Reorders }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/column-menu', component: column_menu_1.TreeGridColumnMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/cellalignment', component: cellalignment_1.CellAlign }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/autowrap', component: autowrap_1.AutoWrap }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/showhidecolumn', component: showhidecolumn_1.ShowHideColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/header-template', component: header_template_1.HeaderTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/stacked-header', component: stacked_header_1.Stacked }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/checkbox-column', component: checkbox_column_1.CheckboxColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/frozencolumn', component: frozencolumn_1.FrozenColumn }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/rowhover', component: rowhover_1.RowHover }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/rowheight', component: rowheight_1.RowHeight }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/row-template', component: row_template_1.RowTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/detail-template', component: detail_template_1.DetailTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/drag-drop', component: drag_drop_1.DragAndDrop }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/inline-editing', component: inline_editing_1.Editing }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/dialog-editing', component: dialog_editing_1.Dialog }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/lockrow', component: lockrow_1.LockRow }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/celledittype', component: celledittype_1.EditType }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/commandcolumn', component: commandcolumn_1.Command }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/edittemplate', component: edittemplate_1.EditTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/sorting', component: sorting_1.Sorting }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/sortingapi', component: sortingapi_1.SortingAPI }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/filtering', component: filtering_1.Filtering }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/filter-menu', component: filter_menu_1.FilterMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/searching', component: searching_1.Search }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/paging', component: paging_1.Paging }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/pagingapi', component: pagingapi_1.PagingAPI }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/defaultscrolling', component: defaultscrolling_1.DefaultScrolling }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/virtualscrolling', component: virtualscrolling_1.VirtualScrolling }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/selection', component: selection_1.Selection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/selectionapi', component: selectionapi_1.SelectionAPI }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/checkbox-selection', component: checkbox_selection_1.CheckboxSelection }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/aggregate-default', component: aggregate_default_1.AggregateRow }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/custom-aggregate', component: custom_aggregate_1.CustomAggregate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/contextmenu', component: contextmenu_1.TreeContextMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/customcontextmenu', component: customcontextmenu_1.CustomContextMenu }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/export', component: export_1.Export }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/print', component: print_1.Print }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/conditionalformatting', component: conditionalformatting_1.Format }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/toolbar-template', component: toolbar_template_1.ToolbarTemplate }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/events', component: events_1.Events }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/keyboard', component: keyboard_1.KeyBoard }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/gridlines', component: gridlines_1.GridLines })));
exports.treegridCategory = { "treegrid-overview": { "name": "Overview", "category": "Tree Grid" }, "default": { "name": "Default Functionalities", "category": "Tree Grid" }, "localdata": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "selfreference": { "name": "Self Reference", "category": "Data Binding" }, "columnformatting": { "name": "Column Formatting", "category": "Columns" }, "columntemplate": { "name": "Column Template", "category": "Columns" }, "reorder": { "name": "Reorder", "category": "Columns" }, "column-menu": { "name": "Column Menu", "category": "Columns" }, "cellalignment": { "name": "Cell Alignment", "category": "Columns" }, "autowrap": { "name": "AutoWrap Column Cells", "category": "Columns" }, "showhidecolumn": { "name": "Show or Hide Column", "category": "Columns" }, "header-template": { "name": "Header Template", "category": "Columns" }, "stacked-header": { "name": "Stacked Header", "category": "Columns" }, "checkbox-column": { "name": "Checkbox Column", "category": "Columns" }, "frozencolumn": { "name": "Frozen Column", "category": "Columns" }, "rowhover": { "name": "Row Hover", "category": "Rows" }, "rowheight": { "name": "Row Height", "category": "Rows" }, "row-template": { "name": "Row Template", "category": "Rows" }, "detail-template": { "name": "Detail Template", "category": "Rows" }, "drag-drop": { "name": "Drag And Drop", "category": "Rows" }, "inline-editing": { "name": "Inline Editing", "category": "Editing" }, "dialog-editing": { "name": "Dialog Editing", "category": "Editing" }, "lockrow": { "name": "Lock Row", "category": "Editing" }, "celledittype": { "name": "Cell Edit Type", "category": "Editing" }, "commandcolumn": { "name": "Command Column", "category": "Editing" }, "edittemplate": { "name": "Edit Template", "category": "Editing" }, "sorting": { "name": "Multi Sorting", "category": "Sorting" }, "sortingapi": { "name": "Sorting API", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "filter-menu": { "name": "Menu Filter", "category": "Filtering" }, "searching": { "name": "Search", "category": "Filtering" }, "paging": { "name": "Default Paging", "category": "Paging" }, "pagingapi": { "name": "Paging API", "category": "Paging" }, "defaultscrolling": { "name": "Default Scrolling", "category": "Scrolling" }, "virtualscrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "selection": { "name": "Default Selection", "category": "Selection" }, "selectionapi": { "name": "Selection API", "category": "Selection" }, "checkbox-selection": { "name": "Checkbox Selection", "category": "Selection" }, "aggregate-default": { "name": "Default Aggregate", "category": "Aggregates" }, "custom-aggregate": { "name": "Custom Aggregate", "category": "Aggregates" }, "contextmenu": { "name": "Default Context Menu", "category": "Context Menu" }, "customcontextmenu": { "name": "Custom Context Menu", "category": "Context Menu" }, "export": { "name": "Default Exporting", "category": "Exporting" }, "print": { "name": "Print", "category": "Exporting" }, "conditionalformatting": { "name": "Conditional Formatting", "category": "Miscellaneous" }, "toolbar-template": { "name": "Toolbar Template", "category": "Miscellaneous" }, "events": { "name": "Events", "category": "Miscellaneous" }, "keyboard": { "name": "KeyBoard Interaction", "category": "Miscellaneous" }, "gridlines": { "name": "Grid Lines", "category": "Miscellaneous" }, "defaultSample": "treegrid/treegrid-overview" };
