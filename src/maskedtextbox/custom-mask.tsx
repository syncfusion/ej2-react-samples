/**
 * Sample demonstrates custom characters and regular expression support.
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';

export class CustomMask extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className="content-wrapper sample-mask">
            <div className="control-label">Time (ex: 10:00 PM, 10:00 AM)
            </div>
            {/* Initialize Masked Textbox */}
            <MaskedTextBoxComponent mask='00:00 >PM' customCharacters={{ P: 'P,A,p,a', M: 'M,m' }} floatLabelType='Never'></MaskedTextBoxComponent>
            <div className="control-label">IP Address (ex: 212.212.111.222)</div>
            {/* Initialize Masked Textbox */}
            <MaskedTextBoxComponent mask='[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9]' floatLabelType='Never'></MaskedTextBoxComponent>
          </div>
        </div>
        <div id="action-description">
        <p>
        This sample demonstrates that the custom mask functionalities of MaskedTextBox component.
        Enter time value in meridiem format, and enter IP value in numeric format.
        </p>
        </div>
        <div id="description">
        <p>The custom mask is achieved by the following ways:</p>
        <p><b>Custom characters:</b></p>
        <p>You can form the <b><a href="http://ej2.syncfusion.com/react/documentation/maskedtextbox/api-maskedTextBoxComponent.html#mask-string" target="_blank">mask</a></b> with any non-mask elements (literals), and you can configure the behavior of that non-mask element as mask element
        through
        the <b><a href="http://ej2.syncfusion.com/react/documentation/maskedtextbox/api-maskedTextBoxComponent.html#customcharacters-object" target="_blank">customCharacters</a></b> property.
        </p>
        <p>In this demo, the “Time” mask '99 : 99 >PM' contains the literals P and M, where it is configured to allow the inputs
        as 'P', 'A', 'p', 'a', and 'M', 'm'.</p>
        <p><b>Regular expression:</b></p>
        <p>Alternatively, you can use the regular expressions as mask element to validate the input of the particular input place.
        </p>
        <p>Here, in the “IP Address” example, each character is masked by an regular expression to allow a particular range of
        values.
        </p>
        <p>For more information, you can refer to the <b><a href="http://ej2.syncfusion.com/react/documentation/maskedtextbox/mask-configuration.html#custom-characters" target="_blank">Custom characters</a></b> and
            <b><a href="http://ej2.syncfusion.com/react/documentation/maskedtextbox/mask-configuration.html#regular-expression" target="_blank">Regular expression</a></b> sections from the documentation.</p>
        </div>
      </div>
    )
  }
}