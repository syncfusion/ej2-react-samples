import * as React from 'react';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './position.css';
export class Positioning extends SampleBase {
    constructor(props) {
        super(props);
        this.state = {
            hideDialog: true
        };
        this.buttonRef = element => {
            this.buttonEle = element;
        };
        this.position = { X: 'center', Y: 'center' };
        this.footerTemplate = '<span id="posvalue" style="float:left;margin-left:8px;padding:10px;">Position: { X: "Center", Y: "Center" }</span>';
    }
    buttonClick(args) {
        this.setState({ hideDialog: true });
    }
    //Bind the overlayClick event
    changePosition(event) {
        this.defaultDialogInstance.position = { X: event.currentTarget.value.split(" ")[0], Y: event.currentTarget.value.split(" ")[1] };
        document.getElementById('posvalue').innerHTML = 'Position: {X: "' + event.currentTarget.value.split(" ")[0] + '", Y: "' + event.currentTarget.value.split(" ")[1] + '"}';
        let txt = event.target.parentElement.querySelector('.e-label').innerText.split(" ");
        document.getElementById('posvalue').innerHTML = 'Position: { X: "' + txt[0] + '", Y: "' + txt[1] + '" }';
    }
    dialogClose() {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    }
    dialogOpen() {
        this.setState({ hideDialog: true });
        this.buttonEle.style.display = 'none';
    }
    render() {
        return (<div className='control-pane'>
        <div id='target' className='col-lg-12 control-section dialog-position'>
          <button className='e-control e-btn dlgbtn' ref={this.buttonRef} onClick={this.buttonClick.bind(this)} id='dialogBtn'>Open Dialog</button>
          <DialogComponent id='positionDialog' header='Choose a Dialog Position' visible={this.state.hideDialog} showCloseIcon={true} position={this.position} footerTemplate={this.footerTemplate} width='452px' ref={positionDialog => this.defaultDialogInstance = positionDialog} target='#target' open={this.dialogOpen.bind(this)} close={this.dialogClose.bind(this)} closeOnEscape={false}>
            <table id='poschange'>
              <tbody>
                <tr>
                  <td><RadioButtonComponent id='radio1' label='Left Top' value='left top' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                  <td><RadioButtonComponent id='radio2' label='Center Top' value='center top' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                  <td><RadioButtonComponent id='radio3' label='Right Top' value='right top' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                </tr>
                <tr>
                  <td><RadioButtonComponent id='radio4' label='Left Center' value='left center' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                  <td><RadioButtonComponent id='radio5' checked={true} label='Center Center' value='center center' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                  <td><RadioButtonComponent id='radio6' label='Right Center' value='right center' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                </tr>
                <tr>
                  <td><RadioButtonComponent id='radio7' label='Left Bottom' value='left bottom' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                  <td><RadioButtonComponent id='radio8' label='Center Bottom' value='center bottom' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                  <td><RadioButtonComponent id='radio9' label='Right Bottom' value='right bottom' name='xy' onClick={this.changePosition.bind(this)}></RadioButtonComponent></td>
                </tr>
              </tbody>
            </table>
          </DialogComponent>
          <div id="action-description">
            <p>
              This example demonstrates how to position the dialog component. Select the appropriate radio button to position where the dialog is displayed.
              The current position of the dialog is at the bottom.  Enable the "open dialog" button to reopen the dialog if it is closed.
            </p>
          </div>
          <div id="description">
            <p>
              By default, the dialog is displayed in the center of the target container. Use the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/dialog/#position">
                position</a> property to set location where the dialog displays relative to the target.
              The property point-out the horizontal and vertical coordinates.
              You can set position with specific X and Y coordinates in pixel values.
            </p>
            <p>
              More information on the positioning of Dialog can be found in the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#positioning">
                documentation section</a>.
            </p>
          </div>
        </div>
      </div>);
    }
}
