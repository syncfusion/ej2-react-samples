import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './sample.css';
export class Default extends SampleBase<{}, {}> {

  private floatFocus(args: any): void {
    args.target.parentElement.classList.add('e-input-focus');
  }
  private floatBlur(args: any): void {
    args.target.parentElement.classList.remove('e-input-focus');
  }

  private onIconClick(args: any): void {
    args.persist();
    setTimeout(
        () => {
            args.target.classList.add('e-input-btn-ripple');
        },
        500);
  }

  private onIconUnClick(args: any): void {
    args.target.classList.remove('e-input-btn-ripple');
  }

  public render(): JSX.Element {
    return (
      <div className = 'control-pane'>
        <div className='control-section input-content-wrapper'>
            <div className="row custom-margin material">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Outlined and Filled</b></div>
            </div>
            <div className="row custom-margin custom-padding-5 material">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <TextBoxComponent placeholder="Outlined" cssClass="e-outline" floatLabelType="Auto" />
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <TextBoxComponent placeholder="Filled" cssClass="e-filled" floatLabelType="Auto" />
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Floating Label</b></div>
            </div>
            <div className="row custom-margin custom-padding-5">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <TextBoxComponent placeholder="First Name" floatLabelType="Auto" />
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <TextBoxComponent placeholder="Last Name" floatLabelType="Auto" enableRtl={true} />
                </div>
            </div>
            <div className="row custom-margin custom-padding-5">
                <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                    <div className="e-float-input e-input-group">
                        <input type="text" onFocus= {this.floatFocus} onBlur= {this.floatBlur} required />
                        <span className="e-float-line"></span>
                        <label className="e-float-text">Country</label>
                        <span className="e-input-group-icon e-spin-down" onMouseDown={this.onIconClick} onMouseUp={this.onIconUnClick}></span>
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Inputs</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" type="text" onFocus= {this.floatFocus} onBlur= {this.floatBlur} placeholder="Enter Name" />
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group e-rtl">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Last Name" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="password" placeholder="Password" defaultValue="password" />
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="email" placeholder="Enter Email" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group e-disabled">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Disabled" disabled/>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Enter Name" value="Readonly" readOnly/>
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Validation States</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                    <div className="e-input-group e-success">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Success" />
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                    <div className="e-input-group e-warning">
                        <input className="e-input" type="text" onFocus= {this.floatFocus} onBlur= {this.floatBlur} placeholder="Warning" />
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                    <div className="e-input-group e-error">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Error" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Sizing</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6 small-textbox">
                    <div className="e-input-group e-small">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Small" />
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Normal" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Input & Elements</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Date of Birth" />
                        <span className="e-input-group-icon e-date-icon" onMouseDown={this.onIconClick} onMouseUp={this.onIconUnClick}></span>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group e-float-icon-left">
                        <span className="e-input-group-icon e-upload-picture" onMouseDown={this.onIconClick} onMouseUp={this.onIconUnClick}></span>
                        <div className="e-input-in-wrap">
                          <input className="e-input" onFocus= {this.floatFocus} onBlur= {this.floatBlur} type="text" placeholder="Upload Picture" />
                        </div>
                    </div>
                </div>
        </div>
        </div>
        <div id="action-description">
        <p>
            This example demonstrates the default functionalities of the <code>TextBox</code> component. Type a character in the TextBox element or focus-in to the TextBox for floating the label text. The label will be positioned back to TextBox on focus-out without value.
        </p>
    </div>
        <div id="description">
            <p>
                A TextBoxes are an input element that allows to get input from the user. It allows the user either to edit or display the input values.
            </p>
            <br />
            <table className ="custom-width">
            <tbody>
                <tr>
                    <th>Types</th>
                    <th>Description</th>
                </tr>
                <tr>
                <td>Outlined & Filled textbox</td>
                <td>You can render the following two types of text fields in the material theme by adding <b>e-outline</b> and <b>e-filled</b> class to cssClass API.
                    <ul>
                        <li>Filled text fields</li>
                        <li>Outlined text fields</li>
                    </ul> </td>
                </tr>
                <tr>
                    <td>Floating Label</td>
                    <td>You can render floating textbox with <b>e-float-input</b> class added and need to maintain the following structure
                        of elements.
                        <ul>
                            <li>Create group element with <b>e-float-input</b> class added.</li>
                            <li>Input element with <b>required</b> attribute.</li>
                            <li>Span element with <b>e-float-line</b> class.</li>
                            <li>Label element with <b>e-float-text</b> class.</li>
                        </ul> </td>
                </tr>
                <tr>
                    <td>Floating Label & Elements</td>
                    <td>You can render floating textbox with icons added with in group element <b>e-input-group</b> and need to maintain
                        the following structure of elements.
                        <ul>
                            <li>Create group element with <b>e-float-input</b> class added.</li>
                            <li>Input element with <b>required</b> attribute.</li>
                            <li>Span element with <b>e-float-line</b> class.</li>
                            <li>Label element with <b>e-float-text</b> class.</li>
                            <li>Append or prepend the span element with class <b>e-input-group-icon</b> added.</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Default TextBox</td>
                    <td>
                        <div className = "custom-padding-bottom-10" > You can render textbox by adding class as <b>e-input</b>.You can also render textbox as group by adding
                            parent element with <b>e-input-group</b> class added.
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>RTL TextBox</td>
                    <td>
                        <div className = "custom-padding-bottom-10" >Set <b>e-input</b> and <b>e-rtl</b> classes to render textbox in right to left direction. For rendering
                            group in RTL mode , class list will be like <b>e-input-group e-rtl</b>.</div>
                    </td>
                </tr>
                <tr>
                    <td>Disabled TextBox</td>
                    <td>
                        <div className = "custom-padding-bottom-10" >You set html disabled attribute to textbox. For parent group element , you can disable it by adding <b>e-disabled</b>                    class.</div>
                    </td>
                </tr>
                <tr>
                    <td>Readonly TextBox</td>
                    <td>
                        <div className = "custom-padding-bottom-10" >You set html readonly attribute to textbox.</div>
                    </td>
                </tr>
                <tr>
                    <td>Validation states</td>
                    <td>
                        <div className = "custom-padding-bottom-10" >You can apply validation states success, warning, error to the textbox with the corresponding classes added
                            to the input element such as <b>e-success</b>, <b>e-warning</b>, <b>e-error</b>.</div>
                    </td>
                </tr>
                <tr>
                    <td>Sizing</td>
                    <td>
                        <div className = "custom-padding-bottom-10" >You can render small sizing textbox by adding <b>e-small</b> class to the input element. By default normal
                            size considered.</div>
                    </td>
                </tr>
                <tr>
                    <td>Input & elements</td>
                    <td>You can render textbox with icons in the below format,
                        <ul>
                            <li>Create group element with <b>e-input-group</b> class added.</li>
                            <li>Add input element with <b>e-input</b> and span element with <b>e-input-group-icon</b> inside the input
                                group element.</li>
                            <li>You can add the icon either before or after the textbox by placing <b>e-input-group-icon</b> class named
                                element in specific place.</li>
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
          <br />
        </div>
      </div>
    );
  }
}
