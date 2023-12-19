import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, SortOrderBy, SortDirection } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
import './sorting.css';
/**
 * Kanban Sorting sample
 */
const Sorting = () => {
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
    let sortByObj = useRef<DropDownListComponent>(null);
    let fieldObj = useRef<DropDownListComponent>(null);
    let directionObj = useRef<DropDownListComponent>(null);
    const sortByData: { [key: string]: Object }[] = [
        { Id: "DataSourceOrder", Sort: "Data Source Order" },
        { Id: "Index", Sort: "Index" },
        { Id: "Custom", Sort: "Custom" },
    ];
    let fields: Object = { text: "Sort", value: "Id" };
    let fieldData: string[] = ["None"];
    let directionData: string[] = ["Ascending", "Descending"];
    const change = (args: ChangeEventArgs): void => {
        if (args.value === "DataSourceOrder" || args.value === "Index") {
            const data: string = args.value === "Index" ? "RankId" : "None";
            setFieldValue(data);
        }
        if (args.value === "Custom") {
            fieldObj.current.dataSource = ["Priority", "RankId", "Summary"];
            fieldObj.current.value = "Priority";
            fieldObj.current.enabled = true;
        }
        if (args.value === "Ascending") {
            const data: string =
                sortByObj.current.value === "Index" ? "RankId" : "None";
            setFieldValue(data);
            directionObj.current.value = "Ascending";
        }
        if (args.value === "Descending") {
            const data: string =
                sortByObj.current.value === "Index" ? "RankId" : "None";
            setFieldValue(data);
            directionObj.current.value = "Descending";
        }
    };

    const setFieldValue = (data: string): void => {
        fieldObj.current.dataSource = [data];
        fieldObj.current.value = data;
        fieldObj.current.enabled = false;
    };

    const sortClick = (): void => {
        setKanbanProperties();
    };

    const clearClick = (): void => {
        sortByObj.current.value = "Index";
        directionObj.current.value = "Ascending";
        setFieldValue("None");
        setKanbanProperties();
    };

    const setKanbanProperties = () => {
        kanbanObj.current.sortSettings.sortBy = sortByObj.current
            .value as SortOrderBy;
        kanbanObj.current.sortSettings.field = fieldObj.current.value as string;
        kanbanObj.current.sortSettings.direction = directionObj.current
            .value as SortDirection;
    };

    const cardTemplate = (props: { [key: string]: string }) => {
        return (
            <div className={"card-template " + props.Priority}>
                <div className="e-card-header">
                    <div className="e-card-header-caption">
                        <div className="e-card-header-title e-tooltip-text">{props.Id}</div>
                    </div>
                </div>
                <div className="e-card-content e-tooltip-text">
                    <div className="e-text">{props.Summary}</div>
                </div>
                <div className="e-card-footer">
                    <div className={`e-card-footer-css e-${props.Priority}`}></div>
                    <div className="e-rank">Rank #{props.RankId}</div>
                </div>
            </div>
        );
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
                        cardSettings={{
                            headerField: "Id",
                            contentField: "Summary",
                            template: cardTemplate.bind(this),
                        }}
                    >
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-3 property-section">
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
                                <div>Sort By</div>
                            </td>
                            <td>
                                <DropDownListComponent
                                    id="sortBy"
                                    ref={sortByObj}
                                    dataSource={sortByData}
                                    change={change.bind(this)}
                                    fields={fields}
                                    index={1}
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Field</div>
                            </td>
                            <td>
                                <DropDownListComponent
                                    id="field"
                                    ref={fieldObj}
                                    dataSource={fieldData}
                                    enabled={false}
                                    index={0}
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Direction</div>
                            </td>
                            <td>
                                <DropDownListComponent
                                    id="direction"
                                    ref={directionObj}
                                    dataSource={directionData}
                                    change={change.bind(this)}
                                    index={0}
                                ></DropDownListComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ButtonComponent
                                    id="sort"
                                    className="e-btn"
                                    onClick={sortClick.bind(this)}
                                >
                                    Sort
                                </ButtonComponent>
                            </td>
                            <td>
                                <ButtonComponent
                                    id="clear"
                                    className="e-btn"
                                    onClick={clearClick.bind(this)}
                                >
                                    Clear
                                </ButtonComponent>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the usage of sorting cards in the Kanban
                    board. You can change the sort options in the dropdown list to reflect
                    the card ordering on the board.
                </p>
            </div>
            <div id="description">
                <p>
                    The sample is designed to showcase the sorting behavior of the Kanban
                    board. It contains the <code>sortBy</code>, <code>field</code> and{" "}
                    <code>direction</code> properties. The <code>sortBy</code> property
                    provides the following options:
                </p>
                <ul>
                    <li>
                        <code>DataSourceOrder</code>: Cards are aligned in the ascending or
                        descending order based on the data source order and act accordingly
                        when the user drag-and-drop the cards. Since the feature considers
                        the default data source order, <code>field</code> mapping is not
                        required to sort the cards.
                    </li>
                    <li>
                        <code>Index</code>: The cards are aligned based on the index value.
                        The index binds to the card based on the mapping field that must be
                        an integer value. Cards will be dropped at the particular position
                        where the user drag-and-drop the cards. The index of the cards will
                        dynamically update its <code>field</code> value based on the dropped
                        position.
                    </li>
                    <li>
                        <code>Custom</code>: Users can map any field to sort the cards using
                        this option, which accepts both string and integer{" "}
                        <code>field</code> value. It maintains the initial mapping key-value
                        to drag and drop the cards and does not change their mapping value
                        after dropping the cards.
                    </li>
                </ul>
                <p>
                    The <code>direction</code> property is used to align the cards either
                    in the ascending or descending order on the Kanban board.
                </p>
            </div>
        </div>
    );
}
export default Sorting;