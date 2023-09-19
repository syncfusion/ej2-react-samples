import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, Inject, Selection, Filter, Sort, Resize, ColumnMenu, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const GanttColumnMenu = () => {
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
    columnIndex: 4
};
  const projectStartDate: Date = new Date('03/24/2019');
  const projectEndDate: Date = new Date('07/06/2019');
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ColumnMenu' treeColumnIndex={1} showColumnMenu={true} allowFiltering={true} allowSorting={true}
            allowResizing={true} dataSource={projectNewData} highlightWeekends={true} splitterSettings={splitterSettings}
            taskFields={taskFields} labelSettings={labelSettings} height='410px'
            projectStartDate={projectStartDate} projectEndDate={projectEndDate}>
              <ColumnsDirective>
              <ColumnDirective field='TaskID' headerText='ID' width='100' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
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
        This feature can be enabled by setting <code>showColumnMenu</code> to true.
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
        In this demo, the column menu feature is enabled by setting <code>showColumnMenu</code> to true with sorting, filtering, column chooser, and autoFit options.
    </p>
    <b>Injecting Module:</b>
    <p>Gantt features are segregated into individual feature-wise modules. To use column menu feature, we need to inject <code>ColumnMenu</code> module into the <code>services</code>.</p>
    <p>
        More information about column menu can be found in this documentation section.
    </p>
    </div>
      </div>
    )
  }
export default GanttColumnMenu;
