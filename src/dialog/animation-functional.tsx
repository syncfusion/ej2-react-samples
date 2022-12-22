import * as React from 'react';
import { useState } from 'react';
import {
  DialogComponent,
  ButtonPropsModel,
  AnimationSettingsModel,
} from '@syncfusion/ej2-react-popups';

import { updateSampleSection } from '../common/sample-base';
import './animation.css';

function Animation() {
    React.useEffect(() => {
      updateSampleSection();
    }, []);
  
    let defaultDialogInstance: DialogComponent;
    let dlgButton: ButtonPropsModel[];
    let animationSettings: AnimationSettingsModel;
    const [status, setStatus] = useState({ hideDialog: true });
  
    dlgButton = [
      {
        click: dialogButtonClick,
        buttonModel: { content: 'Hide', isPrimary: true },
      },
    ];
    animationSettings = { effect: 'Zoom' };
    function dialogButtonClick() {
      setStatus({ hideDialog: false });
    }
    function dialogClose() {
      setStatus({ hideDialog: false });
    }
    function buttonClick(args: any): void {
      let dialog: DialogComponent = defaultDialogInstance;
      let effects = args.target.id;
      let txt: string = args.target.parentElement.innerText;
      txt = txt === 'Zoom In/Out' ? 'Zoom In or Out' : txt;
      dialog.content =
        'The dialog is configured with animation effect. It is opened or closed with "' +
        txt +
        '" animation.';
      dialog.animationSettings = { effect: effects, duration: 400 };
      setStatus({ hideDialog: true });
    }
  
    return (
      <div className="control-pane">
        <div id="target" className="col-lg-12 control-section dialog-target">
          <div id="customization">
            <div className="animate">
              <button
                className="e-control e-btn e-outline e-primary"
                onClick={buttonClick}
                id="Zoom"
              >
                Zoom
              </button>
            </div>
            <div className="animate">
              <button
                className="e-control e-btn e-outline e-primary"
                onClick={buttonClick}
                id="FlipXDown"
              >
                FlipX Down
              </button>
            </div>
            <div className="animate">
              <button
                className="e-control e-btn e-outline e-primary"
                onClick={buttonClick}
                id="FlipXUp"
              >
                FlipX Up
              </button>
            </div>
            <div className="animate">
              <button
                className="e-control e-btn e-outline e-primary"
                onClick={buttonClick}
                id="FlipYLeft"
              >
                FlipY Left
              </button>
            </div>
            <div className="animate">
              <button
                className="e-control e-btn e-outline e-primary"
                onClick={buttonClick}
                id="FlipYRight"
              >
                FlipY Right
              </button>
            </div>
          </div>
          <DialogComponent
            id="AnimationDialog"
            isModal={true}
            header="Animation Dialog"
            showCloseIcon={true}
            animationSettings={animationSettings}
            width="285px"
            ref={(defaultDialog) => (defaultDialogInstance = defaultDialog)}
            target="#target"
            buttons={dlgButton}
            visible={status.hideDialog}
            beforeClose={dialogClose}
          >
            <span>
              The dialog is configured with animation effect. It is opened or
              closed with "Zoom In or Out" animation.
            </span>
          </DialogComponent>
          <div id="action-description">
            <p>
              This example demonstrates how to open or close the dialog with
              animation effects by clicking the appropriate button.
            </p>
          </div>
          <div id="description">
            <p>
              The dialog can be opened or closed with animation effect using the{' '}
              <a
                target="_blank"
                href="https://ej2.syncfusion.com/react/documentation/api/dialog/#animationsettings"
              >
                animationSettings
              </a>{' '}
              property. You can also customize the duration of animation and delay
              to begin animation. Disables the dialog's animation by setting the
              animation effect as none.
            </p>
            <p>
              More information on the animation effect of Dialog can be found in
              the{' '}
              <a
                target="_blank"
                href="https://ej2.syncfusion.com/react/documentation/dialog/animation/"
              >
                documentation section
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
}
  
export default Animation;