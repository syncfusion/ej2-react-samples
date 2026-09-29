import * as ReactDOM from "react-dom";
import * as React from "react";
import { useEffect } from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, CardRenderedEventArgs, CardClickEventArgs } from "@syncfusion/ej2-react-kanban";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
import './events.css';
/**
 * Kanban Events sample
 */
const Events = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).kanbanData,
        null,
        true
    ) as Object[];
    const onClear = (): void => {
        document.getElementById("EventLog").innerHTML = "";
    };
    const OnCreate = (): void => {
        appendElement("Kanban <b>Load</b> event called<hr>");
    };
    const OnActionBegin = (): void => {
        appendElement("Kanban <b>Action Begin</b> event called<hr>");
    };
    const OnActionComplete = (): void => {
        appendElement("Kanban <b>Action Complete</b> event called<hr>");
    };
    const OnActionFailure = (): void => {
        appendElement("Kanban <b>Action Failure</b> event called<hr>");
    };
    const OnDataBinding = (): void => {
        appendElement("Kanban <b>Data Binding</b> event called<hr>");
    };
    const OnDataBound = (): void => {
        appendElement("Kanban <b>Data Bound</b> event called<hr>");
    };
    const OnCardRendered = (args: CardRenderedEventArgs): void => {
        appendElement(
            "Kanban - " +
            (args.data as { [key: string]: Object }).Id +
            " - <b>Card Rendered</b> event called<hr>"
        );
    };
    const OnQueryCellInfo = (): void => {
        appendElement("Kanban <b>Query Cell Info</b> event called<hr>");
    };
    const OnCardClick = (args: CardClickEventArgs): void => {
        appendElement(
            "Kanban - " +
            (args.data as { [key: string]: Object }).Id +
            " - <b>Card Click</b> event called<hr>"
        );
    };
    const OnCardDoubleClick = (args: CardClickEventArgs): void => {
        appendElement(
            "Kanban - " +
            (args.data as { [key: string]: Object }).Id +
            " - <b>Card Double Click</b> event called<hr>"
        );
    };
    const OnDragStart = (): void => {
        appendElement("Kanban <b>Drag Start</b> event called<hr>");
    };
    const OnDrag = (): void => {
        appendElement("Kanban <b>Drag</b> event called<hr>");
    };
    const OnDragStop = (): void => {
        appendElement("Kanban <b>Drag Stop</b> event called<hr>");
    };
    const appendElement = (html: string): void => {
        let span: HTMLElement = document.createElement("span");
        span.innerHTML = html;
        let log: HTMLElement = document.getElementById("EventLog");
        log.insertBefore(span, log.firstChild);
    };

    return (
        <div className="kanban-control-section">
            <div className="col-lg-8 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        keyField="Status"
                        dataSource={data}
                        swimlaneSettings={{ keyField: "Assignee" }}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
                        created={OnCreate.bind(this)}
                        actionBegin={OnActionBegin.bind(this)}
                        actionComplete={OnActionComplete.bind(this)}
                        actionFailure={OnActionFailure.bind(this)}
                        dataBinding={OnDataBinding.bind(this)}
                        dataBound={OnDataBound.bind(this)}
                        cardRendered={OnCardRendered.bind(this)}
                        queryCellInfo={OnQueryCellInfo.bind(this)}
                        cardClick={OnCardClick.bind(this)}
                        cardDoubleClick={OnCardDoubleClick.bind(this)}
                        dragStart={OnDragStart.bind(this)}
                        drag={OnDrag.bind(this)}
                        dragStop={OnDragStop.bind(this)}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                headerText="To Do"
                                keyField="Open"
                                allowToggle={true}
                            />
                            <ColumnDirective
                                headerText="In Progress"
                                keyField="InProgress"
                                allowToggle={true}
                            />
                            <ColumnDirective
                                headerText="Done"
                                keyField="Close"
                                allowToggle={true}
                            />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-4 property-section">
                <PropertyPane title="Event Trace">
                    <table
                        id="property"
                        title="Properties"
                        className="property-panel-table"
                        style={{ width: "100%" }}
                    >
                        <tbody>
                            <tr>
                                <td>
                                    <div className="eventarea">
                                        <span className="EventLog" id="EventLog"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "30%" }}>
                                    <div className="evtbtn">
                                        <ButtonComponent title="Clear" onClick={onClear.bind(this)}>
                                            Clear
                                        </ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the client-side event capabilities of the Kanban component, providing insights into user interactions and component lifecycle activities through real-time event monitoring.
                </p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates the client-side events available in the Kanban component and how they can be used to monitor user interactions, data operations, rendering processes, and drag-and-drop actions.
                    All events triggered by the board are logged in the event tracer panel for easy tracking and debugging.
                </p>
                <p>The following events are showcased in this sample:</p>
                <ol>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#created" target="_blank">created</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#actionbegin" target="_blank">actionBegin</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#actioncomplete" target="_blank">actionComplete</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#actionfailure" target="_blank">actionFailure</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#databinding" target="_blank">dataBinding</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#databound" target="_blank">dataBound</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#cardrendered" target="_blank">cardRendered</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#querycellinfo" target="_blank">queryCellInfo</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#cardclick" target="_blank">cardClick</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#carddoubleclick" target="_blank">cardDoubleClick</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#dragstart" target="_blank">dragStart</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#drag" target="_blank">drag</a></li>
                    <li><a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#dragstop" target="_blank">dragStop</a></li>
                </ol>
                <p>
                    More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#events" target="_blank">events</a> documentation section.
                </p>
                <p>
	        	    Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>
        </div>
    );
}
export default Events;