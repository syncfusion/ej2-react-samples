import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Inject, Toolbar } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class Print extends SampleBase<{}, {}> {

  public toolbarOptions: any = ['Print'];

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks'
            toolbar={this.toolbarOptions} height='410'>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='70' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='180'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='endDate' headerText='End Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='90' textAlign='Right' />
              <ColumnDirective field='progress' headerText='Progress' width='90' textAlign='Right' />
              <ColumnDirective field='priority' headerText='Priority' width='90' />
            </ColumnsDirective>
            <Inject services={[Toolbar]} />
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the option to print the TreeGrid. Click the print button from the toolbar item to print TreeGrid.</p>
        </div>
        <div id="description">
          <p>The TreeGrid can be printed using the <code>print</code> method. While printing the pager and
            scrollbar will be removed if they are enabled in TreeGrid.</p>
          <p>By default, all pages will be printed.We can print current page alone by setting the <code>printMode</code>property
            value as <code>currentpage</code>.</p>
          <p>In this demo, click the print icon to print TreeGrid.</p>
          <p>More information on the print feature can be found in this documentation section.</p>
        </div>
      </div>
    )
  }
}