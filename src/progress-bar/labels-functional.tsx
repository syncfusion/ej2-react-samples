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
function ProgressBarLabels() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])

    let linearOne: ProgressBarComponent;
    let linearTwo: ProgressBarComponent;
    let linearThree: ProgressBarComponent;
    let linearFour: ProgressBarComponent;
    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if (args.progressBar.theme === 'Material') {
            args.progressBar.trackColor = '#EAEAEA';
        }
    }
    function replayClick(): void {
        linearOne.refresh();
        linearTwo.refresh();
        linearThree.refresh();
        linearFour.refresh();
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
                            height='40'
                            width='100%'
                            showProgressValue={true}
                            value={40}
                            trackThickness={24}
                            progressThickness={24}
                            labelStyle={{
                                textAlignment: 'Center',
                                text: '40% Complete (Success)',
                                color: '#ffffff'
                            }}
                            role='Success'
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
                            height='40'
                            width='100%'
                            showProgressValue={true}
                            value={50}
                            trackThickness={24}
                            progressThickness={24}
                            labelStyle={{
                                textAlignment: 'Center',
                                text: '50% Complete (Info)',
                                color: '#ffffff'
                            }}
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
                            height='40'
                            width='100%'
                            showProgressValue={true}
                            value={60}
                            trackThickness={24}
                            progressThickness={24}
                            labelStyle={{
                                textAlignment: 'Center',
                                text: '60% Complete (Warning)',
                                color: '#ffffff'
                            }}
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
                            height='40'
                            width='100%'
                            showProgressValue={true}
                            value={70}
                            trackThickness={24}
                            progressThickness={24}
                            labelStyle={{
                                textAlignment: 'Center',
                                text: '70% Complete (Danger)',
                                color: '#ffffff'
                            }}
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
                <div id="replay-progressbar" style={{ marginTop: '2%', marginLeft: '45.5%' }}><button onClick={replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button></div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a linear progress bar to demonstrate different types of labels rendering.
                </p>
            </div>
            <div id="description">
                <p>This demo for Essential JS2 Progress Bar control shows the linear progress bar with different labels format with help of <code>labelStyle</code> and provide different modes using <code>role</code> property.</p>
            </div>
        </div>
    )

}
export default ProgressBarLabels;