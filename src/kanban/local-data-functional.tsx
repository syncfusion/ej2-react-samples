import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Kanban Local Data sample
 */

const LocalData = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).kanbanData,
        null,
        true
    ) as Object[];
    return (
        <div className="kanban-control-section">
            <div className="col-lg-12 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        keyField="Status"
                        dataSource={data}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
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
            <div id="action-description">
                <p>
                    This sample demonstrates the way of data binding to Kanban component
                    with JavaScript object array (local data source).
                </p>
            </div>
            <div id="description">
                <p>
                    The Kanban supports binding data source to the board using the{" "}
                    <code>dataSource</code> property that can be assigned with the array
                    of JavaScript objects or instances of DataManager.
                </p>
                <p>
                    In this demo, the array of JavaScript objects is assigned as the data
                    source to the Kanban board.
                </p>
            </div>
        </div>
    );
}
export default LocalData;