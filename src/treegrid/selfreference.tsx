import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { projectData } from './data';
import { SampleBase } from '../common/sample-base';

export class SelfReference extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={projectData} treeColumnIndex={1} allowPaging='true' idMapping= 'TaskID' parentIdMapping='parentID'>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Task Name' width='100'></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='EndDate' headerText='End Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='Duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='Progress' headerText='Progress' width='90' textAlign='Right' />
            </ColumnsDirective>
            <Inject services={[Page]} />
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the way of binding self-referential flat data to TreeGrid component.</p>
        </div>
        <div id='description'>
          <p>
          TreeGrid can be bound either to local or remote data services. The <code>dataSource</code> property can be assigned either 
          with the array of JavaScript objects or instance of <code>DataManager</code>.
      </p>
          <p>
          In this demo, the array of self-referential flat data with parent ID is assigned as the data source to the TreeGrid.
      </p>
          <p>
          More information on the self-referential data binding can be found in this documentation section.
         </p>
        </div>
      </div>
    )
  }
}