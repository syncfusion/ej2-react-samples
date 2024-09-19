/**
 * MultiColumnComboBox Remote Databinding Sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MultiColumnComboBoxComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-multicolumn-combobox';
import { SampleBase } from '../common/sample-base';
import './remote-databinding.css';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';

export class Remote extends SampleBase<{}, {}> {
    dataSource: DataManager = new DataManager({
        url: 'https://services.syncfusion.com/js/production/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    fields:object = { text: 'FirstName', value: 'EmployeeID' };
    query: Query = new Query().select(['FirstName', 'EmployeeID', 'Designation', 'Country']).take(10).requiresCount();

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className='control-wrapper remote-multicolumn'>
                        <div style={{ paddingTop: '60px'}}>
                            <MultiColumnComboBoxComponent dataSource={this.dataSource} fields={this.fields} query={this.query} placeholder='Select a name' popupHeight={'230px'} allowSorting={false}>
                                <ColumnsDirective>
                                    <ColumnDirective field='EmployeeID' header='Employee ID' width={120}></ColumnDirective>
                                    <ColumnDirective field='FirstName' header='Name' width={130}></ColumnDirective>
                                    <ColumnDirective field='Designation' header='Designation' width={120}></ColumnDirective>
                                    <ColumnDirective field='Country' header='Country' width={90}></ColumnDirective>
                                </ColumnsDirective>
                            </MultiColumnComboBoxComponent>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the remote data-binding supported in the MultiColumn ComboBox.</p>
                </div>

                <div id="description">
                    <p>The MultiColumn ComboBox loads the remote data services through the <code>dataSource</code> property. It supports data types such as <code>JavaScript object arrays</code> or <code>DataManager</code>.</p>
                    <p>The <code>DataManager</code>, act as an interface between service endpoint and MultiColumn ComboBox will require the following minimal information to interact with the service endpoint properly.</p>
                    <ul>
                        <li><code>DataManager{'->'}url</code> - Defines the service endpoint to fetch data.</li>
                        <li><code>DataManager{'->'}adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for
                            remote binding.</li>
                    </ul>
                    <p>The adaptor is responsible for processing response and request from/to the service endpoint.
                        <code>@syncfusion/ej2-data</code> package provides some predefined adaptors which are designed to interact with particular
                        service endpoints. They are:</p>
                    <ul>
                        <li><code>UrlAdaptor</code> - Use this to interact any remote services.</li>
                        <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                        <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                        <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                        <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                    </ul>
                    <p>In this sample, remote data is bound to a collection of employees data as an instance of <code>DataManager</code> and <code>WebApiAdaptor</code>.</p>
                </div>
            </div>
        )
    }
}
