import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import './tooltip-template.css';
import * as dataSource from './datasource.json';


/**
 * Kanban Tooltip Template sample
 */
const TooltipTemplate = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).kanbanData,
        null,
        true
    ) as Object[];
    let kanbanObj = useRef<KanbanComponent>(null);
    const template = (props) => {
        return (
            <div className="e-kanbantooltiptemp">
                <table>
                    <tr>
                        <td className="e-kanban-card-details">
                            <table>
                                <colgroup>
                                    <col style={{ width: "30%" }} />
                                    <col style={{ width: "70%" }} />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <td className="CardHeader">Assignee:</td>
                                        <td>{props.Assignee}</td>
                                    </tr>
                                    <tr>
                                        <td className="CardHeader">Type:</td>
                                        <td>{props.Type}</td>
                                    </tr>
                                    <tr>
                                        <td className="CardHeader">Estimate:</td>
                                        <td>{props.Estimate}</td>
                                    </tr>
                                    <tr>
                                        <td className="CardHeader">Summary:</td>
                                        <td>{props.Summary}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        );
    };
    const onToolTipChange = (args: ChangeEventArgs): void => {
        kanbanObj.current.enableTooltip = args.checked;
    };
    const onToolTipTemplateChange = (args: ChangeEventArgs): void => {
        kanbanObj.current.tooltipTemplate = args.checked ? template : null;
    };
    return (
        <div className="kanban-control-section">
            <div className="col-lg-9 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        id="kanban"
                        cssClass="kanban-tooltip"
                        keyField="Status"
                        dataSource={data}
                        ref={kanbanObj}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
                        enableTooltip={true}
                        tooltipTemplate={template.bind(this)}
                    >
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Testing" keyField="Testing" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <PropertyPane title="Properties">
                    <table
                        id="property"
                        title="Properties"
                        className="property-panel-table"
                        style={{ width: "100%" }}
                    >
                        <tbody>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "90%" }}>
                                    <div className="enableTooltip">
                                        <CheckBoxComponent
                                            checked={true}
                                            label="Enable Tooltip"
                                            change={onToolTipChange.bind(this)}
                                        ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "90%" }}>
                                    <div className="enableTooltipTemplate">
                                        <CheckBoxComponent
                                            checked={true}
                                            label="Enable Tooltip Template"
                                            change={onToolTipTemplateChange.bind(this)}
                                        ></CheckBoxComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how to customize the tooltip messages in
                    Kanban cards. You can enable or disable the tooltip and its template.
                </p>
            </div>
            <div id="description">
                <p>
                    The Kanban provides an option to show default tooltip and templated
                    tooltip using the <code>enableTooltip</code>
                    and <code>tooltipTemplate</code> properties.
                </p>
                <ul>
                    <li>
                        <code>enableTooltip:</code> If you set this property to true, the
                        cards show a tooltip with default format.
                    </li>
                    <li>
                        <code>tooltipTemplate:</code> If you set <code>enableTooltip</code>{" "}
                        property to true and configured the tooltipTemplate, the cards show
                        a tooltip with templated content.
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default TooltipTemplate;