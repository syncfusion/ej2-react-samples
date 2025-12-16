import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';

export class Adornments extends SampleBase<{}, {}> {
    public prependNumericObj: NumericTextBoxComponent;
    public appendNumericObj: NumericTextBoxComponent;
    public iconNumericObj: NumericTextBoxComponent;
    private priceChange(): void {
        this.appendNumericObj.value = this.prependNumericObj.value * 5;
    }
    private kgChange(): void {
        this.prependNumericObj.value = this.appendNumericObj.value / 5;
    }
    private handleResetClick(): void {
        this.iconNumericObj.value = null;
    }
    private handleSubractClick(): void {
        this.iconNumericObj.value = this.iconNumericObj.value - 1;
    }
    private handlePlusClick(): void {
        this.iconNumericObj.value = this.iconNumericObj.value + 1;
    }
    render(): JSX.Element {
        return (
        <div className='control-pane'>
            <div className="col-lg-12 control-section">
                <div className="content-wrapper sample-numeric-icon">
                    <div className="row custom-margin">
                        <NumericTextBoxComponent ref={(scope) => {this.prependNumericObj = scope}} floatLabelType='Auto' cssClass='e-prepend-numeric' value={1} placeholder='Enter the price' prependTemplate={this.prependTemplate} change={this.priceChange} />
                    </div>
                    <div className="row custom-margin">
                        <NumericTextBoxComponent ref={(scope) => {this.appendNumericObj = scope}} floatLabelType='Auto' step={1} value={5} placeholder='Enter the kg' appendTemplate={this.appendTemplate} change={this.kgChange} />
                    </div>
                    <div className="row custom-margin-row">
                        <NumericTextBoxComponent ref={(scope) => {this.iconNumericObj = scope}} floatLabelType='Auto' placeholder='Enter the Number' value={10} showSpinButton={false} prependTemplate={this.prependIconTemplate} appendTemplate={this.appendIconTemplate} />
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
    private prependTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-icons e-menu"></span><span className="e-input-separator"></span><span className="e-icons e-search"></span><span className="e-input-separator"></span>
            </div>
        );
    }
    private appendTemplate(): JSX.Element {
        return (
            <div>
                <span>kg</span>
            </div>
        );
    }
    private prependIconTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-icons e-reset" title="Reset" onClick={this.handleResetClick}></span><span className="e-input-separator"></span>
            </div>
        );
    }
    private appendIconTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-input-separator"></span><span className="e-icons e-horizontal-line" onClick={this.handleSubractClick}></span><span className="e-input-separator"></span><span className="e-icons e-plus" onClick={this.handlePlusClick}></span>
            </div>
        );
    }
}
