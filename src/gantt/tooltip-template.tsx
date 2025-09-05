import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { tooltipData, editingResources } from './data';
import { SampleBase } from '../common/sample-base';

export class TooltipTemplate extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    resourceInfo: 'resources',
    baselineStartDate: 'BaselineStartDate',
    baselineEndDate: 'BaselineEndDate',
    child: 'subtasks'
  };
  public resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  public templateTaskbar: any = this.taskbarTooltip;
  public taskbarTooltip(props) {
    var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
    return(<table>
      {props.ganttProperties.resourceNames &&
      <tr>
      <td rowSpan = {3} style={{ padding: '3px'}}><img src={src} height='40px' /></td>
      <td style={{ padding: '3px' }}>Task done By:</td>
      <td style={{ padding: '3px' }}>{props.ganttProperties.resourceNames}</td>
      </tr>
      }
      <tr>
        <td style={{ padding: '3px' }}>Starts On:</td>
        <td style={{ padding: '3px' }}>{this.ganttInstance.getFormatedDate(props.StartDate)}</td>
      </tr>
      <tr>
        <td style={{ padding: '3px' }}>Ends On:</td>
        <td style={{ padding: '3px' }}>{this.ganttInstance.getFormatedDate(props.EndDate)}</td>
      </tr>
    </table>);
  };
  public templateBaseline: any = this.baselineTooltip;
  public baselineTooltip(props) {
    return (<table>
      <tbody>
        <tr>
          <td>Planned Start Date:</td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineStartDate)}</td>
        </tr>
        <tr>
          <td>Planned End Date:</td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineEndDate)}</td>
        </tr>
        <tr>
          <td>Current Start Date:</td>
          <td>{this.ganttInstance.getFormatedDate(props.StartDate)}</td>
        </tr>
        <tr>
          <td>Current End Date:</td>
          <td>{this.ganttInstance.getFormatedDate(props.EndDate)}</td>
        </tr>
      </tbody>
    </table>);
  };
  public templateTimeline: any = this.timelineTooltip;
  public timelineTooltip(props) {
    const tier = props.tier;
    const date = props.date;
    const endDate = new Date(date);
    if (tier === 'topTier' && this.ganttInstance.timelineSettings.topTier.unit) {
      endDate.setDate(endDate.getDate() + 6);
    }
    const data = this.getTooltipData(new Date(date), endDate, tier);

    const themeIsDark = document.body.classList.contains('tailwind3-dark') ||
                      document.body.classList.contains('material3-dark') ||
                      document.body.classList.contains('highcontrast');
    const borderColor = themeIsDark ? 'black' : 'white';

    return (
      <div style={{ padding: '5px' }}>
        <div style={{ paddingBottom: '9px', textAlign: 'center', borderBottom: `2px solid ${borderColor}` }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
            {tier === 'topTier' ? props.value : date}
          </span>
        </div>
        <div style={{ display: 'flex', paddingBottom: '5px',  paddingTop: '9px' }}>
          <span style={{ fontWeight: 'bold' }}>Active Tasks:</span>
          <span style={{ paddingLeft: '2px' }}>{data.activeTasks}</span>
        </div>
        <div style={{ display: 'flex', paddingBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>Milestones:</span>
          <span style={{ paddingLeft: '2px' }}>{data.milestones}</span>
        </div>
        <div style={{ display: 'flex', paddingBottom: '5px' }}>
          <span style={{ fontWeight: 'bold' }}>Overall Progress:</span>
          <span style={{ paddingLeft: '2px' }}>{data.overallProgress}</span>
        </div>
      </div>
    );
  };
  getTooltipData(startDate: Date, endDate: Date, tier: string) {
    const gantt = this.ganttInstance; // accessed via ref
    let activeTasks = [];
   
    if (tier === 'topTier') {
      activeTasks = gantt.currentViewData.filter((task) => {
        const taskStart = new Date(task['StartDate']);
        const taskEnd = new Date(task['EndDate']);
        taskStart.setHours(0, 0, 0, 0);
        taskEnd.setHours(0, 0, 0, 0);
        return (taskStart >= startDate && taskEnd <= endDate);
      });
    } else {
      activeTasks = gantt.currentViewData.filter((task) => {
        const taskStart = new Date(task['StartDate']);
        const taskEnd = new Date(task['EndDate']);
        taskStart.setHours(0, 0, 0, 0);
        taskEnd.setHours(0, 0, 0, 0);
        return (taskStart.getTime() === startDate.getTime() && taskEnd.getTime() === endDate.getTime());
      });
    }

    const milestones = activeTasks.filter((task) => task.Duration === 0);
    const totalProgress = activeTasks.reduce((acc, task) => acc + (task.Progress || 0), 0);
    const overallProgress = (activeTasks.length > 0) ? (totalProgress / activeTasks.length).toFixed(2) : '0';
   
    return {
      activeTasks: activeTasks.length,
      milestones: milestones.length,
      overallProgress: overallProgress
    };
  }
  public tooltipSettings: any = {
    showTooltip: true,
    taskbar: this.templateTaskbar.bind(this),
    baseline: this.templateBaseline.bind(this),
    timeline: this.templateTimeline.bind(this)
  };
  public labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('06/01/2025');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='TooltipTemplate' ref={gantt => this.ganttInstance = gantt} dataSource={tooltipData} highlightWeekends={true}
            renderBaseline={true} treeColumnIndex={1} tooltipSettings={this.tooltipSettings}
            splitterSettings={this.splitterSettings} taskFields={this.taskFields} labelSettings={this.labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} resourceFields={this.resourceFields} resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='80'></ColumnDirective>
              <ColumnDirective field='TaskName' width='250'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='EndDate' ></ColumnDirective>
              <ColumnDirective field='Duration' ></ColumnDirective>
              <ColumnDirective field='Predecessor' ></ColumnDirective>
              <ColumnDirective field='Progress' ></ColumnDirective>
              <ColumnDirective field='BaselineStartDate' width={200} ></ColumnDirective>
              <ColumnDirective field='BaselineEndDate' width={200}></ColumnDirective>
              <ColumnDirective field='resources' ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample explains the way of rendering tooltip template for taskbar, timeline and baseline by mapping template
          elements to the property of taskbar and baseline in <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/">tooltipSettings</a>.</p>
      </div>

      <div id="description">
        <p>Tooltip can be enabled or disabled using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#showtooltip">tooltipSettings.showTooltip</a> property.In this demo, the
          tooltip template is rendered for <code>taskbar</code>, <code>timeline</code> and <code>baseline</code> using the
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#taskbar">tooltipSettings.taskbar</a>,<a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#timeline">tooltipSettings.timeline</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#baseline">tooltipSettings.baseline</a> properties.</p>
        <p>The baseline feature enables the user to view the deviation between the planned dates and the actual dates of the tasks in a project.
          Baselines can be enabled in Gantt Chart by enabling the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#renderbaseline">renderBaseline</a> property along with mapping the data source values for <code>baselineStartDate</code> and <code>baselineEndDate</code> properties.</p>

        <p>Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the
          <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use markers, inject the
          <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/tooltip#enable-tooltip">documentation section</a>.</p>
        </div>
      </div>
    )
  }
}
