import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { GanttComponent, Inject, Selection, ColumnsDirective, ColumnDirective, Toolbar, CriticalPath, Edit } from '@syncfusion/ej2-react-gantt';
import { criticalPathData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Critical = () => {
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
        parentID: 'ParentId'
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
    const projectStartDate: Date = new Date('03/26/2025');
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GanttComponent id='Critical' dataSource={criticalPathData} treeColumnIndex={1}
                    taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46}
                    projectStartDate={projectStartDate}
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
                    In this example, you can see how to render a Gantt Chart with critical path. The default timeline
                    view week-day mode is applied to Gantt Chart. The dependency lines are enabled in this example to represent the
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
                <br />
                <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/gantt/critical-path/">documentation section</a>.</p>
            </div>
        </div>
    )
}
export default Critical;
