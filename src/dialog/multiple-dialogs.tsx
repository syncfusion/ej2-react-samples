import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './multiple-dialogs.css';

export class MultipleDialogs extends SampleBase<{}, {hideDialog1: boolean, hideDialog2: boolean;}> {
    private defaultDialogInstance: DialogComponent;
    private secondDialogInstance: DialogComponent;
    private dlgButton: Object[];
    private dlg2Button: Object[];
    private animationSettings: Object;
    private buttonRef;
    private buttonElement: HTMLElement;
    constructor(props: {}) {
        super(props);
        this.state = {
            hideDialog1 : true,
            hideDialog2 : false
        };
        this.buttonElement = null;
        this.buttonRef = element => {
            this.buttonElement = element;
        };
        this.dlgButton = [{
            click: () => {
                this.setState({ hideDialog2: true });
            },
            buttonModel: { content: 'Next', isPrimary: true }
        }];
        this.dlg2Button = [{
            click: () => {
                this.setState({ hideDialog2: false });
            },
            buttonModel: { content: 'Close', isPrimary: true }
        }];
        this.animationSettings = { effect: 'None' };
    }
    private buttonClick(args:any): void {
        this.setState({ hideDialog1: true });
    }

    private dialogClose(): void {
        this.setState({ hideDialog1: false });
        this.buttonElement.style.display='inline-block';
    }

    private dialogClose2(): void {
        this.setState({ hideDialog2: false });
        this.buttonElement.style.display='none';
    }

    private dialogOpen(): void {
        this.buttonElement.style.display='none';
    }

  public render(): JSX.Element {
    return (
      <div className = 'control-pane'>
        <div id='target' className='col-lg-12 control-section dialog-target'>
            <button className='e-control e-btn dlgbtn' ref={this.buttonRef} onClick={this.buttonClick.bind(this)} id='dialogBtn'>Open Dialog</button>                
            {/* Render alert Dialog */}
            <DialogComponent id='defaultDlg' header='First Dialog' visible={this.state.hideDialog1} showCloseIcon={true} animationSettings={this.animationSettings} width='330px' ref={defaultDialog => this.defaultDialogInstance = defaultDialog}
            target='#target' buttons={this.dlgButton} open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)}>
            <p>
                This is the first dialog and acts as a parent dialog, you can open the second (child) dialog by clicking "Next".
            </p>
            </DialogComponent>
            {/* Render confirmation Dialog */}
            <DialogComponent id='secondDialog' isModal={true} header='Second Dialog' showCloseIcon={true} visible={this.state.hideDialog2} animationSettings={this.animationSettings} width='285px' ref={secondDialog => this.secondDialogInstance = secondDialog}
            target='#target' buttons={this.dlg2Button} open={this.dialogOpen.bind(this)} close={this.dialogClose2.bind(this)}>
            <p>
                This is the second dialog and act as a child dialog.
            </p>
            </DialogComponent>
            <div id="action-description">
                <p>
                This example demonstrates how to display multiple dialogs one over the other.
                The second dialog is configured with draggable behavior to adjust its position.
                You can invoke the second dialog from first dialog's button.
                Enable the "open dialog" button to reopen the dialog if the first dialog is closed.
                </p>
            </div>
            <div id="description">
                <p>
                You can configure the dialog as a parent and child, and invoke the child dialog from its parent dialog.
                In addition, multiple dialogs can be shown at a time in a page.
                The Z- index order will be controlled automatically in the browser and manually using the<a target="_blank" 
                href="https://ej2.syncfusion.com/react/documentation/api/dialog/#zindex"> zIndex </a> property.
                </p>
            </div>
        </div>
</div>
    );
  }
}
