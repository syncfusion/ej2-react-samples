/**
 * Sample for chart export
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ChartTheme,
    ILoadedEventArgs, Category, ColumnSeries, Inject, IPointRenderEventArgs, Legend, ExportType, Export
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'DEU', y: 35.5 }, { x: 'CHN', y: 18.3 }, { x: 'ITA', y: 17.6 }, { x: 'JPN', y: 13.6 },
    { x: 'US', y: 12 }, { x: 'ESP', y: 5.6 }, { x: 'FRA', y: 4.6 }, { x: 'AUS', y: 3.3 },
    { x: 'BEL', y: 3 }, { x: 'UK', y: 2.9 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     #btn-control {
         width: 100%;
         text-align: center;
     }
 
     .e-export-icon::before {
         content: '\\e728';
     }
     
     .e-view.fabric .e-export-icon::before, .e-view.fabric-dark .e-export-icon::before  {
         content: '\\e710';
     }
     
     .e-view.bootstrap4 .e-export-icon::before {
         content: '\\e780';
     }
     
     .e-view.tailwind-dark .e-export-icon::before, .e-view.tailwind .e-export-icon::before {
         content: '\\e7bf';
     }
     
     .e-view.highcontrast .e-export-icon::before {
         content: '\\e710';
     }
     
     .e-view.bootstrap5 .e-export-icon::before, .e-view.bootstrap5-dark .e-export-icon::before {
         content: '\\e72e';
     }`;
function ChartExport() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chartInstance: ChartComponent;
    let mode: DropDownListComponent;
    let type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];
    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chart => chartInstance = chart} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            valueType: 'Category',
                            majorGridLines: { width: 0 },
                            majorTickLines: {width : 0},
                            minorTickLines: {width: 0}
                        }}
                        chartArea={{ border: { width: 0 } }}
                        primaryYAxis={{
                            title: 'Measurements',
                            labelFormat: '{value}GW',
                            minimum: 0,
                            maximum: 40,
                            interval: 10,
                            lineStyle: {width : 0},
                            minorTickLines: {width: 0},
                            majorTickLines: {width : 0},
                        }}
                        pointRender={labelRender.bind(this)}
                        load={load.bind(this)}
                        title="Top 10 Countries Using Solar Power" loaded={onChartLoad.bind(this)}
                        tooltip={{ enable: true }}>
                        <Inject services={[ColumnSeries, Category, Legend, Export]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2}
                                type='Column'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "30%" }}>
                                    Export Type:
                                </td>
                                <td style={{ width: "30%" }}>
                                    <DropDownListComponent width={120} id="etype" value="JPEG" ref={d => mode = d} dataSource={type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "40%" }}>
                                    File Name:
                                </td>
                                <td style={{ width: "40%" }}>
                                    <div className="e-float-input" style={{ width: 120, 'marginTop': '0px' }}>
                                        <input type="text" defaultValue="Chart" id="fileName" style={{ "marginLeft": "-10px" }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div id="btn-control" style={{ 'marginLeft': '60px' }}>
                                        <ButtonComponent onClick={onClick.bind(this)} iconCss='e-icons e-export-icon' cssClass='e-flat' isPrimary={true}>Export</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates the export feature in chart. By clicking <code>Export</code>, you can export the chart in PNG or JPEG format.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure the export. The rendered chart can be exported as either JPEG or PNG format. It can be achieved using Blob and it's supported only in modern browsers.
                </p>
                <p>
                    More information on the export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-print/#export">documentation section</a>.
                </p>
            </div>
        </div >
    )
    function onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light") as ChartTheme;
    };
    function labelRender(args: IPointRenderEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent') {
            args.fill = fluentColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent-dark') {
            args.fill = fluentDarkColors[args.point.index % 10];
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    }
    function onClick(e: Event): void {
        let fileName: string = (document.getElementById('fileName') as HTMLInputElement).value;
        chartInstance.exportModule.export((mode.value as ExportType), fileName);
    }
}
export default ChartExport;