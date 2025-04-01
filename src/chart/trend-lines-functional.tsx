/**
 * Samples for Trendlines
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, TrendlineDirective, TrendlinesDirective, Inject, Tooltip, LineSeries, ScatterSeries, ILoadedEventArgs, SplineSeries, Trendlines, Category, ChartTheme, Legend } from '@syncfusion/ej2-react-charts';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
let series1: Object[] = [
    { Period: 1947, Rupees: 4.76 },
    { Period: 1967, Rupees: 7.50 },
    { Period: 1974, Rupees: 8.10 },
    { Period: 1989, Rupees: 16.64 },
    { Period: 1990, Rupees: 17.32 },
    { Period: 2000, Rupees: 43.56 },
    { Period: 2007, Rupees: 39.27 },
    { Period: 2013, Rupees: 56.57 },
    { Period: 2019, Rupees: 71.74 },
    { Period: 2020, Rupees: 76.67 },
    { Period: 2021, Rupees: 72.75 },
];

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
const Trend = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section '>
                <ChartComponent id='charts' style={{ textAlign: "center" }} load={load.bind(this)} primaryXAxis={{ valueType: 'Category', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 1 } }} primaryYAxis={{ minimum: 0, maximum: 80, interval: 10, labelFormat: "₹{value}", title: 'Rupees against Dollars', minorTickLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} tooltip={{ enable: true, showNearestTooltip: true, enableHighlight: true }} width={Browser.isDevice ? '100%' : '75%'} title='USD to INR Rates' loaded={onChartLoad.bind(this)}>
                    <Inject services={[Category, ScatterSeries, SplineSeries, LineSeries, Tooltip, Trendlines, Category, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={series1} xName='Period' yName='Rupees' name='Rupees' type='Spline' marker={{ visible: true, isFilled: true, height: 7, width: 7 }}>
                            <TrendlinesDirective>
                                <TrendlineDirective type='Linear' width={3} name='Trends' fill='#C64A75' />
                            </TrendlinesDirective>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the trend of Indian rupees and US dollar variations in the chart.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure the trendlines. The trendline is a line drawn over the chart to display the overall direction of the results.</p>
                <p>This chart supports the following types.</p>
                <ul>
                    <li>Linear</li>
                    <li>Exponential</li>
                    <li>Logarithmic</li>
                    <li>Polynomial</li>
                    <li>Power</li>
                    <li>Moving Average</li>
                    <li>Forecasting</li>
                </ul>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Trend Line series, we need to inject <code>Trendlines</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the TrendLines can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/trend-lines/" aria-label="Navigate to the documentation for Trend Lines in React Chart Component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default Trend;
