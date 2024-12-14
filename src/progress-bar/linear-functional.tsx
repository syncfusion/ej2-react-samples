/**
 * Sample for linear progress bar
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef, useState, CSSProperties } from 'react';
import { ProgressBarComponent, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-react-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

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
 
     #reLoad {
         border-radius: 4px;
         text-transform: capitalize;
     }
     `;
/**
 * Area sample
 */
const ProgressBarLinear = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const linearOne = useRef<ProgressBarComponent>(null);
    const linearTwo = useRef<ProgressBarComponent>(null);
    const linearThree = useRef<ProgressBarComponent>(null);
    const linearFour = useRef<ProgressBarComponent>(null);
    const linearFive = useRef<ProgressBarComponent>(null);
    const [style, setStyle] = useState<CSSProperties>({ color: "" });
    const animation: AnimationModel = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ProgressTheme;
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
            || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'Tailwind3Dark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark' || args.progressBar.theme === 'Fluent2Dark' || args.progressBar.theme === 'Fluent2HighContrast') {
            setStyle({ color: "White" });
        }
    }
    const replayClick = (): void => {
        linearOne.current.refresh();
        linearTwo.current.refresh();
        linearThree.current.refresh();
        linearFour.current.refresh();
        linearFive.current.refresh();
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row linear-parent" style={{ marginLeft: '10%' }}>
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '1%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" style={style}>Determinate</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="lineardeterminate" ref={linearOne} type='Linear' height='60' value={100}
                                animation={animation} load={progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" style={style}>Indeterminate</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearindeterminate" ref={linearTwo} type='Linear' height='60' value={20}
                                isIndeterminate={true} animation={animation} load={progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" style={style}>Segment</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearsegment" ref={linearThree} type='Linear' height='60' value={100}
                                segmentCount={8} animation={animation} load={progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" style={style}>Buffer</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearbuffer" ref={linearFour} type='Linear' height='60' value={40}
                                secondaryProgress={60} animation={animation} load={progressLoad.bind(this)} >
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                        <div className="col-lg-12 col-md-12 progressbar-label" style={style}>Active</div>
                        <div className="linear-progress">
                            <ProgressBarComponent id="linearactive" ref={linearFive} type='Linear' height='60' value={100} isActive={true}
                                animation={{ enable: true, duration: 2000, delay: 0, }} load={progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                    </div>
                </div>
                <div id="replay-progressbar" style={{ marginTop: '2%', marginLeft: '45.5%' }}>
                    <button onClick={replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">
                        Reload
                    </button>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a linear progress bar with determinate and indeterminate states, segments and buffer value.
                </p>
            </div>
            <div id="description">
                <p>The sample shows the determinate and indeterminate states, buffer and segments of linear progress bar.</p>
            </div>
        </div>
    )

}
export default ProgressBarLinear;