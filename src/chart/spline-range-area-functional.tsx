/**
 * Sample for Range Area Series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, Highlight, DateTime, SeriesDirective, Inject, SplineRangeAreaSeries, ILoadedEventArgs, ChartTheme, Tooltip } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { chartDataValues } from './financial-data';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const SplineRangeArea = () => {
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
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} load={load.bind(this)} primaryXAxis={{   valueType: 'DateTime', labelFormat: 'dd MMM', edgeLabelPlacement: (Browser.isDevice) ? 'Shift' : 'Hide', majorGridLines: { width: 0 } }} primaryYAxis={{  labelFormat: '{value}˚C', lineStyle: { width: 0 }, minimum: -10, maximum: 25, interval: 5, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, format:'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>', shared: false, showNearestTooltip: true }} width={Browser.isDevice ? '100%' : '75%'} title='Temperature Variation by Month' loaded={onChartLoad.bind(this)}>
                    <Inject services={[SplineRangeAreaSeries, DateTime, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={chartDataValues} border={{ width: 2 }} xName='x' high='high' opacity={0.7}
                            marker={{ visible: false }} low='low' animation={{ enable: true }}  type='SplineRangeArea'>
                        </SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the monthly difference in temperature between two different countries using the spline range area series in the chart.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the spline range area type chart.
                    You can use <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/border/" aria-label="Navigate to the Border property reference for React Chart Series">border</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/seriesModel/#fill" aria-label="Navigate to the Fill property reference for React Chart Series">fill</a> properties to customize the spline range area. Both <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/marker/" aria-label="Navigate to the documentation for Data markers in React Chart component">marker</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/dataLabel/" aria-label="Navigate to the documentation for DataLabel in React Chart component">dataLabel</a> are used to represent individual data and its value.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module:</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use spline range area series, we need to inject <code>SplineRangeAreaSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the spline range area series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline-range-area">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default SplineRangeArea;
