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
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
         `;
function LazyLoading() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let chart: ChartComponent;
    let intl: Internationalization = new Internationalization();
    let dropElement: DropDownListComponent;
    let minDate: DatePickerComponent; let maxDate: DatePickerComponent;
    let pointslength: NumericTextBoxComponent;
    let lazymode: DropDownListComponent;
    let droplist: { [key: string]: Object }[] = [
        { value: 'Range' },
        { value: 'Points Length' }
    ];
    function minChange(args: ChangedEventArgs): void {
        chart.primaryXAxis.scrollbarSettings.range.minimum = args.value;
        chart.refresh();
    };
    function maxChange(args: ChangedEventArgs): void {
        chart.primaryXAxis.scrollbarSettings.range.maximum = args.value;
        chart.refresh();
    };
    function pointChange(args: NumericChange): void {
        chart.primaryXAxis.scrollbarSettings.pointsLength = args.value;
        chart.refresh();
    };
    function modeChange(arg: ChangeEventArgs): void {
        let min: number | Date;
        let max: number | Date;
        if (arg.value === 'Range') {
            chart.primaryXAxis.valueType = 'DateTime';
            min = chart.primaryXAxis.scrollbarSettings.range.minimum = new Date(2009, 0, 1);
            max = chart.primaryXAxis.scrollbarSettings.range.maximum = new Date(2014, 0, 1);
            chart.series[0].dataSource = GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1));
            chart.refresh();
            minDate.enabled = true;
            maxDate.enabled = true;
            pointslength.enabled = false;
        } else {
            chart.primaryXAxis.valueType = 'Double';
            chart.primaryXAxis.scrollbarSettings.range.minimum = null;
            chart.primaryXAxis.scrollbarSettings.range.maximum = null;
            chart.primaryXAxis.scrollbarSettings.pointsLength = 1000;
            chart.series[0].dataSource = GetNumericData(1, 200);
            chart.refresh();
            minDate.enabled = false;
            maxDate.enabled = false;
            pointslength.enabled = true;
        }
    };
    function GetDateTimeData(start: Date, end: Date): { x: Date, y: number }[] {
        let series1: { x: Date, y: number }[] = [];
        let date: number;
        let value: number = 30;
        let option: DateFormatOptions = {
            skeleton: 'full',
            type: 'dateTime'
        };
        let dateParser: Function = intl.getDateParser(option);
        let dateFormatter: Function = intl.getDateFormat(option);
        for (let i: number = 0; start <= end; i++) {
            date = Date.parse(dateParser(dateFormatter(start)));
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            let point1: { x: Date, y: number } = { x: new Date(date), y: Math.round(value) };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point1);
        }
        return series1;
    }
    function GetNumericData(start: number, end: number): { x: number, y: number }[] {
        let series1: { x: number, y: number }[] = [];
        let value: number = 30;
        for (let i: number = start; i <= end; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            } else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            let point: { x: number, y: number } = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    }
    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return (
        <div className='control-pane' >
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section' >
                <div className='col-md-8'>
                    <ChartComponent id='charts'
                       ref={(scope) => { chart = scope }}
                        primaryXAxis={{
                            title: 'Day',
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
                                pointsLength: 1000
                            }
                        }}
                        primaryYAxis={{
                            title: 'Server Load',
                            labelFormat: '{value}MB'
                        }}
                        chartArea={{ border: { width: 0 } }}
                        tooltip={{ enable: true, shared: true, header: '<b>${point.x}</b>', format: 'Server load : <b>${point.y}</b>' }}
                        legendSettings={{ visible: true }}
                        scrollEnd={scrollEnd.bind(this)}
                        load={load.bind(this)}
                        title='Network Load' height='450' width='100%' >
                        <Inject services={[LineSeries, DateTime, Tooltip, ScrollBar, Zoom, Crosshair]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1))} xName='x' yName='y'
                                type='Line' animation={{ enable: false }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%' }}>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '40%' }}>
                                    <div>Lazy Load </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent
                                            index={0}
                                            width={120} id="lazymode" ref={drop => lazymode = drop} style={{ "width": "auto" }} change={modeChange.bind(this)} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="Range" />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Min </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DatePickerComponent width={120} ref={min => minDate = min} id="datepickermin" style={{ "width": "auto" }} change={minChange.bind(this)} value={new Date(2009, 0, 1)} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Max </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DatePickerComponent width={120} ref={max => maxDate = max} id="datepickermax" style={{ "width": "auto" }} change={maxChange.bind(this)} value={new Date(2014, 0, 1)} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ width: '40%' }}>
                                <td>
                                    <div>Point Length </div>
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
                                            width={120} ref={point => pointslength = point} id="pointslength" style={{ "width": "auto" }} change={pointChange.bind(this)} />
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates lazy laoding feature in chart. Loads data for chart on demand.
                </p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to load data for chart on demand. Chart will fire the
                    <code>scrollEnd</code> event, in that can udpate the chart with required data based on point length
                    and axis range.
                </p>
                <p>
                    ScrollBar is enabled in the sample and ScrollBar module injected to the chart.
                </p>
                <br></br>
                <p>Injecting Module</p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use lazy laoding need to
                    inject <code>ScrollBar</code> and <code>Zoom</code> module into <code>services</code>.
                </p>
                <p>
                    More information about the lazy Loading can be found in this  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#lazy-loading">documentation section</a>.
                </p>
            </div>
        </div>
    )
    function scrollEnd(args: IScrollEventArgs): void {

        if (lazymode.value === 'Range') {
            chart.series[0].dataSource = GetDateTimeData(args.currentRange.minimum as Date, args.currentRange.maximum as Date);
        } else {
            chart.series[0].dataSource = GetNumericData(args.currentRange.minimum as number, args.currentRange.maximum as number);
        }
        chart.dataBind();
    };
    function load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark") as ChartTheme;
    };
}
export default LazyLoading;