import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Line } from './line';
import { Spline } from './spline';
import { StepLine } from './stepline';
import { DashedLine } from './dashed-line';
import { SplineInversed } from './spline-inversed';
import { Area } from './area';
import { StepArea } from './steparea';
import { StackedArea } from './stacked-area';
import { StackedArea100 } from './stacked-area100';
import { AreaEmpty } from './area-empty';
import { Column } from './column';
import { RoundedColumn } from './rounded-column';
import { ColumnPlacement } from './column-placement';
import { Bar } from './bar';
import { StackedColumn } from './stacked-column';
import { StackedColumn100 } from './stacked-column100';
import { StackedBar } from './stacked-bar';
import { StackedBar100 } from './stacked-bar100';
import { NegativeStack } from './tornado';
import { RangeColumn } from './range-column';
import { RangeBar } from './range-bar';
import { RangeArea } from './rangearea';
import { Hilo } from './hilo';
import { HiloOpenClose } from './hiloopenclose';
import { Candle } from './candle';
import { Scatter } from './scatter';
import { Bubble } from './bubble';
import { Waterfall } from './waterfall';
import { BoxWhisker } from './box-whisker';
import { ErrorBarChart } from './error-bar';
import { Trend } from './trend-lines';
import { CombinationSeries } from './combination-series';
import { ParetoChart } from './pareto';
import { AccumulationDistribution } from './adindicator';
import { ATR } from './atrindicator';
import { Bollinger } from './bollinger';
import { EMA } from './ema';
import { Macd } from './macd';
import { Momentum } from './momentum';
import { RSI } from './rsi';
import { SMA } from './sma';
import { Stochastic } from './stochastic';
import { TMA } from './tma';
import { Performance } from './performance';
import { Pie } from './default-pie';
import { AccumulationDoughnut } from './doughnut';
import { Pyramid } from './pyramid';
import { Funnel } from './funnel';
import { Doughnut } from './default-doughnut';
import { SemiPie } from './semi-pie';
import { SmartLabels } from './smartlabels';
import { Drilldown } from './drilldown';
import { Grouping } from './grouping';
import { PieEmptyPoint } from './pie-empty-point';
import { PolarLine } from './polar-line';
import { PolarSpline } from './polar-spline';
import { PolarArea } from './polar-area';
import { PolarStackedArea } from './polar-stackedarea';
import { PolarScatter } from './polar-scatter';
import { PolarColumn } from './polar-column';
import { PolarStackedColumn } from './polar-stackedcolumn';
import { PolarRangeColumn } from './polar-rangecolumn';
import { LocalData } from './local-data';
import { RemoteData } from './remote-data';
import { Numeric } from './numeric-axis';
import { DateTimeAxis } from './datetime';
import { CategoryAxis } from './category';
import { IndexedAxis } from './indexed-axis';
import { LogAxis } from './log';
import { MultipleAxis } from './multiple-axis';
import { InversedAxis } from './inversed';
import { Stripline } from './stripline';
import { SmartAxisLabels } from './smart-axis-labels';
import { Symbols } from './symbols';
import { Annotation } from './annotation';
import { DataLabelTemplate } from './datalabel-template';
import { VerticalChart } from './vertical';
import { EmptyPoint } from './empty-point';
import { Print } from './print';
import { Export } from './export';
import { SelectionChart } from './selection';
import { RangeSelection } from './range-selection';
import { CrosshairChart } from './crosshair';
import { TrackballChart } from './trackball';
import { Zooming } from './zoom';


