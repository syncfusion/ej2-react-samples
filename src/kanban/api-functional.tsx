import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent, FormValidator, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import * as dataSource from './datasource.json';
import './api.css';


/**
 * Kanban API sample
 */
function API(){
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, [])
    let data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    let kanbanObj: KanbanComponent;
    let addFormObj: FormValidator;
    let deleteFormObj: FormValidator;
    let header: TextBoxComponent;
    let dropObj: DropDownListComponent;
    let addIndex: NumericTextBoxComponent;
    let deleteIndex: NumericTextBoxComponent;
    let dialogInstance: DialogComponent;
    const statusData: { [key: string]: Object }[] = [{ Id: 0, text: 'Testing' }, { Id: 1, text: 'Review' }, { Id: 2, text: 'Validate' }];
    function dlgButtonClick(): void {
        dialogInstance.hide();
    }
    const buttons: ButtonPropsModel[] = [{
        click: dlgButtonClick.bind(this),
        buttonModel: {
            content: 'OK',
            isPrimary: true
        }
    }];
    function rendereComplete(): void {
        // initialize the form validator
        addFormObj = new FormValidator('#addForm');
        deleteFormObj = new FormValidator('#deleteForm');
        document.getElementById('addForm').addEventListener('submit', (e: Event) => e.preventDefault());
        document.getElementById('deleteForm').addEventListener('submit', (e: Event) => e.preventDefault());
    }
    function onAdd(): void {
        let text: string = header.value;
        let key: string = dropObj.text;
        let index: number = addIndex.value;
        if (kanbanObj.columns.length >= index && key && key.length > 0 && text && text.length > 0 && index !== null) {
            kanbanObj.addColumn({ keyField: key, headerText: text, showItemCount: true }, index);
            addIndex.max = kanbanObj.columns.length;
            deleteIndex.max = kanbanObj.columns.length - 1;
            addFormObj.reset();
            addIndex.value = null;
        } else if (!(text && text.length > 0)) {
            dialogInstance.content = 'Enter Column Header Text';
            dialogInstance.show();
        } else if (!(key && key.length > 0)) {
            dialogInstance.content = 'Enter Column Key Field';
            dialogInstance.show();
        } else if (!index) {
            dialogInstance.content = 'Enter Column Index';
            dialogInstance.show();
        }
    }
    function onDelete(): void {
        let index: number = deleteIndex.value;
        if (kanbanObj.columns.length > 1) {
            if (kanbanObj.columns.length >= (index + 1) && index !== null) {
                kanbanObj.deleteColumn(index);
                addIndex.max = kanbanObj.columns.length;
                deleteIndex.max = kanbanObj.columns.length - 1;
                deleteFormObj.reset();
                deleteIndex.value = null;
            } else {
                dialogInstance.content = 'Enter Column Index';
                dialogInstance.show();
            }
        } else {
            dialogInstance.content = 'Atleast one column must be displayed in kanban';
            dialogInstance.show();
        }
    }

    return (
        <div className='kanban-control-section'>
            <div className='col-lg-9 control-section'>
                <div className='control-wrapper'>
                    <KanbanComponent id="kanban" keyField="Status" cssClass="kanban-api" dataSource={data} ref={(kanban) => { kanbanObj = kanban }}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" />
                            <ColumnDirective headerText="In Progress" keyField="InProgress" />
                            <ColumnDirective headerText="Done" keyField="Close" />
                        </ColumnsDirective>
                    </KanbanComponent>
                    <DialogComponent id="dialog" ref={dialog => dialogInstance = dialog} showCloseIcon={true} isModal={true} visible={false} width={'350px'} header='Validation' buttons={buttons}>
                    </DialogComponent>
                </div>
            </div>
            <div className="col-lg-3 property-section property-customization">
                <div className="property-panel-section">
                    <p className="property-panel-header header-customization">Add Column</p>
                    <div className="property-panel-content">
                        <form id="addForm">
                            <table>
                                <tr>
                                    <td><TextBoxComponent ref={(kanban) => { header = kanban; }} id="text" className="e-input" type="text" placeholder="Text Field"></TextBoxComponent></td>
                                </tr>
                                <tr>
                                    <td><DropDownListComponent id='key' ref={(kanban) => { dropObj = kanban; }} dataSource={statusData} placeholder='Key Field'>
                                    </DropDownListComponent></td>
                                </tr>
                                <tr>
                                    <td><NumericTextBoxComponent ref={(kanban) => { addIndex = kanban; }} id="index" format='###.##' min={0} value={0} max={3} placeholder="Index">
                                    </NumericTextBoxComponent></td>
                                </tr>
                                <tr>
                                    <td className='e-check'><ButtonComponent id='add' type='button' className="e-btn" onClick={onAdd.bind(this)}>Add</ButtonComponent></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <p className="property-panel-header">Delete Column</p>
                    <div className="property-panel-content">
                        <form id="deleteForm">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <NumericTextBoxComponent ref={(kanban) => { deleteIndex = kanban; }} id="deteteIndex" format='###.##' min={0} value={0} max={2} placeholder="Index">
                                            </NumericTextBoxComponent>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='e-check'>
                                            <ButtonComponent id='delete' type='button' className="e-btn" onClick={onDelete.bind(this)}>Delete</ButtonComponent></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the important APIs required to manipulate the Kanban component. Provides necessary
                    details in the
                    property panel to add and remove the columns dynamically.
                </p>
            </div>
            <div id="description">
                <p>
                    The demo explains how to add or remove columns programmatically.
                </p>
                <ul>
                    <li><code>addColumn:</code> The public method used to add a column to the Kanban board dynamically.</li>
                    <li><code>deleteColumn:</code> The public method used to remove the existing column from the Kanban board based
                    on an index.</li>
                </ul>
            </div>
        </div>
    );
}
export default API;
