import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';
export class RowHover extends SampleBase {
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
            <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='350' enableHover='true'>
              <ColumnsDirective>
                <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
                <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
                <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' type='date' textAlign='Right'/>
                <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' type='date' textAlign='Right'/>
                <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
                <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
                <ColumnDirective field='priority' headerText='Priority' width='90'/>
              </ColumnsDirective>
          </TreeGridComponent>
      </div>
        <div id="action-description">
          <p>This sample demonstrates the TreeGrid component with the row hover feature. Move the mouse over the 
              TreeGrid rows to see the hover effect.</p>
        </div>
        <div id='description'>
          <p>Row Hover feature enables us to identify the current row by highlighting them with the mouse hovers. This can be enabled by 
              setting the <code>enableHover</code> property as true,
          </p>
          <p>In this demo, by enabling the <code>enableHover</code> property, you can move the mouse
              over TreeGrid rows to see the hover effect.
          </p>
        </div>
      </div>);
    }
}
