import * as React from 'react';
import { useState } from 'react';
import {
    DialogComponent,
    ButtonPropsModel,
    AnimationSettingsModel,
  } from '@syncfusion/ej2-react-popups';

import { updateSampleSection } from '../common/sample-base';
import './multiple-dialogs.css';

function MultipleDialogs() {
    React.useEffect(() => {
      updateSampleSection();
    }, []);
    let defaultDialogInstance: DialogComponent;
    let secondDialogInstance: DialogComponent;
    let dlgButton: ButtonPropsModel[];
    let dlg2Button: ButtonPropsModel[];
    let animationSettings: AnimationSettingsModel;
    let buttonEle: HTMLButtonElement;
    const [display, setDisplay] = useState('none');
    const [status1, setStatus1] = useState({ hideDialog1: true });
    const [status2, setStatus2] = useState({ hideDialog2: false });
    let buttonRef: React.Ref<HTMLButtonElement> = (element) => {
      buttonEle = element;
    };
    dlgButton = [
      {
        click: () => {
          setStatus2({ hideDialog2: true });
        },
        buttonModel: { content: 'Next', isPrimary: true },
      },
    ];
    dlg2Button = [
      {
        click: () => {
          setStatus2({ hideDialog2: false });
        },
        buttonModel: { content: 'Close', isPrimary: true },
      },
    ];
    animationSettings = { effect: 'None' };
  
    function buttonClick(args: any): void {
      setStatus1({ hideDialog1: true });
    }
  
    function dialogClose(): void {
      setStatus1({ hideDialog1: false });
      setDisplay('inline-block');
    }
  
    function dialogClose2(): void {
      setStatus2({ hideDialog2: false });
      setDisplay('none');
    }
  
    function dialogOpen(): void {
      setDisplay('none');
    }
    return (
      <div className="control-pane">
        <div id="target" className="col-lg-12 control-section dialog-target">
          <button
            className="e-control e-btn dlgbtn"
            ref={buttonRef}
            style={{ display: display }}
            onClick={buttonClick}
            id="dialogBtn"
          >
            Open Dialog
          </button>
          {/* Render alert Dialog */}
          <DialogComponent
            id="multipleDialog"
            header="First Dialog"
            visible={status1.hideDialog1}
            showCloseIcon={true}
            animationSettings={animationSettings}
            width="330px"
            ref={(defaultDialog) => (defaultDialogInstance = defaultDialog)}
            target="#target"
            buttons={dlgButton}
            open={dialogOpen}
            close={dialogClose}
          >
            <p>
              This is the first dialog and acts as a parent dialog, you can open
              the second (child) dialog by clicking "Next".
            </p>
          </DialogComponent>
          {/* Render confirmation Dialog */}
          <DialogComponent
            id="secondDialog"
            isModal={true}
            header="Second Dialog"
            showCloseIcon={true}
            visible={status2.hideDialog2}
            animationSettings={animationSettings}
            width="285px"
            ref={(secondDialog) => (secondDialogInstance = secondDialog)}
            target="#target"
            buttons={dlg2Button}
            open={dialogOpen}
            close={dialogClose2}
          >
            <p>This is the second dialog and act as a child dialog.</p>
          </DialogComponent>
          <div id="action-description">
            <p>
              This example demonstrates how to display multiple dialogs one over
              the other. The second dialog is configured with draggable behavior
              to adjust its position. You can invoke the second dialog from first
              dialog's button. Enable the "open dialog" button to reopen the
              dialog if the first dialog is closed.
            </p>
          </div>
          <div id="description">
            <p>
              You can configure the dialog as a parent and child, and invoke the
              child dialog from its parent dialog. In addition, multiple dialogs
              can be shown at a time in a page. The Z- index order will be
              controlled automatically in the browser and manually using the
              <a
                target="_blank"
                href="https://ej2.syncfusion.com/react/documentation/api/dialog/#zindex"
              >
                {' '}
                zIndex{' '}
              </a>{' '}
              property.
            </p>
          </div>
        </div>
      </div>
    );
}
export default MultipleDialogs;