import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ToastComponent, Toast, ToastModel } from '@syncfusion/ej2-react-notifications';
import './types.css';
import { PositionDataModel } from '@syncfusion/ej2-popups';

export class Types extends SampleBase<{}, {}> {
    private toastObj: ToastComponent;
    private infoBtn: ButtonComponent;
    private warnBtn: ButtonComponent;
    private successBtn: ButtonComponent;
    private errorBtn: ButtonComponent;
    private hideTosat: ButtonComponent;
    private position: PositionDataModel = { X: 'Right' };
    public toasts: { [key: string]: Object }[] = [
        { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
        { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
        { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
        { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
    ];
    public create(): void {
        setTimeout(function () {
            this.toastObj.show(this.toasts[3]);
        }.bind(this), 200);
    }
    public infoClick(): void {
        this.toastObj.show(this.toasts[3]);
    }
    public warningClick(): void {
        this.toastObj.show(this.toasts[0]);
    }
    public successClick(): void {
        this.toastObj.show(this.toasts[1]);
    }
    public errorClick(): void {
        this.toastObj.show(this.toasts[2]);
    }
    public hideClick(): void {
        this.toastObj.hide('All');
    }
    public onclose(e): void {
        if (e.toastContainer.childElementCount === 0) {
            this.hideTosat.element.style.display = 'none';
        }

    }

    public onbeforeOpen(): void {
        this.hideTosat.element.style.display = 'inline-block';
    }

    render() {
        document.addEventListener('click', function (e: Event): void {
            if (!isNullOrUndefined(this.toastObj) && e.target !== this.infoBtn.element && e.target !== this.warnBtn.element && e.target !== this.successBtn.element && e.target !== this.errorBtn.element) {
                this.toastObj.hide('All');
            }
        }.bind(this));
        return (
            <div className='control-pane'>
                <div className='col-lg-12 control-section toast-type-section'>
                    <div className="e-sample-resize-container">
                        <ToastComponent ref={(toast) => { this.toastObj = toast }} id='toast_type' position={this.position} created={this.create.bind(this)} close={this.onclose.bind(this)} beforeOpen={this.onbeforeOpen.bind(this)} ></ToastComponent>
                        <div id='toast_types'>
                            <div>
                                <ButtonComponent ref={(scope) => { this.infoBtn = scope }} cssClass='e-btn e-control e-info' id='info_Toast' onClick={this.infoClick.bind(this)}>Info Message</ButtonComponent>
                                <ButtonComponent ref={(scope) => { this.warnBtn = scope }} cssClass='e-btn e-control e-warning' id='warning_Toast' onClick={this.warningClick.bind(this)}>Warning Message</ButtonComponent>
                                <ButtonComponent ref={(scope) => { this.successBtn = scope }} cssClass='e-btn e-contro e-success' id='success_Toast' onClick={this.successClick.bind(this)}>Success Message</ButtonComponent>
                                <ButtonComponent ref={(scope) => { this.errorBtn = scope }} cssClass='e-btn e-control e-danger' id='error_Toast' onClick={this.errorClick.bind(this)}>Danger Message</ButtonComponent>
                            </div>
                            <div style={{ paddingTop: '15px' }}>
                                <ButtonComponent cssClass='e-btn e-control' id='hideTosat' ref={(btn) => { this.hideTosat = btn }} onClick={this.hideClick.bind(this)}>Hide All</ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates 4-predefined toast colors for various scenarios which can be using CSS class.</p>
                </div>
                <div id="description">
                    <p>The toast supports the following 4 different essential colors for various situations. Here we have achieved success, danger, warning, info notifications with corresponding icon and text message. All the classes should be added with .e-toast class.</p>
                    <ul>
                        <li>Information -  The <code>e-toast-info</code> class applies the color and background for showing toast information.</li>
                        <li>Success -  The <code>e-toast-success</code> class applies the color and background for notifying success action.</li>
                        <li>Warning -  The <code>e-toast-warning</code> class applies the color and background for showing warning message.</li>
                        <li>Danger -  The <code>e-toast-danger</code> class applies the color and background for showing error/failure toast.</li>
                    </ul>
                    <p>More information about Toast can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/toast/getting-started/">
                        documentation section</a>.</p>
                </div>
            </div>
        )
    }
}