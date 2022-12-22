/**
 * Sample for linear progress bar
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { ProgressBarComponent, ILoadedEventArgs, ProgressTheme } from '@syncfusion/ej2-react-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

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
function ProgressBarStripes() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let linearOne: ProgressBarComponent;
    let linearTwo: ProgressBarComponent;
    let linearThree: ProgressBarComponent;
    let linearFour: ProgressBarComponent;
    let animationBtn: HTMLButtonElement;
    let progressThickness: number = 20;
    let trackThickness: number = 20;
    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
    }
    function replayClick(): void {
        if (!linearOne.animation.enable) {
            linearOne.animation.enable = true;
            animationBtn.innerHTML = 'Stop Animation';
            linearOne.refresh();
        } else {
            linearOne.animation.enable = false;
            animationBtn.innerHTML = 'Start Animation';
            linearOne.refresh();
        }
        if (!linearTwo.animation.enable) {
            linearTwo.animation.enable = true;
            animationBtn.innerHTML = 'Stop Animation';
            linearTwo.refresh();
        } else {
            linearTwo.animation.enable = false;
            animationBtn.innerHTML = 'Start Animation';
            linearTwo.refresh();
        }
        if (!linearThree.animation.enable) {
            linearThree.animation.enable = true;
            animationBtn.innerHTML = 'Stop Animation';
            linearThree.refresh();
        } else {
            linearThree.animation.enable = false;
            animationBtn.innerHTML = 'Start Animation';
            linearThree.refresh();
        }
        if (!linearFour.animation.enable) {
            linearFour.animation.enable = true;
            animationBtn.innerHTML = 'Stop Animation';
            linearFour.refresh();
        } else {
            linearFour.animation.enable = false;
            animationBtn.innerHTML = 'Start Animation';
            linearFour.refresh();
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row linear-parent">
                    <div id="success" className="linear-progress">
                        <ProgressBarComponent id="success"
                            ref={linear1 => linearOne = linear1}
                            type='Linear'
                            height='30'
                            width='100%'
                            value={20}
                            progressThickness={progressThickness}
                            trackThickness={trackThickness}
                            role="Success"
                            trackColor='#F5F5F5'
                            isStriped={true}
                            animation={{
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }}
                            load={progressLoad.bind(this)}
                        >
                        </ProgressBarComponent>
                    </div>
                    <div id="info" className="linear-progress">
                        <ProgressBarComponent id="info"
                            ref={linear2 => linearTwo = linear2}
                            type='Linear'
                            height='30'
                            width='100%'
                            value={40}
                            progressThickness={progressThickness}
                            trackThickness={trackThickness}
                            trackColor='#F5F5F5'
                            isStriped={true}
                            role='Info'
                            animation={{
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }}
                            load={progressLoad.bind(this)}
                        >
                        </ProgressBarComponent>
                    </div>
                    <div id="warning" className="linear-progress">
                        <ProgressBarComponent id="warning"
                            ref={linear3 => linearThree = linear3}
                            type='Linear'
                            height='30'
                            width='100%'
                            value={70}
                            progressThickness={progressThickness}
                            trackThickness={trackThickness}
                            trackColor='#F5F5F5'
                            isStriped={true}
                            role='Warning'
                            animation={{
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }}
                            load={progressLoad.bind(this)}
                        >
                        </ProgressBarComponent>
                    </div>
                    <div id="danger" className="linear-progress">
                        <ProgressBarComponent id="danger"
                            ref={linear4 => linearFour = linear4}
                            type='Linear'
                            height='30'
                            width='100%'
                            value={100}
                            progressThickness={progressThickness}
                            trackThickness={trackThickness}
                            trackColor='#F5F5F5'
                            isStriped={true}
                            role='Danger'
                            animation={{
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }}
                            load={progressLoad.bind(this)}
                        >
                        </ProgressBarComponent>
                    </div>
                </div>
                <div style={{ marginTop: '2%', marginLeft: '45.5%' }}><button ref={btn => animationBtn = btn} onClick={replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Stop Animation</button></div>
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