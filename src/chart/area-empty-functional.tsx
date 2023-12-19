/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, Highlight, SeriesDirective, ILoadedEventArgs, ChartTheme, Inject, Tooltip, DateTime, AreaSeries, Legend } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1 = [
    { Period: new Date(2021, 10, 14), US_InflationRate: 2.2, IN_InflationRate: 0.8 }, { Period: new Date(2021, 10, 15), US_InflationRate: 2.0, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 16), US_InflationRate: 2.8, IN_InflationRate: 1.8 },
    { Period: new Date(2021, 10, 17), US_InflationRate: 1.6, IN_InflationRate: 2.1 }, { Period: new Date(2021, 10, 18), US_InflationRate: 2.3, IN_InflationRate: null }, { Period: new Date(2021, 10, 19), US_InflationRate: 2.5, IN_InflationRate: 2.3 },
    { Period: new Date(2021, 10, 20), US_InflationRate: 2.9, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 21), US_InflationRate: 1.1, IN_InflationRate: 1.5 }, { Period: new Date(2021, 10, 22), US_InflationRate: 1.4, IN_InflationRate: 0.5 },
    { Period: new Date(2021, 10, 23), US_InflationRate: 1.1, IN_InflationRate: 1.3 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Area empty sample
 */
const AreaEmpty = () => {
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
        <div className="control-pane">
            <style>{SAMPLE_CSS}</style>
            <div className="control-section">
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{   valueType: 'DateTime', labelFormat: 'dd MMM', minimum: new Date(2021, 10, 14), maximum:  new Date(2021, 10, 23), majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} primaryYAxis={{ labelFormat: '{value}MB', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, minimum: 0, maximum: 5, interval: 1 }} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}</b>' }} legendSettings={{ enableHighlight: true }} chartArea={{ border: { width: 0 } }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title="Data Consumption" loaded={onChartLoad.bind(this)}>
                    <Inject services={[AreaSeries, DateTime, Legend, Tooltip, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName="Period" yName="US_InflationRate" name="Andrew" opacity={0.5} marker={{ visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
                        <SeriesDirective dataSource={data1} xName="Period" yName="IN_InflationRate" name="Thomas" marker={{ visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }} opacity={0.5} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates an area series with empty points. Data points with null points are shown here.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render an area series with empty points. Also, a legend is enabled in the shape of the series.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject <code>AreaSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the area series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#area-charts">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default AreaEmpty;