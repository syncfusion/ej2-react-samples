import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent, NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './sample.css';

function Multiline() {
    // Multiline TextBox
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let textareaObj: TextBoxComponent;
    let enabledObj: CheckBoxComponent;
    let readonlyObj: CheckBoxComponent;
    let floatLabelObj: DropDownListComponent;
    let rowObj: NumericTextBoxComponent;
    let floatData: { [key: string]: Object }[];
    let fields: object;
    const value: string = 'Auto';
    floatData = [
        { Id: 'Auto', Label: 'Auto' },
        { Id: 'Never', Label: 'Never' },
        { Id: 'Always', Label: 'Always' }
    ];
    fields = { text: 'Label', value: 'Id' };
    function enabledHandler(args: ChangeEventArgs): void {
        textareaObj.enabled = !args.checked;
    }
    function readonlyHandler(args: ChangeEventArgs): void {
        textareaObj.readonly = args.checked;
    }
    function floatHandler(args: any): void {
        switch (args.value) {
            case 'Auto':
                textareaObj.floatLabelType = 'Auto';
                break;
            case 'Always':
                textareaObj.floatLabelType = 'Always';
                break;
            case 'Never':
                textareaObj.floatLabelType = 'Never';
                break;
        }
    }
    function rowHandler(args: any): void {
        textareaObj.addAttributes({rows: args.value});
    }
    return (
        <div className='control-pane multiline'>
            <div className='control-section row multilinepreview'>
                <div className='col-lg-8'>
                    <div className='multiline-wrapper'>
                        {/* Render Multiline TextBox */}
                        <TextBoxComponent id='default' multiline={true} floatLabelType="Auto" placeholder="Enter your address" ref = {(scope) => {textareaObj = scope}}></TextBoxComponent>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="multiline">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className='multiline-property'>
                            <tbody>
                                <tr>
                                    <td className='left-side'>FLoat label type</td>
                                    <td>
                                        <DropDownListComponent id="float" value = {value}  dataSource={floatData} ref={(dropdownlist) => {floatLabelObj = dropdownlist }} fields={fields} change={floatHandler.bind(this)} placeholder="Select float type" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='left-side'>Disabled</td>
                                    <td>
                                        <CheckBoxComponent checked={false} ref={(scope) => { enabledObj = scope; }} change={ enabledHandler.bind(this) } ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='left-side'>Read only</td>
                                    <td>
                                        <CheckBoxComponent checked={false} ref={(scope) => {readonlyObj = scope; }} change={ readonlyHandler.bind(this) } ></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='left-side'>Rows</td>
                                    <td>
                                        <NumericTextBoxComponent format='##' value={2} min={1} max={20} step={1} change={ rowHandler.bind(this) }></NumericTextBoxComponent>
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
                <p>The Multiline Textbox is used to edit or display multiple lines of text that helps you to accept address, description, comments, feedbacks, and more in a form. 
                        In this sample, rendered multiline textbox from <b>textarea</b> tag and the following options are available to customize it:</p>
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