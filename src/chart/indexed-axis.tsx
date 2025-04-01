/**
 * Sample for Indexed Category Axis
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    Legend, Category, ILoadedEventArgs, LineSeries, ColumnSeries,  Crosshair, ChartTheme, DataLabel
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'Myanmar', y: 7.3 },
    { x: 'India', y: 7.9 },
    { x: 'Bangladesh', y: 6.8 },
    { x: 'Cambodia', y: 7.0 },
    { x: 'China', y: 6.9 },];
export let data2: any[] = [
    { x: 'Poland', y: 2.7 },
    { x: 'Australia', y: 2.5 },
    { x: 'Singapore', y: 2.0 },
    { x: 'Canada', y: 1.4 },
    { x: 'Germany', y: 1.8 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class IndexedAxis extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: HTMLInputElement;
    private loaded: EmitType<ILoadedEventArgs>;
    private onChange(): void {
        this.chartInstance.primaryXAxis.isIndexed = this.dropElement.checked;
        if (this.chartInstance.primaryXAxis.isIndexed) {
            this.chartInstance.tooltip.shared = false;
            this.chartInstance.series[0].type = 'Column';
            this.chartInstance.series[1].type = 'Column';
            this.chartInstance.series[0].marker.visible = false;
            this.chartInstance.series[1].marker.visible = false;
            this.chartInstance.primaryXAxis.labelRotation = 0;
            this.chartInstance.crosshair.line.width = 1;
        } else {
            this.chartInstance.series[0].type = 'Line';
            this.chartInstance.series[1].type = 'Line';
            this.chartInstance.series[0].marker.visible = true;
            this.chartInstance.series[1].marker.visible = true;
            this.chartInstance.primaryXAxis.labelRotation = 90;
            this.chartInstance.crosshair.line.width = 0;
            this.chartInstance.tooltip.enable = true;
            this.chartInstance.tooltip.shared = false;
        }
        this.chartInstance.refresh();
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
                                valueType: 'Category',
                                interval: 1,
                                edgeLabelPlacement: 'Shift',
                                crosshairTooltip: { enable: false },
                                isIndexed: true,
                                majorGridLines: { width: 0 }
                            }}
                            primaryYAxis={{
                                labelFormat: '{value}%',
                                majorTickLines: { width: 0 }, 
                                lineStyle: { width: 0 }
                            }}
                            chartArea={{ border: { width: 0 } }}
                            load={this.load.bind(this)}
                            title="Real GDP Growth" loaded={this.onChartLoad.bind(this)}
                            tooltip={{ enable: false, shared: true }}
                            crosshair={{ enable: false, lineType: 'Vertical' }}>
                            <Inject services={[Legend, Category, LineSeries, ColumnSeries, Crosshair,DataLabel]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name='2015' width={2}
                                    type='Column'    marker={{
                                        dataLabel: {
                                          visible: true,
                                          position: 'Top',
                                          font: { fontWeight: '600' },
                                        }
                                    }}>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data2} xName='x' yName='y' name='2016' width={2}
                                    type='Column'  marker={{
                                        dataLabel: {
                                          visible: true,
                                          position: 'Top',
                                          font: { fontWeight: '600' },
                                        }
                                    }} >
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody><tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div id="indexed">Indexed:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <input type="checkbox" id="isIndexed" defaultChecked={true} onChange={this.onChange.bind(this)} style={{ marginLeft: '-5px' }} ref={d => this.dropElement = d} aria-labelledby="Checkbox checked"/>
                                        </div>
                                    </td>
                                </tr></tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample demonstrates the rendering of indexed category axis in the chart by using two series.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to indexed axis in chart. For indexed category axis you can use <code>isIndexed</code> property.
                </p>
                    <p>
                        Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices.
            </p>
                    <p>
                        More information on the indexed axis can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/category-axis/#indexed-category-axis" aria-label="Navigate to the documentation for Indexed category Axis in React Chart component">documentation section</a>.
               </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}