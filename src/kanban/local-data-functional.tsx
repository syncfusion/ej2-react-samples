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
                    This sample demonstrates how to bind local data to the Kanban component, enabling tasks to be visualized, organized, and managed across different workflow stages.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates local data binding in the Kanban component using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/data-binding#local-data" target="_blank">dataSource</a> property. The board is populated with a collection of task data, where each item is mapped to a workflow stage using the column <code>keyField</code>.
                </p>
                <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/data-binding#local-data" target="_blank">local data</a> documentation section.
                </p>
                <p>
	                Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default LocalData;