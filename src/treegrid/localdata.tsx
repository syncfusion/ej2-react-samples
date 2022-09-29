import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class LocalData extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' height='410'>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right' />
              <ColumnDirective field='priority' headerText='Priority' width='90' />
            </ColumnsDirective>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This demo shows the way of binding an array of JavaScript objects (local JSON datasource) to Tree Grid.</p>
        </div>
        <div id='description'>
          <p>
          Tree Grid can be bound either to local or remote data services. The <code>dataSource</code> property can be assigned either 
          with the array of JavaScript objects or instance of <code>DataManager</code>.
      </p>
          <p>
          In this demo, the array of JavaScript objects is assigned as the data source to the Tree Grid.
      </p>
          <p>
            More information on the local data binding can be found in this 
            <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/treegrid/data-binding/local-data/'> documentation section.</a>
          </p>
        </div>
      </div>
    )
  }
}
