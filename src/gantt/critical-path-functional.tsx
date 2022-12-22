import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, Toolbar, CriticalPath, Edit } from '@syncfusion/ej2-react-gantt';
import { projectNewData } from './data';
import { updateSampleSection } from '../common/sample-base';

function Critical() {
    React.useEffect(() => {
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
        child: 'subtasks'
    };
    const editSettings: any = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    const toolbar: any = ['Add', 'Edit', 'Delete', 'CriticalPath'];
    const labelSettings: any = {
        leftLabel: 'TaskName'
    };
    const projectStartDate: Date = new Date('03/24/2019');
    const projectEndDate: Date = new Date('07/06/2019');
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GanttComponent id='Critical' dataSource={projectNewData} treeColumnIndex={1}
                    taskFields={taskFields} labelSettings={labelSettings} height='410px'
                    projectStartDate={projectStartDate} projectEndDate={projectEndDate}
                    enableCriticalPath={true} editSettings={editSettings} toolbar={toolbar}>
                    <ColumnsDirective>
                        <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
                        <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
                        <ColumnDirective field='StartDate'></ColumnDirective>
                        <ColumnDirective field='Duration'></ColumnDirective>
                        <ColumnDirective field='Progress'></ColumnDirective>
                        <ColumnDirective field='Predecessor'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Selection, Toolbar, CriticalPath, Edit]} />
                </GanttComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the rendering of critical path to the Gantt control.</p>
            </div>

            <div id="description">
                <p>
                    In this example, you can see how to render a Gantt chart with critical path. The default timeline
                    view week-day mode is applied to Gantt chart. The dependency lines are enabled in this example to represent the
                    execution order or the hierarchy between the phases.
                </p>
                <p>
                    The critical path is a series of tasks (or sometimes only a single task) that controls the calculated
                    finish date of the project. If a task in a critical path is delayed, then the entire project will be delayed.
                </p>
                <p>
                    Gantt control features are segregated into individual feature-wise modules. To use a critical path, inject the
                    <code>CriticalPath</code> module.
                </p>
                <p>More information on the Critical Path feature can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/critical-path/">
                        documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Critical;
