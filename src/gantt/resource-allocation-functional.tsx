import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, DayMarkers, Inject, Selection, Toolbar, Edit, ColumnsDirective, ColumnDirective, WorkUnit, EditSettingsModel, LabelSettingsModel, ResourceFieldsModel, SplitterSettingsModel, ToolbarItem, TaskType, EditDialogFieldSettingsModel, AddDialogFieldSettingsModel } from '@syncfusion/ej2-react-gantt';
import { resourceAllocationData, resourceAllocationResources } from './data';
import { updateSampleSection } from '../common/sample-base';
import { IEditCell } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';

const ResourceAllocation = () => {
  useEffect(() => {
    updateSampleSection();
  }, [])
  const resColumnTemplate = (props): any => {
    if (props.ganttProperties.resourceNames) {
      if (props.ganttProperties.resourceNames.split('[')[0].includes('Rose Fuller')) {
        return (
          <div style={{ width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#1c5d8e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Fuller King')) {
        return (
          <div style={{ width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#4a7537', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Van Jack')) {
        return (
          <div style={{ width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#b24531', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Bergs Anton')) {
        return (
          <div style={{ width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#a53576', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Tamer Vinet')) {
        return (
          <div style={{ width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#635688', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }
    } else {
      return <div></div>
    }
  }
  const template: any = resColumnTemplate.bind(this);
  let dropdownlistObj: DropDownList;
  let ganttInstance: GanttComponent;
  const dropdownlist: IEditCell = {
    read: () => {
      // Get the selected value from the dropdown
      let value: any = dropdownlistObj.value;
      if (value === null) {
        // If no value is selected, retain the existing resource(s)
        value = ganttInstance.treeGridModule.currentEditRow[ganttInstance.taskFields.resourceInfo];
      }
      else {
        // Update the resource info with the selected value
        ganttInstance.treeGridModule.currentEditRow[ganttInstance.taskFields.resourceInfo] = [value];
      }
      return value;
    },
    destroy: () => {
      dropdownlistObj.destroy();
    },
    write: (args: any) => {
      // Ensure the currentEditRow object is initialized
      ganttInstance.treeGridModule.currentEditRow = {};

      // Retrieve the existing resource(s) from the row data or set default
      let existingResourceIds: any = ganttInstance.treeGridModule.getResourceIds(args.rowData);
      let selectedValue: any = (existingResourceIds && existingResourceIds.length > 0) ? existingResourceIds[0] : null;

      // Initialize the DropDownList
      dropdownlistObj = new DropDownList({
        dataSource: new DataManager(ganttInstance.resources),
        fields: { text: ganttInstance.resourceFields.name, value: ganttInstance.resourceFields.id },
        enableRtl: ganttInstance.enableRtl,
        popupHeight: '350px',
        // Set the existing resource(s) as the selected value
        value: selectedValue,
      });
      // Append the dropdown to the element
      dropdownlistObj.appendTo(args.element as HTMLElement);
    }
  };
  const taskFields: TaskFieldsModel = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    work: 'work',
    resourceInfo: 'resources',
    type: 'taskType'
  };
  const taskType: TaskType = "FixedWork";
  const resourceFields: ResourceFieldsModel = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'unit'
  };
  function queryTaskbarInfo(args: any) {
    if (args.data.ganttProperties.resourceNames) {
      let resourceName: string = args.data.ganttProperties.resourceNames;
      if (resourceName.split('[')[0].includes('Rose Fuller')) {
        args.taskbarBgColor = '#539ed6';
        args.milestoneColor = '#539ed6';
        args.progressBarBgColor = '#1c5d8e';
        args.taskbarBorderColor = '#1c5d8e';
        if (args.data.ganttProperties.progress === 0) {
          args.taskLabelColor = 'black';
        }
      } else if (resourceName.split('[')[0].includes('Van Jack')) {
        args.taskbarBgColor = '#ff826b';
        args.milestoneColor = '#ff826b';
        args.progressBarBgColor = '#b24531';
        args.taskbarBorderColor = '#b24531';
        if (args.data.ganttProperties.progress === 0) {
          args.taskLabelColor = 'black';
        }
      } else if (resourceName.split('[')[0].includes('Bergs Anton')) {
        args.taskbarBgColor = '#ef6fbb';
        args.milestoneColor = '#ef6fbb';
        args.progressBarBgColor = '#a53576';
        args.taskbarBorderColor = '#a53576';
        if (args.data.ganttProperties.progress === 0) {
          args.taskLabelColor = 'black';
        }
      } else if (resourceName.split('[')[0].includes('Fuller King')) {
        args.taskbarBgColor = '#87b972';
        args.milestoneColor = '#87b972';
        args.progressBarBgColor = '#4a7537';
        args.taskbarBorderColor = '#4a7537';
        if (args.data.ganttProperties.progress === 0) {
          args.taskLabelColor = 'black';
        }
      } else if (resourceName.split('[')[0].includes('Tamer Vinet')) {
        args.taskbarBgColor = '#a496cf';
        args.milestoneColor = '#a496cf';
        args.progressBarBgColor = '#635688';
        args.taskbarBorderColor = '#635688';
        if (args.data.ganttProperties.progress === 0) {
          args.taskLabelColor = 'black';
        }
      }
    }
    if (args.taskbarType === 'ParentTask') {
      args.taskbarBgColor = '#adadad';
      args.progressBarBgColor = '#6b6b6b';
      if (args.data.ganttProperties.progress === 0) {
        args.taskLabelColor = 'black';
      }
    }
  };
  const editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  const editDialogFields: EditDialogFieldSettingsModel[] = [
    { type: 'Resources' }
  ];
  const addDialogFields: AddDialogFieldSettingsModel[] = [
    { type: 'Resources' }
  ];
  function cellEdit(args: any) {
    // Restrict editing based on row data
    if (args.rowData.hasChildRecords) {
      args.cancel = true; // Cancel editing for this specific cell
    }
  };
  function actionBegin(args: any) {
    if (args.requestType === 'beforeOpenEditDialog' || args.requestType === 'beforeOpenAddDialog') {
      // Restrict editing based on row data for dialog
      if (args.rowData.hasChildRecords) {
        args.cancel = true; // Cancel editing for this specific row dialog
      }
      args.Resources.selectionSettings = {};
      args.Resources.columns.splice(0, 1);
    }
  };
  function actionComplete(args: any) {
    if (args.requestType === 'add' && !args.data.TaskName) {
      let taskName: string = 'Task Name ' + args.data.TaskID;
      args.data.TaskName = taskName;
      args.data.ganttProperties.taskName = taskName;
      args.data.taskData.TaskName = taskName;
    }
  };
  const toolbar: ToolbarItem[] = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  const splitterSettings: SplitterSettingsModel = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/26/2025');
  const projectEndDate: Date = new Date('07/28/2025');
  const labelSettings: LabelSettingsModel = {
    rightLabel: 'resources',
    taskLabel: '${Progress}%'
  };
  const workUnit: WorkUnit = 'Hour';
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='resource' dataSource={resourceAllocationData} ref={gantt => ganttInstance = gantt} treeColumnIndex={1}
          allowSelection={true} highlightWeekends={true} toolbar={toolbar} editSettings={editSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} resourceFields={resourceFields}
          taskFields={taskFields} taskType={taskType} labelSettings={labelSettings} splitterSettings={splitterSettings}
          height='650px' taskbarHeight={25} rowHeight={46} resources={resourceAllocationResources} workUnit={workUnit} queryTaskbarInfo={queryTaskbarInfo}
          addDialogFields={addDialogFields} editDialogFields={editDialogFields} actionBegin={actionBegin} actionComplete={actionComplete} cellEdit={cellEdit}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' visible={false}></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Task Name' width='180'></ColumnDirective>
            <ColumnDirective field='resources' headerText='Resources' width='190' template={template} edit={dropdownlist}></ColumnDirective>
            <ColumnDirective field='work' headerText='Work' width='110'></ColumnDirective>
            <ColumnDirective field='Duration' headerText='Duration' width='150'></ColumnDirective>
            <ColumnDirective field='taskType' headerText='Task Type' width='150'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, DayMarkers, Toolbar, Edit]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates resource allocation in the Gantt Chart by assigning resources to project tasks and visualizing their workload across the project schedule.</p>
      </div>
      <div id="description">
        <p>This example demonstrates how to assign resources to tasks and visualize resource allocation in the Gantt Chart. Resource information is mapped using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#resourcefields">resourceFields:</a> property and displayed through task labels and resource columns.</p>
        <p>The <code>work</code> field represents the total effort required to complete a task. When work values and resource assignments are defined, task duration and scheduling values are automatically calculated based on the configured <code>workUnit</code>.</p>
        <p>Resources are mapped using the following fields:</p>
        <ul>
          <li><code>id</code>: To map resource ID</li>
          <li><code>name</code>: To map resource name</li>
          <li><code>unit</code>: To map resource unit</li>
        </ul>
        <p>This sample uses the <code>FixedWork</code> task type, where the work value remains constant while duration and resource units are recalculated during editing. The Gantt Chart also supports the following task types:</p>
        <ul>
          <li><code>FixedDuration</code>: Duration remains constant while work and resource units are recalculated.</li>
          <li><code>FixedWork</code>: Work remains constant while duration and resource units are recalculated.</li>
          <li><code>FixedUnit</code>: Resource units remain constant while work and duration are recalculated.</li>
        </ul>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection, markers, edit and toolbar features, we need to inject the <code>Selection</code>, <code>DayMarkers</code>, <code>Toolbar</code> and <code>Edit</code> into the <code>Inject Services</code> section.
        </p>
        <br/>
        <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/resources">resources</a> documentation section.</p>
        <br/>
        <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
      </div>
    </div>
  )
}
export default ResourceAllocation;
