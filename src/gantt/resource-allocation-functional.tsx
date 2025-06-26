import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, DayMarkers, Inject, Selection, Toolbar, Edit, ColumnsDirective, ColumnDirective, WorkUnit } from '@syncfusion/ej2-react-gantt';
import { resourceAllocationData, resourceAllocationResources } from './data';
import { updateSampleSection } from '../common/sample-base';
import { IEditCell } from '@syncfusion/ej2-grids';
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
          <div style={{ width:'150px', height:'24px', borderRadius:'100px', backgroundColor:'#1c5d8e', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Fuller King')) {
        return (
          <div style={{ width:'150px', height:'24px', borderRadius:'100px', backgroundColor:'#4a7537', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Van Jack')) {
        return (
          <div style={{ width:'150px', height:'24px', borderRadius:'100px', backgroundColor:'#b24531', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Bergs Anton')) {
        return (
          <div style={{ width:'150px', height:'24px', borderRadius:'100px', backgroundColor:'#a53576', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ color: 'white', fontWeight: 500 }}>{props.ganttProperties.resourceNames}</span>
          </div>
        );
      }

      if (props.ganttProperties.resourceNames.split('[')[0].includes('Tamer Vinet')) {
        return (
          <div style={{ width:'150px', height:'24px', borderRadius:'100px', backgroundColor:'#635688', display:'flex', alignItems:'center', justifyContent:'center' }}>
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
  let ganttInstance: any;
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
  const taskFields: any = {
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
  const taskType: any = "FixedWork";
  const resourceFields: any = {
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
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
  };
  const editDialogFields: any = [
    { type: 'Resources' }
  ];
  const addDialogFields: any = [
    { type: 'Resources' }
  ];
  function cellEdit (args: any) {
    // Restrict editing based on row data
    if (args.rowData.TaskID === 1 || args.rowData.TaskID === 5) {
      args.cancel = true; // Cancel editing for this specific cell
    }
  };
  function actionBegin (args: any) {
    if (args.requestType === 'beforeOpenEditDialog' || args.requestType === 'beforeOpenAddDialog') {
      // Restrict editing based on row data for dialog
      if (args.rowData.TaskID === 1 || args.rowData.TaskID === 5) {
        args.cancel = true; // Cancel editing for this specific row dialog
      }
      args.Resources.selectionSettings = {};
      args.Resources.columns.splice(0, 1);
    }
  };
  function actionComplete (args: any) {
    if (args.requestType === 'add' && !args.data.TaskName) {
      let taskName: string = 'Task Name ' + args.data.TaskID;
      args.data.TaskName = taskName;
      args.data.ganttProperties.taskName = taskName;
      args.data.taskData.TaskName = taskName;
    }
  };
  const toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
  const splitterSettings: any = {
    columnIndex: 2
  };
  const projectStartDate: Date = new Date('03/28/2024');
  const projectEndDate: Date = new Date('07/28/2024');
  const labelSettings: any = {
    rightLabel: 'resources',
    taskLabel: '${Progress}%'
  };
  const workUnit: WorkUnit = 'Hour';
  return (
    <div className='control-pane'>
      <div className='control-section'>
        <GanttComponent id='resource' dataSource={resourceAllocationData}  ref={gantt => ganttInstance = gantt} treeColumnIndex={1}
          allowSelection={true} highlightWeekends={true} toolbar={toolbar} editSettings={editSettings}
          projectStartDate={projectStartDate} projectEndDate={projectEndDate} resourceFields={resourceFields}
          taskFields={taskFields} taskType={taskType} labelSettings={labelSettings} splitterSettings={splitterSettings}
          height='450px' resources={resourceAllocationResources} workUnit={workUnit}  queryTaskbarInfo={queryTaskbarInfo}
          addDialogFields= {addDialogFields} editDialogFields={editDialogFields} actionBegin={actionBegin} actionComplete={actionComplete} cellEdit={cellEdit}>
          <ColumnsDirective>
            <ColumnDirective field='TaskID' visible={false} ></ColumnDirective>
            <ColumnDirective field='TaskName' headerText='Task Name' width='180'></ColumnDirective>
            <ColumnDirective field='resources' headerText='Resources' width='190' template={template} edit={dropdownlist}></ColumnDirective>
            <ColumnDirective field='work' width='110'></ColumnDirective>
            <ColumnDirective field='Duration' width='100'></ColumnDirective>
            <ColumnDirective field='taskType' headerText='Task Type' width='110'></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Selection, DayMarkers, Toolbar, Edit]} />
        </GanttComponent>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the options to allocate one or more resources to tasks based on the task requirement.
          The Work is the total labor hours necessary to complete a task. Work can be mapped from the data source field using the property <code>work</code> and when the work value is mapped from the data source,
          the end date and duration of the task will be calculated automatically based on the work and resource unit values from the data source.
          Work can be measured in hours, days and minutes. It is measured in ‘hours’ scale by default and this can be changed by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#workunit">workUnit</a> property.
        </p>
      </div>
      <div id="description">
        <p>
          In this example, you can see how to allocate single or multiple resources for the task. Based on the task complexity and the resource availability, you can plan and allocate the resources to task in the project. In this demo, there is a set of predefined resources and those IDs are assigned to the task. Resource information can be shown in Gantt Chart by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#labelsettings">labelSetting</a> property.</p>
        <p>Resources can be mapped using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#resourcefields">resourceFields:</a>. </p>
        <p><code>id</code>: To map resource ID</p>
        <p><code>name</code>: To map resource name</p>
        <p><code>unit</code>: To map resource unit</p>
        <p>The work, duration and resource unit fields of a task depends upon each other values and will change automatically on editing any one of these fields. But we can also set these field’s values as constant using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#tasktype">taskType</a> property. The following values can be set to the type property:</p>
        <p><code>FixedDuration</code>: Duration task field will remain constant while updating resource unit or work field.</p>
        <p><code>FixedWork</code>: Work field will remain constant while updating resource unit or duration fields.</p>
        <p><code>FixedUnit</code>: Resource units will remain constant while updating duration or work field.</p>
        <p>
          Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the
          <code>Selection</code> module.To use markers, inject the <code>DayMarkers</code> module.
          To edit resource unit, task type and duration, inject the <code>Toolbar</code> and <code>Edit</code> module.
        </p>
      </div>
    </div>
  )
}
export default ResourceAllocation;
