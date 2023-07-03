/**
 * Sample for Stock Chart Default
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,Crosshair,
    DateTime, AreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries,
     RangeAreaSeries, Trendlines ,ChartTheme,IStockChartEventArgs
} from '@syncfusion/ej2-react-charts';
import {
    EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
    AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export
} from '@syncfusion/ej2-react-charts';
import { aapl } from './stock-data';
import { SampleBase } from '../common/sample-base';

export class InversedArea extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <StockChartComponent id='stockchartinversed' 
                        primaryXAxis={{
                            valueType: 'DateTime',
                            isInversed: true,
                            majorGridLines: { width: 0 },
                            crosshairTooltip: { enable: true }
                        }}
                        primaryYAxis={{
                            isInversed: true,
                            lineStyle: { color: 'transparent' },
                            majorTickLines: { color: 'transparent', width: 0 },
                            crosshairTooltip: { enable: true }
                        }}
                        load={this.load.bind(this)}
                        seriesType={[]}
                        indicatorType={[]}
                        chartArea={{ border: { width: 0 } }}
                        crosshair={{enable: true, lineType: 'Both' }}
                        title= 'AAPL Stock Price'
                    >
                        <Inject services={[DateTime, Crosshair,AreaSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, 
                        EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                        AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]} />
                        <StockChartSeriesCollectionDirective>
                            <StockChartSeriesDirective dataSource={aapl} xName='x' yName='high' type='Area' opacity={0.5}>
                            </StockChartSeriesDirective>
                        </StockChartSeriesCollectionDirective>
                    </StockChartComponent>
                </div>
                <div id="action-description">
                    <p>This sample uses area series and inversed axis to visualize stock data. The crosshair display information about the data and period.</p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure stock chart to visualize the stock data with inversed axis and it can be inversed by setting <a target="_blank" href="https://helpej2.syncfusion.com/react/documentation/api/stock-chart/stockChartAxis/#isinversed">isInversed</a> property as <b>true</b>.
                    </p>
                    <p>
                        <code>Crosshair</code> is enabled in this example. To see the crosshair in action, hover the chart or tap on touch enabled devices.
                    </p>
                    <br></br>
                    <p>Injecting Module</p>
                    <p>
                        The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the <code>DateTime</code> module using the
                        <code>StockChart.Inject(DateTime)</code> method. To use the AreaSeries, inject the <code>AreaSeries</code> module using the <code>StockChart.Inject(AreaSeries)</code> method.
                    </p>
                    <p>
                        More information about the axis can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/stock-chart/axis-types">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
        
    public load(args: IStockChartEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
         replace(/-dark/i, "Dark").replace(/contrast/i,  'Contrast') as  ChartTheme;
    };
        
}
