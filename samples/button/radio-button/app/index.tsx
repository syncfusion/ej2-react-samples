import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from './sample-base';


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
            </div>
        );
    }
}
ReactDOM.render(<RadioButton />, document.getElementById('sample'));