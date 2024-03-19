import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';
export class Default extends SampleBase<{}, {}> {

    private floatFocus(args: any): void {
        args.target.parentElement.classList.add('e-input-focus');
    }

    private floatBlur(args: any): void {
        args.target.parentElement.classList.remove('e-input-focus');
    }

    public render(): JSX.Element {
        return (
            <div className='control-pane'>
                <div className='control-section input-content-wrapper'>
                    <div className="row custom-margin material">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Outlined and Filled</b></div>
                    </div>
                    <div className="row custom-margin custom-padding-5 material">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <TextAreaComponent placeholder="Outlined" cssClass="e-outline" floatLabelType="Auto" />
                        </div>
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                            <TextAreaComponent placeholder="Filled" cssClass="e-filled" floatLabelType="Auto" />
                        </div>
                    </div>
                    <div className="row custom-margin">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Please leave a comment</b></div>
                    </div>
                    <div className="row custom-margin">
                        <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                            <TextAreaComponent placeholder="Enter your comments" floatLabelType="Auto" />
                        </div>
                    </div>
                    <div className="row custom-margin">
                        <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Validation States</b></div>
                    </div>
                    <div className="row custom-margin">
                        <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                            <div className="e-input-group e-success">
                                <textarea className="e-input" onFocus={this.floatFocus} onBlur={this.floatBlur} placeholder="Success" />
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                            <div className="e-input-group e-warning">
                                <textarea className="e-input" onFocus={this.floatFocus} onBlur={this.floatBlur} placeholder="Warning" />
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                            <div className="e-input-group e-error">
                                <textarea className="e-input" onFocus={this.floatFocus} onBlur={this.floatBlur} placeholder="Error" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates the default functionalities of the <code>TextArea</code> control. Type a character in the TextArea element or focus-in to the TextArea for floating the label text. The label will be positioned back to TextArea on focus-out without value.
                    </p>
                </div>
                <div id="description">
                    <p>
                        A TextArea is an input element that allows users to input multiple lines of text. It can be used for editing or displaying text data.
                    </p>
                    <br />
                    <table className="custom-width">
                        <tr>
                            <th>Types</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td>Outlined & Filled textarea</td>
                            <td>You can render the following two types of text fields in the material theme by adding <b>e-outline</b> and <b>e-filled</b> class to cssClass API.
                                    <ul>
                                    <li>Filled text fields</li>
                                    <li>Outlined text fields</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Default TextArea</td>
                            <td>
                                <div className="custom-padding-bottom-10"> You can render textarea by adding class as <b>e-input</b>. You can also render textarea as group by adding
                                        parent element with <b>e-input-group</b> class added.
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Validation states</td>
                            <td>
                                <div className="custom-padding-bottom-10">You can apply validation states success, warning, error to the textarea with the corresponding classes added
                                    to the input element such as <b>e-success</b>, <b>e-warning</b>, <b>e-error</b>.</div>
                            </td>
                        </tr>
                    </table>
                    <br />
                </div>
            </div>
        );
    }
}