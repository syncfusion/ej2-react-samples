import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent, ChangeEventArgs as DropDownChangeArgs } from '@syncfusion/ej2-react-dropdowns';
import { InPlaceEditorComponent, Inject, ColorPicker, Slider } from '@syncfusion/ej2-react-inplace-editor';
import { SampleBase } from '../common/sample-base';
import './inputs.component.css';

// tslint:disable:max-line-length

export class Inputs extends SampleBase<{}, {}> {

    private numericObj: InPlaceEditorComponent;
    private maskedObj: InPlaceEditorComponent;
    private colorPickerObj: InPlaceEditorComponent;
    private sliderObj: InPlaceEditorComponent;

    private popupSettings: object = { width: 200 };

    private numericTextBoxModel: object = { format: 'c2', value: 100, placeholder: 'Currency format' };

    private maskedTextBoxModel: object = { mask: '000-000-0000' };

    private sliderModel: object = {
        min: 100,
        max: 1000,
        value: 200,
        cssClass: 'e-slide-custom',
        step: 100,
        width: 150,
        ticks: { placement: 'Before', largeStep: 200, smallStep: 100, showSmallTicks: true  },
    };

    // Mapping DropDownList dataSource property
    private editorData: { [key: string]: Object }[] = [
        {'value':'inline', 'text': 'Inline'}, {'value':'popup', 'text': 'Popup'}
    ];
    
    // Mapping DropDownList fields property
    private dropDownFields: object = { text: 'text', value: 'value' };
    
    // Mapping DropDownList value property
    private dropDownVal: string = 'inline';
    
    // Change event funtion for DropDownList component   
    public changeEditorMode(e: DropDownChangeArgs): void {
        let mode: string = (document.getElementById('editorMode') as HTMLSelectElement).value;
        this.numericObj.mode = mode as any;
        this.maskedObj.mode = mode as any;
        this.colorPickerObj.mode = mode as any;
        this.sliderObj.mode = mode as any;
        this.numericObj.dataBind();
        this.maskedObj.dataBind();
        this.colorPickerObj.dataBind();
        this.sliderObj.dataBind();
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section inplace-control-section input-layout">
                    <div className="control_wrapper">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ 'text-align': 'left ', 'font-size': '14px', 'font-weight': '400' }}>
                                        NumericTextBox </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(numeric) => { this.numericObj = numeric }} id='numericTextBoxEle' mode='Inline' type='Numeric' value='$100.00' model={this.numericTextBoxModel} >
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ 'text-align': 'left ', 'font-size': '14px', 'font-weight': '400' }}>
                                        MaskedTextBox </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(masked) => { this.maskedObj = masked }} id='maskedTextBoxEle' mode='Inline' type='Mask' value='012-345-6789' model={this.maskedTextBoxModel} >
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ 'text-align': 'left ', 'font-size': '14px', 'font-weight': '400' }}>
                                        ColorPicker </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(colorPicker) => { this.colorPickerObj = colorPicker }} id='colorPickerEle' mode='Inline' type='Color' value='#008000ff' actionOnBlur='Submit' >
                                        <Inject services={[ColorPicker]} />
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="control-label" style={{ 'text-align': 'left ', 'font-size': '14px', 'font-weight': '400' }}>
                                        Slider </label>
                                    </td>
                                    <td>
                                        <InPlaceEditorComponent ref={(slider) => { this.sliderObj = slider }} id='sliderEle' mode='Inline' type='Slider' value='200' model={this.sliderModel} popupSettings={this.popupSettings} >
                                        <Inject services={[Slider]} />
                                        </InPlaceEditorComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="inputProperty">
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
                                        <DropDownListComponent id='editorMode' className='form-control' dataSource={this.editorData} fields={this.dropDownFields} 
                                        value={this.dropDownVal} width={'90%'} change={this.changeEditorMode.bind(this)}  />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                  </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the usage of input controls such as Numeric, MaskEdit, ColorPicker, and Slider. Click on the dotted input element to switch to the
                        editable state of the corresponding integrated component.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample illustrates the way to integrate input components with the <code>In-place Editor</code> control. The
                        applicable types of components are:
                    </p>
                    <p>
                        <ul>
                            <li>
                                <code>Numeric</code>
                            </li>
                            <li>
                                <code>MaskEdit</code>
                            </li>
                            <li>
                                <code>ColorPicker</code>
                            </li>
                            <li>
                                <code>Slider</code>
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