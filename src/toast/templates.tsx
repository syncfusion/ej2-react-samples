import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { ToastComponent, ToastOpenArgs, ToastCloseArgs, ToastBeforeOpenArgs } from '@syncfusion/ej2-react-notifications';
import { compile, Browser, closest } from '@syncfusion/ej2-base';
import './templates.css';

export class Templates extends SampleBase<{}, {}> {
    
    private toastObj: ToastComponent;
    private toastObjEmail: ToastComponent;
    private cusPosition: Object = { X: 'Right' };
    private tempPosition: Object = !Browser.isDevice ? { X: 'Right', Y: 'Bottom' } : { X: 'Center', Y: 'Top' };
    private tempTarget: any = !Browser.isDevice ? document.body : '#toast_template_target';
    private template: string = '<div class="e-toast-template">${if(image)}<img class="e-toast-icon e-toast-image" src="${image.url}" />${/if} ${if(from || subject)}<div class="e-toast-message">${if(from)}<div class="e-toast-title">${from}</div>${/if} ${if(subject)}<div class="e-toast-content">${subject}</div>${/if}</div>${/if}</div>';
    private toastData: Object[] = [
        { from: ' Anjolie Stokes', subject: 'Networking Referral', image: { url: 'src/toast/resource/laura.png' }, },
        { from: ' Ila Russo', subject: 'Business dinner invitation', image: { url: 'src/toast/resource/janat.png' }, },
        { from: ' Camden Mcmillan', subject: 'Reference Request - Cameran Hester', image: { url: 'src/toast/resource/camden.png' }, },
        { from: ' Chase Solomon', subject: 'New business relationship confirmation', image: { url: 'src/toast/resource/chase.png' }, },
        {
            from: ' Inga Scott', subject: 'Application for Sales Associate', image: { url: 'src/toast/resource/michael.png' },
        }];
    private cusAnimation: {
            hide: { effect: 'SlideRightOut' },
            show: { effect: 'SlideRightIn' }
        };
    private toastFlag: number = 0;
    private snoozeFlag: boolean = false;
    private listObj: DropDownList = new DropDownList({
             placeholder: 'Select a snooze time',
             popupHeight: '200px',
             change: this.listChange.bind(this)
        }) as DropDownList;
    public remainderClick(): void {
        var obj: HTMLElement = this.cardTemplateFn(this.toastData[this.toastFlag])[0] as HTMLElement;
        this.toastObjEmail.show({ template: obj.outerHTML});
        ++this.toastFlag;
        if (this.toastFlag === (this.toastData.length)) {
            this.toastFlag = 0;
        }
    }
    public alarmClick(): void {
         this.toastObj.show();
    }
    public onOpenToast(): void {
        let dismisBtn: HTMLElement = document.getElementById('dismiss');
        let snooze: HTMLElement = document.getElementById('snooze');
        snooze.addEventListener('click',  function() : void {
             this.snoozeFlag = true;
            this.toastObj.hide();
        }.bind(this));
        dismisBtn.addEventListener('click',  function() : void {
            this.toastObj.hide();
        }.bind(this));
        document.addEventListener('click',  function(e: Event) : void {
            let closestEle: HTMLElement = closest(e.target as Element, '.e-toast-container') as HTMLElement;
           let alarm: HTMLElement = document.getElementById('Alarm_turn_on');
           let btnEle: HTMLElement = document.getElementById('toast_mail_remainder');
           if (!isNullOrUndefined(this.toastObj) && e.target !== alarm && e.target !== btnEle && closestEle !== this.toastObj.element && closestEle !== this.toastObjEmail.element) {
               this.toastObj.hide('All');
               this.toastObjEmail.hide('All');
           }
        }.bind(this));
    }
    public onToastClose(): void {
         let alarm: HTMLElement = document.getElementById('Alarm_turn_on');
         alarm.style.display = 'inline-block';
        if (this.snoozeFlag) {
            this.toastObj.show({ timeOut: (parseInt(this.listObj.value.toString(), 10) * 60000) });
            this.snoozeFlag = false;
        }
    }
    public onToastBeforeOpen(e: ToastBeforeOpenArgs): void {
        let alarm: HTMLElement = document.getElementById('Alarm_turn_on');
        alarm.style.display = 'none';
        this.listObj.appendTo(e.element.querySelector('#snoozeDD') as HTMLElement);
    }
    public listChange(e: ChangeEventArgs): void {
        this.snoozeFlag = true;
        this.toastObj.hide();
    }
    public cardTemplateFn(data: Object): HTMLCollection {
        return compile(this.template.trim())(data) as HTMLCollection;
    }
    public toastObjCreate(): void {
         setTimeout(function(){
           this.toastObj.show();
         }.bind(this),200);
    }
    public toastObjEmailCreate(): void {
         setTimeout(function(){
            this.toastObjEmail.show({ template: this.cardTemplateFn(this.toastData[this.toastFlag])[0].outerHTML });
            ++this.toastFlag;
        }.bind(this),200);
    }
   
    render() {
        function templatedata(data: any): JSX.Element {
            return(
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
                              <img src="./src/toast/resource/map.jpg" width="100%" height="70%"/>
                               <div className="snooze"> Snooze for </div>
                                   <div id='snoozedropDown'>
                                        <select id="snoozeDD">
                                            <option value="2min">2 minutes</option>
                                            <option value="5min">5 minutes</option>
                                            <option value="10min">10 minutes</option>
                                         </select>
                                   </div>
                                   <div className="snoozeBtn">
                                        <button id="snooze" className='e-btn e-flat e-primary' style={{'margin-right': '15px'}}> Snooze </button>
                                        <button id="dismiss" className='e-btn e-flat e-primary'> Dismiss </button>
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
                              <ButtonComponent className="e-btn" id='toast_mail_remainder' onClick={ this.remainderClick.bind(this) }> Mail Reminder</ButtonComponent>
                              <ButtonComponent className="e-btn" id='Alarm_turn_on' onClick={ this.alarmClick.bind(this) }>Turn on Alarm</ButtonComponent>
                         </div>
                      </div>
                     <div className="row">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <ToastComponent ref={(toast) => { this.toastObjEmail = toast }} id='toast_custom' position={this.cusPosition} animation={this.cusAnimation} newestOnTop={true} showCloseButton={true} timeOut={0} created={this.toastObjEmailCreate.bind(this)}></ToastComponent>
                     </div>
                    <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                       <ToastComponent ref={(scope) => { this.toastObj = scope }} id='toast_template' position={this.tempPosition} target={this.tempTarget} template={ templatedata } extendedTimeout={0} timeOut={120000} open={this.onOpenToast.bind(this)} close={this.onToastClose.bind(this)} beforeOpen={this.onToastBeforeOpen.bind(this)} created={this.toastObjCreate.bind(this)}></ToastComponent>
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
                    <p>More information about Toast can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/toast/getting-started.html">
        documentation section</a>.</p>
                </div>
            </div>
        )
    }
}
