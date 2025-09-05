import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, ColumnsDirective, ColumnDirective, Selection, Inject } from '@syncfusion/ej2-react-gantt';
import { baselineData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './baseline.css'
const Baseline = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
    const themeColors = {
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
  const getCurrentTheme = () => {
        const themeClasses = Object.keys(themeColors); // Extract theme names from themeColors
        const currentTheme = themeClasses.find(theme => document.body.classList.contains(theme));
        return currentTheme || 'material3'; // Default theme
    };
  const [currentTheme, setCurrentTheme] = React.useState('material3'); // Default theme
  const ParentTemplate=(props: any)=>{
    return(
      <div className="e-gantt-parent-taskbar e-row-expand e-custom-parent" style={{height:'10px', marginTop: '17px', background:'#F3F4F6', border: '1px solid #9CA3AF', borderRadius:'5px',textOverflow:'ellipsis'}}>
        <div className="e-gantt-parent-progressbar e-custom-progress" style={{height:'100%', width: props.ganttProperties.progressWidth + 'px', background:'#9CA3AF', borderRadius:'5px',}}></div>
        <span className="e-label" style={{position:'absolute', top:'0px', right:'6px', fontSize:'12px' , textOverflow:'ellipsis', whiteSpace:'nowrap',margin: '0px'}}>{props.TaskName} | {ganttInstance.getFormatedDate(props.ganttProperties.startDate)} - {ganttInstance.getFormatedDate(props.ganttProperties.endDate)} | {props.ganttProperties.duration} days</span>
    </div>
    )
  }
  const rightLabelTemplate=(props: any)=>{
    if(props.ganttProperties.parentId)
    {
      return(
        <span className='e-label'>{props.TaskName}</span>
      )
    }
  };
  const labelSettings: any={
    rightLabel: rightLabelTemplate
  };
  const taskFields: any = {
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
  let ganttInstance: GanttComponent;
  const projectStartDate = new Date('07/02/2025');
  const projectEndDate = new Date('09/15/2025');
  const timelineSettings: any = {
    topTier: {
      unit: 'Month',
      format: 'MMMM yyyy'
    },
    bottomTier: {
      unit: 'Day'
    }
  };
  const queryTaskbarInfo = (args: any) => {
    const newTheme = getCurrentTheme();
    if (newTheme !== currentTheme) {
      setCurrentTheme(newTheme);
    }
    const colors = themeColors[newTheme];
    const taskbarColor = !args.data.ganttProperties.baselineStartDate || 
                        !args.data.ganttProperties.baselineEndDate || 
                        args.data.ganttProperties.startDate <= args.data.ganttProperties.baselineStartDate 
                        ? colors.onTime : colors.delayed;
    const progressColor = !args.data.ganttProperties.baselineStartDate || 
                         !args.data.ganttProperties.baselineEndDate || 
                         args.data.ganttProperties.startDate <= args.data.ganttProperties.baselineStartDate 
                         ? colors.onTimeProgress : colors.delayedProgress;
    if (args.taskbarType !== 'ParentTask') {
      if (currentTheme === 'material3' || currentTheme === 'material3-dark') {
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
    args.baselineColor=colors.baseline;
  };
  const splitterSettings: any={
    columnIndex: 4
  };
  const queryCellInfo = (args: any) => {
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
  const tooltipTemplate = (props): any => {
    return (<table>
<tbody>
<tr><td colSpan={3}>{props.TaskName}</td></tr>
<tr>
<td>Start Time</td><td>:</td>
<td>{ganttInstance.getFormatedDate(props.StartDate)}</td>
</tr>
<tr>
<td>End Time</td><td>:</td>
<td>{ganttInstance.getFormatedDate(props.EndDate)}</td>
</tr>
<tr>
<td>Planned start time</td><td>:</td>
<td>{ganttInstance.getFormatedDate(props.BaselineStartDate)}</td>
</tr>
<tr>
<td>Planned end time</td><td>:</td>
<td>{ganttInstance.getFormatedDate(props.BaselineEndDate)}</td>
</tr>
</tbody>
</table>)
  };
  const template: any = tooltipTemplate;
  const tooltipSettings: any = {
    taskbar: template.bind(this),
  };
  return (
<div className='control-pane'>
<div className='control-section'>
<GanttComponent id='Baseline' ref={gantt => ganttInstance = gantt} dataSource={baselineData} renderBaseline={true} labelSettings={labelSettings}  allowResizing={true}
          treeColumnIndex={1} allowSelection={true} projectStartDate={projectStartDate} projectEndDate={projectEndDate} parentTaskbarTemplate={ParentTemplate}
          taskFields={taskFields} timelineSettings={timelineSettings} includeWeekend={true} queryCellInfo={queryCellInfo} queryTaskbarInfo={queryTaskbarInfo}
          height='650px' taskbarHeight={25} rowHeight={46} tooltipSettings={tooltipSettings} splitterSettings={splitterSettings}>
<ColumnsDirective>
  <ColumnDirective field='TaskId' visible={false} headerText='Task ID' />
  <ColumnDirective field='TaskName' headerText='Task Name' width='200' />
  <ColumnDirective field='StartDate' width='130' />
  <ColumnDirective field='Duration' width='125' />
  <ColumnDirective field='BaselineStartDate' headerText='Baseline StartDate' width='195' />
  <ColumnDirective field='baselineDur' type='string' editType='stringedit' width='195' />
  <ColumnDirective field='variance' headerText='Variance' allowEditing={false} width='130' />
</ColumnsDirective>
<Inject services={[Selection]} />
</GanttComponent>
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
export default Baseline;