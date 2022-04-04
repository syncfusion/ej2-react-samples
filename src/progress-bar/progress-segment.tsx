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
#control-container {
    padding: 0px !important;
}

.linear-parent {
    text-align: center;
    width: 75%;
    margin: auto !important;
}

.linear-button {
   text-align: center;
   padding:2%;
}

.progressbar-mode {
    text-align: left;
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #3D3E3C;
    margin-left: 10px;
    margin-top: 5%;
    padding: 0px;
    top: 20px;
}

#reLoad {
    border-radius: 4px;
    text-transform: capitalize;
}
    `;

export class ProgressBarProgressSegment extends SampleBase<{}, {}> {

    private linearSeg: ProgressBarComponent;
    private circularSeg: ProgressBarComponent;
    private content: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
    private load: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
    }

    private progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast') as ProgressTheme;
        switch (selectedTheme) {
            case 'material':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                break;
            case 'fabric':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                break;
            case 'bootstrap':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                break;
            case 'bootstrap4':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                break;
            case 'tailwind':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                break;
            case 'bootstrap5':
            case 'bootstrap5-dark':
            case 'fluent':
            case 'fluent-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                break;
            case 'tailwind-dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                break;    
            default:
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#FFD939"><span></span></div>';
                break;
        }
    }

    private timing = (): void => {
        if (this.circularSeg.value >= this.circularSeg.maximum) {
            clearInterval(this.timer)
        } else {
            this.circularSeg.value += 20;
            this.linearSeg.value += 20;
        }
    }
    private timer: any = setInterval(this.timing, 2500);
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section">
                    <div className="row linear-parent">
                        <div>
                            <div className="col-lg-12 col-sm-12 progressbar-mode"></div>
                            <div id="linearSegment">
                                <ProgressBarComponent id="linearSegment"
                                    ref={segment1 => this.linearSeg = segment1}
                                    type='Linear'
                                    height='30'
                                    width='70%'
                                    value={40}
                                    segmentCount={50}
                                    gapWidth={5}
                                    trackThickness={15}
                                    progressThickness={15}
                                    cornerRadius='Square'
                                    animation={{
                                        enable: true,
                                        duration: 2000
                                    }}
                                    load={this.load.bind(this)}
                                >
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div>
                            <div className="col-lg-12 col-sm-12 progressbar-mode"></div>
                            <div id="circularSegment">
                                <ProgressBarComponent id="circularSegment"
                                    ref={segment2 => this.circularSeg = segment2}
                                    type='Circular'
                                    height='200px'
                                    width='200px'
                                    value={40}
                                    segmentCount={50}
                                    gapWidth={5}
                                    trackThickness={15}
                                    progressThickness={15}
                                    startAngle={220}
                                    endAngle={140}
                                    cornerRadius='Square'
                                    animation={{
                                        enable: true,
                                        duration: 2000
                                    }}
                                    load={this.progressLoad.bind(this)}
                                >
                                    <Inject services={[ProgressAnnotation]} />
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a segmented progress of a task.
                </p>
                </div>
                <div id="description">
                    <p>This demo for Progress Bar control shows the segmented progress of a task using <code>segmentCount</code> and <code>gapWidth</code> property.</p>
                </div>
            </div>
        )
    }
}