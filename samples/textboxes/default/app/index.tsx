import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from './sample-base';

export class Default extends SampleBase<{}, {}> {

  public rendereComplete(): void {
    let input: NodeList = document.querySelectorAll('.e-input-group .e-input,.e-float-input.e-input-group input');
    let inputIcon: NodeList  = document.querySelectorAll('.e-input-group-icon');
    for (let i: number = 0; i < input.length; i++) {
        {/* Focus Event binding Floating input label */}
        input[i].addEventListener('focus', () => {
            getParentNode(input[i] as HTMLElement).classList.add('e-input-focus');
        });

        {/* FocusOut Event binding Floating input label */}
        input[i].addEventListener('blur', () => {
            getParentNode(input[i] as HTMLElement).classList.remove('e-input-focus');
        });
    }
    for (let i: number = 0; i < inputIcon.length; i++) {
        {/* Mousedown Event binding for input icon Ripple Effect */}
        inputIcon[i].addEventListener('mousedown',  function() : void {
            this.classList.add('e-input-btn-ripple');
        });
        {/* MouseUp Event binding for input icon Ripple Effect */}
        inputIcon[i].addEventListener('mouseup',  function() : void {
            let ele: HTMLElement = this;
            setTimeout(
                () => {ele.classList.remove('e-input-btn-ripple'); },
                500);
        });
    }
    function getParentNode(element: HTMLInputElement | HTMLElement): HTMLElement {
        let parentNode: HTMLElement = element.parentNode as HTMLElement;
        if (parentNode.classList.contains('e-input-in-wrap')) {
            return parentNode.parentNode as HTMLElement;
        }
        return parentNode;
    }
  }

  render() {
    return (
      <div className = 'control-pane'>
        <div className='control-section input-content-wrapper'>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Floating Label</b></div>
            </div>
            <div className="row custom-margin custom-padding-5">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-float-input">
                        <input type="text" required />
                        <span className="e-float-line"></span>
                        <label className="e-float-text">First Name</label>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-float-input e-rtl">
                        <input type="text" required />
                        <span className="e-float-line"></span>
                        <label className="e-float-text">Last Name</label>
                    </div>
                </div>
            </div>
            <div className="row custom-margin custom-padding-5">
                <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
                    <div className="e-float-input e-input-group">
                        <input type="text" required />
                        <span className="e-float-line"></span>
                        <label className="e-float-text">Country</label>
                        <span className="e-input-group-icon e-spin-down"></span>
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Inputs</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" type="text" placeholder="Enter Name" />
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group e-rtl">
                        <input className="e-input" type="text" placeholder="Last Name" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" type="password" placeholder="Password" defaultValue="password" />
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" type="email" placeholder="Enter Email" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group e-disabled">
                        <input className="e-input" type="text" placeholder="Disabled" disabled/>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" type="text" placeholder="Enter Name" value="Readonly" readOnly/>
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Validation States</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                    <div className="e-input-group e-success">
                        <input className="e-input" type="text" placeholder="Success" />
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                    <div className="e-input-group e-warning">
                        <input className="e-input" type="text" placeholder="Warning" />
                    </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-lg-4 col-md-4">
                    <div className="e-input-group e-error">
                        <input className="e-input" type="text" placeholder="Error" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Sizing</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group e-small">
                        <input className="e-input" type="text" placeholder="Small" />
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" type="text" placeholder="Normal" />
                    </div>
                </div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6"><b>Input & Elements</b></div>
            </div>
            <div className="row custom-margin">
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group">
                        <input className="e-input" type="text" placeholder="Date of Birth" />
                        <span className="e-input-group-icon e-input-calendar"></span>
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6 col-md-6">
                    <div className="e-input-group e-float-icon-left">
                        <span className="e-input-group-icon e-input-picture"></span>
                        <div className="e-input-in-wrap">
                          <input className="e-input" type="text" placeholder="Upload Picture" />
                        </div>
                    </div>
                </div>
        </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Default />, document.getElementById('sample'));