/**
 * Default sample
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef, useState, CSSProperties } from 'react';
import { ProgressBarComponent, ILoadedEventArgs, ProgressTheme, AnimationModel } from '@syncfusion/ej2-react-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
     .annotaion-pro {
             font-family: Roboto-Regular;
             font-size: 20px;
             color: #1B1C1A;
             letter-spacing: 0.01px;
         }
         .progress-bar-parent {
             margin-top: 8%;
             text-align: center;
         }
         .progress-text {
             display: inline-flex;
             margin: auto;
         }
         .progress-text-align {
             font-family: Roboto-Regular;
             font-size: 12px;
             color: #3D3E3C;
             letter-spacing: 0;
             margin: auto;
         }
 
         #control-container {
             padding: 0px !important;
         }
 
         .progress-container-align {
             text-align: center;
         }
 
         .reload-btn {
             text-align: center;
         }
 
         #reLoad {
             border-radius: 4px;
             text-transform: capitalize;
             margin-top: 3%;
         }
 
         .progress-container {
             /*height: -webkit-fill-available; */
             display: inline-flex;
         }
     `;

const ProgressBarDefault = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const circluar = useRef<ProgressBarComponent>(null);
    const rtl = useRef<ProgressBarComponent>(null);
    const track = useRef<ProgressBarComponent>(null);
    const rounded = useRef<ProgressBarComponent>(null);
    const [style, setStyle] = useState<CSSProperties>({ color: "" });
    const animation: AnimationModel = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    const replayClick = (): void => {
        circluar.current.refresh();
        rtl.current.refresh();
        track.current.refresh();
        rounded.current.refresh();
    }
    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
            || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
            setStyle({ color: "White" });
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className="control-section progress-bar-parent">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-3 progress-container">
                        <div className="row progress-container-align">
                            <div className="col-lg-12 col-md-12 col-12">
                                <ProgressBarComponent id="circular-container" ref={circluar}
                                    type='Circular' width='160px' height='160px' enableRtl={false} startAngle={180} endAngle={180}
                                    value={100} animation={animation} load={progressLoad.bind(this)}>
                                </ProgressBarComponent>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12 progress-text">
                                <div className="progress-text-align" style={style}>Determinate</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container">
                        <div className="row progress-container-align">
                            <div className="col-lg-12 col-md-12 col-12">
                                <ProgressBarComponent id="rtl-container" ref={rtl} type='Circular' width='160px' height='160px'
                                    secondaryProgress={90} value={70} animation={animation} load={progressLoad.bind(this)} >
                                </ProgressBarComponent>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12 progress-text">
                                <div className="progress-text-align" style={style}>Buffer </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container">
                        <div className="row progress-container-align">
                            <div className="col-lg-12 col-md-12 col-12">
                                <ProgressBarComponent id="track-container" ref={track} type='Circular' width='160px' height='160px'
                                    minimum={0} maximum={100} segmentCount={4} value={100} animation={animation}
                                    load={progressLoad.bind(this)} >
                                </ProgressBarComponent>
                            </div>
                            <div className="col-lg-12 col-md-12 col-12 progress-text">
                                <div className="progress-text-align" style={style}>Segment</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container">
                        <div className="row progress-container-align">
                            <div className="col-lg-12 col-md-12 col-12">
                                <ProgressBarComponent id="rounded-container" ref={rounded} type='Circular' width='160px' height='160px'
                                    cornerRadius='Round' isIndeterminate={true} value={20} animation={animation}
                                    load={progressLoad.bind(this)}>
                                </ProgressBarComponent>

                            </div>
                            <div className="col-lg-12 col-md-12 col-12 progress-text">
                                <div className="progress-text-align" style={style}>Indeterminate</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 reload-btn">
                        <button onClick={replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">
                            Reload
                        </button>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a circular progress bar with determinate and indeterminate states, segments and buffer value.
                </p>
            </div>
            <div id="description">
                <p>
                    The sample shows the determinate and indeterminate states, buffer and segments of circular progress bar.
                </p>
            </div>
        </div>
    )

}
export default ProgressBarDefault;