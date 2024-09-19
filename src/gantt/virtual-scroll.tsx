import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnDirective, ColumnsDirective, VirtualScroll } from '@syncfusion/ej2-react-gantt';
import { virtualData } from './data';
import { SampleBase } from '../common/sample-base';

export class Virtualscroll extends SampleBase<{}, {}> {
  public taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'parentID'
  };
  public splitterSettings: any = {
    columnIndex: 2
  };
  public labelSettings: any = {
    taskLabel: 'Progress'
  };
  public projectStartDate: Date = new Date('04/01/2024');
  public projectEndDate: Date = new Date('12/31/2030');
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='SplitTasks' dataSource={virtualData} treeColumnIndex={1} labelSettings={this.labelSettings}
            allowSelection={true} highlightWeekends={true} enableVirtualization={true} enableTimelineVirtualization={true}
            taskFields={this.taskFields} splitterSettings={this.splitterSettings} height='450px' projectEndDate={this.projectEndDate} projectStartDate={this.projectStartDate}>
			<ColumnsDirective>
                    <ColumnDirective field='TaskID'/>
                    <ColumnDirective field='TaskName' headerText='Task Name'/>
                    <ColumnDirective field='StartDate'/>
                    <ColumnDirective field='Duration'/>
                    <ColumnDirective field='Progress'/>
                </ColumnsDirective>
            <Inject services={[Selection, VirtualScroll]} />
          </GanttComponent>
        </div>
        <div id="action-description">
        <p>This sample demonstrates the Virtual Scroll support in the Gantt Chart. This feature allows users to load a large amount of data effectively.
          It also reduces the DOM element's weight by virtually updating DOM during the vertical scroll and also in timeline during horizontal scroll.</p>
      </div>
      <div id="description">
        <p>Virtualization support is used to render large number tasks in Gantt with effective performance. In this mode all the tasks are
          fetched from data source initially, then some of the records are rendered in DOM which are compact to the current viewport area.
          While scrolling tasks are updated in DOM as per current viewport position. This mode can be enabled by setting
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#enablevirtualization">enableVirtualization</a> property as true. Additionally, the Gantt component now includes the timeline virtualization feature by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#enabletimelinevirtualization">enableTimelineVirtualization</a> to true.</p>
        <p>This demo highlights the utilization of row and timeline virtualization features within the Gantt.</p>
        <p>By default during Virtual scroll Shimmer effect is enabled you can disable this by changing <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#enablevirtualmaskrow">enableVirtualMaskRow</a> to false</p>
      </div>
      </div>
    )
  }
}
