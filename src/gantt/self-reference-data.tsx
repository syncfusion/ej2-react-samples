import * as React from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { selfData } from './data';
import { SampleBase } from '../common/sample-base';

export class SelfReferenceData extends SampleBase<{}, {}> {
  public taskFields: TaskFieldsModel = {
    id: 'taskID',
    name: 'taskName',
    startDate: 'startDate',
    endDate: 'endDate',
    duration: 'duration',
    progress: 'progress',
    dependency: 'predecessor',
    parentID: 'parentID'
  };
  public labelSettings: LabelSettingsModel = {
    leftLabel: 'taskName'
  };
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('01/28/2025');
  public projectEndDate: Date = new Date('03/30/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='SelfReferenceData' dataSource={selfData} highlightWeekends={true}
            allowSelection={true} treeColumnIndex={1} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='taskID' width='80'></ColumnDirective>
              <ColumnDirective field='taskName' width='250'></ColumnDirective>
              <ColumnDirective field='startDate'></ColumnDirective>
              <ColumnDirective field='endDate'></ColumnDirective>
              <ColumnDirective field='duration'></ColumnDirective>
              <ColumnDirective field='predecessor'></ColumnDirective>
              <ColumnDirective field='progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates binding self-referential data to the Gantt Chart using the <code>parentID</code> field to define parent-child task relationships.</p>
        </div>

        <div id="description">
        <p>
        This sample demonstrates how to bind self-referential flat data to the Gantt component. 
        Self-referential data uses a <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/taskFieldsModel/#parentid">parentID</a> field to establish hierarchical relationships between tasks, allowing flat data structures to be displayed as hierarchical task trees.
        </p>
        <p>
        In this example, a flat collection of task records is converted into a hierarchical structure by mapping the <code>ParentID</code> field. This enables the Gantt Chart to display parent and child tasks without requiring a nested data source. 
        The Gantt Chart supports binding data from local collections or remote services through the <code>DataManager</code> property. Here, a local array of JavaScript objects is used as the data source.
        </p>
        <p>Gantt component features are segregated into individual feature-wise modules. To use a selection and marker features, we need to inject the <code>Selection</code> and <code>DayMarkers</code> into the <code>Inject Services</code> section.</p>
        <br />
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/data-binding#self-referential-data-binding-flat-data">data binding</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
      </div>
    )
  }
}
