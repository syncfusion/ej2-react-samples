/**
 * Sample for Empty Point
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ColumnSeries, ChartTheme, SplineSeries, AreaSeries, ChartSeriesType,
    EmptyPointMode, Category, Legend, Tooltip, ILoadedEventArgs, Inject
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { EmitType } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class EmptyPoint extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { value: 'Column' },
        { value: 'Area' },
        { value: 'Spline' },
    ];
    private modeElement: DropDownListComponent;
    private modelist: { [key: string]: Object }[] = [
        { value: 'Gap' },
        { value: 'Drop' },
        { value: 'Average' },
        { value: 'Zero' }
    ];
    private change(): void {
        this.chartInstance.series[0].type = this.dropElement.value as ChartSeriesType;
        this.chartInstance.refresh();
    };
    private mode(): void {
        this.chartInstance.series[0].emptyPointSettings.mode = this.modeElement.value as EmptyPointMode;
        this.chartInstance.series[0].emptyPointSettings.fill = '#e6e6e6';
        this.chartInstance.refresh();
    };
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart}
                            primaryXAxis={{
                                title: 'Product', valueType: 'Category', interval: 1
                            }}
                            chartArea={{ border: { width: 0 } }}
                            primaryYAxis={{
                                title: 'Profit', minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%'
                            }}
                            load={this.load.bind(this)}
                            legendSettings={{ visible: false }}
                            title="Annual Product-Wise Profit Analysis" loaded={this.onChartLoad.bind(this)}
                            tooltip={{ enable: true }}>
                            <Inject services={[ColumnSeries, Category, Legend, Tooltip, SplineSeries, AreaSeries]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' width={2} name='Profit'
                                    type='Column' marker={{ visible: true, height: 10, width: 10 }} emptyPointSettings={{
                                        fill: '#e6e6e6'
                                    }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Series Type: </div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="selmode" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Column" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Empty Point Mode: </div></td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width="120px" id="selmode" change={this.mode.bind(this)} ref={d => this.modeElement = d} dataSource={this.modelist} fields={{ text: 'value', value: 'value' }} value="Gap" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates the empty point functionality in chart series. The mode of empty point can be changed by using <code>Empty Point Mode</code> in property panel.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the empty points. You can use <code>border</code>,
                    <code>fill</code>, <code>mode</code> properties to customize the empty points.
                </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                </p>
                    <p>
                        More information on the empty points can be found in this &nbsp;
                    <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        document.getElementById('charts').setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
        replace(/light/i, "Light")  as ChartTheme;
    };
        
}