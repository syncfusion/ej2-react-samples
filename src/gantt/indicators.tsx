import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective  } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';
import './indicators.css'

export class Indicators extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    indicators: 'Indicators'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public projectStartDate: Date = new Date('03/24/2024');
  public projectEndDate: Date = new Date('07/06/2024');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Indicators' dataSource={projectNewData} highlightWeekends={true} treeColumnIndex={1}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
              <ColumnDirective field='Predecessor'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample visualizes how to mention special moment in any mentioned day for a particular task with different icon and label.</p>
        </div>

        <div id="description">
        <p>
        In this example, <code>indicators</code> are displayed with some custom text in specified day of task, which are defined in dataSource. You can define the indicators with the following properties for tasks:
       <li><code>date</code>: Defines the date value to where we want to display the indicators.</li>
       <li><code>iconClass </code>: Defines the icon to highlight the indicator.</li>
       <li><code>name</code>: Defines text to be displayed in the mentioned date.</li>
       <li><code>tooltip</code>: The text to be displayed when hover the mouse over the indicator.</li>
      </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support and event markers we need to inject the
            <code>Selection</code>, <code>DayMarkers</code> modules.
        </p>
        </div>
      </div>
    )
  }
}
