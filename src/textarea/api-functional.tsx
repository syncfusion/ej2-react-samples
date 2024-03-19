import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent, NumericTextBoxComponent, TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import './sample.css';

const Api = () => {
    // TextBox Api
    useEffect(() => {
        updateSampleSection();
    }, [])
    const [isEnabled, setIsEnabled] = useState<boolean>(true);
    const [isReadonly, setIsReadonly] = useState<boolean>(false);
    const [showClearIcon, setShowClearIcon] = useState<boolean>(false);
    const [rows, setRows] = useState<number>(null);
    const [cols, setCols] = useState<number>(null);
    const [maxLength, setMaxLength] = useState<number>(null);
    const [value, setValue] = useState<string>("");
    const textareaObj = useRef<TextAreaComponent>(null);
    const enabledHandler = (args: ChangeEventArgs): void => {
        setIsEnabled(args.checked);
    }
    const readonlyHandler = (args: ChangeEventArgs): void => {
        setIsReadonly(args.checked);
    }
    const clearIconHandler = (args: ChangeEventArgs): void => {
        setShowClearIcon(args.checked);
    }
    const rowHandler = (args: any): void => {
        setRows(args.value);
    }
    const columnHandler = (args: any): void => {
        setCols(args.value);
    }
    const maxLengthHandler = (args: any): void => {
        setMaxLength(args.value);
    }
    const valueHandler = (args: any): void => {
        setValue(args.value);
    }

    return (
        <div className='control-pane'>
            <div className="col-lg-8 control-section api-textarea">
                <div className="content-wrapper">
                    <div className="api-row">
                        <TextAreaComponent id="api" placeholder="Enter your comments" floatLabelType="Auto" enabled={isEnabled} readonly={isReadonly} showClearButton={showClearIcon} rowsCount={rows} maxLength={maxLength} columnsCount={cols} value={value} ref={textareaObj}></TextAreaComponent>
                    </div>
                </div>
            </div>
            <div className='col-lg-4 property-section' id="api">
                <PropertyPane title='Properties'>
                    <table id="property" title="Properties" className="api-property">

                        <tr>
                            <td className="left-side"> Rows </td>
                            <td>
                                <NumericTextBoxComponent format='##' value={2} min={1} max={10} change={rowHandler.bind(this)}></NumericTextBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side"> Columns </td>
                            <td>
                                <NumericTextBoxComponent format='##' value={20} min={5} max={40} change={columnHandler.bind(this)}></NumericTextBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side">Enable</td>
                            <td>
                                <CheckBoxComponent checked={true} change={enabledHandler.bind(this)} ></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side">Read only</td>
                            <td>
                                <CheckBoxComponent checked={false} change={readonlyHandler.bind(this)} ></CheckBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side"> MaxLength </td>
                            <td>
                                <NumericTextBoxComponent format='##' value={-1} change={maxLengthHandler.bind(this)}></NumericTextBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side"> Value </td>
                            <td>
                                <TextBoxComponent change={valueHandler.bind(this)}></TextBoxComponent>
                            </td>
                        </tr>
                        <tr>
                            <td className="left-side">Show clear icon</td>
                            <td>
                                <CheckBoxComponent checked={false} change={clearIconHandler.bind(this)} ></CheckBoxComponent>
                            </td>
                        </tr>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    This example demonstrates the api functionalities of the textarea control. You can customize the appearance and
                    behaviour of textarea component by choosing the corresponding option from the property panel.
                    </p>
            </div>
            <div id="description">
                <p>The TextArea has the options to customize the appearance and behaviour of the component dynamically by updating
                        the following properties:</p>
                <ul>
                    <li>Change the number of rows and columns of textarea by updating "Rows" and "Columns" options.</li>
                    <li>To make the textarea read-only, check the "read-only" option.</li>
                    <li>Disable the textarea by unchecking the "enabled" option.</li>
                    <li>Set the maximum length of characters that can be entered in textarea by customizing the "MaxLength" option.</li>
                    <li>Update the value of textarea by entering text in "Value" option.</li>
                    <li>To make the clear button visible, check the "Show clear icon" option..</li>
                </ul>
            </div>
        </div>
    );
}
export default Api;
