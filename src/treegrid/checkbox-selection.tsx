import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class CheckboxSelection extends SampleBase<{}, {}> {

  public selectionsettings: Object = { persistSelection: true };

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={2} childMapping='subtasks' height='350' allowPaging={true}
            selectionSettings={this.selectionsettings}>
            <ColumnsDirective>
              <ColumnDirective type='checkbox' width='50'></ColumnDirective>
              <ColumnDirective field='taskID' isPrimaryKey={true} headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
              <ColumnDirective field='priority' headerText='Priority' width='90' />
            </ColumnsDirective>
            <Inject services={[Page]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the selection functionality of the Tree Grid using checkbox selection, To select and unselect all rows use header checkbox.
              To select/unselect particular row, click the desired row.</p>
        </div>
        <div id='description'>
          <p>
            Tree Grid mutliple selection can be achieved with help of checkbox in each row. To render checkbox in each Tree Grid row, you need
            to define column type as <code>checkbox</code> using <code>columns-&gt;type</code> property.
          </p>
          <p>
              Selection can be persisted on all the operations using <code>selectionSettings-&gt; persistSelection</code> property.
              For persisting selection on the Tree Grid, any one of the column should be defined as a primary key using <code> columns-&gt;isPrimaryKey</code> property.
          </p>
          <p>
            In this demo, Tree Grid mutliple selection has been enabled with selection persistance.
          </p>
          <p>
            More information on the checkbox selection configuration can be found in this documentation section.
          </p>
        </div>
      </div>
    )
  }
}