/**
 * Polar Stacked Area sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType,
    Legend, Category, StackingAreaSeries, ILoadedEventArgs, PolarSeries, RadarSeries, Tooltip, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'JPN', text: 'Japan', y: 5156, y1: 4849, y2: 4382, y3: 4939 },
    { x: 'DEU', text: 'Germany', y: 3754, y1: 3885, y2: 3365, y3: 3467 },
    { x: 'FRA', text: 'France', y: 2809, y1: 2844, y2: 2420, y3: 2463 },
    { x: 'GBR', text: 'UK', y: 2721, y1: 3002, y2: 2863, y3: 2629 },
    { x: 'BRA', text: 'Brazil', y: 2472, y1: 2456, y2: 1801, y3: 1799 },
    { x: 'RUS', text: 'Russia', y: 2231, y1: 2064, y2: 1366, y3: 1281 },
    { x: 'ITA', text: 'Italy', y: 2131, y1: 2155, y2: 1826, y3: 1851 },
    { x: 'IND', text: 'India', y: 1857, y1: 2034, y2: 2088, y3: 2256 },
    { x: 'CAN', text: 'Canada', y: 1843, y1: 1793, y2: 1553, y3: 1529 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class PolarStackedArea extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private loaded: EmitType<ILoadedEventArgs>;
    private change(): void {
        this.chartInstance.series[0].type = this.dropElement.value as ChartSeriesType;
        this.chartInstance.series[1].type = this.dropElement.value as ChartSeriesType;
        this.chartInstance.series[2].type = this.dropElement.value as ChartSeriesType;
        this.chartInstance.refresh();
    };
    private droplist: { [key: string]: Object }[] = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
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
                                valueType: 'Category',
                                labelPlacement: 'OnTicks',
                                interval: 1,
                                coefficient: Browser.isDevice ? 80 : 100
                            }}
                            primaryYAxis={{
                                minimum: 0,
                                interval: 5000,
                                maximum: 20000
                            }}
                            load={this.load.bind(this)}
                            title="GDP, Current Prices (in Billions)" loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[StackingAreaSeries, Legend, Category, PolarSeries, RadarSeries, Tooltip]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name='2013'
                                    type='Polar' drawType='StackingArea'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y1' name='2014'
                                    type='Polar' drawType='StackingArea'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y2' name='2015'
                                    type='Polar' drawType='StackingArea'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y3' name='2016'
                                    type='Polar' drawType='StackingArea'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>Series Type:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width={120} id="selmode" change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Polar" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates polar series with stacking area type for GDP for different countries in recent years. Series type can be changed by <code>Series Type</code>
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the stacking area type charts. Stacks the series on top of another series to avoid the overlapping of series with one another, when rendering more than one area series in same chart.
                    You can use <code>fill</code> properties to customize the stacked area. <code>dataLabel</code> is used to represent individual data and its value.
                </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject
                    <code>StackingAreaSeries</code>, <code>PolarSeries</code> and <code>SRadarSeries</code> module into <code>services</code>.
                </p>
                    <p>
                        More information on the stacking area series can be found in this &nbsp;
                    <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
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
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)) as ChartTheme;
    };
}