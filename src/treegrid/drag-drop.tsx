import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Selection, RowDD, Inject } from '@syncfusion/ej2-react-treegrid';
import { dragData } from './data';
import { SampleBase } from '../common/sample-base';

export class DragAndDrop extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={dragData} treeColumnIndex={1} childMapping='subtasks' height='410' allowRowDragAndDrop='true'
          selectionSettings={{ type: 'Multiple' }}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right' isPrimaryKey={true}></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='200'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
              <ColumnDirective field='priority' headerText='Priority' width='90' />
            </ColumnsDirective>
            <Inject services={[RowDD, Selection]} />
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the TreeGrid component with the row drag and drop feature within same tree grid. It provides the way to drop the row, above, below or child
            to the target row with the respective to the target row position.</p>
        </div>
        <div id='description'>
          <p>Row drag and drop enabled by setting <code>allowRowDragAndDrop</code> property as true.</p>
          <p>
            TreeGrid features are segregated into individual feature-wise modules. To use row drag and drop feature, we need to inject
            <code>RowDD</code> module into the <code>services</code>.
          </p>
        </div>
      </div>
    )
  }
}