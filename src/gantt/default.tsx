import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks'
  };
  public labelSettings: any = {
    leftLabel: 'TaskName'
  };
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('07/06/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Default' dataSource={projectNewData}
            taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <Inject services={[Selection]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample visualizes the various phases involved in a manufacturing process of a product which transforms from
        a conceptual model to a sellable product.</p>
        </div>

        <div id="description">
          <p>
            In this example, you can see how to render a Gantt chart with the provided data source. The default timeline
            view week-day mode is applied to Gantt chart. The dependency lines are enabled in this example to represent the
            execution order or the hierarchy between the phases.
          </p>
          <p>
            Tooltip is enabled for all the UI in this example. To see the tooltip in action, hover the mouse over or tap
            taskbars, timeline units and dependency lines in touch enabled devices.
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support we need to inject the
            <code>Selection</code> module.
        </p>
        </div>
      </div>
    )
  }
}
