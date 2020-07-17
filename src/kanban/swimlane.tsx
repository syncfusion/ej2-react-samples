import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, SortDirection } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './swimlane.css';
import * as dataSource from './datasource.json';

/**
 * Kanban Swimlane sample
 */
export class Swimlane extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    private sortData: { [key: string]: Object }[] = [
        { 'value': 'Ascending', 'text': 'Ascending' }, { 'value': 'Descending', 'text': 'Descending' }
    ];
    private kanbanObj: KanbanComponent;
    private value: string = 'Ascending';
    private changeSortOrder(args: DropDownChangeArgs): void {
        this.kanbanObj.swimlaneSettings.sortDirection = args.itemData.value as SortDirection;
    };
    private onChange(args: ChangeEventArgs): void {
        this.kanbanObj.swimlaneSettings.allowDragAndDrop = args.checked;
    };
    private changeRow(args: ChangeEventArgs): void {
        this.kanbanObj.swimlaneSettings.showEmptyRow = args.checked;
    };
    private changeCount(args: ChangeEventArgs): void {
        this.kanbanObj.swimlaneSettings.showItemCount = args.checked;
    }

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-8 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" cssClass="kanban-swimlane" ref={(kanban) => { this.kanbanObj = kanban }} keyField="Status" dataSource={this.data}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }} swimlaneSettings={{ keyField: "Assignee" }} >
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                <ColumnDirective headerText="Done" keyField="Close" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Properties'>
                    <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tr>
                            <td>
                                <div>Sort Direction</div>
                            </td>
                            <td>
                                <div>
                                    <DropDownListComponent id='sort' dataSource={this.sortData} change={this.changeSortOrder.bind(this)} value={this.value} ></DropDownListComponent>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Enable Swimlane Drag And Drop</div>
                            </td>
                            <td>
                                <CheckBoxComponent checked={false} change={this.onChange.bind(this)}></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Show Empty Swimlane Row</div>
                            </td>
                            <td>
                                <CheckBoxComponent checked={false} change={this.changeRow.bind(this)}></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>Show Swimlane Item Count</div>
                            </td>
                            <td>
                                <CheckBoxComponent checked={true} change={this.changeCount.bind(this)}></CheckBoxComponent>
                            </td>
                        </tr>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates the swimlane functionalities of Kanban component. Provided options in the property panel
                        to sort
                        the cards, enable drag-and-drop across swimlanes, show or hide the empty row and the items count. Also, you can
                        expand/collapse the swimlane row in the Kanban board.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample renders the assignee field as a swimlane header using the <code>swimlaneSettings</code> property.
                        The property provides the following options to change its related settings:
                    </p>
                    <ul>
                        <li>Sorting the swimlane cards using the <code>swimlaneSettings.sortDirection</code> property</li>
                        <li>Control the drag-and-drop of the cards across swimlane using the
                    <code>swimlaneSettings.allowDragAndDrop</code> property.</li>
                        <li>Show or hide the empty swimlane row using the <code>swimlaneSettings.showEmptyRow</code> property.</li>
                        <li>Show or hide the items count in the swimlane header using the <code>swimlaneSettings.showItemCount</code>
                            property.</li>
                    </ul>
                </div>
            </div>
        );
    }
}