import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, ColumnsDirective, ColumnDirective, Selection, Inject } from '@syncfusion/ej2-react-gantt';
import { baselineData } from './data';
import { SampleBase } from '../common/sample-base';
import './baseline.css'

export class Baseline extends SampleBase<{}, {}> {
private ganttInstance: GanttComponent;
  private themeColors = {
    'material3': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'material3-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'tailwind3': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'tailwind3-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'bootstrap5_3': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'bootstrap5_3-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'fluent2': {
      onTime: '#F0FDF4',
      delayed: '#FFF7ED',
      baseline: '#DAA520',
      onTimeProgress: '#15803D',
      delayedProgress: '#C2410C'
    },
    'fluent2-dark': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    },
    'fluent2-highcontrast': {
      onTime: '#122A2C',
      delayed: '#282125',
      baseline: '#9CA3AF',
      onTimeProgress: '#22C55E',
      delayedProgress: '#FB923C'
    }
  };

  state = { currentTheme: 'material3' };

  public taskFields: any = {
    id: 'TaskId',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    baselineStartDate: 'BaselineStartDate',
    baselineEndDate: 'BaselineEndDate',
    baselineDuration: 'baselineDur',
    parentID: 'ParentId',
    duration: 'Duration',
    dependency: 'Predecessor',
    progress: 'Progress'
  };

  public projectStartDate = new Date('07/02/2025');
  public projectEndDate = new Date('09/15/2025');

  public timelineSettings: any = {
    topTier: {
      unit: 'Month',
      format: 'MMMM yyyy'
    },
    bottomTier: {
      unit: 'Day'
    }
  };


  private getCurrentTheme = (): any => {
        const themeClasses = Object.keys(this.themeColors); // Extract theme names from themeColors
        const currentTheme = themeClasses.find(theme => document.body.classList.contains(theme));
        return currentTheme || 'material3'; // Default theme
  };

  componentDidMount() {
    this.setState({ currentTheme: this.getCurrentTheme() });
  }

  private parentTaskbarTemplate = (props: any) => (
    <div className="e-gantt-parent-taskbar e-row-expand e-custom-parent" style={{ height: '10px', marginTop: '17px', background: '#F3F4F6', border: '1px solid #9CA3AF', borderRadius: '5px', textOverflow: 'ellipsis' }}>
      <div className="e-gantt-parent-progressbar e-custom-progress" style={{ height: '100%', width: `${props.ganttProperties.progressWidth}px`, background: '#9CA3AF', borderRadius: '5px' }}></div>
      <span className="e-label" style={{ position: 'absolute', top: '0px', right: '6px', fontSize: '12px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin:'0px'}}>
        {props.TaskName} | {this.ganttInstance.getFormatedDate(props.ganttProperties.startDate)} - {this.ganttInstance.getFormatedDate(props.ganttProperties.endDate)} | {props.ganttProperties.duration} days
      </span>
    </div>
  );

  private rightLabelTemplate = (props: any) => {
    if (props.ganttProperties.parentId) {
      return <span className="e-label">{props.TaskName}</span>;
    }
    return null;
  };
  public splitterSettings: any={
    columnIndex: 4,
  };
  private tooltipTemplate = (props: any) => (
    <table>
      <tbody>
        <tr><td colSpan={3}>{props.TaskName}</td></tr>
        <tr>
          <td>Start Time</td><td>:</td>
          <td>{this.ganttInstance.getFormatedDate(props.StartDate)}</td>
        </tr>
        <tr>
          <td>End Time</td><td>:</td>
          <td>{this.ganttInstance.getFormatedDate(props.EndDate)}</td>
        </tr>
        <tr>
          <td>Planned start time</td><td>:</td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineStartDate)}</td>
        </tr>
        <tr>
          <td>Planned end time</td><td>:</td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineEndDate)}</td>
        </tr>
      </tbody>
    </table>
  );
  public template: any=this.tooltipTemplate;
  private queryTaskbarInfo = (args: any) => {
    const newTheme = this.getCurrentTheme();
    if (newTheme !== this.state.currentTheme) {
      this.state.currentTheme=newTheme;
    }
    const colors = this.themeColors[this.state.currentTheme];
    const taskbarColor = !args.data.ganttProperties.baselineStartDate ||
                        !args.data.ganttProperties.baselineEndDate ||
                        args.data.ganttProperties.startDate <= args.data.ganttProperties.baselineStartDate
                        ? colors.onTime : colors.delayed;
    const progressColor = !args.data.ganttProperties.baselineStartDate ||
                         !args.data.ganttProperties.baselineEndDate ||
                         args.data.ganttProperties.startDate <= args.data.ganttProperties.baselineStartDate
                         ? colors.onTimeProgress : colors.delayedProgress;
    if (args.taskbarType !== 'ParentTask') {
      if (this.state.currentTheme === 'material3' || this.state.currentTheme === 'material3-dark') {
        if (args.taskbarType !== 'Milestone') {
          args.taskbarElement.querySelectorAll('.e-gantt-child-taskbar-inner-div')[0]?.style.setProperty('background', taskbarColor, 'important');
        } else {
          args.taskbarElement.querySelectorAll('.e-gantt-milestone')[0]?.style.setProperty('border', progressColor, 'important');
          args.rowElement.querySelectorAll('.e-baseline-gantt-milestone-container')[0]?.style.setProperty('border', colors.baseline, 'important');
        }
      }
      args.taskbarBgColor = taskbarColor;
      args.milestoneColor = progressColor;
      args.taskbarBorderColor = progressColor;
      args.progressBarBgColor = progressColor;
    }
    args.baselineColor=colors.baseline
  };

  private queryCellInfo = (args: any) => {
    if (args.column.field === 'variance') {
      const start = args.data.ganttProperties.startDate;
      const baselineStart = args.data.ganttProperties.baselineStartDate;
      const baselineEnd = args.data.ganttProperties.baselineEndDate;
      if (!baselineStart || !baselineEnd || !start || start <= baselineStart) {
        args.data.variance = 0;
        args.data.taskData.variance = 0;
        args.cell.innerText = '0 days';
        return;
      }
      const diffInDays = (start - baselineStart) / (1000 * 60 * 60 * 24);
      const roundedDiff = Math.round(diffInDays);
      args.data.variance = roundedDiff;
      args.data.taskData.variance = roundedDiff;
      args.cell.innerText = roundedDiff + ' days';
    }
  };

  public labelSettings: any = {
    rightLabel: this.rightLabelTemplate
  };

  public tooltipSettings: any = {
    taskbar: this.template.bind(this),
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Baseline' ref={gantt => this.ganttInstance = gantt} dataSource={baselineData} renderBaseline={true} parentTaskbarTemplate={this.parentTaskbarTemplate}
            treeColumnIndex={1} allowSelection={true} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} splitterSettings={this.splitterSettings}
            taskFields={this.taskFields} timelineSettings={this.timelineSettings} includeWeekend={true} queryCellInfo={this.queryCellInfo} queryTaskbarInfo={this.queryTaskbarInfo}
            height='650px' taskbarHeight={25} rowHeight={46} tooltipSettings={this.tooltipSettings} >
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
          <p>This sample visualizes the complete car service schedule using the React Gantt Chart. Baselines are enabled to highlight deviations between planned and actual service dates, helping track schedule accuracy across all tasks and milestones.</p>
        </div>
        <div id="description">
          <p> In this demo sample, the baseline feature in the React Gantt Chart, which helps visualize the variance between planned and actual task 
          schedules. Baselines provide a clear reference for tracking project deviations and are rendered for all task types including child tasks, 
          parent tasks, and milestones.</p>
          <p>To enable baselines in the React Gantt Chart, set the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#renderbaseline">renderBaseline</a> property to <code>true</code> and define the planned schedule using the 
          <code>baselineStartDate</code> field. You can either specify the <code>baselineEndDate</code> directly or use the <code>baselineDuration</code> property to calculate it 
          automatically. Setting <code>baselineDuration</code> to zero is particularly useful for milestones, as it clearly marks a planned point in time. 
          The appearance of baselines can be customized using the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/#baselinecolor">baselineColor</a></code> property to visually distinguish planned timelines from actual 
          task progress.timelines from actual progress.</p>
          
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a selection support, inject the
            <code>Selection</code> module.
          </p>
          <br></br>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/baseline">documentation section</a>.</p>
      </div>
      </div>
    )
  }
}
