import * as React from 'react';
import { GanttComponent, Inject, Edit, Toolbar, Selection } from '@syncfusion/ej2-react-gantt';
import { unscheduledData } from './data';
import { SampleBase } from '../common/sample-base';
import './unscheduled.css';
export class UnscheduledTask extends SampleBase {
    constructor() {
        super(...arguments);
        this.taskFields = {
            id: 'TaskId',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
        };
        this.editSettings = {
            allowAdding: true,
            allowEditing: true,
        };
        this.toolbar = [{ text: 'Insert task', tooltipText: 'Insert task at top', id: 'toolbarAdd', prefixIcon: 'e-add-icon tb-icons' }];
        this.labelSettings = {
            leftLabel: 'TaskName',
            rightLabel: 'TaskType'
        };
        this.splitterSettings = {
            columnIndex: 4
        };
        this.columns = [
            { field: 'TaskId', width: 75 },
            { field: 'TaskName', width: 80 },
            { field: 'StartDate', width: 120 },
            { field: 'EndDate', width: 120 },
            { field: 'Duration', width: 90 },
            { field: 'TaskType', visible: false }
        ];
        this.projectStartDate = new Date('01/01/2019');
        this.projectEndDate = new Date('01/20/2019');
    }
    toolbarClickEvent() {
        var data = {
            Duration: null,
            StartDate: null,
            EndDate: null,
            TaskType: ''
        };
        this.ganttInstance.addRecord(data);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GanttComponent id='Unscheduled' ref={gantt => this.ganttInstance = gantt} dataSource={unscheduledData} taskFields={this.taskFields} height='410px' editSettings={this.editSettings} allowSelection={true} toolbar={this.toolbar} labelSettings={this.labelSettings} allowUnscheduledTasks={true} toolbarClick={this.toolbarClickEvent.bind(this)} splitterSettings={this.splitterSettings} columns={this.columns} projectStartDate={this.projectStartDate} projectEndDate={this.projectEndDate}>
            <Inject services={[Toolbar, Edit, Selection]}/>
          </GanttComponent>
        </div>
        <div id="action-description">
          <p>This sample visualizes the support for displaying unscheduled tasks in Gantt and adding empty rows using the custom toolbar button.</p>
        </div>

        <div id="description">
          <p>
              Unscheduled tasks are tasks in a project that are not scheduled with proper dates or duration at the commencement of the project.
            These tasks can be scheduled properly at any time during project implementation based on factors such as resource availability, dependent tasks, and more.
            This example shows how to display the unscheduled tasks in Gantt by enabling the <code>allowUnscheuldedTasks</code> property.
            This also shows how to add an empty row in Gantt by using a custom toolbar button click action. By using the <code>toolbarClick</code> event and <code>addRecord</code> method,
            an empty row can be added at the top of the rows with undefined task details.
          </p>
          <p>
            Gantt component features are segregated into individual feature-wise modules. To use a toolbar and add support, inject the <code>Toolbar</code> and <code>Edit</code> module.
            To use a selection, inject the <code>Selection</code> module.
          </p>
        </div>
      </div>);
    }
}
