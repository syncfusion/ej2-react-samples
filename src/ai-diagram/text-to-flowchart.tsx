import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import AiSmartFlowchart from './ai-text-to-flowchart';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
import { updateAISampleSection } from '../common/sample-base';

export class SmartFlowchart extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AiSmartFlowchart />
                </div>
                <div id="action-description">
                    <p>
                        This demo illustrates the creation of a flowchart diagram using the React Diagram component with the
                        assistance
                        of AI. The AI-powered flowchart is structured with nodes and connectors arranged in a flowchart layout, designed
                        to visually represent processes and workflows. This sample is particularly effective for visualizing
                        step-by-step procedures, workflows, and decision-making paths in a clear and interactive manner.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        This sample leverages a specialized AI prompt to create a dynamic flowchart diagram by submitting a request to
                        OpenAI. The AI-generated response is parsed to produce nodes and connectors arranged in a flowchart layout,
                        visually representing the defined processes or workflows. Users can generate and visualize the flowchart content
                        based on their input prompt, creating an interactive and organized depiction of processes and decision-making
                        paths.
                    </p>
                </div>
             <AIToast/>   
            </div>
        )
    }
}