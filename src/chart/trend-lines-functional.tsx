/**
 * Samples for Trendlines
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, TrendlineDirective, TrendlinesDirective, Inject,
     LineSeries, ScatterSeries, ILoadedEventArgs, SplineSeries, Trendlines, Category, ChartTheme, Legend
} from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
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
function Trend() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let dropElement: DropDownListComponent;
    let checkElement: HTMLInputElement;
    let forwardElement: NumericTextBoxComponent;
    let backwardElement: NumericTextBoxComponent;
    let polynomialElement: NumericTextBoxComponent;
    let periodElement: NumericTextBoxComponent;
    let loaded: EmitType<ILoadedEventArgs>;
    let forwardForecast: boolean = false;
    let backwardForecast: boolean = false;
    let polynomialOrder: boolean = true;
    let period: boolean = true;
    function change(e: Event): void {
        let type: any = document.getElementById('trendLineType');
        chartInstance.series[0].dataSource = [];
        chartInstance.series[0].animation.enable = false;
        chartInstance.series[0].trendlines[0].type = type.value;
        chartInstance.series[0].trendlines[0].name = type.value;
        if (type.value !== 'Power') {
            chartInstance.series[0].dataSource = series1;
            chartInstance.series[0].name = 'Rupees';
            chartInstance.primaryXAxis.title = '';
            chartInstance.primaryYAxis.interval = 10;
            chartInstance.primaryYAxis.title = 'Rupees against Dollars';
            chartInstance.title = 'Historical Indian Rupee Rate (INR USD)';
            if (type.value === 'MovingAverage') {
                chartInstance.series[0].trendlines[0].marker.visible = false;
            }
        } else {
            chartInstance.series[0].dataSource = powerData;
            chartInstance.series[0].name = 'Meters';
            chartInstance.primaryXAxis.title = 'Seconds';
            chartInstance.primaryYAxis.title = 'Meters';
            chartInstance.primaryYAxis.interval = 100;
            chartInstance.title = 'Distance Measurement';
        }
        if (type.value !== 'Polynomial' && type.value !== 'MovingAverage') {
            period = polynomialOrder = true;
            forwardForecast = backwardForecast = false;
        } else if (type.value === 'MovingAverage') {
            period = false;
            forwardForecast = backwardForecast = polynomialOrder = true;
        } else {
            forwardForecast = backwardForecast = polynomialOrder = false;
            period = true;
        }
        forwardElement.enabled = !forwardForecast;
        backwardElement.enabled = !backwardForecast;
        polynomialElement.enabled = !polynomialOrder;
        periodElement.enabled = !period;
        chartInstance.refresh();
    }
    function checkForwardForecast(e: Event): void {
        let value: number = Number((document.getElementById('forwardForecast') as HTMLInputElement).value);
        chartInstance.series[0].trendlines[0].forwardForecast = value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    function checkBackwardForecast(e: Event): void {
        let value: number = Number((document.getElementById('backwardForecast') as HTMLInputElement).value);
        chartInstance.series[0].trendlines[0].backwardForecast = value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    function checkPolynomialOrder(e: Event): void {
        let value: number = Number((document.getElementById('polynomial') as HTMLInputElement).value);
        chartInstance.series[0].trendlines[0].polynomialOrder = value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    function checkPeriod(e: Event): void {
        let value: number = Number((document.getElementById('period') as HTMLInputElement).value);
        chartInstance.series[0].trendlines[0].period = value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.refresh();
    }
    let droplist: { [key: string]: Object }[] = [
        { value: 'Linear' },
        { value: 'Exponential' },
        { value: 'Power' },
        { value: 'Logarithmic' },
        { value: 'Polynomial' },
        { value: 'MovingAverage' }
    ];
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chart => chartInstance = chart} load={load.bind(this)}
                        primaryXAxis={{
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Rupees against Dollars',
                            interval: 10, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        title='Historical Indian Rupee Rate (INR USD)' loaded={onChartLoad.bind(this)}>
                        <Inject services={[Category,  ScatterSeries, SplineSeries, LineSeries, Trendlines, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={series1} xName='x' yName='y' name='Rupees' type='Spline' marker={{ visible: true }}>
                                <TrendlinesDirective>
                                    <TrendlineDirective type='Linear' width={3} marker={{ visible: false }} name='Trends' fill='#C64A75'>
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
                                        <DropDownListComponent width="120px" id="trendLineType" change={change.bind(this)} ref={d => dropElement = d} dataSource={droplist} fields={{ text: 'value', value: 'value' }} text="Linear" value="Linear" />
                                    </div>
                                </td>
                            </tr>
                            <tr id='' style={{ height: '50px' }}>
                                <td style={{ width: '80%' }}>
                                    <div>Forward Forecast:</div>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div>
                                        <NumericTextBoxComponent id="forwardForecast" value={0} min={1} max={20} step={1} change={checkForwardForecast.bind(this)} ref={d => forwardElement = d} />
                                    </div>
                                </td>
                            </tr>
                            <tr id='' style={{ height: '50px' }}>
                                <td style={{ width: '80%' }}>
                                    <div>Backward Forecast:</div>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div>
                                        <NumericTextBoxComponent id="backwardForecast" value={0} min={1} max={20} step={1} change={checkBackwardForecast.bind(this)} ref={d => backwardElement = d} />
                                    </div>
                                </td>
                            </tr>
                            <tr id='' style={{ height: '50px' }}>
                                <td style={{ width: '80%' }}>
                                    <div>Polynomial Order:</div>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div>
                                        <NumericTextBoxComponent id="polynomial" value={0} min={1} max={20} step={1} enabled={false} change={checkPolynomialOrder.bind(this)} ref={d => polynomialElement = d} />
                                    </div>
                                </td>
                            </tr>
                            <tr id='' style={{ height: '50px' }}>
                                <td style={{ width: '80%' }}>
                                    <div>Period:</div>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div>
                                        <NumericTextBoxComponent id="period" value={0} min={1} max={20} step={1} enabled={false} change={checkPeriod.bind(this)} ref={d => periodElement = d} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample visualizes the trend of Indian rupees and US dollar variation with trendline in the chart.
                    The type of trend line can be changed by using <code>TrendLine Type</code>, forward and backward forecasting of trendlines can be changed by <code>Forward Forecasting</code> and <code>Backward Forecast</code> respectively.
                    Polynomial and period for a trendlines can be changed by using <code>Polynomial order</code> and <code>Period</code>.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the Trend line type charts. Trend line type chart is used to represent the price movements in stock. You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Trend Line series, we need to inject
                    <code>Trendlines</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the TrendLines series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/trend-lines/">documentation section</a>.
                </p>
            </div>
        </div >
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
}
export default Trend;
