import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class Default extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-smart-textarea/images/smarttextarea.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates how the Smart TextArea provides sentence-level autocompletion suggestions based on its configuration and the user's current input.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank' href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/ej2-react-ai-samples' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub repository</a>.</p>
                </div>

                <div id="description">
                    <p>
                        The Smart TextArea uses AI to offer real-time sentence suggestions based on the user's input and role, helping users complete sentences more quickly and accurately.
                    </p>
                </div>
            </div>
        )
    }
}