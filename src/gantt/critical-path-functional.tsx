import * as React from 'react';
import { useEffect } from 'react';
import { GanttComponent, TaskFieldsModel, Inject, Selection, ColumnsDirective, ColumnDirective, TimelineSettingsModel, Toolbar, CriticalPath, Edit, EditSettingsModel, LabelSettingsModel, ToolbarItem, EventMarkerModel,  EventMarkersDirective,
  EventMarkerDirective, DayMarkers } from '@syncfusion/ej2-react-gantt';
import { criticalPathData } from './data';
import { updateSampleSection } from '../common/sample-base';

const Critical = () => {
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
        parentID: 'ParentId'
    };
    const editSettings: EditSettingsModel = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    const toolbar: ToolbarItem[] = ['Add', 'Edit', 'Delete', 'CriticalPath'];
    const labelSettings: LabelSettingsModel = {
        rightLabel: 'TaskName'
    };
    const eventMarkers: Date = new Date('04/02/2025');
    const splitterSettings = {
        columnIndex: 2
    };
    const timelineSettings: TimelineSettingsModel = {
        topTier: {
            format: 'MMM dd, yyyy',
            unit: 'Week',
        },
        bottomTier: {
            unit: 'Day',
        },
        viewEndDate: new Date('06/07/2025')
    };
    const projectStartDate: Date = new Date('03/30/2025');
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <GanttComponent id='Critical' dataSource={criticalPathData} treeColumnIndex={1}
                    taskFields={taskFields} labelSettings={labelSettings} height='650px' taskbarHeight={25} rowHeight={46} timelineSettings={timelineSettings}
                    projectStartDate={projectStartDate} splitterSettings={splitterSettings} enableCriticalPath={true} editSettings={editSettings} toolbar={toolbar}>
                    <ColumnsDirective>
                        <ColumnDirective field='TaskID' width='80' ></ColumnDirective>
                        <ColumnDirective field='TaskName' headerText='Job Name' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
                        <ColumnDirective field='StartDate'></ColumnDirective>
                        <ColumnDirective field='Duration'></ColumnDirective>
                        <ColumnDirective field='Progress'></ColumnDirective>
                        <ColumnDirective field='Predecessor'></ColumnDirective>
                    </ColumnsDirective>
                    <EventMarkersDirective>
                        <EventMarkerDirective
                            day={eventMarkers}
                            cssClass="e-custom-event-marker"
                            label="Project planning and kickoff"
                            top="138px"
                        ></EventMarkerDirective>
                    </EventMarkersDirective>
                    <Inject services={[Selection, Toolbar, CriticalPath, Edit, DayMarkers]} />
                </GanttComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the critical path feature in the Gantt Chart, providing visibility into the sequence of tasks that directly influences project completion.</p>
            </div>
            <div id="description">
                <p>
                    The Gantt Chart supports critical path analysis, which identifies the sequence of tasks that determines the overall project completion date. Critical tasks are highlighted to help monitor activities that have a direct impact on project delivery. Any delay in a critical task results in a corresponding delay to the project completion date. Monitoring the critical path helps project managers identify scheduling risks and prioritize key activities.
                </p>
                <p>In this sample, critical path visualization is enabled using the <code>enableCriticalPath</code> property. The toolbar also provides a built-in <code>CriticalPath</code> option for displaying critical tasks and dependencies</p>
                <p>Gantt component features are segregated into individual feature-wise modules. To use Critical path, selection, edit, and toolbar features, we need to inject <code>CriticalPath</code>, <code>Selection</code>, <code>Edit</code>, <code>DayMarkers</code> and <code>Toolbar</code> into the <code>Inject Services</code> section.</p>
                <br/>
                <p>More information on the Essential<sup>®</sup> React Gantt Chart can be found in this <a target="_blank" rel="noopener noreferrer" href="https://ej2.syncfusion.com/react/documentation/gantt/critical-path/">critical path</a> documentation section.</p>
                <br/>
                <p>Looking for the full React Gantt Chart component overview, features, pricing, and documentation? Visit the <a target="_blank" href="https://www.syncfusion.com/react-components/react-gantt-chart">React Gantt Chart</a> page.</p>
            </div>
        </div>
    )
}
export default Critical;
