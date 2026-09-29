import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase, updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './workflow.css';
/**
 * Kanban Workflow sample
 */
const Workflow = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let data: Object[] = extend(
        [],
        (dataSource as { [key: string]: Object }).kanbanPizzaData,
        null,
        true
    ) as Object[];
    const cardTemplate = (props) => {
        var src = "src/kanban/images/" + props.ImageURL;
        return (
            <div className="card-template">
                <div className="e-card-header">
                    <div className="e-card-header-caption">
                        <div className="e-card-header-title e-tooltip-text">
                            {props.Title}
                        </div>
                    </div>
                </div>
                <div className="e-card-content e-tooltip-text">
                    <div className="e-text">{props.Description}</div>
                    <div className="e-card-kanban-image">
                        <img src={src} alt="" />
                    </div>
                </div>
                <div className="e-card-custom-footer">
                    {props.Tags.split(",").map((tag: string, index: number) => (
                        <div key={`tag-${index}`} className="e-card-tag-field">{tag}</div>
                    ))}
                </div>
            </div>
        );
    };
    return (
        <div className="kanban-control-section">
            <div className="col-lg-12 control-section">
                <div className="control-wrapper">
                    <KanbanComponent
                        cssClass="kanban-workflow"
                        id="kanban"
                        keyField="Category"
                        dataSource={data}
                        cardSettings={{
                            headerField: "Id",
                            contentField: "Description",
                            template: cardTemplate.bind(this),
                        }}
                    >
                        <ColumnsDirective>
                            <ColumnDirective
                                headerText="Order"
                                keyField="Order"
                                transitionColumns={["Ready to Serve", "Ready to Deliver"]}
                                allowToggle={true}
                                allowDrop={false}
                            />
                            <ColumnDirective
                                headerText="Ready to Serve"
                                keyField="Ready to Serve"
                                allowToggle={true}
                                transitionColumns={["Served"]}
                            />
                            <ColumnDirective
                                headerText="Home Delivery"
                                keyField="Ready to Deliver"
                                allowToggle={true}
                                transitionColumns={["Delivered"]}
                            />
                            <ColumnDirective
                                headerText="Delivered"
                                keyField="Delivered,Served"
                                allowToggle={true}
                                allowDrag={false}
                            />
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates workflow customization in the Kanban component, enabling controlled card transitions between workflow stages based on predefined business rules.
                </p>
            </div>
            <div id="description">
                <p>
                    In this sample, you can drag a card from the <strong>Order</strong> column and drop it into the
                    <strong>Ready to Serve</strong> or <strong>Home Delivery</strong> columns. You cannot, however,
                    drag a card from the <strong>Delivered</strong> column, and you cannot drop a card into the
                    <strong>Order</strong> column. These restrictions are controlled using the following properties:
                </p>
                <ul>
                    <li>The <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/columnsmodel#transitioncolumns" target="_blank">transitionColumns</a> property is used to allow card transitions only to the specified columns.</li>
                    <li>The <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/columnsmodel#allowdrag" target="_blank">allowDrag</a> property is used to enable or disable the drag action of a column.</li>
                    <li>The <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/columnsmodel#allowdrop" target="_blank">allowDrop</a> property is used to enable or disable the drop action of a column.</li>
                </ul>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/columnsmodel#transitioncolumns" target="_blank">transition columns</a> documentation section.
                </p>
                <p>
	                Looking for the full React Kanban component overview, features, pricing and documentation?
                    Visit the <a href="https://www.syncfusion.com/gantt-sdk/react-kanban-board" target="_blank">React Kanban</a> page.
                </p>
            </div>

        </div>
    );
}
export default Workflow;