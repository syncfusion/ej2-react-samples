/**
 * Sample for Range Navigator Period Selector with Stock Chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Inject, ChartComponent, ColumnSeries,
    CandleSeries, ChartTheme, IChangedEventArgs, ILoadedEventArgs, Tooltip, RangeNavigatorComponent,
    MacdIndicator, SeriesCollectionDirective, PeriodSelector, AnnotationsDirective,
    SeriesDirective, IRangeLoadedEventArgs, Crosshair, ChartAnnotation, DateTime,
    AnnotationDirective, IMouseEventArgs, ITooltipRenderEventArgs, RowsDirective, Zoom,
    RowDirective, AxesDirective, AxisDirective, IndicatorsDirective, IndicatorDirective,
    TmaIndicator, Points, VisibleLabels, IPointRenderEventArgs,
    IAxisLabelRenderEventArgs, IAxisRangeCalculatedEventArgs, LineSeries, StripLine
} from '@syncfusion/ej2-react-charts';
import { withInBounds } from '@syncfusion/ej2-charts/src/common/utils/helper';
import { Browser, remove } from '@syncfusion/ej2-base'
import { SampleBase } from '../common/sample-base';
import { getElement } from '@syncfusion/ej2-svg-base/src/tooltip/helper';
import { chartData } from './stock-chart-data';

export let zoomFactor : number;
export let zoomPosition :number;
export let index: number = 0;
export let chartDatas: Object[] = [];
export let pointColors: string[] = [];
export let getContent: Function = (value: string): string => {
    let text: string[] = value.split('<br/>'); 
    let html: string = '<table><thead>' + text[0] + '</thead>';
    for (let i: number = 1; i < text.length; i++) {
        let value: string[] = text[i].split(':');
        if (i === text.length - 1) {
            html += '<tr><td style="text-align:left;opacity:0.5">' + value[0] + '</td><td style="padding-left: 5px;">' +
                Math.round(((+value[1].split('</b>')[0].split('<b>')[1]) / 10000000)) + 'B';
        } else {

            html += '<tr><td style="text-align:left;opacity:0.5">' + value[0] + '</td><td style="padding-left: 5px;">$' +
                (+value[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
        }
    }
    return html;
};
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px;
    }
    #chart_tooltip {
        opacity: 0;
    }
    #chart_HorizontalLine, #chart_VerticalLine {
        stroke-dasharray: 2
    }
    #stockRange{
        transform:translateX(12%);font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:14px;
    }
    #close{
        font-size:10px
    }
    #value{
        float: left;
    }
    #inc{
        float: left; color: green;
    }
    `;
export function annotationTemplate(props):JSX.Element {
    return(<div id="annotation"></div>)
}
export class StockChart extends SampleBase<{}, {}> {
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
                <div className="row">
                    <div id="stockRange">
                        <div id="title">AAPL 2012-2015</div>
                        <div id="close">
                            <div id="value">159.67</div>
                            <div id="inc">&nbsp;&nbsp;&nbsp;+11.49 (+1.06%)</div>
                        </div>
                    </div>
                </div>
                 <div className="row">
                 <RangeNavigatorComponent id='rangenavigator' 
                        ref={rangenavigator => this.rangenavigator1 = rangenavigator}
                        style={{ textAlign: "center" }}
                        valueType='DateTime'
                        disableRangeSelector={true}
                        dataSource={chartData} xName='x' yName='close'
                        width={Browser.isDevice ? '100%' : '75%'}
                        periodSelectorSettings={{
                            position:'Top',
                            periods: [
                                { text: '1M', interval: 1, intervalType: 'Months' }, 
                                { text: '3M', interval: 3, intervalType: 'Months' },
                                { text: '6M', interval: 6, intervalType: 'Months' }, { text: 'YTD' },
                                { text: '1Y', interval: 1, intervalType: 'Years' },
                                { text: '2Y', interval: 2, intervalType: 'Years', selected: true }, { text: 'All' }
                            ]
                        }}
                        loaded={this.rangeLoaded.bind(this)}
                        load={this.rangeLoad.bind(this)}
                        changed={this.changed.bind(this)}>
                    <Inject services={[DateTime, PeriodSelector]}/>
                    </RangeNavigatorComponent>
                    </div>
                     <div className="row">
                    <ChartComponent id='chart' 
                        ref={chart => this.chart1 = chart}
                        style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            majorGridLines: { width: 0 },
                            crosshairTooltip: { enable: true }
                        }}
                        margin={{ top: 0 }}
                        primaryYAxis={{
                            title: 'Price',
                            crosshairTooltip: { enable: true },
                            labelFormat: 'n0',
                            plotOffset: 25,
                            rangePadding: 'None', majorGridLines: { width: 0 },
                            rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
                        }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        zoomSettings={{enableMouseWheelZooming: true, mode:'X', toolbarItems:[] }}
                        load={this.chartLoad.bind(this)}
                        loaded={this.chartLoaded.bind(this)}
                        axisLabelRender={this.labelRender.bind(this)}
                        axisRangeCalculated={this.rangeCalculated.bind(this)}
                        tooltipRender={this.chartTooltip.bind(this)}
                        pointRender={this.renderPoint.bind(this)}
                        chartMouseLeave={this.mouseLeave.bind(this)}
                        chartMouseMove={this.mouseMove.bind(this)}
                        chartArea={{ border: { width: 1, color: 'whitesmoke' } }}
                        tooltip={{ enable: true, shared: true,
                            format: '${point.x}<br/>High : <b>${point.high}</b><br/>Low :' +
                                ' <b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>'
                         }}
                        legendSettings={{ visible: false }}
                        height='350'
                        crosshair={{
                            enable: true, lineType: 'Both'
                        }}>
                        <Inject services={[CandleSeries, DateTime, Crosshair, TmaIndicator, MacdIndicator,
                            ChartAnnotation, Tooltip, ColumnSeries, Zoom, LineSeries, StripLine]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartDatas} xName='x' yName='y' width={2}
                            type='Candle' animation={{ enable: true }}
                            name='Apple Inc' low='low' high='high' volume='volume'
                            open='open' close='close' bearFillColor='#2ecd71' bullFillColor='#e74c3d'>
                            </SeriesDirective>
                            <SeriesDirective dataSource={chartDatas} xName='x' yName='volume'
                            type='Column' yAxisName='secondary' animation={{ enable: true }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective
                            content={annotationTemplate} 
                            x='10%' y='20%' coordinateUnits='Pixel' region='Chart'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                        <RowsDirective>
                            <RowDirective height='30%'></RowDirective>
                            <RowDirective height='70%'></RowDirective>
                        </RowsDirective>
                        <AxesDirective>
                            <AxisDirective
                            name='secondary'
                            opposedPosition={true} rowIndex={0}
                            majorGridLines={{ width: 0 }} lineStyle={{ width: 0 }}
                            rangePadding='None'
                            majorTickLines={{ width: 0 }}>
                            </AxisDirective>
                        </AxesDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective
                            type='Tma'
                            period={3}
                            fastPeriod={8}
                            slowPeriod={5}
                            seriesName= 'Apple Inc'
                            macdType='Both'
                            width={2}
                            macdPositiveColor='#2ecd71'
                            macdNegativeColor='#e74c3d'
                            fill='#6063ff'
                            ></IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                    </div>
                    <div id="action-description">
                        <p>
                        This sample illustrates a stock price for AAPL over a period. Period Selector shows the information about the stock values
                        without range navigator.
                        </p>
                    </div>
                    <div id="description">
                        <p>
                        In this example, you can see how to render and configure the period Selector with the financial chart. Tooltip is enabled
                        in this example, to see the tooltip in action, while the selected range is changed.
                        </p>
                        <br></br>
                            <p><b>Injecting Module</b></p>
                            <p>
                            Range Navigator component features are segregated into individual feature-wise modules. To use period selector,
                            <code>PeriodSelector</code> module using <code>RangeNavigator.Inject(PeriodSelector)</code> method.
                            </p>
                    </div>
            </div>
        </div>
        )
    }
    public changed(args: IChangedEventArgs): void {
        let data: Object[] = chartData.filter((data: object) => {
            /* tslint:disable:no-string-literal */
            return (((data as Points).x) >= (args.start as Date) &&
            ((data as Points).x) <= (args.end as Date));
        });
        chartDatas = data;
        if(this.chart1 && this.chartRendered){
        this.chart1.series[0].animation.enable = false; 
        this.chart1.primaryXAxis.zoomPosition = 0;
        this.chart1.primaryXAxis.zoomFactor = 1; 
        this.chart1.series[1].animation.enable = false;
        this.chart1.primaryXAxis.stripLines = [{ visible: true }];
        this.chart1.indicators[0].animation.enable = false; 
        pointColors = [];
        this.chart1.series[0].dataSource = data;
        this.chart1.series[1].dataSource = data;
        this.chart1.refresh(); 
        this.chart1.setAnnotationValue(0, '<div id="annotation"></div>');
    } else {
        zoomFactor =args.zoomFactor;
        zoomPosition = args.zoomPosition;
     }
    };
    public chartTooltip(args: ITooltipRenderEventArgs):void{
        if (args.series.type === 'Candle') {
            this.chart1.setAnnotationValue(0, '<div id="annotation" style="line-height: 18px;' +
            ' font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
            ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px;' +
            ' border-radius: 3px">' + (getContent(args.text) + '</table>') + '</div>');
        }
        args.text = '';
    };
    public mouseMove(args: IMouseEventArgs):void{
        if (!withInBounds(this.chart1.mouseX, this.chart1.mouseY, this.chart1.chartAxisLayoutPanel.seriesClipRect)) {
            removeSecondaryElement();
        }
    };
    public mouseLeave(args: IMouseEventArgs): void{
        removeSecondaryElement();
    };
     public chartLoad(args: ILoadedEventArgs): void {
        args.chart.series[0].dataSource = chartDatas;
        args.chart.series[1].dataSource = chartDatas;
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)). 
                replace(/-dark/i, "Dark") as ChartTheme;
    };
    public chartLoaded(args: ILoadedEventArgs):void{
        let labels: VisibleLabels[] = (args.chart.axisCollections[0]).visibleLabels;
            let maxValue: number = args.chart.axisCollections[0].visibleRange.max;
            if (args.chart.primaryXAxis.stripLines.length === 1) {
                for (let i: number = 0; i < labels.length; i += 2) {
                    args.chart.primaryXAxis.stripLines.push({
                        start: new Date(labels[i].value), end: labels[i + 1] ? new Date(labels[i + 1].value) : new Date(maxValue),
                        zIndex: 'Behind', border: { width: 0, color: 'transparent' }, rotation: null,
                        opacity: 0.7, textStyle: {}, text: '', color: 'whitesmoke', visible: true
                    });
                }
                args.chart.refresh();
            }
            this.chartRendered = true;
    };
    public labelRender(args: IAxisLabelRenderEventArgs):void{
        if (args.axis.name === 'secondary') {
            args.text = Math.round((args.value / 10000000)) + 'B';
        } else if (args.axis.orientation === 'Vertical') {
            args.text = '$' + Math.round(args.value);
        }
    };
    public rangeCalculated(args:IAxisRangeCalculatedEventArgs):void{
        if(this.chart1 && this.chartRendered){
        this.chart1.setAnnotationValue(0, '<div></div>');
        }
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
            (element as HTMLElement).style.transform = 'translate(14%)';
        }
        if(this.rangenavigator1){
        let value: number = this.rangenavigator1.svgObject.getBoundingClientRect().left - this.rangenavigator1.element.getBoundingClientRect().left;
        let element1: Element = getElement('stockRange');
        (element1 as HTMLElement).style.transform = 'translateX(' + (value - 10) + 'px)';
        }
    }
    public rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
                 replace(/-dark/i, "Dark") as ChartTheme;
        args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
    };
}
function removeSecondaryElement(){
    setTimeout(function () {
        if (getElement("annotation")) {
            remove(getElement("annotation"));
        }
    }, 2000);
}