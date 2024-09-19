import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class AIAssistant extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-rich-text-editor/images/ai-assistant.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the AI Integration with Rich Text Editor and has enabled the AI features like content
                        generation, summarization, rephrasing, translate and grammar correction.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p>
                        In this sample, the Rich Text Editor content can be selected, and AI Assistant dropdown menu can be opened to
                        use the following AI features,
                    </p>
                    <ul>
                        <li><strong>Rephrase:</strong> Selecting this option will offer alternative phrasings for sentences to improve
                            clarity.
                        </li>
                        <li><strong>Correct Grammar:</strong> Selecting this option will correct the grammar for the selected content.
                        </li>
                        <li><strong>Summarize:</strong> Selecting this option will summarize long documents or sections into concise
                            versions.
                        </li>
                        <li><strong>Content Generation:</strong> Selecting this option will generate content based on selected content.
                        </li>
                        <li><strong>Translate:</strong> Selecting this will translate the selected content into the desired language
                            based on the language selection.
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}