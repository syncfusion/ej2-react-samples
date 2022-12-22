import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { updateSampleSection } from '../common/sample-base';
import './checkbox.css';

function CheckBox() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let checkboxObj: CheckBoxComponent;

    // function to handle the CheckBox change event
    function onChange(args: ChangeEventArgs): void {
        checkboxObj.label = 'CheckBox: ' + args.checked;
    }
    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className='checkbox-control'>
                    <div className='row'>
                        <CheckBoxComponent checked={true} label='CheckBox: true' ref={(scope) => { checkboxObj = scope; }} change={onChange} ></CheckBoxComponent>
                    </div>
                    <div className='row'>
                        <CheckBoxComponent label='Checked, Disabled' disabled={true} checked={true} ></CheckBoxComponent>
                    </div>
                    <div className='row'>
                        <CheckBoxComponent label='Indeterminate, Disabled' indeterminate={true} disabled={true}></CheckBoxComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the CheckBox. Click the CheckBox element to toggle states between checked/unchecked.</p>
            </div>
            <div id="description">
                <p>
                    CheckBox is a graphical user interface element that allows to select one or more options from the choices. It contains checked, unchecked, and indeterminate states.
                </p>
                <p>
                    In this sample, checked state is achieved by using the
                    <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/check-box/#checked"><code>checked</code>
                    </a> property, indeterminate state is achieved by using the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/check-box/#indeterminate"><code>indeterminate</code>
                    </a> property, and disabled state is achieved by using the <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/api/check-box/#disabled"><code>disabled
                        </code></a> property.
                </p>
                <p>
                    More information about CheckBox can be found in this <a target="_blank"
                        href="https://ej2.syncfusion.com/react/documentation/check-box/getting-started">
                        documentation section</a>.
                </p>
            </div>
        </div>
    );
}
export default CheckBox;
