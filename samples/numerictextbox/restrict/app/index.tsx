/**
 * Restrict NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from './sample-base';


export class Restrict extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className="content-wrapper format-wrapper sample-numeric">
            <div className="control-label">Numeric TextBox
            </div>
            {/* Render the Numeric Textbox with decimal places as 3 */}
            <NumericTextBoxComponent format='n3' decimals={3} validateDecimalOnType={true} value={10} >
            </NumericTextBoxComponent>
            <div className="control-label">Percentage TextBox
            </div>
            {/* Render the Percentage Textbox with decimal places as 3 */}
            <NumericTextBoxComponent format='p3' decimals={3} validateDecimalOnType={true} value={0.5} min={0} max={1} step={0.01} >
            </NumericTextBoxComponent>
            <div className="control-label">Currency TextBox
            </div>
            {/* Render the Currency Textbox with decimal places as 3 */}
            <NumericTextBoxComponent format='c3' decimals={3} validateDecimalOnType={true} value={100} >
            </NumericTextBoxComponent>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<Restrict />, document.getElementById('sample'));