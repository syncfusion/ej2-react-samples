import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import './swimlane-template.css';
import * as dataSource from './datasource.json';


/**
 * Kanban Swimlane Template sample
 */
export class SwimlaneTemplate extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    public rowTemplate(props): any {
        var src = 'src/kanban/images/' + props.keyField + '.png';
        return (
            <div className='swimlane-template e-swimlane-template-table'>
                <div className="e-swimlane-row-text"><img src={src} alt={props.keyField} />
                    <span>{props.textField}</span></div>
            </div>
        );
    }
    public template: any = this.rowTemplate;

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" cssClass="kanban-swimlane-template" keyField="Status" dataSource={this.data}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }} swimlaneSettings={{ keyField: "Assignee", template: this.template.bind(this) }} >
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
                        This sample demonstrates the header template feature of Kanban. The column headers of Kanban are customized with
                        text + icons in this demo.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban provides an option to customize its column header using the <code>columns</code> ->
                        <code>template</code> property, which accepts the
                            string or HTML element`s ID value, which is used as the template for the header.
                    </p>
                </div>
            </div>
        );
    }
}