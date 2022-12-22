import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs, DropDownListModel, AutoCompleteModel, ComboBoxModel, MultiSelectModel, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { InPlaceEditorComponent, Inject, AutoComplete, MultiSelect, ComboBox, RenderMode } from '@syncfusion/ej2-react-inplace-editor';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import './dropdowns.component.css';
import { PopupSettingsModel } from '@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model';

// tslint:disable:max-line-length

function DropDowns () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let editObj: InPlaceEditorComponent;
    let multiObj: InPlaceEditorComponent;
    let comboObbj: InPlaceEditorComponent;
    let dropObj: InPlaceEditorComponent;
    let editorMode: DropDownListComponent

    let popupSettings: PopupSettingsModel = { model: { width: 'auto' } };

    let multiValue: string[] = ['Canada', 'Bermuda'];

    // define the array of string
    let dropDownData: string[] = ['Australia', 'Bermuda', 'Canada', 'Cameroon', 'Denmark', 'Finland', 'Greenland', 'Poland'];

    let dropDownModel: DropDownListModel = { dataSource: dropDownData, placeholder: 'Find a country' };

    let autoCompleteModel: AutoCompleteModel = { dataSource: dropDownData, placeholder: ' Type to search country' };

    let comboBoxModel: ComboBoxModel = { dataSource: dropDownData, placeholder: 'Find a country' };

    let multiSelectModel: MultiSelectModel = { dataSource: dropDownData, placeholder: 'Choose the countries', mode: 'Box', width: 150 };

    // Mapping DropDownList dataSource property
    let editorData: { [key: string]: Object }[] = [
        { 'value': 'Inline', 'text': 'Inline' }, { 'value': 'Popup', 'text': 'Popup' }
    ];

    // Mapping DropDownList fields property
    let dropDownFields: FieldSettingsModel = { text: 'text', value: 'value' };

    // Mapping DropDownList value property
    let dropDownVal: string = 'Inline';

    // Change event funtion for DropDownList component   
    function changeEditorMode(e: DropDownChangeArgs): void {
        let mode: string = editorMode.value as string;
        editObj.mode = mode as RenderMode;
        multiObj.mode = mode as RenderMode;
        comboObbj.mode = mode as RenderMode;
        dropObj.mode = mode as RenderMode;
        editObj.dataBind();
        multiObj.dataBind();
        comboObbj.dataBind();
        dropObj.dataBind();
    }
    function rendereComplete(): void {
        let rightPane: HTMLElement = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.addEventListener('scroll', scrollRightPane);
        }
    }
    function componentWillUnmount() {
        let rightPane: HTMLElement = document.getElementById('right-pane');
        if (rightPane) {
            rightPane.removeEventListener('scroll', scrollRightPane);
        }
    }
    function scrollRightPane (): void {
        let mode: HTMLSelectElement =  (document.getElementById('editorMode') as HTMLSelectElement);
        if (mode && mode.value === 'Inline') {
            return;
        }
        if (editObj && (editObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            editObj.enableEditMode = false;
        }
        if (multiObj && (multiObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            multiObj.enableEditMode = false;
        }
        if (dropObj && (dropObj.element.querySelectorAll('.e-editable-open').length > 0)) {
            dropObj.enableEditMode = false;
        }
        if (comboObbj && (comboObbj.element.querySelectorAll('.e-editable-open').length > 0)) {
            comboObbj.enableEditMode = false;
        }
    }

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
                                        <InPlaceEditorComponent ref={(drop) => { dropObj = drop }} id='dropdownEle' mode='Inline' type='DropDownList' value='Canada' model={dropDownModel} >
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label">
                                            AutoComplete </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(edit) => { editObj = edit }} id='autoCompleteEle' mode='Inline' type='AutoComplete' value='Australia' model={autoCompleteModel} >
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
                                        <InPlaceEditorComponent ref={(combo) => { comboObbj = combo }} id='comboBoxEle' mode='Inline' type='ComboBox' value='Finland' model={comboBoxModel} >
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
                                        <InPlaceEditorComponent ref={(multi) => { multiObj = multi }} id='multiSelectEle' mode='Inline' type='MultiSelect' value={multiValue} model={multiSelectModel} popupSettings={popupSettings}>
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
                                            <DropDownListComponent ref={(drop) => { editorMode = drop }} id='editorMode' className='form-control' dataSource={editorData} fields={dropDownFields}
                                                value={dropDownVal} width={'90%'} change={changeEditorMode.bind(this)} />
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
export default DropDowns;