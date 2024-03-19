import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { GanttComponent, DayMarkers, Inject, Selection, Toolbar, Edit, Resize, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { resourcesData, resourceCollection } from './data';
import { updateSampleSection } from '../common/sample-base';

const ResourceView = () => {
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
    work: 'work',
    child: 'subtasks'
  };
  const taskType: any = "FixedWork";
  const resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'resourceUnit',
    group: 'resourceGroup'
  };
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  const toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
    { text: 'Show/Hide Overallocation', tooltipText: 'Show/Hide Overallocation', id: 'showhidebar' }];
  const splitterSettings: any = {
    columnIndex: 3
  };
  const projectStartDate: Date = new Date('03/28/2019');
  const projectEndDate: Date = new Date('05/18/2019');
  const labelSettings: any = {
    rightLabel: 'resources',
    taskLabel: 'Progress'
  };
  const toolbarClick = (args: ClickEventArgs): void => {
    if (args.item.id === 'showhidebar') {
      ganttInstance.current.showOverAllocation = ganttInstance.current.showOverAllocation ? false : true;
    }
  };
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='ResourceView' dataSource={resourcesData} treeColumnIndex={1} viewType='ResourceView'
          allowSelection={true} allowResizing={true} highlightWeekends={true} toolbar={toolbar} toolbarClick={toolbarClick.bind(this)} editSettings={editSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} resourceFields={resourceFields}
          taskFields={taskFields} taskType={taskType} labelSettings={labelSettings} splitterSettings={splitterSettings}
          height='410px' resources={resourceCollection} showOverAllocation={true} ref={ganttInstance}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' visible={false} ></ColumnDirective>
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
        <p>This sample explains the Resource break down view in the Gantt chart that is
          how to visualize the list of tasks assigned to each resource in hierarchy manner and switch the resources as per users need by task
          editing mode.If the no resources are mapped in a task, then it will come under “unassigned Tasks” category.
          This feature can be enabled by setting the <code>viewType</code> property to “ResourceView”.</p>
        <p>When a resource is assigned with two or more tasks which is scheduleduling on a same date is termed as over allocation for a resource.
          The number of over allocation dates ranges are highlighted as with square bracket. The following sample demonstrates the over allocation for a resource.
          In this sample, over allocation can be hidden by using the CSS ‘visibility’ property on custom toolbar item action.
        </p>
      </div>
      <div id="description">
        <p>
          In this example, you can see the resource break down from a bulk of tasks done by mapping the predefined resource ID-s to each task and resource information can be shown by using the <code>labelSetting</code> property.
          Using the toolbar action, you can perform CRUD operation for resource allocation based on their availability and task complexity.</p>
        <p>The resources and tasks assigned to those resources can be grouped into categories. Resources can be mapped using the <code>resourceFields:-</code>.</p>
        <p><code>ID</code>: To map resource ID.</p>
        <p><code>Name</code>: To map resource name.</p>
        <p><code>Unit</code>: To map resource unit.</p>
        <p><code>Group</code>: To map resource group.</p>
        <p>
          The Gantt control features are segregated into individual feature-wise modules. To use a selection, inject the
          <code>Selection</code> module using the <code>Gantt.Inject(Selection)</code> method. To use markers, inject the
          <code>DayMarkers</code> module using the <code>Gantt.Inject(DayMarkers)</code> method.
          To edit,  inject the <code>Toolbar</code> module using the <code>Gantt.Inject(Toolbar)</code> method and <code>Edit</code> module
          using the <code>Gantt.Inject(Edit)</code> method.
        </p>
      </div>
    </div>
  )
}
export default ResourceView;
