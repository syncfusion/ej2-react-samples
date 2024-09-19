import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Toolbar, Edit, Selection, ColumnsDirective, ColumnDirective, Inject,
    Sort, Reorder, ContextMenu, DayMarkers
 } from '@syncfusion/ej2-react-gantt';
import { tasksCollection, resourceCollection } from './datasource';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

function ResourceOptimization() {
    let ganttInstance: GanttComponent;
    const taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        resourceInfo: 'resourceInfo',
        work: 'work',
        child: 'subtasks'
    };
    const toolbarTemplate = () => {
        return <ButtonComponent id='toolbarButton' isPrimary={true}>Optimize resource allocation</ButtonComponent>
    }

    const toolbarOptions = [{
        template: toolbarTemplate, text: 'Optimize resource allocation'
    }]

    function toolbarClick(args: any) {
        if (args.item.text === 'Optimize resource allocation') {
            ganttInstance.showSpinner();
            let input = `I want you to act as an AI assistant tasked with updating resource assignments to tasks in a project management system. Your goal is to ensure that resources are not assigned to tasks that overlap in timeline with another task assigned to the same resource.
          This means checking the start and end dates of all tasks assigned to each resource and making sure no resource is double-booked during any task's duration. If you find that a resource is assigned multiple tasks with overlapping timelines(dates same or conflict any date), replace the conflicting task with another resource that has no tasks overlapping the same dates.
          Aim to reassign tasks in a way that ensures every task is assigned to a resource, minimizing the chance of any task being left unassigned unless it is unavoidable due to scheduling conflicts.
          Below is the list of tasks and their current details. It includes taskCollection Data with "resourceInfo" field as integer array collection which is assigned to respective tasks.This resourceInfo integer will be referencing from resourceId field of separate resourceCollection.
          First rearrange taskCollection based on resourceId, then if any resource tasks are overlapped in timeline, reassign any one of the task to other resource by comparing its existing tasks dates, if that too overlap in timeline try changing other resource, if you cannot reassign any one of the resource due to conflict then left the field blank. return only newly prepared collection as json format if you done any reassignment. I dont want code to achieve this, apply your logic to given taskcollection and resourceCollection and return only result in json format.
          Do not return any content or any other additional information only return JSON.
            Task Collection Data:` + JSON.stringify(tasksCollection);
            `Resource Collection Data:` + JSON.stringify(resourceCollection);
            let aioutput = (window as any).getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
            aioutput.then((result: any) => {
                let cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
                cleanedJsonData = cleanedJsonData.replace(/\n}\n/g, '');
                ganttInstance.dataSource = JSON.parse(cleanedJsonData);
                ganttInstance.hideSpinner();
            });
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='container'>
                    <GanttComponent
                        id="GanttContainer"
                        ref={gantt => ganttInstance = gantt as GanttComponent}
                        dataSource={tasksCollection}
                        resources={resourceCollection}
                        viewType='ResourceView'
                        showOverAllocation={true}
                        enableContextMenu={true}
                        allowSorting={true}
                        allowReordering={true}
                        taskFields={taskFields}
                        resourceFields={{
                            id: 'resourceId',
                            name: 'resourceName',
                            unit: 'resourceUnit',
                            group: 'resourceGroup'
                        }}
                        editSettings={{
                            allowAdding: true,
                            allowEditing: true,
                            allowDeleting: true,
                            allowTaskbarEditing: true,
                            showDeleteConfirmDialog: true
                        }}
                        toolbar={toolbarOptions}
                        toolbarClick={toolbarClick}
                        labelSettings={{
                            rightLabel: 'resourceInfo'
                        }}
                        splitterSettings={{
                            columnIndex: 3
                        }}
                        selectionSettings={{
                            mode: 'Row',
                            type: 'Single',
                            enableToggle: false
                        }}
                        tooltipSettings={{
                            showTooltip: true
                        }}
                        timelineSettings={{
                            showTooltip: true,
                            topTier: {
                                unit: 'Week',
                                format: 'dd/MM/yyyy'
                            },
                            bottomTier: {
                                unit: 'Day',
                                count: 1
                            }
                        }}
                        readOnly={false}
                        allowSelection={true}
                        highlightWeekends={true}
                        treeColumnIndex={1}
                        taskbarHeight={20}
                        rowHeight={40}
                        height='550px'
                    >
                        <ColumnsDirective>
                            <ColumnDirective field='TaskID' visible={false} />
                            <ColumnDirective field='TaskName' headerText='Event Name' width={250} />
                            <ColumnDirective field='Duration' headerText='Duration' />
                            <ColumnDirective field='StartDate' headerText='Start Date' />
                            <ColumnDirective field='EndDate' headerText='End Date' />
                        </ColumnsDirective>
                        <Inject services={[Edit, Toolbar, Selection, Sort, Reorder, ContextMenu, DayMarkers]} />
                    </GanttComponent>
                </div>
            </div>
        </div>
    )
}

export default ResourceOptimization