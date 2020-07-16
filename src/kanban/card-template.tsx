import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, DialogFieldsModel } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import './card-template.css';
import * as dataSource from './datasource.json';


/**
 * Kanban Card Template sample
 */
export class CardTemplate extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanPizzaData, null, true) as Object[];
    private fields: DialogFieldsModel[] = [
        { text: 'ID', key: 'Id', type: 'TextBox' },
        { key: 'Category', type: 'DropDown' },
        { key: 'Title', type: 'TextBox' },
        { key: 'Size', type: 'TextBox' },
        { key: 'Description', type: 'TextArea' }
    ];
    private cardTemplate(props): JSX.Element {
        var src = 'src/kanban/images/' + props.ImageURL;
        return (<div className="card-template">
            <div className="card-template-wrap">
                <table className="card-template-wrap">
                    <colgroup>
                        <col style={{ width: "55px" }} />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className="e-image">
                                <img src={src} alt={props.ImageURL} />
                            </td>
                            <td className="e-title">
                                <div className="e-card-stacked">
                                    <div className="e-card-header">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-tooltip-text">{props.Title}</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content" style={{ lineHeight: "2.75em" }}>
                                        <table className="card-template-wrap" style={{ tableLayout: "auto" }}>
                                            <tbody>
                                                <tr>
                                                    {(props.Category == 'Menu' || props.Category == 'Order' || props.Category == 'Ready to Serve') && <td colSpan={2}>
                                                        {props.Category == 'Menu' && <div className="e-description e-tooltip-text" >{props.Description}</div>}
                                                        {props.Category != 'Menu' && < div className="e-description e-tooltip-text">{props.OrderID}</div>}
                                                    </td>}
                                                    {(props.Category == 'Delivered' || props.Category == 'Served') && <td className="card-content">
                                                        <div className="e-description e-tooltip-text">{props.OrderID}</div>
                                                        <div className="e-icons e-done"></div>
                                                    </td>}
                                                </tr>
                                                <tr>
                                                    {props.Category == 'Menu' && <td className="card-content">
                                                        <div className="e-size e-tooltip-text">{props.Size}</div>
                                                        <div className="e-price e-tooltip-text">{props.Price}</div>
                                                    </td>}
                                                    {props.Category != 'Menu' && < td className="card-content">
                                                        {props.Category == 'Order' && < div className="e-preparingText e-tooltip-text">Preparing</div>}
                                                        {props.Category === 'Ready to Serve' && <div className="e-readyText e-tooltip-text">Ready to Serve</div>}
                                                        {(props.Category == 'Delivered' || props.Category == 'Served') && < div className="e-deliveredText e-tooltip-text">Delivered</div>}
                                                        {props.Category == 'Order' && <div className="e-time e-tooltip-text">
                                                            <div className="e-icons e-clock"></div>
                                                            <div className="e-mins">15 mins</div>
                                                        </div>}
                                                        {props.Category == 'Ready to Serve' && < div className="e-time e-tooltip-text" >
                                                            <div className="e-icons e-clock"></div>
                                                            <div className="e-mins">5 mins</div>
                                                        </div>}
                                                    </td>}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        );
    }

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent cssClass="kanban-card-template" id="kanban" keyField="Category" dataSource={this.data} 
                            cardSettings={{ headerField: "Id", template: this.cardTemplate.bind(this) }} dialogSettings={{ fields: this.fields }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText='Menu' keyField='Menu' />
                                <ColumnDirective headerText='Order' keyField='Order' />
                                <ColumnDirective headerText='Ready to Serve' keyField='Ready to Serve' />
                                <ColumnDirective headerText='Delivered' keyField='Delivered,Served' />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates how to customize the Kanban cards using templates. In this demo, the cards are
                        customized with
                        icons, images, and tags.
                    </p>
                </div>
                <div id="description">
                    <p>
                        You can customize the default design of the Kanban cards using templates. This can be achieved using the
                        <code>cardSettings</code> -> <code>template</code> property, which accepts the string or HTML element`s ID
                                value.
                    </p>
                    <p>In this demo, all the cards are customized with templating as text, images, and tags.</p>
                </div>
            </div>
        );
    }
}