import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ToastComponent, Toast, ToastModel } from '@syncfusion/ej2-react-notifications';
import './types.css';
import { PositionDataModel } from '@syncfusion/ej2-popups';

function Types (){
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let toastObj: ToastComponent;
    let infoBtn: ButtonComponent;
    let warnBtn: ButtonComponent;
    let successBtn: ButtonComponent;
    let errorBtn: ButtonComponent;
    let hideTosat: ButtonComponent;
    let position: PositionDataModel = { X: 'Right' };
    const toasts: { [key: string]: Object }[] = [
        { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
        { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
        { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
        { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
    ];
    
    function create(): void {
        setTimeout(function () {
            toastObj.show(toasts[3]);
        }.bind(this), 200);
    }

    function infoClick(): void {
        toastObj.show(toasts[3]);
    }

    function warningClick(): void {
        toastObj.show(toasts[0]);
    }

    function successClick(): void {
        toastObj.show(toasts[1]);
    }

    function errorClick(): void {
        toastObj.show(toasts[2]);
    }

    function hideClick(): void {
        toastObj.hide('All');
    }

    function onclose(e): void {
        if (e.toastContainer.childElementCount === 0) {
            hideTosat.element.style.display = 'none';
        }

    }

    function onbeforeOpen(): void {
        hideTosat.element.style.display = 'inline-block';
    }

    document.addEventListener('click', function (e: Event): void {
        if (!isNullOrUndefined(toastObj) && e.target !== infoBtn.element && e.target !== warnBtn.element && e.target !== successBtn.element && e.target !== errorBtn.element) {
            toastObj.hide('All');
        }
    }.bind(this));

    return (
        <div className='control-pane'>
            <div className='col-lg-12 control-section toast-type-section'>
                <div className="e-sample-resize-container">
                    <ToastComponent ref={(toast) => { toastObj = toast }} id='toast_type' position={position} created={create.bind(this)} close={onclose.bind(this)} beforeOpen={onbeforeOpen.bind(this)} ></ToastComponent>
                    <div id='toast_types'>
                        <div>
                            <ButtonComponent ref={(scope) => { infoBtn = scope }} cssClass='e-btn e-control e-info' id='info_Toast' onClick={infoClick.bind(this)}>Info Message</ButtonComponent>
                            <ButtonComponent ref={(scope) => { warnBtn = scope }} cssClass='e-btn e-control e-warning' id='warning_Toast' onClick={warningClick.bind(this)}>Warning Message</ButtonComponent>
                            <ButtonComponent ref={(scope) => { successBtn = scope }} cssClass='e-btn e-contro e-success' id='success_Toast' onClick={successClick.bind(this)}>Success Message</ButtonComponent>
                            <ButtonComponent ref={(scope) => { errorBtn = scope }} cssClass='e-btn e-control e-danger' id='error_Toast' onClick={errorClick.bind(this)}>Danger Message</ButtonComponent>
                        </div>
                        <div style={{ paddingTop: '15px' }}>
                            <ButtonComponent cssClass='e-btn e-control' id='hideTosat' ref={(btn) => { hideTosat = btn }} onClick={hideClick.bind(this)}>Hide All</ButtonComponent>
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
export default Types;