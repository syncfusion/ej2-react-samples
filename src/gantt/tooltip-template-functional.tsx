import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective, ResourceFieldsModel, LabelSettingsModel, SplitterSettingsModel } from '@syncfusion/ej2-react-gantt';
import { tooltipData, editingResources } from './data';
import { updateSampleSection } from '../common/sample-base';

const TooltipTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  const taskFields: TaskFieldsModel = {
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
  const resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName'
  };
  const taskbarTooltip = (props) => {
    var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
    return (
      <table>
        <tbody>
          {props.ganttProperties.resourceNames &&
            <tr>
              <td rowSpan={3} style={{ padding: '3px' }}>
                <img src={src} height='40px' />
              </td>
              <td style={{ padding: '3px' }}>Task done By:</td>
              <td style={{ padding: '3px' }}>{props.ganttProperties.resourceNames}</td>
            </tr>
          }
          <tr>
            <td style={{ padding: '3px' }}>Starts On:</td>
            <td style={{ padding: '3px' }}>{ganttInstance.current.getFormatedDate(props.StartDate)}</td>
          </tr>
          <tr>
            <td style={{ padding: '3px' }}>Ends On:</td>
            <td style={{ padding: '3px' }}>{ganttInstance.current.getFormatedDate(props.EndDate)}</td>
          </tr>
        </tbody>
      </table>
    );
  };
  const templateTaskbar: any = taskbarTooltip;
  const baselineTooltip = (props) => {
    return (<table>
      <tbody>
        <tr>
          <td>Planned Start Date:</td>
          <td>{ganttInstance.current.getFormatedDate(props.BaselineStartDate)}</td>
        </tr>
        <tr>
          <td>Planned End Date:</td>
          <td>{ganttInstance.current.getFormatedDate(props.BaselineEndDate)}</td>
        </tr>
        <tr>
          <td>Current Start Date:</td>
          <td>{ganttInstance.current.getFormatedDate(props.StartDate)}</td>
        </tr>
        <tr>
          <td>Current End Date:</td>
          <td>{ganttInstance.current.getFormatedDate(props.EndDate)}</td>
        </tr>
      </tbody>
    </table>);
  };
  const templateBaseline: any = baselineTooltip;
  const timelineTooltip = (props) => {
    const tier = props.tier;
    const date = props.date;
    const endDate = new Date(date);
    if (tier === 'topTier' && ganttInstance.current.timelineSettings.topTier.unit) {
      endDate.setDate(endDate.getDate() + 6);
    }
    const data = getTooltipData(new Date(date), endDate, tier);

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
        <div style={{ display: 'flex', paddingBottom: '5px', paddingTop: '9px' }}>
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
  const templateTimeline: any = timelineTooltip;
  const getTooltipData = (startDate: Date, endDate: Date, tier: string) => {
    const gantt = ganttInstance.current;
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
  const tooltipSettings: any = {
    showTooltip: true,
    taskbar: templateTaskbar.bind(this),
    baseline: templateBaseline.bind(this),
    timeline: templateTimeline.bind(this),
  };
  const labelSettings: LabelSettingsModel = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('06/01/2025');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='TooltipTemplate' ref={ganttInstance} dataSource={tooltipData} highlightWeekends={true}
          renderBaseline={true} treeColumnIndex={1} tooltipSettings={tooltipSettings}
          splitterSettings={splitterSettings} taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} resourceFields={resourceFields} resources={editingResources}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate' ></ColumnDirective>
            <ColumnDirective field='Duration' ></ColumnDirective>
            <ColumnDirective field='Predecessor' ></ColumnDirective>
            <ColumnDirective field='Progress' ></ColumnDirective>
            <ColumnDirective field='BaselineStartDate' width={200} ></ColumnDirective>
            <ColumnDirective field='BaselineEndDate' width={200} ></ColumnDirective>
            <ColumnDirective field='resources' ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates tooltip template customization in the Gantt Chart. Custom tooltips are configured for taskbars, baselines, and timeline cells to display additional contextual information.</p>
      </div>

      <div id="description">
        <p>The Gantt Chart provides support for customizing tooltip content through the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/">tooltipSettings</a> property. Tooltips can display rich content such as images, formatted text, task information, and calculated metrics.</p>
        <p>In this example, custom templates are configured for the following tooltip types:</p>
        <ul>
          <li><code>taskbar</code> - Displays resource information, task start date, and task end date.</li>
          <li><code>baseline</code> - Compares planned dates with the current task schedule.</li> 
          <li><code>timeline</code> - Displays timeline statistics such as active tasks, milestone count, and overall progress.</li>
        </ul>
        <p>Tooltip rendering can be enabled or disabled using the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt/tooltipSettings/#showtooltip">tooltipSettings.showTooltip</a></code> property.</p>
        <p>Gantt component features are segregated into individual feature-wise modules.To use a selection and marker features, we need to inject the 
          <code>Selection</code> and <code>DayMarkers</code> into the <code>Inject Services</code> section.</p>
        <br />
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/taskbar#customize-tooltip-templates">tooltip template</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default TooltipTemplate;
