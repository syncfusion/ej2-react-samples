import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './template.css';

export class Template extends SampleBase<{}, {hideDialog: boolean}> {
    private dialogInstance: DialogComponent;
    private proxy: any;
    private buttonRef;
    private buttonElement: HTMLElement;
    constructor(props: {}) {
        super(props);
        this.state = {
            hideDialog : true
        };
        this.buttonElement = null;
        this.buttonRef = element => {
            this.buttonElement = element;
        };
    }
    public header(): JSX.Element {
        return (
        <div>
            <span className="e-avatar template-image e-avatar-xsmall e-avatar-circle"></span>
            <div id="dlg-template" title="Nancy" className="e-icon-settings">Nancy</div>
        </div>
        );
    }
    public footerTemplate(): JSX.Element {
        return (
            <div>
                <input id="inVal" className="e-input" type="text" placeholder="Enter your message here!"/>
                <button id="sendButton" className="e-control e-btn e-primary" data-ripple="true">Send</button>
            </div>
        );
    }
    public content(): JSX.Element {
        return (
            <div className="dialogContent">
                <span className="dialogText">Greetings Nancy! When will you share me the source files of the project?</span>
            </div>
        );
    }
    private buttonClick(): void {
        this.setState({ hideDialog: true });
    }
    private dialogClose(): void {
        this.setState({ hideDialog: false });
        this.buttonElement.style.display='inline-block';
    }
    private dialogOpen(): void {
        this.setState({ hideDialog: true });
        this.buttonElement.style.display='none';
    }

    private updateTextValue(): void {
        let enteredVal: HTMLInputElement = document.getElementById('inVal') as HTMLInputElement;
        let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
        if ( enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
        }
        enteredVal.value = '';
    }
    public rendereComplete(): void {
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
  public render(): JSX.Element {
    return (
      <div className='control-pane'>
        <div className='control-section row'>
            <div id='target' className='col-lg-12 target-element'>
            <button className="e-control e-btn dlgbtn dlgbtn-position" ref={this.buttonRef} onClick={this.buttonClick.bind(this)}>Open</button>
            <DialogComponent header={this.header as any}
               footerTemplate= {this.footerTemplate as any}
               content= {this.content as any}
               showCloseIcon= {true}
               ref={dialog => this.dialogInstance = dialog}
               target= '#target'
               width= {'437px'}
               open= {this.dialogOpen.bind(this)}
               close= {this.dialogClose.bind(this)}
               height= {'255px'}
               visible={this.state.hideDialog}
            ></DialogComponent>
            </div>
        </div>
        <div id="action-description">
        <p>
            This example demonstrates the template functionalities of the dialog component. The dialog's header and footer is configured with HTML template. 
            The typed content will be replaced every time when clicking the "send" button.
        </p>
        </div>
        <div id="description">
        <p>
            The dialog component displays HTML template content on the header and footer. The user can set any HTML element as header and footer with the usage of content and footer template properties.
        </p>
        <p>
            More information on the modal behavior of Dialog can be found in
            the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/template/">
            documentation section</a>.
        </p>
        </div>
      </div>
    );
  }
}