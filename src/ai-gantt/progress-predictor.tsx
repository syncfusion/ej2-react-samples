import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/

export class SmartProgressPredictor extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-gantt/images/progress-predictor.gif'} width='100%' alt="Showcase Text to MindMap Gif" height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample showcases how to predict milestone task completion and project end dates using AI-driven analysis
                        within a Gantt Chart. The predictions are displayed as event markers, providing visual cues for upcoming
                        milestones and the overall project timeline.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>

                <div id="description">
                    <p>
                        This functionality retrieves predicted milestone dates and the overall project completion date. The predictions
                        are based on the current year's <strong>TaskCollection</strong> data, enhanced by analyzing historical <strong>TaskCollection</strong> data from
                        the past five years.
                    </p>
                </div>
                <AIToast/>
            </div>
        )
    }
}