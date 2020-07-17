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
                        This sample demonstrates the Kanban component with the stacked header feature. In this sample, the Kanban is
                        showcased
                        with two headers aligned in a stacked manner.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban provides an option to add an additional header along with a column header in stacked manner. This
                        header groups the logically related columns. This can be achieved by mapping <code>text</code> and
                        <code>keyFields</code> attribute of the <code>stackedHeaders</code> property.
                    </p>
                </div>
            </div>
        );
    }
}