import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';

export class RemoteData extends SampleBase<{}, {}> {
  public data = new DataManager({ url: 'https://ej2services.syncfusion.com/production/web-services/api/SelfReferenceData',
    adaptor: new WebApiAdaptor  });
  public treegridInstance: TreeGridComponent;
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={this.data} ref={treegrid => this.treegridInstance = treegrid} hasChildMapping='isParent'
              pageSettings={{ pageCount: 3 }} treeColumnIndex={1} allowPaging='true' idMapping= 'TaskID' parentIdMapping='parentItem'>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='Task ID' width='120' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Task Name' width='140'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start Date' width='110' format='yMd' textAlign='Right' />
              <ColumnDirective field='EndDate' headerText='End Date' width='110' format='yMd' textAlign='Right' />
              <ColumnDirective field='StartDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='Progress' headerText='Progress' width='90' />
            </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
        <div id="action-description">
    <p>This sample demonstrates the way of binding remote services to Tree Grid component. Here, the DataManager is used to bind the remote data with Tree Grid.
    </p>
</div>
    <div id="description">
        <p>Tree Grid can be bound to remote services by assigning the <code>dataSource</code> property with the instance of <code>
                DataManager</code>.</p>

        <p>The DataManager, which will act as an interface between the service endpoint and the Tree Grid, will require the below minimal information to interact with service endpoint properly.
        </p>
        <ul>
            <li><code>DataManager->url</code> - Defines the service endpoint to fetch data</li>
            <li><code>DataManager->adaptor</code> - Defines the adaptor option. By default, <code>ODataAdaptor</code> is used
                for remote binding.</li>
        </ul>
        <p>Adaptor is responsible for processing response and request from/to the service endpoint.
            <code>@syncfusion/ej2-data</code> package provides some predefined adaptors which are designed to interact with
            particular service endpoints. They are,</p>
        <ul>
            <li><code>UrlAdaptor</code> - Use this to interact any remote services. This is the base adaptor for all remote based
                adaptors.</li>
            <li><code>ODataAdaptor</code> - Use this to interact with OData endpoints.</li>
            <li><code>ODataV4Adaptor</code> - Use this to interact with OData V4 endpoints.</li>
            <li><code>WebApiAdaptor</code> - Use this to interact with Web API created under OData standards.</li>
            <li><code>WebMethodAdaptor</code> - Use this to interact with web methods.</li>
        </ul>
        <p>In this demo, remote data is bound by assigning service data as an instance of <code>DataManager</code> to the <code>dataSource
        </code> property.</p>
        <p>
            More information on the data binding can be found in this documentation section.
        </p>
    </div>
      </div>
    )
  }
}