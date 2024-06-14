/**
 * Sample for semi circular progress bar
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef } from 'react';
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation, ProgressTheme, ILoadedEventArgs, AnimationModel
} from '@syncfusion/ej2-react-progressbar';
import { Browser } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';


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

const ProgressBarSemiCircular = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const annotationColors: string[] = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939', '#9A9A9A', '#22D3EE', '#0D6EFD', '#6750A4', '#D0BCFF', '#0F6CBD', '#1AEBFF', '#0F6CBD', '#1AEBFF', '#115EA3'];
    const content1: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    const content2: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    const content3: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    const content4: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    const thickness: number = 5;
    const animation: AnimationModel = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    const inverseSemiProgress = useRef<ProgressBarComponent>(null)
    const verticalProgress = useRef<ProgressBarComponent>(null)
    const semiProgress = useRef<ProgressBarComponent>(null)
    const verticalOppose = useRef<ProgressBarComponent>(null)

    const onclick = (): void => {
        inverseSemiProgress.current.refresh();
        verticalProgress.current.refresh();
        verticalOppose.current.refresh();
        semiProgress.current.refresh();
    }

    const annotationElementContent = (color: string, controlID: string): string => {
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

    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ProgressTheme;
        switch (selectedTheme) {
            case 'material':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[0], args.progressBar.element.id);
                break;
            case 'fabric':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[1], args.progressBar.element.id);
                break;
            case 'bootstrap':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[2], args.progressBar.element.id);
                break;
            case 'bootstrap4':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[3], args.progressBar.element.id);
                break;
            case 'tailwind':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[4], args.progressBar.element.id);
                break;
            case 'bootstrap-dark':
            case 'fabric-dark':
            case 'material-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[6], args.progressBar.element.id);
                break;
            case 'bootstrap5':
            case 'bootstrap5-dark':
            case 'fluent':
            case 'fluent-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[8], args.progressBar.element.id);
                break;
            case 'tailwind-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[7], args.progressBar.element.id);
                break;
            case 'material3':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[9], args.progressBar.element.id);
                break;
            case 'material3-dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[10], args.progressBar.element.id);
                break;
            case "fluent2":
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[11], args.progressBar.element.id);
                break;
            case "fluent2-dark":
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[13], args.progressBar.element.id);
                break;
            default:
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[5], args.progressBar.element.id);
                break;
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
                        <div className="progress-container-align">
                            <ProgressBarComponent id="angle-container" ref={inverseSemiProgress} type='Circular' startAngle={240}
                                endAngle={120} width='160px' height='160px' minimum={0} maximum={100} value={100} cornerRadius='Round'
                                trackThickness={thickness} progressThickness={thickness}
                                animation={animation} load={progressLoad.bind(this)} >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={content1} />
                                </ProgressBarAnnotationsDirective>
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container">
                        <div className="progress-container-align">
                            <ProgressBarComponent id="vertical-container" ref={verticalProgress} type='Circular' startAngle={180}
                                endAngle={0} width='160px' height='160px' minimum={0} maximum={100} value={100} cornerRadius='Round'
                                trackThickness={thickness} progressThickness={thickness} load={progressLoad.bind(this)}
                                animation={animation}>
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={content2} />   
                                </ProgressBarAnnotationsDirective>
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container">
                        <div className="progress-container-align">
                            <ProgressBarComponent id="vsemi-container" ref={verticalOppose} type='Circular' startAngle={0} 
                                width='160px' height='160px' minimum={0} maximum={100} value={100} cornerRadius='Round'
                                trackThickness={thickness} progressThickness={thickness} load={progressLoad.bind(this)}
                                endAngle={180} animation={animation}>
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={content3} />                           
                                </ProgressBarAnnotationsDirective>
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container">
                        <div className="progress-container-align">
                            <ProgressBarComponent id="semi-container" ref={semiProgress} type='Circular' startAngle={270}
                                endAngle={90} width='160px' height='160px' minimum={0} maximum={100} value={100}
                                cornerRadius='Round' trackThickness={thickness} progressThickness={thickness}
                                load={progressLoad.bind(this)} animation={animation} >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={content4} />                                
                                </ProgressBarAnnotationsDirective>
                            </ProgressBarComponent>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 reload-btn">
                        <button onClick={onclick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button>
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
export default ProgressBarSemiCircular;