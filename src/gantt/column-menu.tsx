import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, Filter, Sort, Resize, ColumnMenu, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class GanttColumnMenu extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID:'ParentId'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: any = {
    columnIndex: 4
};
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('07/20/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' treeColumnIndex={1} showColumnMenu={true} allowFiltering={true} allowSorting={true}
            allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='100' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency' width={190}></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, Filter, Sort, Resize, ColumnMenu]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the  column menu. Click on multiple icon of each column to open the column menu.</p>
        </div>
        <div id="description">
          <p>
            Gantt has an option to show column menu while clicking multiple icon of each column. The column menu has an integrated option to interact with the features such as sorting, filtering, column chooser, and autoFit.  
            This feature can be enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#showcolumnmenu">showColumnMenu</a> to true.
            The default items are,
          </p>
          <ul>
            <li><code>SortAscending</code> - Sorts the current column in ascending order.</li>
            <li><code>SortDescending</code> - Sorts the current column in descending order.</li>
            <li><code>AutoFit</code> - Auto-fit current column.</li>
            <li><code>AutoFitAll</code> - Auto-fit all columns.</li>
            <li><code>ColumnChooser</code> - Chooses the column visibility.</li>
            <li><code>Filter</code> - Filters the current column.</li>
          </ul>
          <p>
            In this demo, the column menu feature is enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#showcolumnmenu">showColumnMenu</a> to true with sorting, filtering, column chooser, and autoFit options.</p>
          <b>Injecting Module:</b>
          <p>Gantt features are segregated into individual feature-wise modules. To use column menu feature, we need to inject <code>ColumnMenu</code> module into the <code>services</code>.</p>
          <br />
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-menu">documentation section</a>.</p>
        </div>
      </div>
    )
  }
}
