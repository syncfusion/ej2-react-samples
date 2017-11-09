/**
 * Samples for Trendlines
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, TrendlineDirective, TrendlinesDirective, Inject,
    Tooltip, LineSeries, ScatterSeries, ILoadedEventArgs, SplineSeries, Trendlines, Category, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';

let series1: Object[] = [];
let yValue: number[] = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
    13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
    41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
let point1: Object;
let i: number; let j: number = 0;
for (i = 1973; i <= 2013; i++) {
    point1 = { x: i, y: yValue[j] };
    series1.push(point1);
    j++;
}
let powerData: object[] = [
    { x: 1, y: 10 }, { x: 2, y: 50 }, { x: 3, y: 80 }, { x: 4, y: 110 },
    { x: 5, y: 180 }, { x: 6, y: 220 }, { x: 7, y: 300 }, { x: 8, y: 370 }, { x: 9, y: 490 }, { x: 10, y: 500 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #charts_Series_0_TrendLine_0 {
        stroke-dasharray: 10px 10px;
        stroke-linejoin: round; stroke-linecap: round;
        -webkit-animation: dash 1s linear infinite;
        animation: dash 1s linear infinite;
    }
    @-webkit-keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }

    @keyframes dash {
        100% {
            stroke-dashoffset: -20px;
        }
    }`;
export class Trend extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private checkElement: HTMLInputElement;
    private forwardElement: NumericTextBoxComponent;
    private backwardElement: NumericTextBoxComponent;
    private polynomialElement: NumericTextBoxComponent;
    private periodElement: NumericTextBoxComponent;
    private loaded: EmitType<ILoadedEventArgs>;
    private forwardForecast: boolean = false;
    private backwardForecast: boolean = false;
    private polynomialOrder: boolean = true;
    private period: boolean = true;
    private change(e: Event): void {
        let type: any = document.getElementById('trendLineType');
        this.chartInstance.series[0].dataSource = [];
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.series[0].trendlines[0].type = type.value;
        this.chartInstance.series[0].trendlines[0].name = type.value;
        if (type.value !== 'Power') {
            this.chartInstance.series[0].dataSource = series1;
            this.chartInstance.series[0].name = 'Rupees';
            this.chartInstance.primaryXAxis.title = '';
            this.chartInstance.primaryYAxis.interval = 10;
            this.chartInstance.primaryYAxis.title = 'Rupees against Dollars';
            this.chartInstance.title = 'Historical Indian Rupee Rate (INR USD)';
            if (type.value === 'MovingAverage') {
                this.chartInstance.series[0].trendlines[0].marker.visible = false;
            }
        } else {
            this.chartInstance.series[0].dataSource = powerData;
            this.chartInstance.series[0].name = 'Meters';
            this.chartInstance.primaryXAxis.title = 'Seconds';
            this.chartInstance.primaryYAxis.title = 'Meters';
            this.chartInstance.primaryYAxis.interval = 100;
            this.chartInstance.title = 'Distance Measurement';
        }
        if (type.value !== 'Polynomial' && type.value !== 'MovingAverage') {
            this.period = this.polynomialOrder = true;
            this.forwardForecast = this.backwardForecast = false;
        } else if (type.value === 'MovingAverage') {
            this.period = false;
            this.forwardForecast = this.backwardForecast = this.polynomialOrder = true;
        } else {
            this.forwardForecast = this.backwardForecast = this.polynomialOrder = false;
            this.period = true;
        }
        (document.getElementById('forwardForecast') as HTMLInputElement).disabled = this.forwardForecast;
        (document.getElementById('backwardForecast') as HTMLInputElement).disabled = this.backwardForecast;
        (document.getElementById('polynomial') as HTMLInputElement).disabled = this.polynomialOrder;
        (document.getElementById('period') as HTMLInputElement).disabled = this.period;
        this.chartInstance.refresh();
    }
    private checkForwardForecast(e: Event): void {
        let value: number = Number((document.getElementById('forwardForecast') as HTMLInputElement).value);
        this.chartInstance.series[0].trendlines[0].forwardForecast = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private checkBackwardForecast(e: Event): void {
        let value: number = Number((document.getElementById('backwardForecast') as HTMLInputElement).value);
        this.chartInstance.series[0].trendlines[0].backwardForecast = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private checkPolynomialOrder(e: Event): void {
        let value: number = Number((document.getElementById('polynomial') as HTMLInputElement).value);
        this.chartInstance.series[0].trendlines[0].polynomialOrder = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private checkPeriod(e: Event): void {
        let value: number = Number((document.getElementById('period') as HTMLInputElement).value);
        this.chartInstance.series[0].trendlines[0].period = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    }
    private droplist: { [key: string]: Object }[] = [
        { value: 'Linear' },
        { value: 'Exponential' },
        { value: 'Power' },
        { value: 'Logarithmic' },
        { value: 'Polynomial' },
        { value: 'MovingAverage' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart} load={this.load.bind(this)}
                            primaryXAxis={{
                                edgeLabelPlacement: 'Shift',
                                majorGridLines: { width: 0 }
                            }}
                            primaryYAxis={{
                                title: 'Rupees against Dollars',
                                interval: 10, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                            }}
                            tooltip={{ enable: true }}
                            chartArea={{ border: { width: 0 } }}
                            title='Historical Indian Rupee Rate (INR USD)' loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[Category, Tooltip, ScatterSeries, SplineSeries, LineSeries, Trendlines]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={series1} xName='x' yName='y' name='Rupees' type='Spline' marker= { { visible: true } }>
                                    <TrendlinesDirective>
                                        <TrendlineDirective type='Linear' width={3} marker={{ visible: false }} name='Linear' fill='#C64A75'>
                                        </TrendlineDirective>
                                    </TrendlinesDirective>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>TrendLine Type:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="trendLineType" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} text="Linear" value="Linear" />
                                        </div>
                                    </td>
                                </tr>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Forward Forecast:</div>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <div>
                                            <NumericTextBoxComponent id="forwardForecast" value={0} min={1} max={20} step={1} change={this.checkForwardForecast.bind(this)} ref={d => this.forwardElement = d} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Backward Forecast:</div>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <div>
                                            <NumericTextBoxComponent id="backwardForecast" value={0} min={1} max={20} step={1} change={this.checkBackwardForecast.bind(this)} ref={d => this.backwardElement = d} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Polynomial Order:</div>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <div>
                                            <NumericTextBoxComponent id="polynomial" value={0} min={1} max={20} step={1} disabled={true} change={this.checkPolynomialOrder.bind(this)} ref={d => this.polynomialElement = d} />
                                        </div>
                                    </td>
                                </tr>
                                <tr id='' style={{ height: '50px' }}>
                                    <td style={{ width: '80%' }}>
                                        <div>Period:</div>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <div>
                                            <NumericTextBoxComponent id="period" value={0} min={1} max={20} step={1} disabled={true} change={this.checkPeriod.bind(this)} ref={d => this.periodElement = d} />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates trend line for comparision of indian rupees and US dollar. By using property panel, you can change type of trend line by <code>TrendLine Type</code>, forward and backward forecasting of trendlines can be changed by <code>Foreward Forecasting</code> and <code>Backward Forecast</code> respectively. And also polynomial and period for a trenlines can be changed by <code>Polynomial order</code> and <code>Period</code>.
                        </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Trend line type charts. Trend line type chart is used to represent the price movements in stock. You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Trend Line series, we need to inject
                       <code>Trendlines</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the TrendLines series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
