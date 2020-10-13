/**
 * Sample for Area series
 */
import * as React from "react";
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
import { TextBoxComponent, InputEventArgs } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';


const SAMPLE_CSS = `
    .parent-progress {
        margin-left: 30%;
        margin-top: 9%;
        border-bottom: 0px !important;
    }
    `;
/**
 * Area sample
 */
export class ProgressBarPasswordStrength extends SampleBase<{}, {}> {

    private progressbar: ProgressBarComponent;
    private outlineTextBox: TextBoxComponent;
    private inputChange(args: InputEventArgs): void {
        let passLength: number = args.value.length;
        this.progressbar.value = passLength;
        if (passLength === 0) {
            this.outlineTextBox.placeholder = 'Very Weak';
            this.progressbar.progressColor = 'gray';
        } else if (passLength < 6) {
            this.outlineTextBox.placeholder = 'Weak';
            this.progressbar.progressColor = 'darkgray';
        } else if (passLength < 9) {
            this.outlineTextBox.placeholder = 'Medium';
            this.progressbar.progressColor = 'lightgreen';
        } else if (passLength < 12) {
            this.outlineTextBox.placeholder = 'Strong';
            this.progressbar.progressColor = 'green';
        } else {
            this.outlineTextBox.placeholder = 'Very Strong';
            this.progressbar.progressColor = 'darkgreen';
        }
        this.progressbar.value = this.progressbar.value > 16 ? 16 : this.progressbar.value;
        this.progressbar.refresh();
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="e-input-group parent-progress">
                        <TextBoxComponent id='progresspassword' ref={outlineTextBox => this.outlineTextBox = outlineTextBox}
                            placeholder="New Password"
                            cssClass='e-outline'
                            floatLabelType='Auto'
                            type='password'
                            width='30%'
                            input={this.inputChange.bind(this)}
                        >
                        </TextBoxComponent>
                        <span style={{ textAlign: 'center' }}>
                            <ProgressBarComponent id="progresscontainer" ref={progressbar => this.progressbar = progressbar}
                                type='Circular'
                                height='45'
                                width='45'
                                value={0}
                                minimum = {0}
                                maximum = {16}
                                trackThickness = {8}
                            >
                            </ProgressBarComponent>
                        </span>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a default bullet chart to compare the feature (value) bar with comparative (target) bar. It includes variety of configurations to change the look and feel of the chart.
                </p>
                </div>
                <div id="description">
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart.
                    </p>
                </div>
            </div>
        )
    }
}