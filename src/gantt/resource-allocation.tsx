import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, DayMarkers, Inject, Selection, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';

export class ResourceAllocation extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    resourceInfo: 'resources'
  };
  public splitterSettings: any = {
    columnIndex: 3
  };
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('07/28/2019');
  public labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ResourceAllocation' dataSource={editingData}
            allowSelection={true} highlightWeekends={true}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            taskFields={this.taskFields} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
            height='410px' resourceNameMapping='resourceName' resourceIDMapping='resourceId' resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='100' ></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Job Name' width='150' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='resources' width='200'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection,DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the options to allocate one or more resources to tasks based on the task requirement.</p>
        </div>

        <div id="description">
        <p>In this example, you can see how to allocate single or multiple resources for the task. Based on the task complexity and the resource availability, you can plan and allocate the resources to task in the project. In this demo, there is a set of predefined resources and those IDs are assigned to the task. Resource information can be shown in Gantt chart by using the <code>labelSettings</code> property.</p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
            <code>Selection</code>, <code>DayMarkers</code> modules.
          </p>
        </div>
      </div>
    )
  }
}
