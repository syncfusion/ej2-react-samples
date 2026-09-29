import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, SortDirection } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './swimlane.css';
import * as dataSource from './datasource.json';
/**
 * Kanban Swimlane sample
 */
const Swimlane = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let kanbanObj = useRef<KanbanComponent>(null);
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).kanbanData,
        null,
        true
    ) as Object[];
    const sortData: { [key: string]: Object }[] = [
        { value: "Ascending", text: "Ascending" },
        { value: "Descending", text: "Descending" },
    ];
    let value: string = "Ascending";
    const changeSortOrder = (args: DropDownChangeArgs): void => {
        kanbanObj.current.swimlaneSettings.sortDirection = args.itemData
            .value as SortDirection;
    };
    const onChange = (args: ChangeEventArgs): void => {
        kanbanObj.current.swimlaneSettings.allowDragAndDrop = args.checked;
    };
    const changeRow = (args: ChangeEventArgs): void => {
        kanbanObj.current.swimlaneSettings.showEmptyRow = args.checked;
    };
    const changeCount = (args: ChangeEventArgs): void => {
        kanbanObj.current.swimlaneSettings.showItemCount = args.checked;
    };
    const changeFrozen = (args: ChangeEventArgs): void => {
        kanbanObj.current.swimlaneSettings.enableFrozenRows = args.checked;
    };
    return (
        <div className="kanban-control-section">
            <div className="col-lg-8 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        cssClass="kanban-swimlane"
                        ref={kanbanObj}
                        keyField="Status"
                        dataSource={data}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
                        swimlaneSettings={{ keyField: "Assignee" }}
                        height="500px"
                    >
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-4 property-section">
                <PropertyPane title="Properties">
                    <table
                        id="property"
                        title="Properties"
                        className="property-panel-table"
                        style={{ width: "100%" }}
                    >
                        <tbody>
                        <tr>
                            <td>
                                <div>Sort Direction</div>
                            </td>
                            <td>
                                <div>
                                    <DropDownListComponent
                                        id="sort"
                                        dataSource={sortData}
                                        change={changeSortOrder.bind(this)}
                                        value={value}
                                    ></DropDownListComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Enable Swimlane Drag And Drop</div>
                            </td>
                            <td>
                                <CheckBoxComponent
                                    checked={false}
                                    change={onChange.bind(this)}
                                ></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Show Empty Swimlane Row</div>
                            </td>
                            <td>
                                <CheckBoxComponent
                                    checked={false}
                                    change={changeRow.bind(this)}
                                ></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Show Swimlane Item Count</div>
                            </td>
                            <td>
                                <CheckBoxComponent
                                    checked={true}
                                    change={changeCount.bind(this)}
                                ></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Enable Frozen Rows</div>
                            </td>
                            <td>
                                <CheckBoxComponent
                                    change={changeFrozen.bind(this)}
                                ></CheckBoxComponent>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample showcases the swimlane capabilities of the Kanban component, providing a structured way to organize and manage workflow items across different categories and resources.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates the swimlane functionality of the Kanban component using the
                    <code>swimlaneSettings</code> property. Swimlanes organize cards into horizontal rows based on a specific field, making it easier to track task ownership, workload distribution, and workflow progress.
                </p>
                <p>
                    The <code>swimlaneSettings</code> property provides the following customization options:
                </p>
                <ul>
                    <li>
                        Sort cards within swimlanes using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane#sort-direction" target="_blank">swimlaneSettings.sortDirection</a> property
                    </li>
                    <li>
                        Enable or disable card drag-and-drop across swimlanes using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane#drag-and-drop" target="_blank">swimlaneSettings.allowDragAndDrop</a> property.
                    </li>
                    <li>
                        Show or hide empty swimlane rows using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane#show-empty-row" target="_blank">swimlaneSettings.showEmptyRow</a> property.
                    </li>
                    <li>
                        Display or hide item counts in swimlane headers using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane#show-item-count" target="_blank">swimlaneSettings.showItemCount</a> property.
                    </li>
                    <li>
                        Display or hide item counts in swimlane headers using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane#show-item-count" target="_blank">swimlaneSettings.showItemCount</a> property.
                    </li>
                </ul>
                <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane" target="_blank">swimlane</a> documentation section.
                </p>
                <p>
	                Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default Swimlane;