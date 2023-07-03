/**
 * Sample for custom content
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation, ILoadedEventArgs, ProgressTheme, IProgressValueEventArgs, AnimationModel
} from '@syncfusion/ej2-react-progressbar';
import { updateSampleSection } from '../common/sample-base';
import { EmitType } from '@syncfusion/ej2-base';


const SAMPLE_CSS = `
         .control-fluid {
         padding: 0px !important;
         }
     #control-container {
         padding: 0px !important;
     }
 
     .progress-bar-parent {
         margin-top: 8%;
         text-align: center;
     }
 
     .paligncenter {
         text-align: center;
     }
 
     .plabeltxt {
         font-size: 20px;
         font-weight: bold;
     }
 
     .reload-btn {
         text-align: center;
         margin-top: 3%;
     }
 
     #reLoad {
         border-radius: 4px;
         text-transform: capitalize;
     }
     `;

const ProgressBarCustomContents = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const pausePlay = useRef<ProgressBarComponent>(null);
    const annotate = useRef<ProgressBarComponent>(null);
    const downloadProgress = useRef<ProgressBarComponent>(null);
    let clearTimeout1: number;
    let clearTimeout2: number;
    const animation: AnimationModel = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    const content1: string = `<img src="src/progress-bar/images/material-pause.svg"></img>`;
    const content2: string = `<img src="src/progress-bar/images/material-Download.svg"></img>`;
    const content3: string = '<div id="point1" style="font-size:20px;font-weight:bold;color:#b52123;fill:#b52123"><span>80%</span></div>';
    const annotationColors: {
        material: string,
        fabric: string,
        bootstrap: string,
        bootstrap4: string,
        highcontrast: string,
        tailwind: string,
        bootstrap5dark: string,
        bootstrapdark: string,
        fabricdark: string,
        materialdark: string,
        tailwinddark: string
        bootstrap5: string,
        fluent: string,
        fluentdark: string,
        material3: string,
        material3dark: string
    } = { fluent: '#0D6EFD', fluentdark: '#0D6EFD',  material: '#e91e63', fabric: '#0078D6', bootstrap: '#317ab9', bootstrap4: '#007bff', highcontrast: '#FFD939', tailwind: '#4F46E5', bootstrap5: '#0D6EFD', bootstrap5dark: '#0D6EFD', bootstrapdark: '#9A9A9A', fabricdark: '#9A9A9A', materialdark: '#9A9A9A', tailwinddark: '#22D3EE', material3 : '#6750A4', material3dark: '#D0BCFF' };
    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if (args.progressBar.element.id === 'label-container') {
            // tslint:disable-next-line:max-line-length
            args.progressBar.annotations[0].content = '<div id="point1" class="plabeltxt" style="color: ' + annotationColors[selectedTheme.replace(/-/i, '')] + ' "><span>80%</span></div>';
        } else if (args.progressBar.element.id === 'download-container') {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + selectedTheme.replace(/-/i, '') + '-Download.svg"></img>';
        } else {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + selectedTheme.replace(/-/i, '') + '-pause.svg"></img>';
        }
    }
    const reloadClick = (): void => {
        pausePlay.current.refresh();
        downloadProgress.current.refresh();
        annotate.current.refresh();
    }
    const progressCompleted = () => {
        clearTimeout(clearTimeout1);
        clearTimeout1 = +setTimeout(
            () => {
                //tslint:disable-next-line
                pausePlay.current.annotations[0].content = '<img src="src/progress-bar/images/' + (pausePlay.current.theme).toLowerCase() + '-Play.svg"></img>';
                pausePlay.current.dataBind();
            },
            2000);
    }

    const progressCompleted2 = () => {
        clearTimeout(clearTimeout2);
        clearTimeout2 = +setTimeout(
            () => {
                //tslint:disable-next-line
                downloadProgress.current.annotations[0].content = '<img src="src/progress-bar/images/' + (downloadProgress.current.theme).toLowerCase() + '-Tick.svg"></img>';
                downloadProgress.current.dataBind();
            },
            2000);
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className="control-section progress-bar-parent">
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-4 paligncenter">
                        <ProgressBarComponent id="label-container" ref={annotate} type='Circular' width='160px' height='160px'
                            cornerRadius='Round' startAngle={180} endAngle={180} value={80} animation={animation}
                            progressCompleted={progressCompleted.bind(this)} load={progressLoad.bind(this)}>
                            <Inject services={[ProgressAnnotation]} />
                            <ProgressBarAnnotationsDirective>
                                <ProgressBarAnnotationDirective content={content3} />
                            </ProgressBarAnnotationsDirective>
                        </ProgressBarComponent>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 paligncenter">
                        <ProgressBarComponent id="pause-container" ref={pausePlay} type='Circular' width='160px' height='160px'
                            value={100} animation={animation} progressCompleted={progressCompleted.bind(this)}
                            load={progressLoad.bind(this)}>
                            <Inject services={[ProgressAnnotation]} />
                            <ProgressBarAnnotationsDirective>
                                <ProgressBarAnnotationDirective content={content1} />
                            </ProgressBarAnnotationsDirective>
                        </ProgressBarComponent>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 paligncenter">
                        <ProgressBarComponent id="download-container" ref={downloadProgress} type='Circular' width='160px'
                            height='160px' value={100} enableRtl={false} animation={{ enable: true, duration: 2000, delay: 0, }}
                            progressCompleted={progressCompleted2.bind(this)} load={progressLoad.bind(this)}>
                            <Inject services={[ProgressAnnotation]} />
                            <ProgressBarAnnotationsDirective>
                                <ProgressBarAnnotationDirective content={content2} />
                            </ProgressBarAnnotationsDirective>
                        </ProgressBarComponent>

                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 reload-btn">
                        <button onClick={reloadClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">
                            Reload
                        </button>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates a circular progress bar to show <code>progressCompleted</code> event with <code>annotation</code>.</p>
            </div>
            <div id="description">
                <p>This demo for Essential JS2 Progress Bar control shows the progress bar with custom content with the help of annotation.</p>
            </div>
        </div>
    )

}
export default ProgressBarCustomContents;