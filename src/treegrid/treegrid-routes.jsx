import { Route } from 'react-router-dom';
import * as React from 'react';
import { Overview } from './treegrid-overview';
import { Default } from './default';
import { LocalData } from './localdata';
import { RemoteData } from './remote-data';
import { SelfReference } from './selfreference';
import { ColumnFormat } from './columnformatting';
import { ColumnTemplate } from './columntemplate';
import { Reorders } from './reorder';
import { TreeGridColumnMenu } from './column-menu';
import { CellAlign } from './cellalignment';
import { AutoWrap } from './autowrap';
import { ShowHideColumn } from './showhidecolumn';
import { HeaderTemplate } from './header-template';
import { Stacked } from './stacked-header';
import { CheckboxColumn } from './checkbox-column';
import { FrozenColumn } from './frozencolumn';
import { RowHover } from './rowhover';
import { RowHeight } from './rowheight';
import { RowTemplate } from './row-template';
import { DetailTemplate } from './detail-template';
import { DragAndDrop } from './drag-drop';
import { Editing } from './inline-editing';
import { Dialog } from './dialog-editing';
import { LockRow } from './lockrow';
import { EditType } from './celledittype';
import { Command } from './commandcolumn';
import { EditTemplate } from './edittemplate';
import { Sorting } from './sorting';
import { SortingAPI } from './sortingapi';
import { Filtering } from './filtering';
import { FilterMenu } from './filter-menu';
import { Search } from './searching';
import { Paging } from './paging';
import { PagingAPI } from './pagingapi';
import { DefaultScrolling } from './defaultscrolling';
import { VirtualScrolling } from './virtualscrolling';
import { Selection } from './selection';
import { SelectionAPI } from './selectionapi';
import { CheckboxSelection } from './checkbox-selection';
import { AggregateRow } from './aggregate-default';
import { CustomAggregate } from './custom-aggregate';
import { TreeContextMenu } from './contextmenu';
import { CustomContextMenu } from './customcontextmenu';
import { Export } from './export';
import { Print } from './print';
import { Format } from './conditionalformatting';
import { ToolbarTemplate } from './toolbar-template';
import { Events } from './events';
import { KeyBoard } from './keyboard';
import { GridLines } from './gridlines';
export const treegridRoutes = (<div>
         <Route path='/:theme/treegrid/treegrid-overview' component={Overview}/>
         <Route path='/:theme/treegrid/default' component={Default}/>
         <Route path='/:theme/treegrid/localdata' component={LocalData}/>
         <Route path='/:theme/treegrid/remote-data' component={RemoteData}/>
         <Route path='/:theme/treegrid/selfreference' component={SelfReference}/>
         <Route path='/:theme/treegrid/columnformatting' component={ColumnFormat}/>
         <Route path='/:theme/treegrid/columntemplate' component={ColumnTemplate}/>
         <Route path='/:theme/treegrid/reorder' component={Reorders}/>
         <Route path='/:theme/treegrid/column-menu' component={TreeGridColumnMenu}/>
         <Route path='/:theme/treegrid/cellalignment' component={CellAlign}/>
         <Route path='/:theme/treegrid/autowrap' component={AutoWrap}/>
         <Route path='/:theme/treegrid/showhidecolumn' component={ShowHideColumn}/>
         <Route path='/:theme/treegrid/header-template' component={HeaderTemplate}/>
         <Route path='/:theme/treegrid/stacked-header' component={Stacked}/>
         <Route path='/:theme/treegrid/checkbox-column' component={CheckboxColumn}/>
         <Route path='/:theme/treegrid/frozencolumn' component={FrozenColumn}/>
         <Route path='/:theme/treegrid/rowhover' component={RowHover}/>
         <Route path='/:theme/treegrid/rowheight' component={RowHeight}/>
         <Route path='/:theme/treegrid/row-template' component={RowTemplate}/>
         <Route path='/:theme/treegrid/detail-template' component={DetailTemplate}/>
         <Route path='/:theme/treegrid/drag-drop' component={DragAndDrop}/>
         <Route path='/:theme/treegrid/inline-editing' component={Editing}/>
         <Route path='/:theme/treegrid/dialog-editing' component={Dialog}/>
         <Route path='/:theme/treegrid/lockrow' component={LockRow}/>
         <Route path='/:theme/treegrid/celledittype' component={EditType}/>
         <Route path='/:theme/treegrid/commandcolumn' component={Command}/>
         <Route path='/:theme/treegrid/edittemplate' component={EditTemplate}/>
         <Route path='/:theme/treegrid/sorting' component={Sorting}/>
         <Route path='/:theme/treegrid/sortingapi' component={SortingAPI}/>
         <Route path='/:theme/treegrid/filtering' component={Filtering}/>
         <Route path='/:theme/treegrid/filter-menu' component={FilterMenu}/>
         <Route path='/:theme/treegrid/searching' component={Search}/>
         <Route path='/:theme/treegrid/paging' component={Paging}/>
         <Route path='/:theme/treegrid/pagingapi' component={PagingAPI}/>
         <Route path='/:theme/treegrid/defaultscrolling' component={DefaultScrolling}/>
         <Route path='/:theme/treegrid/virtualscrolling' component={VirtualScrolling}/>
         <Route path='/:theme/treegrid/selection' component={Selection}/>
         <Route path='/:theme/treegrid/selectionapi' component={SelectionAPI}/>
         <Route path='/:theme/treegrid/checkbox-selection' component={CheckboxSelection}/>
         <Route path='/:theme/treegrid/aggregate-default' component={AggregateRow}/>
         <Route path='/:theme/treegrid/custom-aggregate' component={CustomAggregate}/>
         <Route path='/:theme/treegrid/contextmenu' component={TreeContextMenu}/>
         <Route path='/:theme/treegrid/customcontextmenu' component={CustomContextMenu}/>
         <Route path='/:theme/treegrid/export' component={Export}/>
         <Route path='/:theme/treegrid/print' component={Print}/>
         <Route path='/:theme/treegrid/conditionalformatting' component={Format}/>
         <Route path='/:theme/treegrid/toolbar-template' component={ToolbarTemplate}/>
         <Route path='/:theme/treegrid/events' component={Events}/>
         <Route path='/:theme/treegrid/keyboard' component={KeyBoard}/>
         <Route path='/:theme/treegrid/gridlines' component={GridLines}/>

    </div>);
