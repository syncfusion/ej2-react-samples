import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, EditDialogFieldsDirective, DayMarkers, EditDialogFieldDirective, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';

export class Editing extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    notes: 'info',
    resourceInfo: 'resources'
  };
  public editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  public projectStartDate: Date = new Date('03/25/2019');
  public projectEndDate: Date = new Date('07/28/2019');
  public gridLines: any = 'Both';
  public toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  public timelineSettings: any = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  public labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  public eventMarkerDay1: Date = new Date('4/17/2019');
  public eventMarkerDay2: Date = new Date('5/3/2019');
  public eventMarkerDay3: Date = new Date('6/7/2019');
  public eventMarkerDay4: Date = new Date('7/16/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Editing' dataSource={editingData} dateFormat={'MMM dd, y'}
            treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
            allowUnscheduledTasks={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings}
            height='410px' editSettings={this.editSettings} gridLines={this.gridLines} toolbar={this.toolbar} resourceNameMapping='resourceName' resourceIDMapping='resourceId' resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='60' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <EditDialogFieldsDirective>
              <EditDialogFieldDirective type='General' headerText='General'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Dependency'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Resources'></EditDialogFieldDirective>
              <EditDialogFieldDirective type='Notes'></EditDialogFieldDirective>
            </EditDialogFieldsDirective>
            <EventMarkersDirective>
              <EventMarkerDirective day={this.eventMarkerDay1} label='Project approval and kick-off' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay2} label='Foundation inspection' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay3} label='Site manager inspection' ></EventMarkerDirective>
              <EventMarkerDirective day={this.eventMarkerDay4} label='Property handover and sign-off' ></EventMarkerDirective>
            </EventMarkersDirective>
            <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Construction" target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample visualizes the various phases involved in constructing a residential house, from testing the soil to
              handing over the fully constructed property to the owner. This sample also demonstrates CRUD operations in Gantt
              chart. You can perform CRUD operations as follows,
        <li><code>Add</code> - To add new task, click Add toolbar button</li>
            <li><code>Edit </code>- To edit a task, double click a row or double click a taskbar or click toolbar Edit
                button after
            selected a row</li>
            <li><code>Delete</code> - To delete a task, click toolbar Delete button after selected a row</li>
            <li><code>Update,Cancel</code> - You can save or discard changes by click toolbar Update and Cancel button
            respectively</li>
          </p>
        </div>

        <div id="description">
          <p>
            This CRUD operations can be configured in Gantt chart using <code>editSettings</code> and
        <code>allowTaskbarEditing</code>. Gantt chart
                has two modes to manipulate the datasource
            <li><code>Auto</code></li>
            <li><code>Dialog</code></li>
            In this demo, <code>Auto</code> mode is enabled for editing. On the TreeGrid side, you can start editing any row
            by double
            clicking on it or clicking on toolbar’s Edit button, then the currently selected row will be changed to edited
            state. On the chart side, you can edit the tasks using edit dialog by double clicking on the taskbars and you
            can edit the dependency connector lines using drag and drop action with connector line points available on the
            either side of taskbar.
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use editing feature, inject the
            <code>Edit</code> module. To use a selection feature, inject the <code>Selection</code> module.
          </p>
        </div>
      </div>
    )
  }
}
