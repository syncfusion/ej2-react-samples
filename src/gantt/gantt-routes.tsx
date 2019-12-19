import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Editing } from './editing';
import { GanttSelection } from './selection';
import { ContextMenuItem } from './context-menu';
import { Exporting } from './exporting';
import { Filtering } from './filtering';
import { Events } from './events';
import { KeyboardInteraction } from './keyboard-interactions';
import { DragAndDrop } from './drag-and-drop';
import { LocalData } from './local-data';
import { RemoteData } from './remote-data';
import { SelfReferenceData } from './self-reference-data';
import { WorkWeek } from './work-week';
import { WorkingTimeRange } from './working-time-range';
import { Holidays } from './holidays';
import { ResourceAllocation } from './resource-allocation';
import { EventMarkers } from './event-markers';
import { Indicators } from './indicators';
import { Baseline } from './baseline';
import { UnscheduledTask } from './unscheduled-task';
import { Timeline } from './timeline';
import { Zooming } from './zooming';
import { GanttColumnMenu } from './column-menu';
import { ShowHideColumn } from './show-hide-column';
import { ReorderColumn } from './reorder';
import { Resizing } from './resizing';
import { ColumnTemplate } from './column-template';
import { HeaderTemplate } from './header-template';
import { Taskbar } from './taskbar-template';
import { TasklabelTemplate } from './tasklabel-template';
import { TooltipTemplate } from './tooltip-template';
import { ToolbarTemplate } from './toolbar-template';
import { GridLines } from './grid-lines';
import { Sorting } from './sorting';
import { SortingAPI } from './sorting-api';


export const ganttRoutes = (
    <div>
         <Route  path='/:theme/gantt/default' component={ Default }/>
         <Route  path='/:theme/gantt/editing' component={ Editing }/>
         <Route  path='/:theme/gantt/selection' component={ GanttSelection }/>
         <Route  path='/:theme/gantt/context-menu' component={ ContextMenuItem }/>
         <Route  path='/:theme/gantt/exporting' component={ Exporting }/>
         <Route  path='/:theme/gantt/filtering' component={ Filtering }/>
         <Route  path='/:theme/gantt/events' component={ Events }/>
         <Route  path='/:theme/gantt/keyboard-interactions' component={ KeyboardInteraction }/>
         <Route  path='/:theme/gantt/drag-and-drop' component={ DragAndDrop }/>
         <Route  path='/:theme/gantt/local-data' component={ LocalData }/>
         <Route  path='/:theme/gantt/remote-data' component={ RemoteData }/>
         <Route  path='/:theme/gantt/self-reference-data' component={ SelfReferenceData }/>
         <Route  path='/:theme/gantt/work-week' component={ WorkWeek }/>
         <Route  path='/:theme/gantt/working-time-range' component={ WorkingTimeRange }/>
         <Route  path='/:theme/gantt/holidays' component={ Holidays }/>
         <Route  path='/:theme/gantt/resource-allocation' component={ ResourceAllocation }/>
         <Route  path='/:theme/gantt/event-markers' component={ EventMarkers }/>
         <Route  path='/:theme/gantt/indicators' component={ Indicators }/>
         <Route  path='/:theme/gantt/baseline' component={ Baseline }/>
         <Route  path='/:theme/gantt/unscheduled-task' component={ UnscheduledTask }/>
         <Route  path='/:theme/gantt/timeline' component={ Timeline }/>
         <Route  path='/:theme/gantt/zooming' component={ Zooming }/>
         <Route  path='/:theme/gantt/column-menu' component={ GanttColumnMenu }/>
         <Route  path='/:theme/gantt/show-hide-column' component={ ShowHideColumn }/>
         <Route  path='/:theme/gantt/reorder' component={ ReorderColumn }/>
         <Route  path='/:theme/gantt/resizing' component={ Resizing }/>
         <Route  path='/:theme/gantt/column-template' component={ ColumnTemplate }/>
         <Route  path='/:theme/gantt/header-template' component={ HeaderTemplate }/>
         <Route  path='/:theme/gantt/taskbar-template' component={ Taskbar }/>
         <Route  path='/:theme/gantt/tasklabel-template' component={ TasklabelTemplate }/>
         <Route  path='/:theme/gantt/tooltip-template' component={ TooltipTemplate }/>
         <Route  path='/:theme/gantt/toolbar-template' component={ ToolbarTemplate }/>
         <Route  path='/:theme/gantt/grid-lines' component={ GridLines }/>
         <Route  path='/:theme/gantt/sorting' component={ Sorting }/>
         <Route  path='/:theme/gantt/sorting-api' component={ SortingAPI }/>

    </div>
)

export const ganttCategory = {"default":{"name":"Default Functionalities","category":"Gantt"},"editing":{"name":"Editing","category":"Gantt"},"selection":{"name":"Selection","category":"Gantt"},"context-menu":{"name":"Context Menu","category":"Gantt"},"exporting":{"name":"Exporting","category":"Gantt"},"filtering":{"name":"Filtering","category":"Gantt"},"events":{"name":"Events","category":"Gantt"},"keyboard-interactions":{"name":"Keyboard Interactions","category":"Gantt"},"drag-and-drop":{"name":"Row Drag And Drop","category":"Gantt"},"local-data":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"self-reference-data":{"name":"Self Reference Data","category":"Data Binding"},"work-week":{"name":"Workweek","category":"Scheduling Concepts"},"working-time-range":{"name":"Working Time Range","category":"Scheduling Concepts"},"holidays":{"name":"Holidays","category":"Scheduling Concepts"},"resource-allocation":{"name":"Resource Allocation","category":"Scheduling Concepts"},"event-markers":{"name":"Event Markers","category":"Scheduling Concepts"},"indicators":{"name":"Indicators","category":"Scheduling Concepts"},"baseline":{"name":"Baseline","category":"Scheduling Concepts"},"unscheduled-task":{"name":"Unscheduled Tasks","category":"Scheduling Concepts"},"timeline":{"name":"Timeline API","category":"Timeline"},"zooming":{"name":"Zooming","category":"Timeline"},"column-menu":{"name":"Column Menu","category":"Columns"},"show-hide-column":{"name":"Show or Hide Column","category":"Columns"},"reorder":{"name":"Column Reorder","category":"Columns"},"resizing":{"name":"Column Resize","category":"Columns"},"column-template":{"name":"Column Template","category":"Columns"},"header-template":{"name":"Header Template","category":"Columns"},"taskbar-template":{"name":"Taskbar Template","category":"Customization"},"tasklabel-template":{"name":"Task Label Template","category":"Customization"},"tooltip-template":{"name":"Tooltip Template","category":"Customization"},"toolbar-template":{"name":"Toolbar Template","category":"Customization"},"grid-lines":{"name":"Grid Lines","category":"Customization"},"sorting":{"name":"Default","category":"Sorting"},"sorting-api":{"name":"Sorting API","category":"Sorting"},"defaultSample":"gantt/default"}