import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import AiSmartUmlSequenceDiagram from './ai-text-to-umlSequenceDiagram';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/
export class SmartUMLSequenceDiagram extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <AiSmartUmlSequenceDiagram />
                </div>
                <div id="action-description">
                    <p>This demo sample showcases the creation of a dynamic uml sequence diagram using the React Diagram component with
                        the assistance of AI. The AI-powered diagram features nodes and connectors arranged in a uml sequence layout, designed to
                        visually organize and represent ideas and concepts. This sample is ideal for brainstorming, organizing thoughts,
                        and visually mapping out complex information.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        This sample leverages a specialized AI prompt, allowing users to generate the content of the diagram by
                        submitting a prompt to OpenAI. The AI's response is parsed and transformed into nodes and connectors, visually
                        representing the generated ideas or concepts in a uml sequence diagram format. Users can also manually add child nodes using
                        user handles to further expand and customize the uml sequence diagram, creating an interactive and personalized experience.
                    </p>
                </div>
             <AIToast/>     
            </div>
        )
    }
}