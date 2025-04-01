import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, DayMarkers, Inject, Selection, Toolbar, Edit, Resize, ColumnsDirective, ColumnDirective, RowDD } from '@syncfusion/ej2-react-gantt';
import { multiTaskbarData, resources } from './data';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent, CheckBox, SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './resource-multi-taskbar.css';

const ResourceMultiTaskbar = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
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
        expandState: 'isExpand',
        child: 'subtasks'
    };
    const taskType = 'FixedWork';
    let ganttInstance = useRef<GanttComponent>(null);
    const dragDropChange = (args): any => {
        if (args.checked) {
          ganttInstance.current.allowTaskbarDragAndDrop = true;
        } else {
          ganttInstance.current.allowTaskbarDragAndDrop = false;
        }
    }
    const overlapChange = (args): any => {
        if (args.checked) {
          ganttInstance.current.allowTaskbarOverlap = true;
        } else {
          ganttInstance.current.allowTaskbarOverlap = false;
        }
    }
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
    const toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    const splitterSettings: any = {
        columnIndex: 2
    };
    const projectStartDate: Date = new Date('03/28/2024');
    const projectEndDate: Date = new Date('05/18/2024');
    const labelSettings: any = {
        taskLabel: 'TaskName'
    };
    return (
        <div className='control-pane'>
            <div className='control-section'>
            <div className='col-lg-12'>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex' }}>
                <label htmlFor="checked" id="ResourceMultiTaskbarallow" style={{ fontSize: '15px', margin: '0px 5px 0px 0px' }}> Allow Taskbar Drag And Drop </label>
                <div>
                <SwitchComponent id="checked" change={dragDropChange.bind(this)}></SwitchComponent>
              </div>
              </div>
              <div style={{ display: 'flex' }}>
                <label htmlFor="unchecked" id="ResourceMultiTaskbarallow" style={{ fontSize: '15px', margin: '0px 5px 0px 5px' }}> Allow Taskbar Overlap </label>
                <div>
                <SwitchComponent id="unchecked" checked={true} change={overlapChange.bind(this)}></SwitchComponent>
              </div>
              </div>
            </div>
            <div>
                <GanttComponent id='ResourceMultiTaskbar' ref={ganttInstance} dataSource={multiTaskbarData} treeColumnIndex={1} viewType='ResourceView' enableMultiTaskbar={true}
                    allowSelection={true} allowResizing={true} highlightWeekends={true} toolbar={toolbar} editSettings={editSettings}
                    projectStartDate={projectStartDate} projectEndDate={projectEndDate} resourceFields={resourceFields}
                    taskFields={taskFields} taskType={taskType} labelSettings={labelSettings} splitterSettings={splitterSettings}
                    height='410px' resources={resources} showOverAllocation={true}>
                    <ColumnsDirective>
                        <ColumnDirective field='TaskID' visible={false} ></ColumnDirective>
                        <ColumnDirective field='TaskName' headerText='Name' width='250'></ColumnDirective>
                        <ColumnDirective field='work' headerText='Work'></ColumnDirective>
                        <ColumnDirective field='Progress'></ColumnDirective>
                        <ColumnDirective field='resourceGroup' headerText='Group'></ColumnDirective>
                        <ColumnDirective field='StartDate'></ColumnDirective>
                        <ColumnDirective field='Duration'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Selection, DayMarkers, Toolbar, Edit, Resize, RowDD]} />
                </GanttComponent>
            </div>
            </div>
        </div>
            <div id="action-description">
                <p>This sample demonstrates how to visualize a list of tasks assigned to a resource within a collapsed parent row. It also allows modifying task scheduling actions such as dragging, left resizing, and progress editing while keeping the parent row collapsed.
                    This functionality can be enabled by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#enablemultitaskbar">enableMultiTaskbar</a> property to <code>true</code>.
                </p>
            </div>
            <div id="description">
                <p>
                    This example demonstrates how to enable taskbar drag-and-drop functionality for reassigning tasks between resources vertically by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowtaskbardraganddrop">allowTaskbarDragAndDrop</a> property to <code>true</code>. Additionally, you can prevent taskbar overlap within a resource's tasks by disabling the <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/gantt#allowtaskbaroverlap">allowTaskbarOverlap</a> property.
                </p>
                <p>
                    In this example, resources are assigned to tasks using predefined resource IDs, allowing efficient task distribution. The resource details are displayed using the <code>labelSetting</code> property.
                    You can also perform CRUD operations on resource allocation using toolbar actions, considering availability and task complexity.
                </p>
                <p>The resources and their assigned tasks are grouped into categories. Resources can be mapped using the following <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#resourcefields">resourceFields:</a>.</p>
                <p><code>ID</code>: Maps the resource ID.</p>
                <p><code>Name</code>: Maps the resource name.</p>
                <p><code>Unit</code>: Map the resource unit.</p>
                <p><code>Group</code>: Maps the resource group.</p>
                <p><code>Injecting module:</code></p>
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
export default ResourceMultiTaskbar;
