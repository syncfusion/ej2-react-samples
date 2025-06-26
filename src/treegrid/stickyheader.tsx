import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class StickyHeader extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping='subtasks' enableStickyHeader={true}>
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
               <p>This sample demonstrates the Tree Grid component with the sticky header feature. In this sample, while scrolling the demo page, the Tree Grid header will be fixed at the top of its parent element.
    </p>
            </div>
            <div id="description">
                <p>The Tree Grid headers can be fixed while scrolling its first scrollable parent element. It can be done by setting the<code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/treegrid/#enablestickyheader">enableStickyHeader</a></code> property.</p>
                <p>More information on the sticky header can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-resizing#resize-stacked-column">documentation section.</a></p>

            </div>
      </div>
    )
  }
}