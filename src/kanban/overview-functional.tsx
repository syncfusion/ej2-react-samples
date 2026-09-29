import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { extend, addClass } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, DialogFieldsModel, CardRenderedEventArgs } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './overview.css';
/**
 * Kanban Overview sample
 */

const Overview = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).cardData,
        null,
        true
    ) as Object[];
    const fields: DialogFieldsModel[] = [
        { text: "ID", key: "Title", type: "TextBox" },
        { key: "Status", type: "DropDown" },
        { key: "Assignee", type: "DropDown" },
        { key: "RankId", type: "TextBox" },
        { key: "Summary", type: "TextArea" },
    ];
    const cardRendered = (args: CardRenderedEventArgs): void => {
        let val: string = (args.data as { [key: string]: Object })
            .Priority as string;
        addClass([args.element], val);
    };
    const columnTemplate = (props: { [key: string]: string }) => {
        return (
            <div className="header-template-wrap">
                <div className={"header-icon e-icons " + props.keyField}></div>
                <div className="header-text">{props.headerText}</div>
            </div>
        );
    };
    const cardTemplate = (props: { [key: string]: string }) => {
        return (
            <div className={"card-template"}>
                <div className="e-card-header">
                    <div className="e-card-header-caption">
                        <div className="e-card-header-title e-tooltip-text">
                            {props.Title}
                        </div>
                    </div>
                </div>
                <div className="e-card-content e-tooltip-text">
                    <div className="e-text">{props.Summary}</div>
                </div>
                <div className="e-card-custom-footer">
                    {props.Tags.split(",").map((tag: string) => (
                        <div className="e-card-tag-field e-tooltip-text" key={tag}>{tag}</div>
                    ))}
                    <div className="e-card-avatar">{getString(props.Assignee)}</div>
                </div>
            </div>
        );
    };
    const getString = (assignee: string): string => {
        return (assignee.match(/\b(\w)/g) as string[]).join("").toUpperCase();
    };
    return (
        <div className="schedule-control-section">
            <div className="col-lg-12 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        cssClass="kanban-overview"
                        keyField="Status"
                        dataSource={data}
                        enableTooltip={true}
                        swimlaneSettings={{ keyField: "Assignee" }}
                        cardSettings={{
                            headerField: "Title",
                            template: cardTemplate.bind(this),
                            selectionType: "Multiple",
                        }}
                        dialogSettings={{ fields: fields }}
                        cardRendered={cardRendered.bind(this)}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                headerText="To Do"
                                keyField="Open"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                            <ColumnDirective
                                headerText="In Progress"
                                keyField="InProgress"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                            <ColumnDirective
                                headerText="In Review"
                                keyField="Review"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                            <ColumnDirective
                                headerText="Done"
                                keyField="Close"
                                allowToggle={true}
                                template={columnTemplate.bind(this)}
                            />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates a comprehensive task management solution built with the Kanban component, showcasing key features such as card and header customization, swimlane organization, tooltips, and column visibility management to enhance workflow tracking and collaboration.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates a comprehensive task management scenario built with the Kanban component. It combines multiple features, including customized card and column header templates, swimlane grouping, tooltips, and column toggling to create an interactive workflow management experience.
                </p>
                <p>
                    The board is populated using a predefined task collection bound through the <a href="https://ej2.syncfusion.com/react/documentation/kanban/data-binding" target="_blank">dataSource</a> property. Tasks are organized into <a href="https://ej2.syncfusion.com/react/documentation/kanban/columns" target="_blank">columns</a> based on their <code>Status</code> field and grouped into swimlanes according to the assigned resource, providing a clear view of task ownership and progress.
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
export default Overview;