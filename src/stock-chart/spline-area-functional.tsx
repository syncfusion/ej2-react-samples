/**
 * Sample for Stock Chart with Spline Area
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, SplineAreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, ChartTheme, IStockChartEventArgs } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { googl } from './stock-data';

const SplineArea = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: IStockChartEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as ChartTheme;
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <StockChartComponent id='stockchartsplinearea' primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } }} primaryYAxis={{ lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 }, crosshairTooltip: { enable: true } }} load={load.bind(this)} seriesType={[]} indicatorType={[]} chartArea={{ border: { width: 0 } }} crosshair={{ enable: true, lineType: 'Both' }} title='Google Stock Price'>
                    <Inject services={[DateTime, SplineAreaSeries, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={googl} xName='x' yName='high' type='SplineArea' opacity={0.5} />
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>This sample uses spline area series to visualize stock data. Crosshair display information about the data and period.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure stock chart to visualize the stock data with spline area series. Use series <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/stock-chart/stockSeries/#type" aria-label="Navigate to the type property reference for React Stock Chart component">type</a> as <b>SplineArea</b> to render a spline area series.
                </p>
                <p>
                    <code>Crosshair</code> is enabled in this example. To see the crosshair in action, hover the chart or tap on it in touch enabled devices.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method. To use the SplineAreaSeries, inject the <code>SplineAreaSeries</code> module using the <code>StockChart.Inject(SplineAreaSeries)</code> method.
                </p>
                <p>
                    More information about the series type can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types" aria-label="Navigate to the documentation for Stock Chart Series Types">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default SplineArea;