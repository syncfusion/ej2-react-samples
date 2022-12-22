import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './swimlane-template.css';
import * as dataSource from './datasource.json';


/**
 * Kanban Swimlane Template sample
 */
function SwimlaneTemplate() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    function rowTemplate(props): any {
        var src = 'src/kanban/images/' + props.keyField + '.png';
        return (
            <div className='swimlane-template e-swimlane-template-table'>
                <div className="e-swimlane-row-text"><img src={src} alt={props.keyField} />
                    <span>{props.textField}</span></div>
            </div>
        );
    }
    let template: any = rowTemplate;

    return (
        <div className='kanban-control-section'>
            <div className='control-section'>
                <div className='control-wrapper'>
                    <KanbanComponent id="kanban" cssClass="kanban-swimlane-template" keyField="Status" dataSource={data}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }} swimlaneSettings={{ keyField: "Assignee", template: template.bind(this) }} >
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
                    The Kanban provides an option to customize its column header using the <code>columns</code> -&gt;
                    <code>template</code> property, which accepts the
                        string or HTML element`s ID value, which is used as the template for the header.
                </p>
            </div>
        </div>
    );
}
export default SwimlaneTemplate;