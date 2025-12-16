import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './sample.css';

const Adornments = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    
    const iconNumericObj = useRef<NumericTextBoxComponent>(null);
    const prepenNumericObj = useRef<NumericTextBoxComponent>(null);
    const appendNumericObj = useRef<NumericTextBoxComponent>(null);
    const onPriceChange = () => {
        appendNumericObj.current!.value = prepenNumericObj.current!.value * 5;
    }
    const onKgChange = () => {
        prepenNumericObj.current!.value = appendNumericObj.current!.value / 5;
    }
    const prependTemplate = () => {
        return (<>
            <span className="e-icons e-menu"></span><span className="e-input-separator"></span><span className="e-icons e-search"></span><span className="e-input-separator"></span>
        </>);
    }
    const appendTemplate = () => {
        return (<>
            <span>kg</span>
        </>);
    }
    const prependIconTemplate = () => {
        const handleResetClick = () => {
            iconNumericObj.current!.value = null;
        };
        return (<>
            <span className="e-icons e-reset" title="Reset" onClick={handleResetClick}></span><span className="e-input-separator"></span>
        </>);
    }
    const appendIconTemplate = () => {
        const handleSubractClick = () => {
            iconNumericObj.current!.value = iconNumericObj.current!.value - 1;
        };
        const handlePlusClick = () => {
            iconNumericObj.current!.value = iconNumericObj.current!.value + 1;
        };
        return (<>
            <span className="e-input-separator"></span><span className="e-icons e-horizontal-line" onClick={handleSubractClick}></span><span className="e-input-separator"></span><span className="e-icons e-plus" onClick={handlePlusClick}></span>
        </>);
    }
    return (
        <div className='control-pane'>
            <div className="col-lg-12 control-section">
                <div className="content-wrapper sample-numeric-icon">
                    <div className="row custom-margin">
                        <NumericTextBoxComponent ref={prepenNumericObj} floatLabelType='Auto' cssClass='e-prepend-numeric' value={1} placeholder='Enter the price' prependTemplate={prependTemplate} change={onPriceChange} />
                    </div>
                    <div className="row custom-margin">
                        <NumericTextBoxComponent ref={appendNumericObj} floatLabelType='Auto' step={1} value={5} placeholder='Enter the kg' appendTemplate={appendTemplate} change={onKgChange} />
                    </div>
                    <div className="row custom-margin-row">
                        <NumericTextBoxComponent ref={iconNumericObj} floatLabelType='Auto' placeholder='Enter the Number' value={10} showSpinButton={false} prependTemplate={prependIconTemplate} appendTemplate={appendIconTemplate} />
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This example highlights adornment support in the Syncfusion Numeric TextBox. Adornments let you place custom elements before or after the input by using the <code>prependTemplate</code> and <code>appendTemplate</code> properties of Numeric Textbox such as currency symbols, unit labels or action icons to provide context, trigger actions, and improve input clarity and efficiency.</p>
            </div>
            <div id="description">
                <p>
                    This sample demonstrates adornment support in the Syncfusion Numeric TextBox by adding custom elements or icons before and after the input. It includes prepended menu and search icons for price, an appended “kg” label, and icon actions to reset, decrement, or increment values, with the first two fields synchronized.
                </p>
            </div>
        </div>
    );
}
export default Adornments;