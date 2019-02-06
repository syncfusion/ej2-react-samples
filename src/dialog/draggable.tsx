import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './draggable.css';

export class Draggable extends SampleBase<{}, {hideDialog: boolean;}> {
    private defaultDialogInstance: DialogComponent;
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
        <div id='target' className='col-lg-12 control-section dialog-draggable'>        
            <button className='e-control e-btn dlgbtn' ref ={this.buttonRef} onClick={this.buttonClick.bind(this)} id='dialogBtn'>Open Dialog</button>                
            {/* Render alert Dialog */}
            <DialogComponent id='defaultDialog' header='Drag Me!!!' isModal={true} showCloseIcon={true} allowDragging={true} animationSettings={this.animationSettings} width='300px' ref={defaultDialog => this.defaultDialogInstance = defaultDialog}
            target='#target' visible={this.state.hideDialog} open={this.dialogOpen} close={this.dialogClose}>
            This is a dialog with draggable support.
            </DialogComponent>
            <div id="action-description">
                <p>
                This example demonstrates the drag-and-drop operation of the dialog component.
                To begin drag-and-drop operation, select a dialog's header using mouse and dropping them in the desired location.
                The dialog can be draggable within the sample container.
                Enable the "open dialog" button to reopen the dialog if it is closed. 
                </p>
            </div>
            <div id="description">
                <p>
                A drag-and-drop operation is enabled using the <a target="_blank" 
                href="https://ej2.syncfusion.com/react/documentation/api/dialog/#allowdragging">allowDragging </a> property.
                when you configure the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/dialog/#target">target</a> property, the dialog can be draggable within its target container alone.
                The drag-and-drop feature is used to reposition the dialog dynamically.
                </p>
                <p>
                More information on the draggable operation of Dialog can be found in the <a target="_blank" 
                    href="https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#draggable">
                    documentation section</a>.
                </p>
            </div>
        </div>
</div>
    );
  }
}
