/**
 * Sample for stripline
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, StripLineSettingsModel,
    Legend, DateTimeCategory, SplineSeries, Tooltip, ILoadedEventArgs, StripLine, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

export let data: any[] = [
    { x: new Date(2023, 4, 1), wind : 19 },
    { x: new Date(2023, 4, 2), wind : 17 },
    { x: new Date(2023, 4, 3), wind : 14 },
    { x: new Date(2023, 4, 4), wind : 9 },
    { x: new Date(2023, 4, 5), wind : 10 },
    { x: new Date(2023, 4, 6), wind : 8 },
    { x: new Date(2023, 4, 7), wind : 8 },
    { x: new Date(2023, 4, 8), wind : 16 },
    { x: new Date(2023, 4, 9), wind : 9 },
    { x: new Date(2023, 4, 10), wind : 13 },
    { x: new Date(2023, 4, 11), wind : 7 },
    { x: new Date(2023, 4, 12), wind : 12 },
    { x: new Date(2023, 4, 13), wind : 10 },
    { x: new Date(2023, 4, 14), wind : 5 },
    { x: new Date(2023, 4, 15), wind : 8 }];
export let data1: any[] = [
    { x: new Date(2023, 4, 1), gust : 30 },
    { x: new Date(2023, 4, 2), gust : 28 },
    { x: new Date(2023, 4, 3), gust : 26 },
    { x: new Date(2023, 4, 4), gust : 19 },
    { x: new Date(2023, 4, 5), gust : 21 },
    { x: new Date(2023, 4, 6), gust : 14 },
    { x: new Date(2023, 4, 7), gust : 13 },
    { x: new Date(2023, 4, 8), gust : 29 },
    { x: new Date(2023, 4, 9), gust : 19 },
    { x: new Date(2023, 4, 10), gust : 20 },
    { x: new Date(2023, 4, 11), gust : 15 },
    { x: new Date(2023, 4, 12), gust : 25 },
    { x: new Date(2023, 4, 13), gust : 20 },
    { x: new Date(2023, 4, 14), gust : 10 },
    { x: new Date(2023, 4, 15), gust : 15 }];
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #winter stop {
        stop-color: #4ca1af;
    }

    #winter stop[offset="0"] {
        stop-color: #c4e0e5;
    }

    #winter stop[offset="1"] {
        stop-color: #4ca1af;
    }

    #summer stop {
        stop-color: #ffa751;
    }

    #summer stop[offset="0"] {
        stop-color: #ffe259;
    }

    #summer stop[offset="1"] {
        stop-color: #ffa751;
    }

    #spring stop {
        stop-color: #1d976c;
    }

    #spring stop[offset="0"] {
        stop-color: #93f9b9;
    }

    #spring stop[offset="1"] {
        stop-color: #1d976c;
    }

    #autumn stop {
        stop-color: #603813;
    }

    #autumn stop[offset="0"] {
        stop-color: #b29f94;
    }

    #autumn stop[offset="1"] {
        stop-color: #603813;
    }`;

export class Stripline extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private dropElement: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { value: 'Vertical' },
        { value: 'Horizontal' },
        { value: 'Segment'}
    ];
    private loaded: EmitType<ILoadedEventArgs>;
    private change(): void {
        this.chartInstance.series[0].fill = 'white';
        this.chartInstance.series[0].marker.fill = 'black';
        this.chartInstance.series[0].marker.border.color = 'white';
        for (let i: number = 0; i < 3; i++) {
            this.chartInstance.primaryYAxis.stripLines[i].visible = false;
        }
        if (this.dropElement.value === 'Vertical') {
                for (let i: number = 0; i <= 7; i++) {
                    this.chartInstance.primaryXAxis.stripLines[i].visible = !this.chartInstance.primaryXAxis.stripLines[i].isSegmented;
                }
        } else if (this.dropElement.value === 'Horizontal') {
            for (let i: number = 0; i < 3; i++) {
                this.chartInstance.primaryYAxis.stripLines[i].visible = true;
            }
            for (let i: number = 0; i <= 7; i++) {
                this.chartInstance.primaryXAxis.stripLines[i].visible = false;
            }
        } else {
            for (let i: number = 0; i <= 7; i++) {
                this.chartInstance.primaryXAxis.stripLines[i].visible = this.chartInstance.primaryXAxis.stripLines[i].isSegmented;
            }
            this.chartInstance.series[0].fill = 'black';
            this.chartInstance.series[0].marker.fill = 'white';
            this.chartInstance.series[0].marker.border.color = 'black';

        }
        this.chartInstance.refresh();
    };
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>

                <svg style={{ height: 0 }}>
                    <defs>
                        <linearGradient id="winter" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="summer" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="spring" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" />
                            <stop offset="1" />
                        </linearGradient>
                        <linearGradient id="autumn" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" />
                            <stop offset="1" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className='control-section row'>
                    <div className='col-md-8'>
                        <ChartComponent id='charts' ref={chart => this.chartInstance = chart}
                            primaryXAxis={{
                                valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, labelFormat: 'E dd/MM', labelRotation: -90, labelIntersectAction: Browser.isDevice ? 'Rotate90' : 'None',
                            }}
                            load={this.load.bind(this)}
                            primaryYAxis={{
                                minimum: 0, maximum: 30, interval: 10, title: 'Wind Speed and Gust (km/h)',
                                lineStyle: { width: 0 }, rangePadding: 'None', majorGridLines: { width: 0 }, majorTickLines: { width: 0 },
                                stripLines: [
                                    {
                                        start: 0, end: 5, text: 'Calm', color: 'rgba(68, 170, 213, 0.1)', visible: true, horizontalAlignment: 'Start',
                                        textStyle: { size: '13px' }, border: { width: 0 },
                                    }, 
                                    {
                                        start: 5, end: 8, text: 'Light Air', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start',
                                        textStyle: { size: '13px' }, border: { width: 0 },
                                    },
                                    {
                                        start: 8, end: 11, text: 'Light Breeze', visible: true, horizontalAlignment: 'Start',
                                        textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(68, 170, 213, 0.1)'
                                    },
                                    {
                                        start: 11, end: 18, text: 'Gentle Breeze', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start',
                                        textStyle: { size: '13px' }, border: { width: 0 },
                                    }, 
                                    {
                                        start: 18, end: 28, text: 'Moderate Breeze', visible: true, horizontalAlignment: 'Start',
                                        textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(68, 170, 213, 0.1)'
                                    },
                                    {
                                        start: 28, end: 30, text: 'Fresh Breeze', visible: true, horizontalAlignment: 'Start',
                                        textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(0, 0, 0, 0)'
                                    }
                                ]
                            }}
                            tooltip={{
                                enable: true,
                                header: '',
                                format: '<b>${point.x}</b> <br> ${series.name} : <b>${point.y}</b',
                                enableMarker: false,
                                enableHighlight: true,
                                showNearestTooltip: true
                            }}
                            chartArea= {{
                                border: { width: 0 }
                            }}
                            legendSettings={{ visible: true, enableHighlight: true, shapeHeight: 6, shapeWidth: 15 }}
                            loaded={this.onChartLoad.bind(this)}
                            title='Wind Speed and Gust (km/h)'
                            titleStyle={{position : 'Bottom', textAlignment:'Far'}}
                            subTitle='WorldWeatherOnline.com'>
                            <Inject services={[DateTimeCategory, SplineSeries, Legend, Tooltip, StripLine]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data} xName='x' yName='wind' width={4} legendShape="HorizontalLine"
                                    type='Spline' name='Wind Speed (km/h)'>
                                </SeriesDirective>
                                <SeriesDirective dataSource={data1} xName='x' yName='gust' width={4} legendShape="HorizontalLine"
                                    type='Spline' name='Wind Gust (km/h)'>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody><tr style={{ height: '50px' }}>
                                    <td style={{ width: '60%' }}>
                                        <div>StripLine Types:</div>
                                    </td>
                                    <td style={{ width: '40%' }}>
                                        <div>
                                            <DropDownListComponent width={120} id="selmode" style={{ "width": "auto" }} change={this.change.bind(this)} ref={d => this.dropElement = d} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Vertical" />
                                        </div>
                                    </td>
                                </tr></tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample displays the changes in wind speed and gust with stripline feature.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a strip line for the chart. Use the <code>start</code> and <code>end</code> properties in the <code>chartStripline</code> option to add a strip line to an axis. Additionally, the title for the chart can be positioned anywhere in the chart by using the <code>position</code> property in <code>titleStyle</code>.
                    </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use strip line, we need to inject <code>StripLine</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the strip line can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/strip-line" aria-label="Navigate to the documentation for Strip lines in React Chart component">documentation section</a>.
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
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}