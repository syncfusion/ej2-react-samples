import {  Route } from 'react-router-dom';
import * as React from 'react';
import { OverView } from './overview';
import { Default } from './default';
import { Grouping } from './grouping';
import { GridLines } from './grid-lines';
import { Hierarchy } from './hierarchy';
import { Clipboard } from './clipboard';
import { ContextMenuSample } from './context-menu';
import { MasterDetail } from './master-detail';
import { Scrolling } from './scrolling';
import { Virtualization } from './virtualization';
import { Localbinding } from './local-binding';
import { RemoteDataBinding } from './remote-data';
import { CustomBinding } from './custom-binding';
import { AutoWrap } from './auto-wrap';
import { ShowHide } from './show-hide';
import { StackedHeader } from './stacked-header';
import { Reordering } from './reorder';
import { ColChooser } from './column-chooser';
import { ColumnResizing } from './column-resizing';
import { ColumnSpanning } from './column-spanning';
import { ColumnTemplate } from './column-template';
import { FrozenRows } from './frozen-rows';
import { ColumnMenuSample } from './column-menu';
import { ForeignKeyColumn } from './foreign-key';
import { RowHeight } from './row-height';
import { RowTemplate } from './row-template';
import { DetailTemplate } from './detail-template';
import { Source } from './row-drag-drop';
import { DragWithinGrid } from './drag-drop-within-grid';
import { RowSpanning } from './row-spanning';
import { Sorting } from './sorting';
import { Filtering } from './filtering';
import { FilterMenu } from './filter-menu';
import { Searching } from './searching';
import { Paging } from './paging';
import { Selectioning } from './selection';
import { SelectionAPI } from './selection-api';
import { CheckboxSelection } from './checkbox-selection';
import { AggregateDefault } from './aggregate-default';
import { AggregateGroup } from './aggregate-group';
import { ReactiveAggregate } from './reactive-aggregate';
import { NormalEdit } from './normal-edit';
import { DialogEdit } from './dialog-edit';
import { DialogTemplate } from './dialog-template';
import { BatchEdit } from './batch';
import { CommandColumnEdit } from './command-column';
import { Exporting } from './default-exporting';
import { AdvancedExporting } from './advanced-exporting';
import { HierarchyExport } from './master-details-export';
import { Print } from './print';


export const gridRoutes = (
    <div>
         <Route  path='/:theme/grid/overview' component={ OverView }/>
         <Route  path='/:theme/grid/default' component={ Default }/>
         <Route  path='/:theme/grid/grouping' component={ Grouping }/>
         <Route  path='/:theme/grid/grid-lines' component={ GridLines }/>
         <Route  path='/:theme/grid/hierarchy' component={ Hierarchy }/>
         <Route  path='/:theme/grid/clipboard' component={ Clipboard }/>
         <Route  path='/:theme/grid/context-menu' component={ ContextMenuSample }/>
         <Route  path='/:theme/grid/master-detail' component={ MasterDetail }/>
         <Route  path='/:theme/grid/scrolling' component={ Scrolling }/>
         <Route  path='/:theme/grid/virtualization' component={ Virtualization }/>
         <Route  path='/:theme/grid/local-binding' component={ Localbinding }/>
         <Route  path='/:theme/grid/remote-data' component={ RemoteDataBinding }/>
         <Route  path='/:theme/grid/custom-binding' component={ CustomBinding }/>
         <Route  path='/:theme/grid/auto-wrap' component={ AutoWrap }/>
         <Route  path='/:theme/grid/show-hide' component={ ShowHide }/>
         <Route  path='/:theme/grid/stacked-header' component={ StackedHeader }/>
         <Route  path='/:theme/grid/reorder' component={ Reordering }/>
         <Route  path='/:theme/grid/column-chooser' component={ ColChooser }/>
         <Route  path='/:theme/grid/column-resizing' component={ ColumnResizing }/>
         <Route  path='/:theme/grid/column-spanning' component={ ColumnSpanning }/>
         <Route  path='/:theme/grid/column-template' component={ ColumnTemplate }/>
         <Route  path='/:theme/grid/frozen-rows' component={ FrozenRows }/>
         <Route  path='/:theme/grid/column-menu' component={ ColumnMenuSample }/>
         <Route  path='/:theme/grid/foreign-key' component={ ForeignKeyColumn }/>
         <Route  path='/:theme/grid/row-height' component={ RowHeight }/>
         <Route  path='/:theme/grid/row-template' component={ RowTemplate }/>
         <Route  path='/:theme/grid/detail-template' component={ DetailTemplate }/>
         <Route  path='/:theme/grid/row-drag-drop' component={ Source }/>
         <Route  path='/:theme/grid/drag-drop-within-grid' component={ DragWithinGrid }/>
         <Route  path='/:theme/grid/row-spanning' component={ RowSpanning }/>
         <Route  path='/:theme/grid/sorting' component={ Sorting }/>
         <Route  path='/:theme/grid/filtering' component={ Filtering }/>
         <Route  path='/:theme/grid/filter-menu' component={ FilterMenu }/>
         <Route  path='/:theme/grid/searching' component={ Searching }/>
         <Route  path='/:theme/grid/paging' component={ Paging }/>
         <Route  path='/:theme/grid/selection' component={ Selectioning }/>
         <Route  path='/:theme/grid/selection-api' component={ SelectionAPI }/>
         <Route  path='/:theme/grid/checkbox-selection' component={ CheckboxSelection }/>
         <Route  path='/:theme/grid/aggregate-default' component={ AggregateDefault }/>
         <Route  path='/:theme/grid/aggregate-group' component={ AggregateGroup }/>
         <Route  path='/:theme/grid/reactive-aggregate' component={ ReactiveAggregate }/>
         <Route  path='/:theme/grid/normal-edit' component={ NormalEdit }/>
         <Route  path='/:theme/grid/dialog-edit' component={ DialogEdit }/>
         <Route  path='/:theme/grid/dialog-template' component={ DialogTemplate }/>
         <Route  path='/:theme/grid/batch' component={ BatchEdit }/>
         <Route  path='/:theme/grid/command-column' component={ CommandColumnEdit }/>
         <Route  path='/:theme/grid/default-exporting' component={ Exporting }/>
         <Route  path='/:theme/grid/advanced-exporting' component={ AdvancedExporting }/>
         <Route  path='/:theme/grid/master-details-export' component={ HierarchyExport }/>
         <Route  path='/:theme/grid/print' component={ Print }/>

    </div>
)

