import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SampleBase } from '../common/sample-base';
import { MessageComponent, Message } from '@syncfusion/ej2-react-notifications';
import { ButtonComponent, CheckBoxComponent, Button, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import { getComponent } from '@syncfusion/ej2-base';
import './icons.css';
import { PropertyPane } from '../common/property-pane';

export class Icons extends SampleBase<{}, {}> {
    public msgDefault: MessageComponent;
    public msgSuccess: MessageComponent;
    public msgInfo: MessageComponent;
    public msgWarning: MessageComponent;
    public msgError: MessageComponent;
    public defaultBtn: ButtonComponent;
    public warningBtn: ButtonComponent;
    public successBtn: ButtonComponent;
    public infoBtn: ButtonComponent;
    public errorBtn: ButtonComponent;

    public defaultClick(): void {
        this.show(this.msgDefault, this.defaultBtn);
    }

    public defaultClosed(): void {
        this.defaultBtn.element.classList.remove('msg-hidden');
    }

    public infoClick(): void {
        this.show(this.msgInfo, this.infoBtn);
    }

    public infoClosed(): void {
        this.infoBtn.element.classList.remove('msg-hidden');
    }

    public successClick(): void {
        this.show(this.msgSuccess, this.successBtn);
    }

    public successClosed(): void {
        this.successBtn.element.classList.remove('msg-hidden');
    }

    public warningClick(): void {
        this.show(this.msgWarning, this.warningBtn);
    }

    public warningClosed(): void {
        this.warningBtn.element.classList.remove('msg-hidden');
    }

    public errorClick(): void {
        this.show(this.msgError, this.errorBtn);
    }

    public errorClosed(): void {
        this.errorBtn.element.classList.remove('msg-hidden');
    }

    public severityIconChange(args: ChangeEventArgs): void {
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

    public closeIconChange(args: ChangeEventArgs): void {
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

    public show(message: Message, btn: Button): void {
        message.visible = true;
        btn.element.classList.add('msg-hidden');
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section msg-icon-section">
                    <div className="content-section">
                        <ButtonComponent id="btn1" ref={(scope) => { this.defaultBtn = scope; }} content="Show Default Message" cssClass="e-outline e-primary msg-hidden" onClick={this.defaultClick.bind(this)}></ButtonComponent>
                        <MessageComponent id="msg_default_icon"  ref={(scope) => { this.msgDefault = scope; }} showCloseIcon={true} closed={this.defaultClosed.bind(this)}>Editing is restricted</MessageComponent>
                        <ButtonComponent id="btn2" ref={(scope) => { this.infoBtn = scope; }} content="Show Info Message" cssClass="e-outline e-primary e-info msg-hidden" onClick={this.infoClick.bind(this)}></ButtonComponent>
                        <MessageComponent id="msg_info_icon" severity="Info" ref={(scope) => { this.msgInfo = scope; }} showCloseIcon={true} closed={this.infoClosed.bind(this)}>Please read the comments carefully</MessageComponent>
                        <ButtonComponent id="btn3" ref={(scope) => { this.successBtn = scope; }} content="Show Success Message" cssClass="e-outline e-primary e-success msg-hidden" onClick={this.successClick.bind(this)}></ButtonComponent>
                        <MessageComponent id="msg_success_icon" severity="Success" ref={(scope) => { this.msgSuccess = scope; }} showCloseIcon={true} closed={this.successClosed.bind(this)}> Your message has been sent successfully</MessageComponent>
                        <ButtonComponent id="btn4" ref={(scope) => { this.warningBtn = scope; }} content="Show Warning Message" cssClass="e-outline e-primary e-warning msg-hidden" onClick={this.warningClick.bind(this)}></ButtonComponent>
                        <MessageComponent id="msg_warning_icon" severity="Warning" ref={(scope) => { this.msgWarning = scope; }} showCloseIcon={true} closed={this.warningClosed.bind(this)}>There was a problem with your network connection</MessageComponent>
                        <ButtonComponent id="btn5" ref={(scope) => { this.errorBtn = scope; }} content="Show Error Message" cssClass="e-outline e-primary e-error msg-hidden" onClick={this.errorClick.bind(this)}></ButtonComponent>
                        <MessageComponent id="msg_error_icon" severity="Error" ref={(scope) => { this.msgError = scope; }} showCloseIcon={true} closed={this.errorClosed.bind(this)}>A problem occurred while submitting your data</MessageComponent>
                    </div>
                </div>

                <div className="col-lg-4 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td style={{ padding: '10px' }}>
                                        <CheckBoxComponent label='Severity Icon' checked={true} change={this.severityIconChange}></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px' }}>
                                        <CheckBoxComponent label='Close Icon' checked={true} change={this.closeIconChange}></CheckBoxComponent>
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
                    <p>In this sample, the Message component is rendered with a severity icon and a close icon. The visibility of the severity icon is handled by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#showicon">showIcon</a> property. The visibility of the close icon is handled by the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/message/#showcloseicon">showCloseIcon</a> property.</p>
                    <p>More information about Message icons can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/message/icons">documentation</a> section.</p>
                </div>
            </div>
        )
    }
}
