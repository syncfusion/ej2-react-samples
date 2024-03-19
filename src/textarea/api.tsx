import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { TextAreaComponent, NumericTextBoxComponent, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { CheckBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-buttons';
import './sample.css';

export class Api extends SampleBase<{}, {}> {

    public textareaObj: TextAreaComponent;
    public enabledCheckBox: CheckBoxComponent;
    public readonlyCheckBox: CheckBoxComponent;
    public showClearIcon: CheckBoxComponent;
    public rows: NumericTextBoxComponent;
    public columns: NumericTextBoxComponent;
    public maxLength: NumericTextBoxComponent;
    public value: TextBoxComponent;

    private enabledHandler(args: ChangeEventArgs): void {
        this.textareaObj.enabled = args.checked;
    }
    private readonlyHandler(args: ChangeEventArgs): void {
        this.textareaObj.readonly = args.checked;
    }
    private rowHandler(args: any): void {
        this.textareaObj.rowsCount = args.value;
    }
    private columnHandler(args: any): void {
        this.textareaObj.columnsCount = args.value;
    }
    private maxLengthHandler(args: any): void {
        this.textareaObj.maxLength = args.value;
    }
    private valueHandler(args: any): void {
        this.textareaObj.value = args.value;
    }
    private clearIconHandler(args: ChangeEventArgs): void {
        this.textareaObj.showClearButton = args.checked;
    }

    public render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div className="col-lg-8 control-section api-textarea">
                    <div className="content-wrapper">
                        <div className="api-row">
                            <TextAreaComponent id="api" placeholder="Enter your comments" floatLabelType="Auto" ref={(scope) => { this.textareaObj = scope }}></TextAreaComponent>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="api">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="api-property">

                            <tr>
                                <td className="left-side"> Rows </td>
                                <td>
                                    <NumericTextBoxComponent format='##' value={2} min={1} max={10} change={this.rowHandler.bind(this)}></NumericTextBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td className="left-side"> Columns </td>
                                <td>
                                    <NumericTextBoxComponent format='##' value={20} min={5} max={40} change={this.columnHandler.bind(this)}></NumericTextBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td className="left-side">Enable</td>
                                <td>
                                    <CheckBoxComponent checked={true} ref={(scope) => { this.enabledCheckBox = scope; }} change={this.enabledHandler.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td className="left-side">Read only</td>
                                <td>
                                    <CheckBoxComponent checked={false} ref={(scope) => { this.readonlyCheckBox = scope; }} change={this.readonlyHandler.bind(this)} ></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td className="left-side"> MaxLength </td>
                                <td>
                                    <NumericTextBoxComponent format='##' value={-1} change={this.maxLengthHandler.bind(this)}></NumericTextBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td className="left-side"> Value </td>
                                <td>
                                    <TextBoxComponent change={this.valueHandler.bind(this)}></TextBoxComponent>
                                </td>
                            </tr>
                            <tr>
                                <td className="left-side">Show clear icon</td>
                                <td>
                                    <CheckBoxComponent checked={false} ref={(scope) => { this.showClearIcon = scope; }} change={this.clearIconHandler.bind(this)} ></CheckBoxComponent>
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
}