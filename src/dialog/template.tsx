import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import {detach, isNullOrUndefined} from '@syncfusion/ej2-base';
import './template.css';


export class Template extends SampleBase<{}, {}> {
    private dialogInstance: DialogComponent;
    private proxy: any;
    buttonClick() {
        this.dialogInstance.show();
    }
    dialogClose() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='inline-block';
    }
    dialogOpen() {
        (document.querySelectorAll('.dlgbtn')[0] as HTMLElement).style.display='none';
    }

    updateTextValue () : void {
        let enteredVal: HTMLInputElement = document.getElementById('inVal') as HTMLInputElement;
        let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
        let dialogTextWrap : HTMLElement = document.getElementsByClassName('dialogContent')[0] as HTMLElement;
        if ( enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
        }
        enteredVal.value = '';
    }
    rendereComplete() {
        this.proxy = this;
        this.dialogInstance.target = document.getElementById('target');
        (document.getElementById('sendButton')as HTMLElement).onkeydown = (e: any) => {
                if (e.keyCode === 13) { this.updateTextValue(); }
        };

        (document.getElementById('inVal')as HTMLElement).onkeydown = (e: any) => {
            if (e.keyCode === 13) { this.updateTextValue(); }
        };

        document.getElementById('sendButton').onclick = (): void => {
            this.updateTextValue();
        };
    }
  render() {
    const icontemp: string = '<button id="sendButton" class="e-control e-btn e-primary" data-ripple="true">' + 'Send</button>';
    const headerimg: string = '<img class="img2" src="src/dialog/images/1.png" alt="header image"/>';
    const message: string = 'Greetings Nancy! When will you share me the source files of the project?';
    return (
      <div className='control-pane'>
        <div className='control-section row'>
            <div id='target' className='col-lg-10 target-element' style={{'min-height':'350px'}}>
            <button className="e-control e-btn dlgbtn" style={{position:'absolute'}} onClick={this.buttonClick.bind(this)}>Open</button>
            <DialogComponent 
               header={headerimg + '<div title="Nancy" class="e-icon-settings e-icons" style="padding: 3px;">Nancy</div>'}
               footerTemplate= {'<input id="inVal" class="e-input" type="text" placeholder="Enter your message here!"/>' + icontemp }
               content= {'<div class="dialogContent"><span class="dialogText">' + message + '</span></div>'}
               showCloseIcon= {true}
               ref={dialog => this.dialogInstance = dialog}
               target= '#target'
               width= {'65%'}
               open= {this.dialogOpen.bind(this)}
               close= {this.dialogClose.bind(this)}
               height= {'85%'}
            ></DialogComponent>
            </div>
        </div>
        <div id="action-description">
        <p>
        This sample demonstrates the template functionalities of the dialog component. The dialog's header and footer is configured with HTML template. 
        The typed content will be replaced every time when clicking the "send" button.
        </p>
        </div>
        <div id="description">
        <p>
        The dialog component displays HTML template content on the header and footer. The user can set any HTML element as header and footer with the usage of content and footer template properties.
        </p>
        <p>More information on the modal behavior of Dialog can be found in
        the <a target="_blank" href="http://ej2.syncfusion.com/15.4.23/react/documentation/dialog/template.html">
        documentation section</a>.</p>
        </div>
      </div>
    )
  }
}