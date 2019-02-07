/**
 * Sample for Range Navigator Print
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StepLineSeries, ColumnSeries, ChartComponent, SeriesCollectionDirective, SeriesDirective,Tooltip,
    RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, RangeNavigatorComponent,
    IChangedEventArgs, IRangeLoadedEventArgs, ChartTheme, RangeTooltip, Inject, ILoadedEventArgs, Crosshair, DateTime
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { chartData1 } from './stock-data';

export let zoomFactor : number;
export let zoomPosition :number;
export let date1: Date = new Date('2015-01-01');
export let returnValue: Object[] = chartData1.filter(filterValue);
function filterValue(value: any) {
    return value.x <= date1 && value.high < 120;
}

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #btn-control {
        width: 100%;
        text-align: center;
    }

    #rangenavigator {
        padding: 0px !important;
    }
    #days{
        font-family: Segoe UI;font-weight: 500; font-style:normal; font-size:15px;
    }
    .e-play-icon::before {
        content: '\\e813';
    }`;
export class Print extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private rangeInstance: RangeNavigatorComponent;
    private chartRendered: boolean;
    private mode(): void {
        this.chartInstance.print();
        this.rangeInstance.print();
    };
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                <div className='col-md-9'>
                <div className="row" style={{ textAlign: "center" }}>
                    <div id="days">Temperature Variation by Day</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' ref={rangenav => this.rangeInstance = rangenav}
                        style={{ textAlign: "center" }}
                        labelPosition='Outside'
                        valueType='DateTime'
                        tooltip={{enable:true }}
                        value={[new Date(2013, 0, 1), new Date(2014, 0 , 1)]}
                        width={Browser.isDevice ? '100%' : '80%'}
                        load={this.rangeLoad.bind(this)}
                        changed={this.changed.bind(this)}>
                        <Inject services={[StepLineSeries, RangeTooltip, DateTime]} />
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={returnValue} xName='x' yName='high' type='StepLine' width={1}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                    </div>
                <div className="row">
                    <ChartComponent id='charts'  ref={chart => this.chartInstance = chart} 
                      style={{ textAlign: "center" }}
                      primaryXAxis={{ 
                            valueType: 'DateTime', 
                            crosshairTooltip: { enable: false },
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            minimum: 0,
                            maximum: 120,
                            labelFormat: '{value}˚F', 
                            title: 'Temperatue'
                        }}
                        load={this.chartLoad.bind(this)}
                        height='350'
                        width={Browser.isDevice ? '100%' : '80%'}
                        legendSettings={{ visible: false}}
                        tooltip={{
                            enable: true, shared: true
                        }}
                        crosshair={{
                            enable: true,
                            line: {
                                width: 0
                            },
                            lineType: 'Vertical'
                        }}
                        chartArea={{ border: { width: 0 } }}>
                        <Inject services={[ColumnSeries, Crosshair, Tooltip, DateTime]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={returnValue} name='Temperature' xName='x' yName='high' animation={{ enable: false }} type='Column' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                </div>
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div id="btn-control">
                                            <ButtonComponent onClick={this.onClick.bind(this)} iconCss='e-icons e-play-icon' cssClass='e-flat' isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                    This sample illustrates the print feature in the range navigator. 
                    You can print the range navigator directly from the browser by clicking print.
                </p>
                </div>
                <div id="description">
                <p>
                    In this example, you can see how to render and configure the print feature. 
                    The rendered range navigator can be printed directly from the browser by calling the public method print.
                </p>
                <p>
                    More information on the print can be found in this
                    <a target="_blank" href="http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
                </div>
            </div >
        )
    }
    public changed(args: IChangedEventArgs): void {
        if (this.chartInstance && this.chartRendered) {
             this.chartInstance.primaryXAxis.zoomFactor = args.zoomFactor;
             this.chartInstance.primaryXAxis.zoomPosition = args.zoomPosition;
             this.chartInstance.dataBind();
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
        this.chartRendered = true;
    };
    public rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
                 replace(/-dark/i, "Dark") as ChartTheme;
        args.rangeNavigator.stepLineSeriesModule=new StepLineSeries();
        args.rangeNavigator.dateTimeModule = new DateTime(args.rangeNavigator as any);
        args.rangeNavigator.series[0].type = "StepLine";
    };
    public onClick(e: Event): void {
        this.rangeInstance.print(['rangenavigator', 'charts']);
    }
}