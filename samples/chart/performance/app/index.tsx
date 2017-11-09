/**
 * Sample for Chart performance
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PropertyPane } from './property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    LineSeries, Legend, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';

export class Performance extends SampleBase<{}, {}> {

    private chart: ChartComponent;
    private loaded: EmitType<ILoadedEventArgs>;
    private dt1: number = 0;
    public change(): void {
        let series1: Object[] = [];
        let point1: Object;
        let value: number = 0;
        let i: number;
        for (i = 0; i < 100000; i++) {
            value += (Math.random() * 10 - 5);
            point1 = { x: i, y: value };
            series1.push(point1);
        }
        this.dt1 = new Date().getTime();
        this.chart.series[0].animation.enable = false;
        this.chart.series[0].dataSource = series1;
        this.chart.series[0].xName = 'x';
        this.chart.series[0].yName = 'y';
        this.chart.refresh();
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let dt2: number;
        dt2 = new Date().getTime();
        if (this.dt1) {
            document.getElementById('performanceTime').innerHTML = (dt2 - this.dt1) + 'ms';
        }
        this.dt1 = 0;
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section row'>
                    <div className='col-lg-9'>
                        <ChartComponent id='charts' ref={chart => this.chart = chart} loaded={this.onChartLoad.bind(this)}
                            primaryXAxis={{
                                majorGridLines: { color: 'transparent' }
                            }} load={this.load.bind(this)} legendSettings={{ visible: false }}>
                            <Inject services={[LineSeries, Legend]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective name='Series1' type='Line' animation={{ enable: false }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: '50%' }}>
                                        <ButtonComponent cssClass='e-info' onClick={this.change.bind(this)} isPrimary={true} style={{ textTransform: 'None', width: 140, textAlign: 'center' }}>Load 100K Points</ButtonComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: '30%' }}>
                                        <div>Time Taken</div>
                                    </td>
                                    <td style={{ width: '70%' }}>
                                        <div>
                                            <span id="performanceTime">0ms</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<Performance />, document.getElementById('sample'));