/**
 * Sample for custom content
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef } from 'react';
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
    .progress-container-align {
        text-align: center;
    }
 
     #reLoad {
         border-radius: 4px;
         text-transform: capitalize;
         margin-top: 3%;
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

const ProgressBarRadius = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    const fullBackground = useRef<ProgressBarComponent>(null);
    const outerRadius = useRef<ProgressBarComponent>(null);
    const onRadius = useRef<ProgressBarComponent>(null);
    const pie = useRef<ProgressBarComponent>(null);
    const animation: AnimationModel = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    const replayClick = (): void => {
        fullBackground.current.refresh();
        outerRadius.current.refresh();
        onRadius.current.refresh();
        pie.current.refresh();
    }
    const content: string = '<div id="point1" style="font-size:20px;font-weight:bold;color:#ffffff;fill:#ffffff"><span>60%</span></div>';
    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast') as ProgressTheme;
        if (args.progressBar.element.id === 'full-background') {
            switch (selectedTheme) {
                case 'material':
                    args.progressBar.trackColor = '#f8c2d4';
                    args.progressBar.progressColor = '#e91e63';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'fabric':
                    args.progressBar.progressColor = '#0078D6';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'bootstrap':
                    args.progressBar.progressColor = '#317ab9';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'tailwind':
                    args.progressBar.progressColor = '#4F46E5';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;        
                case 'highcontrast':
                    args.progressBar.progressColor = '#FFD939';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#FFD939;"><span>60%</span></div>';
                    break;
                case 'bootstrap-dark':
                case 'fabric-dark':
                case 'material-dark':
                    args.progressBar.progressColor = '#9A9A9A';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                    break;
                case 'tailwind-dark':
                    args.progressBar.progressColor = '#22D3EE';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                    break;
                case 'bootstrap4':
                    args.progressBar.progressColor = '#007bff';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                case 'bootstrap5':
                case 'bootstrap5-dark':
                case 'fluent':
                case 'fluent-dark':
                    args.progressBar.progressColor = '#0D6EFD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                    break;
                case 'material3':
                    args.progressBar.progressColor = '#6750A4';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                    break;
                case 'material3-dark':
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break; 
                case 'fluent2':
                    args.progressBar.progressColor = '#0F6CBD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                    break;
                case 'fluent2-highcontrast':
                    args.progressBar.progressColor = '#1AEBFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                    break;
                case 'fluent2-dark':
                    args.progressBar.progressColor = '#115EA3';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                    break;
                default:
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
            }
        }
    }

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className="control-section progress-bar-parent">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-3 progress-container" style={{ alignContent: 'center' }}>
                        <ProgressBarComponent id="full-background" ref={fullBackground} type='Circular' width='160px'
                            height='160px' cornerRadius='Round' enableRtl={false} radius='100%' innerRadius='190%'
                            progressThickness={10} trackThickness={80} value={60}
                            animation={animation} load={progressLoad.bind(this)}>
                            <Inject services={[ProgressAnnotation]} />
                            <ProgressBarAnnotationsDirective>
                                <ProgressBarAnnotationDirective content={content} />
                            </ProgressBarAnnotationsDirective>
                        </ProgressBarComponent>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container" style={{ alignContent: 'center' }}>
                        <ProgressBarComponent id="outer-radius" ref={outerRadius} type='Circular' width='160px' height='160px'
                            value={90} innerRadius='72' progressThickness={8} cornerRadius='Round'
                            animation={animation} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>

                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container" style={{ alignContent: 'center' }}>
                        <ProgressBarComponent id="on-radius" ref={onRadius} type='Circular' width='160px' height='160px' value={90}
                            trackThickness={3} progressThickness={8}
                            animation={animation} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                    <div className="col-lg-3 col-md-3 col-3 progress-container" style={{ alignContent: 'center' }}>
                        <ProgressBarComponent id="pie" ref={pie} type='Circular' width='160px' height='160px' value={70}
                            enablePieProgress={true} animation={animation} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                </div>
                <div id="replay-progressbar" className="col-lg-12 col-md-12 col-12 reload-btn">
                    <button onClick={replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">
                        Reload
                    </button>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a circular progress bar with customization options like radius, inner-radius, pie progress, track and progress thickness.
                </p>
            </div>
            <div id="description">
                <p>
                    This demo for Essential JS2 Progress Bar control shows the customizing options for radius, inner-radius, pie progress, track and progress thickness.
                </p>
            </div>
        </div>
    )

}
export default ProgressBarRadius;