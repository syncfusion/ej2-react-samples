import * as React from 'react';
import { GanttComponent, TaskFieldsModel, EditDialogFieldsDirective, DayMarkers, EditDialogFieldDirective, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, TimelineSettingsModel, GridLine, ResourceFieldsModel, ToolbarItem } from '@syncfusion/ej2-react-gantt';
import { defaultEditingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';
import './default-editing.css';

export class Editing extends SampleBase<{}, {}> {
  public startDate: Date;
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    durationUnit: 'DurationUnit',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentId',
    notes: 'info',
    resourceInfo: 'resources'
  };
  private ganttInstance: GanttComponent;
  public resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName'
  };
  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('09/10/2025');
  public gridLines: GridLine = 'Both';
  public toolbar: ToolbarItem[] = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
  public timelineSettings: TimelineSettingsModel = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  public onCreated = (): void => {
    if (document.querySelector('.e-bigger')) {
      this.ganttInstance.rowHeight = 48;
      this.ganttInstance.taskbarHeight = 28;
    }
  }
  public customFn(args) {
    var endDate: Date;
    var gantt = (document.getElementsByClassName('e-gantt')[0] as any).ej2_instances[0];
    if (args.element && args.value) {
      endDate = new Date(args.value);
      if (!this.startDate && gantt.editModule.dialogModule['beforeOpenArgs']) {
        this.startDate = gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].startDate;
        endDate = (gantt.editModule.dialogModule['beforeOpenArgs'].rowData['ganttProperties'].endDate);
      }
      this.startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
    }
    return this.startDate <= endDate;
  }
  public actionBegin(args) {
    if (args.columnName === "EndDate" || args.requestType === "beforeOpenAddDialog" || args.requestType === "beforeOpenEditDialog") {
      this.startDate = args.rowData.ganttProperties.startDate;
    }
    if (args.requestType === "taskbarediting" && args.taskBarEditAction === "ChildDrag") {
      this.startDate = args.data.ganttProperties.startDate;
    }
  }
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Editing' ref={gantt => this.ganttInstance = gantt} dataSource={defaultEditingData} dateFormat={'MMM dd, y'}
            treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true} created={this.onCreated}
            allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} enableHover={true}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
            height='650px' taskbarHeight={25} rowHeight={46} editSettings={this.editSettings} gridLines={this.gridLines} toolbar={this.toolbar} resourceFields={this.resourceFields} resources={editingResources} actionBegin={this.actionBegin}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip' validationRules={{ required: true, minLength: [5, 'Task name should have a minimum length of 5 characters'], }}></ColumnDirective>
              <ColumnDirective field='Duration' validationRules={{ required: true }}></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' validationRules={{ required: [this.customFn, 'Please enter a value greater than the start date.'] }}></ColumnDirective>
              <ColumnDirective field='Progress' validationRules={{ required: true, min: 0, max: 100 }}></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <EditDialogFieldsDirective>
              <EditDialogFieldDirective type='General' headerText='General'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Dependency'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Resources'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Notes'></EditDialogFieldDirective>
            </EditDialogFieldsDirective>
            <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Construction" target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates task editing and CRUD operations in the Gantt Chart using a residential construction project workflow. You can add, edit, delete, indent, outdent, and update tasks using the toolbar or direct user interactions.</p>
        </div>

        <div id="description">
          <p>The Gantt Chart supports built-in CRUD operations through the <code><a target="_blank" rel="noopener noreferrer" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#editsettings">editSettings</a></code> property. In this example, adding, editing, deleting, and taskbar editing are enabled, allowing tasks to be modified directly from both the TreeGrid and chart areas.</p>
          <ul>
            <li><code>Add</code> - Creates a new task</li>
            <li><code>Edit </code> - Modifies the selected task.</li>
            <li><code>Indent</code> - Makes the selected task a child task.</li>
            <li><code>Outdent</code> - Promotes the selected task to a higher level.</li>
            <li><code>Delete</code> - Removes the selected task.</li>
            <li><code>Update</code> / <code>Cancel</code> - Saves or discards the current changes.</li>
          </ul>
          <p>Tasks can be edited by double-clicking a row, using the toolbar commands, or opening the edit dialog. Taskbars can also be modified through drag-and-drop interactions, including updating task dates, durations, progress, and dependency relationships. This sample demonstrates resource assignment, dependency editing, notes editing, and support for custom duration units through the <code>taskFields.durationUnit</code> mapping such as <code>week</code>, <code>month</code>, <code>days</code>, <code>hours</code> and <code>minutes</code>.</p>
          <p>Gantt component features are segregated into individual feature-wise modules. To use edit, toolbar, markers and selection features, we need to inject <code>Edit</code>, <code>Toolbar</code>, <code>DayMarkers</code> and <code>Selection</code> into the <code>Inject Services</code> section.</p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/managing-tasks/editing-tasks">editing tasks</a>  documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
