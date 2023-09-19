/**
 * Default sample
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation, ILoadedEventArgs, ProgressTheme
} from '@syncfusion/ej2-react-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';


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

export class ProgressBarDefault extends SampleBase<{}, {}> {

    private circluar: ProgressBarComponent;
    private rtl: ProgressBarComponent;
    private track: ProgressBarComponent;
    private rounded: ProgressBarComponent;
    private content: string = '<div id="point1" style="font-size:20px;font-weight:bold;color:#b52123;fill:#b52123"><span>80%</span></div>';
    private annotationColors: string[] = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#FFD939'];
    private replayClick(): void {
        this.circluar.refresh();
        this.rtl.refresh();
        this.track.refresh();
        this.rounded.refresh();
    }
    private progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let div: HTMLCollection = document.getElementsByClassName('progress-text-align');
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if(args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
        || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
                for (let i = 0; i < div.length; i++) {
                    div[i].setAttribute('style', 'color:white');
                }
         }
    }

    render() {
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
                                    <ProgressBarComponent id="circular-container" ref={progressbar1 => this.circluar = progressbar1}
                                        type='Circular'
                                        width='160px'
                                        height='160px'
                                        enableRtl={false}
                                        startAngle={180}
                                        endAngle={180}
                                        value={100}
                                        animation={{
                                            enable: true,
                                            duration: 2000,
                                            delay: 0,
                                        }}
                                        load={this.progressLoad.bind(this)}
                                    >
                                    </ProgressBarComponent>
                                </div>
                                <div className="col-lg-12 col-md-12 col-12 progress-text">
                                    <div className="progress-text-align">Determinate</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="row progress-container-align">
                                <div className="col-lg-12 col-md-12 col-12">
                                    <ProgressBarComponent id="rtl-container" ref={progressbar2 => this.rtl = progressbar2}
                                        type='Circular'
                                        width='160px'
                                        height='160px'
                                        secondaryProgress={90}
                                        value={70}
                                        animation={{
                                            enable: true,
                                            duration: 2000,
                                            delay: 0,
                                        }}
                                        load={this.progressLoad.bind(this)}
                                    >
                                    </ProgressBarComponent>
                                </div>
                                <div className="col-lg-12 col-md-12 col-12 progress-text">
                                    <div className="progress-text-align">Buffer </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="row progress-container-align">
                                <div className="col-lg-12 col-md-12 col-12">
                                    <ProgressBarComponent id="track-container" ref={progressbar3 => this.track = progressbar3}
                                        type='Circular'
                                        width='160px'
                                        height='160px'
                                        minimum={0}
                                        maximum={100}
                                        segmentCount={4}
                                        value={100}
                                        animation={{
                                            enable: true,
                                            duration: 2000,
                                            delay: 0,
                                        }}
                                        load={this.progressLoad.bind(this)}
                                    >
                                    </ProgressBarComponent>
                                </div>
                                <div className="col-lg-12 col-md-12 col-12 progress-text">
                                    <div className="progress-text-align">Segment</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="row progress-container-align">
                                <div className="col-lg-12 col-md-12 col-12">
                                    <ProgressBarComponent id="rounded-container" ref={progressbar4 => this.rounded = progressbar4}
                                        type='Circular'
                                        width='160px'
                                        height='160px'
                                        cornerRadius='Round'
                                        isIndeterminate={true}
                                        value={20}
                                        animation={{
                                            enable: true,
                                            duration: 2000,
                                            delay: 0,
                                        }}
                                        load={this.progressLoad.bind(this)}
                                    >
                                    </ProgressBarComponent>

                                </div>
                                <div className="col-lg-12 col-md-12 col-12 progress-text">
                                    <div className="progress-text-align">Indeterminate</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 reload-btn">
                            <button onClick={this.replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button>
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
}