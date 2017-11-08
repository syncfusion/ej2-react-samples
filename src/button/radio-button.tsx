import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import './radio-button.css';

export class RadioButton extends SampleBase<{}, {}> {
    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className='radiobutton-control'>
                        <h4>Select the Payment mode</h4>
                        <div className='row'>
                            <RadioButtonComponent checked={true} label='Credit/Debit card' name='payment' value="credit/debit"></RadioButtonComponent>
                        </div>
                        <div className='row'>
                            <RadioButtonComponent label='Net Banking' name='payment' value="netbanking"></RadioButtonComponent>
                        </div>
                        <div className='row'>
                            <RadioButtonComponent label='Cash on Delivery' name='payment' value="cashondelivery"></RadioButtonComponent>
                        </div>
                        <div className='row'>
                            <RadioButtonComponent label='Other Wallets' name='payment' value="others"></RadioButtonComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the default functionalities of the RadioButton. Select the payment mode by clicking the desired RadioButton element.</p>
                </div>
                <div id="description">
                    <p>
                        RadioButton is a graphical user interface element that allows to select one option from the choices. It contains checked and unchecked state.
                    </p>
                    <p>
                        In this sample, Credit/Debit Card option is checked by default, and it can be achieved by using the <code><a target="_blank"
                        href="http://ej2.syncfusion.com/react/documentation/radio-button/api-radioButtonComponent.html#checked-boolean">checked
                        </a></code> property.
                    </p>
                    <p>
                        More information about RadioButton can be found in this <a target="_blank"
                        href="http://ej2.syncfusion.com/react/documentation/radio-button/getting-started.html">
                        documentation section</a>.
                    </p>
                </div>
            </div>
        );
    }
}