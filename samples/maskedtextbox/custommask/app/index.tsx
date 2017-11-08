/**
 * Sample demonstrates custom characters and regular expression support.
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from './sample-base';


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
            <MaskedTextBoxComponent mask='[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5].[0-2][0-5][0-5]' floatLabelType='Never'></MaskedTextBoxComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<CustomMask />, document.getElementById('sample'));