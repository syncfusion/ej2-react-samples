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
     This example demonstrates the column rearrangement of the Kanban control. You can drag and drop the columns to rearrange them across multiple stages of the Kanban board.

                </p>
            </div>
            <div id="description">
                <p>
                    The Kanban provides an option to enable column drag-and-drop functionality using the allowColumnDragAndDrop property.  
        allowColumnDragAndDrop: If you set this property to true, the columns can be dragged and dropped to rearrange their order.  
                </p>
            </div>
        </div>
    );
}
export default ColumnRearrange;