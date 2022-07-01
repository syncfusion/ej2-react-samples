/**
 * Sample for scatter series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, ScatterSeries, Tooltip, ILoadedEventArgs, ChartTheme,
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { scatterData } from './scatter-data';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Scatter extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            minimum: 100,
                            maximum: 220,
                            majorGridLines: { width: 0 },
                            edgeLabelPlacement: 'Shift',
                            title: 'Height (cm)'

                        }}
                        primaryYAxis={{
                            majorTickLines: {
                                width: 0
                            },
                            minimum: 50,
                            maximum: 80,
                            lineStyle: {
                                width: 0
                            },
                            title: 'Weight (kg)',
                            rangePadding: 'None'
                        }
                        }
                        load={this.load.bind(this)}
                        title='Height vs Weight'
                        loaded={this.onChartLoad.bind(this)}
                        tooltip={{ enable: true, format: 'Weight: <b>${point.y} kg</b> <br/> Height: <b>${point.x}cm</b>' }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        chartArea={{ border: { width: 0 } }}
                    >
                        <Inject services={[ScatterSeries, Legend, Tooltip, Category]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={scatterData.getMaleData} width={2} xName='x' yName='y' name='Male' type='Scatter' opacity={0.6}
                                marker={{ visible: false, width: 12, height: 12, shape: 'Circle' }}>
                            </SeriesDirective>
                            <SeriesDirective dataSource={scatterData.getFemaleData} xName='x' yName='y' name='Female' type='Scatter' opacity={0.6}
                                marker={{ visible: false, width: 12, height: 12, shape: 'Diamond' }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample compares the height and weight of the genders by using default scatter series in the chart. Tooltip shows the
                        information about the data.
                  </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the scatter type charts. Scatter charts are used to plot financial
                        or scientific data. You can use
                        <code>shape</code> property in the marker to change the scatter shape.
                        <code>dataLabel</code> is used to represent individual data value.
                    </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use scatter series, we need to inject
                        <code>ScatterSeries</code> module into 
                        <code>services</code>.
                    </p>
                    <p>
                        More information on the scatter series can be found in this &nbsp;
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