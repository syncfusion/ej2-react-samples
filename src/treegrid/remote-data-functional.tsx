import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { updateSampleSection } from '../common/sample-base';

const RemoteData = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data = new DataManager({
    url: "https://services.syncfusion.com/react/production/api/SelfReferenceData",
    adaptor: new WebApiAdaptor(),
  });
  return (
    <div className="control-pane">
      <div className="control-section">
        <TreeGridComponent
          dataSource={data}
          hasChildMapping="isParent"
          height="350"
          pageSettings={{ pageCount: 3 }}
          treeColumnIndex={1}
          allowPaging={true}
          idMapping="TaskID"
          parentIdMapping="parentItem"
        >
          <ColumnsDirective>
            <ColumnDirective
              field="TaskID"
              headerText="Task ID"
              width="120"
              textAlign="Right"
            ></ColumnDirective>
            <ColumnDirective
              field="TaskName"
              headerText="Task Name"
              width="140"
            ></ColumnDirective>
            <ColumnDirective
              field="StartDate"
              headerText="Start Date"
              width="110"
              format="yMd"
              textAlign="Right"
            />
            <ColumnDirective
              field="EndDate"
              headerText="End Date"
              width="110"
              format="yMd"
              textAlign="Right"
            />
            <ColumnDirective
              field="StartDate"
              headerText="Start Date"
              width="90"
              format="yMd"
              textAlign="Right"
            />
            <ColumnDirective
              field="Progress"
              headerText="Progress"
              width="90"
            />
          </ColumnsDirective>
          <Inject services={[Page]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the way of binding remote services to Tree
          Grid component. Here, the DataManager is used to bind the remote data
          with Tree Grid.
        </p>
      </div>
      <div id="description">
        <p>
          Tree Grid can be bound to remote services by assigning the{" "}
          <code>dataSource</code> property with the instance of{" "}
          <code>DataManager</code>.
        </p>

        <p>
          The DataManager, which will act as an interface between the service
          endpoint and the Tree Grid, will require the below minimal information
          to interact with service endpoint properly.
        </p>
        <ul>
          <li>
            <code>DataManager-&gt;url</code> - Defines the service endpoint to
            fetch data
          </li>
          <li>
            <code>DataManager-&gt;adaptor</code> - Defines the adaptor option.
            By default, <code>ODataAdaptor</code> is used for remote binding.
          </li>
        </ul>
        <p>
          Adaptor is responsible for processing response and request from/to the
          service endpoint.
          <code>@syncfusion/ej2-data</code> package provides some predefined
          adaptors which are designed to interact with particular service
          endpoints. They are,
        </p>
        <ul>
          <li>
            <code>UrlAdaptor</code> - Use this to interact any remote services.
            This is the base adaptor for all remote based adaptors.
          </li>
          <li>
            <code>ODataAdaptor</code> - Use this to interact with OData
            endpoints.
          </li>
          <li>
            <code>ODataV4Adaptor</code> - Use this to interact with OData V4
            endpoints.
          </li>
          <li>
            <code>WebApiAdaptor</code> - Use this to interact with Web API
            created under OData standards.
          </li>
          <li>
            <code>WebMethodAdaptor</code> - Use this to interact with web
            methods.
          </li>
        </ul>
        <p>
          In this demo, remote data is bound by assigning service data as an
          instance of <code>DataManager</code> to the <code>dataSource</code>{" "}
          property.
        </p>
        <p>
            More information on the remote data binding can be found in this 
            <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/treegrid/data-binding/remote-data/'> documentation section.</a>
          </p>
      </div>
    </div>
  );
}
export default RemoteData;