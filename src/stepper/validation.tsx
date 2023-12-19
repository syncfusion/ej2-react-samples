import * as React from 'react';
import { StepperComponent, StepsDirective, StepDirective, StepperChangingEventArgs } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './validation.css';

export class Validation extends SampleBase<{}, {}> {

    public stepperObj: StepperComponent;
    public stepperContentRef;
    public stepperContentEle: Element;

    public isEmailValid: boolean = false;
    public isFeedbackTextValid: boolean = false;
    public isUserNavigatingReverse: boolean = false;
    public isCurrentStepValid: boolean = false;

    public regex: RegExp = new RegExp('^[A-Za-z0-9._%+-]{1,}@[A-Za-z0-9._%+-]{1,}');

    componentDidMount(): void {
        this.stepperContentRef = element => { this.stepperContentEle = element; };
        (window as any).onNextStep = function() { this.stepperObj.nextStep(); };
        (window as any).onPreviousStep =  function() { this.stepperObj.previousStep(); };
        (window as any).onConfirm = function () {
            let stepContent = this.stepperContentEle.querySelector('.step-content-3');
            if (!stepContent) {
                this.stepperContentEle.insertAdjacentHTML('beforeend', this.stepperContents[3]);
                stepContent = this.stepperContentEle.querySelector(".step-content.step-content-3");
            }        
            this.stepperContentEle.querySelectorAll('.step-content').forEach((step) => step.classList.remove('step-active'));        
            if (stepContent) {
                stepContent.classList.add('step-active');
                this.stepperObj.steps[this.stepperObj.activeStep].isValid = true;
                this.stepperObj.steps[this.stepperObj.activeStep].status = 'completed';
            }
        };
    
        (window as any).onInputChange=  function (val: any, isEmailInput?: boolean) {
            let elementId = isEmailInput ? 'add-email' : 'feedback-area';
            let errElement = (this.stepperContentEle.querySelector(`.${elementId}.error-label`) as HTMLElement);
            if (val.value.length === 0) {
                if (isEmailInput) errElement.textContent = 'Email cannot be empty.';
                else errElement.textContent = 'Feedback cannot be empty.'; this.isFeedbackTextValid = false
            } else {
                if (isEmailInput) {
                    this.isEmailValid = this.regex.test(val.value);
                    errElement.textContent = this.isEmailValid ? '' : 'Enter a valid email address.';
                } else {
                    this.isFeedbackTextValid = val.value.length > 15;
                    errElement.textContent = this.isFeedbackTextValid ? '' : 'Please enter at least 15 characters.';
                }
            }
            errElement.style.visibility = errElement.textContent ? 'visible' : 'hidden';
        };
    
        (window as any).onReset=  function() {
            this.isCurrentStepValid = false;
            this.stepperObj.reset();
            Array.from(this.stepperContentEle.querySelectorAll('.inputContainer')).forEach((ele: HTMLInputElement) => {
                ele.value = '';
                if (ele.classList.contains('new-user')) ele.checked = true;
                else ele.checked = false;
            });
            for (let i = 0; i < this.stepperObj.steps.length; i++) {
                this.stepperObj.steps[i].isValid = null;
            }
        };
    }

    public stepperContents = [
        "<div class='step-content step-content-0 step-active'><div id='agreement-text'><p>Welcome! This survey is an opportunity for you to share your opinions and experiences, contributing to the ongoing improvement of our offerings. Your participation is highly appreciated, and we look forward to gaining a deeper understanding of your preferences. </p></div><label style='margin-top: 15px'>Enter your email <span class='required'>*</span></label><input class='e-input inputContainer' id='add-email' placeholder='Enter here' oninput='onInputChange(this, true)' /><div class='add-email error-label'>Email cannot be empty.</div><button style='margin-top: 20px;' class='e-btn nextStep stepperBtn' onclick='onNextStep(this)'>Next</button></div>",
        "<div class='step-content step-content-1'> <div class='question-container'> <div class='survey-question'><p> Is this the first time you have visited this website? <span class='required'>*</span></p><label> <input type='radio' class='inputContainer new-user' name='service-usage' value='yes' checked={true}> Yes </label> <label style='margin: 0px 10px'> <input type='radio' class='inputContainer old-user' name='service-usage' value='no'> No </label></div> <div class='feedback-section'> <p class='feedback-label'>Anything else you would like to share? <span class='required'>*</span></p> <textarea id='feedback-text' class='inputContainer' placeholder='I have feedback on...' oninput='onInputChange(this)' required></textarea> <div class='feedback-area error-label' style='margin: 0'>Feedback cannot be empty.</div> </div> </div><div style='display: flex;'> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn previousStep' onclick='onPreviousStep(this)'>Previous</button> <button style='margin-top: 20px;' class='e-btn nextStep' onclick='onNextStep(this)'>Submit Feedback</button></div></div></div>",
        "<div class='step-content step-content-2'><div class='confirm-section'><div class='feedback-msg'><b>Please confirm to submit your feedback,</b></div><br/><div class='feedback-msg' id='feedback-message'></div> <button style='margin-top: 20px; margin-right: 5%;' class='e-btn confirmbutton' id='confirm-button' onclick='onConfirm(this)'>Confirm</button></div></div>",
        "<div class='step-content step-content-3'><div class='success-section'><div class='success-message' id='success-message'>Thanks! Feedback has been submitted successfully.</div><button style='margin-top: 20px; margin-right: 5%;' type='reset' class='e-btn e-hide' id='reset-button' onclick='onReset(this)'> Reset </button> </div></div>"
    ];

