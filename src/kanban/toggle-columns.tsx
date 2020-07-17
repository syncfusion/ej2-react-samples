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
                        This sample demonstrates the toggle column feature of Kanban. Each column of Kanban can be collapsible, and the
                        testing
                        column is collapsed on page load itself.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban component allows you to expand or collapse its columns to save space. The remaining columns extend its
                        width to occupy the hided column space.
                        This feature can be achieved by the following properties:
                    </p>
                    <ul>
                        <li><code>allowToggle:</code> Enables the expand/collapse behavior in Kanban.</li>
                        <li><code>isExpanded:</code> The property determines whether the column can be collapsed on the page load
                    itself.</li>
                    </ul>
                </div>
            </div>
        );
    }
}