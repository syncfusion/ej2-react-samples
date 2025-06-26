import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  VirtualScroll,
} from '@syncfusion/ej2-react-treegrid';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { updateSampleSection } from '../common/sample-base';

const RemoteVirtual = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const data = new DataManager({
    url: 'https://services.syncfusion.com/react/production/api/TreeUrlDataSource',
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });
  return (
    <div className="control-pane">
      <div className="control-section">
        <TreeGridComponent
          dataSource={data}
          idMapping="TaskID"
          parentIdMapping="ParentValue"
          hasChildMapping="isParent"
          expandStateMapping="IsExpanded"
          height="450"
          enableVirtualization={true}
          loadChildOnDemand={true}
          pageSettings={{ pageSize: 20 }}
          treeColumnIndex={1}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="TaskID"
              headerText="Task ID"
              width="80"
              textAlign="Right"
            ></ColumnDirective>
            <ColumnDirective
              field="TaskName"
              headerText="Task Name"
              width="200"
            ></ColumnDirective>
            <ColumnDirective
              field="StartDate"
              headerText="Start Date"
              width="90"
              format="yMd"
              textAlign="Right"
            />
            <ColumnDirective
              field="EndDate"
              headerText="End Date"
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
          <Inject services={[Page, VirtualScroll]} />
        </TreeGridComponent>
      </div>
      <div id="action-description">
        <p>This example demonstrates how to load child records on demand in the Tree Grid when using remote data. During the initial render, only parent rows are loaded and displayed in a collapsed state. Child records are fetched dynamically when a parent row is expanded.</p>
      </div>
      <div id="description">
        The <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/treegrid/#loadchildondemand'>LoadChildOnDemand</a> property is enabled by default, allowing the Tree Grid to initially render only parent records initially. This behavior is supported only for remote data sources and helps improve performance by minimizing the initial load. If LoadChildOnDemand is set to false, both parent and child records are loaded together during the initial rendering, and all rows are displayed in an expanded state.
        In this demo, Tree Grid features such as <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/treegrid/virtual-scroll'>Virtualization</a>, and the <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/treegrid/data-binding/remote-data'>DataManager</a> are used.
      </div>
    </div>
  );
}
export default RemoteVirtual;