import * as React from 'react';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GanttComponent, TaskFieldsModel, DayMarkers, Inject, Selection, Toolbar, Edit, Resize, ColumnsDirective, ColumnDirective, EditSettingsModel, LabelSettingsModel, ResourceFieldsModel, SplitterSettingsModel, ToolbarItem, TaskType } from '@syncfusion/ej2-react-gantt';
import { resourcesData, resourceCollection } from './data';
import { SampleBase } from '../common/sample-base';

export class ResourceView extends SampleBase<{}, {}> {
  private ganttInstance: GanttComponent;
  public taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    resourceInfo: 'resources',
    work: 'work',
    child: 'subtasks'
  };
  public resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'resourceUnit',
    group: 'resourceGroup'
  };
  public taskType: TaskType = "FixedWork";
  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  public toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
    { text: 'Show/Hide Overallocation', tooltipText: 'Show/Hide Overallocation', id: 'showhidebar' }];
  public splitterSettings: SplitterSettingsModel = {
    columnIndex: 3
  };
  public projectStartDate: Date = new Date('03/26/2025');
  public projectEndDate: Date = new Date('05/18/2025');
  public labelSettings: LabelSettingsModel = {
    rightLabel: 'resources',
    taskLabel: 'Progress'
  };
  public toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'showhidebar') {
      this.ganttInstance.showOverAllocation = this.ganttInstance.showOverAllocation ? false : true;
    }
  };
  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='ResourceView' dataSource={resourcesData} treeColumnIndex={1} viewType='ResourceView'
            allowSelection={true} allowResizing={true} highlightWeekends={true} toolbar={this.toolbar} toolbarClick={this.toolbarClick.bind(this)} editSettings={this.editSettings}
            projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} resourceFields={this.resourceFields}
            taskFields={this.taskFields} taskType={this.taskType} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
            height='650px' taskbarHeight={25} rowHeight={46} resources={resourceCollection} showOverAllocation={true} ref={gantt => this.ganttInstance = gantt}>
            <ColumnsDirective>
              <ColumnDirective field='TaskID' visible={false}></ColumnDirective>
              <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
              <ColumnDirective field='work' headerText='Work'></ColumnDirective>
              <ColumnDirective field='Progress'></ColumnDirective>
              <ColumnDirective field='resourceGroup' headerText='Group'></ColumnDirective>
              <ColumnDirective field='StartDate'></ColumnDirective>
              <ColumnDirective field='Duration'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Selection, DayMarkers, Toolbar, Edit, Resize]} />
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the Resource View in the Gantt Chart, where tasks are organized under their assigned resources. Tasks without resource assignments are displayed under the <code>Unassigned Tasks</code> category. The sample also highlights overallocation ranges and provides an option to show or hide overallocation indicators.</p>
        </div>
        <div id="description">
          <p>The Resource View displays tasks grouped by their assigned resources, providing a resource-centric perspective of the project schedule. This view can be enabled by setting the <code>viewType</code> property to <code>ResourceView</code></p>
          <p>In this example, resources are mapped to tasks using the <code><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#resourcefields">resourceFields</a></code> and <code>taskFields.resourceInfo</code> properties. Tasks without resource assignments are automatically grouped under the <strong>Unassigned Tasks</strong> category.
            Resource overallocation occurs when a resource is scheduled to work on multiple tasks during overlapping time periods. Overallocation ranges are highlighted in the timeline to help identify resource conflicts. The custom toolbar button can be used to show or hide overallocation indicators.</p>
          <p>Resources can be grouped using the following resource field mappings:</p>
          <ul>
            <li><code>ID</code>: To map resource ID.</li>
            <li><code>Name</code>: To map resource name.</li>
            <li><code>Unit</code>: To map resource unit.</li>
            <li><code>Group</code>: To map resource group.</li>
          </ul>
          <p>
            The Gantt control features are segregated into individual feature-wise modules. To use a selection, markers, toolbar, edit, and resize features, we need to inject the <code>Selection</code>, <code>DayMarkers</code>, <code>Toolbar</code>, <code>Edit</code> and <code>Resize</code> into the <code>Inject Services</code> section.
          </p>
          <br/>
          <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/resource-view">resource view</a> documentation section.</p>
          <br/>
          <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
        </div>
      </div>
    )
  }
}
