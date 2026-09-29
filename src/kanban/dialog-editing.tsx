import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Kanban Dialog Editing sample
 */
export class DialogEditing extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, true) as Object[];
    private kanbanObj: KanbanComponent;

    private addClick(): void {
        const cardIds = this.kanbanObj.kanbanData.map((obj: any) => parseInt(obj.Id.replace('Task ', ''), 10));
        const cardCount = Math.max.apply(Math, cardIds) + 1;
        const cardDetails = { Id: "Task " + cardCount, Status: "Open", Priority: "Normal", Assignee: "Andrew Fuller", Estimate: 0, Tags: "", Summary: "" };
        this.kanbanObj.openDialog('Add', cardDetails);
    }

    private dialogTemplate(props: KanbanDataModel): JSX.Element {
        return (<KanbanDialogFormTemplate {...props} />);
    }

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <div className='kanban-section'>
                            <KanbanComponent id="kanban" ref={(kanban) => { this.kanbanObj = kanban }} keyField="Status" dataSource={this.data}
                                cardSettings={{ contentField: "Summary", headerField: "Id" }} dialogSettings={{ template: this.dialogTemplate.bind(this) }}>
                                <ColumnsDirective>
                                    <ColumnDirective headerText="To Do" keyField="Open" />
                                    <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                    <ColumnDirective headerText="Testing" keyField="Testing" />
                                    <ColumnDirective headerText="Done" keyField="Close" />
                                </ColumnsDirective>
                            </KanbanComponent>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td>
                                        <ButtonComponent id='addNew' className="e-btn e-dialog-add" onClick={this.addClick.bind(this)}>Add New Card</ButtonComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates dialog editing capabilities in the Kanban component, enabling users to efficiently manage cards through a customizable dialog interface and perform common data management operations within the board.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates dialog-based CRUD operations in the Kanban component. The board is populated using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/data-binding" target="_blank">kanbanData</a> collection, where tasks are organized into <a href="https://ej2.syncfusion.com/react/documentation/kanban/columns" target="_blank">columns</a> based on their <code>Status</code> field.
                    </p>
                    <p>
                        New cards can be created using the <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#opendialog" target="_blank">openDialog</a> method. Existing cards can be viewed, edited, or deleted through a customized dialog interface. The dialog is rendered using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/dialog#dialog-template" target="_blank">dialogSettings.template</a> property, while the <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#dialogopen" target="_blank">dialogOpen</a> event is used to initialize and configure the dialog input controls.
                    </p>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/dialog" target="_blank">dialog</a> documentation section.
                    </p>
                    <p>
	        	        Looking for the full React Kanban component overview, features, pricing and documentation?
                        Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                    </p>
                </div>
            </div>
        );
    }
}

export class KanbanDialogFormTemplate extends React.Component<{}, {}> {
    public assigneeData: string[] = [
        'Nancy Davloio', 'Andrew Fuller', 'Janet Leverling',
        'Steven walker', 'Robert King', 'Margaret hamilt', 'Michael Suyama'
    ];
    public statusData: string[] = ['Open', 'InProgress', 'Testing', 'Close'];
    public priorityData: string[] = ['Low', 'Normal', 'Critical', 'Release Breaker', 'High'];
    public tagsHtmlAttributes = { name: "Tags" };
    constructor(props) {
        super(props);
        this.state = extend({}, {}, props, true);
    }

    onChange(args: any): void {
        let key: string = args.target.name;
        let value: string = args.target.value;
        this.setState((prevState: any) => ({ ...prevState, [key]: value }));
    }
    render(): any {
        let data: KanbanDataModel = this.state;
        return (<div>
            <table>
                <tbody>
                    <tr>
                        <td className="e-label">ID</td>
                        <td>
                            <div className="e-float-input e-control-wrapper">
                                <input id="Id" name="Id" type="text" className="e-field" value={data.Id} disabled />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Status</td>
                        <td>
                            <DropDownListComponent id='Status' name="Status" dataSource={this.statusData} className="e-field" placeholder='Status' value={data.Status}></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Assignee</td>
                        <td>
                            <DropDownListComponent id='Assignee' name="Assignee" className="e-field" dataSource={this.assigneeData} placeholder='Assignee' value={data.Assignee}></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Priority</td>
                        <td>
                            <DropDownListComponent type="text" name="Priority" id="Priority" popupHeight='300px' className="e-field" value={data.Priority} dataSource={this.priorityData} placeholder='Priority'></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Summary</td>
                        <td>
                            <div className="e-float-input e-control-wrapper">
                                <textarea name="Summary" className="e-field" value={data.Summary} onChange={this.onChange.bind(this)}></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>);
    }
}

export interface KanbanDataModel {
    Id?: string;
    Title?: string;
    Status?: string;
    Summary?: string;
    Type?: string;
    Priority?: string;
    Tags?: string;
    Estimate?: number;
    Assignee?: string;
    RankId?: number;
    Color?: string;
}
