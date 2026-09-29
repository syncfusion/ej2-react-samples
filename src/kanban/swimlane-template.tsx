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
                        This sample demonstrates swimlane template customization in the Kanban component, enabling workflow items to be organized and presented with personalized swimlane headers for improved task visualization.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates swimlane header customization in the Kanban component using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane#template" target="_blank">swimlaneSettings.template</a> property. A custom template can be defined using a string template or an HTML element to personalize the appearance of swimlane headers.
                    </p>
                    <p>
                        In this sample, each swimlane header is rendered with resource-specific information, including an avatar image and assignee details, providing a more intuitive and visually engaging way to identify workflow ownership.
                    </p>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/swimlane#template" target="_blank">swimlane template</a> documentation section.
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