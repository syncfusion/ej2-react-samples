/**
 * Sample for Lazy Loading
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject,
    ChartTheme, ScrollBar, Zoom, IScrollEventArgs, LineSeries, Tooltip,
    DateTime, ILoadedEventArgs, Chart, Crosshair, ColumnSeries
} from '@syncfusion/ej2-react-charts';
import { Browser, Internationalization, DateFormatOptions } from '@syncfusion/ej2-base';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { DatePickerComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';
import { NumericTextBoxComponent, ChangeEventArgs as NumericChange } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        `;

export class LazyLoading extends SampleBase<{}, {}> {
    private chart: ChartComponent;
    private intl: Internationalization = new Internationalization();
    private dropElement: DropDownListComponent;
    private minDate: DatePickerComponent; private maxDate: DatePickerComponent;
    private pointslength: NumericTextBoxComponent;
    private lazymode: DropDownListComponent;
    private droplist: { [key: string]: Object }[] = [
        { value: 'Range' },
        { value: 'Points Length' }
    ];
    private minChange(args: ChangedEventArgs): void {
        this.chart.primaryXAxis.scrollbarSettings.range.minimum = args.value;
        this.chart.refresh();
    };
    private maxChange(args: ChangedEventArgs): void {

        this.chart.primaryXAxis.scrollbarSettings.range.maximum = args.value;
        this.chart.refresh();

    };
    private pointChange(args: NumericChange): void {

        this.chart.primaryXAxis.scrollbarSettings.pointsLength = args.value;
        this.chart.refresh();
    };
    private modeChange(arg: ChangeEventArgs): void {
        let min: number | Date;
        let max: number | Date;
        if (arg.value === 'Range') {
            this.chart.primaryXAxis.valueType = 'DateTime';
            min = this.chart.primaryXAxis.scrollbarSettings.range.minimum = new Date(2009, 0, 1);
            max = this.chart.primaryXAxis.scrollbarSettings.range.maximum = new Date(2014, 0, 1);
            this.chart.series[0].dataSource = this.GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1));
            this.chart.refresh();
            this.minDate.enabled = true;
            this.maxDate.enabled = true;
            this.pointslength.enabled = false;
        } else {
            this.chart.primaryXAxis.valueType = 'Double';
            this.chart.primaryXAxis.scrollbarSettings.range.minimum = null;
            this.chart.primaryXAxis.scrollbarSettings.range.maximum = null;
            this.chart.primaryXAxis.scrollbarSettings.pointsLength = 1000;
            this.chart.series[0].dataSource = this.GetNumericData(1, 200);
            this.chart.refresh();
            this.minDate.enabled = false;
            this.maxDate.enabled = false;
            this.pointslength.enabled = true;
        }
    };
    private GetDateTimeData(start: Date, end: Date): { x: Date, y: number }[] {
        let series1: { x: Date, y: number }[] = [];
        let date: number;
        let value: number = 30;
        let option: DateFormatOptions = {
            skeleton: 'full',
            type: 'dateTime'
        };
        let dateParser: Function = this.intl.getDateParser(option);
        let dateFormatter: Function = this.intl.getDateFormat(option);
        for (let i: number = 0; start <= end; i++) {
            date = Date.parse(dateParser(dateFormatter(start)));
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            let point1: { x: Date, y: number } = { x: new Date(date), y: Math.round(value) };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point1);
        }
        return series1;
    }
    private GetNumericData(start: number, end: number): { x: number, y: number }[] {
        let series1: { x: number, y: number }[] = [];
        let value: number = 30;
        for (let i: number = start; i <= end; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = this.getRandomInt(20, 40);
            }
            let point: { x: number, y: number } = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    }
    private getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        return (
            <div className='control-pane' >
                <style>
                    {SAMPLE_CSS}
                </style>
                    <div className='control-section' >
                    <div className='col-md-8'>
                        <ChartComponent id='charts' 
                           ref={chart => this.chart = chart}
                            primaryXAxis={{
                                valueType: 'DateTime',
                                edgeLabelPlacement: 'Shift',
                                skeleton: 'yMMM',
                                skeletonType: 'Date',
                                scrollbarSettings: {
                                    range: {
                                        minimum: new Date(2009, 0, 1),
                                        maximum: new Date(2014, 0, 1)
                                    },
                                    enable: true,
                                    pointsLength: 1000,
                                    enableZoom: false,
                                    height: 14
                                }
                            }}
                            primaryYAxis={{
                                title: 'Server Load',
                                labelFormat: '{value}MB'
                            }}
                            chartArea={{ border: { width: 0 } }}
                            tooltip={{ enable: true ,shared:true, header : '<b>${point.x}</b>', format : 'Server load : <b>${point.y}</b>'}}
                            legendSettings={{ visible: true }}
                            scrollEnd={this.scrollEnd.bind(this)}
                            load={this.load.bind(this)}
                            title='Network Load' height='450' width='100%' >
                            <Inject services={[LineSeries, DateTime, Tooltip, ScrollBar, Zoom, Crosshair]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={this.GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1))} xName='x' yName='y'
                                    type='Line' animation={{ enable: false }}>
                                </SeriesDirective>
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '40%' }}>
                                    <div>Lazy Load </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent
                                            index={0}
                                            width={120} id="lazymode" ref={drop => this.lazymode = drop} style={{ "width": "auto" }} change={this.modeChange.bind(this)} dataSource={this.droplist} fields={{ text: 'value', value: 'value' }} value="Range" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Min </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DatePickerComponent width={120} ref={min => this.minDate = min} id="datepickermin" style={{ "width": "auto" }} change={this.minChange.bind(this)} value={new Date(2009, 0, 1)} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Max </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DatePickerComponent width={120} ref={max => this.maxDate = max} id="datepickermax" style={{ "width": "auto" }} change={this.maxChange.bind(this)} value={new Date(2014, 0, 1)} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ width: '40%' }}> 
                                <td>
                                    <div id="pointLength">Point Length </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <NumericTextBoxComponent
                                            min={1000}
                                            max={10000}
                                            value={1000}
                                            step={100}
                                            enabled={false}
                                            format={'n'}
                                            width={120} ref={point => this.pointslength = point} id="pointslength" style={{ "width": "auto" }} change={this.pointChange.bind(this)} aria-labelledby="Text"/>
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates lazy loading feature in chart which loads data on demand.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to load data for the chart on demand. The chart will fire the <code>scrollEnd</code> event, and in that event, we can update the chart with the required data based on the point length and axis range. The scrollbar in the chart can be customized using the <code>height</code>, <code>trackColor</code>, <code>trackRadius</code>, <code>scrollbarRadius</code>, <code>scrollbarColor</code>, <code>enableZoom</code>, and <code>gripColor</code> properties in <code>scrollbarSettings</code>.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use lazy loading need to inject <code>ScrollBar</code> and <code>Zoom</code> modules into <code>services</code>.
                </p>
                <p>
                More information about the lazy loading can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#lazy-loading" aria-label="Navigate to the documentation for Lazy loading in React Chart component">documentation section</a>.
                </p>
                </div>
            </div>
        )
    }
    public scrollEnd(args: IScrollEventArgs): void {
      
        if (this.lazymode.value === 'Range') {
            this.chart.series[0].dataSource = this.GetDateTimeData(args.currentRange.minimum as Date, args.currentRange.maximum as Date);
        } else {
            this.chart.series[0].dataSource = this.GetNumericData(args.currentRange.minimum as number, args.currentRange.maximum as number);
        }
        this.chart.dataBind();
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
        replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
}