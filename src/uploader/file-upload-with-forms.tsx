import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent} from '@syncfusion/ej2-react-inputs';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { detach, isNullOrUndefined, createElement, EventHandler, Browser } from '@syncfusion/ej2-base';
import { FileInfo, SelectedEventArgs } from '@syncfusion/ej2-inputs';
import './file-upload-with-forms.css';

export class Formsupport extends SampleBase<{}, {}> {

    public formValidator: FormValidatorModel;
    public uploadObj: UploaderComponent;
    public dialogInstance: DialogComponent;
    public formObject: FormValidator;
    private animationSettings: Object;
    private autoUpload: boolean;
    private allowedExtensions: string;
    private multiple: boolean;
    private inputElement: HTMLInputElement
    private inputRef;
    private inputRefElement: HTMLInputElement;
    constructor(props: {}) {
        super(props);
        this.inputRefElement = null;
    this.inputRef = element => {
        this.inputRefElement = element;
    };
        this.animationSettings = { effect: 'Zoom' };
        this.autoUpload = false;
        this.allowedExtensions= 'image/*';
        this.multiple = false;
    }
    // Uploader component
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
        document.getElementById('browse').onclick = () => { 
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        this.formValidator = {
            // Defines the validation rules
            rules: {
                'name': {
                    required: [true, '* Enter your name']
                },
                'email': {
                    required: [true, '* Please enter valid email']
                },
                'upload': {
                    required: [true, '* Select any file']
                },
                'mobile': {
                    required: [true, '* Enter your mobile number']
                }
            }
        };
        this.formObject = new FormValidator('#formTemp', this.formValidator);
    };
        private onSubmitClick(): void {
        if(this.formObject.validate()) {
          this.formObject.element.reset();
          this.dialogInstance.show();
            }
        }

    private onFileSelected(args : SelectedEventArgs): void {
            this.inputElement = this.inputRefElement;
            this.inputElement.value = args.filesData[0].name;
            this.inputElement.classList.remove('e-error');
            this.inputElement.classList.remove('e-valid');
            this.inputElement.removeAttribute('aria-invalid');
            this.inputElement.setAttribute('aria-invalid', 'false');
    }

public render(): JSX.Element {
    return (
      <div className = 'control-pane'>
			<div className='control-section col-lg-12 uploadpreview'>
                <h4 className="form-title">Photo Contest</h4>
                    <div className="control_wrapper uploader-form" id="control_wrapper">
                        <form id="formTemp"  method="post">
                            <div className="form-group" >
                                <div className="e-float-input">
                                <input type="text" id="name" name="name" data-msg-containerid="nameError" />
                                <span className="e-float-line"></span>
                                <label className="e-float-text e-label-top" htmlFor="name">Name</label>
                                </div>
                                <div id="nameError"></div>
                            </div>
                            <div className="form-group">
                                <div className="e-float-input">
                                <input type="email" id="Email" name="email" data-msg-containerid="mailError"/>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top" htmlFor="email" >Email</label>
                                </div>
                                <div id="mailError"></div>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input" id="mobile-no">
                                    <input type="number" id="mobileno" name="mobile" data-msg-containerid="noError" />
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top"  htmlFor="mobile" >Mobile no</label>
                                </div>
                                <div id="noError"></div>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input upload-area">
                                    <input type="text" readOnly id="upload" ref={this.inputRef} name="upload" data-msg-containerid="uploadError"/>
                                    <button id="browse" className="e-control e-btn e-info">Browse...</button>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top">Choose a file</label>
                                </div>
                                <div id="uploadError"></div>
                                    <UploaderComponent id='fileUpload' type = 'file' ref = {(scope) => {this.uploadObj = scope}}
                                selected={this.onFileSelected.bind(this)}
                                autoUpload = {this.autoUpload}
                                allowedExtensions= {this.allowedExtensions} multiple = {this.multiple}></UploaderComponent>
                            </div>
                            <div className="form-group" >
                                <div className="e-float-input">
                                    <textarea className="address-field" id="Address" name="Address"></textarea>
                                    <span className="e-float-line"></span>
                                    <label className="e-float-text e-label-top" >Address</label>
                                </div>
                            </div>
                            <div className="submitBtn">
                                <button className="submit-btn e-btn" id="submit-btn" onClick={this.onSubmitClick.bind(this)}>Submit</button>
                                <div className="desc"><span>*This button is not a submit type and the form submit handled from externally.</span></div>                      
                            </div>                
                        </form>
                    </div>
                    <DialogComponent id="defaultdialog" isModal={true} header='Success' showCloseIcon={true} visible ={false} content = 'Your details have been updated successfully, Thank you.' animationSettings={this.animationSettings} width={'50%'}  ref={dialog => this.dialogInstance = dialog}
                    target={'.control-section'} ></DialogComponent>
            </div>
			<div id="action-description">
                <p> This sample demonstrates the Uploader component supported with HTML form upload.Fill the mandatory details in a form and click the submit button. </p>
            </div>
            <div id="description">
                <p>The Uploader component works in synchronous mode using HTML form.When the end-user submits the form, the selected files are submitted to server with the <code>name</code> attribute of input element.</p>
                <p>More information on the form support can be found on this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/form-support/"> documentation section</a>.</p>
            </div>
      </div>
    );
  }
}
