/**
 * Sample for RTL Range Navigator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ILoadedEventArgs, RangeTooltip, Tooltip,
    IChangedEventArgs, AreaSeries, DateTime, ChartTheme, Inject, IRangeLoadedEventArgs,
	RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { axesData } from './stock-data';
import { SampleBase } from '../common/sample-base';

let data: Object[] = axesData;
export let zoomFactor : number;
export let zoomPosition :number;
export let themes: string[] = ['Material' , 'Fabric' , 'Bootstrap' , 'Highcontrast']
export let borderColor: string[] = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
export let regionColor: string[] = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
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

    #container {
        transform: translate(0, 25%);
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

    .chart-gradient stop[offset="0"] {
        stop-opacity: 0.9;
    }

    .chart-gradient stop[offset="1"] {
        stop-opacity: 0.3;
    }
    `;
export class RTL extends SampleBase<{}, {}> {
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
                        <div id="title">Inflation - Consumer Price</div>
                </div>
                 <div className="row">
                 <RangeNavigatorComponent id='rangenavigator' ref={rangenavigator => this.rangenavigator1 = rangenavigator}
                        style={{ textAlign: "center" }}
                        height= '120'
                        labelPosition='Outside'
                        tooltip={{enable: true, displayMode: 'Always'}}
                        valueType='DateTime'
                        intervalType='Years'
                        load={this.rangeLoad.bind(this)}
                        changed={this.changed.bind(this)}
                        width={Browser.isDevice ? '100%' : '80%'}
                        enableRtl={true}
                        value={[new Date('2014-01-01'), new Date('2015-12-31')]}>
                    <Inject services={[AreaSeries, DateTime, RangeTooltip]}/>
                    <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='xDate' yName='High' type='Area' width={2}>
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
                            crosshairTooltip: { enable: true },
                            edgeLabelPlacement: 'Shift',
                            isInversed: true,
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                           majorTickLines: { width: 0 }, 
                           lineStyle: { width: 0 },
                            minimum: 82, maximum: 87, interval: 1
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        height='350'
                        load={this.chartLoad.bind(this)}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{
                            enable: true, shared: true,
                            header: '<b>England<b>' , format: '${point.x} : <b>${point.y}<b>'
                        }}>
                        <Inject services={[AreaSeries, DateTime, Tooltip]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} name='England' xName='xDate' yName='High' type='Area' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    </div>
                    <svg style={{ height: '0' }}>
                <defs>
                    <linearGradient id="material-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="fabric-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="bootstrap4-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                    <linearGradient id="highcontrast-gradient-chart" style={{opacity: 0.75}} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0"></stop>
                        <stop offset="1"></stop>
                    </linearGradient>
                </defs>
            </svg>
                    <div id="action-description">
                        <p>
                            This sample illustrates RTL in the range navigator.
                        </p>
                    </div>
                    <div id="description">
                        <p>
                            In this example, you can see how to inverse the axis in range navigator. Here both the X and Y axis are inversed using <code>isInversed</code> property.
                            Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed.
                        </p>
                        <br></br>
                        <p><b>Injecting Module</b></p>
                        <p>
                            The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the
                            <code>AreaSeries</code> module using the
                            <code>RangeNavigator.Inject(AreaSeries)</code> method.
                        </p>
                    </div>
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
     public chartLoad(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
                 replace(/-dark/i, "Dark") as ChartTheme;
        let chartTheme: string= args.chart.theme;
        args.chart.series[0].fill = 'url(#' + chartTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = borderColor[themes.indexOf(chartTheme)];
        args.chart.series[0].border.width = 2;
        this.chartRendered = true;
    };
     // custom code start
    public rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
                 replace(/-dark/i, "Dark") as ChartTheme;
        let rangeTheme: string= args.rangeNavigator.theme;
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + rangeTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(rangeTheme)];
        args.rangeNavigator.series[0].border.width = 2;
    };
     // custom code end
}
