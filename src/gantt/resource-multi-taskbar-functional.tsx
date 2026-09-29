import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, TaskFieldsModel, DayMarkers, Inject, Selection, Toolbar, Edit, Resize, ColumnsDirective, ColumnDirective, RowDD, EditSettingsModel, LabelSettingsModel, ResourceFieldsModel, SplitterSettingsModel, ToolbarItem, TaskType } from '@syncfusion/ej2-react-gantt';
import { multiTaskbarData, resources } from './data';
import { updateSampleSection } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './resource-multi-taskbar.css';

const ResourceMultiTaskbar = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const taskFields: TaskFieldsModel = {
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
    const taskType: TaskType = 'FixedWork';
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
    const resourceFields: ResourceFieldsModel = {
        id: 'resourceId',
        name: 'resourceName',
        unit: 'resourceUnit',
        group: 'resourceGroup'
    };
    const editSettings: EditSettingsModel = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    const toolbar: ToolbarItem[] = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    const splitterSettings: SplitterSettingsModel = {
        columnIndex: 2
    };
    const projectStartDate: Date = new Date('03/26/2025');
    const projectEndDate: Date = new Date('05/30/2025');
    const labelSettings: LabelSettingsModel = {
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
                            height='650px' taskbarHeight={25} rowHeight={46} resources={resources} showOverAllocation={true}>
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
                    This example demonstrates how to enable taskbar drag-and-drop functionality for reassigning tasks between resources vertically by setting the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowtaskbardraganddrop">allowTaskbarDragAndDrop</a> property to <code>true</code>. Additionally, you can prevent taskbar overlap within a resource's tasks by disabling the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/gantt#allowtaskbaroverlap">allowTaskbarOverlap</a> property.
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
                <p>
                    The Gantt control features are segregated into individual feature-wise modules. To use a selection, row drag and drop, toolbar, edit, markers, and resize features, we need to inject the <code>Selection</code>, <code>RowDD</code>, <code>Toolbar</code>, <code>Edit</code>, <code>DayMarkers</code>, and <code>Resize</code> into the <code>Inject services</code> section.
                </p>
                <br/>
                <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/multi-taskbar">resource multi taskbar</a> documentation section.</p>
                <br/>
                <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
            </div>
        </div>
    )
}
export default ResourceMultiTaskbar;
