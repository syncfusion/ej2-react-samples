import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Inject,
  ColumnMenu, Sort, Resize, Filter } from '@syncfusion/ej2-react-treegrid';
import { sampleData } from './data';
import { SampleBase } from '../common/sample-base';

export class TreeGridColumnMenu extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <TreeGridComponent dataSource={sampleData} treeColumnIndex={1} childMapping= 'subtasks' allowPaging='true'
                pageSettings={{ pageSize: 10 }} allowSorting='true' allowFiltering='true' showColumnMenu='true'
                filterSettings={{ type:'Menu'}} allowResizing='true'>
            <ColumnsDirective>
              <ColumnDirective field='taskID' headerText='Task ID' width='100' textAlign='Right'></ColumnDirective>
              <ColumnDirective field='taskName' headerText='Task Name' width='150'></ColumnDirective>
              <ColumnDirective field='startDate' headerText='Start Date' width='90' format='yMd' textAlign='Right' />
              <ColumnDirective field='duration' headerText='Duration' width='80' textAlign='Right'/>
              <ColumnDirective field='progress' headerText='Progress' width='80' textAlign='Right'/>
              <ColumnDirective field='priority' headerText='Priority' width='80' />
            </ColumnsDirective>
            <Inject services={[Page, ColumnMenu, Sort, Resize, Filter]}/>
          </TreeGridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the Column Menu. Click on multiple icon of
              each column to open the column menu.</p>
        </div>
        <div id='description'>
          <p>TreeGrid has an option to show column menu while click on multiple icon of each column. The column menu has
              an integrated option to interact the features like sorting, filtering, column chooser and and autoFit.
              This features can be enabled by defining the <code>showColumnMenu</code> as true. The default items are
          </p>
          <ul>
            <li><code>SortAscending</code> - Sort the current column in ascending order.</li>
            <li><code>SortDescending</code> - Sort the current column in descending order.</li>
            <li><code>AutoFit</code> - Auto fit current column.</li>
            <li><code>AutoFitAll</code> - Auto fit all columns.</li>
            <li><code>ColumnChooser</code> - Choose the column visibility.</li>
            <li><code>Filter</code> - Filter option is shown to filter the current column.</li>
          </ul>
          <p>In this demo, Column Menu feature has enabled by defining <code>showColumnMenu
            </code> as true with sorting, filtering, column chooser and autoFit options.
          </p>
          <p>Injecting Module:</p>
          <p>TreeGrid features are segregated into individual feature-wise modules. To use column menu feature, we need to inject 
          <code>ColumnMenu</code> module into the <code>services</code>.</p>
          <p>More information about Column Menu can be found in this documentation section.</p>
        </div>
      </div>
    )
  }
}