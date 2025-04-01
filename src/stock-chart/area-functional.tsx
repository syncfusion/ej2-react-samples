/**
 * Sample for Stock Chart with Area Series
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, AreaSeries } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, ChartTheme, IStockChartEventArgs, Export } from '@syncfusion/ej2-react-charts';
import { aapl } from './stock-data';
import { updateSampleSection } from '../common/sample-base';
import { loadStockChartTheme } from './theme-color';
const Area = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: IStockChartEventArgs): void => {
        loadStockChartTheme(args);
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <StockChartComponent id='stockchartarea' primaryXAxis={{ valueType: 'DateTime', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }} primaryYAxis={{ lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 }, crosshairTooltip: { enable: true } }} load={load.bind(this)} seriesType={[]} indicatorType={[]} chartArea={{ border: { width: 0 } }} crosshair={{ enable: true, lineType: 'Both' }} title='AAPL Stock Price'>
                    <Inject services={[DateTime, Crosshair, AreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, Export, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={aapl} xName='x' yName='high' type='Area' opacity={0.5} />
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>This sample uses area series to visualize stock data. Crosshair display information about the data and period.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure stock chart to visualize the stock data with area series. Use series <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/stock-chart/stockSeries/#type" aria-label="Navigate to the type property reference for React Stock Chart component">type</a> as <b>Area</b> to render a area series.
                </p>
                <p>
                    <code>Crosshair</code> is enabled in this example. To see the crosshair in action, hover the chart or tap on it in touch enabled devices.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method. To use the AreaSeries, inject the <code>AreaSeries</code> module using the <code>StockChart.Inject(AreaSeries)</code> method.
                </p>
                <p>
                    More information about the series type can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types" aria-label="Navigate to the documentation for Stock Chart Series Types">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Area;
