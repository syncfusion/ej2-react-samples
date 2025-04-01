import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { DataManager, WebApiAdaptor, Query, DataOptions } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './remote-data.css';

export class RemoteDataBinding extends SampleBase<{}, {}> {
    public hostUrl = 'https://services.syncfusion.com/react/production/';
    public data = new DataManager({ url: this.hostUrl + 'api/Orders', adaptor: new WebApiAdaptor  });
    public gridInstance: GridComponent;
    public onChanged(args: any) {
        this.gridInstance.dataSource = new DataManager({ url: this.hostUrl + 'api/Orders', adaptor: new WebApiAdaptor, enableCache: args.checked });
    }
    render() {
        return (
            <div className='control-pane'>
                 <div className='control-section'>
                    <div style={{ display: 'flex' }}>
                        <div id="export-cache-container">
                            <label htmlFor="unchecked"> Enable Cache </label>
                            <div>
                                <SwitchComponent id="unchecked" checked={false} change={this.onChanged.bind(this)}></SwitchComponent>
                            </div>
                        </div>
                    </div>
                    <GridComponent id="Grid" dataSource={this.data} ref={grid => this.gridInstance = grid} allowPaging={true} >
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' width='120' textAlign='Right'></ColumnDirective>
                            <ColumnDirective field='CustomerID' headerText='Customer ID' width='160'></ColumnDirective>
                            <ColumnDirective field='EmployeeID' headerText='Employee ID' width='120' textAlign='Right' />
                            <ColumnDirective field='Freight' headerText='Freight' width='150' format='C2' textAlign='Right' />
                            <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page]} />
                    </GridComponent>
                </div>
                
                <div id='waitingpopup' className='waitingpopup'>
                    <span id='gif' className='image'></span>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the way of data binding Grid component with remote service. The Grid data source is bound to
        remote data using DataManager.
    </p>
                </div>
                <div id='description'>
                    <p>The Grid supports data binding. The <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/react/documentation/api/grid#datasource">
                        dataSource
        </a></code> property can be assigned with the instance of <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/documentation/api/data/dataManager/">
                            DataManager</a></code> to bind remote data.</p>

                    <p>The DataManager, which will act as an
            interface between the service endpoint and the Grid, will require the below minimal information to interact with service endpoint properly.
        </p>
                    <ul>
                        <li><code>DataManager-&gt;url</code> - Defines the service endpoint to fetch data</li>
                        <li><code>DataManager-&gt;adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used for remote binding.</li>
                    </ul>
                    <p>Adaptor is responsible for processing response and request from/to the service endpoint. <code>@syncfusion/ej2-data</code> package provides
        some predefined adaptors which are designed to interact with particular service endpoints. They are,</p>
                    <ul>
                        <li><code>UrlAdaptor</code> - Use this to interact any remote services. This is the base adaptor for all remote based adaptors.</li>
                        <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
                        <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
                        <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
                        <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
                    </ul>
                    <p>In this demo, remote data is bound by assigning service data as an instance of <code><a target="_blank" className="code"
                        href="https://ej2.syncfusion.com/documentation/api/data/dataManager/">
                        DataManager</a></code> to the <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid#datasource">
                            dataSource
        </a></code> property.</p>
        <p>The <code>DataManager</code> provides an option to avoid sending requests for previously visited pages by enabling the <code>enableCache</code> property.
            When this property is enabled, the DataManager does not send a request to the server when revisiting a page. 
            However, the cache will be reset if any data action, such as sorting or filtering, is performed.
        </p>
                    <p>
                        More information on the data binding can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/data-binding.html#remote-data">documentation section</a>.
        </p>
                </div>
            </div>
        )
    }
}
