import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import './default.css';
export class Default extends SampleBase {
    constructor() {
        super(...arguments);
        this.position = { X: 'Right' };
    }
    create() {
        setTimeout(function () {
            this.toastObj.show({
                title: 'Adaptive Tiles Meeting', content: 'Conference Room 01 / Building 135 10:00 AM',
                icon: 'e-meeting',
            });
        }.bind(this), 200);
    }
    hideBtnClick() {
        this.toastObj.hide('All');
    }
    showBtnClick() {
        this.toastObj.show();
    }
    onclose(e) {
        if (e.toastContainer.childElementCount === 0) {
            this.toastBtnHide.element.style.display = 'none';
        }
    }
    onbeforeOpen() {
        this.toastBtnHide.element.style.display = 'inline-block';
    }
    rendereComplete() {
        document.addEventListener('click', function (e) {
            if (!isNullOrUndefined(this.toastObj) && e.target !== this.toastBtnShow.element) {
                this.toastObj.hide('All');
            }
        }.bind(this));
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section col-lg-12 toast-default-section'>
                    <div className="e-sample-resize-container">
                        <ToastComponent ref={(toast) => { this.toastObj = toast; }} id='toast_default' position={this.position} created={this.create.bind(this)} close={this.onclose.bind(this)} beforeOpen={this.onbeforeOpen.bind(this)}></ToastComponent>
                        <div id="toastBtnDefault" style={{ margin: 'auto', textAlign: 'center' }}>
                            <ButtonComponent id='toastBtnShow' ref={(btn) => { this.toastBtnShow = btn; }} className='e-btn' onClick={this.showBtnClick.bind(this)}>Show Toasts</ButtonComponent>
                            <ButtonComponent id='toastBtnHide' ref={(btn) => { this.toastBtnHide = btn; }} className='e-btn' onClick={this.hideBtnClick.bind(this)}>Hide All</ButtonComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the basic layout of a <code>Toast</code> to show simple notification and hide them.</p>
                </div>
                <div id="description">
                    <p>The <code>Toast</code> is a notification pop-up used to display on the desired position with required message and header icons.</p>
                    <ul>
                        <li>The header text is set using <code>title</code> property.</li>
                        <li>Information to be displayed is set using <code>content</code> property.</li>
                    </ul>
                    <p>More information about Toast can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/toast/getting-started/">
                        documentation section</a>.</p>
                </div>
            </div>);
    }
}
