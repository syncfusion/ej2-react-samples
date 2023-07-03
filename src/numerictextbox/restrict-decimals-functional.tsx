/**
 * Restrict NumericTextBox sample
 */
 import * as ReactDOM from 'react-dom';
 import * as React from 'react';
 import { useEffect } from "react";
 import { updateSampleSection } from '../common/sample-base';
 import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
 import './sample.css';
 
const Restrict = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className="content-wrapper format-wrapper sample-numeric">
                    <div className="control-label">Numeric TextBox</div>
                    {/* Render the Numeric Textbox with decimal places as 3 */}
                    <NumericTextBoxComponent format='n3' decimals={3} validateDecimalOnType={true} value={10} ></NumericTextBoxComponent>
                    <div className="control-label">Percentage TextBox</div>
                    {/* Render the Percentage Textbox with decimal places as 3 */}
                    <NumericTextBoxComponent format='p3' decimals={3} validateDecimalOnType={true} value={0.5} min={0} max={1} step={0.01} ></NumericTextBoxComponent>
                    <div className="control-label">Currency TextBox</div>
                    {/* Render the Currency Textbox with decimal places as 3 */}
                    <NumericTextBoxComponent format='c3' decimals={3} validateDecimalOnType={true} value={100} ></NumericTextBoxComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the decimal functionalities of the Numeric TextBox. Type a value in the input element to change dynamically, and it allows maximum of 3 decimal digits.</p>
            </div>
            <div id="description">
                <p>
                    The NumericTextBox provides an option to restrict the number of decimal values, by using the <a href="https://ej2.syncfusion.com/react/documentation/api/numerictextbox#decimals" target="_blank"> decimals</a> property. To restrict the number of decimal values on typing, use the <a href="https://ej2.syncfusion.com/react/documentation/api/numerictextbox#decimals" target="_blank"> decimals</a> and <a href="https://ej2.syncfusion.com/react/documentation/api/numerictextbox#validatedecimalontype" target="_blank">validateDecimalOnType</a> properties.
                </p>
                <p>
                    More information on the restrict decimals configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/#precision-of-numbers" target="_blank">documentation section</a>.
                </p>
            </div>
       </div>
    )
 }
 export default Restrict;