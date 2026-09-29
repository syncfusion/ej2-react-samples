import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, Filter, Sort, Resize, ColumnMenu, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class GanttColumnMenu extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  public splitterSettings: SplitterSettingsModel = {
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
          <p>This sample demonstrates the column menu feature in the Gantt Chart. Click the menu icon in a column header to access options such as sorting, filtering, auto-fit, and column visibility.</p>
        </div>
        <div id="description">
          <p>
            Gantt has an option to show column menu while clicking the menu icon of each column. The column menu has an integrated option to interact with the features such as sorting, filtering, column chooser, and autoFit.
            This feature can be enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#showcolumnmenu">showColumnMenu</a> to true.
            The default menu items are:
          </p>
          <ul>
            <li><code>SortAscending</code> - Sorts the current column in ascending order.</li>
            <li><code>SortDescending</code> - Sorts the current column in descending order.</li>
            <li><code>AutoFit</code> - Auto-fits the current column.</li>
            <li><code>AutoFitAll</code> - Auto-fits all columns.</li>
            <li><code>ColumnChooser</code> - Toogles the visibility of columns.</li>
            <li><code>Filter</code> - Filters the current column.</li>
          </ul>
          <p>
            In this demo, the column menu feature is enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#showcolumnmenu">showColumnMenu</a> to true with sorting, filtering, column chooser, and autoFit options.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use Column Menu, selection, filter, resize and sort features, we need to inject the <code>ColumnMenu</code>, <code>Selection</code>, <code>Resize</code>, <code>Filter</code>, and <code>Sort</code> into the <code>Inject Services</code> section.</p> 
          <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/columns/column-menu">column menu</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
