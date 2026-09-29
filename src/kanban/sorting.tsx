import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, SortOrderBy, SortDirection } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
import './sorting.css';

/**
 * Kanban Sorting sample
 */
export class Sorting extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    private kanbanObj: KanbanComponent;
    private sortByObj: DropDownListComponent;
    private fieldObj: DropDownListComponent;
    private directionObj: DropDownListComponent;
    private sortByData: { [key: string]: Object }[] = [
        { Id: 'DataSourceOrder', Sort: 'Data Source Order' },
        { Id: 'Index', Sort: 'Index' },
        { Id: 'Custom', Sort: 'Custom' }
    ];
    private fields: Object = { text: 'Sort', value: 'Id' };
    private fieldData: string[] = ['None'];
    private directionData: string[] = ['Ascending', 'Descending'];
    private change(args: ChangeEventArgs): void {
        if (args.value === 'DataSourceOrder' || args.value === 'Index') {
            const data: string = args.value === 'Index' ? 'RankId' : 'None';
            this.setFieldValue(data);
        }
        if (args.value === 'Custom') {
            this.fieldObj.dataSource = ['Priority', 'RankId', 'Summary'];
            this.fieldObj.value = 'Priority';
            this.fieldObj.enabled = true;
        }
    }
    private setFieldValue(data: string): void {
        this.fieldObj.dataSource = [data];
        this.fieldObj.value = data;
        this.fieldObj.enabled = false;
    }
    private sortClick(): void {
        this.setKanbanProperties();
    };
    private clearClick(): void {
        this.sortByObj.value = 'Index';
        this.directionObj.value = 'Ascending';
        this.setFieldValue('None');
        this.setKanbanProperties();
    };
    private setKanbanProperties() {
        this.kanbanObj.sortSettings.sortBy = this.sortByObj.value as SortOrderBy;
        this.kanbanObj.sortSettings.field = this.fieldObj.value as string;
        this.kanbanObj.sortSettings.direction = this.directionObj.value as SortDirection;
    }
    private cardTemplate(props: { [key: string]: string }): JSX.Element {
        return (
            <div className={"card-template " + props.Priority}>
                <div className="e-card-header">
                    <div className="e-card-header-caption">
                        <div className="e-card-header-title e-tooltip-text">{props.Id}</div>
                    </div>
                </div>
                <div className="e-card-content e-tooltip-text">
                    <div className="e-text">{props.Summary}</div>
                </div>
                <div className="e-card-footer">
                    <div className={`e-card-footer-css e-${props.Priority}`}></div>
                 <div className='e-rank'>Rank #{props.RankId}</div>
                </div>
            </div>
        );
    }
    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" ref={(kanban) => { this.kanbanObj = kanban }} keyField="Status" dataSource={this.data}
                            cardSettings={{ headerField: "Id", contentField: "Summary", template: this.cardTemplate.bind(this) }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                <ColumnDirective headerText="Done" keyField="Close" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                            <tr>
                                <td>
                                    <div>Sort By</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='sortBy' ref={(sortDrop) => { this.sortByObj = sortDrop }} dataSource={this.sortByData} change={this.change.bind(this)} fields={this.fields} index={1}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Field</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='field' ref={(fieldDrop) => { this.fieldObj = fieldDrop }} dataSource={this.fieldData} enabled={false} index={0}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Direction</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='direction' ref={(directionDrop) => { this.directionObj = directionDrop }} dataSource={this.directionData} index={0}></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: "10px" }}>
                                    <ButtonComponent id='sort' className="e-btn" onClick={this.sortClick.bind(this)}>Sort</ButtonComponent>
                                </td>
                                <td style={{ padding: "10px" }}>
                                    <ButtonComponent id='clear' className="e-btn" onClick={this.clearClick.bind(this)}>Clear</ButtonComponent>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the card sorting capabilities of the Kanban component, enabling workflow items to be organized and displayed based on different sorting criteria and orders.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample demonstrates the card sorting capabilities of the Kanban component using the <a href="https://ej2.syncfusion.com/react/documentation/kanban/sort" target="_blank">sortSettings</a> configuration. Cards can be organized based on data source order, index values, or custom fields, and displayed in ascending or descending order.
                    </p>
                    <p>
                        The <code>sortBy</code> property provides the following options:
                    </p>
                    <ul>
                        <li>
                            <code>DataSourceOrder</code>: Cards are arranged according to their order in the data source. Since the original data order is used, no additional <code>field</code> mapping is required.
                        </li>
                        <li>
                            <code>Index</code>: Cards are sorted based on an integer field value, such as <code>RankId</code>. When cards are reordered through drag-and-drop, the mapped field value is automatically updated to reflect the new position.
                        </li>
                        <li>
                            <code>Custom</code>: Cards are sorted using a user-defined field. Both string and numeric fields can be used, such as <code>Priority</code>, <code>RankId</code>, or <code>Summary</code>. The original field values are preserved when cards are moved.
                        </li>
                    </ul>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/kanban/sort" target="_blank">sorting</a> documentation section.
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