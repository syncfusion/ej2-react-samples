import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { ConfirmDialogArgs, DialogUtility, DialogEffect} from '@syncfusion/ej2-react-popups';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import './animation.css';

function Animation () {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
  let state = { };
  let listObj : DropDownListComponent;
  let effect :DialogEffect;
  const effectData : { [key: string]: Object }[] = [
    { "Effect": "FadeZoom", "Name": "Fade zoom" },
    { "Effect": "SlideBottom", "Name": "Slide bottom" },
    { "Effect": "SlideTop", "Name": "Slide top" },
    { "Effect": "Zoom", "Name": "Zoom" },
    { "Effect": "Fade", "Name": "Fade" }
  ];
  let fields = { text: 'Name', value: 'Effect' };
  let value = 'Zoom';
  const dialogArgs : ConfirmDialogArgs = {
    title: ' Delete Multiple Items',
    content: "Are you sure you want to permanently delete these items?",
    animationSettings: { effect: 'Zoom',delay:0,duration: 400},
    position: { X: 'center', Y: 'center' }
  }
  function buttonClick(args) {
    if (args.target.innerHTML.toLowerCase() == 'confirm') {
      DialogUtility.confirm(dialogArgs);
    }
  }
  function onChange() {
    effect = listObj.value as DialogEffect;
    dialogArgs.animationSettings.effect = effect;
  } 

    return (
        <div className='control-pane'>
          <div className='control-section row'>
            <div className="col-lg-8" id="predefinedDialogAnimation">
              <ButtonComponent id="confirmBtn" cssClass="e-success e-control e-btn dlgbtn" onClick={buttonClick.bind(this)}>Confirm</ButtonComponent>
            </div>
            <div className='col-lg-4 property-section'>
              <PropertyPane title='Properties'> 
                <div>
                  <DropDownListComponent id="effectDrop" dataSource={effectData} ref={(dropdownlist) => { listObj = dropdownlist; }} fields={fields} change={onChange.bind(this)} placeholder="Animation effect" floatLabelType="Always" value={value} popupHeight="220px"/>
                </div>
              </PropertyPane>
            </div>
        </div>
          
        <div id="action-description">
        <p>
        This example demonstrates how to show and hide the predefined dialog using a variety of animation effects. The dropdown item that displays the animation effects can be selected and set to it.
        </p>
          </div>
          <div id="description">
          <p>
            The dialog can be opened or closed with an animation effect using the <code>animationSettings</code> property. 
            You can also customize the duration of the animation and delay to begin the animation or disable the dialog's animation by setting the animation effect as none. 
          </p>
          <p>
              <b>See also</b>
          </p>
          <ul>
              <li> <a target="_blank" 
                href="https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/">
                documentation section</a>    
              </li>
          </ul> 
          </div>
      </div>
    )
}
export default Animation;