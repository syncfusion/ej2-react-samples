import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, DayMarkers, Sort, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel, SortSettingsModel } from '@syncfusion/ej2-react-gantt';
import { editingData } from './data';
import { SampleBase } from '../common/sample-base';

export class Sorting extends SampleBase<{}, {}> {
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
    columnIndex: 2
  };
  public sortSettings: SortSettingsModel = {
    columns: [{ field: 'TaskName', direction: 'Ascending' }, { field: 'TaskID', direction: 'Ascending' }]
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('09/01/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Sorting' dataSource={editingData} highlightWeekends={true} allowSelection={true}
            taskFields={this.taskFields} splitterSettings={this.splitterSettings} treeColumnIndex={1}
            labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46} selectedRowIndex={0} sortSettings={this.sortSettings} allowSorting={true}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' visible={false} width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers, Sort]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the sorting feature in the Gantt Chart. To sort multiple columns, hold the CTRL key and click the desired column headers.</p>
        </div>

        <div id="description">
          <p>The Gantt Chart supports both single-column and multi-column sorting, allowing task data to be arranged in ascending or descending order. Sorting can be enabled by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowsorting">allowSorting</a> to <code>true</code>.</p>
          <p>To sort a column, click its header. Repeated clicks toggle the sort direction between ascending and descending order. Sort indicators in the column header visually represent the current sort direction.</p>
          <p>Multi-sorting is enabled by default. To sort by multiple columns, hold the <strong>CTRL</strong> key and click additional column headers. To remove sorting from a column, hold the <strong>SHIFT</strong> key and click its header. In this example, initial multi-column sorting is applied using the <code>sortSettings</code> property to sort tasks by <strong>Task Name</strong> and <strong>Task ID</strong> in ascending order.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use a selection, markers and sorting features, we need to inject the <code>Selection</code>, <code>DayMarkers</code> and <code>Sort</code> into the <code>Inject Services</code> section.</p>
          <br />
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/sorting">sorting</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
