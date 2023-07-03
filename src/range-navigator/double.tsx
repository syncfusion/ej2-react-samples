/**
 * Sample for Numeric Axis Range Navigator
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    Inject, ChartComponent, IChangedEventArgs, ILoadedEventArgs, ChartTheme, RangeTooltip,
    SplineSeries, Crosshair, SeriesCollectionDirective, SeriesDirective, IRangeLoadedEventArgs, Tooltip,
    RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective,
    ChartAnnotationSettingsModel, getSeriesColor, ChartAnnotation, IRangeTooltipRenderEventArgs, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { sl, aus } from './double-data';

export let zoomFactor: number;
export let zoomPosition: number;
export let chartAnnotation: ChartAnnotationSettingsModel[] = [];
chartAnnotation.push({ content: '<div id="exchangeRate"></div>', coordinateUnits: 'Pixel', region: 'Chart', x: '85%', y: '15%' });

export let selectedTheme: string = location.hash.split('/')[1];
selectedTheme = selectedTheme ? selectedTheme : 'Material';
export let theme:  ChartTheme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
export let backgroundColor: string = 'white';
getAnnotation(aus, getSeriesColor(theme)[0]);
getAnnotation(sl, getSeriesColor(theme)[1]);

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
    `;
export class NumericAxis extends SampleBase<{}, {}> {
    private chart1: ChartComponent;
    private rangenavigator1: RangeNavigatorComponent;
    
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row" style={{ textAlign: "center" }}>
                        <div id="title">Score Comparision AUS vs SL</div>
                    </div>
                    <div className="row">
                        <RangeNavigatorComponent id='double' ref={rangenavigator => this.rangenavigator1 = rangenavigator} style={{ textAlign: "center" }}
                            labelPosition='Outside'
                            tooltip={{ enable: true }}
                            load={this.rangeLoad.bind(this)}
                            changed={this.changed.bind(this)}
                            width={Browser.isDevice ? '100%' : '80%'}
                            tooltipRender={this.renderTooltip.bind(this)}
                            value={[31,50]}>
                            <Inject services={[RangeTooltip]} />
                            <RangenavigatorSeriesCollectionDirective>
                                <RangenavigatorSeriesDirective dataSource={aus} xName='x' yName='y'>
                                </RangenavigatorSeriesDirective>
                                <RangenavigatorSeriesDirective dataSource={sl} xName='x' yName='y'>
                                </RangenavigatorSeriesDirective>
                            </RangenavigatorSeriesCollectionDirective>
                        </RangeNavigatorComponent>
                    </div>
                    <div className="row">
                        <ChartComponent id='charts' 
                            ref={chart => this.chart1 = chart} 
                            style={{ textAlign: "center" }}
                            primaryXAxis={{
                                title: 'Overs',
                                edgeLabelPlacement: 'Shift',
                                majorGridLines: { width: 0 },
                                labelFormat: 'n1'
                            }}
                            primaryYAxis={{
                                title: 'Runs', 
                                minimum: 0,
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 }
                            }}
                            width={Browser.isDevice ? '100%' : '80%'}
                            height='350'
                            theme={theme}
                            annotations={chartAnnotation}
                            legendSettings={{ visible: false }}
                            load={this.chartLoad.bind(this)}
                            loaded={this.chartLoaded.bind(this)}
                            axisLabelRender={this.labelRender.bind(this)}
                            chartArea={{ border: { width: 0 } }}>
                            <Inject services={[SplineSeries, Crosshair, Tooltip, ChartAnnotation]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={aus} xName='x' yName='y' name='AUS'
                                 type='Spline' width={2} animation={{ enable: false }}>
                                </SeriesDirective>
                                <SeriesDirective dataSource={sl} xName='x' yName='y' name='SL'
                                 type='Spline' width={2} animation={{ enable: false }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div id="action-description">
                        <p>
                            This sample depicts the cricket match data between two countries with the help of numeric axis in range navigator.
                        </p>
                    </div>
                    <div id="description">
                        <p>
                        Numeric axis is used to plot numeric data in range navigator. To render numeric axis, set <code>valueType</code> to <code>Double</code>,
                        Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    public changed(args: IChangedEventArgs): void {
        if (this.chart1) {
            this.chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chart1.dataBind();
        } else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    };
    public chartLoad(args: ILoadedEventArgs): void {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let series1: string = getSeriesColor(theme)[0];
        let series2: string = getSeriesColor(theme)[1];
        let html: string = '<table>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series1 + '; background: ' + series1 + ';"></div></td><td style="padding-left:10px;">' + ' Australia' + '</td>';
        html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series2 + '; background: ' + series2 + ';"></div></td><td style="padding-left:10px;">' + ' Sri Lanka' + '</td>';
        html += '</table>';
        args.chart.annotations[0].content = '<div id="exchangeRate" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
        ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' + html + '</div>';
    };
    public labelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.axis.orientation === 'Horizontal') {
            let value: number = Math.abs(Number(args.text));
            args.text = String(value);
        }
    }
    public chartLoaded(args: ILoadedEventArgs):void{
                let series1: string = args.chart.visibleSeries[0].interior;
                let series2: string = args.chart.visibleSeries[1].interior;
                let html: string = '<table>';
                html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series1 + '; background: ' + series1 + ';"></div></td><td style="padding-left:10px;">' + ' Australia' + '</td>';
                html += '<tr><td><div style="width:10px; height: 10px; border: 2px solid ' + series2 + '; background: ' + series2 + ';"></div></td><td style="padding-left:10px;">' + ' Sri Lanka' + '</td>';
                html += '</table>';
                if(this.chart1){
                this.chart1.setAnnotationValue(0, '<div id="exchangeRate" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                    ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' +
                    html +
                    '</div>');
                }
    };
    public rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast') as ChartTheme;
    };
        
    public renderTooltip(args:IRangeTooltipRenderEventArgs):void{
        let text: number = parseFloat(args.text[0]);
        text = Math.round(text);
        let text1: string = text.toString();
        args.text[0] = text1;
    }
}
function getAnnotation(args: object[], color: string) {
    for (let i: number = 0; i < args.length; i++) {
        if((args[i] as any).isWicket){
            chartAnnotation.push({
                content: '<div id= "wicket" style="width: 20px; height:20px; border-radius: 5px;' +
                'background: ' + backgroundColor + '; border: 2px solid ' + color + '; color:' + color + '">W</div>',
               x: (args[i] as any).x,
               y: (args[i] as any).y,
                coordinateUnits: 'Point'
            });
        }
    }
}
