/**
 * Sample for RangeColumn series
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Category, Highlight, DataLabel, Tooltip, ILoadedEventArgs, Legend, ChartTheme, RangeColorSettingsDirective, RangeColorSettingDirective } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser, EmitType } from '@syncfusion/ej2-base';
export let data: any[] = [
    { x: "Jan", y: 6 },
    { x: "Feb", y: 8.9 },
    { x: "Mar", y: 12 },
    { x: "Apr", y: 17.5 },
    { x: "May", y: 22.1 },
    { x: "June", y: 25 },
    { x: "July", y: 29.4 },
    { x: "Aug", y: 29.6 },
    { x: "Sep", y: 25.8 },
    { x: "Oct", y: 21.1 },
    { x: "Nov", y: 15.5 },
    { x: "Dec", y: 9.9 }
];
export const color1 = ['#F9D422'];
export const color2 = ['#F28F3F'];
export const color3 = ['#E94F53'];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const RangeColorMapping = () => {
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
                <ChartComponent id='charts' style={{ textAlign: "center" }} highlightMode='Point' highlightPattern='DiagonalForward' primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 },  majorTickLines: {width : 0}, minorTickLines: {width: 0} }} primaryYAxis={{ lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}°C' }} title="USA CLIMATE - WEATHER BY MONTH" loaded={onChartLoad.bind(this)} load={load.bind(this)} chartArea={{ border: { width: 0 } }} width={Browser.isDevice ? '100%' : '75%'} legendSettings={{ mode: 'Range', visible: true, toggleVisibility: false }}>
                    <Inject services={[ColumnSeries, Highlight, DataLabel, Tooltip, Category, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective dataSource={data} name='USA' xName='x' yName='y' type='Column' animation={{ enable: false }} cornerRadius={{ topLeft: 10, topRight: 10 }} marker={{ dataLabel: { visible: true, position: "Outer" } }} />
                    </SeriesCollectionDirective>
                    <RangeColorSettingsDirective>
                        <RangeColorSettingDirective label="1°C to 10°C" start={1} end={10} colors={color1} />
                        <RangeColorSettingDirective label="11°C to 20°C" start={11} end={20} colors={color2} />
                        <RangeColorSettingDirective label="21°C to 30°C" start={21} end={30} colors={color3} />
                    </RangeColorSettingsDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates the USA climate with the month-wise data. Columns are differentiated using color codes based on
                    the temperature ranges for better visualization. By toggling the legend items you can control the visibility of the
                    columns within the ranges.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, column segment color is applied based on their <code>y</code> value ranges by using the <code>RangeColorSettingsDirective</code>.
                    You can use below properties in the <code>RangeColorSettingsDirective</code>to customize the data under range.
                </p>
                <ul>
                    <li>
                        <p><code>label</code> - Specify the name for the range mapping which will be displayed in the legend item.</p>
                    </li>
                    <li>
                        <p><code>start</code> - Specify the start value of the color mapping range.</p>
                    </li>
                    <li>
                        <p><code>end</code> - Specify the end value of the color mapping range.</p>
                    </li>
                    <li>
                        <p><code>colors</code> - Specify the fill colors of point those lies on the given range. If multiple colors are mentioned, then gradient will be applied.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default RangeColorMapping;