import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './default.css';
/**
 * Kanban Default sample
 */
const Default = () => {
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
                    This sample demonstrates the basic Kanban board functionality, including data binding, column mapping, card rendering, and drag-and-drop interactions.
                    Cards are organized into workflow stages and can be moved across columns to reflect status changes.
                </p>
            </div>
            <div id="description">
                <p>
                    The Kanban board is populated using a predefined data source and displays tasks across multiple workflow stages. Tasks are grouped into columns based on the field configured through the keyField property.
                </p>
                <p>
                    In this example, the board is configured using the following core Kanban properties:
                </p>
                <ul>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/kanban/data-binding" target="_blank">dataSource</a> - Binds the task collection to the Kanban board.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/kanban/columns" target="_blank">columns</a> - Defines the workflow stages displayed on the board.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#keyfield" target="_blank">keyField</a> - Maps task status values to their corresponding columns.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#cardsettings" target="_blank">cardSettings</a> - Configures the information displayed within each card.
                    </li>  
                </ul>
                <p>
                    Cards can be dragged and dropped between columns to update workflow status. The board also supports visual customization through card templates, tags, priorities, and resource indicators.
                </p>
                <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/getting-started/" target="_blank">documentation section</a>.
                </p>
                <p>
	        	    Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default Default;