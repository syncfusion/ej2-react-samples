/**
 * Sample demonstrates the standard mask elements of the MaskedTextBox.
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { useEffect } from "react";
 import { updateSampleSection } from '../common/sample-base';
 import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
 import './sample.css';
 
 const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className="content-wrapper sample-mask">
                    <div className="control-label">Mobile Number</div>
                    <MaskedTextBoxComponent mask='000-000-0000'></MaskedTextBoxComponent>
                    <div className="control-label">Country ISO Code</div>
                    <MaskedTextBoxComponent mask='>LL / LLL'></MaskedTextBoxComponent>
                    <div className="control-label">D.O.B</div>
                    <MaskedTextBoxComponent mask='00/00/0000'></MaskedTextBoxComponent>
                    <div className="control-label">Product Key</div>
                    <MaskedTextBoxComponent mask='>AAAAA-AAAAA-AAAAA-AAAAA'></MaskedTextBoxComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates that the default functionalities of MaskedTextBox component.
                    Enter numeric value for “Mobile Number” textbox then press tab key and then enter “Country ISO Code” in alphabetic format, then type “D.O.B” in numeric format.
                    Finally enter the “Product Key” in alpha numeric format.
                </p>
            </div>
            <div id="description">
                <p>
                  The <b>MaskedTextBox</b> is a textbox extended component that allows the user to enter only the valid input based
                  on the provided <b><a href="https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#mask" target="_blank">mask</a></b>.
                  It is used to get the input with specific formats like Phone number, Date, Time, IP, Social security number, etc.
                </p>
                <p>
                    MaskedTextBox supports the list of <b><a href="https://ej2.syncfusion.com/react/documentation/maskedtextbox/mask-configuration/" target="_blank">mask elements</a></b> based
                    on the standard <b><a href="https://msdn.microsoft.com/en-us/library/system.windows.forms.maskedtextbox.mask(v=vs.110).aspx" target="_blank"> MSDN</a></b> mask elements.
                </p>
                <p>More information about the MaskedTextBox instantiation can be found in the <b><a href="https://ej2.syncfusion.com/react/documentation/maskedtextbox/getting-started/" target="_blank">documentation</a></b> section.</p>
            </div>
        </div>
    )
}
export default Default;