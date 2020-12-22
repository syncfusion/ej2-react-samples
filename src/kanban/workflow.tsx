import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './workflow.css';

/**
 * Kanban Workflow sample
 */

export class Workflow extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanPizzaData, null, true) as Object[];
    private cardTemplate(props): JSX.Element {
        var src = 'src/kanban/images/' + props.ImageURL;
        return (<div className="card-template">
                    <div className='e-card-header'>
                        <div className='e-card-header-caption'>
                            <div className='e-card-header-title e-tooltip-text'>{props.Title}</div>
                        </div>
                    </div>
                    <div className='e-card-content e-tooltip-text'>
                        <div className='e-text'>{props.Description}</div>
                        <div className='e-card-kanban-image'><img src={src} alt=""/></div>
                    </div>
                    <div className='e-card-custom-footer'>
                        {props.Tags.split(",").map((tag: string) => <div className="e-card-tag-field">{tag}</div>)}
                    </div>
                </div>
                );
            }
    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent cssClass="kanban-workflow" id="kanban" keyField="Category" dataSource={this.data} 
                            cardSettings={{ headerField: "Id", template: this.cardTemplate.bind(this) }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText='Order' keyField='Order' transitionColumns={['Ready to Serve', 'Ready to Deliver']} allowToggle={true} allowDrop={false} />
                                <ColumnDirective headerText='Ready to Serve' keyField='Ready to Serve' allowToggle={true} transitionColumns={['Served']} />
                                <ColumnDirective headerText='Home Delivery' keyField='Ready to Deliver' allowToggle={true} transitionColumns={['Delivered']} />
                                <ColumnDirective headerText='Delivered' keyField='Delivered,Served' allowToggle={true} allowDrag={false} />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This example demonstrates the workflow functionalities that defines the flow of transition between the columns.
                        You can drag and drop the cards between Kanban columns to see the workflow restriction.</p>
                </div>
                <div id="description">
                    <p>In this sample, you can drag the cards from the `Order` column and drop them into `Ready to Serve` and `Home Delivery` columns.
                        Also, you couldn’t drag the cards from the `Delivered` column and drop the cards in the `Order` column.
                        The action is controlled using the below properties.</p>
                    <ul>
                        <li>The <code>transitionColumns</code> property is used to allow the card transition to specified columns.</li>
                        <li>The <code>allowDrag</code> property is used to enable/disable the drag action of columns.</li>
                        <li>The <code>allowDrop</code> property is used to enable/disable the drop action of columns.</li>
                    </ul>
                </div>
            </div>
        );
    }
}