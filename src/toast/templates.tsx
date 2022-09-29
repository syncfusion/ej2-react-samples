import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ToastComponent, ToastBeforeOpenArgs, ToastAnimationSettingsModel } from '@syncfusion/ej2-react-notifications';
import { compile, Browser, closest } from '@syncfusion/ej2-base';
import './templates.css';
import { PositionDataModel } from '@syncfusion/ej2-popups';

export class Templates extends SampleBase<{}, {}> {

    private snoozeEle: HTMLButtonElement;
    private snoozeRef: React.Ref<HTMLButtonElement>;
    private dismissEle: HTMLButtonElement;
    private dismissRef: React.Ref<HTMLButtonElement>;

    constructor(props) {
        super(props);
        this.snoozeRef = element => {
            this.snoozeEle = element;
        };
        this.dismissRef = element => {
            this.dismissEle = element;
        };
    }

    private toastObj: ToastComponent;
    private toastObjEmail: ToastComponent;
    private toastMailRemainder: ButtonComponent;
    private AlarmTurnOn: ButtonComponent;
    private cusPosition: PositionDataModel = { X: 'Right' };
    private tempPosition: PositionDataModel = !Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
    private tempTarget: HTMLElement | Element | string = !Browser.isDevice ? document.body : '#toast_template_target';
    private template: string = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';
    private toastData: { [key: string]: Object }[] = [
        { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: 'src/toast/resource/laura.png' }, },
        { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: 'src/toast/resource/janat.png' }, },
        { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: 'src/toast/resource/camden.png' }, },
        { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: 'src/toast/resource/chase.png' }, },
        {
            from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: 'src/toast/resource/michael.png' },
        }];
    private cusAnimation: ToastAnimationSettingsModel = {
        hide: { effect: 'SlideRightOut' },
        show: { effect: 'SlideRightIn' }
    };
    private toastFlag: number = 0;
    private snoozeFlag: boolean = false;
    private waterMark: string = 'Select a snooze time';
    private height: string = '200px';
    private value: string = '2min';
    private snoozeData: { [key: string]: Object }[] = [
        { value: '2min', text: '2 minutes' },
        { value: '5min', text: '5 minutes' },
        { value: '10min', text: '10 minutes' }
    ];
    private listObj: DropDownListComponent;
    public remainderClick(): void {
        var obj: HTMLElement = this.cardTemplateFn(this.toastData[this.toastFlag])[0] as HTMLElement;
        this.toastObjEmail.show({ template: obj.outerHTML });
        ++this.toastFlag;
        if (this.toastFlag === (this.toastData.length)) {
            this.toastFlag = 0;
        }
    }
    public alarmClick(): void {
        this.toastObj.show();
    }
    public onOpenToast(): void {
        this.snoozeEle.addEventListener('click', function (): void {
            this.snoozeFlag = true;
            this.toastObj.hide();
        }.bind(this));
        this.dismissEle.addEventListener('click', function (): void {
            this.toastObj.hide();
        }.bind(this));
        document.addEventListener('click', function (e: Event): void {
            let closestEle: HTMLElement = closest(e.target as Element, '.e-toast-container') as HTMLElement;
            if (!isNullOrUndefined(this.toastObj) && e.target !== this.AlarmTurnOn.element && e.target !== this.toastMailRemainder.element && closestEle !== this.toastObj.element && closestEle !== this.toastObjEmail.element) {
                this.toastObj.hide('All');
                this.toastObjEmail.hide('All');
            }
        }.bind(this));
    }
    public onToastClose(): void {
        this.AlarmTurnOn.element.style.display = 'inline-block';
        if (this.snoozeFlag) {
            this.toastObj.show({ timeOut: (parseInt(this.listObj.value.toString(), 10) * 60000) });
            this.snoozeFlag = false;
        }
    }
    public onToastBeforeOpen(e: ToastBeforeOpenArgs): void {
        this.AlarmTurnOn.element.style.display = 'none';
    }
    public listChange(e: ChangeEventArgs): void {
        this.snoozeFlag = true;
        this.toastObj.hide();
    }
    public cardTemplateFn(data: Object): NodeList {
        return compile(this.template.trim())(data);
    }
    public toastObjCreate(): void {
        setTimeout(function () {
            this.toastObj.show();
        }.bind(this), 200);
    }
    public toastObjEmailCreate(): void {
        setTimeout(function () {
            this.toastObjEmail.show({ template: this.cardTemplateFn(this.toastData[this.toastFlag])[0].outerHTML });
            ++this.toastFlag;
        }.bind(this), 200);
    }

    render() {
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
                            <DropDownListComponent id="snoozeDD" dataSource={this.snoozeData} ref={(dropdownlist) => { this.listObj = dropdownlist }} change={this.listChange.bind(this)} placeholder={this.waterMark} value={this.value} popupHeight={this.height} />
                        </div>
                        <div className="snoozeBtn">
                            <button id="snooze" ref={this.snoozeRef} className='e-btn e-flat e-primary' style={{ marginRight: '15px' }}> Snooze </button>
                            <button id="dismiss" ref={this.dismissRef} className='e-btn e-flat e-primary'> Dismiss </button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section toast-template-section'>
                    <div className="col-lg-12 col-sm-12 col-md-12 center">
                        <div className="row">
                            <div id="reminder">
                                <ButtonComponent className="e-btn" ref={(btn) => { this.toastMailRemainder = btn }} id='toast_mail_remainder' onClick={this.remainderClick.bind(this)}> Mail Reminder</ButtonComponent>
                                <ButtonComponent className="e-btn" ref={(btn) => { this.AlarmTurnOn = btn }} id='Alarm_turn_on' onClick={this.alarmClick.bind(this)}>Turn on Alarm</ButtonComponent>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <ToastComponent ref={(toast) => { this.toastObjEmail = toast }} id='toast_custom' position={this.cusPosition} animation={this.cusAnimation} newestOnTop={true} showCloseButton={true} timeOut={0} created={this.toastObjEmailCreate.bind(this)}></ToastComponent>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                                <ToastComponent ref={(scope) => { this.toastObj = scope }} id='toast_template' position={this.tempPosition} target={this.tempTarget} template={templatedata.bind(this)} extendedTimeout={0} timeOut={120000} open={this.onOpenToast.bind(this)} close={this.onToastClose.bind(this)} beforeOpen={this.onToastBeforeOpen.bind(this)} created={this.toastObjCreate.bind(this)}></ToastComponent>
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
}
