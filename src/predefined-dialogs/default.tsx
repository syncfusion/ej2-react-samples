
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {DialogUtility} from '@syncfusion/ej2-react-popups';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './default.css';
let dialogObj;
export class DefaultFunctionalities extends SampleBase<{}, { }> {
    
    
    constructor(props: {}) {
        super(props);
        this.state = { };
    }
    buttonClick(args) {
        if (args.target.textContent.toLowerCase() == 'alert') {
            document.getElementById("statusText").style.display="none";
            dialogObj = DialogUtility.alert({
                title: 'Low Battery',
                content: '10% of battery remaining',
                okButton: { click:this.alertOkAction.bind(this)},
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
          });
        }
       
        else if (args.target.textContent.toLowerCase() == 'confirm') {
            document.getElementById("statusText").style.display="none";
            dialogObj = DialogUtility.confirm({
                title: ' Delete Multiple Items',
                content: "Are you sure you want to permanently delete these items?",
                okButton: { click:this.confirmOkAction.bind(this)},
                cancelButton: { click:this.confirmCancelAction.bind(this)},
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
            });
        }
        else if(args.target.textContent.toLowerCase() == 'prompt') {
            document.getElementById("statusText").style.display="none";
            dialogObj = DialogUtility.confirm({
            title: 'Join Chat Group',
            content: '<p>Enter your name: </p><input id= "inputEle" type="text" name="Required" class="e-input" placeholder="Type here.." />',
            okButton: {  click:this.promptOkAction.bind(this)},
            cancelButton: {  click:this.promptCancelAction.bind(this)},
            position: { X: 'center', Y: 'center' },
            closeOnEscape: true
          });
        }
    }
    alertOkAction(){
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user canceled the dialog box.";
        document.getElementById("statusText").style.display="block";
    };
    confirmOkAction(){
        dialogObj.hide();
        document.getElementById("statusText").innerHTML=" The user confirmed the dialog box";
        document.getElementById("statusText").style.display="block";
    }
    confirmCancelAction(){
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user canceled the dialog box.";
        document.getElementById("statusText").style.display="block";
    }
    promptOkAction(){
        let value:string ;
        value = (document.getElementById("inputEle")as any).value;
        if (value==""){
            dialogObj.hide();
            document.getElementById("statusText").innerHTML = "The user's input is returned as\" \" ";
            document.getElementById("statusText").style.display="block";
        }
        else{
            dialogObj.hide();
            document.getElementById("statusText").innerHTML="The user's input is returned as" +" "+ value;
            document.getElementById("statusText").style.display="block";
        }
    }
    promptCancelAction(){
        dialogObj.hide();
        document.getElementById("statusText").innerHTML="The user canceled the prompt dialog";
        document.getElementById("statusText").style.display="block";
    }

    render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div id='predefinedDialogDefault' className='col-lg-12 control-section dialog-target'>
                    {/* Buttons to open the corresponding Predefined Dialog */}
                    <ButtonComponent id="alertBtn" cssClass="e-danger e-control e-btn dlgbtn"  onClick={this.buttonClick.bind(this)}>Alert</ButtonComponent>
                    <ButtonComponent id="confirmBtn" cssClass="e-success e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)}>Confirm</ButtonComponent>
                    <ButtonComponent id="promptBtn" isPrimary cssClass="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)}>Prompt</ButtonComponent>
                    <span id="statusText"></span>             
                </div>
                <div id="action-description">
                    <p>This example demonstrates the usage of dialog utility to display various forms of dialog, including<b> alert, confirm </b>and <b>prompt</b> dialog.
                        Three buttons have been added to this example, click one of them to open the relevant dialog box.</p>
                </div>
                <div id="description">
                    <p>The predefined dialogs are used to display messages and collect user input within a web page. The following are the three types of Dialogs:
                    </p>
                    <ul>
                        <li><code>Alert</code>- Used to show errors, warnings, and information that need user awareness.</li>
                        <li><code>Confirm</code> - Used to get approval from user that appears before any critical action.</li>
                        <li><code>Prompt</code> - Used to get input from the user. </li>
                    </ul>
                    <p>
                        <b>See also</b>
                    </p>
                    <ul>
                        <li> <a target="_blank" 
                        href="https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/">
                    Getting started with predefined dialogs </a>    
                    </li>
                    </ul>
                </div>
            </div>
        )
    }
}
