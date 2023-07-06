/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import { useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective,DateTime, Highlight, ILoadedEventArgs, ChartTheme, Inject, Tooltip, Category, AreaSeries, Legend } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1 = [
    { x: new Date(2017, 0, 1), y: 3000 }, { x: new Date(2018, 0, 1), y: 4000 },
    { x: new Date(2019, 0, 1), y: -4000 }, { x: new Date(2020, 0, 1), y: -2000 },
    { x: new Date(2021, 0, 1), y: 5000 }
];
export let data2 = [
    { x: new Date(2017, 0, 1), y: 2000 }, { x: new Date(2018, 0, 1), y: 3000 },
    { x: new Date(2019, 0, 1), y: 4000 }, { x: new Date(2020, 0, 1), y: 2000 },
    { x: new Date(2021, 0, 1), y: 3000 }
];
export let data3 = [
    { x: new Date(2017, 0, 1), y: 2000 }, { x: new Date(2018, 0, 1), y: -1000 },
    { x: new Date(2019, 0, 1), y: -3000 }, { x: new Date(2020, 0, 1), y: 4000 },
    { x: new Date(2021, 0, 1), y: 1000 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
/**
 * Area empty sample
 */
const AreaNegative = () => {
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
                <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'DateTime', labelFormat: 'y', majorGridLines: { width: 0 }, minimum:new Date(2017, 0, 1), maximum: new Date(2021, 0, 1), intervalType: 'Years', edgeLabelPlacement: 'Shift' }} primaryYAxis={{ labelFormat: '${value}', minimum: -4000, maximum: 8000, interval: 2000, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} legendSettings={{ enableHighlight: true }} load={load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title="Profit and Loss" tooltip={{ enable: true }} loaded={onChartLoad.bind(this)}>
                    <Inject services={[AreaSeries, Category, Tooltip, Legend, DateTime, Highlight]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data1} xName="x" yName="y" name="Company A" opacity={0.75} marker={{ visible: true, shape: 'Circle', isFilled: true, width: 7, height: 7 }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
                        <SeriesDirective dataSource={data2} xName="x" yName="y" name="Company B" opacity={0.75} marker={{ visible: true, shape: 'Diamond', isFilled: true, width: 7, height: 7 }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
                        <SeriesDirective dataSource={data3} xName="x" yName="y" name="Company C" opacity={0.75} marker={{ visible: true, shape: 'Rectangle', isFilled: true, width: 5, height: 5 }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates an area series with negative values. Data points with negative values are shown here.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render an area series with negative values. Similar to line type series, but the area gets closed and filled with series color. You can use <a target="_blank" href=" https://ej2.syncfusion.com/react/documentation/api/chart/series/#border">border</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/chart/series/#fill">fill </a> properties to customize the area. Also, the legend is enabled with the shape of the series type.
                </p>
                <br></br>
                <p>
                    More information on the area series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/chart-types/#area-charts">documentation section</a>.
                </p>
            </div>
        </div>
    )    
}
export default AreaNegative;

