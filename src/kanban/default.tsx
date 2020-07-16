import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './default.css';

/**
 * Kanban Default sample
 */
export class Default extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" keyField="Status" dataSource={this.data}
                            cardSettings={{ contentField: "Summary", headerField: "Id", tagsField: 'Tags', grabberField: 'Color', footerCssField: 'ClassName' }}>
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
                        This example demonstrates the default functionalities of the Kanban component. You can drag and drop the cards
                        across multiple states of the Kanban board by default.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The sample is configured with a minimal setting that is mandatory to render Kanban layout and cards. The
                        dataSource, columns, and cardSettings are essential fields to render the Kanban component. By default, you can
                        drag and drop the cards across all stages of Kanban.
                    </p>
                </div>
            </div>
        );
    }
}