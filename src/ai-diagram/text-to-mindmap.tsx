import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import AiSmartMindMap from './ai-text-to-mindmap';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
import { updateAISampleSection } from '../common/sample-base';

export class smartMindMap extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AiSmartMindMap />
                </div>
                <div id="action-description">
                    <p>This demo sample showcases the creation of a dynamic mindmap diagram using the React Diagram component with
                        the assistance of AI. The AI-powered diagram features nodes and connectors arranged in a mindmap layout, designed to
                        visually organize and represent ideas and concepts. This sample is ideal for brainstorming, organizing thoughts,
                        and visually mapping out complex information. The context menu allows for quick actions such as adding, editing,
                        or deleting nodes, making it a powerful tool for interactively managing and expanding mindmaps.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        This sample leverages a specialized AI prompt, allowing users to generate the content of the diagram by
                        submitting a prompt to OpenAI. The AI's response is parsed and transformed into nodes and connectors, visually
                        representing the generated ideas or concepts in a mindmap format. Users can also manually add child nodes using
                        user handles to further expand and customize the mindmap, creating an interactive and personalized experience.
                    </p>
                </div>
             <AIToast/>     
            </div>
        )
    }
}