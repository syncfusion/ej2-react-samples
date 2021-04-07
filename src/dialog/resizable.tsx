import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './resizable.css';

export class Resizable extends SampleBase<{}, { hideDialog: boolean; }> {
    private resizableDialogInstance: DialogComponent;
    private animationSettings: AnimationSettingsModel;
    private buttonEle: HTMLButtonElement;
    private buttonRef: React.Ref<HTMLButtonElement>;
    constructor(props: {}) {
        super(props);
        this.state = {
            hideDialog: true
        };
        this.buttonRef = element => {
            this.buttonEle = element;
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
        this.buttonEle.style.display = 'inline-block';
    }

    private dialogOpen(): void {
        this.setState({ hideDialog: true });
        this.buttonEle.style.display = 'none';
    }

    public render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div id='target' className='col-lg-12 control-section dialog-resizable'>
                    <button className='e-control e-btn dlgbtn' ref={this.buttonRef} onClick={this.buttonClick.bind(this)} id='dialogBtn'>Open Dialog</button>
                    {/* Render resizable Dialog */}
                    <DialogComponent id='resizableDialog' header='Resize Me!!!' allowDragging={true} showCloseIcon={true} animationSettings={this.animationSettings} width='300px' ref={resizableDialog => this.resizableDialogInstance = resizableDialog}
                        target='#target' visible={this.state.hideDialog} enableResize={true} resizeHandles={['All']} open={this.dialogOpen} close={this.dialogClose}>
                        This is a dialog with resizable support.
            </DialogComponent>
                    <div id="action-description">
                        <p>
                            This sample demonstrates the resize operation of the dialog control in all directions. To resize the modal dialog, select and resize a dialog using its handle (grip) or hover on any of the edges or border of the dialog within the sample container.
                            The "open dialog" button is used to reopen the dialog if it is closed.
                        </p>
                    </div>
                    <div id="description">
                        <p>
                            Users can create resizable modal dialog by setting the enableResize property to true, which is used to change the size of a dialog dynamically and view its content with expanded mode.
                            The resizeHandles property can also be configured for which directions the dialog should resize.
                            When you configure the target property along with enableResize property, the dialog can be resized within its specified target container.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
