/**
 * Sample for Trackball in chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    LineSeries, DateTime, Tooltip, Crosshair, Legend, ILoadedEventArgs, ChartTheme
}
    from '@syncfusion/ej2-react-charts';
import { john, andrew, thomas, mark, william } from './trackball-data';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export class TrackballChart extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11),
                            valueType: 'DateTime',
                            skeleton: 'y',
                            lineStyle: { width: 0 },
                            majorGridLines: { width: 0 },
                            edgeLabelPlacement: 'Shift'
                        }}
                        width={Browser.isDevice ? '100%' : '60%'}
                        chartArea={{ border: { width: 0 } }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            title: 'Revenue',
                            labelFormat: '{value}M',
                            majorTickLines: { width: 0 },
                            minimum: 10, maximum: 80,
                            lineStyle: { width: 0 },
                        }}
                        title='Average Sales per Person' loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true, shared: true }}
                        crosshair={{ enable: true, lineType: 'Vertical' }}>
                        <Inject services={[LineSeries, DateTime, Tooltip, Crosshair, Legend]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={john} xName='x' yName='y' width={2} name='John'
                                type='Line' marker={{ visible: true }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={andrew} xName='x' yName='y' width={2} name='Andrew'
                                type='Line' marker={{ visible: true }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={thomas} xName='x' yName='y' width={2} name='Thomas'
                                type='Line' marker={{ visible: true }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates trackball feature in chart. To show trackball, hover or long press the chart and you can see the point value near to the mouse point.
            </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the trackball behavior in chart. Trackball is used to track a data point closer to the current mouse position or touch contact point.
                        You can show tooltip for individual point or group of points closer to mouse position using <code>shared</code> properties in tooltip.
                    </p>
                    <p>
                        Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Trackball, we need to inject
                        <code>Tooltip</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the Tooltip and Trackball can be found in this &nbsp;
                        <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-tooltipSettingsModel.html">documentation section</a>.
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