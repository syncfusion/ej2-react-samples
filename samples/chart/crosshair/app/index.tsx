/**
 * Sample for Crosshair in chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, AxesDirective, AxisDirective, Inject,
    LineSeries, HiloOpenCloseSeries, Crosshair, DateTime, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from './sample-base';
import { axesData } from '../financial-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Crosshair sample
 */
export class CrosshairChart extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <ChartComponent id='charts' style={{ textAlign: "center" }}
                        primaryXAxis={{
                            majorGridLines: { width: 0 },
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            labelFormat: 'MMM'
                        }}
                        load={this.load.bind(this)}
                        primaryYAxis={{
                            minimum: 83, maximum: 87, interval: 1,
                            title: 'Millions in USD',
                            labelFormat: '{value}M',
                            rowIndex: 0,
                            crosshairTooltip: {
                                enable: true
                            }
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        title='Conns,Inc Stock Details' loaded={this.onChartLoad.bind(this)}
                        crosshair={{ enable: true }}
                        legendSettings={{ visible: false }}>
                        <Inject services={[LineSeries, HiloOpenCloseSeries, Crosshair, DateTime]} />
                        <AxesDirective>
                            <AxisDirective majorGridLines={{ width: 0 }}
                                rowIndex={0}
                                opposedPosition={true}
                                minimum={82} maximum={88} interval={2}
                                name='yAxis'
                                title='Millions in USD (Stock)'
                                crosshairTooltip={{ enable: true }}>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                            <SeriesDirective type='Line'
                                dataSource={axesData}
                                border={{ width: 1.5 }}
                                xName='xDate' width={2}
                                yName='High'
                                marker={{
                                    visible: true
                                }}>
                            </SeriesDirective>
                            <SeriesDirective type='HiloOpenClose'
                                dataSource={axesData}
                                yAxisName='yAxis'
                                border={{ width: 1.5 }}
                                bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                xName='xDate' width={2}
                                high='High' low='Low' open='Open' close='Close'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let  chart:  Element  =  document.getElementById('charts');
        chart.setAttribute('title',  '');
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}
ReactDOM.render(<CrosshairChart />, document.getElementById('sample'));