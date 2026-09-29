import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Edit, Selection, ColumnsDirective, ColumnDirective, RowDD, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, SelectionSettingsModel } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

const DragAndDrop = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId'
  };
  const selectionSettings: SelectionSettingsModel = {
    type: 'Multiple'
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/20/2025');
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName'
  };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='DragandDrop' dataSource={projectNewData} taskFields={taskFields} height='650px' taskbarHeight={25} rowHeight={46}
          treeColumnIndex={1} allowRowDragAndDrop={true} highlightWeekends={true} labelSettings={labelSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} allowTaskbarDragAndDrop={true}
          splitterSettings={splitterSettings} editSettings={editSettings} selectionSettings={selectionSettings}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' headerText='ID' width='80' ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate'></ColumnDirective>
            <ColumnDirective field='Duration'></ColumnDirective>
            <ColumnDirective field='Progress'></ColumnDirective>
            <ColumnDirective field='Predecessor' headerText='Dependency'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Edit, RowDD, Selection]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the row drag-and-drop feature in the Gantt Chart. Tasks can be reordered by dragging the drag handle displayed in the left side of the Gantt row. Rows can be dropped at the required position to reorganize the task hierarchy and sequence.</p>
      </div>
      <div id="description">
        <p>Row drag and drop feature can be enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#allowrowdraganddrop">allowRowDragAndDrop</a> property as true. In this demo, taskbar drag and drop between rows can be enabled by setting <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#allowtaskbardraganddrop">allowTaskbarDragAndDrop</a> as true.</p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use row drag and drop, edit, and selection features, we need to inject <code>RowDD</code>, <code>Selection</code> and <code>Edit</code> into <code>Inject Services</code> modules.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/rows/drag-and-drop">drag and drop</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default DragAndDrop;
