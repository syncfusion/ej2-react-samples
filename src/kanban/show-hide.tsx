import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';


/**
 * Kanban Show / Hide Columns sample
 */
export class ShowHideColumns extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    private kanbanObj: KanbanComponent;
    private checkObj: CheckBoxComponent;
    private progressObj: CheckBoxComponent;
    private reviewObj: CheckBoxComponent;
    private closeObj: CheckBoxComponent;

    private onChange(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.checkObj.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.checkObj.element.getAttribute('data-id'));
        }
    }
    private onChangeProgress(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.progressObj.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.progressObj.element.getAttribute('data-id'));
        }
    }
    private onChangeReview(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.reviewObj.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.reviewObj.element.getAttribute('data-id'));
        }
    }
    private onChangeClose(args: ChangeEventArgs): void {
        if (args.checked) {
            this.kanbanObj.showColumn(this.closeObj.element.getAttribute('data-id'));
        } else {
            this.kanbanObj.hideColumn(this.closeObj.element.getAttribute('data-id'));
        }
    }

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" keyField="Status" dataSource={this.data} ref={(kanban) => { this.kanbanObj = kanban }}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                <ColumnDirective headerText="In Review" keyField="Review" />
                                <ColumnDirective headerText="Done" keyField="Close" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Show / Hide Columns'>
                    <table id='property' title='Show / Hide Columns' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <CheckBoxComponent ref={(kanban) => { this.checkObj = kanban; }} data-id='Open' checked={true} label='To Do'
                                        change={this.onChange.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <CheckBoxComponent ref={(kanban) => { this.progressObj = kanban; }} data-id='InProgress' checked={true} label='In Progress'
                                        change={this.onChangeProgress.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                        <CheckBoxComponent ref={(kanban) => { this.reviewObj = kanban; }} data-id='Review' checked={true} label='In Review'
                                        change={this.onChangeReview.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '100%' }}>
                                    <CheckBoxComponent ref={(kanban) => { this.closeObj = kanban; }} data-id='Close' checked={true} label='Done'
                                        change={this.onChangeClose.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </PropertyPane>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates how to control the visibility of Kanban columns dynamically. Check or uncheck the
                        checkboxes
                        from the property panel to show or hide the corresponding column.
          </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban provides an option to show or hide its columns dynamically using the following public methods.
          </p>
                    <ul>
                        <li><code>showColumn:</code> Makes the corresponding column visible based on the specified ID.</li>
                        <li><code>hideColumn:</code> Hides the corresponding column based on the specified column ID.</li>
                    </ul>
                </div>
            </div>
        );
    }
}
