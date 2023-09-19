/**
 * Sample for chart export
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ChartTheme, ILoadedEventArgs, Category, ColumnSeries, Inject, IPointRenderEventArgs, Legend, ExportType, Export, DataLabel } from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, bubbleBootstrap5Colors, pointBootstrap5Colors, pointMaterial3DarkColors, pointMaterial3Colors } from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'India', y: 35.5, DataLabelMappingName:  Browser.isDevice ? "35.5" : "35.5GW" }, { x: 'China', y: 18.3, DataLabelMappingName:  Browser.isDevice ?"18.3" :  "18.3GW"  }, { x: 'Italy', y: 17.6, DataLabelMappingName:  Browser.isDevice ? "17.6"  : "17.6GW"  }, { x: 'Japan', y: 13.6, DataLabelMappingName: Browser.isDevice ? "13.6"  :"13.6GW"  },
    { x: 'United state', y: 12, DataLabelMappingName: Browser.isDevice ? "12" : "12GW"  }, { x: 'Spain', y: 5.6, DataLabelMappingName: Browser.isDevice ? "5.6" : "5.6GW"  }, { x: 'France', y: 4.6, DataLabelMappingName: Browser.isDevice ? "4.6" : "4.6GW"  }, { x: 'Australia', y: 3.3, DataLabelMappingName: Browser.isDevice ? "3.3" :"3.3GW"  },
    { x: 'Belgium', y: 3, DataLabelMappingName:  Browser.isDevice ? "3" : "3GW"  }, { x: 'United Kingdom', y: 2.9, DataLabelMappingName: Browser.isDevice ? "2.9" : "2.9GW"  }
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
const ChartExport = () => {
    useEffect(() => {
        updateSampleSection();
        const button = document.getElementById('chart-export');
        button.addEventListener('click', onClick);
    }, [])
    let chartInstance = useRef<ChartComponent>(null);
    let mode = useRef<DropDownListComponent>(null);
    let inputObj = useRef(null);
    let type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' },
        { value: 'XLSX' },
        { value: 'CSV' }
    ];
    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/light/i, "Light").replace(/contrast/i,'Contrast') as ChartTheme;
    };
    const labelRender = (args: IPointRenderEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = pointFabricColors[args.point.index % 10];;
        } else if (selectedTheme === 'material-dark') {
            args.fill = pointMaterialDarkColors[args.point.index % 10];;
        } else if (selectedTheme === 'material') {
            args.fill = pointMaterialColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap5-dark') {
            args.fill = pointBootstrap5DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap5') {
            args.fill = pointBootstrap5Colors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap4') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'bootstrap-dark') {
            args.fill = pointBootstrapColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = pointHighContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent-dark') {
            args.fill = pointFluentDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent') {
            args.fill = pointFluentColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind-dark') {
            args.fill = pointTailwindDarkColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind') {
            args.fill = pointTailwindColors[args.point.index % 10];
        } else if (selectedTheme === 'material3-dark') {
            args.fill = pointMaterial3DarkColors[args.point.index % 10];
        } else if (selectedTheme === 'material3') {
            args.fill = pointMaterial3Colors[args.point.index % 10];
        }
    }
    const onClick = (e: Event): void => {
        chartInstance.current.exportModule.export((mode.current.value as ExportType), inputObj.current.value);
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-9'>
                    <ChartComponent id='charts' ref={chartInstance} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: {width : 0}, minorTickLines: {width: 0}, labelIntersectAction: "None", labelRotation: -45, interval: 1 }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}GW', minimum: 0, maximum: 40, interval: 10, lineStyle: {width : 0}, majorGridLines: { width: 2 }, minorTickLines: {width: 0}, majorTickLines: {width : 0} }} pointRender={labelRender.bind(this)} load={load.bind(this)} legendSettings={{ visible: false }} title="Top 10 Countries Using Solar Power" loaded={onChartLoad.bind(this)}>
                        <Inject services={[ColumnSeries, Category, Legend, Export, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} name='Measurements (in Gigawatt)' xName='x' yName='y' width={2} marker={{ dataLabel: { visible: true, name: 'DataLabelMappingName', enableRotation: Browser.isDevice ? true : false, angle: -90, position: 'Top', font: {  fontWeight: '600', color: '#ffffff', size: '9px' } } }} type='Column' />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "40%" }}>Export Type:</td>
                                <td style={{ width: "60%" }}>
                                    <div style={{ "marginLeft": "-10px" }}>
                                        <DropDownListComponent id="etype" value="JPEG" width={90} ref={mode} dataSource={type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "40%" }}>File Name:</td>
                                <td style={{ width: "40%" }}>
                                    <div className="e-float-input" style={{ 'marginTop': '0px', "marginLeft": "-10px" }}>
                                        <input type="text" ref={inputObj} defaultValue="Chart" id="fileName" style={{ "width": "90px" }} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div id="btn-control" style={{ 'marginLeft': '50%' }}>
                                        <ButtonComponent id="chart-export" iconCss='e-icons e-export icon' isPrimary={true}>Export</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates client-side exporting of the chart, enabling you to export its data to Excel, PDF, and CSV formats. Additionally, it allows you to save the chart in image formats such as JPEG, PNG, and SVG.</p>
            </div>
            <div id="description">
            <p>In this example, you can see how the export functionality is configured. The rendered chart can be exported in JPEG, PNG, SVG, and PDF file types. Data from the chart can also be exported to Excel and CSV files.</p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use export, we need to inject <code>export</code> module into <code>services</code>.
                </p>
                <p>
                    More information on the export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-print/#export">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default ChartExport;