import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import DefaultSmartPaste from './ai-default';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
import { updateAISampleSection } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <DefaultSmartPaste/>
                </div>
                <div id="action-description">
                    <p>This example demonstrates how the <code>SmartPasteButton</code> component can automatically fill out forms using data from the user's clipboard.</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank' href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/ej2-react-ai-samples' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub repository</a>.</p>
                </div>
                <div id='description'>
                    <p>In this example, clicking the Smart Paste button retrieves data from the clipboard and automatically fills in the form fields. This streamlines the data entry process by removing the need for manual input.</p>
                </div>
             <AIToast/>    
            </div>
        )
    }
}