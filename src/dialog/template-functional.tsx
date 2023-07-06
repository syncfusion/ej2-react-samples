import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import './template.css';

const Template = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);
  let dialogInstance = useRef<DialogComponent>(null);
  let buttonElement: HTMLElement;
  const [display, setDisplay] = useState<string>('none');
  const [status, setStatus] = useState<boolean>(true);
  buttonElement = null;
  let buttonRef: React.Ref<HTMLButtonElement> = (element) => {
    buttonElement = element;
  };

  const header = () => {
    return (
      <div>
        <span className="e-avatar template-image e-avatar-xsmall e-avatar-circle"></span>
        <div id="dlg-template" title="Nancy" className="e-icon-settings">Nancy</div>
      </div>
    );
  }

  const footerTemplate = () => {
    return (
      <div>
        <input id="inVal" className="e-input" type="text" placeholder="Enter your message here!"/>
        <button id="sendButton" className="e-control e-btn e-primary" data-ripple="true" onClick={updateTextValue}>Send</button>
      </div>
    );
  }

  const content = () => {
    return (
      <div className="dialogContent">
        <span className="dialogText">
          Greetings Nancy! When will you share me the source files of the
          project?
        </span>
      </div>
    );
  }

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
  
  const updateTextValue = (): void => {
    let enteredVal: HTMLInputElement = document.getElementById(
      'inVal'
    ) as HTMLInputElement;
    let dialogTextElement: HTMLElement = document.getElementsByClassName(
      'dialogText'
    )[0] as HTMLElement;
    if (enteredVal.value !== '') {
      dialogTextElement.innerHTML = enteredVal.value;
    }
    enteredVal.value = '';
  }

  const rendereComplete = (): void => {
    dialogInstance.current.target = document.getElementById('target');
    (document.getElementById('sendButton') as HTMLElement).onkeydown = (e: any) => {
      if (e.keyCode === 13) {
        updateTextValue();
      }
    };
    (document.getElementById('inVal') as HTMLElement).onkeydown = (e: any) => {
      if (e.keyCode === 13) {
        updateTextValue();
      }
    };
    document.getElementById('sendButton').onclick = (): void => {
      updateTextValue();
    };
  }

  return (
    <div className="control-pane">
      <div className="control-section row">
        <div id="target" className="col-lg-12 target-element">
          <button className="e-control e-btn dlgbtn dlgbtn-position" ref={buttonRef} onClick={buttonClick} style={{ display: display }}>Open</button>
          <DialogComponent header={header as any} footerTemplate={footerTemplate as any} content={content as any} showCloseIcon={true} ref={dialogInstance} target="#target" width={'437px'} open={dialogOpen} close={dialogClose} height={'255px'} visible={status} created = {rendereComplete}></DialogComponent>
        </div>
      </div>
      <div id="action-description">
        <p>
          This example demonstrates the template functionalities of the dialog
          component. The dialog's header and footer is configured with HTML
          template. The typed content will be replaced every time when clicking
          the "send" button.
        </p>
      </div>
      <div id="description">
        <p>
          The dialog component displays HTML template content on the header and
          footer. The user can set any HTML element as header and footer with
          the usage of content and footer template properties.
        </p>
        <p>
          More information on the modal behavior of Dialog can be found in the{' '}
          <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/template/">documentation section</a>
        </p>
      </div>
    </div>
  );
}
export default Template;