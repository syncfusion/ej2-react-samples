import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GanttComponent, Toolbar, Edit, Selection, Sort, Reorder, ContextMenu, DayMarkers, Inject, ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-gantt';
import { TaskDataCollection } from './datasource';
import * as data from './progress.json';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

function Progress() {
    let ganttInstance: GanttComponent;
    const taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: "ParentTaskID"
    };
    const toolbarTemplate = () => {
        return <ButtonComponent id='toolbarButton' isPrimary={true}>Predict milestone</ButtonComponent>
    }

    const toolbarOptions = [{
        template: toolbarTemplate, text: 'Predict milestone'
    }]

    function toolbarClick(args: any) {
        if (args.item.text === 'Predict milestone') {
            ganttInstance.showSpinner();
            let input =
                "You analyze the multiple year HistoricalTaskDataCollections and current TaskDataCollection to predict project completion dates and milestones based on current progress and historical trends. Ignore the null or empty values, and collection values based parent child mapping. Avoid json tags with your response. No other explanation or content to be returned." +
                " HistoricalTaskDataCollections :" + getHistoricalCollection() +
                " TaskDataCollection: " + JSON.stringify(TaskDataCollection) +
                " Generate a JSON object named 'TaskDetails' containing:" +
                "- Key 'MilestoneTaskDate' with a list of milestone dates 'MilestoneDate' with 'TaskName' - task name. A milestone date is defined as the end date of tasks with a duration of 0 and only give current based milestone." +
                "- Key 'ProjectCompletionDate' indicating the latest end date among all tasks." +
                "- Key 'Summary' providing a summary of the project completion date and milestones.Ensure milestones are defined correctly based on tasks with a duration of 0, and the project completion date reflects the latest end date of all tasks "
            let aioutput = (window as any).getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
            aioutput.then((result: any) => {
                let cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
                let dataset = JSON.parse(cleanedJsonData);
                const eventMarkers = dataset.TaskDetails.MilestoneTaskDate
                    .map((milestone: any) => ({
                        day: new Date(milestone["MilestoneDate"]),
                        label: milestone["TaskName"]
                    }));
                let projectDetailes = {
                    day: new Date(dataset.TaskDetails.ProjectCompletionDate),
                    label: "Project completion date"
                }
                eventMarkers.push(projectDetailes)
                ganttInstance.eventMarkers = eventMarkers;
                ganttInstance.hideSpinner();
            });
        }
        function getHistoricalCollection() {
            let historicalDataCollection: string = '';
            const word: any = data;
            for (let year = 2021; year < 2026; year++) {
                historicalDataCollection += "HistoricalTaskDataCollection" + year + ":" + JSON.stringify(word["TaskDataCollection" + year]);
            }
            return historicalDataCollection;
        }
    }

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div id='container'>
                    <GanttComponent
                        ref={gantt => ganttInstance = gantt as GanttComponent}
                        dataSource={TaskDataCollection}
                        enableContextMenu={true}
                        allowSorting={true}
                        allowReordering={true}
                        taskFields={taskFields}
                        editSettings={{
                            allowAdding: true,
                            allowEditing: true,
                            allowDeleting: true,
                            allowTaskbarEditing: true,
                            showDeleteConfirmDialog: true
                        }}
                        toolbar={toolbarOptions}
                        toolbarClick={toolbarClick}
                        splitterSettings={{
                            position: "28%"
                        }}
                        allowSelection={true}
                        treeColumnIndex={1}
                        height='550px'
                        projectStartDate={new Date('4/1/2026')}
                        projectEndDate={new Date('6/2/2026')}
                    >
                        <ColumnsDirective>
                            <ColumnDirective field='TaskID' visible={false} />
                            <ColumnDirective field='TaskName' headerText='Event Name' width={250} />
                            <ColumnDirective field='Duration' />
                            <ColumnDirective field='StartDate' headerText='Start Date' />
                            <ColumnDirective field='EndDate' headerText='End Date' />
                        </ColumnsDirective>
                        <Inject services={[Edit, Toolbar, Selection, DayMarkers, Sort, Reorder, ContextMenu]} />
                    </GanttComponent>
                </div>
            </div>
        </div>
    )
}

export default Progress;