    handleStepChange(args: StepperChangingEventArgs) {
        this.isUserNavigatingReverse = args.activeStep < args.previousStep ? true : false;
        if (!this.isUserNavigatingReverse) {
            this.setValidState(args);
        }
        // Making the previous and current step invalid if user navigates in reverse order.
        else {
            this.stepperObj.steps[args.activeStep].isValid = this.stepperObj.steps[args.activeStep + 1].isValid = null;
            this.isCurrentStepValid = true;
        }
        if (this.isCurrentStepValid) {
            let stepContent = this.stepperContentEle.querySelector(`.step-content-${args.activeStep}`);
            /* Remove all active class */
            this.stepperContentEle.querySelectorAll('.step-content').forEach((step) => step.classList.remove('step-active'));
            /* Only update the html into DOM if not previously */
            if (!stepContent) {
                this.stepperContentEle.insertAdjacentHTML('beforeend', this.stepperContents[args.activeStep]);
                stepContent = this.stepperContentEle.querySelector(".step-content.step-content-" + args.activeStep);
            }
            /* Update the active class */
            if (stepContent) {
                stepContent.classList.add('step-active');
            }
            if (args.activeStep === 2) {
                let feedbackMessage = this.stepperContentEle.querySelector('#feedback-message');
                feedbackMessage.textContent = (this.stepperContentEle.querySelector('#feedback-text') as HTMLInputElement).value;
            }
        }
    }

    setValidState(args: StepperChangingEventArgs) {
        const stepIndexToValidate = this.stepperObj.activeStep;
        if (this.stepperObj.activeStep === 0) {
            const emailInput = (this.stepperContentEle.querySelector('#add-email') as HTMLInputElement);
            this.isCurrentStepValid = emailInput.value.length && this.isEmailValid;
            (window as any).onInputChange(emailInput, true);
        }
        if (this.stepperObj.activeStep === 1) {
            const radioInputs: NodeListOf<HTMLInputElement> = this.stepperContentEle.querySelectorAll('.survey-question input');
            const isChecked = Array.from(radioInputs).some(input => input.checked);
            this.isCurrentStepValid = isChecked && this.isFeedbackTextValid;
            (window as any).onInputChange((this.stepperContentEle.querySelector('#feedback-text') as HTMLInputElement));
        }
        if (this.stepperObj.activeStep === 2) this.isCurrentStepValid = true;
        args.cancel = !this.isCurrentStepValid;
        this.stepperObj.steps[stepIndexToValidate].isValid = this.isCurrentStepValid;
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="validation-stepper-section">
                        <StepperComponent ref={stepperObj => this.stepperObj = stepperObj} linear={true} stepChanging={(args) => { this.handleStepChange(args);}} created={()=>{this.stepperContentEle.innerHTML = this.stepperContents[this.stepperObj.activeStep];}}>
                            <StepsDirective>
                                <StepDirective iconCss= { 'sf-icon-survey-intro' } text= { 'Survey Introduction' }/>
                                <StepDirective iconCss= { 'sf-icon-survey-feedback' } text= { 'Feedback' }/>
                                <StepDirective iconCss= { 'sf-icon-survey-status' } text= { 'Status' }/>
                            </StepsDirective>
                        </StepperComponent>
                    </div>
                    <div id="validation-step-content" ref={stepperContentRef => this.stepperContentRef = stepperContentRef}></div>
                </div>
                <div id="action-description">
                    <p>This sample showcases the integration of validation support in the Stepper component.</p>
                </div>
                <div id="description">
                    <p>Stepper validation ensures that user inputs are correct and guides them to prevent errors before proceeding to the next step. The <code>isValid</code> property is used for validating the state of each step within the Stepper component.</p>
                </div>
            </div>
        );
    }
}