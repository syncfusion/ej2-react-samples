import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class SmartFill extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-pdfviewer/images/smart-fill.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample illustrates how the Syncfusion React PDF Viewer, with the help of AI, can automatically fill form
                        fields using the data provided by the user. </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react'
                        aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        The AI processes the input information to populate the relevant fields in the PDF form, improving efficiency and
                        reducing manual entry errors. However, users may need to review and adjust the filled fields as needed.
                    </p>
                </div>
            </div>
        )
    }
}