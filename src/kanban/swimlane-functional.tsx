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
                    This example demonstrates the swimlane functionalities of Kanban
                    component. Provided options in the property panel to sort the cards,
                    enable drag-and-drop across swimlanes, show or hide the empty row,
                    items count and swimlane frozen rows. Also, you can expand/collapse
                    the swimlane row in the Kanban board.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample renders the assignee field as a swimlane header using the{" "}
                    <code>swimlaneSettings</code> property. The property provides the
                    following options to change its related settings:
                </p>
                <ul>
                    <li>
                        Sorting the swimlane cards using the{" "}
                        <code>swimlaneSettings.sortDirection</code> property
                    </li>
                    <li>
                        Control the drag-and-drop of the cards across swimlane using the
                        <code>swimlaneSettings.allowDragAndDrop</code> property.
                    </li>
                    <li>
                        Show or hide the empty swimlane row using the{" "}
                        <code>swimlaneSettings.showEmptyRow</code> property.
                    </li>
                    <li>
                        Show or hide the items count in the swimlane header using the{" "}
                        <code>swimlaneSettings.showItemCount</code>
                        property.
                    </li>
                    <li>
                        Enable or disable the frozen swimlane rows using the{" "}
                        <code>swimlaneSettings.enableFrozenRows</code> property.
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Swimlane;