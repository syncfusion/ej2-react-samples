import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs, DropDownListModel, AutoCompleteModel, ComboBoxModel, MultiSelectModel, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { InPlaceEditorComponent, Inject, AutoComplete, MultiSelect, ComboBox, RenderMode } from '@syncfusion/ej2-react-inplace-editor';
import { SampleBase } from '../common/sample-base';
import './dropdowns.component.css';
import { PopupSettingsModel } from '@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model';

// tslint:disable:max-line-length

export class DropDowns extends SampleBase<{}, {}> {

    private editObj: InPlaceEditorComponent;
    private multiObj: InPlaceEditorComponent;
    private comboObbj: InPlaceEditorComponent;
    private dropObj: InPlaceEditorComponent;
    private editorMode: DropDownListComponent

    private popupSettings: PopupSettingsModel = { model: { width: 'auto' } };

    private multiValue: string[] = ['Canada', 'Bermuda'];

    // define the array of string
    private dropDownData: string[] = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];

    private dropDownModel: DropDownListModel = { dataSource: this.dropDownData, placeholder: 'Find a country' };

    private autoCompleteModel: AutoCompleteModel = { dataSource: this.dropDownData, placeholder: ' Type to search country' };

    private comboBoxModel: ComboBoxModel = { dataSource: this.dropDownData, placeholder: 'Find a country' };

    private multiSelectModel: MultiSelectModel = { dataSource: this.dropDownData, placeholder: 'Choose the countries', mode: 'Box', width: 150 };

    // Mapping DropDownList dataSource property
    private editorData: { [key: string]: Object }[] = [
        { 'value': 'inline', 'text': 'Inline' }, { 'value': 'popup', 'text': 'Popup' }
    ];

    // Mapping DropDownList fields property
    private dropDownFields: FieldSettingsModel = { text: 'text', value: 'value' };

    // Mapping DropDownList value property
    private dropDownVal: string = 'inline';

    // Change event funtion for DropDownList component   
    public changeEditorMode(e: DropDownChangeArgs): void {
        let mode: string = this.editorMode.value as string;
        this.editObj.mode = mode as RenderMode;
        this.multiObj.mode = mode as RenderMode;
        this.comboObbj.mode = mode as RenderMode;
        this.dropObj.mode = mode as RenderMode;
        this.editObj.dataBind();
        this.multiObj.dataBind();
        this.comboObbj.dataBind();
        this.dropObj.dataBind();
    }
    rendereComplete(): void {
        let rightPane: HTMLElement = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', () => {
                this.scrollRightPane();
            });
        }
    }
    componentWillUnmount() {
        let rightPane: HTMLElement = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', () => {
                this.scrollRightPane();
            });
        }
    }
    private scrollRightPane = () => {

        let mode: string =  (document.getElementById('editorMode') as HTMLSelectElement).value;
        if (mode === 'Inline') {
            return;
        }
        if (this.editObj && (this.editObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            this.editObj.enableEditMode = false;
        }
        if (this.multiObj && (this.multiObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            this.multiObj.enableEditMode = false;
        }
        if (this.dropObj && (this.dropObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            this.dropObj.enableEditMode = false;
        }
        if (this.comboObbj && (this.comboObbj.element.querySelectorAll('.e-editable-open').length > 0)) {
            this.comboObbj.enableEditMode = false;
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section inplace-control-section drop-down-layout">
                    <div className="control_wrapper">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label className="control-label">
                                            DropDownList </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(drop) => { this.dropObj = drop }} id='dropdownEle' mode='Inline' type='DropDownList' value='Canada' model={this.dropDownModel} >
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label">
                                            AutoComplete </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(edit) => { this.editObj = edit }} id='autoCompleteEle' mode='Inline' type='AutoComplete' value='Australia' model={this.autoCompleteModel} >
                                            <Inject services={[AutoComplete]} />
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label">
                                            ComboBox </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(combo) => { this.comboObbj = combo }} id='comboBoxEle' mode='Inline' type='ComboBox' value='Finland' model={this.comboBoxModel} >
                                            <Inject services={[ComboBox]} />
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label">
                                            MultiSelect </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(multi) => { this.multiObj = multi }} id='multiSelectEle' mode='Inline' type='MultiSelect' value={this.multiValue} model={this.multiSelectModel} popupSettings={this.popupSettings}>
                                            <Inject services={[MultiSelect]} />
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="dropdownProperty">
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
                                            <DropDownListComponent ref={(drop) => { this.editorMode = drop }} id='editorMode' className='form-control' dataSource={this.editorData} fields={this.dropDownFields}
                                                value={this.dropDownVal} width={'90%'} change={this.changeEditorMode.bind(this)} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the usage of drop-down components such as AutoComplete, ComboBox, DropDownList, and MultiSelect. Click on the dotted input element to switch to the
                        editable state of the corresponding integrated component.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample illustrates the way to integrate drop-down components with <code>In-place Editor</code>. The
                        applicable types of components are:
                    </p>
                    <p>
                        <ul>
                            <li>
                                <code>DropDownList</code>
                            </li>
                            <li>
                                <code>AutoComplete</code>
                            </li>
                            <li>
                                <code>ComboBox</code>
                            </li>
                            <li>
                                <code>MultiSelect</code>
                            </li>
                        </ul>
                    </p>
                    <p>
                        The above components and their features are editable in place and can be customized with the model
                        properties of the specific component.
                    </p>
                    <p>
                        More information on the <code>In-place Editor</code> instantiation can be found in the <a target="_blank"
                            href="https://ej2.syncfusion.com/react/documentation/inplace-editor/getting-started/">
                            documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}