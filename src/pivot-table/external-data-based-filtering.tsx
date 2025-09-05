import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import './external-data-based-filtering.css';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import * as rData from './pivot-data/pivotData.json';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';

/**
 * PivotView ExternalDataBasedFiltering Sample.
 */

let Pivot_Data: IDataSet[] = (rData as any).data;
let startDate: Date = new Date('2024-01-01');
let endDate: Date = new Date('2024-12-01');
interface IState {
    dataSourceSettings: any;
}

export class ExternalDataBasedFiltering extends SampleBase<{}, IState> {
    public pivotObj: PivotViewComponent;

     constructor(props: {}) {
        super(props);
        this.state = {
            dataSourceSettings: {
                dataSource: [],
                enableSorting: true,
                expandAll: true,
                columns: [
                    { name: 'Country' },
                    { name: 'Product' }
                ],
                rows: [
                    { name: 'OrderDate' }
                ],
                values: [
                    { name: 'Amount', caption: 'Total Sales' }
                ],
                drilledMembers: [{ name: 'Country', items: ['Canada'] }],
                formatSettings: [{ name: 'Amount', format: 'C0' }, { name: 'OrderDate', format: 'dd/MM/yyyy', type: 'date' }],
                filters: [],
                groupSettings: [{ name: 'OrderDate', groupInterval: ['Years', 'Months'] }]
            }
        };
    }

    componentDidMount() {
        this.applyDateFilter();
    }

    setStartDate(args): void {
        startDate = args.value;
    }

    setEndDate(args): void {
        endDate = args.value;
    }

    applyDateFilter(): void {
        if (startDate && endDate) {
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            let pivotData = (Pivot_Data as any).map((item: any) => ({
                ...item,
                OrderDate: new Date(item.OrderDate),
            }));
            new DataManager({ json: pivotData, adaptor: new JsonAdaptor() }).executeQuery(
                new Query()
                    .where('OrderDate', 'greaterthanorequal', startDate)
                    .where('OrderDate', 'lessthanorequal', endDate)
            )
            .then((e: any) => {
                this.setState({
                    dataSourceSettings: {
                        ...this.state.dataSourceSettings,
                        dataSource: e.result,
                    }
                });
            });
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div style={{ padding: '0px 10px' }}>
                        <strong style={{ display: 'inline-block', fontSize: '14px', marginRight: '5px' }}>Start Date:</strong>
                        <DatePickerComponent
                            id='start-datepicker'
                            placeholder='Choose a start date'
                            min={new Date(2019, 0, 1)}
                            max={new Date(2024, 10, 31)}
                            value={startDate}
                            width={200}
                            format='MMM yyyy'
                            start='Year'
                            depth='Year'
                            change={(args) => this.setStartDate(args)}
                            cssClass='pivot-datepicker'
                        />
                        <strong style={{ display: 'inline-block', fontSize: '14px', marginRight: '5px' }}>End Date:</strong>
                        <DatePickerComponent
                            id='end-datepicker'
                            placeholder='Choose an end date'
                            min={new Date(2019, 1, 1)}
                            max={new Date(2024, 11, 31)}
                            value={endDate}
                            width={200}
                            format='MMM yyyy'
                            start='Year'
                            depth='Year'
                            change={(args) => this.setEndDate(args)}
                            cssClass='pivot-datepicker'
                        />
                        <ButtonComponent
                            id='apply'
                            cssClass='e-primary'
                            style={{ width: '80px' }}
                            onClick={this.applyDateFilter}
                        >
                            Apply
                        </ButtonComponent>
                    </div>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotObj = pivotview }} dataSourceSettings={this.state.dataSourceSettings}
                        width={'100%'} height={'500'} gridSettings={{ columnWidth: 140 }}>
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to apply an external date range filter to the Pivot Table data source, enhancing
                        performance and responsiveness when working with large datasets.</p>
                </div>
                <div id="description">
                    <p>In this sample, date filtering is performed externally by updating the Pivot Table's data source based on a
                        selected date range. Users can choose a <b>Start Date</b> and <b>End Date</b> using date pickers, and the table
                        updates to show only the records that fall within that range.</p>
                    <p>This external filtering method improves performance by avoiding in-component filtering. Instead, the data is
                        pre-filtered at runtime using a custom <code>applyDateFilter</code> function, which compares the selected date
                        range with each record's date in the original dataset. This reduces the processing load on the Pivot Table and
                        results in a more responsive user experience</p>
                    <p><b> Note:</b> Aggregation in the Pivot Table is performed only on the filtered data. Any records outside the
                        selected date range are excluded from the summary calculations.</p>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Pivot Table can be found in this <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/getting-started#adding-pivot-table-component">
                            documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}