/**
 * Sample for custom content
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation, ILoadedEventArgs, ProgressTheme, IProgressValueEventArgs
} from '@syncfusion/ej2-react-progressbar';
import { SampleBase } from '../common/sample-base';
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

export class ProgressBarCustomContents extends SampleBase<{}, {}> {

    private pausePlay: ProgressBarComponent;
    private annotate: ProgressBarComponent;
    private downloadProgress: ProgressBarComponent;
    private clearTimeout1: number;
    private clearTimeout2: number;
    private content1: string = `<img src="src/progress-bar/images/material-pause.svg"></img>`;
    private content2: string = `<img src="src/progress-bar/images/material-Download.svg"></img>`;
    private content3: string = '<div id="point1" style="font-size:20px;font-weight:bold;color:#b52123;fill:#b52123"><span>80%</span></div>';
    private annotationColors: {
        material: string,
        fabric: string,
        bootstrap: string,
        bootstrap4: string,
        highcontrast: string
    } = { material: '#e91e63', fabric: '#0078D6', bootstrap: '#317ab9', bootstrap4: '#007bff', highcontrast: '#FFD939' };
    private progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        if (args.progressBar.element.id === 'label-container') {
            // tslint:disable-next-line:max-line-length
            args.progressBar.annotations[0].content = '<div id="point1" class="plabeltxt" style="color: ' + this.annotationColors[selectedTheme] + ' "><span>80%</span></div>';
        } else if (args.progressBar.element.id === 'download-container') {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + selectedTheme + '-Download.svg"></img>';
        } else {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + selectedTheme + '-pause.svg"></img>';
        }
    }
    private reloadClick(): void {
        this.pausePlay.refresh();
        this.downloadProgress.refresh();
        this.annotate.refresh();
    }
    private progressCompleted = (args: IProgressValueEventArgs) => {
        clearTimeout(this.clearTimeout1);
        this.clearTimeout1 = +setTimeout(
            () => {
                //tslint:disable-next-line
                this.pausePlay.annotations[0].content = '<img src="src/progress-bar/images/' + (this.pausePlay.theme).toLowerCase() + '-Play.svg"></img>';
                this.pausePlay.dataBind();
            },
            2000);
    }

    private progressCompleted2 = (args: IProgressValueEventArgs) => {
        clearTimeout(this.clearTimeout2);
        this.clearTimeout2 = +setTimeout(
            () => {
                //tslint:disable-next-line
                this.downloadProgress.annotations[0].content = '<img src="src/progress-bar/images/' + (this.downloadProgress.theme).toLowerCase() + '-Tick.svg"></img>';
                this.downloadProgress.dataBind();
            },
            2000);
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section progress-bar-parent">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 paligncenter">
                            <ProgressBarComponent id="label-container" ref={annotation => this.annotate = annotation}
                                type='Circular'
                                width='160px'
                                height='160px'
                                cornerRadius='Round'
                                startAngle={180}
                                endAngle={180}
                                value={80}
                                animation={{
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }}
                                progressCompleted={this.progressCompleted.bind(this)}
                                load={this.progressLoad.bind(this)}
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content3}>

                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>

                            </ProgressBarComponent>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 paligncenter">
                            <ProgressBarComponent id="pause-container" ref={pausePlay => this.pausePlay = pausePlay}
                                type='Circular'
                                width='160px'
                                height='160px'
                                value={100}
                                animation={{
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }}
                                progressCompleted={this.progressCompleted.bind(this)}
                                load={this.progressLoad.bind(this)}
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content1}>

                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>

                            </ProgressBarComponent>

                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 paligncenter">
                            <ProgressBarComponent id="download-container" ref={downloadProgress => this.downloadProgress = downloadProgress}
                                type='Circular'
                                width='160px'
                                height='160px'
                                value={100}
                                enableRtl={false}
                                animation={{
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }}
                                progressCompleted={this.progressCompleted2.bind(this)}
                                load={this.progressLoad.bind(this)}
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content2}>
                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>

                            </ProgressBarComponent>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 reload-btn">
                            <button onClick={this.reloadClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button>
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
}