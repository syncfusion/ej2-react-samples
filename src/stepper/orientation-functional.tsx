import * as React from 'react';
import { useEffect, useRef } from 'react';
import { StepperComponent, StepsDirective, StepDirective } from '@syncfusion/ej2-react-navigations';
import { updateSampleSection } from '../common/sample-base';
import './orientation.css';

const Orientation = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    let stepperObj = useRef<StepperComponent>(null);

    const updateOrientation = (args: React.MouseEvent<HTMLInputElement>): void => {
        stepperObj.current.orientation = args.currentTarget.value;
    };
    const updateLabelPosition = (args: React.MouseEvent<HTMLInputElement>): void => {
        stepperObj.current.labelPosition = args.currentTarget.value;
    };

    return (
        <div className='control-pane'>
            <div className='control-section'>
                <div className="orientation-stepper-section">
                    <div id="orientation-options">
                        <div className="orientation-header-wrapper">
                            <p> Orientation </p>
                            <div className="e-btn-group">
                                <input type="radio" id="horizontal" name="orientation" value="horizontal" onClick={updateOrientation} defaultChecked />
                                <label className="e-btn" htmlFor="horizontal">Horizontal</label>
                                <input type="radio" id="vertical" name="orientation" value="vertical" onClick={updateOrientation} />
                                <label className="e-btn" htmlFor="vertical">Vertical</label>
                            </div>
                        </div>
                        <div className="orientation-header-wrapper">
                            <p> Label Position </p>
                            <div className="e-btn-group">
                                <input type="radio" id="start" name="position" value="start" onClick={updateLabelPosition} />
                                <label className="e-btn" htmlFor="start">Start</label>
                                <input type="radio" id="end" name="position" value="end" onClick={updateLabelPosition} defaultChecked />
                                <label className="e-btn" htmlFor="end">End</label>
                                <input type="radio" id="top" name="position" value="top" onClick={updateLabelPosition} />
                                <label className="e-btn" htmlFor="top">Top</label>
                                <input type="radio" id="bottom" name="position" value="bottom" onClick={updateLabelPosition} />
                                <label className="e-btn" htmlFor="bottom">Bottom</label>
                            </div>
                        </div>
                    </div>
                    <div className="orientation-stepper-control">
                        <StepperComponent ref={stepperObj} activeStep={1} labelPosition="end">
                            <StepsDirective>
                                <StepDirective iconCss={'sf-icon-ordered'} label={'Orders'} />
                                <StepDirective iconCss={'sf-icon-review'} label={'Review'} />
                                <StepDirective iconCss={'sf-icon-package'} label={'Packing'} />
                                <StepDirective iconCss={'sf-icon-delivery'} label={'Shipping'} />
                            </StepsDirective>
                        </StepperComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample showcases the orientation option in the Stepper component.</p>
            </div>
            <div id="description">
                <p>This example demonstrates how to switch between different orientations and change the label position within the Stepper (<code>start</code>, <code>end</code>, <code>top</code>, <code>bottom</code>). The Stepper control can be oriented <code>horizontally</code> or <code>vertically</code> using the <code>orientation</code> property.</p>
            </div>
        </div>
    );
}
export default Orientation;