/**
 * Sample for Area series
 */
import * as React from "react";
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation
} from '@syncfusion/ej2-react-progressbar';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';


const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #control-container {
        padding: 0px !important;
    }
    `;
/**
 * Area sample
 */
export class ProgressBarIndeterminate extends SampleBase<{}, {}> {

    private content1: string = '<div style="font-size:35px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>Loading...</span></div>';

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row" style= {{ alignItems: 'center', textAlign: 'center' }}>
                        <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
                            <ProgressBarComponent id="linearProcesscontainer"
                                type='Linear'
                                isIndeterminate = {true}
                                width={Browser.isDevice ? '100%' : '90%'}
                                height={Browser.isDevice ? '20' : '30'}
                                value = {40}
                         >
                            </ProgressBarComponent>
                        </div>
                        <div className="col-lg-12 col-md-12" style={{ textAlign: 'center' }}>
                            <ProgressBarComponent id="circularprogresscontainer"
                                type='Circular'
                                isIndeterminate={true}
                                height={Browser.isDevice ? '200' : '350'}
                                width={Browser.isDevice ? '200' : '350'}
                                value={40}
                            >
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content1} annotationAngle={0} annotationRadius='10%'>

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