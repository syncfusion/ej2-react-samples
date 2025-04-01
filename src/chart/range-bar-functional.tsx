/**
 * Sample for the Range Bar Series
 */
import * as React from "react";
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ILoadedEventArgs, RangeColumnSeries, Category, Tooltip, Legend, DataLabel } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

export let rangeBarData: Object[] = [
    { country: 'Solomon Islands', low: 44, high: 134 },
    { country: 'Tonga', low: 52, high: 131 },
    { country: 'Trinidad and Tobago', low: 36, high: 151 },
    { country: 'Samoa', low: 49, high: 131 },
    { country: 'Saint Lucia', low: 39, high: 148 },
    { country: 'Georgia', low: 68, high: 122 },
    { country: 'Peru', low: 56, high: 141 },
    { country: 'Grenada', low: 41, high: 147 },
    { country: 'Dominica', low: 46, high: 143 },
    { country: 'Ukraine', low: 64, high: 148 },
    { country: 'Colombia', low: 64, high: 134 }
];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RangeBar = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        loadChartTheme(args);
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}', minimum: 0, maximum: 200, interval: 20, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, title: 'Growth in Visa-Free Destinations', labelRotation: Browser.isDevice ? -45 : 0 }} title='Global Passport Rankings: Growth in Visa-Free Access (2006–2024)' subTitle='Source: wikipedia.org' loaded={onChartLoad.bind(this)} load={load.bind(this)} isTransposed={true} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} tooltip={{ enable: true, format: '${point.x}: <b>${point.low} - ${point.high}</b>' }}>
                    <Inject services={[RangeColumnSeries, Tooltip, Category, Legend, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={rangeBarData} marker={{ dataLabel: { visible: true, position: 'Outer' } }} xName='country' low='low' high='high' type='RangeColumn' cornerRadius={{ topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 }} columnSpacing={0.4}/>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample visually represents changes in visa-free access for various countries using an inverted Range Column chart. It highlights the countries that have experienced the most significant increases and decreases over the past decade.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the range column chart in an inverted manner. You can use <code>isTransposed</code> property to invert your chart.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting <code>RangeColumnSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the range column series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-column" aria-label="Navigate to the documentation for Range Column in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default RangeBar;