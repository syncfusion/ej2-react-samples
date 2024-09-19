import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, ColumnsDirective, ColumnDirective, Selection, Inject } from '@syncfusion/ej2-react-gantt';
import { baselineData } from './data';
import { SampleBase } from '../common/sample-base';

export class Baseline extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskId',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    baselineStartDate: 'BaselineStartDate',
    baselineEndDate: 'BaselineEndDate'
  };
  private ganttInstance: GanttComponent;
  public projectStartDate = new Date('03/05/2024 09:30:00 AM');
  public projectEndDate = new Date('03/05/2024 07:00:00 PM');
  public timelineSettings: any = {
    timelineUnitSize: 65,
    topTier: {
      unit: 'None',
    },
    bottomTier: {
      unit: 'Minutes',
      count: 15,
      format: 'hh:mm a'
    }
  };
  private dayWorkingTime: any = [{ from: 0, to: 24 }];
  public tooltipTemplate(props): any {
    return (<table>
      <tbody>
        <tr><td colSpan={3}>{props.TaskName}</td></tr>
        <tr>
          <td > Start Time </td> <td>:</td>
          <td>{this.ganttInstance.getFormatedDate(props.StartDate)}</td>
        </tr>
        <tr>
          <td> End Time</td> <td>:</td>
          <td >{this.ganttInstance.getFormatedDate(props.EndDate)}</td>
        </tr>
        <tr>
          <td> Planned start time</td> <td>:</td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineStartDate)}</td>
        </tr>
        <tr>
          <td> Planned end time</td> <td>:</td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineEndDate)}</td>
        </tr>
      </tbody>
    </table>)
  };
  public template: any = this.tooltipTemplate;
  public tooltipSettings: any = {
    taskbar: this.template.bind(this),
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Baseline' ref={gantt => this.ganttInstance = gantt} dataSource={baselineData} renderBaseline={true} dateFormat={'hh:mm a'}
            treeColumnIndex={1} allowSelection={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} includeWeekend={true}
            height='410px' tooltipSettings={this.tooltipSettings} durationUnit='Minute' dayWorkingTime={this.dayWorkingTime}>
            <ColumnsDirective>
              <ColumnDirective field='TaskName' headerText='Service Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
              <ColumnDirective field='BaselineStartDate' headerText='Planned start time' ></ColumnDirective>
              <ColumnDirective field='BaselineEndDate' headerText='Planned end time' ></ColumnDirective>
              <ColumnDirective field='StartDate' headerText='Start time' ></ColumnDirective>
              <ColumnDirective field='EndDate' headerText='End time' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection]} />
          </GanttComponent>
          <div style={{ float: 'right', margin: '10px' }}>Source:
            <a href="https://en.wikipedia.org/wiki/Service_(motor_vehicle)"
              target='_blank'>https://en.wikipedia.org/</a>
          </div>
        </div>
        <div id="action-description">
          <p>This sample visualizes the complete service schedule for a car. Baselines are enabled in this sample to view the
        deviation between the planned dates and actual dates.</p>
        </div>

        <div id="description">
        <p>
          The baseline feature enables the user to view the deviation between the planned dates and the actual dates of
          the tasks in a project. Baselines can be enabled in Gantt chart by enabling the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#renderbaseline">renderBaseline</a>
          property along
          with mapping the data source values for <code>baselineStartDate</code> and <code>baselineEndDate</code>
          properties.
          The baseline will appear for all type of tasks in the project such as child tasks, parent tasks and also for
          milestones. You can change the color for the baselines using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#baselinecolor">baselineColor</a> property.
        </p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the
          <code>Selection</code> module.
        </p>
        </div>
      </div>
    )
  }
}
