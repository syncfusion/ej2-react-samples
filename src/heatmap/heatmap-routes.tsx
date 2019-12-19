import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { CalendarHeatmap } from './calendar-heatmap';
import { BubbleTypes } from './bubble-types';
import { ColorAndSizeAttributes } from './color-and-size-attributes';
import { ArrayRow } from './array-row';
import { ArrayCell } from './array-cell';
import { JsonRow } from './row-json-binding';
import { JsonCell } from './cell-json-binding';
import { EmptyPoints } from './empty-points';
import { InversedAxis } from './inversed-axis';
import { OpposedAxis } from './opposed-axis';
import { MultiLevelLabels } from './MultiLevelLabels';
import { CellSelection } from './cell-selection';
import { LegendPlacement } from './legend';
import { LargeData } from './large-data';
import { Palette } from './palette';
import { RenderMode } from './render-mode';
import { TooltipTemplate } from './tooltip-template';


export const heatmapRoutes = (
    <div>
         <Route  path='/:theme/heatmap/default' component={ Default }/>
         <Route  path='/:theme/heatmap/calendar-heatmap' component={ CalendarHeatmap }/>
         <Route  path='/:theme/heatmap/bubble-types' component={ BubbleTypes }/>
         <Route  path='/:theme/heatmap/color-and-size-attributes' component={ ColorAndSizeAttributes }/>
         <Route  path='/:theme/heatmap/array-row' component={ ArrayRow }/>
         <Route  path='/:theme/heatmap/array-cell' component={ ArrayCell }/>
         <Route  path='/:theme/heatmap/row-json-binding' component={ JsonRow }/>
         <Route  path='/:theme/heatmap/cell-json-binding' component={ JsonCell }/>
         <Route  path='/:theme/heatmap/empty-points' component={ EmptyPoints }/>
         <Route  path='/:theme/heatmap/inversed-axis' component={ InversedAxis }/>
         <Route  path='/:theme/heatmap/opposed-axis' component={ OpposedAxis }/>
         <Route  path='/:theme/heatmap/MultiLevelLabels' component={ MultiLevelLabels }/>
         <Route  path='/:theme/heatmap/cell-selection' component={ CellSelection }/>
         <Route  path='/:theme/heatmap/legend' component={ LegendPlacement }/>
         <Route  path='/:theme/heatmap/large-data' component={ LargeData }/>
         <Route  path='/:theme/heatmap/palette' component={ Palette }/>
         <Route  path='/:theme/heatmap/render-mode' component={ RenderMode }/>
         <Route  path='/:theme/heatmap/tooltip-template' component={ TooltipTemplate }/>

    </div>
)

export const heatmapCategory = {"default":{"name":"Default Functionalities","category":"Heatmap Chart"},"calendar-heatmap":{"name":"Calendar Heatmap","category":"Heatmap Chart"},"bubble-types":{"name":"Bubble Types","category":"Bubble Heatmap"},"color-and-size-attributes":{"name":"Color and Size Attributes","category":"Bubble Heatmap"},"array-row":{"name":"Row","category":"Data Binding"},"array-cell":{"name":"Cell","category":"Data Binding"},"row-json-binding":{"name":"JSON Row","category":"Data Binding"},"cell-json-binding":{"name":"JSON Cell","category":"Data Binding"},"empty-points":{"name":"Empty points","category":"Features"},"inversed-axis":{"name":"Inversed Axis","category":"Features"},"opposed-axis":{"name":"Opposed Axis","category":"Features"},"MultiLevelLabels":{"name":"Multi Level Labels","category":"Features"},"cell-selection":{"name":"Selection","category":"Features"},"legend":{"name":"Legend Placement","category":"Features"},"large-data":{"name":"Large Data","category":"Features"},"palette":{"name":"Palette Mode","category":"Features"},"render-mode":{"name":"Rendering mode","category":"Features"},"tooltip-template":{"name":"Tooltip Template","category":"Features"},"defaultSample":"heatmap/default"}