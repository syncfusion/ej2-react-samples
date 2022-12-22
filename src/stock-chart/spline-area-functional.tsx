/**
 * Sample for Stock Chart with Spline Area
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair,
    DateTime, SplineAreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries,
    RangeAreaSeries, Trendlines, ChartTheme, IStockChartEventArgs
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
} from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { googl } from './stock-data';

function SplineArea() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <StockChartComponent id='stockchartsplinearea'
                    primaryXAxis={{
                        valueType: 'DateTime', majorGridLines: { width: 0 },
                        crosshairTooltip: { enable: true }
                    }}
                    primaryYAxis={{
                        lineStyle: { color: 'transparent' },
                        majorTickLines: { color: 'transparent', width: 0 },
                        crosshairTooltip: { enable: true }
                    }}
                    load={load.bind(this)}
                    seriesType={[]}
                    indicatorType={[]}
                    chartArea={{ border: { width: 0 } }}
                    crosshair={{ enable: true }}
                    title='Google Stock Price'
                >
                    <Inject services={[DateTime, SplineAreaSeries, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={googl} xName='x' yName='high' type='SplineArea' opacity={0.5}>
                        </StockChartSeriesDirective>
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes stock data with spline area. Period and range selector help us to navigate different of data.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the dynamic stock chart.
                    <code>SplineAreaSeries</code> is used to represent selected data value.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                    <code>StockChart.Inject(DateTime)</code> method. To use the SplineAreaSeries, inject the <code>SplineAreaSeries</code> module using the <code>StockChart.Inject(SplineAreaSeries)</code> method.
                </p>
            </div>
        </div>
    )


    function load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark") as ChartTheme;
    };

}
export default SplineArea;