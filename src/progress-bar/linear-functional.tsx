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
         width: 80%;
         margin: auto !important;
     }
 
     .progressbar-label {
         text-align: left;
         font-family: Roboto-Regular;
         font-size: 14px;
         color: #3D3E3C;
         margin-left: 10px;
         padding: 0px;
         top: 10px;
     }
 
     .reload-btn {
        text-align: center;
    }
    
     #reLoad {
         border-radius: 4px;
         text-transform: capitalize;
     }
     `;
/**
 * Area sample
 */
function ProgressBarLinear() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    let progressInstance: ProgressBarComponent;
    let linearOne: ProgressBarComponent;
    let linearTwo: ProgressBarComponent;
    let linearThree: ProgressBarComponent;
    let linearFour: ProgressBarComponent;
    let linearFive: ProgressBarComponent;
    let progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let div: HTMLCollection = document.getElementsByClassName('progressbar-label');
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
            || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark') {
            for (let i = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
        if (selectedTheme === 'fabric') {
            args.progressBar.secondaryProgressColor = '#b0d0e9'
        } else if (selectedTheme === 'material-dark') {
            args.progressBar.secondaryProgressColor = '#b8b8b8'
        } else if (selectedTheme === 'material') {
            args.progressBar.secondaryProgressColor = '#f087ab'
        } else if (selectedTheme === 'bootstrap5-dark') {
            args.progressBar.secondaryProgressColor = '#2b5288'
        } else if (selectedTheme === 'bootstrap5') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
        } else if (selectedTheme === 'bootstrap') {
            args.progressBar.secondaryProgressColor = '#acc6dc'
        }
        else if (selectedTheme === 'bootstrap4') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
        }
        else if (selectedTheme === 'bootstrap-dark') {
            args.progressBar.secondaryProgressColor = '#b8b8b8'
        } else if (selectedTheme === 'highcontrast') {
            args.progressBar.secondaryProgressColor = '#aca379'
        } else if (selectedTheme === 'fluent-dark') {
            args.progressBar.secondaryProgressColor = '#2b5288'
        } else if (selectedTheme === 'fluent') {
            args.progressBar.secondaryProgressColor = '#98c5f5'
        } else if (selectedTheme === 'tailwind-dark') {
            args.progressBar.secondaryProgressColor = '#386e7f'
        } else if (selectedTheme === 'tailwind') {
            args.progressBar.secondaryProgressColor = '#b1afe9'
        }
    }
    function replayClick(): void {
        linearOne.refresh();
        linearTwo.refresh();
        linearThree.refresh();
        linearFour.refresh();
        linearFive.refresh();
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row linear-parent" style={{ marginLeft: '10%' }}>
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '1%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" >Determinate</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="lineardeterminate"
                                ref={linear1 => linearOne = linear1}
                                type='Linear'
                                height='60'
                                value={100}
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
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" >Indeterminate</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearindeterminate"
                                ref={linear2 => linearTwo = linear2}
                                type='Linear'
                                height='60'
                                value={20}
                                isIndeterminate={true}
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
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" >Segment</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearsegment"
                                ref={linear3 => linearThree = linear3}
                                type='Linear'
                                height='60'
                                value={100}
                                segmentCount={8}
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
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" >Buffer</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearbuffer"
                                ref={linear4 => linearFour = linear4}
                                type='Linear'
                                height='60'
                                value={40}
                                secondaryProgress={60}
                                secondaryProgressColor=""
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
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" >Active</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearactive"
                                ref={linear5 => linearFive = linear5}
                                type='Linear'
                                height='60'
                                value={100}
                                isActive={true}
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
                </div>
                <div className="linear-parent">
                <div id="replay-progressbar"><button onClick={replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button></div>
                </div>
            </div>
            <div id="action-description">
                <p>
                This sample illustrates a linear progress bar with determinate and indeterminate states, segments, and buffer values.
                </p>
            </div>
            <div id="description">
                <p>In this example, you can see how to render and configure a linear progress bar. A progress bar is used to visualize the progression of an extended operation. The sample shows the determinate and indeterminate states, buffer values, and segments of a linear progress bar.</p>
            </div>
        </div>
    )
}
export default ProgressBarLinear;