import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, VirtualScroll, Inject } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

/**
 * PivotView Performance Sample.
 */

export class Performance extends SampleBase<{}, {}> {

    private SAMPLE_CSS: string = `
        .e-pivotview {
            width: 100%;
            height: 100%;
        }

        #performanceTime {
            float: right;
            margin-top: 7px;
            margin-right: 27px;
        }

        .e-bigger #performanceTime{
            margin-top: 8px;
        }

        @media(max-width: 440px) {
            .control-pane .control-section .performance-time-container {
                margin-bottom: 30px !important;
        
                #performanceTime {
                    float: left;
                }
            }
        }`;

    private pivotObj: PivotViewComponent;
    private ddObj: DropDownListComponent;
    private date1: number;
    private date2: number;
    private isInit: boolean = true;
    private ddlData: { [key: string]: Object }[] = [
        { text: '10,000 Rows and 10 Columns', value: 10000 },
        { text: '1,00,000 Rows and 10 Columns', value: 100000 },
        { text: '1,000,000 Rows and 10 Columns', value: 1000000 }
    ];
    private fields: object = { text: 'text', value: 'value' };
    private customername: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
        'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
    private city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
        'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
    private dataSourceSettings: IDataOptions = {
        dataSource: this.data(10000) as IDataSet[],
        enableSorting: false,
        expandAll: true,
        formatSettings: [{ name: 'Price', format: 'C0' }],
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
    };

    data(count: number) {
        let result: Object[] = [];
        let dt: number = 0;
        for (let i: number = 1; i < (count + 1); i++) {
            dt++;
            let round: string;
            let toString: string = i.toString();
            if (toString.length === 1) {
                round = '0000' + (i);
            }
            else if (toString.length === 2) {
                round = '000' + i;
            }
            else if (toString.length === 3) {
                round = '00' + i;
            } else if (toString.length === 4) {
                round = '0' + i;
            } else {
                round = toString;
            }
            result.push({
                ProductID: 'PRO-' + round,
                City: this.city[Math.round(Math.random() * this.city.length)] || this.city[0],
                Year: "FY " + (dt + 2021),
                CustomerName: this.customername[Math.round(Math.random() * this.customername.length)] || this.customername[0],
                Price: Math.round(Math.random() * 5000) + 5000,
                Sold: Math.round(Math.random() * 80) + 10,
            });
            if (dt / 4 == 1) {
                dt = 0;
            }
        }
        return result;
    };

    onChange(args: ChangeEventArgs) {
        this.isInit = true;
        this.pivotObj.dataSourceSettings.dataSource = this.data(args.value as number) as IDataSet[];
        this.date1 = new Date().getTime();
    }

    onDataBound(): void {
        if ((this.pivotObj.dataSourceSettings.dataSource as IDataSet[]).length > 0) {
            if (this.date1 && this.isInit) {
                this.date2 = new Date().getTime();
                (document as any).getElementById('performanceTime').innerHTML = 'Time Taken: ' + (this.date2 - this.date1) / 1000 + ' sec';
            }
            this.isInit = false;
        }
        if (Browser.isDevice && this.pivotObj && this.pivotObj.enableRtl) {
            (document as any).querySelector('.control-section').classList.add('e-rtl');
        }
    }

    load(): void {
        if (this.isInit) {
            this.date1 = new Date().getTime();
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {this.SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className='performance-time-container' style={{ marginBottom: '15px' }}>
                        <DropDownListComponent id="performance" width='220' dataSource={this.ddlData} index={0} ref={(dropdownlist: any) => { this.ddObj = dropdownlist; }} fields={this.fields} change={this.onChange.bind(this)}
                            placeholder="Select a Data Range" popupHeight="240px">
                        </DropDownListComponent>
                        <span id="performanceTime">Time Taken: 0 sec</span>
                    </div>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { this.pivotObj = pivotview }} dataSourceSettings={this.dataSourceSettings} enableVirtualization={true} width={'100%'} height={300}
                        gridSettings={{ columnWidth: 120 }} dataBound={this.onDataBound.bind(this)} load={this.load.bind(this)}>
                        <Inject services={[VirtualScroll]} />
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how the pivot table loads a large amount of data with ease using virtual scrolling.</p>
                </div>
                <div id="description">
                    <p>This sample demonstrates how the pivot table performs when bound with a million rows in a highly optimized manner by
                        only displaying rows and columns to the current view port using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/pivotview/#enablevirtualization">
                            enableVirtualization</a> property. By choosing from the dropdown list options, a different number of rows
                        can be loaded into the pivot table.
                    </p>
                    <br />
                    <p>
                        <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        The pivot table features are segregated into individual modules. To use the virtual scrolling option,
                        we need to inject the <code> VirtualScroll</code> module using the <code> services</code> tag.
                    </p>
                    <br />
                    <p>
                        More information on the virtual scrolling can be found in this <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/pivotview/virtual-scrolling">
                        documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }
}