export const chartRoutes = (
    <div>
         <Route  path='/:theme/chart/line' component={ Line }/>
         <Route  path='/:theme/chart/spline' component={ Spline }/>
         <Route  path='/:theme/chart/stepline' component={ StepLine }/>
         <Route  path='/:theme/chart/dashed-line' component={ DashedLine }/>
         <Route  path='/:theme/chart/spline-inversed' component={ SplineInversed }/>
         <Route  path='/:theme/chart/area' component={ Area }/>
         <Route  path='/:theme/chart/steparea' component={ StepArea }/>
         <Route  path='/:theme/chart/stacked-area' component={ StackedArea }/>
         <Route  path='/:theme/chart/stacked-area100' component={ StackedArea100 }/>
         <Route  path='/:theme/chart/area-empty' component={ AreaEmpty }/>
         <Route  path='/:theme/chart/column' component={ Column }/>
         <Route  path='/:theme/chart/rounded-column' component={ RoundedColumn }/>
         <Route  path='/:theme/chart/column-placement' component={ ColumnPlacement }/>
         <Route  path='/:theme/chart/bar' component={ Bar }/>
         <Route  path='/:theme/chart/stacked-column' component={ StackedColumn }/>
         <Route  path='/:theme/chart/stacked-column100' component={ StackedColumn100 }/>
         <Route  path='/:theme/chart/stacked-bar' component={ StackedBar }/>
         <Route  path='/:theme/chart/stacked-bar100' component={ StackedBar100 }/>
         <Route  path='/:theme/chart/tornado' component={ NegativeStack }/>
         <Route  path='/:theme/chart/range-column' component={ RangeColumn }/>
         <Route  path='/:theme/chart/range-bar' component={ RangeBar }/>
         <Route  path='/:theme/chart/rangearea' component={ RangeArea }/>
         <Route  path='/:theme/chart/hilo' component={ Hilo }/>
         <Route  path='/:theme/chart/hiloopenclose' component={ HiloOpenClose }/>
         <Route  path='/:theme/chart/candle' component={ Candle }/>
         <Route  path='/:theme/chart/scatter' component={ Scatter }/>
         <Route  path='/:theme/chart/bubble' component={ Bubble }/>
         <Route  path='/:theme/chart/waterfall' component={ Waterfall }/>
         <Route  path='/:theme/chart/box-whisker' component={ BoxWhisker }/>
         <Route  path='/:theme/chart/error-bar' component={ ErrorBarChart }/>
         <Route  path='/:theme/chart/trend-lines' component={ Trend }/>
         <Route  path='/:theme/chart/combination-series' component={ CombinationSeries }/>
         <Route  path='/:theme/chart/pareto' component={ ParetoChart }/>
         <Route  path='/:theme/chart/adindicator' component={ AccumulationDistribution }/>
         <Route  path='/:theme/chart/atrindicator' component={ ATR }/>
         <Route  path='/:theme/chart/bollinger' component={ Bollinger }/>
         <Route  path='/:theme/chart/ema' component={ EMA }/>
         <Route  path='/:theme/chart/macd' component={ Macd }/>
         <Route  path='/:theme/chart/momentum' component={ Momentum }/>
         <Route  path='/:theme/chart/rsi' component={ RSI }/>
         <Route  path='/:theme/chart/sma' component={ SMA }/>
         <Route  path='/:theme/chart/stochastic' component={ Stochastic }/>
         <Route  path='/:theme/chart/tma' component={ TMA }/>
         <Route  path='/:theme/chart/performance' component={ Performance }/>
         <Route  path='/:theme/chart/default-pie' component={ Pie }/>
         <Route  path='/:theme/chart/doughnut' component={ AccumulationDoughnut }/>
         <Route  path='/:theme/chart/pyramid' component={ Pyramid }/>
         <Route  path='/:theme/chart/funnel' component={ Funnel }/>
         <Route  path='/:theme/chart/default-doughnut' component={ Doughnut }/>
         <Route  path='/:theme/chart/semi-pie' component={ SemiPie }/>
         <Route  path='/:theme/chart/smartlabels' component={ SmartLabels }/>
         <Route  path='/:theme/chart/drilldown' component={ Drilldown }/>
         <Route  path='/:theme/chart/grouping' component={ Grouping }/>
         <Route  path='/:theme/chart/pie-empty-point' component={ PieEmptyPoint }/>
         <Route  path='/:theme/chart/polar-line' component={ PolarLine }/>
         <Route  path='/:theme/chart/polar-spline' component={ PolarSpline }/>
         <Route  path='/:theme/chart/polar-area' component={ PolarArea }/>
         <Route  path='/:theme/chart/polar-stackedarea' component={ PolarStackedArea }/>
         <Route  path='/:theme/chart/polar-scatter' component={ PolarScatter }/>
         <Route  path='/:theme/chart/polar-column' component={ PolarColumn }/>
         <Route  path='/:theme/chart/polar-stackedcolumn' component={ PolarStackedColumn }/>
         <Route  path='/:theme/chart/polar-rangecolumn' component={ PolarRangeColumn }/>
         <Route  path='/:theme/chart/local-data' component={ LocalData }/>
         <Route  path='/:theme/chart/remote-data' component={ RemoteData }/>
         <Route  path='/:theme/chart/numeric-axis' component={ Numeric }/>
         <Route  path='/:theme/chart/datetime' component={ DateTimeAxis }/>
         <Route  path='/:theme/chart/category' component={ CategoryAxis }/>
         <Route  path='/:theme/chart/indexed-axis' component={ IndexedAxis }/>
         <Route  path='/:theme/chart/log' component={ LogAxis }/>
         <Route  path='/:theme/chart/multiple-axis' component={ MultipleAxis }/>
         <Route  path='/:theme/chart/inversed' component={ InversedAxis }/>
         <Route  path='/:theme/chart/stripline' component={ Stripline }/>
         <Route  path='/:theme/chart/smart-axis-labels' component={ SmartAxisLabels }/>
         <Route  path='/:theme/chart/symbols' component={ Symbols }/>
         <Route  path='/:theme/chart/annotation' component={ Annotation }/>
         <Route  path='/:theme/chart/datalabel-template' component={ DataLabelTemplate }/>
         <Route  path='/:theme/chart/vertical' component={ VerticalChart }/>
         <Route  path='/:theme/chart/empty-point' component={ EmptyPoint }/>
         <Route  path='/:theme/chart/print' component={ Print }/>
         <Route  path='/:theme/chart/export' component={ Export }/>
         <Route  path='/:theme/chart/selection' component={ SelectionChart }/>
         <Route  path='/:theme/chart/range-selection' component={ RangeSelection }/>
         <Route  path='/:theme/chart/crosshair' component={ CrosshairChart }/>
         <Route  path='/:theme/chart/trackball' component={ TrackballChart }/>
         <Route  path='/:theme/chart/zoom' component={ Zooming }/>

    </div>
)

