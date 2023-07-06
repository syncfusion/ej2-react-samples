/**
 * Sample for linear progress bar
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useState } from 'react';
import { ProgressBarComponent, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-react-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
 #control-container {
     padding: 0px !important;
 }
 .linear-parent {
     text-align: center;
     margin-top: 2%;
 }
 .linear-button {
     text-align: center;
 }
 .linear-progress {
     width: 80%;
     margin: auto;
     margin-bottom: 3%;
 }
 #reLoad {
     border-radius: 4px;
     text-transform: capitalize;
 }
     `;
/**
 * Area sample
 */
const ProgressBarStripes = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const progressThickness: number = 20;
    const trackThickness: number = 20;
    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if (args.progressBar.theme === 'Material') {
            args.progressBar.trackColor = '#eee';
        }
        if (selectedTheme === 'highcontrast') {
            args.progressBar.trackColor = '#969696';
        }
    }
    const [animation, setAnimation] = useState<AnimationModel>({
        enable: true,
        duration: 2000,
        delay: 0,
    });
    const [buttonvalue, setButtonValue] = useState("Stop Animation");
    const replayClick = (): void => {
        setAnimation({ ...animation, enable: !animation.enable ? true : false });
        setButtonValue(!animation.enable ? 'Stop Animation' : 'Start Animation');
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row linear-parent">
                    <div id="success" className="linear-progress">
                        <ProgressBarComponent id="success" type='Linear' height='30' width='100%' value={20} progressThickness={progressThickness}
                            trackThickness={trackThickness} role="Success" isStriped={true} animation={animation}
                            load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                    <div id="info" className="linear-progress">
                        <ProgressBarComponent id="info" type='Linear' height='30' width='100%' value={40} progressThickness={progressThickness}
                            trackThickness={trackThickness} isStriped={true} role='Info' animation={animation}
                            load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                    <div id="warning" className="linear-progress">
                        <ProgressBarComponent id="warning" type='Linear' height='30' width='100%' value={70}
                            progressThickness={progressThickness} trackThickness={trackThickness}
                            isStriped={true} role='Warning' animation={animation} load={progressLoad.bind(this)}
                        >
                        </ProgressBarComponent>
                    </div>
                    <div id="danger" className="linear-progress">
                        <ProgressBarComponent id="danger" type='Linear' height='30' width='100%' value={100}
                            progressThickness={progressThickness} trackThickness={trackThickness} 
                            isStriped={true} role='Danger' animation={animation} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                </div>
                <div style={{ marginTop: '2%', marginLeft: '45.5%' }}>
                    <button onClick={replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">
                        {buttonvalue}
                    </button>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a striped linear progress bar with animation.
                </p>
            </div>
            <div id="description">
                <p>This demo for Progress Bar control shows the linear striped progress bar  with help of <code>isStriped</code>property.</p>
            </div>
        </div>
    )

}
export default ProgressBarStripes;