import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './sample.css';

export class Resize extends SampleBase<{}, {}> {
    public textareaObj: TextAreaComponent;
    public resizeModeObj: DropDownListComponent;
    constructor(props: {}) {
        super(props);
        this.resizeModeData = [
            { Id: 'Vertical', Label: 'Vertical' },
            { Id: 'Horizontal', Label: 'Horizontal' },
            { Id: 'Both', Label: 'Both' },
            { Id: 'None', Label: 'None' }
        ];
        this.fields = { text: 'Label', value: 'Id' };
    }
    private rows = 5;
    private cols = 300;
    private value: string = 'Auto';
    private resizeModeData: { [key: string]: Object }[];
    private fields: object;
    private resizeHandler(args: any): void {
        switch (args.value) {
            case 'None':
                this.textareaObj.resizeMode = 'None';
                break;
            case 'Both':
                this.textareaObj.resizeMode = 'Both';
                break;
            case 'Vertical':
                this.textareaObj.resizeMode = 'Vertical';
                break;
            case 'Horizontal':
                this.textareaObj.resizeMode = 'Horizontal';
                break;
        }
    }

    public render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div id="textarea-sample" className="col-lg-8 control-section resize">
                    <div className="content-wrapper">
                        <div className="resize-row">
                            <TextAreaComponent id="resize" placeholder="Enter your comments" floatLabelType="Auto" ref={(scope) => { this.textareaObj = scope }}  rows={this.rows} cols={this.cols} ></TextAreaComponent>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="resize">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="floatinglabel-property">
                            <tr>
                                <td className="left-side">Resize Mode</td>
                                <td>
                                    <DropDownListComponent id="resizedropdown" value={this.value} dataSource={this.resizeModeData} ref={(dropdownlist) => { this.resizeModeObj = dropdownlist }} fields={this.fields} change={this.resizeHandler.bind(this)} />
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates the resize functionalities of the textarea control.
                        Choose the corresponding resizeMode option from the property panel to update the resize behavior in the textarea.
                    </p>
                </div>
                <div id="description">
                    <p>The textarea can be resized vertically, horizontally, or in both directions by selecting the following corresponding options:</p>
                    <ul>
                        <li>Choose resizeMode options such as 'Both', 'Vertical', 'Horizontal', or 'None' to control the resize behavior of the textarea.</li>
                    </ul>
                </div>
            </div>
        );
    }
}