import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Kanban Show / Hide Columns sample
 */
const ShowHideColumns = () => {
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
    let checkObj = useRef<CheckBoxComponent>(null);
    let progressObj = useRef<CheckBoxComponent>(null);
    let reviewObj = useRef<CheckBoxComponent>(null);
    let closeObj = useRef<CheckBoxComponent>(null);
    const onChange = (args: ChangeEventArgs): void => {
        if (args.checked) {
            kanbanObj.current.showColumn(
                checkObj.current.element.getAttribute("data-id")
            );
        } else {
            kanbanObj.current.hideColumn(
                checkObj.current.element.getAttribute("data-id")
            );
        }
    };
    const onChangeProgress = (args: ChangeEventArgs): void => {
        if (args.checked) {
            kanbanObj.current.showColumn(
                progressObj.current.element.getAttribute("data-id")
            );
        } else {
            kanbanObj.current.hideColumn(
                progressObj.current.element.getAttribute("data-id")
            );
        }
    };
    const onChangeReview = (args: ChangeEventArgs): void => {
        if (args.checked) {
            kanbanObj.current.showColumn(
                reviewObj.current.element.getAttribute("data-id")
            );
        } else {
            kanbanObj.current.hideColumn(
                reviewObj.current.element.getAttribute("data-id")
            );
        }
    };
    const onChangeClose = (args: ChangeEventArgs): void => {
        if (args.checked) {
            kanbanObj.current.showColumn(
                closeObj.current.element.getAttribute("data-id")
            );
        } else {
            kanbanObj.current.hideColumn(
                closeObj.current.element.getAttribute("data-id")
            );
        }
    };
    return (
        <div className="kanban-control-section">
            <div className="col-lg-9 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        keyField="Status"
                        dataSource={data}
                        ref={kanbanObj}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
                    >
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="In Review" keyField="Review" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <PropertyPane title="Show / Hide Columns">
                    <table
                        id="property"
                        title="Show / Hide Columns"
                        className="property-panel-table"
                        style={{ width: "100%" }}
                    >
                        <tbody>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent
                                        ref={checkObj}
                                        data-id="Open"
                                        checked={true}
                                        label="To Do"
                                        change={onChange.bind(this)}
                                    ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent
                                        ref={progressObj}
                                        data-id="InProgress"
                                        checked={true}
                                        label="In Progress"
                                        change={onChangeProgress.bind(this)}
                                    ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent
                                        ref={reviewObj}
                                        data-id="Review"
                                        checked={true}
                                        label="In Review"
                                        change={onChangeReview.bind(this)}
                                    ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent
                                        ref={closeObj}
                                        data-id="Close"
                                        checked={true}
                                        label="Done"
                                        change={onChangeClose.bind(this)}
                                    ></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>

            <div id="action-description">
                <p>
                    This sample demonstrates dynamic column visibility management in the Kanban component, allowing users to customize the board layout by showing or hiding columns as needed.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates how to dynamically manage column visibility in the Kanban component using the available public methods.
                </p>
                <ul>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#showcolumn" target="_blank">showColumn</a>: Displays a hidden column based on the specified <code>keyField</code> value.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#hidecolumn" target="_blank">hideColumn</a>: Hides a visible column based on the specified <code>keyField</code> value.
                    </li>
                </ul>
                <p>
                    These methods enable users to customize the board layout by controlling the visibility of workflow stages at runtime.
                </p>
                <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#showcolumn" target="_blank">show column</a> documentation section.
                </p>
                <p>
	                Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default ShowHideColumns;