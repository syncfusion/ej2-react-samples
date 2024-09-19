import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Toolbar, Edit, Selection, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-gantt';
import { tasksCollection, resourceCollection } from './datasource';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './prioritize-task.css';

function PrioritizeTask() {
    let ganttInstance: GanttComponent;
    const taskFields = {
        id: 'Id',
        name: 'Name',
        startDate: 'StartDate',
        endDate: 'EndDate',
        progress: 'Progress',
        parentID: 'ParentId',
        resourceInfo: 'resourceInfo',
        baselineStartDate: "BaselineStartDate",
        baselineEndDate: "BaselineEndDate",
    };
    const toolbarTemplate = () => {
        return <ButtonComponent id='toolbarButton' isPrimary={true}>Assign prioritize tasks</ButtonComponent>
    }

    const toolbarOptions = [{
        template: toolbarTemplate, text: 'Assign prioritize tasks'
    }]

    function toolbarClick(args: any) {
        if (args.item.text === 'Assign prioritize tasks') {
            ganttInstance.showSpinner();
            let input = `
          Analyze the following TaskCollection to identify critical tasks. 
          A task is considered critical if its EndDate is greater than its BaselineEndDate, comparing only the dates (not the time). 
          Both EndDate and BaselineEndDate must not be null.
          Here is the 'TaskCollection': ${JSON.stringify(tasksCollection)};
          For each task, add an additional property called isCritical. Set this property to true if the task is critical based on the criteria provided, otherwise set it to false. 
          Ensure that:
          1. Only the date part (not time) of EndDate and BaselineEndDate is compared.
          2. Tasks with both EndDate and BaselineEndDate being not null and where EndDate is greater than BaselineEndDate are marked as critical.
          Return the entire modified TaskCollection in JSON format. Ensure all tasks are included with their updated isCritical property. Do not include any other text or additional information.`
            let prompt = input;
            let aioutput = (window as any).getAzureChatAIRequest({ messages: [{ role: 'user', content: prompt }] });
            aioutput.then((result: any) => {
                let cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
                cleanedJsonData = cleanedJsonData.replace(/\n}\n/g, '');
                let input1 = `Analyze the following JSON data:
    
            - 'TaskCollection': ${JSON.stringify(tasksCollection)}
            - 'ResourceCollection': ${JSON.stringify(resourceCollection)}
            - 'CriticalCollection': ${JSON.stringify(cleanedJsonData)}
            
            Perform the following steps:
            1. For each task in 'CriticalCollection' where 'isCritical' is 'true':
               - Identify unassigned resources by comparing 'ResourceCollection' with the 'resourceInfo' property in 'TaskCollection'.
               - Add each unassigned resource to the 'resourceInfo' property of the corresponding critical task without removing any existing resources.
               - Ensure that each critical task receives a unique unassigned resource, if available.
            
            Return the modified 'CriticalCollection' with the additional resources assigned.
            
            Additionally, create a new property called 'AddedResourceIds' that contains the IDs of tasks in 'CriticalCollection' where 'isCritical' is 'true' and additional resources were added.
            
            Provide the result in JSON format, including:
            - The modified 'CriticalCollection'.
            - The 'AddedResourceIds' property with the IDs of tasks where additional resources were added.
            
            Do not include any additional text or information.`
                let aioutput1 = (window as any).getAzureChatAIRequest({ messages: [{ role: 'user', content: input1 }] });
                aioutput1.then((result: any) => {
                    let cleanedJsonData1 = result.replace(/^```json\n|```\n?$/g, '');
                    let criticalTask = JSON.parse(cleanedJsonData1);
                    ganttInstance.dataSource = criticalTask.CriticalCollection
                    let modifiedtaskID = criticalTask.AddedResourceIds;
                    let taskIdsString = modifiedtaskID.join(', ');
                    let csfooterElement = document.getElementById('csfooter');
                    if (csfooterElement) {
                        csfooterElement.innerText = ' Critical task containing Task Id: ' + taskIdsString + ' new resources has been added';
                    }
                    ganttInstance.hideSpinner();
                })
            });
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='container'>
                    <GanttComponent
                        ref={gantt => ganttInstance = gantt as GanttComponent}
                        dataSource={tasksCollection}
                        resources={resourceCollection}
                        taskFields={taskFields}
                        resourceFields={{
                            id: 'Id',
                            name: 'Name',
                            unit: 'MaxUnit',
                        }}
                        editSettings={{
                            allowAdding: true,
                            allowEditing: true,
                            allowDeleting: true,
                            allowTaskbarEditing: true,
                            showDeleteConfirmDialog: true
                        }}
                        rowDataBound={(args) => {
                            if (args.data.taskData.isCritical) {
                                args.row.style.backgroundColor = '#ffecd4';
                            }
                        }}
                        queryTaskbarInfo={(args) => {
                            if (args.data.taskData.isCritical) {
                                args.taskbarElement.parentElement.parentElement.style.backgroundColor = '#ffecd4';
                            }
                        }}
                        columns={[
                            { field: 'Id', headerText: "Task Id", visible: false },
                            { field: 'Name', headerText: 'Task Name', width: 250, clipMode: 'EllipsisWithTooltip' },
                            { field: 'resourceInfo', headerText: 'Resources' },
                            { field: 'StartDate', headerText: 'Start Date' },
                            { field: 'EndDate', headerText: 'End Date' },
                        ]}
                        toolbar={toolbarOptions}
                        toolbarClick={toolbarClick}
                        labelSettings={{
                            rightLabel: 'resourceInfo'
                        }}
                        splitterSettings={{
                            position: "23%"
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
                            <ColumnDirective field='Id' headerText='Task Id' visible={false} />
                            <ColumnDirective field='Name' headerText='Task Name' width={250} clipMode='EllipsisWithTooltip' />
                            <ColumnDirective field='resourceInfo' headerText='Resources' />
                            <ColumnDirective field='StartDate' headerText='Start Date' />
                            <ColumnDirective field='EndDate' headerText='End Date' />
                        </ColumnsDirective>
                        <Inject services={[Edit, Toolbar, Selection]} />
                    </GanttComponent>
                    <div id="csfooter"></div>
                </div>
            </div>
        </div>
    )
}

export default PrioritizeTask