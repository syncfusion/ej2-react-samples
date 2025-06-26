import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
 /* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/

export class SmartEventWindow extends SampleBase<{}, {}> {
    componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-schedule/images/schedule.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        This demo demonstrates how AI can be utilized to convert natural language context into scheduler events. It allows for seamless conversion of casual text into structured meeting appointments, enhancing user experience and efficiency.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id='description'>
                    <p>
                        In this sample, we have integrated Smart Paste component with the Scheduler component to convert natural language content into scheduler events. By using the smart paste feature, users can populate the converted content into a custom dialog, which is then added to the Scheduler component.
                    </p>
                </div>
                <AIToast/>
            </div>
        )
    }
}