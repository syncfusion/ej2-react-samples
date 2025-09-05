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
    parentID:'ParentId',
    notes: 'info',
    resourceInfo: 'resources'
  };
  private ganttInstance: GanttComponent;
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
    columnIndex: 3
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('09/10/2025');
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
    public onCreated=(): void=>{
    if(document.querySelector('.e-bigger'))
      {
          this.ganttInstance.rowHeight=48;
          this.ganttInstance.taskbarHeight=28;
      }
  }
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
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Editing'  ref={gantt=>this.ganttInstance=gantt} dataSource={editingData} dateFormat={'MMM dd, y'}
            treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true} created={this.onCreated}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} enableHover={true}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
            height='650px' taskbarHeight={25} rowHeight={46} editSettings={this.editSettings} gridLines={this.gridLines} toolbar={this.toolbar} resourceFields={this.resourceFields} resources={editingResources} actionBegin={this.actionbeing}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip' validationRules={{ required: true, minLength: [5, 'Task name should have a minimum length of 5 characters'], }}></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' validationRules={{ required: [this.customFn, 'Please enter a value greater than the start date.'] }}></ColumnDirective>
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
            <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Construction" target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the various phases involved in constructing a residential house, from testing the soil to handing over the fully constructed property to the owner. This also demonstrates CRUD operations in a Gantt Chart.
            You can perform CRUD operations as follows,</p>
          <ul>
            <li><code>Add</code> - To add new task, click Add toolbar button</li>
            <li><code>Edit </code>- To edit a task, double click a row or double click a taskbar or click toolbar Edit button after selected a row</li>
            <li><code>Indent</code> - To indent a task, click toolbar indent button after selecting a row</li>
            <li><code>Outdent</code> - To outdent a task, click toolbar outdent button after selecting a row</li>
            <li><code>Delete</code> - To delete a task, click toolbar Delete button after selected a row</li>
            <li><code>Update,Cancel</code> - You can save or discard changes by click toolbar Update and Cancel button respectively</li>
          </ul>
        </div>

        <div id="description">
          <p>
          This CRUD operations can be configured in Gantt Chart using  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#allowtaskbardraganddrop">allowTaskbarEditing</a> in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#editsettings">editSettings</a>. Gantt Chart has two modes to manipulate the datasource:</p>
          <li><code>Auto</code></li>
          <li><code>Dialog</code></li>
          <br/>
          <p>In this demo, <code>Auto</code> mode is enabled for editing. On the TreeGrid side, you can start editing any row by double clicking on it or clicking on toolbar’s Edit button, then the currently selected row will be changed to edited state.
          On the chart side, you can edit the tasks using edit dialog by double clicking on the taskbars and you can edit the dependency connector lines using drag and drop action with connector line points available on the either side of taskbar.
          <br/>
          In this sample <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#validationrules">column.validation</a> has been enabled for the columns.It uses the Form Validator control and the column validation property to define validation rules, displaying error messages for invalid fields.
          </p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/managing-tasks/editing-tasks">documentation section</a>.</p>
        </div>
      </div>
    )
  }
}
