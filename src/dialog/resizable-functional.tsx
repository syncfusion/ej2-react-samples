import * as React from 'react';
import { useState } from 'react';
import {
    DialogComponent,
    AnimationSettingsModel,
} from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import './resizable.css';

function Resizable() {
    React.useEffect(() => {
      updateSampleSection();
    }, []);
    let resizableDialogInstance: DialogComponent;
    let animationSettings: AnimationSettingsModel;
    let buttonEle: HTMLButtonElement;
    const [display, setDisplay] = useState('none');
    const [status, setStatus] = useState({ hideDialog: true });
    let buttonRef: React.Ref<HTMLButtonElement> = (element) => {
      buttonEle = element;
    };
    animationSettings = { effect: 'None' };
  
    function buttonClick(args: any): void {
      setStatus({ hideDialog: true });
    }
  
    function dialogClose(): void {
      setStatus({ hideDialog: false });
      setDisplay('inline-block');
    }
  
    function dialogOpen(): void {
      setStatus({ hideDialog: true });
      setDisplay('none');
    }
  
    return (
      <div className="control-pane">
        <div id="target" className="col-lg-12 control-section dialog-resizable">
          <button
            className="e-control e-btn dlgbtn"
            ref={buttonRef}
            style={{ display: display }}
            onClick={buttonClick}
            id="dialogBtn"
          >
            Open Dialog
          </button>
          {/* Render resizable Dialog */}
          <DialogComponent
            id="resizableDialog"
            header="Resize Me!!!"
            allowDragging={true}
            showCloseIcon={true}
            animationSettings={animationSettings}
            width="300px"
            ref={(resizableDialog) => (resizableDialogInstance = resizableDialog)}
            target="#target"
            visible={status.hideDialog}
            enableResize={true}
            resizeHandles={['All']}
            open={dialogOpen}
            close={dialogClose}
          >
            This is a dialog with resizable support.
          </DialogComponent>
          <div id="action-description">
            <p>
              This sample demonstrates the resize operation of the dialog control
              in all directions. To resize the modal dialog, select and resize a
              dialog using its handle (grip) or hover on any of the edges or
              border of the dialog within the sample container. The "open dialog"
              button is used to reopen the dialog if it is closed.
            </p>
          </div>
          <div id="description">
            <p>
              Users can create resizable modal dialog by setting the enableResize
              property to true, which is used to change the size of a dialog
              dynamically and view its content with expanded mode. The
              resizeHandles property can also be configured for which directions
              the dialog should resize. When you configure the target property
              along with enableResize property, the dialog can be resized within
              its specified target container.
            </p>
          </div>
        </div>
      </div>
    );
}
export default Resizable;