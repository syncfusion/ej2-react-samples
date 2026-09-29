import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './column-rearrangement.css';
/**
 * Kanban Default sample
 */
const ColumnRearrange = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
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
                        allowColumnDragAndDrop={true}
                        cardSettings={{
                            contentField: "Summary",
                            headerField: "Id",
                            tagsField: "Tags",
                            grabberField: "Color",
                            footerCssField: "ClassName",
                        }}
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
                    This sample demonstrates column reordering through drag-and-drop interactions in the Kanban component.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates how to reorder columns in the Kanban component using the <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#allowcolumndraganddrop" target="_blank">allowColumnDragAndDrop</a> property. When enabled, columns can be dragged and dropped to different positions within the board, allowing the workflow layout to be customized while preserving the cards within each column.
                </p>
                <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/columns#drag-and-drop" target="_blank">column reordering</a> documentation section.
                </p>
                <p>
	                Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default ColumnRearrange;