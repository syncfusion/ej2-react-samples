/**
 * Sample for Stock Chart without Navigator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, Crosshair,
    DateTime, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries,
    Trendlines, IStockChartEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export
} from '@syncfusion/ej2-react-charts';
import { chartData } from './indicator-data';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
         .charts {
             align :center
         }`;
function Navigator() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <StockChartComponent id='stockchartnavigator' style={{ textAlign: "center" }}
                    primaryYAxis={{
                        lineStyle: { color: 'transparent' },
                        majorTickLines: { color: 'transparent', width: 0 }
                    }}
                    primaryXAxis={{
                        majorGridLines: { color: 'transparent' },
                        crosshairTooltip: { enable: true }
                    }}
                    load={load.bind(this)}
                    chartArea={{ border: { width: 0 } }}
                    tooltip={{ enable: true }}
                    crosshair={{ enable: true }}
                    enableSelector={false}
                >
                    <Inject services={[DateTime, LineSeries, Crosshair, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={chartData} type='Line' xName='x' >
                        </StockChartSeriesDirective>
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample renders the stock chart without range selector, data's can be navigated through period selector.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the Stock chart.
                    <code>LineSeries</code> is used to represent selected data value.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject
                    the <code>DateTime</code> module using the <code>StockChart.Inject(DateTime)</code> method.  To use the LineSeries, inject the <code>LineSeries</code> module using the <code>StockChart.Inject(LineSeries)</code> method.
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
export default Navigator;
