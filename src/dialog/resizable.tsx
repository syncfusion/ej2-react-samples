import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './resizable.css';

export class Resizable extends SampleBase<{}, {hideDialog: boolean;}> {
    private resizableDialogInstance: DialogComponent;
    private animationSettings: Object;
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
        this.dialogClose = this.dialogClose.bind(this);
        this.dialogOpen = this.dialogOpen.bind(this);
        this.animationSettings = { effect: 'None' };
      }

    private buttonClick(args: any): void {
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

  public render(): JSX.Element {
    return (
      <div className = 'control-pane'>
        <div id='target' className='col-lg-12 control-section dialog-resizable'>        
            <button className='e-control e-btn dlgbtn' ref ={this.buttonRef} onClick={this.buttonClick.bind(this)} id='dialogBtn'>Open Dialog</button>                
            {/* Render resizable Dialog */}
            <DialogComponent id='resizableDialog' header='Resize Me' allowDragging={true} showCloseIcon={true} animationSettings={this.animationSettings} width='300px' ref={resizableDialog => this.resizableDialogInstance = resizableDialog}
            target='#target' visible={this.state.hideDialog} enableResize={true} open={this.dialogOpen} close={this.dialogClose}>
            This is a dialog with resizable support.
            </DialogComponent>
            <div id="action-description">
            <p>
                This example demonstrates the resize operation of the dialog component. To resize the modal dialog, select and resize a dialog using its handle (grip) within the sample container.
                The "open dialog" button is used to reopen the dialog if it is closed.
            </p>
            </div>
            <div id="description">
            <p>
                Users can create resizable modal dialog by setting the enableResize property to true, which is used to change the size of a dialog dynamically and view its content with expanded mode.
                When you configure the target property along with enableResize property, the dialog can be resized within its specified target container.
            </p>
            </div>
        </div>
</div>
    );
  }
}
