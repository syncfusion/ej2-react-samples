import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Kanban Dialog Editing sample
 */
interface KanbanDataModel {
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
const DialogEditing = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).kanbanData,
        true
    ) as Object[];
    let kanbanObj = useRef<KanbanComponent>(null);
    const addClick = (): void => {
        const cardIds = kanbanObj.current.kanbanData.map((obj: any) =>
            parseInt(obj.Id.replace("Task ", ""), 10)
        );
        const cardCount = Math.max.apply(Math, cardIds) + 1;
        const cardDetails = {
            Id: "Task " + cardCount,
            Status: "Open",
            Priority: "Normal",
            Assignee: "Andrew Fuller",
            Estimate: 0,
            Tags: "",
            Summary: "",
        };
        kanbanObj.current.openDialog("Add", cardDetails);
    };
    const KanbanDialogFormTemplate = (props) => {
        useEffect(() => {
            updateSampleSection();
        }, []);
        let assigneeData: string[] = [
            "Nancy Davloio",
            "Andrew Fuller",
            "Janet Leverling",
            "Steven walker",
            "Robert King",
            "Margaret hamilt",
            "Michael Suyama",
        ];
        let statusData: string[] = ["Open", "InProgress", "Testing", "Close"];
        let priorityData: string[] = [
            "Low",
            "Normal",
            "Critical",
            "Release Breaker",
            "High",
        ];
        let tagsHtmlAttributes = { name: "Tags" };
        const [state, setState] = useState(extend({}, {}, props, true));
        const onChange = (args: any): void => {
            let key: string = args.target.name;
            let value: string = args.target.value;
            setState({ [key]: value });
        };
        let data: KanbanDataModel = state;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td className="e-label">ID</td>
                            <td>
                                <div className="e-float-input e-control-wrapper">
                                    <input
                                        id="Id"
                                        name="Id"
                                        type="text"
                                        className="e-field"
                                        value={data.Id}
                                        disabled
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="e-label">Status</td>
                            <td>
                                <DropDownListComponent
                                    id="Status"
                                    name="Status"
                                    dataSource={statusData}
                                    className="e-field"
                                    placeholder="Status"
                                    value={data.Status}
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="e-label">Assignee</td>
                            <td>
                                <DropDownListComponent
                                    id="Assignee"
                                    name="Assignee"
                                    className="e-field"
                                    dataSource={assigneeData}
                                    placeholder="Assignee"
                                    value={data.Assignee}
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="e-label">Priority</td>
                            <td>
                                <DropDownListComponent
                                    type="text"
                                    name="Priority"
                                    id="Priority"
                                    popupHeight="300px"
                                    className="e-field"
                                    value={data.Priority}
                                    dataSource={priorityData}
                                    placeholder="Priority"
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="e-label">Summary</td>
                            <td>
                                <div className="e-float-input e-control-wrapper">
                                    <textarea
                                        name="Summary"
                                        className="e-field"
                                        value={data.Summary}
                                        onChange={onChange.bind(this)}
                                    ></textarea>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
    const dialogTemplate = (props: KanbanDataModel) => {
        return <KanbanDialogFormTemplate {...props} />;
    };
    return (
        <div className="kanban-control-section">
            <div className="col-lg-9 control-section">
                <div className="control-wrapper">
                    <div className="kanban-section">
                        <KanbanComponent
                            id="kanban"
                            ref={kanbanObj}
                            keyField="Status"
                            dataSource={data}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }}
                            dialogSettings={{ template: dialogTemplate.bind(this) }}
                        >
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" />
                                <ColumnDirective
                                    headerText="In Progress"
                                    keyField="InProgress"
                                />
                                <ColumnDirective headerText="Testing" keyField="Testing" />
                                <ColumnDirective headerText="Done" keyField="Close" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <PropertyPane title="Properties">
                    <table id="property" title="Properties">
                        <tbody>
                            <tr>
                                <td>
                                    <ButtonComponent
                                        id="addNew"
                                        className="e-btn e-dialog-add"
                                        onClick={addClick.bind(this)}
                                    >
                                        Add New Card
                                    </ButtonComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample showcases the CRUD (Create, Read, Update, and Delete)
                    operations of the Kanban component. You can add a new card using the
                    button from the property panel and read, update, or delete a card by
                    opening the card details in dialog by double-clicking it.
                </p>
            </div>
            <div id="description">
                <p>
                    The sample is designed to showcase the CRUD operations of the Kanban
                    board. The Kanban provides the essential methods to handle the CRUD
                    operation from the application-end.
                </p>
                <ol>
                    <li>updateCard</li>
                    <li>addCard</li>
                    <li>deleteCard</li>
                </ol>
                <p>
                    The double click event of the card is used to open the card details in
                    a dialog and read, edit, or delete a card.
                </p>
            </div>
        </div>
    );
}
export default DialogEditing;