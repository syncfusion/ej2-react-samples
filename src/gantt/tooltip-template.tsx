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
    var src = 'https://ej2.syncfusion.com/react/demos/src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
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
          <td >Planned Start Date: </td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineStartDate)}</td>
        </tr>
        <tr>
          <td>Planned End Date: </td>
          <td>{this.ganttInstance.getFormatedDate(props.BaselineEndDate)}</td>
        </tr>
        <tr>
          <td>Current Start Date: </td>
          <td>{this.ganttInstance.getFormatedDate(props.StartDate)}</td>
        </tr>
        <tr>
          <td>Current End Date: </td>
          <td >{this.ganttInstance.getFormatedDate(props.EndDate)}</td>
        </tr>
      </tbody>
    </table>);
  };
  public tooltipSettings: any = {
    showTooltip: true,
    taskbar: this.templateTaskbar.bind(this),
    baseline: this.templateBaseline.bind(this)
  };
  public labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public projectStartDate: Date = new Date('03/24/2019');
  public projectEndDate: Date = new Date('05/04/2019');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='TooltipTemplate' ref={gantt => this.ganttInstance = gantt} dataSource={tooltipData} highlightWeekends={true}
            renderBaseline={true} treeColumnIndex={1} tooltipSettings={this.tooltipSettings}
            splitterSettings={this.splitterSettings} taskFields={this.taskFields} labelSettings={this.labelSettings} height='410px'
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} resourceFields={this.resourceFields} resources={editingResources}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' width='60'></ColumnDirective>
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
}
