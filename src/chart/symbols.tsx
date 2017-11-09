/**
 * Sample for Chart symbols
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, Tooltip, DataLabel, LineSeries, ILoadedEventArgs, ChartTheme
}
    from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: 'WW', y: 12, y1: 22, y2: 38.3, y3: 50, text: 'World Wide' },
    { x: 'EU', y: 9.9, y1: 26, y2: 45.2, y3: 63.6, text: 'Europe' },
    { x: 'APAC', y: 4.4, y1: 9.3, y2: 18.2, y3: 20.9, text: 'Asia Pacific' },
    { x: 'LATAM', y: 6.4, y1: 28, y2: 46.7, y3: 65.1, text: 'Latin America' },
    { x: 'MEA', y: 30, y1: 45.7, y2: 61.5, y3: 73, text: 'Middle East Africa' },
    { x: 'NA', y: 25.3, y1: 35.9, y2: 64, y3: 81.4, text: 'North America' }
];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Symbols extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            title: 'Countries', valueType: 'Category',
                            interval: 1, labelIntersectAction: 'Rotate45',
                            majorGridLines: { width: 0 },
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Penetration', rangePadding: 'None',
                            labelFormat: '{value}%', minimum: 0,
                            lineStyle: { width: 0 },
                            maximum: 75, interval: 15
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        title='FB Penetration of Internet Audience' loaded={this.onChartLoad.bind(this)}
                        legendSettings={{ visible: false }}
                        tooltip={{ enable: true }}>
                        <Inject services={[LineSeries, Legend, Tooltip, DataLabel, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' width={2} name='December 2007'
                                type='Line' marker={{ visible: true, dataLabel: { name: 'text' }, width: 10, height: 10, shape: 'Diamond' }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y1' width={2} name='December 2008'
                                type='Line' marker={{ visible: true, dataLabel: { name: 'text' }, width: 10, height: 10, shape: 'Pentagon' }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y2' width={2} name='December 2009'
                                type='Line' marker={{ visible: true, dataLabel: { name: 'text' }, width: 10, height: 10, shape: 'Triangle' }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    <div style={{ float: 'right', marginRight: '10px' }}>Source: &nbsp;
                         <a href="http://www.marketingprofs.com/charts/2012/7064/facebook-stats-five-years-of-worldwide-growth" target="_blank">www.marketingprofs.com</a>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates rendering of symbols in chart. In line based series, data points could be represented by symbols.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Each points in a series can be represented as a symbol through marker. We can also customize the shape, size and color of a symbol through <code>marker</code> properties.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p>
                        More information on the marker can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-markerSettingsModel.html">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}