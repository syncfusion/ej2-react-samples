import * as React from 'react';
import { useState, useEffect } from 'react';
import { DialogComponent, ButtonPropsModel } from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import './animation.css';

const Animation = () => {
    useEffect(() => {
      updateSampleSection();
    }, []);
  
    let dlgButton: ButtonPropsModel[];
    const [status, setStatus] = useState<boolean>(true);
    const [animation,SetAnimation] = useState<object>({ effect: 'Zoom', duration: 400})
    const [content,setContent] = useState<string>('The dialog is configured with animation effect. It is opened or closed with "Zoom In or Out" animation.')

    const dialogButtonClick = () => {
      setStatus(false);
    }

    const dialogClose = () => {
      setStatus(false);
    }

    dlgButton = [
      {
        click: dialogButtonClick,
        buttonModel: { content: 'Hide', isPrimary: true },
      },
    ];
    
    const buttonClick = (args: any): void => {
      let txt: string = args.target.parentElement.innerText;
      txt = txt === 'Zoom In/Out' ? 'Zoom In or Out' : txt;
      setContent('The dialog is configured with animation effect. It is opened or closed with "' + txt +'" animation.');
      SetAnimation({ ...animation, effect: args.target.id });
      setStatus(true);
    }
  
    return (
      <div className="control-pane">
        <div id="target" className="col-lg-12 control-section dialog-target">
          <div id="customization">
            <div className="animate">
              <button className="e-control e-btn e-outline e-primary" onClick={buttonClick} id="Zoom">Zoom</button>
            </div>
            <div className="animate">
              <button className="e-control e-btn e-outline e-primary" onClick={buttonClick} id="FlipXDown">FlipX Down</button>
            </div>
            <div className="animate">
              <button className="e-control e-btn e-outline e-primary" onClick={buttonClick} id="FlipXUp">FlipX Up</button>
            </div>
            <div className="animate">
              <button className="e-control e-btn e-outline e-primary" onClick={buttonClick} id="FlipYLeft">FlipY Left</button>
            </div>
            <div className="animate">
              <button className="e-control e-btn e-outline e-primary" onClick={buttonClick} id="FlipYRight">FlipY Right</button>
            </div>
          </div>
          <DialogComponent id="AnimationDialog" isModal={true} header="Animation Dialog" showCloseIcon={true} animationSettings={animation} width="285px" target="#target" buttons={dlgButton} visible={status} beforeClose={dialogClose} content={content}></DialogComponent>
          <div id="action-description">
            <p>
              This example demonstrates how to open or close the dialog with
              animation effects by clicking the appropriate button.
            </p>
          </div>
          <div id="description">
            <p>
              The dialog can be opened or closed with animation effect using the
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/dialog/#animationsettings">animationSettings</a>
              property. You can also customize the duration of animation and delay
              to begin animation. Disables the dialog's animation by setting the
              animation effect as none.
            </p>
            <p>
              More information on the animation effect of Dialog can be found in the
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/animation/">documentation section</a>.
            </p>
          </div>
        </div>
      </div>
    );
}
  
export default Animation;