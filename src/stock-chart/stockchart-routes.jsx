import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { OHLC } from './ohlc';
import { MultiPane } from './multi-pane';
import { MultipleSeries } from './multiple-series';
import { Spline } from './spline';
import { Area } from './area';
import { SplineArea } from './spline-area';
import { InversedArea } from './inversed-area';
import { PlotLine } from './plot-line';
import { StripLines } from './strip-line';
import { PeroidCustomization } from './period-customization';
import { Navigator } from './disabled-navigator';
import { PeriodSelector } from './disabled-period';
import { StockEvents } from './stock-events';
export const stockchartRoutes = (<div>
         <Route path='/:theme/stock-chart/default' component={Default}/>
         <Route path='/:theme/stock-chart/ohlc' component={OHLC}/>
         <Route path='/:theme/stock-chart/multi-pane' component={MultiPane}/>
         <Route path='/:theme/stock-chart/multiple-series' component={MultipleSeries}/>
         <Route path='/:theme/stock-chart/spline' component={Spline}/>
         <Route path='/:theme/stock-chart/area' component={Area}/>
         <Route path='/:theme/stock-chart/spline-area' component={SplineArea}/>
         <Route path='/:theme/stock-chart/inversed-area' component={InversedArea}/>
         <Route path='/:theme/stock-chart/plot-line' component={PlotLine}/>
         <Route path='/:theme/stock-chart/strip-line' component={StripLines}/>
         <Route path='/:theme/stock-chart/period-customization' component={PeroidCustomization}/>
         <Route path='/:theme/stock-chart/disabled-navigator' component={Navigator}/>
         <Route path='/:theme/stock-chart/disabled-period' component={PeriodSelector}/>
         <Route path='/:theme/stock-chart/stock-events' component={StockEvents}/>

    </div>);
export const stockchartCategory = { "default": { "name": "Default", "category": "Stock Chart" }, "ohlc": { "name": "OHLC", "category": "Stock Chart" }, "multi-pane": { "name": "Candlestick and volume", "category": "Stock Chart" }, "multiple-series": { "name": "Multiple Series", "category": "Stock Chart" }, "spline": { "name": "Spline", "category": "Stock Chart" }, "area": { "name": "Area", "category": "Stock Chart" }, "spline-area": { "name": "Spline Area", "category": "Stock Chart" }, "inversed-area": { "name": "Inversed Area", "category": "Stock Chart" }, "plot-line": { "name": "Plot lines", "category": "Stock Chart" }, "strip-line": { "name": "Plot band", "category": "Stock Chart" }, "period-customization": { "name": "Intraday", "category": "Stock Chart" }, "disabled-navigator": { "name": "Hide Range Selector", "category": "Stock Chart" }, "disabled-period": { "name": "Hide Period Selector", "category": "Stock Chart" }, "stock-events": { "name": "Stock Events", "category": "Stock Chart" }, "defaultSample": "stock-chart/default" };
