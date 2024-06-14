import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PropertyPane } from '../common/property-pane';
import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './sample.css';

export class FloatingLabel extends SampleBase<{}, {}> {
    public textareaObj: TextAreaComponent;
    public floatLabelObj: DropDownListComponent;
    constructor(props: {}) {
        super(props);
        this.floatLabelData = [
            { Id: 'Auto', Label: 'Auto' },
            { Id: 'Never', Label: 'Never' },
            { Id: 'Always', Label: 'Always' }
        ];
        this.fields = { text: 'Label', value: 'Id' };
    }
    private rows = 5;
    private cols = 300;
    private value: string = 'Auto';
    private floatLabelData: { [key: string]: Object }[];
    private fields: object;
    private floatLabelHandler(args: any): void {
        switch (args.value) {
            case 'Auto':
                this.textareaObj.floatLabelType = 'Auto';
                break;
            case 'Always':
                this.textareaObj.floatLabelType = 'Always';
                break;
            case 'Never':
                this.textareaObj.floatLabelType = 'Never';
                break;
        }
    }

    public render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div id="textarea-sample" className="col-lg-8 control-section floatinglabel">
                    <div className="content-wrapper">
                        <div className="floatinglabel-row">
                            <TextAreaComponent id="floatlabel" placeholder="Enter your comments" floatLabelType="Auto" ref={(scope) => { this.textareaObj = scope }}  rows={this.rows} cols={this.cols} ></TextAreaComponent>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 property-section' id="floatinglabel">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className="floatinglabel-property">
                            <tr>
                                <td className="left-side">Float label type </td>
                                <td>
                                    <DropDownListComponent id="float" value={this.value} dataSource={this.floatLabelData} ref={(dropdownlist) => { this.floatLabelObj = dropdownlist }} fields={this.fields} change={this.floatLabelHandler.bind(this)} />
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
}