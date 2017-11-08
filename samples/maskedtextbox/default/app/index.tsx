/**
 * Sample demonstrates the standard mask elements of the MaskedTextBox.
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from './sample-base';


export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className="content-wrapper sample-mask">
            <div className="control-label">Mobile Number
            </div>
            <MaskedTextBoxComponent mask='000-000-0000'></MaskedTextBoxComponent>
            <div className="control-label">Country ISO Code
            </div>
            <MaskedTextBoxComponent mask='>LL / LLL'></MaskedTextBoxComponent>
            <div className="control-label">D.O.B
            </div>
            <MaskedTextBoxComponent mask='00/00/0000'></MaskedTextBoxComponent>
            <div className="control-label">Product Key
            </div>
            <MaskedTextBoxComponent mask='>AAAAA-AAAAA-AAAAA-AAAAA'></MaskedTextBoxComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));