import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, StackedHeadersDirective, StackedHeaderDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';

/**
 * Kanban StackedHeader sample
 */
export class StackedHeader extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" cssClass="kanban-overview" keyField="Status" dataSource={this.data}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="Open" keyField="Open" />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                <ColumnDirective headerText="In Review" keyField="Review" />
                                <ColumnDirective headerText="Completed" keyField="Close" />
                            </ColumnsDirective>
                            <StackedHeadersDirective>
                                <StackedHeaderDirective text='To Do' keyFields='Open'></StackedHeaderDirective>
                                <StackedHeaderDirective text='Development Phase' keyFields='InProgress, Review'></StackedHeaderDirective>
                                <StackedHeaderDirective text='Done' keyFields='Close'></StackedHeaderDirective>
                            </StackedHeadersDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the stacked header functionality of the Kanban component, enabling related workflow columns to be grouped under shared headers for improved organization and readability.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the stacked header functionality of the Kanban component using the
                        <code>stackedHeaders</code> property. Stacked headers provide an additional header row that groups related columns under a common category, making workflow stages easier to organize and understand.
                    </p>
                    <p>
                        In this sample, individual status columns are grouped into broader workflow phases by configuring the <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/stackedheadersmodel#text" target="_blank">text</a> and <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/stackedheadersmodel#keyfields" target="_blank">keyFields</a> properties of the <code>stackedHeaders</code> collection.
                    </p>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/columns#stacked-headers" target="_blank">stacked header</a> documentation section.
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