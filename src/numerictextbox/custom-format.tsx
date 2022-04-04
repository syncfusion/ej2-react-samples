/**
 * Custom format NumericTextBox sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';

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
            <NumericTextBoxComponent format="### '%'" min={0} value={25} max={100} >
            </NumericTextBoxComponent>
            <div className="control-label">Enter the amount
            </div>
            {/* Render the Currency Textbox with custom format */}
            <NumericTextBoxComponent format='$ ###.##' min={0} value={1025} >
            </NumericTextBoxComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the custom format functionalities of the Numeric TextBox. The value of Numeric TextBox will be displayed with defined custom format while type a value or change a value using up/down buttons in the input boxes.</p>
        </div>
        <div id="description">
          <p>
            The NumericTextBox provides an option to customize the display format of the numeric value using the <a href="https://ej2.syncfusion.com/react/documentation/api/numerictextbox#format" target="_blank">format</a> property.
            It accepts the <a href="https://msdn.microsoft.com/en-us/library/dwhawy9k.aspx" target="_blank">standard numeric format string</a> and <a href="https://msdn.microsoft.com/en-us/library/0c899ak8.aspx" target="_blank">custom numeric format string</a> as specified in MSDN. The formatted value displays when the component is not focused.
          </p>
          <p>In this demo, NumericTextBox control renders with the custom format ###.## km.</p>
          <p>
            More information on the format configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/#formatting-the-value" target="_blank">documentation section</a>.
          </p>
        </div>
      </div >
    )
  }
}
