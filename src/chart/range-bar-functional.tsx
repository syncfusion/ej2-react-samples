/**
 * Sample for Range Bar series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, RangeColumnSeries, Category, Tooltip, ILoadedEventArgs, Legend, ChartTheme, DataLabel } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: 'Jan', low: 28, high: 72, text:'January'},
    { x: 'Feb', low: 25, high: 75, text:'February' }, 
    { x: 'Mar', low: 18, high: 65, text:'March' },
    { x: 'Apr', low: 22, high: 69, text:'April' },
    { x: 'May', low: 56, high: 87, text:'May' }, 
    { x: 'Jun', low: 48, high: 75, text:'June' },
    { x: 'Jul', low: 40, high: 78, text:'July' },
    { x: 'Aug', low: 35, high: 73, text:'August' }, 
    { x: 'Sep', low: 43, high: 64, text:'September' }, 
    { x: 'Oct', low: 38, high: 77, text:'October' }, 
    { x: 'Nov', low: 28, high: 54, text:'November' }, 
    { x: 'Dec', low: 29, high: 56, text:'December' }
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
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: {width: 0} }} primaryYAxis={{ labelFormat: '{value}˚F', edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 },title:'Temperature (In Fahrenheit)' }} title='Temperature Variation' loaded={onChartLoad.bind(this)} load={load.bind(this)} legendSettings={{visible:false}} isTransposed={true} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} tooltip={{ enable: true, header : "<b>${point.tooltip}</b>", format :"Temperature : <b>${point.low} - ${point.high}</b>" }}>
                    <Inject services={[RangeColumnSeries, Tooltip, Category, Legend, DataLabel]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} marker={{ dataLabel: { visible: true, position: 'Outer'} }} name='California' xName='x' low='low' columnSpacing={0.1} high='high' tooltipMappingName='text' type='RangeColumn' />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the maximum and minimum temperatures for several months with the default range column series inverted. The tooltip shows the information for each data point.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the range column chart in an inverted manner. You can use <code>IsTransposed</code> property to invert your chart.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting
                    <code>RangeColumnSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the range column series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#column-charts">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default RangeBar;