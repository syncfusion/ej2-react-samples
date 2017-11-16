import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './basic.css';

export class Basic extends SampleBase<{}, {}> {
    private alertDialogInstance: DialogComponent;
    private confirmDialogInstance: DialogComponent;
    private promptDialogInstance: DialogComponent;
    private alertButtons:Object[]= [{
            // Click the footer buttons to hide the Dialog
            'click': () => {
            this.alertDialogInstance.hide();
            },
            buttonModel: { content: 'Dismiss', cssClass: 'e-flat', isPrimary: true }
        }];
    private confirmButton:Object[]= [{
            'click': () => {
                this.confirmDialogInstance.hide();
            },
            buttonModel: { content: 'Yes', cssClass: 'e-flat', isPrimary: true }},
            {
                'click': () => {
                this.confirmDialogInstance.hide();
            },
            buttonModel: { content: 'No', cssClass: 'e-flat' }
        }];

    private promptButtons:Object[]= [{
            'click': () => {
                this.promptDialogInstance.hide();
            },
            buttonModel: { content: 'Connect', cssClass: 'e-flat', isPrimary: true }
        },
        {
            'click': () => {
                this.promptDialogInstance.hide();
            },
             buttonModel: { cssClass: 'e-flat', content: 'Cancel' }
        }];

    private animationSettings:Object= { effect: 'None' };
    
    buttonClick(args:any){
        if(args.target.innerHTML.toLowerCase()=='alert'){
            this.alertDialogInstance.show();
        }
        else if(args.target.innerHTML.toLowerCase()=='confirm'){
            this.confirmDialogInstance.show();
        }
        else if(args.target.innerHTML.toLowerCase()=='prompt')
            this.promptDialogInstance.show();
    }

    dialogClose() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='inline-block';
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).style.display='inline-block';
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).style.display='inline-block';
    }
    dialogOpen() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='none';
        (document.querySelectorAll('.dlgbtn')[1] as HTMLElement).style.display='none';
        (document.querySelectorAll('.dlgbtn')[2] as HTMLElement).style.display='none';
    }

    onFocus(args:any){
        document.getElementById('password').classList.add('e-input-focus');
    }
    onBlur(args:any){
        document.getElementById('password').classList.remove('e-input-focus');
    }

  render() { 
    return (
      <div className = 'control-pane'>
        <div id='target' className='control-section'>
            {/* Buttons to open the corresponding Dialog */}
            <button className="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)} id="alertBtn">Alert</button>        
            <button className="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)} id="confirmBtn">Confirm</button>        
            <button className="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)} id="promptBtn">Prompt</button>        
            {/* Render alert Dialog */}
            <DialogComponent id="alertDialog" header='Low Battery' animationSettings={this.animationSettings} width='250px' content='10% of battery remaining' ref={alertdialog => this.alertDialogInstance = alertdialog}
            target='#target' visible={true} buttons={this.alertButtons} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}></DialogComponent>
            {/* Render confirmation Dialog */}
            <DialogComponent id="confirmDialog" header='Delete Multiple Items' animationSettings={this.animationSettings} width='400px' content='Are you sure you want to permanently delete all of these items?' ref={dialog => this.confirmDialogInstance = dialog}
            target='#target' visible={false} buttons={this.confirmButton} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}></DialogComponent>
            {/* Render prompt Dialog */}
            <DialogComponent id="promptDialog" header='Join Wi-Fi network' showCloseIcon={true} animationSettings={this.animationSettings} width='330px' ref={dialog => this.promptDialogInstance = dialog}
            target='#target' buttons={this.promptButtons} visible={false} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}>
            {/* Prompt Dialog content  */}
               <table>
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
                    <span id='password' className="e-input-group">
                    <input type="password" onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} name="Required" className="e-input" />
                    </span></td>
                </tr>
            </table>
            </DialogComponent>
        </div>
    <div id="action-description">
    <p>
    This sample demonstrates the different types of Dialog like alert, confirm, and prompt.
    The buttons “Alert”, “Confirm”, and “Prompt” will be shown after closing the alert Dialog.
    These buttons are used to open the corresponding Dialogs.
    </p>
    </div>
    <div id="description">
        <p>
        The Dialog control is used to display messages such as supplementary content like images and text, 
        and an interactive content like form components within a web page. The following are the two types of Dialogs:
        <ul>
            <li>Modal - The user should work with the Dialog before interacting with the parent application.</li>
            <li>Modeless - It allows to interact with the parent application when the Dialog stay on the page.</li>
        </ul>
        </p>
        <p>
        More information on the Dialog instantiation can be found in the <a target="_blank" 
            href="http://ej2.syncfusion.com/react/documentation/dialog/getting-started.html">
            documentation section</a>.
            </p>
    </div>
</div>
    )
  }
}
