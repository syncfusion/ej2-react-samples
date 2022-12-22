/**
 * Sample allows user to apply their own mask and prompt character for MaskedTextBox.
 * User can edit the MaskedTextBox with the applied mask, prompt character and get corresponding raw and masked values.
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { MaskedTextBoxComponent, Input, MaskChangeEventArgs } from '@syncfusion/ej2-react-inputs';
 import { PropertyPane } from '../common/property-pane';
 import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
 import { updateSampleSection } from '../common/sample-base';
 import './sample.css';
 
function Formats() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let listObj: DropDownListComponent;
    // Prompt character options
    const promptData: { [key: string]: Object }[] = [
        { prompt: '_' },
        { prompt: '#' },
        { prompt: '@' },
        { prompt: '*' }, 
    ];
    const ddlFields: object = { text: 'prompt', value: 'prompt' };
    // Bind event on Dropdown List change
    function onDdlChange(args: ChangeEventArgs): void {
        // 'promptChar' on the Masked Textbox has been updated
        maskInstance.setProperties({ promptChar: listObj.value });
        // Masked and un-masked values will be updated
        (document.getElementById('val1') as HTMLElement).innerHTML = maskInstance.value;
        (document.getElementById('val2') as HTMLElement).innerHTML = maskInstance.getMaskedValue();
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className=' col-lg-8'>
                    <div className="content-wrapper sample-mask">
                        <div className="control-label">Formats</div>
                        <MaskedTextBoxComponent mask='(999)-999-9999' floatLabelType='Never' created={onCreated.bind(this)} change={maskChange} ref={mask => maskInstance = mask}></MaskedTextBoxComponent>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="input-mask">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                      <div>Mask</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '0px' }}>
                                      <div style={{ maxWidth: '200px' }}>
                                        <input id="input1" type="text" className='e-input' onKeyUp={sampleKeyUp.bind(this)} />
                                      </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                      <div>Prompt Character</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '0px' }}>
                                      <div style={{ maxWidth: '200px' }}>
                                        <DropDownListComponent id="ddlelement" dataSource={promptData} ref={(dropdownlist) => { listObj = dropdownlist }} fields={ddlFields} value='_' change={onDdlChange.bind(this)} popupHeight="220px" />
                                      </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                      <div>Value</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '0px' }}>
                                      <div id="val1"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%', paddingTop: '5px', paddingBottom: '10px' }}>
                                      <div>Masked Value</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '0px', paddingTop: '5px', paddingBottom: '10px' }}>
                                      <div id="val2"></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                This sample demonstrates that the different formats can be applied to MaskedTextBox component.
                You can customize the mask and prompt character values in the property panel.
                </p>
            </div>
            <div id="description">
                <p>Here, the "Value" and "Masked Value" labels from the properties panel returns the raw value (unmasked value) and masked value of the MaskedTextBox component.
                You can also get these raw value and masked value anytime through
                the <b><a href="https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#value" target="_blank">value</a></b> property
                and <b><a href="https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#getmaskedvalue" target="_blank">getMaskedValue</a></b> method.
                </p>
            </div>
        </div>
    )
}
let maskInstance: MaskedTextBoxComponent;
let curValue: string;
function onCreated(): void {
    (document.getElementById('input1') as HTMLInputElement).value = maskInstance.mask;
    (document.getElementById('val2') as HTMLElement).innerHTML = maskInstance.getMaskedValue();
}
function maskChange(args: MaskChangeEventArgs): void {
    (document.getElementById('val1') as HTMLElement).innerHTML = args.value;
    (document.getElementById('val2') as HTMLElement).innerHTML = args.maskedValue;
}

function sampleKeyUp(): void {
    let ele1: HTMLInputElement = (document.getElementById('input1') as HTMLInputElement);
    let start: number = ele1.selectionStart;
    let end: number = ele1.selectionEnd;
    maskInstance.setProperties({ mask: (document.getElementById('input1') as HTMLInputElement).value });
    (document.getElementById('val1') as HTMLElement).innerHTML = maskInstance.value;
    (document.getElementById('val2') as HTMLElement).innerHTML = maskInstance.getMaskedValue();
    ele1.setSelectionRange(start, end);
}
 export default Formats;