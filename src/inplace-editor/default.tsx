import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { InPlaceEditorComponent } from '@syncfusion/ej2-react-inplace-editor';
import { DropDownListComponent, ChangeEventArgs as dropdownsChange } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './inplace.component.css';

// tslint:disable:max-line-length

export class Default extends SampleBase<{}, {}> {
    private textObj: InPlaceEditorComponent;
    private numericObj: InPlaceEditorComponent;
    private maskObj: InPlaceEditorComponent;
    private editableon: DropDownListComponent
    
    private textModel: object = { placeholder: 'Enter employee name' };

    private popupSettings: object = { title: 'Enter Employee Name' };

    private numericModel: object = { format: 'c2', value: 100, placeholder: 'Currency format' };

    private maskModel: object = { mask: '000-000-0000' };

    // Mapping DropDownList dataSource property
    private dropDownData: { [key: string]: Object }[] = [
        {'value':'inline', 'text': 'Inline'}, {'value':'popup', 'text': 'Popup'}
    ];

    // Mapping DropDownList fields property
    private dropDownFields: object = { text: 'text', value: 'value' };

    // Mapping DropDownList value property
    private dropDownVal: string = 'inline';

    // Mapping DropDownList dataSource property
    private editableData: { [key: string]: Object }[] = [
        {'value':'Click', 'text': 'Click'}, {'value':'DblClick', 'text': 'Double Click'}, {'value':'EditIconClick', 'text': 'Edit Icon Click'}
    ];

    // Mapping DropDownList fields property
    private editableFields: object = { text: 'text', value: 'value' };

    // Mapping DropDownList value property
    private editableVal: string = 'Click';

    // Change event funtion for DropDownList component   
    public changeEditorMode(e: dropdownsChange): void {
        let mode: string = (document.getElementById('editorMode') as HTMLSelectElement).value;
        this.textObj.mode  = this.numericObj.mode =  this.maskObj.mode = mode as any;
        this.textObj.dataBind();
        this.numericObj.dataBind();
        this.maskObj.dataBind();
    }

