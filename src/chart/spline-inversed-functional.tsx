/**
 * Sample for Inversed Spline series
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, ChartTheme, Inject, Category, SplineSeries, Tooltip, Highlight } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
export let data1 = [
    { Month: 2000, LDN_Temperature: -1, FR_Temperature: 10 }, { Month: 2002, LDN_Temperature: -1, FR_Temperature: 7 }, { Month: 2004, LDN_Temperature: 25, FR_Temperature: 13 },
    { Month: 2005, LDN_Temperature: 31, FR_Temperature: 16 }, { Month: 2007, LDN_Temperature: 14, FR_Temperature: 11 }, { Month: 2010, LDN_Temperature: 8, FR_Temperature: 10 },
    { Month: 2011, LDN_Temperature: 8, FR_Temperature: 15 }, { Month: 2013, LDN_Temperature: 8, FR_Temperature: 20 }, { Month: 2014, LDN_Temperature: 8, FR_Temperature: 17 },
    { Month: 2015, LDN_Temperature: 8, FR_Temperature: 5 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const SplineInversed = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    
    return (
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} isTransposed={true} primaryXAxis={{ interval: 4, title: 'Years', minimum: 2000,maximum: 2016, labelIntersectAction: 'Rotate90', minorTickLines: { width: 0 } }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ visible: false }} chartArea={{ border: { width: 1 } }} primaryYAxis={{ labelFormat: '{value}M', minimum: 0, title: 'Sales (In Millions)',edgeLabelPlacement: 'Shift',  maximum: 25, interval: 5, }} tooltip={{ enable: true, shared: true, header: '<b>Album Sale</b>', format: '${point.x}: <b>${point.y}</b>' }} title="Music Album Sales" loaded={onChartLoad.bind(this)}>
                    <Inject services={[SplineSeries, Category, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName="Month" yName="FR_Temperature" width={2} name="London" type="Spline" marker={{ visible: true, width: 7, height: 7, isFilled: true }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
                <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                    <a href="https://www.worldweatheronline.com/mooresville-weather/north-carolina/us.aspx" target="_blank">www.worldweatheronline.com</a>
                </div>
            </div>
            <div id="action-description">
                <p>This sample shows the music album sales with the spline series by inversing X and Y Axis. Data points are enhanced by a marker and tooltip.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the spline type charts. A Spline chart uses a curved line to connect points in a data series.
                    <code>Marker</code> are used to represent individual data and its values.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject <code>SplineSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the spline series can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline" aria-label="Navigate to the documentation for Spline Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default SplineInversed;