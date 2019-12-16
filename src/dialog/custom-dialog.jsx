import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './custom-dialog.css';
export class Basic extends SampleBase {
    constructor(props) {
        super(props);
        this.state = {
            hideAlertDialog: false,
            hideConfirmDialog: false,
            hidePromptDialog: false
        };
        this.alertButtonRef = element => {
            this.alertButtonEle = element;
        };
        this.confirmButtonRef = element => {
            this.confirmButtonEle = element;
        };
        this.promptButtonRef = element => {
            this.promptButtonEle = element;
        };
        this.spanRef = element => {
            this.spanEle = element;
        };
        this.alertButtons = [{
                // Click the footer buttons to hide the Dialog
                click: () => {
                    this.setState({ hideAlertDialog: false });
                },
                buttonModel: { content: 'Dismiss', isPrimary: true }
            }];
        this.confirmButton = [{
                click: () => {
                    this.setState({ hideConfirmDialog: false });
                },
                buttonModel: { content: 'Yes', isPrimary: true }
            },
            {
                click: () => {
                    this.setState({ hideConfirmDialog: false });
                },
                buttonModel: { content: 'No' }
            }];
        this.promptButtons = [{
                click: () => {
                    this.setState({ hidePromptDialog: false });
                },
                buttonModel: { content: 'Connect', isPrimary: true }
            },
            {
                click: () => {
                    this.setState({ hidePromptDialog: false });
                },
                buttonModel: { content: 'Cancel' }
            }];
        this.animationSettings = { effect: 'None' };
    }
    buttonClick(args) {
        if (args.target.innerHTML.toLowerCase() == 'alert') {
            this.setState({ hideAlertDialog: true });
        }
        else if (args.target.innerHTML.toLowerCase() == 'confirm') {
            this.setState({ hideConfirmDialog: true });
        }
        else if (args.target.innerHTML.toLowerCase() == 'prompt')
            this.setState({ hidePromptDialog: true });
    }
    dialogClose() {
        this.setState({
            hideAlertDialog: false,
            hideConfirmDialog: false,
            hidePromptDialog: false
        });
        this.alertButtonEle.style.display = 'inline-block';
        this.confirmButtonEle.style.display = 'inline-block';
        this.promptButtonEle.style.display = 'inline-block';
    }
    dialogOpen() {
        this.alertButtonEle.style.display = 'none';
        this.confirmButtonEle.style.display = 'none';
        this.promptButtonEle.style.display = 'none';
    }
    onFocus(args) {
        this.spanEle.classList.add('e-input-focus');
    }
    onBlur(args) {
        this.spanEle.classList.remove('e-input-focus');
    }
    render() {
        return (<div className='control-pane'>
                <div id='target' className='col-lg-12 control-section dialog-target'>
                    
                    <button className="e-control e-btn dlgbtn" ref={this.alertButtonRef} onClick={this.buttonClick.bind(this)} id="alertBtn">Alert</button>
                    <button className="e-control e-btn dlgbtn" ref={this.confirmButtonRef} onClick={this.buttonClick.bind(this)} id="confirmBtn">Confirm</button>
                    <button className="e-control e-btn dlgbtn" ref={this.promptButtonRef} onClick={this.buttonClick.bind(this)} id="promptBtn">Prompt</button>
                    
                    <DialogComponent id="alertDialog" header='Low Battery' visible={this.state.hideAlertDialog} animationSettings={this.animationSettings} width='250px' content='10% of battery remaining' ref={alertdialog => this.alertDialogInstance = alertdialog} target='#target' buttons={this.alertButtons} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}></DialogComponent>
                    
                    <DialogComponent id="confirmDialog" header='Delete Multiple Items' visible={this.state.hideConfirmDialog} showCloseIcon={true} animationSettings={this.animationSettings} width='400px' content='Are you sure you want to permanently delete these items ?' ref={dialog => this.confirmDialogInstance = dialog} target='#target' buttons={this.confirmButton} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}></DialogComponent>
                    
                    <DialogComponent id="promptDialog" header='Join Wi-Fi network' visible={this.state.hidePromptDialog} showCloseIcon={true} animationSettings={this.animationSettings} width='330px' ref={dialog => this.promptDialogInstance = dialog} target='#target' buttons={this.promptButtons} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}>
                        
                        <table>
                            <tbody>
                                <tr>
                                    <td>SSID:</td>
                                </tr>
                                <tr>
                                    <td><b>AndroidAP</b></td>
                                </tr>
                                <tr>
                                    <td>Password:</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span id='password' ref={this.spanRef} className="e-input-group">
                                            <input type="password" onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} name="Required" className="e-input"/>
                                        </span></td>
                                </tr>
                            </tbody>
                        </table>
                    </DialogComponent>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates that you can create different types of custom dialogs such as alert, confirm, and prompt dialogs. The buttons “alert”, “confirm”, and “prompt” are used to open the corresponding dialogs.
    </p>
                </div>
                <div id="description">
                    <p>
                        The dialog component is used to create alert, prompt, and confirmation dialogs using content, and buttons property. The content property accepts both string and HTML element as content.
        </p>
                    <ul>
                        <li>Alert - Used to show errors, warnings, and information that needs user awareness.</li>
                        <li>Prompt - Used to get input from the user.</li>
                        <li>Confirmation - Used to get approval from user that appears before any critical action.</li>
                    </ul>
                    <p>
                        More information on the Dialog instantiation can be found in the <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/dialog/getting-started/">
                            documentation section</a>.
            </p>
                </div>
            </div>);
    }
}
