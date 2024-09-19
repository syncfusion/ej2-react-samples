/**
 * Sample for Logarithmic Axis Range Navigator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Inject, ChartComponent, Logarithmic, ChartTheme, IChangedEventArgs, ILoadedEventArgs, StepAreaSeries,
    StepLineSeries, SeriesCollectionDirective, SeriesDirective, IRangeLoadedEventArgs, Tooltip, Crosshair,
    RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective,
    RangeTooltip, ILabelRenderEventsArgs, IRangeTooltipRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

export let zoomFactor: number;
export let zoomPosition: number;
export let data: Object[] = [];
export let max: number = 100;
for (let i: number = 0; i < 100; i++) {
    data.push({
        x: Math.pow(10, i * 0.1),
        y: Math.floor(Math.random() * (80 - 30 + 1)) + 30
    });
}
export let themes: string[] = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark'];
export let borderColor : string[] = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6','#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449'];
export let regionColor: string[] = ['rgba(99, 85, 199, 0.3)', 'rgba(143, 128, 244, 0.3)', 'rgba(90, 97, 246, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(0, 189, 174, 0.3)',
    'rgba(158, 203, 8, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(161, 110, 229, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(68, 114, 196, 0.3)', 'rgba(121, 236, 228, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(26, 201, 230, 0.3)', 'rgba(99, 85, 199, 0.3)', 'rgba(78, 170, 255, 0.3)', 'rgba(98, 0, 238, 0.3)', 'rgba(155, 180, 73, 0.3)', 'rgba(155, 180, 73, 0.3)'];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px;
     }
     #title{
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
 
     #bootstrap5-dark-gradient-chart stop {
         stop-color: #8F80F4;
     }
 
     #fluent-gradient-chart stop {
         stop-color: #1AC9E6;
     }
 
     #fluent-dark-gradient-chart stop {
         stop-color: #1AC9E6;
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
 
     .chart-gradient stop[offset="0"] {
         stop-opacity: 0.9;
     }
 
     .chart-gradient stop[offset="1"] {
         stop-opacity: 0.3;
     }
     `;
function LogarithmicAxis() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let chart1: ChartComponent;
    let rangenavigator1: RangeNavigatorComponent;

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                    <div id="title">Inflation vs Goods Consumers</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' ref={rangenavigator => rangenavigator1 = rangenavigator}
                        style={{ textAlign: "center" }}
                        labelPosition='Outside'
                        valueType='Logarithmic'
                        tooltip={{ enable: true }}
                        interval={1}
                        value={[4, 6]}
                        labelIntersectAction='None'
                        width={Browser.isDevice ? '100%' : '80%'}
                        load={rangeLoad.bind(this)}
                        labelRender={renderLabel.bind(this)}
                        tooltipRender={renderTooltip.bind(this)}
                        changed={changed.bind(this)}>
                        <Inject services={[StepLineSeries, Logarithmic, RangeTooltip]} />
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='x' yName='y'
                                type='StepLine' width={2}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                </div>
                <div className="row">
                    <ChartComponent id='charts'
                        ref={chart => chart1 = chart}
                        style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'Logarithmic',
                            crosshairTooltip: { enable: false },
                            interval: 1,
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 },
                            title: 'Numbers of Goods Consumers'
                        }}
                        primaryYAxis={{
                            minimum: 0, maximum: 100,
                            title: 'Inflation',
                            labelFormat: '{value}%',
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 }
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        height='350'
                        load={chartLoad.bind(this)}
                        chartArea={{ border: { width: 0 } }}
                        crosshair={{
                            enable: false,
                            lineType: 'Vertical'
                        }}>
                        <Inject services={[StepAreaSeries, Logarithmic, Tooltip, Crosshair]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' border={{ width: 2 }}
                                type='StepArea' animation={{ enable: false }} marker={{ visible: true }} width={2}>
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
                        <linearGradient id="fluent2-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <div id="action-description">
                    <p>
                        This sample demonstrates rendering logarithmic axis in the range navigator.
                    </p>
                </div>
                <div id="description">
                    <p>
                        Logarithmic axis uses logarithmic scale and it is very useful in visualizing when the data has values with both lower order of magnitude (eg: 10^-6) and higher order of magnitude (eg: 10^6).
                        To render Logarithmic axis, set <code>valueType</code> to <code>Logarithmic</code>.
                        Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed.
                    </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        The range navigator component features are segregated into individual feature-wise modules. To use logarithmic axis, inject the  <code>Logarithmic</code> module using the <code>RangeNavigator.Inject(Logarithmic)</code> method.
                    </p>
                </div>
            </div>
        </div>
    )

    function changed(args: IChangedEventArgs): void {
        if (chart1) {
            chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            chart1.dataBind();
        } else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    };

    function chartLoad(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        args.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
    };
    function rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.width = 2;
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
    };

    function renderLabel(args: ILabelRenderEventsArgs): void {
        args.text = (+args.text).toExponential().toLocaleUpperCase();
    };
    function renderTooltip(args: IRangeTooltipRenderEventArgs): void {
        args.text = [(+(+args.text).toFixed(1)).toExponential(1).toString().toLocaleUpperCase()];
    };
}
export default LogarithmicAxis;