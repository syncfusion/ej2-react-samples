import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
import { AIAssistiveGrid } from './ai-assistive-grid';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
export class AssistiveGrid extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AIAssistiveGrid />
                </div>
                <div id="action-description">
                    <p>This demo showcases the <b>Syncfusion React DataGrid component</b>, enhanced with conversational capabilities through the integrated Syncfusion React AI AssistView component. 
                    Grid data operations, such as sorting, filtering, and grouping, can be performed using natural language input, offering a streamlined alternative to traditional UI interactions.</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react'
                        aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub repository</a>.</p>
                </div>
                <div id='description'>
                    <p>The Syncfusion React AI AssistView component is embedded directly within the grid interface, enabling intelligent prompt processing, contextual suggestions, and adaptive responses. 
                        This integration streamlines data management in the grid, making the process faster and intuitive, especially when working with complex datasets and adaptable workflows.
                    </p>
                </div>
                <AIToast/> 
            </div>
        )
    }
}