import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef, useState } from "react";
import { SignatureComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import './default.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [disable, setDisable] = useState(true);
    let signatureObj = useRef<SignatureComponent>(null);

    const saveBtnClick = () => {
        if (disable) return;
        signatureObj.current.save();
        setDisable(true);
    }

    const clrBtnClick = () => {
        signatureObj.current.clear();
        if (signatureObj.current.isEmpty()) {
          setDisable(true);
        }
    }

    const change = () => {
        if (!signatureObj.current.isEmpty()) {
          setDisable(false);
        }
    }

    return (
        <div className='control-pane'>
            <div className="col-lg-12 control-section">
                <div id="signature-control">
                    <div className='e-sign-heading'>
                        <span id="signdescription">Sign below</span>
                        <span className="e-btn-options">
                            <ButtonComponent id="signsave" cssClass='e-primary e-sign-save' onClick={saveBtnClick} disabled={disable}>SAVE</ButtonComponent>
                            <ButtonComponent id="signclear" cssClass='e-primary e-sign-clear' onClick={clrBtnClick} disabled={disable}>CLEAR</ButtonComponent>
                        </span>
                    </div>
                    <SignatureComponent id="signature" ref={signatureObj} change={change}></SignatureComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the basic rendering of the <b>Signature</b> component with the save and clear option.</p>
            </div>
            <div id="description">
                <p>The <code>Signature</code> component is a user interface to draw the signature digitally. The <code>Signature</code> component is displayed as a container where end-user can sign their name as a verified signature inside the container.</p>
                <p>In this sample, you can draw the signature. Use the <b>Save</b> button to store your signature as an image file, and the <b>Clear</b> button to clear the signature.</p>
                <p>
                    More information about Signature can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/signature/getting-started"> documentation section</a>.
                </p>
            </div>
        </div>
    )
}
export default Default;
