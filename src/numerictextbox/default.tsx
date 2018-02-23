/**
 * Default NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';

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
        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the Numeric TextBox. Type a value in the input element to change the value dynamically, or press up/down arrow button to increase/decrease the value with a predefined step value.</p>
        </div>
        <div id="description">
          <p>
            The NumericTextBox component is used to get the number inputs from the user. The input values can be increased or decreased with a predefined step value.
          </p>
          <p>
            In this demo, the default NumericTextBox is rendered with the percent and currency formats as specified in <a href="https://msdn.microsoft.com/en-us/library/dwhawy9k.aspx" target="_blank">MSDN</a>.
          </p>
          <p>
            More information on the NumericTextBox instantiation can be found in the <a href="http://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started.html" target="_blank">documentation section</a>.
          </p>
        </div>
      </div>
    )
  }
}