/**
 * Default NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from './sample-base';


export class Default extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className="content-wrapper format-wrapper sample-numeric">
            <div className="control-label">Numeric TextBox
            </div>
            {/* Render the Numeric Textbox */}
            <NumericTextBoxComponent value={10} >
            </NumericTextBoxComponent>
            <div className="control-label">Percentage TextBox
            </div>
            {/* Render the Percentage Textbox */}
            <NumericTextBoxComponent format='p2' value={0.5} min={0} max={1} step={0.01} >
            </NumericTextBoxComponent>
            <div className="control-label">Currency TextBox
            </div>
            {/* Render the Currency Textbox */}
            <NumericTextBoxComponent format='c2' value={100} >
            </NumericTextBoxComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Default />, document.getElementById('sample'));