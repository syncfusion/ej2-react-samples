/**
 * Sample for Range Bar series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    RangeColumnSeries, Category, Tooltip, ILoadedEventArgs, Legend, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: 'Jul', low: 28, high: 72 },
    { x: 'Aug', low: 18, high: 65 }, { x: 'Sep', low: 56, high: 87 },
    { x: 'Oct', low: 40, high: 78 },
    { x: 'Nov', low: 43, high: 64 }, { x: 'Dec', low: 28, high: 54 }
];
export let data1: any[] = [
    { x: 'Jul', low: 38, high: 78 },
    { x: 'Aug', low: 27, high: 78 }, { x: 'Sep', low: 28, high: 79 },
    { x: 'Oct', low: 37, high: 66 },
    { x: 'Nov', low: 25, high: 52 }, { x: 'Dec', low: 20, high: 60 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class RangeBar extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 } }}
                        primaryYAxis={{ labelFormat: '{value}˚F', edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }}
                        title='Temperature Variation' loaded={this.onChartLoad.bind(this)}
                        load={this.load.bind(this)}
                        isTransposed={true}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        tooltip={{
                            enable: true
                        }}>
                        <Inject services={[RangeColumnSeries, Tooltip, Category, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} name='California' xName='x' low='low' high='high' type='RangeColumn'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data1} name='Colorado' xName='x' low='low' high='high' type='RangeColumn'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates a range column series by inversing its X and Y  Axes. Tooltip shows the information about the data points.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the range column type chart with inverted manner. You can use <code>border</code>,
                        <code>fill</code> properties to customize the area. <code>dataLabel</code> are used to represent individual data
                        and its value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>

                    <p><b>Injecting Module</b></p>
                    <p>
                        chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting
                        <code>RangeColumnSeries</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the range column series can be found in this &nbsp;
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
        // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
        // custom code end
}