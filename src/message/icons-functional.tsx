import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { updateSampleSection } from '../common/sample-base';
import { MessageComponent, Message } from '@syncfusion/ej2-react-notifications';
import { ButtonComponent, CheckBoxComponent, Button, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { getComponent } from '@syncfusion/ej2-base';
import './icons.css';
import { PropertyPane } from '../common/property-pane';

function Icons() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let msgDefault: MessageComponent;
    let msgSuccess: MessageComponent;
    let msgInfo: MessageComponent;
    let msgWarning: MessageComponent;
    let msgError: MessageComponent;
    let defaultBtn: ButtonComponent;
    let warningBtn: ButtonComponent;
    let successBtn: ButtonComponent;
    let infoBtn: ButtonComponent;
    let errorBtn: ButtonComponent;

    function defaultClick(): void {
        show(msgDefault, defaultBtn);
    }

    function defaultClosed(): void {
        defaultBtn.element.classList.remove('msg-hidden');
    }

    function infoClick(): void {
        show(msgInfo, infoBtn);
    }

    function infoClosed(): void {
        infoBtn.element.classList.remove('msg-hidden');
    }

    function successClick(): void {
        show(msgSuccess, successBtn);
    }

    function successClosed(): void {
        successBtn.element.classList.remove('msg-hidden');
    }

    function warningClick(): void {
        show(msgWarning, warningBtn);
    }

    function warningClosed(): void {
        warningBtn.element.classList.remove('msg-hidden');
    }

    function errorClick(): void {
        show(msgError, errorBtn);
    }

    function errorClosed(): void {
        errorBtn.element.classList.remove('msg-hidden');
    }

    function severityIconChange(args: ChangeEventArgs): void {
        let msgTypes: string[] = ["default", "info", "success", "warning", "error"];
        for (let i: number = 0; i <= 4; i++) {
            let msgObj: Message = getComponent(document.getElementById("msg_" + msgTypes[i] + "_icon"), "message") as Message;
            if (msgObj) {
                if (args.checked) {
                    msgObj.showIcon = true;
                } else {
                    msgObj.showIcon = false;
                }
            }
        }
    }

    function closeIconChange(args: ChangeEventArgs): void {
        let msgTypes: string[] = ["default", "info", "success", "warning", "error"];
        for (let i: number = 0; i <= 4; i++) {
            let msgObj: Message = getComponent(document.getElementById("msg_" + msgTypes[i] + "_icon"), "message") as Message;
            if (msgObj) {
                if (args.checked) {
                    msgObj.showCloseIcon = true;
                } else {
                    msgObj.showCloseIcon = false;
                }
            }
        }
    }

    function show(message: Message, btn: Button): void {
        message.visible = true;
        btn.element.classList.add('msg-hidden');
    }

    return (
        <div className='control-pane'>
            <div className="col-lg-8 control-section msg-icon-section">
                <div className="content-section">
                    <ButtonComponent id="btn1" ref={(scope) => { defaultBtn = scope; }} content="Show Default Message" cssClass="e-outline e-primary msg-hidden" onClick={defaultClick.bind(this)}></ButtonComponent>
                    <MessageComponent id="msg_default_icon" ref={(scope) => { msgDefault = scope; }} showCloseIcon={true} closed={defaultClosed.bind(this)}>Editing is restricted</MessageComponent>
                    <ButtonComponent id="btn2" ref={(scope) => { infoBtn = scope; }} content="Show Info Message" cssClass="e-outline e-primary e-info msg-hidden" onClick={infoClick.bind(this)}></ButtonComponent>
                    <MessageComponent id="msg_info_icon" severity="Info" ref={(scope) => { msgInfo = scope; }} showCloseIcon={true} closed={infoClosed.bind(this)}>Please read the comments carefully</MessageComponent>
                    <ButtonComponent id="btn3" ref={(scope) => { successBtn = scope; }} content="Show Success Message" cssClass="e-outline e-primary e-success msg-hidden" onClick={successClick.bind(this)}></ButtonComponent>
                    <MessageComponent id="msg_success_icon" severity="Success" ref={(scope) => { msgSuccess = scope; }} showCloseIcon={true} closed={successClosed.bind(this)}> Your message has been sent successfully</MessageComponent>
                    <ButtonComponent id="btn4" ref={(scope) => { warningBtn = scope; }} content="Show Warning Message" cssClass="e-outline e-primary e-warning msg-hidden" onClick={warningClick.bind(this)}></ButtonComponent>
                    <MessageComponent id="msg_warning_icon" severity="Warning" ref={(scope) => { msgWarning = scope; }} showCloseIcon={true} closed={warningClosed.bind(this)}>There was a problem with your network connection</MessageComponent>
                    <ButtonComponent id="btn5" ref={(scope) => { errorBtn = scope; }} content="Show Error Message" cssClass="e-outline e-primary e-error msg-hidden" onClick={errorClick.bind(this)}></ButtonComponent>
                    <MessageComponent id="msg_error_icon" severity="Error" ref={(scope) => { msgError = scope; }} showCloseIcon={true} closed={errorClosed.bind(this)}>A problem occurred while submitting your data</MessageComponent>
                </div>
            </div>

            <div className="col-lg-4 property-section">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties">
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px' }}>
                                    <CheckBoxComponent label='Severity Icon' checked={true} change={severityIconChange}></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px' }}>
                                    <CheckBoxComponent label='Close Icon' checked={true} change={closeIconChange}></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the visibility customization of severity and close icons of the React Message component. Click the close icon to hide the message. Click the button to restore the hidden message. Check or uncheck the check box to show or hide the visibility of the severity icon. Check or uncheck the check box to show or hide the visibility of the close icon.</p>
            </div>
            <div id="description">
                <p>The Message component can be rendered with and without the severity and close icons. The close icon is used to hide the message.</p>
                <p>In this sample, the Message component is rendered with a severity icon and a close icon. The visibility of the severity icon is handled by the <code>showIcon</code> property. The visibility of the close icon is handled by the <code>showCloseIcon</code> property.</p>
            </div>
        </div>
    )
}
export default Icons;
