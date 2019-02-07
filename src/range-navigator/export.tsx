/**
 * Sample for Range Navigator Export
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    StepLineSeries, SplineAreaSeries, ChartComponent, SeriesCollectionDirective,
    RangeNavigatorComponent, DateTime, ExportType, SeriesDirective, ILoadedEventArgs,
    IChangedEventArgs, IRangeLoadedEventArgs, ChartTheme, Inject, Tooltip, Export
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { dataCollection } from './export-data';

export let zoomFactor : number;
export let zoomPosition :number;
export let dateTimeData: Object[] = dataCollection;
export let themes: string[] = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
export let borderColor: string[] = ['#FF4081', '#007897', '#428BCA', '#FFD939'];
export let regionColor: string[] = ['rgba(255, 64, 129, 0.3)', ' rgba(0, 120, 151, 0.3)',
    'rgba(66, 139, 202, 0.3)', 'rgba(255, 217, 57, 0.3)'];

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
        #btn-control {
            width: 100%;
            text-align: center;
        }
        .e-export-icon::before {
            content: '\\e728';
        }
    
         .e-print-icon::before {
            content: '\\e813';
        }`;
export class RangeExport extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private rangeInstance: RangeNavigatorComponent;
    private mode: DropDownListComponent;
    private chartRendered: boolean;
    private type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                <div className='col-md-9'>
                <div className="row" style={{ textAlign: "center" }}>
                        <div id="title">Conns,Inc Stock Details</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' 
                        ref={rangenav => this.rangeInstance = rangenav}
                        style={{ textAlign: "center" }}
                        valueType='DateTime'
                        intervalType='Months'
                        labelFormat='MMM'
                        enableGrouping={true}
                        value={[new Date('2013-05-01'), new Date('2013-08-01')]}
                        dataSource={dateTimeData}
                        xName='xDate'
                        yName='Close'
                        width={Browser.isDevice ? '100%' : '80%'}
                        load={this.rangeLoad.bind(this)}
                        changed={this.changed.bind(this)}>
                        <Inject services={[DateTime]} />
                    </RangeNavigatorComponent>
                    </div>
                <div className="row">
                    <ChartComponent id='charts'  
                      ref={chart => this.chartInstance = chart}
                      style={{ textAlign: "center" }}
                      primaryXAxis={{
                            valueType: 'DateTime', 
                            crosshairTooltip: { enable: true },
                            edgeLabelPlacement: 'Shift', 
                            majorGridLines: { width: 0 }
                        }}
                        primaryYAxis={{
                            minimum: 81, maximum: 87, interval: 2,
                            title: 'Million in USD',
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 },
                            labelFormat: '${value}M'
                        }}
                        load={this.chartLoad.bind(this)}
                        width={Browser.isDevice ? '100%' : '80%'}
                        height='350'
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{
                            enable: true, shared: true
                        }}>
                        <Inject services={[SplineAreaSeries, DateTime, Tooltip, Export]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={dateTimeData}
                            xName='xDate' yName='Close' border={{ width: 2}}
                            animation={{ enable: false }} name='Close'
                            type='SplineArea' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                </div>
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '80%' }}>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "30%" }}>
                                        Export Type:
                            </td>
                                    <td style={{ width: "30%" }}>
                                        <DropDownListComponent width={60} id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "40%" }}>
                                        File Name:
                            </td>
                                    <td style={{ width: "40%" }}>
                                        <div className="e-float-input" style={{ width: 70, 'margin-top': '0px' }}>
                                            <input type="text" defaultValue="Chart" id="fileName" style={{ "margin-left": "-10px" }} />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '40px' }}>
                                    <td>
                                        <div id="btn-control"  style={{ 'margin-left': '20px' }}>
                                            <ButtonComponent id="exporticon" onClick={this.exportClick.bind(this)} iconCss='e-icons e-export-icon' cssClass='e-flat' isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id="btn-control" style={{ 'margin-left': '20px' }}>
                                            <ButtonComponent id="printicon" onClick={this.printClick.bind(this)} iconCss='e-icons e-print-icon' cssClass='e-flat' isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the export feature in the range navigator. 
                        You can export the range navigator in PNG, SVG, PDF, or JPEG format by clicking <code>Export</code>.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the export feature. 
                        The rendered range navigator can be exported as either JPEG, PNG, or SVG format. It can be achieved using the Blob. It is supported only in modern browsers.
                    </p>
                    <p>
                        More information on the export can be found in this
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
        let chartTheme: string = args.chart.theme;
        args.chart.series[0].fill = regionColor[themes.indexOf(chartTheme)];
        args.chart.series[0].border.color = borderColor[themes.indexOf(chartTheme)];
        this.chartRendered = true;
    };
    public rangeLoad(args: IRangeLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
                 replace(/-dark/i, "Dark") as ChartTheme;
    };
    public exportClick(e: Event): void {
        let fileName: string = (document.getElementById('fileName') as HTMLInputElement).value;
        this.chartInstance.exportModule.export(
            (this.mode.value as ExportType), fileName, null, [this.rangeInstance,this.chartInstance]
        );
    }
    public printClick(e: Event): void {
        this.rangeInstance.print(['rangenavigator', 'charts']);
    }
}