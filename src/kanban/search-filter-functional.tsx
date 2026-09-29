import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent, InputEventArgs } from '@syncfusion/ej2-react-inputs';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './search-filter.css';
import * as dataSource from './datasource.json';
import { PropertyPane } from '../common/property-pane';

/**
 * Kanban Search Filter sample
 */
const SearchFilter = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).kanbanData,
        null,
        true
    ) as Object[];
    let kanbanObj = useRef<KanbanComponent>(null);
    let priorityObj = useRef<DropDownListComponent>(null);
    let textBoxObj = useRef<TextBoxComponent>(null);
    let statusObj = useRef<DropDownListComponent>(null);
    let priorityData: string[] = ["None", "High", "Normal", "Low"];
    let statusData: { [key: string]: Object }[] = [
        { id: "None", value: "None" },
        { id: "To Do", value: "Open" },
        { id: "In Progress", value: "InProgress" },
        { id: "Testing", value: "Testing" },
        { id: "Done", value: "Close" },
    ];
    let value: string = "None";
    let fields: Object = { text: "id", value: "value" };
    const prioritySelect = (args: SelectEventArgs): void => {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== "None") {
            filterQuery = new Query().where("Priority", "equal", args.itemData.value);
        }
        statusObj.current.value = "None";
        kanbanObj.current.query = filterQuery;
    };
    const statusSelect = (args: SelectEventArgs): void => {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== "None") {
            filterQuery = new Query().where("Status", "equal", args.itemData.value);
        }
        priorityObj.current.value = "None";
        kanbanObj.current.query = filterQuery;
    };
    const searchClick = (e: InputEventArgs): void => {
        let searchValue: string = e.value;
        let searchQuery: Query = new Query();
        if (searchValue !== "") {
            searchQuery = new Query().search(
                searchValue,
                ["Id", "Summary"],
                "contains",
                true
            );
        }
        kanbanObj.current.query = searchQuery;
    };
    const resetClick = (): void => {
        textBoxObj.current.value = "";
        reset();
    };
    const onFocus = (e: any): void => {
        if ((e.target as HTMLInputElement).value === "") {
            reset();
        }
    };
    const reset = (): void => {
        priorityObj.current.value = "None";
        statusObj.current.value = "None";
        kanbanObj.current.query = new Query();
    };
    return (
        <div className="kanban-control-section">
            <div className="col-lg-9 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        ref={kanbanObj}
                        keyField="Status"
                        dataSource={data}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
                        swimlaneSettings={{ keyField: "Assignee" }}
                    >
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Testing" keyField="Testing" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-3 property-section" id="searchFilterProperty">
                <PropertyPane title="Filtering">
                    <table className="e-filter-table">
                        <tbody>
                        <tr>
                            <td className="e-filter-label">
                                <div>Priority</div>
                            </td>
                            <td>
                                <div>
                                    <DropDownListComponent
                                        id="priority_filter"
                                        ref={priorityObj}
                                        dataSource={priorityData}
                                        select={prioritySelect.bind(this)}
                                        value={value}
                                        placeholder="Select a priority"
                                    ></DropDownListComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="e-filter-label">
                                <div>Status</div>
                            </td>
                            <td>
                                <DropDownListComponent
                                    id="status_filter"
                                    ref={statusObj}
                                    dataSource={statusData}
                                    select={statusSelect.bind(this)}
                                    value={value}
                                    fields={fields}
                                    placeholder="Select a status"
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="property-panel-header" style={{ width: '100%', padding: '22px 0 0 0' }}>Searching</p>
                    <div className="filtering property-panel-content">
                        <table className="e-filter-table">
                            <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <TextBoxComponent
                                            id="search_text"
                                            ref={textBoxObj}
                                            showClearButton={true}
                                            placeholder="Enter search text"
                                            onFocus={onFocus.bind(this)}
                                            input={searchClick.bind(this)}
                                        />
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="e-reset-button">
                            <ButtonComponent
                                id="reset_filter"
                                className="e-btn"
                                onClick={resetClick.bind(this)}
                            >
                                Reset
                            </ButtonComponent>
                        </div>
                    </div>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the filtering and searching capabilities of the Kanban component, enabling users to quickly locate and organize cards based on specific criteria.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates how to filter and search cards in the Kanban component using the <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#query" target="_blank">query</a> property. The query API can be used to display specific cards based on custom filtering and search criteria.
                </p>
                <ul>
                    <li>
                        The <code>where</code> method is used to filter cards based on field values such as <strong>Priority</strong> and <strong>Status</strong>.
                    </li>
                    <li>
                        The <code>search</code> method is used to locate cards by matching text across the <code>Id</code> and <code>Summary</code> fields.
                    </li>
                </ul>
                <p>
                    The reset option clears the applied filters and search criteria by restoring the Kanban
                    <code>query</code> to a new <code>Query</code> instance, displaying all cards on the board.
                </p>
                    <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#query" target="_blank">query</a> documentation section.
                </p>
                <p>
	                Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default SearchFilter;