    rendereComplete () {
        let rightPane: HTMLElement = document.getElementById('right-pane');
        if (rightPane) {
        rightPane.addEventListener( 'scroll', ()=> {
        let mode: string = (document.getElementById('editorMode') as HTMLSelectElement).value;
        if (mode === 'Inline') {
        return;
        }
        if (this.textObj && (this.textObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            this.textObj.enableEditMode = false;
        }
        if (this.numericObj && (this.numericObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            this.numericObj.enableEditMode = false;
        }
        if (this.maskObj && (this.maskObj.element.querySelectorAll('.e-editable-open').length > 0)) {
        this.maskObj.enableEditMode = false;
        }
        });
        }
        }
    // Change event funtion for DropDownList component   
    public onEditableOn(e: dropdownsChange): void {
        let editableValue: string = this.editableon.value as string;
        this.textObj.editableOn = this.numericObj.editableOn =  this.maskObj.editableOn = editableValue as any;
        this.textObj.dataBind();
        this.numericObj.dataBind();
        this.maskObj.dataBind();
    }

    // Change event funtion for CheckBox component
    public onChange(e: ChangeEventArgs): void {
        e.checked ? this.textObj.showButtons = this.numericObj.showButtons = this.maskObj.showButtons = true : this.textObj.showButtons = this.numericObj.showButtons = this.maskObj.showButtons = false;
    }

    // Change event funtion for CheckBox component
    public onChangeEnable(e: ChangeEventArgs): void {
        e.checked ? this.textObj.disabled = this.numericObj.disabled = this.maskObj.disabled = true : this.textObj.disabled = this.numericObj.disabled = this.maskObj.disabled = false;
    }
    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section inplace-control-section default_layout">
                    <div className="control_wrapper">
                        <table>
                            <tr>
                                <td>
                                    <label className="control-label" style={{ 'text-align': 'left ', 'font-size': '14px', 'fontWeight': 400 }}>
                                    TextBox </label>
                                </td>
                                <td>
                                    <InPlaceEditorComponent ref={(text) => { this.textObj = text }} id='inplace_editor' mode='Inline' type='Text' value='Andrew' model={this.textModel} popupSettings={this.popupSettings} >
                                    </InPlaceEditorComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="control-label" style={{ 'text-align': 'left ', 'font-size': '14px', 'fontWeight': 400 }}>
                                    NumericTextBox </label>
                                </td>
                                <td>
                                    <InPlaceEditorComponent ref={(numeric) => { this.numericObj = numeric }} id='numericTextBoxEle' mode='Inline' type='Numeric' value='$100.00' model={this.numericModel}  >
                                    </InPlaceEditorComponent>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className="control-label" style={{ 'text-align': 'left ', 'font-size': '14px', 'fontWeight': 400 }}>
                                    MaskedTextBox </label>
                                </td>
                                <td>
                                    <InPlaceEditorComponent ref={(mask) => { this.maskObj = mask }} id='maskedTextBoxEle' mode='Inline' type='Mask' value='012-345-6789' model={this.maskModel}  >
                                    </InPlaceEditorComponent>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="defaultProperty">
                  <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className="property-panel-table">
                        <tbody>
                            <tr>
                                <td>
                                    <div>Mode</div>
                                </td>
                                <td>
                                    <div>
                                        {/* Render the DropDownList Component */}
                                        <DropDownListComponent  id='editorMode' className='form-control' dataSource={this.dropDownData} fields={this.dropDownFields} 
                                        value={this.dropDownVal} width={'90%'} change={this.changeEditorMode.bind(this)}  />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Editable On</div>
                                </td>
                                <td>
                                    <div>
                                        {/* Render the DropDownList Component */}
                                        <DropDownListComponent ref={(edit) => { this.editableon = edit }}  id='editableon' className='form-control' dataSource={this.editableData} fields={this.editableFields} 
                                        value={this.editableVal} width={'90%'} change={this.onEditableOn.bind(this)}  />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Show Buttons</div>
                                </td>
                                <td>
                                    <div>
                                        {/* Render the CheckBox Component */}
                                        <CheckBoxComponent id='showbuttons' checked={true} labelPosition='Before' change={this.onChange.bind(this) } />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>Disable</div>
                                </td>
                                <td>
                                    <div>
                                        {/* Render the CheckBox Component */}
                                        <CheckBoxComponent id='editorEnable' checked={false} labelPosition='Before' change={this.onChangeEnable.bind(this) } />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                  </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the default functionalities of the In-place Editor control. Click on the dotted input
                        element to
                        switch to the editable state and save or cancel it by clicking the actions buttons.
                    </p>
                </div>
               <div id="description">
                    <p>
                        The <code>In-place Editor</code> component is used to edit values in place and update them to the server.
                    </p>
                    <p>
                        <code>In-place Editor</code> modes can be switched by selecting the appropriate values provided in a drop-down.
                        The applicable editor positions are as follows:
                    </p>
                    <p>
                        <ul>
                            <li>
                                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode">
                                Inline</a>
                            </li>
                            <li>
                                <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/inplace-editor/#mode">
                                Pop-up</a>
                            </li>
                        </ul>
                    </p>
                    <p>
                        The edit on modes of In-place editor can be switched by selecting the appropriate values provided in a
                        drop-down. The applicable modes are as follows:
                        <ul>
                            <li>Click - Editor opens the edit input with single click of textbox.</li>
                            <li>DblClick - Editor opens the edit input with double click of textbox.</li>
                            <li>EditIconClick - Edit mode can be open with the use of edit icon only which is visible on hover of textbox.</li>
                        </ul>
                    </p>
                    <p>
                        The Save and Cancel buttons of the <code>In-place Editor</code> control can be shown or hidden by switching the Show Button check box
                        state. If the
                        action buttons are hidden, then you can save the data by clicking outside the target or by pressing the Enter
                        key.
                        You can cancel the edit request by pressing the Esc key.
                    </p>
                    <p>
                        More information on the <code>In-place Editor</code> instantiation can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/">
                        documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}