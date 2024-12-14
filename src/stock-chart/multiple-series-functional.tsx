/**
 * Sample for Stock Chart with Multiple Series
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair, DateTime, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, IStockChartEventArgs, ChartTheme } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export, StockLegend } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { goog, googl } from './stock-data';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    .charts {
        align :center
    }`;
const MultipleSeries = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: IStockChartEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as ChartTheme;
    };

    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <StockChartComponent id='stockchartmultiseries' primaryXAxis={{ valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } }} primaryYAxis={{ interval: 40, lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 }, crosshairTooltip: { enable: true } }} load={load.bind(this)} indicatorType={[]} trendlineType={[]} seriesType={['Line', 'Hilo', 'HiloOpenClose', 'Spline', 'Candle']} crosshair={{ enable: true, lineType: 'Both' }} chartArea={{ border: { width: 0 } }} title='Multiple Series' legendSettings={{ visible: true }}>
                    <Inject services={[DateTime, LineSeries, Crosshair, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, StockLegend, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={goog} xName='x' yName='close' type='Spline' name='GOOG' />
                        <StockChartSeriesDirective dataSource={googl} xName='x' yName='close' type='Spline' name='GOOGL' />
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>This sample visualizes the close value of multiple stock. Crosshair show the information about the data and period.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure stock chart to visualize the data for multiple stock. Stock Chart supports 6 major types of series namely <code>Line</code>, <code>Spline</code>, <code>Hilo</code>, <code>HiloOpenClose</code>, <code>Hollow Candle</code> and <code>Candle</code>. By using the series dropdown button in period selector you can navigate between the above listed series types.
                </p>
                <p>
                    The legend is enabled, and you can use it to toggle the visibility of series in the stock chart. To customize the legend in the stock chart, use the <code>stockChartLegendSettings</code> property.
                </p>
                <br></br>
                <p><b>Injecting Module:</b></p>
                <p>
                    The Stock Chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method. To use the LineSeries, inject the <code>SplineSeries</code> module using the <code>StockChart.Inject(SplineSeries)</code> method.
                    To use the Legend, inject the <code>StockLegend</code> module using the <code>StockChart.Inject(StockLegend)</code> method.
                </p>
                <p>
                    More information about the series type can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/series-types" aria-label="Navigate to the documentation for React Stock Chart series types">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default MultipleSeries;