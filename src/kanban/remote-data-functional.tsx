import * as ReactDOM from 'react-dom';
import * as React from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective, DialogEventArgs } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { DataManager } from '@syncfusion/ej2-data';


/**
 * Kanban Remote Data sample
 */
function RemoteData() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let dataManger: DataManager = new DataManager({
        url: 'https://ej2services.syncfusion.com/react/development/api/Kanban',
        crossDomain: true
    });
    function dialogOpen(args: DialogEventArgs): void {
        args.cancel = true;
    }

    return (
        <div className='kanban-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <KanbanComponent id="kanban" keyField="Status" dataSource={dataManger}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }} allowDragAndDrop={false} dialogOpen={dialogOpen.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Testing" keyField="Testing" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the way of data binding to Kanban component using remote service. The data source of
                    Kanban is fetched from remote service using DataManager.
                </p>
            </div>
            <div id="description">
                <p>
                    The Kanban supports data binding using the <code>dataSource</code> property that can be assigned with the
                    instance of
                    DataManager to bind remote data.
                </p>
                <p>
                    The DataManager, which acts as an interface between the service endpoint and the Kanban will require the below
                    minimal information to interact with service endpoint properly.
                </p>
                <ul>
                    <li><code>DataManager</code> -&gt; <code>url</code>: Defines the service endpoint to fetch the data.</li>
                    <li><code>DataManager</code> -&gt; <code>adaptor</code>: Defines the adaptor option. By default, ODataAdaptor is
                used for remote binding.</li>
                </ul>
                <p>The adaptor is responsible for processing response and request from/to the service endpoint. @syncfusion/ej2-data
                    package provides some predefined adaptors which are designed to interact with particular service endpoints. They
                    are:
                </p>
                <ul>
                    <li>UrlAdaptor - Use this to interact with any remote services. This is the base adaptor for all remote based
                        adaptors.</li>
                    <li>ODataAdaptor - Use this to interact with OData endpoints.</li>
                    <li>ODataV4Adaptor - Use this to interact with OData V4 endpoints.</li>
                    <li>WebApiAdaptor - Use this to interact with Web API created under OData standards.</li>
                    <li>WebMethodAdaptor - Use this to interact with web methods.</li>
                </ul>
                <p>
                    In this demo, remote data is bound by assigning service data as an instance of DataManager to the
                <code>dataSource</code> property.
                </p>
            </div>
        </div>
    );
}
export default RemoteData;
