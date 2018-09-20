/**
 * Sample for Candle Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    RangeNavigatorComponent, ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, 
    CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries, IPointRenderEventArgs,
    Crosshair, StripLine, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs, ChartTheme, PeriodSelector, 
    IRangeLoadedEventArgs, IChangedEventArgs, RowDirective, RowsDirective, SeriesDirective, Inject
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { chartData } from './stock-chart-data';
import { Browser } from '@syncfusion/ej2-base';
import { getElement } from "@syncfusion/ej2-svg-base/src/tooltip/helper";

export let zoomFactor : number;
export let zoomPosition :number;
export let pointColors: string[] = [];

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
    `;
    /**
     * Candle sample
     */
  
export class Candle extends SampleBase<{}, {}> {
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
                                { text: 'All' }
                                            ]
                        }}
                        load={this.rangeLoad.bind(this)}
                        loaded={this.rangeLoaded.bind(this)}
                        changed={this.changed.bind(this)}>
                    <Inject services={[DateTime, PeriodSelector]}/>
                    </RangeNavigatorComponent>
                </div>
                <div className="row">
                    <ChartComponent id='charts' style={{textAlign:"center"}}
                        ref={chart => this.chart1 = chart}
                        load={this.load.bind(this)}
                        primaryXAxis={{
                            valueType: 'DateTime',
                           crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            title: 'Volume',
							rangePadding: 'None',
                            valueType: 'Logarithmic',
                            opposedPosition: true,
                            majorGridLines: { width: 1 },
                            lineStyle: { width: 0 },
                            stripLines: [
                                {
                                    end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                                    opacity: 0.03, zIndex: 'Behind'
                                }]
                        }}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        width= { Browser.isDevice ? '100%' : '80%'}
                        crosshair={{ enable: true, lineType: 'Vertical' }}
                        pointRender={this.renderPoint.bind(this)}
                        axisLabelRender={this.axisLabelRender.bind(this)}
                        tooltipRender={this.tooltipLabelRender.bind(this)}
                        chartArea={{ border: { width: 0 } }}>
                        <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair]} />
                        <RowsDirective>
                            <RowDirective height={'30%'}>
                            </RowDirective>
                            <RowDirective height={'70%'}>
                            </RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective name='secondary' opposedPosition={true} rowIndex={1} majorGridLines={{ width: 1 }}
                                labelFormat='n0' title='Price' plotOffset={30} lineStyle={{ width: 0 }}>
                            </AxisDirective>
                        </AxesDirective>
                        <SeriesCollectionDirective>
                        <SeriesDirective type='Candle' yAxisName='secondary' bearFillColor='#2ecd71' bullFillColor='#e74c3d'
                                dataSource={chartData} animation={{ enable: true }}
                                xName='x' low='low' high='high' open='open' close='close' name='Apple Inc'
                                volume='volume'>
                            </SeriesDirective>
                            <SeriesDirective type='Column'
                                dataSource={chartData} animation={{ enable: true }} xName='x' yName='volume'
                                name='Volume'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
    <p>
        This sample visualizes the AAPL historical data with default candle series in the chart. Tooltip and crosshair shows the information about the data and period.
   </p>
</div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the Candle type charts. Candle type chart is used to represent the price movements in stock.
                       You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use Candle series, we need to inject
                       <code>CandleSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the Candle series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    public load(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
        this.isChart = true;
    };
    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.name === 'primaryYAxis') {
            args.text = this.getLabelText(+args.text);
        }
        if (args.axis.name === 'secondary') {
            args.text = '$' + args.text;
        }

    }
    public tooltipLabelRender(args: ITooltipRenderEventArgs): void {
        if (!args.series.index) {
            args.text = 'Volume : <b>' +
                this.getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
        }
    }
    public getLabelText: Function = (value: number): string => {
        return (((value) / 1000000000)).toFixed(1) + 'bn';
    };
    public renderPoint(args:IPointRenderEventArgs):void{
        if (args.series.type === 'Candle') { 
            pointColors.push(args.fill);
        } else {
            args.fill = pointColors[args.point.index];
        }
    };
    public rangeLoaded(args: IRangeLoadedEventArgs): void {
        let element: Element = getElement('rangenavigator_Secondary_Element');
        if (!Browser.isDevice) {
            (element as HTMLElement).style.transform = 'translate(13%)';
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
        this.chart1.primaryXAxis.zoomFactor = 1;
        this.chart1.primaryXAxis.zoomPosition = 0;
            let filterData: Object[] = chartData.filter((data: object) => {
                /* tslint:disable:no-string-literal */
                return (((data as any).x).getTime() >= (args.start) && ((data as any).x).getTime() <= (args.end));
            });
            pointColors = [];
            this.chart1.series[0].animation.enable = false; 
            this.chart1.series[0].dataSource = filterData;
            this.chart1.series[1].animation.enable = false; 
            this.chart1.series[1].dataSource = filterData; 
            this.chart1.refresh();
        }
    };
}
