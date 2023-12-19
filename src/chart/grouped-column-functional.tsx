/**
 * Sample for grouped Column series
 */
import * as React from "react";
import { useEffect } from 'react';
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, Legend, Category, Tooltip, ColumnSeries, ILoadedEventArgs, DataLabel } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1 = [
    { x: '2012', y: 104 },
    { x: '2016', y: 121 },
    { x: '2020', y: 113 },
];
export let data2 = [
    { x: '2012', y: 46 },
    { x: '2016', y: 46 },
    { x: '2020', y: 39 },
];
export let data3 = [
    { x: '2012', y: 65 },
    { x: '2016', y: 67 },
    { x: '2020', y: 65 },
];
export let data4 = [
    { x: '2012', y: 29 },
    { x: '2016', y: 27 },
    { x: '2020', y: 22 },
];
export let data5 = [
    { x: '2012', y: 91 },
    { x: '2016', y: 70 },
    { x: '2020', y: 88 },
];
export let data6 = [
    { x: '2012', y: 38 },
    { x: '2016', y: 26 },
    { x: '2020', y: 38 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const GroupedColumn = () => {
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
                <ChartComponent id="charts" style={{ textAlign: 'center' }} load={load.bind(this)} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }} primaryYAxis={{ majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Medal Count'}} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '75%'} title="Olympics Medal Tally" loaded={onChartLoad.bind(this)}>
                    <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}/>
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName="x" yName="y" name="USA Gold Medals" type="Column" groupName="USA" columnWidth={0.7} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff'} } }} ></SeriesDirective>
                        <SeriesDirective dataSource={data2} xName="x" yName="y" name="USA Total Medals" type="Column" groupName="USA" columnWidth={0.5} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}></SeriesDirective>
                        <SeriesDirective dataSource={data3} xName="x" yName="y" name="UK Total Medals" type="Column" groupName="UK" columnWidth={0.7} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}></SeriesDirective>
                        <SeriesDirective dataSource={data4} xName="x" yName="y" name="UK Gold Medals" type="Column" groupName="UK" columnWidth={0.5} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}></SeriesDirective>
                        <SeriesDirective dataSource={data5} xName="x" yName="y" name="China Total Medals" type="Column" groupName="China" columnWidth={0.7} columnSpacing={0.1} marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}></SeriesDirective>
                        <SeriesDirective dataSource={data6} xName="x" yName="y" name="China Gold Medals" type="Column" groupName="China" columnWidth={0.5} columnSpacing={0.1} marker={{  dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample visualizes the Olympics medal count using a grouped column series. Data labels are used to display the values of data points.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the column type charts.
                    Column type charts are used for comparing the frequency, count, total or average of data in different categories.
                    You can group the column series by using <code>groupName</code> property.
                </p>
                <p>
                    <code>Tooltip</code> is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject <code>ColumnSeries</code> module using <code>services</code>.
                </p>
                <br />
                <p>
                    More information about the column series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#column-charts">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default GroupedColumn;
