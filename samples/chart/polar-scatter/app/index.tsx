/**
 * Polar Scatter sample
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartSeriesType,
    Legend, Category, ILoadedEventArgs, PolarSeries, RadarSeries, ScatterSeries, Tooltip, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from './property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

export let data1: any[] = [
    { text: 'Myanmar', x: 'MMR', y: 7.3, y1: 6.3, y2: 7.5 },
    { text: 'India', x: 'IND', y: 7.9, y1: 6.8, y2: 7.2 },
    { text: 'Bangladesh', x: 'BGD', y: 6.8, y1: 6.9, y2: 6.9 },
    { text: 'Cambodia', x: 'KHM', y: 7.0, y1: 7.0, y2: 6.9 },
    { text: 'China', x: 'CHN', y: 6.9, y1: 6.7, y2: 6.6 },
    { text: 'Bhutan', x: 'BTN', y: 6.1, y1: 6.2, y2: 5.9 },
    { text: 'Iceland', x: 'ISL', y: 4.1, y1: 7.2, y2: 5.7 },
    { text: 'Nepal', x: 'NPL', y: 2.7, y1: 0.6, y2: 5.5 },
    { text: 'Pakistan', x: 'PAK', y: 4.0, y1: 4.7, y2: 5.0 },
    { text: 'Poland', x: 'POL', y: 3.9, y1: 2.7, y2: 3.4 },
    { text: 'Australia', x: 'AUS', y: 2.4, y1: 2.5, y2: 3.1 },
    { text: 'Korea', x: 'KOR', y: 2.8, y1: 2.8, y2: 2.7 },
    { text: 'Singapore', x: 'SGP', y: 1.9, y1: 2.0, y2: 2. },
    { text: 'Canada', x: 'CAN', y: 0.9, y1: 1.4, y2: 1.9 },
    { text: 'Germany', x: 'DEU', y: 1.5, y1: 1.8, y2: 1.6 },
    { text: 'Denmark', x: 'DNK', y: 1.6, y1: 1.1, y2: 1.5 },
    { text: 'France', x: 'FRA', y: 1.3, y1: 1.3, y2: 1.4 },
    { text: 'Austria', x: 'AUT', y: 1.0, y1: 1.5, y2: 1.4 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class PolarScatter extends SampleBase<{}, {}> {
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
                                minimum: 0, maximum: 8, interval: 2
                            }}
                            load={this.load.bind(this)}
                            title="Real GDP Growth" loaded={this.onChartLoad.bind(this)}
                            tooltip={{ enable: true, format: '${point.text} : <b>${point.y}%</b>' }}>
                            <Inject services={[Legend, Category, PolarSeries, RadarSeries, ScatterSeries, Tooltip]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y' name='2015'
                                    type='Polar' drawType='Scatter' marker={{ height: 10, width: 10, dataLabel: { name: 'text' } }}>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y1' name='2016'
                                    type='Polar' drawType='Scatter' marker={{ height: 10, width: 10, shape: 'Diamond', dataLabel: { name: 'text' } }}>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='y2' name='2017'
                                    type='Polar' drawType='Scatter' marker={{ height: 10, width: 10, shape: 'Triangle', dataLabel: { name: 'text' } }}>
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
ReactDOM.render(<PolarScatter />, document.getElementById('sample'));