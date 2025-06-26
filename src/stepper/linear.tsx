import * as React from 'react';
import { StepperComponent, StepsDirective, StepDirective, StepperChangedEventArgs } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './linear.css';

export class Linear extends SampleBase<{}, {}> {

    public stepperObj: StepperComponent;
    public stepperContentRef;
    public stepperContentEle: Element;
    public stepperOptionsRef;
    public stepperOptionsEle: Element;

    componentDidMount(): void {
        this.stepperContentRef = element => { this.stepperContentEle = element; };
        this.stepperOptionsRef = element => { this.stepperOptionsEle = element; };
    };

    updateBack() {
        this.stepperObj.previousStep();
        this.updateContent(this.stepperObj.activeStep);
    };

    updateNext() {
        this.stepperObj.nextStep();
        this.updateContent(this.stepperObj.activeStep);
    };

    toggleNavigationButtons(activeStep: number) {
        document.getElementById('previousStep').style.display = (activeStep !== 0) ? 'block' : 'none';
        document.getElementById('nextStep').style.display = (activeStep !== 3) ? 'block' : 'none';
    }

    updateContent(args: number): void {
        let stepperContent: HTMLElement = document.getElementById('linear-stepper-content') as HTMLElement;
        switch (args) {
            case 0:
                stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>`;
                break;
            case 1:
                stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>Task planning involves creating a comprehensive roadmap that outlines specific tasks, sets achievable milestones, and allocates responsibilities among team members. </li>
                <li>This phase requires a detailed breakdown of the project's requirements, resources, and a strategic timeline to ensure a systematic and efficient execution of tasks.</li>
                </ul>`;
                break;
            case 2:
                stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>In this phase, project managers closely monitor the progress of individual tasks, track the overall project's advancement, and regularly update task statuses.</li><li>Continuous assessment of the project's timeline and potential challenges allows for timely adjustments, ensuring that the project stays on course and within the predefined parameters.</li></ul>`;
                break;
            case 3:
                stepperContent.innerHTML = `<b>Description:</b> <br/><br/> <ul><li>
                The final phase focuses on the comprehensive evaluation of the project's success, completion of all deliverables, and documentation of lessons learned. </li><li>Analyzing the outcomes and documenting the experiences gained during the project's lifecycle are crucial for improving future project management processes and enhancing overall organizational efficiency.</li>`;
                break;
            default:
                break;
        }
        this.toggleNavigationButtons(args);
    }

    updateLinear(args: any) {
        this.stepperObj.linear = (/true/).test(args.currentTarget.value) ? true : false;
        this.stepperObj.reset();
        this.updateContent(this.stepperObj.activeStep);
    };

    handleStepChange(args: StepperChangedEventArgs) {
        this.updateContent(args.activeStep);
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div id="linear-stepper-section">
                        <div className="e-btn-group">
                            <input type="radio" id="linear" name="Linear" value="true" onClick={this.updateLinear.bind(this)} defaultChecked />
                            <label className="e-btn" htmlFor="linear">Linear</label>
                            <input type="radio" id="nonLinear" name="Linear" value="false" onClick={this.updateLinear.bind(this)} />
                            <label className="e-btn" htmlFor="nonLinear">Non-Linear</label>
                        </div>
                    </div>
                    <div className="linear-stepper-control">
                        <StepperComponent ref={stepper => { this.stepperObj = stepper }} linear={true} stepChanged={this.handleStepChange.bind(this)}>
                            <StepsDirective>
                                <StepDirective iconCss={'sf-icon-form'} label={'Project Setup'} />
                                <StepDirective iconCss={'sf-icon-tasksheet'} label={'Task Planning'} />
                                <StepDirective iconCss={'sf-icon-progress'} label={'Progress Tracking'} />
                                <StepDirective iconCss={'sf-icon-submit'} label={'Project Completion'} />
                            </StepsDirective>
                        </StepperComponent>
                    </div>
                    <div id="linear-stepper-content" ref={stepperContent => { this.stepperContentRef = stepperContent }}>
                        <b>Description:</b> <br /><br /> <ul><li>During this phase, the project's scope and objectives are clearly defined, along with the establishment of initial settings and parameters.</li><li>This step involves outlining the primary goals, deliverables, and the overall vision of the project to ensure a comprehensive understanding among all stakeholders.</li></ul>
                    </div>
                    <div className="linear-stepper-options" style={{ display: "inline-flex" }} ref={stepperOptions => { this.stepperOptionsRef = stepperOptions }}>
                        <button id="previousStep" style={{ marginRight: "15px", display: "none" }} onClick={this.updateBack.bind(this)} className="e-btn">Back</button>
                        <button id="nextStep" style={{display: "block"}} onClick={this.updateNext.bind(this)} className="e-btn">Next</button>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample showcases the usage of the <code>linear</code> property in the Stepper component.</p>
                </div>
                <div id="description">
                    <p>In a linear process, users progress through steps one after the other in a sequential order. In a non-linear process, users have the flexibility to skip or complete steps in any order they prefer. In this example, the progress status can be interacted with in both a linear and nonlinear manner using the <code>linear</code> property.</p>
                </div>
            </div>
        )
    }
}
