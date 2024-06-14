/**
 * Sample for DateTime Axis Range Navigator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    RangeNavigatorComponent, ChartTheme, IChangedEventArgs, AreaSeries, DateTime, Crosshair, Inject,
    SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, IRangeLoadedEventArgs, RangeTooltip,
    RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, ChartComponent, 
    ChartAnnotation, IAxisLabelRenderEventArgs,SplineSeries, Tooltip, Legend
} from '@syncfusion/ej2-react-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { stockData } from './stock-data';
import { SampleBase } from '../common/sample-base';
import { getElement } from '@syncfusion/ej2-svg-base/src/tooltip/helper';


export let zoomFactor : number;
export let zoomPosition :number;
export let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark'];
export let borderColor: string[] = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#614570', '#8AB113', '#6355C7', '#4EAAFF'];
export let regionColor: string[] = ['rgba(38, 46, 11, 0.3)', 'rgba(94, 203, 155, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(97, 69, 112, 0.3)', 'rgba(138, 177, 19, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)'];

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #days {
        font-size: 15px;
        font-style: normal;
        font-family: "Segoe UI";
        font-weight: 500;
        text-anchor: middle;
        transform: none;
        opacity: 1;
    }
    #control-container {
        padding: 0px !important;
    }

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
        stop-opacity: 0.9;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0.3;
    }
    `;

export class DateTimeAxis extends SampleBase<{}, {}> {
 private chart1: ChartComponent;
 private rangenavigator1: RangeNavigatorComponent;
 private chartRendered: boolean;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row" style={{ textAlign: "center" }}>
                        <div id="days">EUR Exchange Rate from USD</div>
                    </div>
                    <div className="row">
                        <RangeNavigatorComponent id='rangenavigator'
                            ref={rangenavigator => this.rangenavigator1 = rangenavigator}
                            style={{ textAlign: "center" }}
                            labelPosition='Outside'
                            valueType='DateTime'
                            majorTickLines={{
                                width: 0
                            }}
    
                            tooltip={{ enable: true, format: 'yyyy/MM/dd', displayMode: 'Always' }}
                            value={[new Date('2011-01-01'), new Date('2013-12-31')]}
                            width={Browser.isDevice ? '100%' : '80%'}
                            load={this.rangeLoad.bind(this)}
                            changed={this.changed.bind(this)} >
                            <Inject services={[AreaSeries, DateTime, RangeTooltip]} />
                            <RangenavigatorSeriesCollectionDirective>
                                <RangenavigatorSeriesDirective dataSource={stockData} xName='x' yName='y'
                                    type='Area' width={2} animation={{ enable: false }} border={{ width: 2 }}>
                                </RangenavigatorSeriesDirective>
                            </RangenavigatorSeriesCollectionDirective>
                        </RangeNavigatorComponent>
                    </div>
                    <div className="row">
                        <ChartComponent id='charts'
                            ref={chart => this.chart1 = chart}
                            style={{ textAlign: "center" }}
                            primaryXAxis={{
                                valueType: 'DateTime',
                                edgeLabelPlacement: 'Shift',
                                majorGridLines: { width: 0 }
                            }}
                            primaryYAxis={{
                                labelFormat: 'n1',
                                minimum: 0.6,
                                maximum: 1,
                                interval: 0.1,
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 }
                            }}
                            width={Browser.isDevice ? '100%' : '80%'}
                            legendSettings={{ visible: false }}
                            load={this.chartLoad.bind(this)}
                            height='350'
                            chartArea={{ border: { width: 0 } }}
                            tooltip={{
                                enable: true, shared: true
                            }}
                            crosshair={{
                                enable: false,
                                lineType: 'None'
                            }}>
                            <Inject services={[Crosshair, DateTime, SplineSeries, Tooltip, ChartAnnotation, Legend]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective name='Rate' type='Spline' dataSource={stockData} xName='x' yName='y' width={2}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
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
                            <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
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
                        This sample visualizes rendering of date-time in the range navigator with exchange rate analysis of EUR to USD.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Date-time data is used in this sample, and the selected range values are showed with tooltip.
                        Date-time axis uses date-time scale and displays date-time values as axis labels.
                        To render date-time axis, set the <code>valueType</code> to <code>DateTime</code>.
                        Format of the axis label will be calculated based on the intervalType of the range navigator.
                        You can also directly set the format using the labelFormat property.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the
                        <code>AreaSeries</code> module using
                        <code>RangeNavigator.Inject(AreaSeries)</code> method. To use date time axis, inject the
                        <code>DateTime</code> module using
                        <code>RangeNavigator.Inject(DateTime)</code> method.
                    </p>
                </div>
            </div>
        )
    }
    public changed(args: IChangedEventArgs): void {
     if (this.chart1 && this.chartRendered) {
          this.chart1.primaryXAxis.zoomFactor = args.zoomFactor;
          this.chart1.primaryXAxis.zoomPosition = args.zoomPosition;
          this.chart1.dataBind();
     } else {
        zoomFactor =args.zoomFactor;
        zoomPosition = args.zoomPosition;
     }
    };
    public labelRender(args:IAxisLabelRenderEventArgs):void{
        if (args.axis.name === 'primaryYAxis') {
            args.text = '€' + args.text;
        }
    }
     public chartLoad(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        this.chartRendered = true;
    };
    public rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        let rangeTheme: string= args.rangeNavigator.theme;
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(rangeTheme.toLowerCase())];
    };
}