import * as React from 'react';
import { useState } from 'react';
import {
  DialogComponent,
  ButtonPropsModel,
  AnimationSettingsModel,
} from '@syncfusion/ej2-react-popups';

import { updateSampleSection } from '../common/sample-base';
import './default.css';

function DefaultFunctionalities() {
    React.useEffect(() => {
      updateSampleSection();
    }, []);
  
    let buttons: ButtonPropsModel[];
    const [display, setDisplay] = useState('none');
    const [status, setStatus] = useState({
      hideDialog: true,
    });
    const animationSettings: AnimationSettingsModel = { effect: 'None' };

    buttons = [
    {
      click: dlgButtonClick,
      buttonModel: {
        content: 'Learn More',
        isPrimary: true,
      },
    },
    ];

  function buttonClick(): void {
    setStatus({ hideDialog: true });
  }
  function dlgButtonClick(): void {
    window.open('https://www.syncfusion.com/company/about-us');
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
      <div
        id="targetElement"
        className="control-section col-lg-12 defaultDialog dialog-target"
      >
        <button
          className="e-control e-btn dlgbtn"
          style={{ display: display }}
          onClick={buttonClick}
          id="dialogBtn"
        >
          Open
        </button>
        <DialogComponent
          id="defaultdialog"
          showCloseIcon={true}
          animationSettings={animationSettings}
          width="500px"
          target={'#targetElement'}
          header="About SYNCFUSION Succinctly Series"
          visible={status.hideDialog}
          buttons={buttons}
          open={dialogOpen}
          close={dialogClose}
        >
          <div>
            <div>
              In the Succinctly series, Syncfusion created a robust free library
              of more than 130 technical e-books formatted for PDF, Kindle, and
              EPUB.
              <br />
              <br />
              The Succinctly series was born in 2012 out of a desire to provide
              concise technical e-books for software developers Each title in
              the Succinctly series is written by a carefully chosen expert and
              provides essential content in about 100 pages.
            </div>
          </div>
        </DialogComponent>
      </div>
      <div id="action-description">
        <p>
          This example demonstrates the default rendering of the dialog
          component with minimum configuration. Click close or press ESC to
          close the dialog. Click “open” to show the dialog again, if it is
          closed.
        </p>
      </div>
      <div id="description">
        <p>
          The dialog component is used to display information and get input from
          the user. The dialog component is classified as modal and non-modal
          dialog depend on its interaction with parent application.
        </p>
        <ul>
          <li>
            Modal - It creates overlay that disable interaction with the parent
            application, and user should respond with modal before continuing
            with other applications.
          </li>
          <li>
            Non-modal - It does not prevent user interaction with parent
            application.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DefaultFunctionalities;