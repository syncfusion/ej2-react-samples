/**
 * Sample for Chart print
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, ChartTheme, ILoadedEventArgs, Category, ColumnSeries, Inject, IPointRenderEventArgs, Legend, DataLabel } from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors, bubbleFabricColors, bubbleMaterialDarkColors, bubbleMaterialColors, bubbleBootstrap5DarkColors, bubbleBootstrapColors, bubbleHighContrastColors, bubbleFluentDarkColors, bubbleFluentColors, bubbleTailwindDarkColors, bubbleTailwindColors, pointFabricColors, pointMaterialDarkColors, pointMaterialColors, pointBootstrap5DarkColors, pointBootstrapColors, pointHighContrastColors, pointFluentDarkColors, pointFluentColors, pointTailwindDarkColors, pointTailwindColors, bubbleBootstrap5Colors, pointBootstrap5Colors, pointMaterial3DarkColors, pointMaterial3Colors , fluent2Colors, fluent2HighContrastColors,  bootstrap5Colors} from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
export let data1: any[] = [
    { x: 'John', y: 10, dataLabelMappingName: "$10k"  }, { x: 'Jake', y: 12, dataLabelMappingName: "$12k" }, { x: 'Peter', y: 18, dataLabelMappingName: "$18k"},
    { x: 'James', y: 11, dataLabelMappingName: "$11k" }, { x: 'Mary', y: 9.7, dataLabelMappingName: "$9.7k"}
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #btn-control {
        width: 100%;
        text-align: center;
    }

    .e-print-icon::before {
        content: '\\e34b';
    }
 
    .e-view.fabric .e-print-icon::before, .e-view.fabric-dark .e-print-icon::before {
        content: '\\e7df';
    }
 
    .e-view.bootstrap .e-print-icon::before {
        content: '\\ebd2';
    }
 
   .e-view.bootstrap4 .e-print-icon::before {
        content: '\\e743';
    }
 
    .e-view.tailwind .e-print-icon::before, .e-view.tailwind-dark .e-print-icon::before {
        content: '\\e76c';
    }
 
    .e-view.highcontrast .e-print-icon::before {
        content: '\\ebf9';
    }
 
    .e-view.bootstrap5 .e-print-icon::before, .e-view.bootstrap5-dark .e-print-icon::before {
        content: '\\e75d';
    }
 
    .e-view.fluent .e-print-icon::before, .e-view.fluent-dark .e-print-icon::before {
        content: '\\e75d';
    }
    .e-view.fluent2 .e-print-icon::before, .e-view.fluent2-dark .e-print-icon::before, .e-view.fluent2-highcontrast .e-print-icon::before {
        content: '\\e75d';
    }
    .e-view.material3 .e-print-icon::before, .e-view.material3-dark .e-print-icon::before {
        content: '\\e75d';
    }
    `;
const Print = () => {
    useEffect(() => {
        updateSampleSection();
        const button = document.getElementById('chart-print');
        button.addEventListener('click', onClick);
    }, [])
    let chartInstance = useRef<ChartComponent>(null);

    const onChartLoad = (args: ILoadedEventArgs): void => {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args: ILoadedEventArgs): void => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
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
        } else if (selectedTheme === 'fluent2') {
            args.fill = fluent2Colors[args.point.index % 10];
        } else if (selectedTheme === 'fluent2-highcontrast' || selectedTheme === 'fluent2-dark') {
            args.fill = fluent2HighContrastColors[args.point.index % 10];
        }
        else if (selectedTheme === 'bootstrap5' || selectedTheme === 'bootstrap5-dark') {
            args.fill = bootstrap5Colors[args.point.index % 10];
        }
    }
    const onClick = (e: Event): void => {
        chartInstance.current.print();
    }
    return (
        <div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-lg-9'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: {width : 0}, minorTickLines: {width: 0} }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ labelFormat: '${value}k', minimum: 0, maximum: 20, interval: 4, lineStyle: { width: 0 }, majorGridLines: { width: 2 }, majorTickLines: { width: 0 } }} pointRender={labelRender.bind(this)} load={load.bind(this)} title="Sales Comparision" loaded={onChartLoad.bind(this)} >
                        <Inject services={[ColumnSeries, Category, Legend, DataLabel]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} type='Column' marker={{ dataLabel: { visible: true, name: 'dataLabelMappingName', position: 'Top', font: { fontWeight: '600', color: "#ffffff"} } }} />
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{height: '50px'}}>
                                    <td style={{textAlign: 'center'}}>
                                        <b>Print the chart</b>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <div id="btn-control">
                                        <ButtonComponent id="chart-print" iconCss='e-icons e-print-icon' cssClass='e-flat' isPrimary={true}>Print</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the print option in the charts.
                </p>
            </div>
            <div id="description">
                <p>
                    By clicking the <b>Print</b> button, you can print a chart directly from the browser by calling the public method print.
                </p>
                <p>
                    More information on the print can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-print/#print" aria-label="Navigate to the documentation for Print in React Chart component">documentation section</a>.
                </p>
            </div>
        </div >
    )
}
export default Print;