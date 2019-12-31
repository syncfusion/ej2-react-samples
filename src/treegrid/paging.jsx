import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
export class Paging extends SampleBase {
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' allowPaging='true' pageSettings={{ pageSizes: true, pageSize: 10, pageCount: 2 }}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right'/>
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right'/>
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
              <ColumnDirective field='priority' headerText='Priority' width='80'/>
            </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the TreeGrid paging feature. In this sample, click the numeric items to navigate to another page. 
              You can also change the page size using the dropdown.</p>
        </div>
        <div id='description'>
          <p>Paging allows you to display the contents of the TreeGrid in page segments. By default, paging is disabled. To enable paging,
              set <code>allowPaging</code> property to true. <code>pageSettings->pageSizes</code> property enables a dropdown in pager
              which allows you to change the number of records in the TreeGrid dynamically.</p>
          <p>In this demo, the TreeGrid is rendered with <code>pageSettings->pageSizes</code> set to true and have an option 
              to change the pagesize of treegrid dynamically.</p>
          <p>Injecting Module:
              TreeGrid features are segregated into individual feature-wise modules. To use paging feature, we need to inject <code>Page</code> 
                module into the <code>services</code>.
          </p>
          <p>
             More information on the paging configuration can be found in this documentation section.
          </p>
        </div>
      </div>);
    }
}
