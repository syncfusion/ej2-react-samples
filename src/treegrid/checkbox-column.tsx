import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

// custom code start
const SAMPLE_CSS = `
.e-bigger.bootstrap5 .e-treegrid .e-hierarchycheckbox .e-frame, 
.e-bigger.bootstrap5-dark .e-treegrid .e-hierarchycheckbox .e-frame {
  height: 17px;
  width: 17px;
}
.e-bigger.bootstrap4 .e-treegrid .e-hierarchycheckbox .e-frame {
  height: 18px;
  width: 18px;
}`;

// custom code end
export class CheckboxColumn extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <style>
            {SAMPLE_CSS}
          </style>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' height='410'
            autoCheckHierarchy={true}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='60' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200' showCheckbox={true}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
            </ColumnsDirective>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the checkbox column selection functionality of Tree Grid. Click on any parent record checkbox then the child record checkboxes will get selected and
        parent record checkbox will get selected while checking all of its child items.</p>
        </div>
        <div id='description'>
          <p>
            The Tree Grid component can be rendered with checkbox on existing column and also this
            can be enabled by <code>showCheckbox</code> property as true in columns API.
          </p>
          <p>
            For hierarchy selection between the records, we need to enable the <code>autoCheckHierarchy</code> property.
          </p>  
          <p>
              While using Tree Grid in a touch device, you have an option to select the checkboxes by tapping on the checkbox.
         </p>
          <p>
              More information on the checkbox selection configuration can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/columns#checkbox-column">documentation section</a>.
          </p>
        </div>
      </div>
    )
  }
}
