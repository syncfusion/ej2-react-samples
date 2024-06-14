import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { OtpInputComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import './default.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="otp-container">
                    <label> Default (Number) OTP Input </label>
                    <OtpInputComponent value="1234" type='number'></OtpInputComponent>
                </div>
                <div className="otp-container">
                    <label> Text OTP Input </label>
                    <OtpInputComponent value="e3c7" type='text'></OtpInputComponent>
                </div>
                <div className="otp-container">
                    <label> Password OTP Input </label>
                    <OtpInputComponent value="1234" type='password'></OtpInputComponent>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the default functionalities of the OTP Input component. It allows users to enter OTP (One-Time Password) during MFA processes such as login, account verifications, booking activities, and more.
                </p>
            </div>
            <div id="description">
                <p>
                    This example showcases the usage of the <code>type</code> and <code>value</code> properties in the OTP Input component. The available input types are <code>number</code>, <code>text</code> and <code>password</code>. Once the user enters the OTP according to the specified <code>type</code>, the <code>value</code> property can be used to access the entered OTP.
                </p>
            </div>
        </div>
    )
}
export default Default;
