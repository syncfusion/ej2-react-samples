import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, DayMarkers, Inject, Selection, Toolbar, Edit, Resize, ColumnsDirective, ColumnDirective, RowDD } from '@syncfusion/ej2-react-gantt';
import { multiTaskbarData, resources } from './data';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { CheckBoxComponent, SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { Thickness } from '@syncfusion/ej2/drawings';

export class ResourceMultiTaskbar extends SampleBase<{}, {}> {
    public taskFields: any = {
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
    public taskType: any = 'FixedWork';
    public ganttInstance: any;
    public resourceFields: any = {
        id: 'resourceId',
        name: 'resourceName',
        unit: 'resourceUnit',
        group: 'resourceGroup'
    };
    public editSettings: any = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    public toolbar: any = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    public splitterSettings: any = {
        columnIndex: 2
    };
    public dragDropChange(args:any): any {
      if (args.checked) {
        this.ganttInstance.allowTaskbarDragAndDrop = true;
      } else {
        this.ganttInstance.allowTaskbarDragAndDrop = false;
      }
  }
  public overlapChange(args:any): any {
      if (args.checked) {
        this.ganttInstance.allowTaskbarOverlap = true;
      } else {
        this.ganttInstance.allowTaskbarOverlap = false;
      }
  }
    public projectStartDate: Date = new Date('03/28/2019');
    public projectEndDate: Date = new Date('05/18/2019');
    public labelSettings: any = {
        taskLabel: 'TaskName'
    };
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                <div className='col-lg-12'>
                <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                <label htmlFor="checked" style={{ fontSize: '15px', margin: '0px 5px 0px 0px' }}> Allow Taskbar Drag And Drop </label>
                <div>
                <SwitchComponent id="checked" change={this.dragDropChange.bind(this)}></SwitchComponent>
              </div>
              </div>
              <div style={{ display: 'flex' }}>
                <label htmlFor="unchecked" style={{ fontSize: '15px', margin: '0px 5px 0px 5px' }}> Allow Taskbar Overlap </label>
                <div>
                <SwitchComponent id="unchecked" checked={true} change={this.overlapChange.bind(this)}></SwitchComponent>
              </div>
              </div>
            </div>
            <div>
                    <GanttComponent id='ResourceMultiTaskbar' ref={gantt => this.ganttInstance = gantt} dataSource={multiTaskbarData} treeColumnIndex={1} viewType='ResourceView' enableMultiTaskbar= {true}
                        allowSelection={true} allowResizing={true} highlightWeekends={true} toolbar={this.toolbar} editSettings={this.editSettings}
                        projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate} resourceFields={this.resourceFields}
                        taskFields={this.taskFields} taskType={this.taskType} labelSettings={this.labelSettings} splitterSettings={this.splitterSettings}
                        height='410px' resources={resources} showOverAllocation= {true}>
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
                    <p>This sample explains you about, how to visualize the list of tasks assigned for a resource in a parent row of collapsed state.  It is also possible to change the tasks scheduling in the collapsed state.
        This feature can be enabled by setting the <code>enableMultiTaskbar</code> property as "true".
    </p>
                </div>

                <div id="description">
                    <p>
                        In this example, you can enable taskbar drag and drop from one resource to another resource vertically by enabling <code>allowTaskbarDragAndDrop</code> property. Also, you can prevent the taskbar overlap  in resource task by disabling the <code>allowTaskbarOverlap</code> property.
                    </p>
                    <p>
                        In this example, you can see that, the resource breaks down from a bulk of tasks can be done by mapping the pre-defined resource ID-s to each task and the resource information can be shown by using the labelSetting property.
                        Using the toolbar action, you can perform the CRUD operation for the resource allocation based on their availability and task complexity.
    </p>
                    <p>The resources and tasks assigned to those resources can be grouped into categories. Resources can be mapped using the <code>resourceFields:-</code>.</p>
                    <p><code>ID</code>: To map resource ID.</p>
                    <p><code>Name</code>: To map resource name.</p>
                    <p><code>Unit</code>: To map resource unit.</p>
                    <p><code>Group</code>: To map resource group.</p>
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
}
