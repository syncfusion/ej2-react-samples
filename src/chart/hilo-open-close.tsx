/**
 * Sample for Hilo Open Close Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, ILoadedEventArgs, RangeNavigatorComponent,IAxisLabelRenderEventArgs,
    IRangeLoadedEventArgs, PeriodSelector, IChangedEventArgs
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { chartData } from './stock-chart-data';
import { Browser } from '@syncfusion/ej2-base';
import { getElement } from "@syncfusion/ej2-svg-base/src/tooltip/helper";

export let zoomFactor : number;
export let zoomPosition :number;

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
    }`;

export class HiloOpenClose extends SampleBase<{}, {}> {
    private chart1: ChartComponent;
    private rangenavigator1: RangeNavigatorComponent;
    private isChart: boolean;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                        <div id="title"> AAPL Historical</div>
                </div>
                <div className="row">
                <RangeNavigatorComponent id='rangenavigator' 
                        ref={rangenavigator => this.rangenavigator1 = rangenavigator}
                        style={{ textAlign: "center" }}
                        valueType='DateTime'
                        width={Browser.isDevice ? '100%' : '80%'}
                        xName='x' yName='Close'
                        disableRangeSelector={true}
                        dataSource={chartData}
                        periodSelectorSettings={{
                            position:'Top',
                            periods: [
                                { text: '1M', interval: 1, intervalType: 'Months' },
                                { text: '3M', interval: 2, intervalType: 'Months' },
                                { text: '2Q', interval: 2, intervalType: 'Quarter' },
                                { text: '1Y', interval: 1, intervalType: 'Years' },
                                { text: '2Y', interval: 2, intervalType: 'Years', selected: true },
                                { text: 'YTD' },
                                { text: 'All' }]
                        }}
                        load={this.rangeLoad.bind(this)}
                        loaded={this.rangeLoaded.bind(this)}
                        changed={this.changed.bind(this)}>
                    <Inject services={[DateTime, PeriodSelector]}/>
                    </RangeNavigatorComponent>
                </div>
                <div className="row">
                    <ChartComponent id='charts' load={this.load.bind(this)} 
                        style={{ textAlign: "center" }}
                        ref={chart => this.chart1 = chart}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Price',
							rangePadding: 'None',
                            labelFormat: 'n0',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        axisLabelRender={this.axisLabelRender.bind(this)}
                        width={Browser.isDevice ? '100%' : '80%'}
                        legendSettings={{ visible: false }}
                        crosshair={{ enable: true, lineType: 'Vertical',  line: { width: 0 }}}>
                        <Inject services={[HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective type='HiloOpenClose'
                                dataSource={chartData} animation={{ enable: true }}
                                bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                xName='x' low='low' high='high' open='open' close='close' name='Apple Inc'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the AAPL historical data with default HILO Open Close series in the chart.
                Tooltip and crosshair shows the information about the data and period.
           </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Hilo Open Close type charts. Hilo Open Close chart are used to represent the price movements in stock. You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use HiloOpenClose series, we need to inject
                       <code>HiloOpenCloseSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the column series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    }
   
    public load(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        this.isChart = true;
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
    public rangeLoaded(args: IRangeLoadedEventArgs): void {
        let element: Element = getElement('rangenavigator_Secondary_Element');
        if (!Browser.isDevice) {
            (element as HTMLElement).style.transform = 'translate(13%)';
        }
    }
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.title === 'Price') {
            args.text = '$' + args.text;
        }
    }
    public rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
        args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
    };
    public changed(args: IChangedEventArgs): void {
        if(this.chart1 && this.isChart){
                let filterData: Object[] = chartData.filter((data: object) => {
                    /* tslint:disable:no-string-literal */
                    return (((data as any).x).getTime() >= (args.start) && ((data as any).x).getTime() <= (args.end));
                });
                this.chart1.series[0].animation.enable = false; 
                this.chart1.series[0].dataSource = filterData;
                this.chart1.refresh();
            }
    };
}