export const gridCategory = {"overview":{"name":"Overview","category":"Data Grid"},"default":{"name":"Default Functionalities","category":"Data Grid"},"grouping":{"name":"Grouping","category":"Data Grid"},"grid-lines":{"name":"GridLines","category":"Data Grid"},"hierarchy":{"name":"Hierarchy Grid","category":"Data Grid"},"clipboard":{"name":"Clipboard","category":"Data Grid"},"context-menu":{"name":"Context Menu","category":"Data Grid"},"master-detail":{"name":"Master/Detail","category":"Data Grid"},"scrolling":{"name":"Default Scrolling","category":"Scrolling"},"virtualization":{"name":"Virtual Scrolling","category":"Scrolling"},"local-binding":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"custom-binding":{"name":"Custom Binding","category":"Data Binding"},"auto-wrap":{"name":"AutoWrap Column cells","category":"Columns"},"show-hide":{"name":"Show or Hide Column","category":"Columns"},"stacked-header":{"name":"Stacked Header","category":"Columns"},"reorder":{"name":"Reorder","category":"Columns"},"column-chooser":{"name":"Column Chooser","category":"Columns"},"column-resizing":{"name":"Column Resize","category":"Columns"},"column-spanning":{"name":"Column Spanning","category":"Columns"},"column-template":{"name":"Column Template","category":"Columns"},"frozen-rows":{"name":"Frozen Rows And Columns","category":"Columns"},"column-menu":{"name":"Column Menu","category":"Columns"},"foreign-key":{"name":"Foreign Key Column","category":"Columns"},"row-height":{"name":"Row Height","category":"Rows"},"row-template":{"name":"Row Template","category":"Rows"},"detail-template":{"name":"Detail Template","category":"Rows"},"row-drag-drop":{"name":"Row Drag and Drop","category":"Rows"},"drag-drop-within-grid":{"name":"Row Drag And Drop Within Grid","category":"Rows"},"row-spanning":{"name":"Row Spanning","category":"Rows"},"sorting":{"name":"Sorting","category":"Sorting"},"filtering":{"name":"Default Filtering","category":"Filtering"},"filter-menu":{"name":"Filter Menu","category":"Filtering"},"searching":{"name":"Search","category":"Filtering"},"paging":{"name":"Paging","category":"Paging"},"selection":{"name":"Default Selection","category":"Selection"},"selection-api":{"name":"Selection API","category":"Selection"},"checkbox-selection":{"name":"Checkbox Selection","category":"Selection"},"aggregate-default":{"name":"Default Aggregate","category":"Aggregates"},"aggregate-group":{"name":"Group and Caption aggregate","category":"Aggregates"},"reactive-aggregate":{"name":"Reactive Aggregate","category":"Aggregates"},"normal-edit":{"name":"Inline Editing","category":"Editing"},"dialog-edit":{"name":"Dialog Editing","category":"Editing"},"dialog-template":{"name":"Dialog Template","category":"Editing"},"batch":{"name":"Batch Editing","category":"Editing"},"command-column":{"name":"CommandColumn","category":"Editing"},"default-exporting":{"name":"Default Exporting","category":"Exporting"},"advanced-exporting":{"name":"Advanced Exporting","category":"Exporting"},"master-details-export":{"name":"Hierarchy Exporting","category":"Exporting"},"print":{"name":"Print","category":"Exporting"},"defaultSample":"grid/overview"}