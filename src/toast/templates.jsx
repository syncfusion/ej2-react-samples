import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { compile, Browser, closest } from '@syncfusion/ej2-base';
import './templates.css';
export class Templates extends SampleBase {
    constructor(props) {
        super(props);
        this.cusPosition = { X: 'Right' };
        this.tempPosition = !Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
        this.tempTarget = !Browser.isDevice ? document.body : '#toast_template_target';
        this.template = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';
        this.toastData = [
            { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: 'src/toast/resource/laura.png' }, },
            { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: 'src/toast/resource/janat.png' }, },
            { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: 'src/toast/resource/camden.png' }, },
            { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: 'src/toast/resource/chase.png' }, },
            {
                from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: 'src/toast/resource/michael.png' },
            }
        ];
        this.cusAnimation = {
            hide: { effect: 'SlideRightOut' },
            show: { effect: 'SlideRightIn' }
        };
        this.toastFlag = 0;
        this.snoozeFlag = false;
        this.waterMark = 'Select a snooze time';
        this.height = '200px';
        this.value = '2min';
        this.snoozeData = [
            { value: '2min', text: '2 minutes' },
            { value: '5min', text: '5 minutes' },
            { value: '10min', text: '10 minutes' }
        ];
        this.snoozeRef = element => {
            this.snoozeEle = element;
        };
        this.dismissRef = element => {
            this.dismissEle = element;
        };
    }
    remainderClick() {
        var obj = this.cardTemplateFn(this.toastData[this.toastFlag])[0];
        this.toastObjEmail.show({ template: obj.outerHTML });
        ++this.toastFlag;
        if (this.toastFlag === (this.toastData.length)) {
            this.toastFlag = 0;
        }
    }
    alarmClick() {
        this.toastObj.show();
    }
    onOpenToast() {
        this.snoozeEle.addEventListener('click', function () {
            this.snoozeFlag = true;
            this.toastObj.hide();
        }.bind(this));
        this.dismissEle.addEventListener('click', function () {
            this.toastObj.hide();
        }.bind(this));
        document.addEventListener('click', function (e) {
            let closestEle = closest(e.target, '.e-toast-container');
            if (!isNullOrUndefined(this.toastObj) && e.target !== this.AlarmTurnOn.element && e.target !== this.toastMailRemainder.element && closestEle !== this.toastObj.element && closestEle !== this.toastObjEmail.element) {
                this.toastObj.hide('All');
                this.toastObjEmail.hide('All');
            }
        }.bind(this));
    }
    onToastClose() {
        this.AlarmTurnOn.element.style.display = 'inline-block';
        if (this.snoozeFlag) {
            this.toastObj.show({ timeOut: (parseInt(this.listObj.value.toString(), 10) * 60000) });
            this.snoozeFlag = false;
        }
    }
    onToastBeforeOpen(e) {
        this.AlarmTurnOn.element.style.display = 'none';
    }
    listChange(e) {
        this.snoozeFlag = true;
        this.toastObj.hide();
    }
    cardTemplateFn(data) {
        return compile(this.template.trim())(data);
    }
    toastObjCreate() {
        setTimeout(function () {
            this.toastObj.show();
        }.bind(this), 200);
    }
    toastObjEmailCreate() {
        setTimeout(function () {
            this.toastObjEmail.show({ template: this.cardTemplateFn(this.toastData[this.toastFlag])[0].outerHTML });
            ++this.toastFlag;
        }.bind(this), 200);
    }
    render() {
        function templatedata() {
            return (<div id="template_toast_ele">
                    <div id='template_toast'>
                        <div className="horizontal-align">
                            <div className='e-icons toast-icons e-alarm'></div>
                            <div className='toast-content'>
                                <div className='toast-title'>Weekend Alarm</div>
                                <div className='toast-message'> With traffic, its likely to take 45 minutes to get to jenny's 24th Birthday Bash at Hillside Bar, 454 E.
                                      Olive Way by 10:00PM </div>
                            </div>
                        </div>
                        <img src="./src/toast/resource/map.jpg" width="100%" height="70%"/>
                        <div className="snooze"> Snooze for </div>
                        <div id='snoozedropDown'>
                            <DropDownListComponent id="snoozeDD" dataSource={this.snoozeData} ref={(dropdownlist) => { this.listObj = dropdownlist; }} change={this.listChange.bind(this)} placeholder={this.waterMark} value={this.value} popupHeight={this.height}/>
                        </div>
                        <div className="snoozeBtn">
                            <button id="snooze" ref={this.snoozeRef} className='e-btn e-flat e-primary' style={{ marginRight: '15px' }}> Snooze </button>
                            <button id="dismiss" ref={this.dismissRef} className='e-btn e-flat e-primary'> Dismiss </button>
                        </div>
                    </div>
                </div>);
        }
        return (<div className='control-pane'>
                <div className='col-lg-12 control-section toast-template-section'>
                    <div className="e-sample-resize-container">
                        <div className="row">
                            <div id="reminder">
                                <ButtonComponent className="e-btn" ref={(btn) => { this.toastMailRemainder = btn; }} id='toast_mail_remainder' onClick={this.remainderClick.bind(this)}> Mail Reminder</ButtonComponent>
                                <ButtonComponent className="e-btn" ref={(btn) => { this.AlarmTurnOn = btn; }} id='Alarm_turn_on' onClick={this.alarmClick.bind(this)}>Turn on Alarm</ButtonComponent>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <ToastComponent ref={(toast) => { this.toastObjEmail = toast; }} id='toast_custom' position={this.cusPosition} animation={this.cusAnimation} newestOnTop={true} showCloseButton={true} timeOut={0} created={this.toastObjEmailCreate.bind(this)}></ToastComponent>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <ToastComponent ref={(scope) => { this.toastObj = scope; }} id='toast_template' position={this.tempPosition} target={this.tempTarget} template={templatedata.bind(this)} extendedTimeout={0} timeOut={120000} open={this.onOpenToast.bind(this)} close={this.onToastClose.bind(this)} beforeOpen={this.onToastBeforeOpen.bind(this)} created={this.toastObjCreate.bind(this)}></ToastComponent>
                                <div id="toast_template_target"></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the Template rendering of the Toast. Static HTML toast to display an alarm notification which can be snoozed or dismissed and Dynamic template rendered using template engine to display mail remainders.</p>
                </div>
                <div id="description">
                    <p>This sample illustrates the way to display the template content on the toast. With the usage of Template, the user can format and structure the HTML content to be displayed on the toast as per their application needs.</p>
                    <ul>
                        <li>Alarm toast is integrated with button and drop-down list that allows to set timeOut for toast and close it.</li>
                        <li>Dynamic toast opened based on the data source given to add mail reminder notifications and it can be hidden using the close button available.</li>
                    </ul>
                    <p>More information about Toast can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/toast/getting-started/">
                        documentation section</a>.</p>
                </div>
            </div>);
    }
}
