import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, SortOrderBy, SortDirection } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';

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
                            <tr>
                                <td>
                                    <div>Sort By</div>
                                </td>
                                <td>
                                    <DropDownListComponent id='sortBy' ref={(sortDrop) => { this.sortByObj = sortDrop }} dataSource={this.sortByData} change={this.change.bind(this)} fields={this.fields} index={1}></DropDownListComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Field</div>
                                </td>
                                <td>
                                    <DropDownListComponent id='field' ref={(fieldDrop) => { this.fieldObj = fieldDrop }} dataSource={this.fieldData} enabled={false} index={0}></DropDownListComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Direction</div>
                                </td>
                                <td>
                                    <DropDownListComponent id='direction' ref={(directionDrop) => { this.directionObj = directionDrop }} dataSource={this.directionData} index={0}></DropDownListComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <ButtonComponent id='sort' className="e-btn" onClick={this.sortClick.bind(this)}>Sort</ButtonComponent>
                                </td>
                                <td>
                                    <ButtonComponent id='clear' className="e-btn" onClick={this.clearClick.bind(this)}>Clear</ButtonComponent>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the usage of sorting cards in the Kanban board. You can change the sort options in the dropdown list to reflect the card ordering on the board.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The sample is designed to showcase the sorting behavior of the Kanban board. It contains the <code>sortBy</code>, <code>field</code> and <code>direction</code> properties. The <code>sortBy</code> property provides the following options:
                    </p>
                    <ul>
                        <li><code>DataSourceOrder</code>: Cards are aligned in the ascending or descending order based on the data source order and act accordingly when the user drag-and-drop the cards. Since the feature considers the default data source order, <code>field</code> mapping is not required to sort the cards.</li>
                        <li><code>Index</code>: The cards are aligned based on the index value. The index binds to the card based on the mapping field that must be an integer value. Cards will be dropped at the particular position where the user drag-and-drop the cards. The index of the cards will dynamically update its <code>field</code> value based on the dropped position.</li>
                        <li><code>Custom</code>: Users can map any field to sort the cards using this option, which accepts both string and integer <code>field</code> value.  It maintains the initial mapping key-value to drag and drop the cards and does not change their mapping value after dropping the cards.</li>
                    </ul>
                    <p>The <code>direction</code> property is used to align the cards either in the ascending or descending order on the Kanban board.</p>
                </div>
            </div>
        );
    }
}