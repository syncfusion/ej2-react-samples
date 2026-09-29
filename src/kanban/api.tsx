import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent, FormValidator, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './api.css';
import { PropertyPane } from '../common/property-pane';

/**
 * Kanban API sample
 */
export class API extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    private kanbanObj: KanbanComponent;
    public addFormObj: FormValidator;
    public deleteFormObj: FormValidator;
    private header: TextBoxComponent;
    private dropObj: DropDownListComponent;
    private addIndex: NumericTextBoxComponent;
    private deleteIndex: NumericTextBoxComponent;
    private dialogInstance: DialogComponent;
    private statusData: { [key: string]: Object }[] = [{ Id: 0, text: 'Testing' }, { Id: 1, text: 'Review' }, { Id: 2, text: 'Validate' }];
    private dlgButtonClick(): void {
        this.dialogInstance.hide();
    }
    private buttons: ButtonPropsModel[] = [{
        click: this.dlgButtonClick.bind(this),
        buttonModel: {
            content: 'OK',
            isPrimary: true
        }
    }];
    public rendereComplete(): void {
        // initialize the form validator
        this.addFormObj = new FormValidator('#addForm');
        this.deleteFormObj = new FormValidator('#deleteForm');
        document.getElementById('addForm').addEventListener('submit', (e: Event) => e.preventDefault());
        document.getElementById('deleteForm').addEventListener('submit', (e: Event) => e.preventDefault());
    }
    private onAdd(): void {
        let text: string = this.header.value;
        let key: string = this.dropObj.text;
        let index: number = this.addIndex.value;
        if (this.kanbanObj.columns.length >= index && key && key.length > 0 && text && text.length > 0 && index !== null) {
            this.kanbanObj.addColumn({ keyField: key, headerText: text, showItemCount: true }, index);
            this.addIndex.max = this.kanbanObj.columns.length;
            this.deleteIndex.max = this.kanbanObj.columns.length - 1;
            this.addFormObj.reset();
            this.addIndex.value = null;
        } else if (!(text && text.length > 0)) {
            this.dialogInstance.content = 'Enter Column Header Text';
            this.dialogInstance.show();
        } else if (!(key && key.length > 0)) {
            this.dialogInstance.content = 'Enter Column Key Field';
            this.dialogInstance.show();
        } else if (!index) {
            this.dialogInstance.content = 'Enter Column Index';
            this.dialogInstance.show();
        }
    }
    private onDelete(): void {
        let index: number = this.deleteIndex.value;
        if (this.kanbanObj.columns.length > 1) {
            if (this.kanbanObj.columns.length >= (index + 1) && index !== null) {
                this.kanbanObj.deleteColumn(index);
                this.addIndex.max = this.kanbanObj.columns.length;
                this.deleteIndex.max = this.kanbanObj.columns.length - 1;
                this.deleteFormObj.reset();
                this.deleteIndex.value = null;
            } else {
                this.dialogInstance.content = 'Enter Column Index';
                this.dialogInstance.show();
            }
        } else {
            this.dialogInstance.content = 'Atleast one column must be displayed in kanban';
            this.dialogInstance.show();
        }
    }

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" keyField="Status" cssClass="kanban-api" dataSource={this.data} ref={(kanban) => { this.kanbanObj = kanban }}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                <ColumnDirective headerText="Done" keyField="Close" />
                            </ColumnsDirective>
                        </KanbanComponent>
                        <DialogComponent id="dialog" ref={dialog => this.dialogInstance = dialog} showCloseIcon={true} isModal={true} visible={false} width={'350px'} header='Validation' buttons={this.buttons}>
                        </DialogComponent>
                    </div>
                </div>
                <div className="col-lg-3 property-section property-customization" id="apiKanbanProperty">
                    <PropertyPane title="Add Column">
                        <form id="addForm">
                            <table>
                                <tbody>
                                <tr>
                                    <td><TextBoxComponent ref={(kanban) => { this.header = kanban; }} id="text" className="e-input" type="text" placeholder="Text Field"></TextBoxComponent></td>
                                </tr>
                                <tr>
                                    <td><DropDownListComponent id='key' ref={(kanban) => { this.dropObj = kanban; }} dataSource={this.statusData} placeholder='Key Field'>
                                    </DropDownListComponent></td>
                                </tr>
                                <tr>
                                    <td><NumericTextBoxComponent ref={(kanban) => { this.addIndex = kanban; }} id="index" format='###.##' min={0} value={0} max={3} placeholder="Index">
                                    </NumericTextBoxComponent></td>
                                </tr>
                                <tr>
                                    <td className='e-check'><ButtonComponent id='add' type='button' className="e-btn" onClick={this.onAdd.bind(this)}>Add</ButtonComponent></td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                        <p className="property-panel-header" style={{ width: '100%', padding: '22px 0 0 0' }}>Delete Column</p>
                        <div className="property-panel-content">
                            <form id="deleteForm">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <NumericTextBoxComponent ref={(kanban) => { this.deleteIndex = kanban; }} id="deteteIndex" format='###.##' min={0} value={0} max={2} placeholder="Index">
                                                </NumericTextBoxComponent>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='e-check'>
                                                <ButtonComponent id='delete' type='button' className="e-btn" onClick={this.onDelete.bind(this)}>Delete</ButtonComponent></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates dynamic column management in the Kanban component.
                        Users can add new columns or remove existing ones at runtime through the provided property panel, allowing the board structure to be customized without reloading the page.
                    </p>
                </div>
                <div id="description">
                <p>
                    This sample demonstrates how to dynamically add and remove columns in the Kanban component using the available public methods.
                </p>
                <ul>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#addcolumn" target="_blank">addColumn</a>: Adds a new column to the Kanban board at the specified position. In this sample, the column is configured using <code>keyField</code>, <code>headerText</code>, and <code>showItemCount</code> properties.
                    </li>
                    <li>
                    <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#deletecolumn" target="_blank">deleteColumn</a>: Removes an existing column from the Kanban board based on the specified column index. 
                    </li>
                </ul>
                    <p>
                        More information on the Essential<sup>®</sup> JS2 Kanban board can be found in this <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/index-default#addcolumn" target="_blank">add column</a> documentation section.
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