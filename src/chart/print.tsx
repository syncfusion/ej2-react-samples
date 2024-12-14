/**
 * Sample for Chart print
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ChartTheme,
    ILoadedEventArgs, Category, ColumnSeries, Inject, IPointRenderEventArgs, Legend, DataLabel
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors, bootstrap5Colors, pointTailwindColors, pointTailwindDarkColors, pointTailwind3Colors, pointTailwind3DarkColors} from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

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
        content: "\\e34b";
    }
    
    .e-view.fabric .e-print-icon::before, .e-view.fabric-dark .e-print-icon::before
    {
        content: '\\e7df';
    }
    
    .e-view.bootstrap .e-print-icon::before {
        content: '\\ebd2';
    }
    
    .e-view.bootstrap4 .e-print-icon::before {
        content: '\\e743';
    }
    
    .e-view.tailwind3 .e-print-icon::before, .e-view.tailwind3-dark .e-print-icon::before {
        content: '\\e76c';
    }

    .e-view.fluent .e-print-icon::before, .e-view.fluent-dark .e-print-icon::before {
        content: '\\e75d';
    }
    
    .e-view.highcontrast .e-print-icon::before {
        content: '\\ebf9';
    }
    
    .e-view.bootstrap5 .e-print-icon::before, .e-view.bootstrap5-dark .e-print-icon::before {
        content: '\\e75d';
    }`;
export class Print extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private mode(): void {
        this.chartInstance.print();
    };
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section row'>
                    <div className='col-lg-9'>
                        <ChartComponent id='charts' ref={chart=>this.chartInstance=chart} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: {width : 0}, minorTickLines: {width: 0} }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ labelFormat: '${value}k', minimum: 0, maximum: 20, interval: 4, lineStyle: { width: 0 }, majorGridLines: { width: 2 }, majorTickLines: { width: 0 } }} pointRender={this.labelRender.bind(this)} load={this.load.bind(this)} title="Sales Comparision" loaded={this.onChartLoad.bind(this)} >
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
                                </tr></tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
    public labelRender(args: IPointRenderEventArgs): void {
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
        }
        else if (selectedTheme === 'bootstrap5' || selectedTheme === 'bootstrap5-dark') {
            args.fill = bootstrap5Colors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind') {
            args.fill = pointTailwindColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind-dark') {
            args.fill = pointTailwindDarkColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind3') {
            args.fill = pointTailwind3Colors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3-dark') {
            args.fill = pointTailwind3DarkColors[args.point.index % 10];
        }
        else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    }
    public onClick(e: Event): void {
        this.chartInstance.print();
    }
}