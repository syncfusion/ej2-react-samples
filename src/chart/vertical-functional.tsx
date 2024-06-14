/**
 * Samples for vertical chart
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Legend, LineSeries, ILoadedEventArgs, Series,Category, ChartTheme, getElement, AxesDirective, AxisDirective, Tooltip } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const VerticalChart = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts-vertical');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts-vertical' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} load={load.bind(this)} primaryYAxis={{ title: 'Sales in Billion', majorGridLines: { width: 0 }, minimum: 11000, maximum: 15000, interval: 500, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} isTransposed={true} legendSettings={{ visible: false }} tooltip={{ enable: true }} width={Browser.isDevice ? '100%' : '75%'} title='Sales Vs Profit Margins' loaded={onChartLoad.bind(this)}>
                    <Inject services={[LineSeries, Tooltip, Category, Legend, ColumnSeries]} />
                    <AxesDirective>
                        <AxisDirective majorGridLines={{ width: 0 }} opposedPosition={true} title='Profit(In Percentage)' lineStyle={{ width: 0 }} minimum={0} maximum={4} interval={0.5} majorTickLines={{ width: 0 }} name='yAxis2' labelFormat='{value}%' />
                    </AxesDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective width={2} dataSource={[ { Year: "2016", column: 13600 }, { Year: "2017", column: 12900 }, { Year: "2018", column: 12500 }, { Year: "2019", column: 14500 }, { Year: "2020", column: 14500 }, { Year: "2021", column: 12000 } ]} xName='Year' name="Sales" yName='column' type='Column' />
                        <SeriesDirective width={2} dataSource={[ { Year: "2016", column: 13600, series: 0.5 }, { Year: "2017", series: 1.5 }, { Year: "2018", series: 3.5 }, { Year: "2019", series: 1.5 }, { Year: "2020", series: 3 }, { Year: "2021", series: 2.5 }]} yAxisName="yAxis2" name="Profit Margin" xName='Year' yName='series' type='Line' marker={{ visible: true,  width: 7, height: 7, isFilled: true }} />
                    </SeriesCollectionDirective>
                </ChartComponent>
            </div>
            <div id="action-description">
                <p>This sample illustrates a sales versus profit margin analysis using a vertical chart by changing the orientation of the x-axis to vertical and the y-axis to horizontal.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the vertical type charts.
                    To render a chart in vertical manner, you can use <code>isTransposed</code> in chart.
                </p>
                <p>
                    More information on the isTransposed can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/vertical" aria-label="Navigate to the documentation for Vertical Chart in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default VerticalChart;