import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { FloatLabelType, TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './sample.css';

const FloatingLabel = () => {
    // TextArea floating label
    useEffect(() => {
        updateSampleSection();
    }, [])
    const rows = 5;
    const cols = 300;
    const [floatLabelType, setFloatLabelType] = useState<FloatLabelType>('Auto');
    const textareaObj = useRef<TextAreaComponent>(null);
    let floatLabelData: { [key: string]: Object }[];
    let fields: object;
    floatLabelData = [
        { Id: 'Auto', Label: 'Auto' },
        { Id: 'Never', Label: 'Never' },
        { Id: 'Always', Label: 'Always' }
    ];
    fields = { text: 'Label', value: 'Id' };
    const floatLabelHandler = (args: any): void => {
        setFloatLabelType(args.value);
    }
    return (
        <div className='control-pane'>
            <div id="textarea-sample" className="col-lg-8 control-section floatinglabel">
                <div className="content-wrapper">
                    <div className="floatinglabel-row">
                        <TextAreaComponent id="floatlabel" placeholder="Enter your comments" floatLabelType={floatLabelType} ref={textareaObj}   rows={rows} cols={cols} ></TextAreaComponent>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 property-section' id="floatinglabel">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className="floatinglabel-property">
                        <tr>
                            <td className="left-side">Float label type </td>
                            <td>
                                <DropDownListComponent id="float" value={floatLabelType} dataSource={floatLabelData} fields={fields} change={floatLabelHandler.bind(this)} />
                            </td>
                        </tr>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates the floating label functionalities of the textarea control.
                    Choose the corresponding floatLabel option from the property panel to update the floating label behaviour in
                    textarea.
                    </p>
            </div>
            <div id="description">
                <p>The floating label is used to float the placeholder text while the user enters text or focuses on the textarea element with a value.
                    In this sample, the floating label behavior can be changed using the following options:
                    </p>
                <ul>
                    <li>Choose float label types either 'Never', 'Always', or 'Auto' to control the floating behavior of the placeholder text.</li>
                </ul>
            </div>
        </div>
    );
}
export default FloatingLabel;