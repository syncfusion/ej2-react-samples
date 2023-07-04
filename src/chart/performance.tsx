/**
 * Sample for Chart performance
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PropertyPane } from '../common/property-pane';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    LineSeries, Legend, ILoadedEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
         #material-gradient-chart stop {
             stop-color: #00bdae;
         }
 
         #fabric-gradient-chart stop {
             stop-color: #4472c4;
         }
 
         #bootstrap-gradient-chart stop {
             stop-color: #a16ee5;
         }
 
         #bootstrap4-gradient-chart stop {
             stop-color: #a16ee5;
         }
 
         #highcontrast-gradient-chart stop {
             stop-color: #79ECE4;
         }
 
         #tailwind-gradient-chart stop {
             stop-color: #5A61F6;
         }
 
         #bootstrap5-gradient-chart stop {
             stop-color: #262E0B;
         }
 
         #material-dark-gradient-chart stop {
             stop-color: #9ECB08;
         }
 
         #fabric-dark-gradient-chart stop {
             stop-color: #4472c4;
         }
 
         #bootstrap-dark-gradient-chart stop {
             stop-color: #a16ee5;
         }
 
         #tailwind-dark-gradient-chart stop {
             stop-color: #8B5CF6;
         }
 
         #bootstrap5-dark-gradient-chart stop {
             stop-color: #5ECB9B;
         }
 
         #fluent-gradient-chart stop {
             stop-color: #614570;
         }
 
         #fluent-dark-gradient-chart stop {
             stop-color: #8AB113;
         }

        #material3-gradient-chart stop {
            stop-color: #6355C7;
        }
    
        #material3-dark-gradient-chart stop {
            stop-color: #4EAAFF;
        }
 
         .chart-gradient stop[offset="0"] {
             stop-opacity: 0.75;
         }
 
         .chart-gradient stop[offset="1"] {
             stop-opacity: 0;
         }
         `;
         let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
         let borderColor: string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#614570', '#8AB113', '#6355C7', '#4EAAFF'];
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
        this.chart.legendSettings.visible = false;
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section '>
                        <ChartComponent id='charts' ref={chart => this.chart = chart} loaded={this.onChartLoad.bind(this)}
                            primaryXAxis={{
                                interval: 1,
                            intervalType: 'Years',
                            valueType: 'DateTime',
                            edgeLabelPlacement:'Shift',
                            title: 'Years',
                            majorGridLines: {width: 0}
                            }}  primaryYAxis={{
                                interval: 2000,
                                minimum: 0,
                                maximum: 12000,
                                title: 'Values',
                                lineStyle: { width: 0 },
                                majorTickLines: { width: 0 }
                            }}     title="Chart with 100k points"  width={Browser.isDevice ? '100%' : '90%'} load={this.load.bind(this)} legendSettings={{ visible: false }}>
                            <Inject services={[LineSeries, Legend]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective name='Series1' type='Line' animation={{ enable: false }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                        <svg style={{ height: '0' }}>
                <defs>
                    <linearGradient id="material-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap4-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap5-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="tailwind-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap5-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fluent-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="material3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                </defs>
            </svg>
                  
                </div>
                <div id="action-description">
                <p>
                This sample demonstrates the performance of EJ2 chart to render 100K points in canvas mode.
            </p>
                </div>
                <div id="description">
                    <p>
                    Chart includes several data rendering optimizations to achieve the best possible performance when plotting large volumes of data as well as handling high frequency real-time data.In this demo, chart is rendered with 100K points in canvas mode.
                    </p>
                </div>
            </div>
        )
    }
}