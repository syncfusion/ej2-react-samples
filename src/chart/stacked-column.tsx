/**
 * Sample for Stacking Column series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, StackingColumnSeries, Tooltip, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data1: any[] = [
    { x: '2014', y: 111.1 },
    { x: '2015', y: 127.3 },
    { x: '2016', y: 143.4 },
    { x: '2017', y: 159.9 }];
export let data2: any[] = [
    { x: '2014', y: 76.9 },
    { x: '2015', y: 99.5 },
    { x: '2016', y: 121.7 },
    { x: '2017', y: 142.5 }];
export let data3: any[] = [
    { x: '2014', y: 66.1 },
    { x: '2015', y: 79.3 },
    { x: '2016', y: 91.3 },
    { x: '2017', y: 102.4 }];
export let data4: any[] = [
    { x: '2014', y: 34.1 },
    { x: '2015', y: 38.2 },
    { x: '2016', y: 44.0 },
    { x: '2017', y: 51.6 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class StackedColumn extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            majorGridLines: { width: 0 },
                            minorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 },
                            interval: 1,
                            lineStyle: { width: 0 },
                            labelIntersectAction: 'Rotate45',
                            valueType: 'Category'
                        }}
                        primaryYAxis={{
                            title: 'Sales',
                            lineStyle: { width: 0 },
                            minimum: 0,
                            maximum: 500,
                            interval: 100,                
                            majorTickLines: { width: 0 },
                            majorGridLines: { width: 1 },
                            minorGridLines: { width: 1 },
                            minorTickLines: { width: 0 },
                            labelFormat: '{value}B',
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        title='Mobile Game Market by Country' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' name='UK' type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data2} xName='x' yName='y' name='Germany' type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data3} xName='x' yName='y' name='France' type='StackingColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data4} xName='x' yName='y' name='Italy' type='StackingColumn'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026" target="_blank">www.cyberagent.co.jp</a>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes mobile game market for different countries with default stacked column series in chart. Legend in the sample shows the information about those series.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the stacking column type charts. Stacks the points in the series vertically and also you can use <code>stackingGroup</code> property to group the stacking collection based on categories.
                        You can use <code>border</code>, <code>fill</code> properties to customize the vertical bar. <code>dataLabel</code> is used to represent individual data and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject
                          <code>StackingColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the stacking column series can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');

    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
}