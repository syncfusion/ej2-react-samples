import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useState, FormEvent } from 'react';
import { OtpInputComponent, NumericTextBoxComponent, OtpInputEventArgs } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './api.css';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const [separator, setSeparator] = useState("-");
    const [placeholder, setPlaceholder] = useState("X");
    const [length, setLength] = useState(4);
    const [disabled, setDisabled] = useState(false);
    const [validationValue, setValidationvalue] = useState("");
    const [modeValue, setModevalue] = useState("outlined");
    const [verifyDisabled, setVerifyDisabled] = useState(true);
    const [resetDisabled, setResetDisabled] = useState(true);

    const modeData: { [key: string]: Object }[] = [
        { Mode: 'outlined', Text: 'Outlined' },
        { Mode: 'underlined', Text: 'Underlined' },
        { Mode: 'filled', Text: 'Filled' }
    ];
    const modeFields: object = { value: 'Mode', text: 'Text' };

    const validationData: { [key: string]: Object }[] = [
        { Status: '', Text: 'None' },
        { Status: 'e-success', Text: 'Success' },
        { Status: 'e-warning', Text: 'Warning' },
        { Status: 'e-error', Text: 'Error' }
    ];
    const validationFields: object = { value: 'Status', text: 'Text' };

    const otpRef = React.useRef<OtpInputComponent>(null);

    function handleOtpChange(event: OtpInputEventArgs) {
        const otpLength = event.value.toString().length;
        setVerifyDisabled(otpLength !== length);
        setResetDisabled(!otpLength);
    }

    const handleResetClick = () => {
        if (otpRef && otpRef.current) {
            otpRef.current.value = "";
        }
        setVerifyDisabled(true);
        setResetDisabled(true);
    };

    const handleVerifyClick = () => {
        if (otpRef && otpRef.current) {
            alert(`Entered OTP value is : ${otpRef.current.value}`);
        }
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className="col-lg-8">
                <div className="api-otp-wrapper">
                    <div id="otp-container">
                        <div className="form-container">
                            <span className="otp-header"> Enter verification code </span>
                            <OtpInputComponent
                                ref={otpRef}
                                separator={separator}
                                placeholder={placeholder}
                                disabled={disabled}
                                length={length}
                                cssClass={validationValue}
                                stylingMode={modeValue}
                                input={handleOtpChange}>
                            </OtpInputComponent>
                            <div className="otp-actions">
                                <button className="e-btn" type="button" disabled={resetDisabled} onClick={handleResetClick}> Clear </button>
                                <button className="e-btn e-primary" type="button" disabled={verifyDisabled} onClick={handleVerifyClick}> Verify </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col-lg-4 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td> Styling Mode </td>
                                    <td>
                                        <DropDownListComponent dataSource={modeData} fields={modeFields} value={modeValue} change={(args) => setModevalue(args.value)}> </DropDownListComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Validation Status </td>
                                    <td>
                                        <DropDownListComponent dataSource={validationData} fields={validationFields} value={validationValue} change={(args) => setValidationvalue(args.value)}> </DropDownListComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td> Placeholder </td>
                                    <td>
                                        <input className='e-input' value={placeholder} maxLength={length} onInput={(args) => setPlaceholder((args.target as HTMLInputElement).value)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td> Separator </td>
                                    <td> <input className='e-input' value={separator} maxLength={1} onInput={(args) => setSeparator((args.target as HTMLInputElement).value)} /> </td>
                                </tr>
                                <tr>
                                    <td> Length </td>
                                    <td> <NumericTextBoxComponent min={1} max={6} value={length} format='0' change={(args) => setLength(args.value || 1)}> </NumericTextBoxComponent> </td>
                                </tr>
                                <tr>
                                    <td> Disabled </td>
                                    <td> <SwitchComponent checked={disabled} change={(args) => setDisabled(args.checked)}> </SwitchComponent> </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates the properties available in the OTP Input component.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample can be customized further with the combination of OTP Input properties from the property pane. For example,
                    </p>
                    <ul>
                        <li>The input style can be changed by selecting the Styling Mode dropdownlist from the property pane.</li>
                        <li>The validation state can be changed by selecting the Validation Status dropdownlist from the property pane.</li>
                        <li>The hint placeholder character can be updated by using the Placeholder textbox from the property pane.</li>
                        <li>The separator character (-) can be updated by using the Separator textbox from the property pane.</li>
                        <li>The input field length can be changed by using the Length numerictextbox from the property pane.</li>
                        <li>Enable or Disable the OTP Input by toggling the Disabled switcher button.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Default;