export const treegridCategory = { "treegrid-overview": { "name": "Overview", "category": "Tree Grid" }, "default": { "name": "Default Functionalities", "category": "Tree Grid" }, "localdata": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "selfreference": { "name": "Self Reference", "category": "Data Binding" }, "columnformatting": { "name": "Column Formatting", "category": "Columns" }, "columntemplate": { "name": "Column Template", "category": "Columns" }, "reorder": { "name": "Reorder", "category": "Columns" }, "column-menu": { "name": "Column Menu", "category": "Columns" }, "cellalignment": { "name": "Cell Alignment", "category": "Columns" }, "autowrap": { "name": "AutoWrap Column Cells", "category": "Columns" }, "showhidecolumn": { "name": "Show or Hide Column", "category": "Columns" }, "header-template": { "name": "Header Template", "category": "Columns" }, "stacked-header": { "name": "Stacked Header", "category": "Columns" }, "checkbox-column": { "name": "Checkbox Column", "category": "Columns" }, "frozencolumn": { "name": "Frozen Column", "category": "Columns" }, "rowhover": { "name": "Row Hover", "category": "Rows" }, "rowheight": { "name": "Row Height", "category": "Rows" }, "row-template": { "name": "Row Template", "category": "Rows" }, "detail-template": { "name": "Detail Template", "category": "Rows" }, "drag-drop": { "name": "Drag And Drop", "category": "Rows" }, "inline-editing": { "name": "Inline Editing", "category": "Editing" }, "dialog-editing": { "name": "Dialog Editing", "category": "Editing" }, "lockrow": { "name": "Lock Row", "category": "Editing" }, "celledittype": { "name": "Cell Edit Type", "category": "Editing" }, "commandcolumn": { "name": "Command Column", "category": "Editing" }, "edittemplate": { "name": "Edit Template", "category": "Editing" }, "sorting": { "name": "Multi Sorting", "category": "Sorting" }, "sortingapi": { "name": "Sorting API", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "filter-menu": { "name": "Menu Filter", "category": "Filtering" }, "searching": { "name": "Search", "category": "Filtering" }, "paging": { "name": "Default Paging", "category": "Paging" }, "pagingapi": { "name": "Paging API", "category": "Paging" }, "defaultscrolling": { "name": "Default Scrolling", "category": "Scrolling" }, "virtualscrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "selection": { "name": "Default Selection", "category": "Selection" }, "selectionapi": { "name": "Selection API", "category": "Selection" }, "checkbox-selection": { "name": "Checkbox Selection", "category": "Selection" }, "aggregate-default": { "name": "Default Aggregate", "category": "Aggregates" }, "custom-aggregate": { "name": "Custom Aggregate", "category": "Aggregates" }, "contextmenu": { "name": "Default Context Menu", "category": "Context Menu" }, "customcontextmenu": { "name": "Custom Context Menu", "category": "Context Menu" }, "export": { "name": "Default Exporting", "category": "Exporting" }, "print": { "name": "Print", "category": "Exporting" }, "conditionalformatting": { "name": "Conditional Formatting", "category": "Miscellaneous" }, "toolbar-template": { "name": "Toolbar Template", "category": "Miscellaneous" }, "events": { "name": "Events", "category": "Miscellaneous" }, "keyboard": { "name": "KeyBoard Interaction", "category": "Miscellaneous" }, "gridlines": { "name": "Grid Lines", "category": "Miscellaneous" }, "defaultSample": "treegrid/treegrid-overview" };
