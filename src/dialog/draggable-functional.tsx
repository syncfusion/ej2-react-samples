import * as React from 'react';
import { useState, useEffect } from 'react';
import { DialogComponent, AnimationSettingsModel } from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import './draggable.css';

const Draggable = () => {
    useEffect(() => {
      updateSampleSection();
    }, []);

    let animationSettings: AnimationSettingsModel;
    let buttonEle: HTMLButtonElement;
    const [status, setStatus] = useState<boolean>(true);
    const [display, setDisplay] = useState<string>('none');
    animationSettings = { effect: 'None' };
  
    const buttonClick = (): void => {
      setStatus(true);
    }
    const dialogClose = (): void => {
      setStatus(false);
      setDisplay('inline-block');
    }
    const dialogOpen = (): void => {
      setStatus(true);
      setDisplay('none');
    }
  
    return (
      <div className="control-pane">
        <div id="target" className="col-lg-12 control-section dialog-draggable">
          <button className="e-control e-btn dlgbtn" onClick={buttonClick} style={{ display: display }} id="dialogBtn">Open Dialog</button>
          {/* Render alert Dialog */}
          <DialogComponent id="dialogDraggable" header="Drag Me!!!" isModal={true} showCloseIcon={true} allowDragging={true} animationSettings={animationSettings} width="300px" target="#target" visible={status} open={dialogOpen}close={dialogClose}>This is a dialog with draggable support.</DialogComponent>
          <div id="action-description">
            <p>
              This example demonstrates the drag-and-drop operation of the dialog
              component. To begin drag-and-drop operation, select a dialog's
              header using mouse and dropping them in the desired location. The
              dialog can be draggable within the sample container. Enable the
              "open dialog" button to reopen the dialog if it is closed.
            </p>
          </div>
          <div id="description">
            <p>A drag-and-drop operation is enabled using the
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/dialog/#allowdragging">allowDragging</a>
              property. when you configure the{' '}
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/dialog/#target">target</a>
              property, the dialog can be draggable within its target container
              alone. The drag-and-drop feature is used to reposition the dialog
              dynamically.
            </p>
            <p>
              More information on the draggable operation of Dialog can be found
              in the
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#draggable">documentation section</a>.
            </p>
          </div>
        </div>
      </div>
    );
}
export default Draggable;