import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, Edit, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, SplitterSettingsModel, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { leadLagOffsetData } from './data';
import { SampleBase } from '../common/sample-base';

export class DependencyOffset extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    parentID: 'ParentID',
  };

  public labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName',
  };

  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 3,
  };

  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  public projectStartDate: Date = new Date('01/01/2026');

  public toolbar: string[] = [];

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent
            id='DependencyOffset'
            dataSource={leadLagOffsetData}
            taskFields={this.taskFields}
            allowSelection={true}
            highlightWeekends={true}
            editSettings={this.editSettings}
            splitterSettings={this.splitterSettings}
            height='650px'
            taskbarHeight={25}
            rowHeight={46}
            treeColumnIndex={1}
            labelSettings={this.labelSettings}
            projectStartDate={this.projectStartDate}
            gridLines='Both'
          >
            <ColumnsDirective>
              <ColumnDirective field='TaskID' visible={false} />
              <ColumnDirective field='TaskName' headerText='Task Name' width='200' />
              <ColumnDirective field='Predecessor' headerText='Dependency' width='160' />
              <ColumnDirective field='StartDate' headerText='Start Date' width='130' />
              <ColumnDirective field='Duration' headerText='Duration' width='110' />
              <ColumnDirective field='Progress' headerText='Progress' width='100' />
            </ColumnsDirective>
            <Inject services={[Edit, Selection, DayMarkers]} />
          </GanttComponent>
        </div>

        <div id='action-description'>
          <p>
            This sample illustrates how lead and lag offsets are expressed in task predecessor definitions.
            Offsets are used to delay or overlap dependent tasks from their default relationship.
          </p>
        </div>

        <div id='description'>
          <p>
            The Gantt Chart supports dependency offsets to define lead or lag time between linked tasks.
            These offsets adjust the start or finish dates of dependent tasks relative to their predecessor tasks, enabling more flexible and accurate project scheduling
          </p>
          <p>
            These offsets affect how the dependent task start and finish dates are calculated relative to the
            linked task, enabling more complex scheduling scenarios.
          </p>
          <p>Gantt Chart component features are segregated into individual feature-wise modules. To use edit, and selection features, we need to inject <code>Edit</code>, and <code>Selection</code> into the <code>Inject Services</code> section.</p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/task-dependency#configure-predecessor-offsets-with-duration-units">task dependency</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    );
  }
}
