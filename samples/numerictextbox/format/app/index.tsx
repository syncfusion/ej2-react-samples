/**
 * Custom format NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from './sample-base';


export class Format extends SampleBase<{}, {}> {

  render() {
    return (
      <div className='control-pane'>
        <div className='control-section'>
          <div className="content-wrapper format-wrapper sample-numeric">
          <div className="control-label">Enter the distance
            </div>
            {/* Render the Numeric Textbox with custom format */}
            <NumericTextBoxComponent format='###.### km' value={250} min={0} >
            </NumericTextBoxComponent>
            <div className="control-label">Enter the tax
            </div>
            {/* Render the Percentage Textbox with custom format */}
            <NumericTextBoxComponent format="### \'%\'" min={0} value={25} max={100} >
            </NumericTextBoxComponent>
            <div className="control-label">Enter the amount
            </div>
            {/* Render the Currency Textbox with custom format */}
            <NumericTextBoxComponent format='$ ###.##' min={0} value={1025} >
            </NumericTextBoxComponent>
          </div>
        </div>
      </div >
    )
  }
}
ReactDOM.render(<Format />, document.getElementById('sample'));