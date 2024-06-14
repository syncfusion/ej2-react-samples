import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, DayMarkers, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { tooltipData, editingResources } from './data';
import { updateSampleSection } from '../common/sample-base';

const TooltipTemplate = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  let ganttInstance = useRef<GanttComponent>(null);
  const taskFields: any = {
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
  const resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName'
  };
  const taskbarTooltip = (props) => {
    var src = 'https://ej2.syncfusion.com/react/demos/src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
    return (<table>
      {props.ganttProperties.resourceNames &&
        <tr>
          <td rowSpan={3} style={{ padding: '3px' }}><img src={src} height='40px' /></td>
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
    </table>);
  };
  const templateTaskbar: any = taskbarTooltip;
  const baselineTooltip = (props) => {
    return (<table>
      <tbody>
        <tr>
          <td >Planned Start Date: </td>
          <td>{ganttInstance.current.getFormatedDate(props.BaselineStartDate)}</td>
        </tr>
        <tr>
          <td>Planned End Date: </td>
          <td>{ganttInstance.current.getFormatedDate(props.BaselineEndDate)}</td>
        </tr>
        <tr>
          <td>Current Start Date: </td>
          <td>{ganttInstance.current.getFormatedDate(props.StartDate)}</td>
        </tr>
        <tr>
          <td>Current End Date: </td>
          <td >{ganttInstance.current.getFormatedDate(props.EndDate)}</td>
        </tr>
      </tbody>
    </table>);
  };
  const templateBaseline: any = baselineTooltip;
  const tooltipSettings: any = {
    showTooltip: true,
    taskbar: templateTaskbar.bind(this),
    baseline: templateBaseline.bind(this)
  };
  const labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  const splitterSettings: any = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/24/2024');
  const projectEndDate: Date = new Date('05/04/2024');
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='TooltipTemplate' ref={ganttInstance} dataSource={tooltipData} highlightWeekends={true}
          renderBaseline={true} treeColumnIndex={1} tooltipSettings={tooltipSettings}
          splitterSettings={splitterSettings} taskFields={taskFields} labelSettings={labelSettings} height='410px'
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} resourceFields={resourceFields} resources={editingResources}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' width='80'></ColumnDirective>
            <ColumnDirective field='TaskName' width='250'></ColumnDirective>
            <ColumnDirective field='StartDate'></ColumnDirective>
            <ColumnDirective field='EndDate' ></ColumnDirective>
            <ColumnDirective field='Duration' ></ColumnDirective>
            <ColumnDirective field='Predecessor' ></ColumnDirective>
            <ColumnDirective field='Progress' ></ColumnDirective>
            <ColumnDirective field='BaselineStartDate' ></ColumnDirective>
            <ColumnDirective field='BaselineEndDate' ></ColumnDirective>
            <ColumnDirective field='resources' ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, DayMarkers]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample explains the way of rendering tooltip template for taskbar and baseline by mapping template
          elements to the property of taskbar and baseline in <code>tooltipSettings</code>.</p>
      </div>

      <div id="description">
        <p>Tooltip can be enabled or disabled using <code>tooltipSettings.showTooltip</code> property.In this demo, the
          tooltip template is rendered for <code>taskbar</code> and <code>baseline</code> using the
          <code>tooltipSettings.taskbar</code> and <code>tooltipSettings.baseline</code> properties.</p>
        <p>The baseline feature enables the user to view the deviation between the planned dates and the actual dates of the tasks in a project.
          Baselines can be enabled in Gantt chart by enabling the <code>renderBaseline</code> property along with mapping the data source values for <code>baselineStartDate</code> and <code>baselineEndDate</code> properties.</p>

        <p>Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the
          <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method.To use markers, inject the
          <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.</p>
      </div>
    </div>
  )
}
export default TooltipTemplate;
