import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, EditDialogFieldsDirective, DayMarkers, EditDialogFieldDirective, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';

export class Editing extends SampleBase<{}, {}> {
  public startDate :any;
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
  public resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  public editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  public splitterSettings: any = {
    position: "35%"
  };
  public projectStartDate: Date = new Date('03/25/2024');
  public projectEndDate: Date = new Date('07/28/2024');
  public gridLines: any = 'Both';
  public toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
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
  public customFn(args) {
    var endDate;
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
  public actionbeing(args) {
    if (args.columnName === "EndDate" || args.requestType === "beforeOpenAddDialog" || args.requestType === "beforeOpenEditDialog") {
      this.startDate = args.rowData.ganttProperties.startDate;
    }
    if (args.requestType === "taskbarediting" && args.taskBarEditAction === "ChildDrag") {
      this.startDate = args.data.ganttProperties.startDate;
    }  
  }
  public eventMarkerDay1: Date = new Date('4/17/2024');
  public eventMarkerDay2: Date = new Date('5/3/2024');
  public eventMarkerDay3: Date = new Date('6/7/2024');
  public eventMarkerDay4: Date = new Date('7/16/2024');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Editing' dataSource={editingData} dateFormat={'MMM dd, y'}
            treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
            height='410px' editSettings={this.editSettings} gridLines={this.gridLines} toolbar={this.toolbar} resourceFields={this.resourceFields} resources={editingResources} actionBegin={this.actionbeing}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip' validationRules={{ required: true, minLength: [5, 'Task name should have a minimum length of 5 characters'], }}></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' validationRules={{ date: true, required: [this.customFn, 'Please enter a value greater than the start date.'] }}></ColumnDirective>
              <ColumnDirective field='Duration' validationRules={{ required: true}}></ColumnDirective>
              <ColumnDirective field='Progress' validationRules={{ required: true, min: 0, max: 100 }}></ColumnDirective>
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
                button after selected a row</li>
            <li><code>Indent</code> - To indent a task, click toolbar indent button after selecting a row</li>
            <li><code>Outdent</code> - To outdent a task, click toolbar outdent button after selecting a row</li>
            <li><code>Delete</code> - To delete a task, click toolbar Delete button after selected a row</li>
            <li><code>Update,Cancel</code> - You can save or discard changes by click toolbar Update and Cancel button
            respectively</li>
          </p>
        </div>

        <div id="description">
          <p>
          This CRUD operations can be configured in Gantt chart using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#editsettings">editSettings</a> and
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#allowtaskbardraganddrop">allowTaskbarEditing</a>. Gantt chart
          has two modes to manipulate the datasource
            <li><code>Auto</code></li>
            <li><code>Dialog</code></li>
            In this demo, <code>Auto</code> mode is enabled for editing. On the TreeGrid side, you can start editing any row
            by double
            clicking on it or clicking on toolbar’s Edit button, then the currently selected row will be changed to edited
            state. On the chart side, you can edit the tasks using edit dialog by double clicking on the taskbars and you
            can edit the dependency connector lines using drag and drop action with connector line points available on the
            either side of taskbar.
            <br></br>
            In this sample <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#validationrules">column.validation</a> has been enabled for the columns. It uses the Form Validator control and the column validation property to define validation rules to display error messages for invalid value entries.
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
