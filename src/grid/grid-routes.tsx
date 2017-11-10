import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { GridLines } from './gridlines';
import { Paging } from './paging';
import { Filtering } from './filtering';
import { FilterMenu } from './filtermenu';
import { Grouping } from './grouping';
import { Sorting } from './sorting';
import { Scrolling } from './scrolling';
import { Virtualization } from './virtualization';
import { Searching } from './searching';
import { MasterDetail } from './masterdetail';
import { Source } from './rowdraganddrop';
import { Hierarchy } from './hierarchy';
import { Clipboard } from './clipboard';
import { Localbinding } from './localbinding';
import { RemoteDataBinding } from './remotedata';
import { ShowHide } from './showhide';
import { StackedHeader } from './stackedheader';
import { AutoWrap } from './autowrap';
import { Reordering } from './reorder';
import { Selectioning } from './selection';
import { SelectionAPI } from './selectionapi';
import { CheckboxSelection } from './checkboxselection';
import { ColumnChooser } from './columnchooser';
import { ColumnResizing } from './columnresizing';
import { NormalEdit } from './normaledit';
import { DialogEdit } from './dialogedit';
import { BatchEdit } from './batch';
import { CommandColumnEdit } from './command-column';
import { Exporting } from './defaultexporting';
import { AdvancedExporting } from './advancedexporting';
import { FrozenRows } from './frozenrows';
import { ColumnMenuSample } from './columnmenu';
import { ContextMenuSample } from './contextmenu';
import { ColumnSpanning } from './columnspanning';


export const gridRoutes = (
    <div>
         <Route  path='/:theme/grid/default' component={ Default }/>
         <Route  path='/:theme/grid/gridlines' component={ GridLines }/>
         <Route  path='/:theme/grid/paging' component={ Paging }/>
         <Route  path='/:theme/grid/filtering' component={ Filtering }/>
         <Route  path='/:theme/grid/filtermenu' component={ FilterMenu }/>
         <Route  path='/:theme/grid/grouping' component={ Grouping }/>
         <Route  path='/:theme/grid/sorting' component={ Sorting }/>
         <Route  path='/:theme/grid/scrolling' component={ Scrolling }/>
         <Route  path='/:theme/grid/virtualization' component={ Virtualization }/>
         <Route  path='/:theme/grid/searching' component={ Searching }/>
         <Route  path='/:theme/grid/masterdetail' component={ MasterDetail }/>
         <Route  path='/:theme/grid/rowdraganddrop' component={ Source }/>
         <Route  path='/:theme/grid/hierarchy' component={ Hierarchy }/>
         <Route  path='/:theme/grid/clipboard' component={ Clipboard }/>
         <Route  path='/:theme/grid/localbinding' component={ Localbinding }/>
         <Route  path='/:theme/grid/remotedata' component={ RemoteDataBinding }/>
         <Route  path='/:theme/grid/showhide' component={ ShowHide }/>
         <Route  path='/:theme/grid/stackedheader' component={ StackedHeader }/>
         <Route  path='/:theme/grid/autowrap' component={ AutoWrap }/>
         <Route  path='/:theme/grid/reorder' component={ Reordering }/>
         <Route  path='/:theme/grid/selection' component={ Selectioning }/>
         <Route  path='/:theme/grid/selectionapi' component={ SelectionAPI }/>
         <Route  path='/:theme/grid/checkboxselection' component={ CheckboxSelection }/>
         <Route  path='/:theme/grid/columnchooser' component={ ColumnChooser }/>
         <Route  path='/:theme/grid/columnresizing' component={ ColumnResizing }/>
         <Route  path='/:theme/grid/normaledit' component={ NormalEdit }/>
         <Route  path='/:theme/grid/dialogedit' component={ DialogEdit }/>
         <Route  path='/:theme/grid/batch' component={ BatchEdit }/>
         <Route  path='/:theme/grid/command-column' component={ CommandColumnEdit }/>
         <Route  path='/:theme/grid/defaultexporting' component={ Exporting }/>
         <Route  path='/:theme/grid/advancedexporting' component={ AdvancedExporting }/>
         <Route  path='/:theme/grid/frozenrows' component={ FrozenRows }/>
         <Route  path='/:theme/grid/columnmenu' component={ ColumnMenuSample }/>
         <Route  path='/:theme/grid/contextmenu' component={ ContextMenuSample }/>
         <Route  path='/:theme/grid/columnspanning' component={ ColumnSpanning }/>

    </div>
)

export const gridCategory = {"default":{"name":"Default Functionalities","category":"GRID"},"gridlines":{"name":"GridLines","category":"GRID"},"paging":{"name":"Paging","category":"GRID"},"filtering":{"name":"Filtering","category":"Filtering"},"filtermenu":{"name":"Filter Menu","category":"Filtering"},"grouping":{"name":"Grouping","category":"GRID"},"sorting":{"name":"Sorting","category":"GRID"},"scrolling":{"name":"Default Scrolling","category":"SCROLLING"},"virtualization":{"name":"Virtual Scrolling","category":"SCROLLING"},"searching":{"name":"Searching","category":"Filtering"},"masterdetail":{"name":"Master/Detail","category":"GRID"},"rowdraganddrop":{"name":"Row Drag and Drop","category":"GRID"},"hierarchy":{"name":"Hierarchy Grid","category":"GRID"},"clipboard":{"name":"Clipboard","category":"GRID"},"localbinding":{"name":"Local Binding","category":"DATABINDING"},"remotedata":{"name":"Remote Binding","category":"DATABINDING"},"showhide":{"name":"Show Hide Column","category":"COLUMN"},"stackedheader":{"name":"Stacked Header","category":"COLUMN"},"autowrap":{"name":"AutoWrap Column cells","category":"COLUMN"},"reorder":{"name":"Reorder Columns","category":"COLUMN"},"selection":{"name":"Default Selection","category":"SELECTION"},"selectionapi":{"name":"Selection API","category":"SELECTION"},"checkboxselection":{"name":"Checkbox Selection","category":"SELECTION"},"columnchooser":{"name":"Column Chooser","category":"COLUMN"},"columnresizing":{"name":"Column Resizing","category":"COLUMN"},"normaledit":{"name":"Inline Editing","category":"EDITING"},"dialogedit":{"name":"Dialog Editing","category":"EDITING"},"batch":{"name":"Batch Editing","category":"EDITING"},"command-column":{"name":"CommandColumn","category":"EDITING"},"defaultexporting":{"name":"Default Exporting","category":"EXPORTING"},"advancedexporting":{"name":"Advanced Exporting","category":"EXPORTING"},"frozenrows":{"name":"Frozen Rows And Columns","category":"COLUMN"},"columnmenu":{"name":"Column Menu","category":"COLUMN"},"contextmenu":{"name":"Context Menu","category":"GRID"},"columnspanning":{"name":"Column Spanning","category":"COLUMN"},"defaultSample":"grid/default"}