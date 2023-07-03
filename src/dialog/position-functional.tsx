import * as React from 'react';
import { useState, useEffect } from "react";
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './position.css';

const Positioning = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);
  let footerTemplate: string;
  let buttonEle: HTMLButtonElement;
  const [display, setDisplay] = useState<string>('none');
  const [status, setStatus] = useState<boolean>(true);
  const [position,setPosition] = useState<object>({ X : 'center',Y : 'center' });
  const [posValue, setPosValue] = useState<string>(' X: "Center", Y: "Center"');
  let buttonRef: React.Ref<HTMLButtonElement> = (element) => {
    buttonEle = element;
  };
  footerTemplate = '<span id="posvalue" style="float:left;margin-left:8px;padding:10px;">Position: { posValue }</span>';

  const buttonClick = (): void => {
    setStatus(true);
  }
  const changePosition = (event: any): void => {
    setPosition({
      X: event.currentTarget.value.split(' ')[0],
      Y: event.currentTarget.value.split(' ')[1],
    });
    setPosValue('Position: {X: "' + event.currentTarget.value.split(' ')[0] + '", Y: "' + event.currentTarget.value.split(' ')[1] +'"}');
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
      <div id="target" className="col-lg-12 control-section dialog-position">
        <button className="e-control e-btn dlgbtn" ref={buttonRef} onClick={buttonClick} id="dialogBtn" style={{ display: display }}>Open Dialog</button>
        <DialogComponent id="positionDialog" header="Choose a Dialog Position" width="452px" visible={status} showCloseIcon={true} position={position} footerTemplate={footerTemplate} target="#target" open={dialogOpen} close={dialogClose} closeOnEscape={false}>
          <table id="poschange">
            <tbody>
              <tr>
                <td>
                  <RadioButtonComponent id="radio1" label="Left Top" value="left top" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
                <td>
                  <RadioButtonComponent id="radio2" label="Center Top" value="center top" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
                <td>
                  <RadioButtonComponent id="radio3" label="Right Top" value="right top" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
              </tr>
              <tr>
                <td>
                  <RadioButtonComponent id="radio4" label="Left Center" value="left center" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
                <td>
                  <RadioButtonComponent id="radio5" checked={true} label="Center Center" value="center center" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
                <td>
                  <RadioButtonComponent id="radio6" label="Right Center" value="right center" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
              </tr>
              <tr>
                <td>
                  <RadioButtonComponent id="radio7" label="Left Bottom" value="left bottom" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
                <td>
                  <RadioButtonComponent id="radio8" label="Center Bottom" value="center bottom" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
                <td>
                  <RadioButtonComponent id="radio9" label="Right Bottom" value="right bottom" name="xy" onClick={changePosition}></RadioButtonComponent>
                </td>
              </tr>
            </tbody>
          </table>
        </DialogComponent>
        <div id="action-description">
          <p>
            This example demonstrates how to position the dialog component.
            Select the appropriate radio button to position where the dialog is
            displayed. The current position of the dialog is at the bottom.
            Enable the "open dialog" button to reopen the dialog if it is
            closed.
          </p>
        </div>
        <div id="description">
          <p>
            By default, the dialog is displayed in the center of the target
            container. Use the
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/dialog/#position">position</a>
            property to set location where the dialog displays relative to the
            target. The property point-out the horizontal and vertical
            coordinates. You can set position with specific X and Y coordinates
            in pixel values.
          </p>
          <p>
            More information on the positioning of Dialog can be found in the{' '}
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#positioning" >documentation section</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Positioning;