export const chartCategory = {"line":{"name":"Line","category":"Line Charts"},"spline":{"name":"Spline","category":"Line Charts"},"stepline":{"name":"Step Line","category":"Line Charts"},"dashed-line":{"name":"Dashed Line","category":"Line Charts"},"spline-inversed":{"name":"Inversed Spline","category":"Line Charts"},"area":{"name":"Area","category":"Area Charts"},"steparea":{"name":"Step Area","category":"Area Charts"},"stacked-area":{"name":"Stacked Area","category":"Area Charts"},"stacked-area100":{"name":"100% Stacked Area","category":"Area Charts"},"area-empty":{"name":"Area - Empty Points","category":"Area Charts"},"column":{"name":"Column","category":"Bar Charts"},"rounded-column":{"name":"Rounded Column","category":"Bar Charts"},"column-placement":{"name":"Side By Placement","category":"Bar Charts"},"bar":{"name":"Bar","category":"Bar Charts"},"stacked-column":{"name":"Stacked Column","category":"Bar Charts"},"stacked-column100":{"name":"100% Stacked Column","category":"Bar Charts"},"stacked-bar":{"name":"Stacked Bar","category":"Bar Charts"},"stacked-bar100":{"name":"100% Stacked Bar","category":"Bar Charts"},"tornado":{"name":"Negative Stack","category":"Bar Charts"},"range-column":{"name":"Range Column","category":"Financial Charts"},"range-bar":{"name":"Inversed Range Column","category":"Financial Charts"},"rangearea":{"name":"Range Area","category":"Financial Charts"},"hilo":{"name":"Hilo","category":"Financial Charts"},"hiloopenclose":{"name":"Hilo Open Close","category":"Financial Charts"},"candle":{"name":"Candle","category":"Financial Charts"},"scatter":{"name":"Scatter","category":"Scatter and Bubble"},"bubble":{"name":"Bubble","category":"Scatter and Bubble"},"waterfall":{"name":"Waterfall","category":"Other Types"},"box-whisker":{"name":"Box and Whisker","category":"Other Types"},"error-bar":{"name":"Error Bar","category":"Other Types"},"trend-lines":{"name":"Trendlines","category":"Other Types"},"combination-series":{"name":"Combination Series","category":"Other Types"},"pareto":{"name":"Pareto Chart","category":"Other Types"},"adindicator":{"name":"Accumulation Distribution","category":"Technical Indicators"},"atrindicator":{"name":"ATR","category":"Technical Indicators"},"bollinger":{"name":"Bollinger","category":"Technical Indicators"},"ema":{"name":"EMA","category":"Technical Indicators"},"macd":{"name":"MACD","category":"Technical Indicators"},"momentum":{"name":"Momentum","category":"Technical Indicators"},"rsi":{"name":"RSI","category":"Technical Indicators"},"sma":{"name":"SMA","category":"Technical Indicators"},"stochastic":{"name":"Stochastic","category":"Technical Indicators"},"tma":{"name":"TMA","category":"Technical Indicators"},"performance":{"name":"Benchmark","category":"Performance"},"default-pie":{"name":"Pie","category":"Accumulation Charts"},"doughnut":{"name":"Doughnut","category":"Accumulation Charts"},"pyramid":{"name":"Pyramid","category":"Accumulation Charts"},"funnel":{"name":"Funnel","category":"Accumulation Charts"},"default-doughnut":{"name":"Pie With Legend","category":"Accumulation Charts"},"semi-pie":{"name":"Semi Pie","category":"Accumulation Charts"},"smartlabels":{"name":"Smart Labels","category":"Accumulation Charts"},"drilldown":{"name":"Drilldown","category":"Accumulation Charts"},"grouping":{"name":"Grouping","category":"Accumulation Charts"},"pie-empty-point":{"name":"Empty Points","category":"Accumulation Charts"},"polar-line":{"name":"Line","category":"Polar Radar"},"polar-spline":{"name":"Spline","category":"Polar Radar"},"polar-area":{"name":"Area","category":"Polar Radar"},"polar-stackedarea":{"name":"Stacked Area","category":"Polar Radar"},"polar-scatter":{"name":"Scatter","category":"Polar Radar"},"polar-column":{"name":"Column","category":"Polar Radar"},"polar-stackedcolumn":{"name":"Stacked Column","category":"Polar Radar"},"polar-rangecolumn":{"name":"Range Column","category":"Polar Radar"},"local-data":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"numeric-axis":{"name":"Numeric Axis","category":"Chart Axes"},"datetime":{"name":"DateTime Axis","category":"Chart Axes"},"category":{"name":"Category Axis","category":"Chart Axes"},"indexed-axis":{"name":"Indexed Category Axis","category":"Chart Axes"},"log":{"name":"Log Axis","category":"Chart Axes"},"multiple-axis":{"name":"Multiple Axis","category":"Chart Axes"},"inversed":{"name":"Inversed Axis","category":"Chart Axes"},"stripline":{"name":"Strip Line","category":"Chart Axes"},"smart-axis-labels":{"name":"Smart Labels","category":"Chart Axes"},"symbols":{"name":"Symbols","category":"Chart Customization"},"annotation":{"name":"Annotation","category":"Chart Customization"},"datalabel-template":{"name":"DataLabel Template","category":"Chart Customization"},"vertical":{"name":"Vertical Chart","category":"Chart Customization"},"empty-point":{"name":"Empty Points","category":"Chart Customization"},"print":{"name":"Print","category":"Print and Export"},"export":{"name":"Export","category":"Print and Export"},"selection":{"name":"Selection","category":"User Interaction"},"range-selection":{"name":"Range Selection","category":"User Interaction"},"crosshair":{"name":"Crosshair","category":"User Interaction"},"trackball":{"name":"Trackball","category":"User Interaction"},"zoom":{"name":"Zooming and Panning","category":"User Interaction"},"defaultSample":"chart/line"}