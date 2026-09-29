import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';


/**
 * Kanban Toggle Columns sample
 */
export class ToggleColumns extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" keyField="Status" dataSource={this.data}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" allowToggle={true} />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" allowToggle={true} />
                                <ColumnDirective headerText="Testing" keyField="Testing" allowToggle={true} isExpanded={false} />
                                <ColumnDirective headerText="Done" keyField="Close" allowToggle={true} />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the column toggling functionality of the Kanban component, enabling users to expand or collapse columns to optimize board layout and improve workflow visibility.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the column toggling functionality of the Kanban component, which allows columns to be expanded or collapsed to optimize available space and improve board readability. When a column is collapsed, the remaining columns automatically adjust to utilize the available layout space.
                    </p>
                    <p>
                        The following column properties are used to configure this behavior:
                    </p>
                    <ul>
                        <li>
                            <code>allowToggle</code>: Enables expand and collapse functionality for a column.
                        </li>
                        <li>
                            <code>isExpanded</code>: Specifies the initial expanded or collapsed state of a column when the board is rendered.
                        </li>
                    </ul>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/documentation/kanban/columns#toggle-columns" target="_blank">toggle column</a> documentation section.
                    </p>
                    <p>
	                    Looking for the full React Kanban component overview, features, pricing and documentation?
                        Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                    </p>
                </div>
           </div>
        );
    }
}