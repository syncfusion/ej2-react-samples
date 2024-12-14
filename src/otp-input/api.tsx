import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { FormEvent } from 'react';
import { OtpInputComponent, NumericTextBoxComponent, OtpInputEventArgs } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './api.css';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

interface OTPState {
    separator: string;
    placeholder: string;
    length: number;
    disabled: boolean;
    validationValue: string;
    modeValue: string;
    resetDisabled: boolean;
    verifyDisabled: boolean
}
export class OtpAPI extends SampleBase<{}, OTPState> {
    constructor(props: any) {
        super(props);
        this.state = {
            separator: "-",
            placeholder: "X",
            length: 4,
            disabled: false,
            modeValue: "outlined",
            validationValue: "",
            resetDisabled: true,
            verifyDisabled: true
        };
    }
    modeData: { [key: string]: Object }[] = [
        { Mode: 'outlined', Text: 'Outlined' },
        { Mode: 'underlined', Text: 'Underlined' },
        { Mode: 'filled', Text: 'Filled' }
    ];
    fields: object = { value: 'Mode', text: 'Text' };
    validationData: { [key: string]: Object }[] = [
        { Status: '', Text: 'None' },
        { Status: 'e-success', Text: 'Success' },
        { Status: 'e-warning', Text: 'Warning' },
        { Status: 'e-error', Text: 'Error' }
    ];
    validationFields: object = { value: 'Status', text: 'Text' };

    private otpRef: OtpInputComponent | null = null;

    handleOtpChange(event: OtpInputEventArgs) {
        const otpLength = event.value.toString().length;
        this.setState({ verifyDisabled: otpLength !== this.state.length });
        this.setState({ resetDisabled: !otpLength });
    }

    public handleResetClick() {
        if (this.otpRef) {
            this.otpRef.value = "";
        }
        this.setState({ verifyDisabled: true });
        this.setState({ resetDisabled: true });
    };

    public handleVerifyClick() {
        if (this.otpRef) {
            alert(`Entered OTP value is : ${this.otpRef.value}`);
        }
    };

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="col-lg-8">
                    <div className="api-otp-wrapper">
                        <div id="otp-container">
                            <div className="form-container">
                                <span className="otp-header"> Enter verification code </span>
                                <OtpInputComponent
                                    ref={def => { this.otpRef = def }}
                                    separator={this.state.separator}
                                    placeholder={this.state.placeholder}
                                    disabled={this.state.disabled}
                                    length={this.state.length}
                                    cssClass={this.state.validationValue}
                                    stylingMode={this.state.modeValue}
                                    input={this.handleOtpChange.bind(this)}>
                                </OtpInputComponent>
                                <div className="otp-actions">
                                    <button className="e-btn" type="button" disabled={this.state.resetDisabled} onClick={this.handleResetClick.bind(this)}> Clear </button>
                                    <button className="e-btn e-primary" type="button" disabled={this.state.verifyDisabled} onClick={this.handleVerifyClick.bind(this)}> Verify </button>
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
                                            <DropDownListComponent dataSource={this.modeData} fields={this.fields} value={this.state.modeValue} change={(args) => this.setState({ modeValue: args.value })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Validation Status </td>
                                        <td>
                                            <DropDownListComponent dataSource={this.validationData} fields={this.validationFields} value={this.state.validationValue} change={(args) => this.setState({ validationValue: args.value })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> Placeholder </td>
                                        <td> <input className='e-input' type="text" value={this.state.placeholder} maxLength={this.state.length} onInput={(args) => this.setState({ placeholder: (args.target as HTMLInputElement).value })} /> </td>
                                    </tr>
                                    <tr>
                                        <td> Separator </td>
                                        <td> <input className='e-input' type="text" value={this.state.separator} maxLength={1} onInput={(args) => this.setState({ separator: (args.target as HTMLInputElement).value })} /> </td>
                                    </tr>
                                    <tr>
                                        <td> Length </td>
                                        <td> <NumericTextBoxComponent min={1} max={6} format="0" value={this.state.length} change={(args) => this.setState({ length: args.value | 1 })} /> </td>
                                    </tr>
                                    <tr>
                                        <td> Disabled </td>
                                        <td> <SwitchComponent checked={this.state.disabled} change={(args) => this.setState({ disabled: args.checked })} /> </td>
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
}
