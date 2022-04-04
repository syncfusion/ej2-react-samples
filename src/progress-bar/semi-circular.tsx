/**
 * Sample for semi circular progress bar
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation, ProgressTheme, ILoadedEventArgs
} from '@syncfusion/ej2-react-progressbar';
import { Browser } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';


const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #control-container {
        padding: 0px !important;
    }
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

    `;

export class ProgressBarSemiCircular extends SampleBase<{}, {}> {
    private annotationColors: string[] = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939', '#9A9A9A', '#22D3EE', '#0D6EFD'];
    private content1: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    private content2: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    private content3: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    private content4: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    private thickness: number = 5;
    private inverseSemiProgress: ProgressBarComponent;
    private verticalProgress: ProgressBarComponent;
    private semiProgress: ProgressBarComponent;
    private verticalOppose: ProgressBarComponent;

    private onclick(): void {
        this.inverseSemiProgress.refresh();
        this.verticalProgress.refresh();
        this.verticalOppose.refresh();
        this.semiProgress.refresh();
    }

    private annotationElementContent(color: string, controlID: string): string {
        let content: string;
        switch (controlID) {
            case 'angle-container':
                content = '100%';
                break;
            case 'vertical-container':
                content = '100%';
                break;
            case 'vsemi-container':
                content = '100%';
                break;
            case 'semi-container':
                content = '100%';
                break;
        }
        return ('<div id="point1" style="font-size:24px;font-weight:bold;color: ' + color + ' "><span>' + content + '</span></div>');
    }

    private progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        switch (selectedTheme) {
            case 'material':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[0], args.progressBar.element.id);
                break;
            case 'fabric':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[1], args.progressBar.element.id);
                break;
            case 'bootstrap':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[2], args.progressBar.element.id);
                break;
            case 'bootstrap4':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[3], args.progressBar.element.id);
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[6], args.progressBar.element.id);
                break;
            case 'bootstrap5':
            case 'bootstrap5-dark':
            case 'fluent':
            case 'fluent-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[8], args.progressBar.element.id);
                break;
            case 'tailwind-dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[7], args.progressBar.element.id);
                break;
            default:
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[4], args.progressBar.element.id);
                break;
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
                            <div className="progress-container-align">
                                <ProgressBarComponent id="angle-container" ref={progress1 => this.inverseSemiProgress = progress1}
                                    type='Circular'
                                    startAngle={240}
                                    endAngle={120}
                                    width='160px'
                                    height='160px'
                                    minimum={0}
                                    maximum={100}
                                    value={100}
                                    cornerRadius='Round'
                                    trackThickness={this.thickness}
                                    progressThickness={this.thickness}
                                    animation={{
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }}
                                    load={this.progressLoad.bind(this)}
                                >
                                    <Inject services={[ProgressAnnotation]} />
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content1}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="progress-container-align">
                                <ProgressBarComponent id="vertical-container" ref={progress2 => this.verticalProgress = progress2}
                                    type='Circular'
                                    startAngle={180}
                                    endAngle={0}
                                    width='160px'
                                    height='160px'
                                    minimum={0}
                                    maximum={100}
                                    value={100}
                                    cornerRadius='Round'
                                    trackThickness={this.thickness}
                                    progressThickness={this.thickness}
                                    load={this.progressLoad.bind(this)}
                                    animation={{
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }}
                                >
                                    <Inject services={[ProgressAnnotation]} />
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content2}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="progress-container-align">
                                <ProgressBarComponent id="vsemi-container" ref={progress3 => this.verticalOppose = progress3}
                                    type='Circular'
                                    startAngle={0}
                                    endAngle={180}
                                    width='160px'
                                    height='160px'
                                    minimum={0}
                                    maximum={100}
                                    value={100}
                                    cornerRadius='Round'
                                    trackThickness={this.thickness}
                                    progressThickness={this.thickness}
                                    load={this.progressLoad.bind(this)}
                                    animation={{
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }}
                                >
                                    <Inject services={[ProgressAnnotation]} />
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content3}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="progress-container-align">
                                <ProgressBarComponent id="semi-container" ref={progress4 => this.semiProgress = progress4}
                                    type='Circular'
                                    startAngle={270}
                                    endAngle={90}
                                    width='160px'
                                    height='160px'
                                    minimum={0}
                                    maximum={100}
                                    value={100}
                                    cornerRadius='Round'
                                    trackThickness={this.thickness}
                                    progressThickness={this.thickness}
                                    load={this.progressLoad.bind(this)}
                                    animation={{
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }}
                                >
                                    <Inject services={[ProgressAnnotation]} />
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content4}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 reload-btn">
                            <button onClick={this.onclick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    This sample illustrates a circular progress bar with start and end angle customized.
                </p>
                </div>
                <div id="description">
                    <p>This demo for Essential JS2 Progress Bar control shows the customizing options for angle in circular progress bar.</p>
                </div>
            </div>
        )
    }
}