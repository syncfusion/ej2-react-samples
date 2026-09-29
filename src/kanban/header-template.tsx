import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import './header-template.css';
import * as dataSource from './datasource.json';


/**
 * Kanban Header Template sample
 */
export class HeaderTemplate extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    private columnTemplate(props: { [key: string]: string }): JSX.Element {
        return (
            <div className="header-template-wrap">
                <div className={"header-icon e-icons " + props.keyField}></div>
                <div className="header-text">{props.headerText}</div>
            </div>
        );
    }
    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent cssClass="kanban-header" id="kanban" keyField="Status" dataSource={this.data}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" template={this.columnTemplate.bind(this)}/>
                                <ColumnDirective headerText="In Progress" keyField="InProgress" template={this.columnTemplate.bind(this)}/>
                                <ColumnDirective headerText="In Review" keyField="Review" template={this.columnTemplate.bind(this)}/>
                                <ColumnDirective headerText="Done" keyField="Close" template={this.columnTemplate.bind(this)}/>
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates header template customization in the Kanban component, enabling column headers to be personalized with custom content and visual elements for an enhanced user experience.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban provides an option to customize its column header using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/columns#header-template" target="_blank">header template</a> property, which accepts the string or HTML element&rsquo;s ID value that is used as the template
                        for the header. In this demo, each header is rendered with a priority icon (Open, InProgress,
                        Review, or Close) followed by the column title.
                    </p>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/columns#header-template" target="_blank">header template</a> documentation section.
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
