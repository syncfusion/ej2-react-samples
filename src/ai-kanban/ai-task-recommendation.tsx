import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, Inject, Page, Selection, Edit, Toolbar, ColumnsDirective as GridColumnsDirective, ColumnDirective as GridColumnDirective } from "@syncfusion/ej2-react-grids"
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { useEffect } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { ProgressButtonComponent } from "@syncfusion/ej2-react-splitbuttons";
import { NumericTextBoxComponent, TextAreaComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { ToastComponent } from "@syncfusion/ej2-react-notifications";
import { kanbanStyles } from './datasource';

function SmartRecommendation() {
    let smartSuggestion: object[] = [];
    let projectDetailsDialog: DialogComponent;
    let goToBacklogBoardView: ButtonComponent;
    let openProjectDetailsDialog: ButtonComponent;
    let projectDetailsHome: TextBoxComponent;
    let taskCountHome: NumericTextBoxComponent;
    let grid: GridComponent;
    let backlogKanbanObj: KanbanComponent;
    let toast: ToastComponent;
    let isGeneratedProjectTasks: boolean = false;
    let taskCount: NumericTextBoxComponent;
    let generateTasks: ProgressButtonComponent;
    let projectDetails: TextAreaComponent;

    useEffect(() => {
        projectDetailsDialog.hide();
        goToBacklogBoardView.element.onclick = (): void => {
            if (goToBacklogBoardView.content == "View as Board") {
                goToBacklogBoardView.content = "View as Backlog";
                backlogKanbanObj.dataSource = smartSuggestion;
                backlogKanbanObj.dataBind();
                backlogKanbanObj.refresh();
                (document.getElementById('grid-container') as HTMLElement).style.display = 'none';
                (document.getElementById('backlogsBoard') as HTMLElement).style.display = '';
            } else {
                goToBacklogBoardView.content = "View as Board";
                grid.dataSource = smartSuggestion;
                grid.dataBind();
                grid.refresh();
                (document.getElementById('grid-container') as HTMLElement).style.display = '';
                (document.getElementById('backlogsBoard') as HTMLElement).style.display = 'none';
            }
        };
        openProjectDetailsDialog.element.onclick = (): void => {
            isGeneratedProjectTasks = false;
            projectDetailsDialog.show();
        };
        generateTasks.element.onclick = (): void => {
            generateTasksClick(taskCountHome.value, projectDetailsHome.value);
        };
    }, []);

    function closeprojectDetailsDialog(): void {
        projectDetailsDialog.hide();
        taskCount.value = 0;
        projectDetails.value = '';
    }

    function GenerateProjectTasks(taskCount: number, projectDetails: string): void {
        try {
            if (taskCount && projectDetails) {
                var description = `Generate ${taskCount} task recommendations for ${projectDetails}. Each task should include the following fields: Id (like example: ID should be in project name simple 4char word - 1), Title, Status, Description, Assignee, StoryPoints, Color and Due Date, formatted according to the dataset. Assign each task to the Assignee: empty string, set the Status to 'Open', and use black for the Color. Use the dataset provided below to create your recommendations. IMPORTANT: Return the data strictly in JSON format with all the required fields. Only the JSON data is needed, no additional text.Return only the JSON array format without any explanations.`;
                let result: any = getResponseFromOpenAI(description);
                result.then((result: any) => {
                    try {
                        const jsonArrayPattern = /\[.*?\]/;
                        result = result.match(jsonArrayPattern);
                        if (result && result[0]) {
                            let data = result[0].replace("```json", "").replace("```", "").replace("\r", "").replace("\n", "").replace("\t", "").trim();
                            let modifiedData = JSON.parse(data);
                            smartSuggestion = modifiedData !== null ? smartSuggestion.concat(modifiedData) : smartSuggestion;
                            backlogKanbanObj.dataSource = smartSuggestion;
                            backlogKanbanObj.dataBind();
                            backlogKanbanObj.refresh();
                            isGeneratedProjectTasks = true;
                        } else {
                            toast.content = "An error occurred during the AI process, Please try again."
                            toast.show();
                        }

                    } catch {
                        toast.content = "An error occurred during the AI process, Please try again."
                        toast.show();
                    }

                });
            }
        } catch {
            toast.content = "An error occurred during the AI process, Please try again."
            toast.show();
        }
    }

    async function getResponseFromOpenAI(promptQuery: string): Promise<string> {
        const content = await (window as any).OpenAiModelKanban(promptQuery);
        return content ? content as string : '';
    }

    function generateTasksClick(taskCount: number, projectDetails: string): void {
        isGeneratedProjectTasks = false;
        GenerateProjectTasks(taskCount, projectDetails);
    }

    function generateButtonBegin(): void {
        generateTasks.content = "Progressing...";
        generateTasks.dataBind();
        const checkTasksGenerated = () => {
            if (isGeneratedProjectTasks) {
                (document.getElementById('homecontainer') as HTMLElement).style.display = 'none';
                (document.getElementById('toast-kanban-observable') as HTMLElement).style.display = '';
                goToBacklogBoardView.content = "View as Backlog";
                backlogKanbanObj.dataSource = smartSuggestion;
                backlogKanbanObj.dataBind();
                backlogKanbanObj.refresh();
                (document.getElementById('grid-container') as HTMLElement).style.display = 'none';
                (document.getElementById('backlogsBoard') as HTMLElement).style.display = '';
                generateTasks.content = "Generate Tasks";
                generateTasks.dataBind();
                closeprojectDetailsDialog();
            } else {
                setTimeout(checkTasksGenerated, 100);
            }
        };
        checkTasksGenerated();
    }

    function cardTemplate(data: any) {
        return (
            <div className="card-template">
                <div className="e-card-header">
                    <div className="e-card-header-caption">
                        <div className="e-card-header-title e-tooltip-text">${data.Title}</div>
                    </div>
                </div>
                <div className="e-card-content">
                    <div className="e-text e-tooltip-text">${data.Description}</div>
                </div>
                <div className="e-card-footer">
                    <div className="e-card-tag e-tooltip-text">${data.StoryPoints}</div>
                </div>
            </div>
        );
    }

    function dialogTemplate(data: any) {
        return (
            <div className="form-row" style={{ margin: '10px' }}>
                <div className="form-group" style={{ margin: '10px' }}>
                    <TextBoxComponent id="Id" name="Id" placeholder="Task ID"
                        floatLabelType="Always" width="100%" value={data.Id || ''} enabled={data.isAdd} />
                </div>
                <div className="form-group" style={{ margin: '10px' }}>
                    <TextBoxComponent id="Title" name="Title"
                        placeholder="Title" floatLabelType="Always" width="100%" value={data.Title || ''} />
                </div>
                <div className="form-group" style={{ margin: '10px' }}>
                    <TextBoxComponent id="Description" name="Description"
                        placeholder="Description" floatLabelType="Always" width="100%" multiline={true}
                        value={data.Description || ''} />
                </div>
                <div className="form-group" style={{ margin: '10px' }}>
                    <NumericTextBoxComponent id="StoryPoints" name="StoryPoints"
                        placeholder="StoryPoints" floatLabelType="Always" width="100%" min={1} step={1}
                        value={data.StoryPoints || 1} />
                </div>
                <div className="form-group" style={{ margin: '10px' }}>
                    <TextBoxComponent id="Status" name="Status" placeholder="Status"
                        floatLabelType="Always" width="100%" value={data.Status || 'Open'} enabled={data.isAdd} />
                </div>
            </div>
        );
    }

    function footerTemp() {
        return (
            <div id="projectdialogFooter">
                <div className="custom-row-kanban-2">
                    <div className="col-12 d-flex cuscol-0">
                        <div className="w-100">
                            <ProgressButtonComponent
                                id="generate-tasks"
                                content="Generate Tasks"
                                enableProgress={false}
                                begin={() => {
                                    generateButtonBegin();
                                }}
                                onClick={() => {
                                    generateTasksClick(taskCount.value, projectDetails.value);
                                }}
                            ></ProgressButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div id="container">
                <style>
                    {kanbanStyles}
                </style>
                <div className="row row-large" id="homecontainer">
                    <div className="col-12 text-center my-3">
                        <h3>AI Smart Task Suggestion</h3>
                    </div>
                    <div className="col-12 text-center my-3 d-flex" style={{ width: '100%', maxWidth: '350px' }}>
                        <div className="e-rte-label1" style={{ margin: '10px' }}>
                            <label>Project Details</label>
                        </div>
                        <div className="e-rte-field" style={{ margin: '10px' }}>
                            <TextBoxComponent
                                id="project-details-home"
                                ref={textbox => projectDetailsHome = textbox as TextBoxComponent}
                                name="project-details"
                                width="100%"
                                floatLabelType="Always"
                                value=""
                                multiline={true}
                            />
                        </div>
                        <div className="e-rte-label2" style={{ margin: '10px', paddingTop: '20px' }}>
                            <label>Number of tasks</label>
                        </div>
                        <div className="e-rte-field" style={{ margin: '10px' }}>
                            <NumericTextBoxComponent
                                id="tasks-value-home"
                                ref={numeric => taskCountHome = numeric as NumericTextBoxComponent}
                                name="tasks-value"
                                min={1}
                                step={1}
                                width="100%"
                                floatLabelType="Always"
                                value={0}
                            />
                        </div>
                        <div className="d-flex justify-content-center" style={{ margin: '10px' }}>
                            <ProgressButtonComponent
                                id="generate-tasks-home"
                                ref={button => generateTasks = button as ProgressButtonComponent}
                                content="Generate Tasks"
                                enableProgress={false}
                                begin={() => {
                                    generateButtonBegin();
                                }}
                            ></ProgressButtonComponent>
                        </div>
                    </div>
                </div>
                <div className="row" id="toast-kanban-observable" style={{ height: '100%', display: 'none' }}>
                    <div className="col-12 text-center my-3" id="customcontainer">
                        <h3>Kanban Board</h3>
                    </div>
                    <div className="col-12 col-md-6 mt-6 mt-md-0 d-flex cuscol-2 justify-content-center e-right">
                        <div className="col-12 text-center my-3" id="backlog">
                            <ButtonComponent id="openProjectDetailsDialog" style={{ float: 'right' }}
                                ref={button => openProjectDetailsDialog = button as ButtonComponent}
                                content='Add New Projects'
                            ></ButtonComponent>
                            <ButtonComponent id="goToBacklogBoardView"
                                ref={button => goToBacklogBoardView = button as ButtonComponent}
                                style={{ float: 'left' }} content="View as Board"></ButtonComponent>
                        </div>
                        <div className="w-100">
                            <GridComponent
                                id="grid-container"
                                ref={gridObj => grid = gridObj as GridComponent}
                                dataSource={smartSuggestion}
                                allowPaging={true}
                                toolbar={['Add']}
                                editSettings={{
                                    allowAdding: true,
                                    allowEditing: true,
                                    allowDeleting: true,
                                    mode: 'Dialog',
                                    template: dialogTemplate
                                }} >
                                <GridColumnsDirective>
                                    <GridColumnDirective field="Id" headerText="Task ID" defaultValue="" isPrimaryKey={true} validationRules={{ required: true }} />
                                    <GridColumnDirective field="Title" headerText="Title" defaultValue="" validationRules={{ required: true }} />
                                    <GridColumnDirective field="Description" headerText="Description" defaultValue="" editType="defaultEdit" />
                                    <GridColumnDirective field="StoryPoints" headerText="StoryPoints" defaultValue={0} editType="defaultEdit" validationRules={{ required: true, min: 0 }} />
                                    <GridColumnDirective field="Status" headerText="Status" defaultValue="" validationRules={{ required: true }} />
                                </GridColumnsDirective>
                                <Inject services={[Page, Selection, Edit, Toolbar]} />
                            </GridComponent>
                            <KanbanComponent
                                id="backlogsBoard"
                                ref={kanban => backlogKanbanObj = kanban as KanbanComponent}
                                style={{ display: 'none' }}
                                keyField="Status"
                                dataSource={smartSuggestion}
                                cardSettings={{
                                    headerField: 'Title',
                                    contentField: 'Description',
                                    grabberField: 'Color',
                                    template: cardTemplate
                                }}
                            >
                                <ColumnsDirective>
                                    <ColumnDirective headerText="To Do" keyField="Open" />
                                    <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                    <ColumnDirective headerText="Review" keyField="Review" />
                                    <ColumnDirective headerText="Done" keyField="Close" />
                                </ColumnsDirective>
                            </KanbanComponent>
                        </div>
                    </div>
                </div>
            </div >
            <ToastComponent
                ref={toastObj => toast = toastObj as ToastComponent}
                id="toast"
                position={{ X: 'Right', Y: 'Top' }}
                showCloseButton={true}
                target="#toast-kanban-observable"
            ></ToastComponent>
            <DialogComponent
                id="projectDetailsDialog"
                header="AI Smart Task Suggestion"
                ref={dialog => projectDetailsDialog = dialog as DialogComponent}
                content={document.getElementById('projectDetails') as HTMLElement}
                showCloseIcon={true}
                width="30%"
                minHeight="60%"
                zIndex={1000}
                isModal={true}
                cssClass="custom-dialog"
                footerTemplate={footerTemp}
                target={document.getElementById('container') as HTMLElement}
                close={() => {
                    closeprojectDetailsDialog();
                }}
            >
                <div id="projectDetails">
                    <div className="custom-row-kanban-1">
                        <div className="col-12 col-md-6 d-flex cuscol-1 justify-content-start e-left">
                            <div className="w-100">
                                <div className="e-rte-label1" style={{ margin: '10px' }}>
                                    <label>Project Details</label>
                                </div>
                                <div className="e-rte-field" style={{ margin: '10px' }}>
                                    <TextAreaComponent
                                        ref={textbox => projectDetails = textbox as TextAreaComponent}
                                        id="project-details"
                                        name="project-details"
                                        width="100%"
                                        floatLabelType="Always"
                                        value=""
                                    />
                                </div>
                                <div className="e-rte-label2" style={{ margin: '10px', paddingTop: '20px' }}>
                                    <label>Number of tasks</label>
                                </div>
                                <div className="e-rte-field" style={{ margin: '10px' }}>
                                    <NumericTextBoxComponent
                                        ref={numeric => taskCount = numeric as NumericTextBoxComponent}
                                        id="tasks-value"
                                        name="tasks-value"
                                        min={1}
                                        step={1}
                                        width="100%"
                                        floatLabelType="Always"
                                        value={0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogComponent >

        </>
    )
}

export default SmartRecommendation