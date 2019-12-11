import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent, RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import './positions.css';
export class Positions extends SampleBase {
    constructor(props) {
        super(props);
        this.position = { X: 'Right', Y: 'Bottom' };
        this.target = document.body;
        this.initialWid = '';
        this.customFlag = false;
        this.dropData = [
            { Id: 'topleft', Text: 'Top Left' },
            { Id: 'topright', Text: 'Top Right' },
            { Id: 'topcenter', Text: 'Top Center' },
            { Id: 'topfullwidth', Text: 'Top Full Width' },
            { Id: 'bottomleft', Text: 'Bottom Left' },
            { Id: 'bottomright', Text: 'Bottom Right' },
            { Id: 'bottomcenter', Text: 'Bottom Center' },
            { Id: 'bottomfullwidth', Text: 'Bottom Full Width' },
        ];
        this.dropFields = { text: 'Text', value: 'Id' };
        this.value = 'bottomright';
        this.dropdownRef = element => {
            this.dropdownEle = element;
        };
        this.customChooseRef = element => {
            this.customChooseEle = element;
        };
        this.xPosRef = element => {
            this.xPosEle = element;
        };
        this.yPosRef = element => {
            this.yPosEle = element;
        };
    }
    checkboxChange(e) {
        if (this.radio1.checked) {
            this.toastObj.hide('All');
            this.toastObj.target = '#toast_pos_target';
            this.toastShow(1000);
        }
    }
    toastShow(timeOutDelay) {
        setTimeout(function () {
            this.toastObj.show();
        }.bind(this), timeOutDelay);
    }
    checkboxChange1(e) {
        if (this.radio2.checked) {
            this.toastObj.hide('All');
            this.toastObj.target = document.body;
            this.toastShow(1000);
        }
    }
    checkboxChange2(e) {
        if (this.dropRadioObj.checked) {
            this.toastObj.hide('All');
            this.dropdownEle.style.display = 'table-cell';
            this.customChooseEle.style.display = 'none';
            this.setToastPosValue(this.dropDownObj.value.toString());
            this.customFlag = false;
            this.toastShow(1000);
        }
    }
    checkboxChange3(e) {
        if (this.customRadioObj.checked) {
            this.toastObj.hide('All');
            this.dropdownEle.style.display = 'none';
            this.customChooseEle.style.display = 'table-cell';
            this.setcustomPosValue();
            this.customFlag = true;
            this.toastShow(1000);
        }
    }
    valueChange(e) {
        this.toastObj.hide('All');
        this.setToastPosValue(e.value.toString());
        this.toastShow(1000);
    }
    setcustomPosValue() {
        this.toastObj.width = this.initialWid;
        this.toastObj.position.X = parseInt(this.xPosEle.value, 10);
        this.toastObj.position.Y = parseInt(this.yPosEle.value, 10);
    }
    showBtnClick() {
        if (this.customFlag) {
            this.setcustomPosValue();
        }
        this.toastObj.show();
    }
    setToastPosValue(value) {
        this.toastObj.width = this.initialWid;
        switch (value) {
            case 'topleft':
                this.toastObj.position.X = 'Left';
                this.toastObj.position.Y = 'Top';
                break;
            case 'topright':
                this.toastObj.position.X = 'Right';
                this.toastObj.position.Y = 'Top';
                break;
            case 'topcenter':
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Top';
                break;
            case 'topfullwidth':
                this.toastObj.width = '100%';
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Top';
                break;
            case 'bottomleft':
                this.toastObj.position.X = 'Left';
                this.toastObj.position.Y = 'Bottom';
                break;
            case 'bottomright':
                this.toastObj.position.X = 'Right';
                this.toastObj.position.Y = 'Bottom';
                break;
            case 'bottomcenter':
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Bottom';
                break;
            case 'bottomfullwidth':
                this.toastObj.width = '100%';
                this.toastObj.position.X = 'Center';
                this.toastObj.position.Y = 'Bottom';
                break;
        }
    }
    hideBtnClick() {
        this.toastObj.hide('All');
    }
    created() {
        setTimeout(function () {
            this.toastShow(200);
            this.initialWid = this.toastObj.width.toString();
        }.bind(this), 200);
    }
    onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            this.toastBtnHide.element.style.display = 'none';
        }
    }
    onbeforeOpen() {
        this.toastBtnHide.element.style.display = 'inline-block';
    }
    render() {
        document.addEventListener('click', function (e) {
            if (!isNullOrUndefined(this.toastObj) && e.target !== this.toastBtnShow.element && this.toastObj.target === document.body) {
                this.toastObj.hide('All');
            }
        }.bind(this));
        return (<div className='control-pane'>
                <div className='col-lg-12 control-section toast-pos-section'>
                    <div className="e-sample-resize-container" id="toast_pos_target">
                        <ToastComponent ref={(toast) => { this.toastObj = toast; }} id='toast_pos' title='Matt sent you a friend request' content='You have a friend request yet to accept.' icon='e-laura' position={this.position} target={this.target} created={this.created.bind(this)} close={this.onclose.bind(this)} beforeOpen={this.onbeforeOpen.bind(this)}></ToastComponent>
                        <div id="toast_pos_property">
                            <table style={{ 'width': '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div style={{ 'padding': '25px 0 0 0' }}>
                                                <RadioButtonComponent ref={(scope) => { this.dropRadioObj = scope; }} id='dropdownRadio' checked={true} label='Position' name='toastPos' value="Position" change={this.checkboxChange2.bind(this)}></RadioButtonComponent>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ 'padding': '25px 0 0 0' }}>
                                                <RadioButtonComponent ref={(scope) => { this.customRadioObj = scope; }} id='customRedio' label='Custom' name='toastPos' value="Custom" change={this.checkboxChange3.bind(this)}></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="dropdownChoose">
                                <div id="dropdown" ref={this.dropdownRef} style={{ paddingTop: '25px' }}>
                                    <DropDownListComponent ref={(dropdownlist) => { this.dropDownObj = dropdownlist; }} id="position" dataSource={this.dropData} fields={this.dropFields} placeholder="Select a position" change={this.valueChange.bind(this)} value={this.value} index={5} popupHeight='200px'/>
                                </div>
                            </div>
                            <table style={{ 'width': '100%' }}>
                                <tbody>
                                    <tr>
                                        <td id="customChoose" ref={this.customChooseRef} style={{ display: 'none' }}>
                                            <form id="formId" className="form-horizontal">
                                                <div className="e-row">
                                                    <div className="e-float-input">
                                                        <input className="e-input" id="xPos" ref={this.xPosRef} name="Digits" defaultValue="50" required/>
                                                        <span className="e-float-line"></span>
                                                        <label className="e-float-text">X Position</label>
                                                    </div>
                                                </div>
                                                <div className="e-row">
                                                    <div className="e-float-input">
                                                        <input className="e-input" id="yPos" ref={this.yPosRef} name="Digits" defaultValue="50" required/>
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
                                                <RadioButtonComponent ref={(scope) => { this.radio1 = scope; }} id='radio1' label='Target' name='toast' value='Target' change={this.checkboxChange.bind(this)}></RadioButtonComponent>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ 'padding': '25px 0 0 0' }}>
                                                <RadioButtonComponent ref={(scope) => { this.radio2 = scope; }} id='radio2' checked={true} label='Global' name='toast' value='Global' change={this.checkboxChange1.bind(this)}></RadioButtonComponent>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="toast_btn" style={{ paddingTop: '25px' }}>
                                <ButtonComponent className="e-btn e-control" id='show_Toast' ref={(btn) => { this.toastBtnShow = btn; }} style={{ marginRight: '15px' }} onClick={this.showBtnClick.bind(this)}>Show Toasts</ButtonComponent>
                                <ButtonComponent className="e-btn e-control" id='hideTosat' ref={(btn) => { this.toastBtnHide = btn; }} onClick={this.hideBtnClick.bind(this)}>Hide All</ButtonComponent>
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
            </div>);
    }
}
