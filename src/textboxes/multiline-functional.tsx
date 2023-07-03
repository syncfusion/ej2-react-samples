import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent, NumericTextBoxComponent, FloatLabelType } from '@syncfusion/ej2-react-inputs';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './sample.css';

const Multiline = () => {
    // Multiline TextBox
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [isTextareaEnable, setIsTextareaEnable] = useState<boolean>(true);
    const [isTextareaReadonly, setIsTextareaReadonly] = useState<boolean>(false);
    const [floatLabelType, setFloatLabelType] = useState<FloatLabelType>('Auto');
    const textareaObj = useRef<TextBoxComponent>(null);
    let floatData: { [key: string]: Object }[];
    let fields: object;
    floatData = [
        { Id: 'Auto', Label: 'Auto' },
        { Id: 'Never', Label: 'Never' },
        { Id: 'Always', Label: 'Always' }
    ];
    fields = { text: 'Label', value: 'Id' };
    const enabledHandler = (args: ChangeEventArgs): void => {
      setIsTextareaEnable(!args.checked);
    }
    const readonlyHandler = (args: ChangeEventArgs): void => {
      setIsTextareaReadonly(args.checked);
    }
    const floatHandler = (args: any): void => {
      setFloatLabelType(args.value);
    }
    const rowHandler = (args: any): void => {
        textareaObj.current.addAttributes({rows: args.value});
    }
    return (
        <div className='control-pane multiline'>
            <div className='control-section row multilinepreview'>
                <div className='col-lg-8'>
                    <div className='multiline-wrapper'>
                        {/* Render Multiline TextBox */}
                        <TextBoxComponent id='default' multiline={true} floatLabelType={floatLabelType} enabled={isTextareaEnable} readonly={isTextareaReadonly} placeholder="Enter your address" ref={textareaObj}></TextBoxComponent>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="multiline">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className='multiline-property'>
                            <tbody>
                                <tr>
                                    <td className='left-side'>FLoat label type</td>
                                    <td>
                                        <DropDownListComponent id="float" value={floatLabelType} dataSource={floatData} fields={fields} change={floatHandler.bind(this)} placeholder="Select float type"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='left-side'>Disabled</td>
                                    <td>
                                        <CheckBoxComponent checked={false} change={enabledHandler.bind(this)}></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='left-side'>Read only</td>
                                    <td>
                                        <CheckBoxComponent checked={false} change={readonlyHandler.bind(this)}></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='left-side'>Rows</td>
                                    <td>
                                        <NumericTextBoxComponent format='##' value={2} min={1} max={20} step={1} change={rowHandler.bind(this)}></NumericTextBoxComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates the multiline functionalities of the textbox component. 
                    Enter or fill the textbox with multiple rows of text. 
                    Choose the corresponding option from the property panel to update the multiline textbox.
                </p>  
            </div>
            <div id="description">   
                <p>
                    The Multiline Textbox is used to edit or display multiple lines of text that helps you to accept address, description, comments, feedbacks, and more in a form. 
                    In this sample, rendered multiline textbox from <b>textarea</b> tag and the following options are available to customize it:
                </p>
                <ul>
                    <li>Choose float label types either 'Never', 'Always', or 'Auto' to float the placeholder text.</li>
                    <li>To make a read-only multiline textbox, check the "read-only" option.</li>
                    <li>Disable the textbox by unchecking an "enabled" option.</li>
                    <li>Change the number of rows count to restrict the length of the input.</li> 
                </ul>
                <p>Note: After resizing the multiline textbox manually, the selected rows option from the property panel is not updated to the multiline textbox.</p>
            </div>
        </div>
    );
}
export default Multiline;