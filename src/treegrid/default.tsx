import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='410'>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
              <ColumnDirective field='priority' headerText='Priority' width='90' />
            </ColumnsDirective>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default rendering of the TreeGrid with minimum configuration.</p>
        </div>
        <div id='description'>
          <p>
            The TreeGrid is used to represent the hierarchical data in a tabular format, combining the visual representation of Grid and TreeView controls.
            It represents the data from <code>
              DataManager</code>
 binding data fields to columns or self-referential datasource.
      </p>
          <p>
            In this demo, the TreeGrid is populated with its minimum default settings.
      </p>
          <p>
            More information on the TreeGrid instantiation can be found in this <a target='_blank' href='#'> documentation section.</a>
      </p>

        </div>
      </div>
    )
  }
}