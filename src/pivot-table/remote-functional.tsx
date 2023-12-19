import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import './remote.css';

/**
 * PivotView sample for Remote data source.
 */

function Remote () {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let pivotObj: PivotViewComponent;
    let fields: object = { text: 'text', value: 'value' };
    let contentTypes: { [key: string]: Object }[] = [
        { 'value': 'JSON', 'text': 'JSON' },
        { 'value': 'CSV', 'text': 'CSV' }
    ];

    let remoteData: DataManager = new DataManager({
        url: 'https://bi.syncfusion.com/northwindservice/api/orders',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    let jsonReport: IDataOptions = {
        dataSource: remoteData as DataManager,
        type: 'JSON',
        expandAll: true,
        filters: [],
        columns: [{ name: 'ProductName', caption: 'Product Name' }],
        rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
        formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
        values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
    };

    let csvReport: IDataOptions = {
        url: 'https://bi.syncfusion.com/productservice/api/sales',
        type: 'CSV',
        expandAll: false,
        enableSorting: true,
        formatSettings: [{ name: 'Total Cost', format: 'C0' }, { name: 'Total Revenue', format: 'C0' }, { name: 'Total Profit', format: 'C0' }],
        drilledMembers: [{ name: 'Item Type', items: ['Baby Food'] }],
        rows: [
            { name: 'Region' },
            { name: 'Country' }
        ],
        columns: [
            { name: 'Item Type' },
            { name: 'Sales Channel' }
        ],
        values: [
            { name: 'Total Cost' },
            { name: 'Total Revenue' },
            { name: 'Total Profit' }
        ],
        filters: []
    };


    function ddlOnChange(args: ChangeEventArgs): void {
        if (args.value === 'JSON') {
            pivotObj.dataSourceSettings = jsonReport;
        } else if (args.value === 'CSV') {
            pivotObj.dataSourceSettings = csvReport;
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section component-section' style={{ overflow: 'auto' }}>
                <div id='dropdown-control' style={{ marginBottom: '5px' }}>
                    <table style={{ width: '350px' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div><b>Content Type:</b>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div>
                                            <DropDownListComponent placeholder={'Content Type'} fields={fields} change={ddlOnChange.bind(this)} id="contenttype" index={0} enabled={true} dataSource={contentTypes} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotObj = pivotview }} dataSourceSettings={jsonReport} width={'100%'} height={'300'} gridSettings={{ columnWidth: 120 }}>
                </PivotViewComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates basic rendering of the pivot table bound to JSON or CSV data pulled from a remote server.</p>
            </div>
            <div id="description">
                <p>The pivot table supports JSON and CSV data source. The
                    <code>dataSourceSettings-&gt;dataSource</code> property can be assigned with the result of DataManager to bind remote data.</p>
                                The
                <code>DataManager</code>, which will act as an interface between the service endpoint and the pivot table, will require the below minimal
                                information to interact with service endpoint properly.
                <ul>
                    <li>
                        <code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data.</li>
                    <li>
                        <code>DataManager-&gt;adaptor</code> - Defines the adaptor option. Here,
                        <code>WebApiAdaptor</code> is used for remote binding.</li>
                </ul>
                                In this demo, remote data is bound by assigning service data as an instance of
                <code>DataManager</code> to the
                <code>dataSourceSettings-&gt;dataSource</code> property. But for CSV, the service URL is directly set to <code>url</code> for remote data consumption.
            </div>
        </div>
    )
}

export default Remote;