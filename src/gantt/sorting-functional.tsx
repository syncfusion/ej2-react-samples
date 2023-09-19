import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, Sort, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { editingData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Sorting = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  const labelSettings: any = {
    leftLabel: 'TaskName'
  };
  const splitterSettings: any = {
    columnIndex: 2
  };
  const sortSettings: any = {
    columns: [{ field: 'TaskName', direction: 'Ascending' }, { field: 'TaskID', direction: 'Ascending' }]
  };
  const projectStartDate: Date = new Date('03/25/2019');
  const projectEndDate: Date = new Date('07/28/2019');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='Sorting' dataSource={editingData} highlightWeekends={true} allowSelection={true}
          taskFields={taskFields} splitterSettings={splitterSettings} treeColumnIndex={1}
          labelSettings={labelSettings} height='410px' selectedRowIndex={0} sortSettings={sortSettings} allowSorting={true}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate' ></ColumnDirective>
            <ColumnDirective field='Duration' ></ColumnDirective>
            <ColumnDirective field='Progress' ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, DayMarkers, Sort]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the Gantt multi-sorting feature. To sort two or more columns, hold the CTRL key, and click the column header.</p>
      </div>

      <div id="description">
        <p>The sorting feature enables you to order data in a particular direction. It can be enabled by setting <code>allowSorting</code> to true.</p>
        <p>To sort a Gantt column, click the column header. The icons (ascending) and (descending) specifies the sort direction of a column.</p>

        <p>By default, the multi-sorting feature is enabled in Gantt. To sort multiple columns, hold the <strong>CTRL</strong> key, and then click the column header. To clear sort for a column, hold the <strong>SHIFT</strong> key, and then click the column header.</p>
        <p>In this demo, multiple sorting enabled on load time by assigning multiple columns into <code>sortSettings</code> property.</p>
        <p>Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the
          <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method. To use sort, inject the
          <code>Sort</code> module using the <code>Gantt.Inject(Sort)</code> method.To use markers, inject the
          <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
      </div>
    </div>
  )
}
export default Sorting;
