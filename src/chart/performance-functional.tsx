/**
 * Sample for Chart performance
 */
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, AreaSeries, ILoadedEventArgs, ChartTheme, DateTime, Legend } from '@syncfusion/ej2-react-charts';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
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

    #fluent-gradient-chart stop {
        stop-color: #1AC9E6;
    }
    #fluent-dark-gradient-chart stop {
        stop-color: #1AC9E6;
    }

    #highcontrast-gradient-chart stop {
        stop-color: #79ECE4;
    }

    #tailwind-gradient-chart stop {
        stop-color: #5A61F6;
    }

    #tailwind3-gradient-chart stop {
        stop-color: #2F4074;
    }

    #bootstrap5-gradient-chart stop {
        stop-color: #FD7E14;
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

    #tailwind3-dark-gradient-chart stop {
        stop-color: #8029F1;
    }

    #bootstrap5-dark-gradient-chart stop {
        stop-color: #FD7E14;
    }

    #material3-gradient-chart stop {
        stop-color: #6355C7;
    }

    #material3-dark-gradient-chart stop {
        stop-color: #4EAAFF;
    }

    #fluent2-gradient-chart stop {
        stop-color: #6200EE;
    }

    #fluent2-highcontrast-gradient-chart stop {
        stop-color: #9BB449;
    }

    #fluent2-dark-gradient-chart stop {
        stop-color: #9BB449;
    }   

    .chart-gradient stop[offset="0"] {
        stop-opacity: 0.9;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0.3;
    }
`;
let themes : string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
let borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
const Performance = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let series1: Object[] = [];
        let point1: Object;
        let pts;
        let value = 0;
        for (pts = 0; pts < 100000; pts++) {
            if (pts % 3 == 0) {
                value -= (Math.random() * (100) / 3) * 4;
            }
            else if (pts % 2 == 0) {
                value += (Math.random() * (100) / 3) * 4;
            }
            if (value < 0) {
                value = value * -1;
            }
            if (value >= 12000) {
                value = Math.floor(Math.random() * 11000) + 1000;
            }
            point1 = { x: new Date(2005, 1, 1).setHours(pts), y: value };
            series1.push(point1);
        }
        args.chart.series[0].dataSource = series1;
        args.chart.series[0].xName = 'x';
        args.chart.series[0].yName = 'y';
        let selectedTheme: string = loadChartTheme(args, true);
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
        args.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border = { width: 2, color: borderColor[themes.indexOf(args.chart.theme.toLowerCase())] }
    };
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ intervalType: 'Years', valueType: 'DateTime', edgeLabelPlacement:'Shift', title: 'Years', majorGridLines: {width: 0} }}  primaryYAxis={{ interval: 2000, minimum: 0, maximum: 12000, title: 'Values', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 } }} legendSettings={{ visible: false }} title="Chart with 100k points" width={Browser.isDevice ? '100%' : '75%'} loaded={onChartLoad.bind(this)} load={load.bind(this)} >
                    <Inject services={[AreaSeries,  DateTime, Legend]} />
                    <SeriesCollectionDirective>
                        <SeriesDirective name='Series1' type='Area' />
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
                        <linearGradient id="tailwind3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
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
                        <linearGradient id="fluent2-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-highcontrast-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-dark-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the performance of React Charts rendering 100K data points.</p>
            </div>
            <div id="description">
                <p>Charts includes several data-rendering optimizations to achieve the best possible performance when plotting large volumes of data and handling high-frequency, real-time data. In this demo, an area series is rendered with 100K points.</p>
            </div>            
        </div>        
    )
}
export default Performance;