import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective, ConstraintType } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent, FormValidator } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './wip-validation.css';
import { PropertyPane } from '../common/property-pane';

/**
 * Kanban WIP Validation sample
 */

export class WIPValidation extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    public formObject: FormValidator;
    private kanbanObj: KanbanComponent;
    private dropObj: DropDownListComponent;
    private minimum: NumericTextBoxComponent;
    private maximum: NumericTextBoxComponent;
    private dialogInstance: DialogComponent;
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
    private columnType: { [key: string]: Object }[] = [
        { 'value': 'Column', 'text': 'Column' }, { 'value': 'Descending', 'text': 'Swimlane' }
    ];
    private statusData: { [key: string]: Object }[] = [
        { Id: 0, text: 'To Do' },
        { Id: 1, text: 'In Progress' },
        { Id: 2, text: 'Done' }
    ];
    private value: string = 'Column';
    private fields: object = { text: 'text', value: 'Id' };
    public rendereComplete(): void {
        // initialize the form validator
        this.formObject = new FormValidator('#column');
        document.getElementById('column').addEventListener('submit', (e: Event) => e.preventDefault());
    }
    private changeContraintType(args: DropDownChangeArgs): void {
        this.kanbanObj.constraintType = args.value as ConstraintType;
    }
    private changeColumns(args: DropDownChangeArgs): void {
        let changeIndex: number = args.value as number;
        if (changeIndex !== null) {
            this.minimum.value = this.kanbanObj.columns[changeIndex].minCount;
            this.maximum.value = this.kanbanObj.columns[changeIndex].maxCount;
        }
    }
    private onFormValidate(): void {
        let colindex = this.dropObj.index;
        let colText = this.dropObj.text;
        let colmin = this.minimum.value;
        let colmax = this.maximum.value;
        if (colText === null) {
            this.dialogInstance.content = 'Select column Header Text';
            this.dialogInstance.show();
        } else if (colText !== null && this.minimum.value === null && this.maximum.value === null) {
            this.dialogInstance.content = 'Enter column min-count or max-count';
            this.dialogInstance.show();
        } else {
            this.kanbanObj.columns[colindex].headerText = colText;
            if (this.minimum.value !== null) {
                this.kanbanObj.columns[colindex].minCount = colmin;
            }
            if (this.maximum.value !== null) {
                this.kanbanObj.columns[colindex].maxCount = colmax;
            }
            this.formObject.reset();
        }
    }

    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" keyField="Status" dataSource={this.data} ref={(kanban) => { this.kanbanObj = kanban }}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }} swimlaneSettings={{ keyField: "Assignee" }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" allowToggle={true} showItemCount={true} minCount={6} maxCount={8} />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" allowToggle={true} showItemCount={true} minCount={2} />
                                <ColumnDirective headerText="Done" keyField="Close" allowToggle={true} showItemCount={true} maxCount={4} />
                            </ColumnsDirective>
                        </KanbanComponent>
                        <DialogComponent id="dialog" ref={dialog => this.dialogInstance = dialog} showCloseIcon={true} isModal={true} visible={false} width={'350px'} header='Validation' buttons={this.buttons}>
                        </DialogComponent>
                    </div>
                </div>
                <div className="col-lg-3 property-section property-customization">
                    <PropertyPane title="Constraint">
                        <table className="e-constraint-table">
                            <tbody>
                            <tr>
                                <td className="e-constraint-label">
                                    <div>Type</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='type' dataSource={this.columnType} change={this.changeContraintType.bind(this)} value={this.value}>
                                        </DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="property-panel-header" style={{ width: '100%', padding: '22px 0 0 0' }}>Validate Constraints</p>
                        <div className="property-panel-content">
                            <form id="column">
                                <table className="e-constraint-table">
                                    <tbody>
                                    <tr>
                                        <td className="e-constraint-label">
                                            <div>Columns</div>
                                        </td>
                                        <td><DropDownListComponent id='key' ref={(kanban) => { this.dropObj = kanban; }} dataSource={this.statusData} change={this.changeColumns.bind(this)}
                                            fields={this.fields} placeholder='Header Text '></DropDownListComponent></td>
                                    </tr>
                                    <tr>
                                        <td className="e-constraint-label">
                                            <div>MinCount</div>
                                        </td>
                                        <td><NumericTextBoxComponent ref={(kanban) => { this.minimum = kanban; }} id="minIndex" format='###.##' min={0} placeholder="Minimum Count" ></NumericTextBoxComponent></td>
                                    </tr>
                                    <tr>
                                        <td className="e-constraint-label">
                                            <div>MaxCount</div>
                                        </td>
                                        <td><NumericTextBoxComponent ref={(kanban) => { this.maximum = kanban; }} id="maxIndex" format='###.##' min={0} placeholder="Maximum Count"></NumericTextBoxComponent></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="e-validate">
                                    <ButtonComponent id='validate' className="e-btn" onClick={this.onFormValidate.bind(this)} >Validate</ButtonComponent>
                                </div>
                            </form>
                        </div>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how to limit the minimum and maximum number of cards to each column of the Kanban component.
                    Configured the options in the property panel to change the constraint type and related attributes.</p>
                </div>
                <div id="description">
                    <p>This sample validates the number of cards in the particular column or swimlane using the <code>constraintType</code> property.
                       This property contains two types:</p>
                    <ul>
                        <li>Column: Validates the number of cards based on the particular column.
                            By default, column validation is applied to Kanban board.</li>
                        <li>Swimlane: Validation applies based on number of cards in a particular column cell and swimlane.</li>
                    </ul>
                    <p>This sample contains the following properties: </p>
                    <ul>
                        <li>Columns: You can choose a column and set maximum and minimum limit to the selected column.</li>
                        <li>minCount: Minimum limit of cards required for each column.
                            If the cards count do not reach the minimum limit, it will indicate the validation failed state.</li>
                        <li>maxCount: Maximum limit of cards per column. If the cards count exceeds the maximum limit, it will indicate the validation failed state.</li>
                    </ul>
                </div>
            </div>
        );
    }
}