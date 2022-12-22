import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent, RadioButtonComponent, ChangeEventArgs as CheckBoxChange } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent, ChangeEventArgs, FieldSettingsModel } from '@syncfusion/ej2-react-dropdowns';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import './positions.css';
import { PositionDataModel } from '@syncfusion/ej2-popups';

function Positions () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let dropdownEle: HTMLDivElement;
    let customChooseEle: HTMLTableDataCellElement;
    let xPosEle: HTMLInputElement;
    let yPosEle: HTMLInputElement;
    let dropdownRef: React.Ref<HTMLDivElement>=(element)=>{
        dropdownEle = element;
    };
    let customChooseRef: React.Ref<HTMLTableDataCellElement>=(element)=>{
        customChooseEle = element;
    };
    let xPosRef: React.Ref<HTMLInputElement>=(element)=>{
        xPosEle = element;
    };
    let yPosRef: React.Ref<HTMLInputElement>=(element)=>{
        yPosEle = element;
    };

    let toastBtnShow: ButtonComponent;
    let toastBtnHide: ButtonComponent;
    let toastObj: ToastComponent;
    let dropDownObj: DropDownListComponent;
    let dropRadioObj: RadioButtonComponent;
    let customRadioObj: RadioButtonComponent;
    let radio1: RadioButtonComponent;
    let radio2: RadioButtonComponent;
    let position: PositionDataModel = { X: 'Right', Y: 'Bottom' };
    let target: HTMLElement = document.body;
    let initialWid: string = '';
    let customFlag: boolean = false;
    let dropData: { [key: string]: Object }[] = [
        { Id: 'topleft', Text: 'Top Left' },
        { Id: 'topright', Text: 'Top Right' },
        { Id: 'topcenter', Text: 'Top Center' },
        { Id: 'topfullwidth', Text: 'Top Full Width' },
        { Id: 'bottomleft', Text: 'Bottom Left' },
        { Id: 'bottomright', Text: 'Bottom Right' },
        { Id: 'bottomcenter', Text: 'Bottom Center' },
        { Id: 'bottomfullwidth', Text: 'Bottom Full Width' },
    ];
    let dropFields: FieldSettingsModel = { text: 'Text', value: 'Id' };
    let value: string = 'bottomright';

    function checkboxChange(e: ChangeEventArgs): void {
        if (radio1.checked) {
            toastObj.hide('All');
            toastObj.target = '#toast_pos_target';
            toastShow(1000);
        }
    }

    function toastShow(timeOutDelay: number): void {
        setTimeout(function () {
            toastObj.show();
        }.bind(this), timeOutDelay);
    }

    function checkboxChange1(e: CheckBoxChange): void {
        if (radio2.checked) {
            toastObj.hide('All');
            toastObj.target = document.body;
            toastShow(1000);
        }
    }

    function checkboxChange2(e: CheckBoxChange): void {
        if (dropRadioObj.checked) {
            toastObj.hide('All');
            dropdownEle.style.display = 'table-cell';
            customChooseEle.style.display = 'none';
            setToastPosValue(dropDownObj.value.toString()); customFlag = false; toastShow(1000);
        }
    }

    function checkboxChange3(e: CheckBoxChange): void {
        if (customRadioObj.checked) {
            toastObj.hide('All');
            dropdownEle.style.display = 'none';
            customChooseEle.style.display = 'table-cell';
            setcustomPosValue(); customFlag = true; toastShow(1000);
        }
    }

    function valueChange(e: ChangeEventArgs): void {
        toastObj.hide('All'); setToastPosValue(e.value.toString()); toastShow(1000);
    }

    function setcustomPosValue(): void {
        toastObj.width = initialWid;
        toastObj.position.X = parseInt(xPosEle.value, 10);
        toastObj.position.Y = parseInt(yPosEle.value, 10);
    }

    function showBtnClick(): void {
        if (customFlag) {
            setcustomPosValue();
        }
        toastObj.show();
    }

    function setToastPosValue(value: string): void {
        toastObj.width = initialWid;
        switch (value) {
            case 'topleft':
                toastObj.position.X = 'Left'; toastObj.position.Y = 'Top'; break;
            case 'topright':
                toastObj.position.X = 'Right'; toastObj.position.Y = 'Top'; break;
            case 'topcenter':
                toastObj.position.X = 'Center'; toastObj.position.Y = 'Top'; break;
            case 'topfullwidth':
                toastObj.width = '100%'; toastObj.position.X = 'Center'; toastObj.position.Y = 'Top'; break;
            case 'bottomleft':
                toastObj.position.X = 'Left'; toastObj.position.Y = 'Bottom'; break;
            case 'bottomright':
                toastObj.position.X = 'Right'; toastObj.position.Y = 'Bottom'; break;
            case 'bottomcenter':
                toastObj.position.X = 'Center'; toastObj.position.Y = 'Bottom'; break;
            case 'bottomfullwidth':
                toastObj.width = '100%'; toastObj.position.X = 'Center'; toastObj.position.Y = 'Bottom'; break;
        }
    }

    function hideBtnClick(): void {
        toastObj.hide('All');
    }

    function created(): void {
        setTimeout(function () {
            toastShow(200);
            initialWid = toastObj.width.toString();
        }.bind(this), 200);
    }

    function onclose(e): void {
        if (e.toastContainer.childElementCount === 0) {
            toastBtnHide.element.style.display = 'none';
        }

    }

    function onbeforeOpen(): void {
        toastBtnHide.element.style.display = 'inline-block';
    }

    document.addEventListener('click', function (e: Event): void {
        if (!isNullOrUndefined(toastObj) && e.target !== toastBtnShow.element && toastObj.target === document.body) {
            toastObj.hide('All');
        }
    }.bind(this));
    
    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section toast-pos-section'>
                <div className="e-sample-resize-container" id="toast_pos_target">
                    <ToastComponent ref={(toast) => { toastObj = toast }} id='toast_pos' title='Matt sent you a friend request' content='You have a friend request yet to accept.' icon='e-laura' position={position} target={target} created={created.bind(this)} close={onclose.bind(this)} beforeOpen={onbeforeOpen.bind(this)}></ToastComponent>
                    <div id="toast_pos_property">
                        <table style={{ 'width': '100%' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div style={{ 'padding': '25px 0 0 0' }}>
                                            <RadioButtonComponent ref={(scope) => { dropRadioObj = scope }} id='dropdownRadio' checked={true} label='Position' name='toastPos' value="Position" change={checkboxChange2.bind(this)}></RadioButtonComponent>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ 'padding': '25px 0 0 0' }}>
                                            <RadioButtonComponent ref={(scope) => { customRadioObj = scope }} id='customRedio' label='Custom' name='toastPos' value="Custom" change={checkboxChange3.bind(this)}></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="dropdownChoose">
                            <div id="dropdown" ref={dropdownRef} style={{ paddingTop: '25px' }}>
                                <DropDownListComponent ref={(dropdownlist) => { dropDownObj = dropdownlist }} id="position" dataSource={dropData} fields={dropFields} placeholder="Select a position" change={valueChange.bind(this)} value={value} index={5} popupHeight='200px' />
                            </div>
                        </div>
                        <table style={{ 'width': '100%' }}>
                            <tbody>
                                <tr>
                                    <td id="customChoose" ref={customChooseRef} style={{ display: 'none' }}>
                                        <form id="formId" className="form-horizontal">
                                            <div className="e-row">
                                                <div className="e-float-input">
                                                    <input className="e-input" id="xPos" ref={xPosRef} name="Digits" defaultValue="50" required />
                                                    <span className="e-float-line"></span>
                                                    <label className="e-float-text">X Position</label>
                                                </div>
                                            </div>
                                            <div className="e-row">
                                                <div className="e-float-input">
                                                    <input className="e-input" id="yPos" ref={yPosRef} name="Digits" defaultValue="50" required />
                                                    <span className="e-float-line"></span>
                                                    <label className="e-float-text">Y Position</label>
                                                </div>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{ 'padding': '25px 0 0 0' }}>
                                            <RadioButtonComponent ref={(scope) => { radio1 = scope }} id='radio1' label='Target' name='toast' value='Target' change={checkboxChange.bind(this)}></RadioButtonComponent>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ 'padding': '25px 0 0 0' }}>
                                            <RadioButtonComponent ref={(scope) => { radio2 = scope }} id='radio2' checked={true} label='Global' name='toast' value='Global' change={checkboxChange1.bind(this)}></RadioButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="toast_btn" style={{ paddingTop: '25px' }}>
                            <ButtonComponent className="e-btn e-control" id='show_Toast' ref={(btn) => { toastBtnShow = btn }} style={{ marginRight: '15px' }} onClick={showBtnClick.bind(this)}>Show Toasts</ButtonComponent>
                            <ButtonComponent className="e-btn e-control" id='hideTosat' ref={(btn) => { toastBtnHide = btn }} onClick={hideBtnClick.bind(this)}>Hide All</ButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the different positioning of the <code>Toast</code> based on the target given.</p>
            </div>
            <div id="description">
                <p>Based on the use case toast can take the body element or any specific element as target. In this sample, with help of custom inputs toast can be positioned based on the target.</p>
                <ul>
                    <li>Toast can be positioned in the 8 pre-defined places.</li>
                    <li>Custom option will enable to give X and Y values to align the toast based on the given inputs.</li>
                </ul>
                <p>More information about Toast can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/toast/getting-started/">
                    documentation section</a>.</p>
            </div>
        </div>
    )
}
export default Positions;