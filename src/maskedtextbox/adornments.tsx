import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { MaskedTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';

export class Adornments extends SampleBase<{}, {}> {
    render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="content-wrapper">
                        <div className="mask-row">
                            <MaskedTextBoxComponent mask='000-000-0000' promptChar='#' cssClass='e-prepend-mask' placeholder='Enter phone number' floatLabelType='Auto' prependTemplate={this.prependTemplate} appendTemplate={this.appendTemplate}></MaskedTextBoxComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This example highlights adornment support in the Syncfusion MaskedTextBox. Adornments let you place custom elements before or after the masked input by using the <code>prependTemplate</code> and <code>appendTemplate</code> properties such as prefixes, suffix labels, or action icons to provide context, guide entry, and offer quick actions, while preserving mask validation and float label behavior.
                    </p>
                </div>
                <div id="description">
                    <p>
                        This sample illustrates adornment integration in the Syncfusion MaskedTextBox via a prepended user icon and a appended send icon.
                    </p>
                </div>
            </div>
        );
    }
    private prependTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-icons e-user"></span><span className="e-input-separator"></span>
            </div>
        );
    }
    private appendTemplate(): JSX.Element {
        return (
            <div>
                <span className="e-input-separator"></span><span className="e-icons e-send"></span>
            </div>
        );
    }
}
