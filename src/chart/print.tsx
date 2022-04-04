/**
 * Sample for Chart print
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ChartTheme,
    ILoadedEventArgs, Category, ColumnSeries, Inject, IPointRenderEventArgs, Legend
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors } from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'John', y: 10000 }, { x: 'Jake', y: 12000 }, { x: 'Peter', y: 18000 },
    { x: 'James', y: 11000 }, { x: 'Mary', y: 9700 }
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
    
    .e-view.tailwind .e-print-icon::before, .e-view.tailwind-dark .e-print-icon::before {
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
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-9'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart}
                            primaryXAxis={{
                                title: 'Manager',
                                valueType: 'Category',
                                majorGridLines: { width: 0 }
                            }}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                title: 'Sales',
                                minimum: 0,
                                maximum: 20000,
                                majorGridLines: { width: 0 }
                            }}
                            pointRender={this.labelRender.bind(this)}
                            load={this.load.bind(this)}
                            title="Sales Comparision" loaded={this.onChartLoad.bind(this)}
                            tooltip={{ enable: true }}>
                            <Inject services={[ColumnSeries, Category, Legend]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' width={2}
                                    type='Column'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <div id="btn-control">
                                            <ButtonComponent onClick={this.onClick.bind(this)} iconCss='e-icons e-print-icon' cssClass='e-flat' isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates the print feature in chart. By clicking <code>Print</code>, you can print the chart directly from the browser.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the print.
                The rendered chart can be printed directly from the browser by calling the public method print.
                </p>
                    <p>
                        More information on the print can be found in this &nbsp;
                    <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
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
        } else {
            args.fill = bootstrapColors[args.point.index % 10];
        }
    }
    public onClick(e: Event): void {
        this.chartInstance.print();
    }
}