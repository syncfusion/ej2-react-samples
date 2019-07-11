import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { DataManager, Query, ReturnOption, WebApiAdaptor } from '@syncfusion/ej2-data';

/**
 * PivotView sample for Remote data source.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}`;

let remoteData: IDataSet[];
let dataSourceSettings: IDataOptions;
new DataManager({
    url: 'https://bi.syncfusion.com/northwindservice/api/orders',
    adaptor: new WebApiAdaptor,
    crossDomain: true
}).executeQuery(new Query().take(8)).then((e: ReturnOption) => {
    remoteData = e.result as IDataSet[];
    dataSourceSettings = {
        dataSource: remoteData as IDataSet[],
        expandAll: true,
        filters: [],
        columns: [{ name: 'ProductName', caption: 'Product Name' }],
        rows: [{ name: 'ShipCountry', caption: 'Ship Country' }, { name: 'ShipCity', caption: 'Ship City' }],
        formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
        values: [{ name: 'Quantity' }, { name: 'UnitPrice', caption: 'Unit Price' }]
    }
});

export class Remote extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section' style={{ overflow: 'auto' }}>
                    <PivotViewComponent id='PivotView' dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} gridSettings={{columnWidth: 120}}>
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates basic rendering of the pivot table bound to JSON data pulled from a remote server.</p>
                </div>
                <div id="description">
                    <p>The pivot table supports JSON data source. The
                        <code>dataSourceSettings->dataSource</code> property can be assigned with the result of DataManager to bind remote data.</p>
                                    The
                    <code>DataManager</code>, which will act as an interface between the service endpoint and the pivot table, will require the below minimal
                                    information to interact with service endpoint properly.
                    <ul>
                        <li>
                            <code>DataManager->url</code> - Defines the service endpoint to fetch data.</li>
                        <li>
                            <code>DataManager->adaptor</code> - Defines the adaptor option. Here,
                            <code>WebApiAdaptor</code> is used for remote binding.</li>
                                    </ul>
                                    In this demo, remote data is bound by assigning service data as an instance of
                    <code>DataManager</code> to the
                    <code>dataSourceSettings->dataSource</code> property.
                </div>
            </div>
        )
    }
}