import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { LightWeight } from './light-weight';
import { DateTimeAxis } from './date-time';
import { NumericAxis } from './double';
import { LogarithmicAxis } from './logarithmic';
import { MultilevelLabels } from './multilevel';
import { PeriodSelectorCandle } from './period-selector';
import { StockChart } from './period-selector-stocks';
import { EmptyData } from './empty-data';
import { Customization } from './filter';
import { RangeExport } from './export';
import { RTL } from './right-to-left';
export const rangenavigatorRoutes = (<div>
         <Route path='/:theme/range-navigator/default' component={Default}/>
         <Route path='/:theme/range-navigator/light-weight' component={LightWeight}/>
         <Route path='/:theme/range-navigator/date-time' component={DateTimeAxis}/>
         <Route path='/:theme/range-navigator/double' component={NumericAxis}/>
         <Route path='/:theme/range-navigator/logarithmic' component={LogarithmicAxis}/>
         <Route path='/:theme/range-navigator/multilevel' component={MultilevelLabels}/>
         <Route path='/:theme/range-navigator/period-selector' component={PeriodSelectorCandle}/>
         <Route path='/:theme/range-navigator/period-selector-stocks' component={StockChart}/>
         <Route path='/:theme/range-navigator/empty-data' component={EmptyData}/>
         <Route path='/:theme/range-navigator/filter' component={Customization}/>
         <Route path='/:theme/range-navigator/export' component={RangeExport}/>
         <Route path='/:theme/range-navigator/right-to-left' component={RTL}/>

    </div>);
export const rangenavigatorCategory = { "default": { "name": "Default", "category": "Range Selector" }, "light-weight": { "name": "Lightweight", "category": "Range Selector" }, "date-time": { "name": "DateTime", "category": "Axis" }, "double": { "name": "Numeric Axis", "category": "Axis" }, "logarithmic": { "name": "Logarithmic Axis", "category": "Axis" }, "multilevel": { "name": "Multilevel Labels", "category": "Axis" }, "period-selector": { "name": "Default", "category": "Period Selector" }, "period-selector-stocks": { "name": "Stock Chart", "category": "Period Selector" }, "empty-data": { "name": "Empty Points", "category": "Customization" }, "filter": { "name": "Filter", "category": "Customization" }, "export": { "name": "Print and Export", "category": "Export" }, "right-to-left": { "name": "RTL", "category": "RTL" }, "defaultSample": "range-navigator/default" };
