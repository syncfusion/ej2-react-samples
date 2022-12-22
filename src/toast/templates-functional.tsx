import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ToastComponent, ToastBeforeOpenArgs, ToastAnimationSettingsModel } from '@syncfusion/ej2-react-notifications';
import { compile, Browser, closest } from '@syncfusion/ej2-base';
import './templates.css';
import { PositionDataModel } from '@syncfusion/ej2-popups';

function Templates (){
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let snoozeEle: HTMLButtonElement;
    let dismissEle: HTMLButtonElement;
    let snoozeRef: React.Ref<HTMLButtonElement>=(element)=>{
            snoozeEle = element;
    };
    let dismissRef: React.Ref<HTMLButtonElement>=(element)=>{
            dismissEle = element;
    };
    
    let toastObj: ToastComponent;
    let toastObjEmail: ToastComponent;
    let toastMailRemainder: ButtonComponent;
    let AlarmTurnOn: ButtonComponent;
    const cusPosition: PositionDataModel = { X: 'Right' };
    const tempPosition: PositionDataModel = !Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
    const tempTarget: HTMLElement | Element | string = !Browser.isDevice ? document.body : '#toast_template_target';
    const template: string = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';
    const toastData: { [key: string]: Object }[] = [
        { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: 'src/toast/resource/laura.png' }, },
        { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: 'src/toast/resource/janat.png' }, },
        { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: 'src/toast/resource/camden.png' }, },
        { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: 'src/toast/resource/chase.png' }, },
        {
            from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: 'src/toast/resource/michael.png' },
        }];
    const cusAnimation: ToastAnimationSettingsModel = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    };
    let toastFlag: number = 0;
    let snoozeFlag: boolean = false;
    let waterMark: string = 'Select a snooze time';
    let height: string = '200px';
    let value: string = '2min';
    const snoozeData: { [key: string]: Object }[] = [
        { value: '2min', text: '2 minutes' },
        { value: '5min', text: '5 minutes' },
        { value: '10min', text: '10 minutes' }
    ];
    let listObj: DropDownListComponent;

    function remainderClick(): void {
        var obj: HTMLElement = cardTemplateFn(toastData[toastFlag])[0] as HTMLElement;
        toastObjEmail.show({ template: obj.outerHTML });
        ++toastFlag;
        if (toastFlag === (toastData.length)) {
            toastFlag = 0;
        }
    }

    function alarmClick(): void {
        toastObj.show();
    }

    function onOpenToast(): void {
        snoozeEle.addEventListener('click', function (): void {
            snoozeFlag = true;
            toastObj.hide();
        }.bind(this));
        dismissEle.addEventListener('click', function (): void {
            toastObj.hide();
        }.bind(this));
        document.addEventListener('click', function (e: Event): void {
            let closestEle: HTMLElement = closest(e.target as Element, '.e-toast-container') as HTMLElement;
            if (!isNullOrUndefined(toastObj) && e.target !== AlarmTurnOn.element && e.target !== toastMailRemainder.element && closestEle !== toastObj.element && closestEle !== toastObjEmail.element) {
                toastObj.hide('All');
                toastObjEmail.hide('All');
            }
        }.bind(this));
    }

    function onToastClose(): void {
        AlarmTurnOn.element.style.display = 'inline-block';
        if (snoozeFlag) {
            toastObj.show({ timeOut: (parseInt(listObj.value.toString(), 10) * 60000) });
            snoozeFlag = false;
        }
    }

    function onToastBeforeOpen(e: ToastBeforeOpenArgs): void {
        AlarmTurnOn.element.style.display = 'none';
    }

    function listChange(e: ChangeEventArgs): void {
        snoozeFlag = true;
        toastObj.hide();
    }

    function cardTemplateFn(data: Object): NodeList {
        return compile(template.trim())(data);
    }

    function toastObjCreate(): void {
        setTimeout(function () {
            toastObj.show();
        }.bind(this), 200);
    }

    function toastObjEmailCreate(): void {
        setTimeout(function () {
            var emailObj: HTMLElement = cardTemplateFn(toastData[toastFlag])[0] as HTMLElement;
            toastObjEmail.show({ template: emailObj.outerHTML });
            ++toastFlag;
        }.bind(this), 200);
    }

    function templatedata(): JSX.Element {
        return (
            <div id="template_toast_ele">
                <div id='template_toast'>
                    <div className="horizontal-align">
                        <div className='e-icons toast-icons e-alarm'></div>
                        <div className='toast-content'>
                            <div className='toast-title'>Weekend Alarm</div>
                            <div className='toast-message'> With traffic, its likely to take 45 minutes to get to jenny's 24th Birthday Bash at Hillside Bar, 454 E.
                                    Olive Way by 10:00PM </div>
                        </div>
                    </div>
                    <img src="./src/toast/resource/map.jpg" width="100%" height="70%" />
                    <div className="snooze"> Snooze for </div>
                    <div id='snoozedropDown'>
                        <DropDownListComponent id="snoozeDD" dataSource={snoozeData} ref={(dropdownlist) => { listObj = dropdownlist }} change={listChange.bind(this)} placeholder={waterMark} value={value} popupHeight={height} />
                    </div>
                    <div className="snoozeBtn">
                        <button id="snooze" ref={snoozeRef} className='e-btn e-flat e-primary' style={{ marginRight: '15px' }}> Snooze </button>
                        <button id="dismiss" ref={dismissRef} className='e-btn e-flat e-primary'> Dismiss </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section toast-template-section'>
                <div className="e-sample-resize-container">
                    <div className="row">
                        <div id="reminder">
                            <ButtonComponent className="e-btn" ref={(btn) => { toastMailRemainder = btn }} id='toast_mail_remainder' onClick={remainderClick.bind(this)}> Mail Reminder</ButtonComponent>
                            <ButtonComponent className="e-btn" ref={(btn) => { AlarmTurnOn = btn }} id='Alarm_turn_on' onClick={alarmClick.bind(this)}>Turn on Alarm</ButtonComponent>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <ToastComponent ref={(toast) => { toastObjEmail = toast }} id='toast_custom' position={cusPosition} animation={cusAnimation} newestOnTop={true} showCloseButton={true} timeOut={0} created={toastObjEmailCreate.bind(this)}></ToastComponent>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <ToastComponent ref={(scope) => { toastObj = scope }} id='toast_template' position={tempPosition} target={tempTarget} template={templatedata.bind(this)} extendedTimeout={0} timeOut={120000} open={onOpenToast.bind(this)} close={onToastClose.bind(this)} beforeOpen={onToastBeforeOpen.bind(this)} created={toastObjCreate.bind(this)}></ToastComponent>
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
        </div>
    )
}
export default Templates;