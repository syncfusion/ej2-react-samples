import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject, ColumnChooser, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class TreeGridColumnChooser extends SampleBase<{}, {}> {
  public toolbarOptions: any = ['ColumnChooser'];
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' allowPaging='true'
                pageSettings={{ pageSize: 10 }} showColumnChooser='true' toolbar={this.toolbarOptions}>
              <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='150' showInColumnChooser={false}></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
              <ColumnDirective field='priority' headerText='Priority' width='80' />
            </ColumnsDirective>
            <Inject services={[Page, Toolbar,ColumnChooser]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the column chooser feature in Tree Grid. Click the column chooser
             icon in the toolbar to open column chooser and you can select columns to hide/show from the checkbox list. 
           </p>
        </div>
        <div id='description'>
          <p>The Tree Grid columns can be shown/hidden dynamically by using column chooser. To enable
             column chooser behavior, set <code>showColumnChooser</code> property as true. You can also prevent
             the display of a column by setting <code>columns->showInColumnChooser</code> as false in columns definition.</p>
          <p>In this demo, when the user clicks column chooser icon from the toolbar then the column 
             chooser menu will open. User can show or hide the columns by changing the state of the checkbox. </p>
          <p>Injecting Module:</p>
          <p>Tree Grid features are segregated into individual feature-wise modules. To use column chooser 
             feature, we need to inject <code>ColumnChooser</code> module into the <code>services</code>.</p>
          <p>More information about Column Chooser can be found in this
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-chooser.html">
            documentation section.</a></p>
        </div>
      </div>
    )
  }
}