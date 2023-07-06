import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {  DialogUtility} from '@syncfusion/ej2-react-popups';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './customization.css';
let dialogObj;
export class Customization extends SampleBase<{}, { }> {
  constructor(props: {}) {
      super(props);
      this.state = { };
  }
  buttonClick(args) {
      if (args.target.innerHTML.toLowerCase() == 'alert') {
        document.getElementById("statusText").style.display="none";
        dialogObj = DialogUtility.alert({
          title: '',
          content:'<div class="new" style="display: flex;flex-direction: column;align-items: center;"><p><span class="circle-border"><span class="e-icons e-check" style="font-size: 30px; color: green; padding:5px 0 0 0; font-weight: 700;"></span></span></p><p><b style="font-size:25px; font-weight: 500 !important;">Good job!</b></p><p>You clicked the button!</p></div>',
          okButton: {  text: 'OK',click:this.alertOkAction.bind(this)},
          position: { X: 'center', Y: 'center' },
          width:'240px',
          closeOnEscape: true
        });
      } else if (args.target.innerHTML.toLowerCase() == 'confirm') {
        document.getElementById("statusText").style.display="none";
        dialogObj = DialogUtility.confirm({
          title: ' Delete file',
          content: '<p ><span class= "e-icons e-changes-reject" style="float: left;padding-right: 10px;font-size: 25px;display: inline;"></span>Are you sure you want to permanently delete this file?</p><p class="fileEdit"><span class= "e-icons e-image" style="font-size: 45px;"></span><span>failed personas.png<br/>Item type:PNG File<br/>Dimenstion: 1384 * 782<br/>Size:374 KB<br/>Original Location: C:/Users/Images</span></p>',
          okButton: {  text: 'YES',click:this.confirmOkAction.bind(this)},
          cancelButton: {  text: 'No',click:this.confirmCancelAction.bind(this)},
          position: { X: 'center', Y: 'center' },
          width:'420px',
          closeOnEscape: true
        });
      } else if (args.target.innerHTML.toLowerCase() == 'prompt') {
        document.getElementById("statusText").style.display="none";
        dialogObj = DialogUtility.confirm({
          title: 'Join Wi-Fi network',
          content: '<table class="Table"><tbody><tr><td>SSID: <b>AndroidAP</b></td></tr><tr> <td>Password:</td> </tr> <tr> <td> <span class="e-input-group"> <input type="password" id="password" name="Required" class="e-input"> </span> </td> </tr> </tbody> </table> ',
          okButton: { text: 'OK',click:this.promptOkAction.bind(this)},
          cancelButton: { click:this.promptCancelAction.bind(this)},
          position: { X: 'center', Y: 'center' },
          width: '240px',
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
    value = (document.getElementById("password")as any).value;
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
      <div id='predefinedDialogCustomization' className='col-lg-12 control-section dialog-target'>
        {/* Buttons to open the corresponding Predefined Dialog */}
        <ButtonComponent id="alertBtn" cssClass="e-danger e-control e-btn dlgbtn"  onClick={this.buttonClick.bind(this)}>Alert</ButtonComponent>
        <ButtonComponent id="confirmBtn" cssClass="e-success e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)}>Confirm</ButtonComponent>
        <ButtonComponent id="promptBtn" isPrimary cssClass="e-control e-btn dlgbtn" onClick={this.buttonClick.bind(this)}>Prompt</ButtonComponent>
        <span id="statusText"></span>              
      </div>
      <div id="action-description">
        <p>This example demonstrates how to customize the content of the predefined Alert, Confirm and Prompt dialogs. Three buttons have been added to this example, click one of them to open the relevant dialog box.</p>
      </div>
      <div id="description">
        <p>The predefined dialog is used to display messages such as supplemental content like graphics, text, and interactive content like form components within a web page. It can use the <code>
          content </code> property to load customized content.
          The content property accepts both string and HTML elements as content.
        </p>
        <p>
        <b>See also</b>
        </p>
        <ul>
          <li> 
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/">Customization of predefined dialogs </a>    
          </li>
        </ul>
      </div>
    </div>
  )
  }
} 
