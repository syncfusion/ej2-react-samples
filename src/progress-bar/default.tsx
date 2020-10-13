/**
 * Sample for Area series
 */
import * as React from "react";
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation
} from '@syncfusion/ej2-react-progressbar';
import { SampleBase } from '../common/sample-base';


const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    .circular-progress{
            text-align: center;
            padding: 10px;
            margin: auto;
    }
    `;
/**
 * Area sample
 */
export class ProgressBarDefault extends SampleBase<{}, {}> {

    private content1: string = '<div id="point1" style="font-size:35px;font-weight:bold;color:#ff8c45;fill:#ff8c45"><span>30%</span></div>';
    private content2: string = '<div id="point2" style="font-size:35px;font-weight:bold;color:#f429ff;fill:#f429ff"><span>60%</span></div>';
    private content3: string = '<div id="point3" style="font-size:35px;font-weight:bold;color:#4940fa;fill:#4940fa"><span>75%</span></div>';
    private content4: string = '<div id="point4" style="font-size:35px;font-weight:bold;color:#b52123;fill:#b52123"><span>90%</span></div>';
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 circular-progress">
                            <ProgressBarComponent id="circular-container" style={{ float: "right" }}
                                type='Circular'
                                width='90%'
                                height='200px'
                                value = {30}
                                animation={{
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }}
                                progressColor='#ff8c45'
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content = {this.content1} annotationAngle = {0} annotationRadius = '10%'>

                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>   
        
                            </ProgressBarComponent>
                        </div>
                        <div className="col-lg-6 col-md-6 circular-progress">
                            <ProgressBarComponent id="rtl-container" style={{ float: "left" }}
                                type='Circular'
                                width='90%'
                                height='200px'
                                value={60}
                                enableRtl = {true}
                                animation={{
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }}
                                progressColor='#f429ff'
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content2} annotationAngle={0} annotationRadius='10%'>

                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>

                            </ProgressBarComponent>
                        </div>
                        <div className="col-lg-6 col-md-6 circular-progress">
                            <ProgressBarComponent id="track-container" style={{ float: "right" }}
                                type='Circular'
                                width='90%'
                                height='200px'
                                minimum = {0}
                                maximum = {100}
                                value= {75}
                                trackColor = '#8faff9'
                                progressColor = '#4940fa'
                                animation={{
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }}
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content3} annotationAngle={0} annotationRadius='10%'>

                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>

                            </ProgressBarComponent>
                        </div>
                        <div className="col-lg-6 col-md-6 circular-progress">
                            <ProgressBarComponent id="rounded-container" style={{ float: "left" }}
                                type='Circular'
                                width='90%'
                                height='200px'
                                cornerRadius = 'Round'
                                value={90}
                                progressColor = '#b52123'
                                animation={{
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }}
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content4} annotationAngle={0} annotationRadius='10%'>

                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>

                            </ProgressBarComponent>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates a default bullet chart to compare the feature (value) bar with comparative (target) bar. It includes variety of configurations to change the look and feel of the chart.
                </p>
                </div>
                <div id="description">
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a feature bar or comparative bar on the bullet chart.
                    </p>
                </div>
            </div>
        )
    }
}