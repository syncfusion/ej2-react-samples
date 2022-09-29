import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-grids';
import { DataManager, WebApiAdaptor, Query, DataOptions } from '@syncfusion/ej2-data';
import { updateSampleSection } from '../common/sample-base';

function RemoteDataBinding() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
    const data = new DataManager({ url: hostUrl + 'api/Orders', adaptor: new WebApiAdaptor });
    let gridInstance: GridComponent;
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GridComponent id="Grid" dataSource={data} ref={grid => gridInstance = grid} allowPaging={true} pageSettings={{ pageCount: 3 }} >
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
                    href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#datasource">
                    dataSource
                </a></code> property can be assigned with the instance of <code><a target="_blank" className="code"
                    href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">
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
                    href="http://ej2.syncfusion.com/documentation/data/api-dataManager.html">
                    DataManager</a></code> to the <code><a target="_blank" className="code"
                        href="http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#datasource">
                        dataSource
                    </a></code> property.</p>

                <p>
                    More information on the data binding can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/grid/data-binding.html#remote-data">documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default RemoteDataBinding;