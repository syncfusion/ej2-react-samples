import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class SmartRedact extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-pdfviewer/images/smart-redact.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates how the Syncfusion React PDF Viewer can intelligently redact sensitive information with
                        the help of AI assistance.
                        Users can select specific patterns, such as emails or names, and the AI will identify and redact sensitive
                        information based on these patterns</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react'
                        aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub repository</a>.</p>
                </div>
                <div id="description">
                    <ul>
                        <li><strong>Smart Redaction:</strong> Users can select patterns such as emails or names to identify sensitive
                            information in the document. The AI detects this content, and if some identified information isn't actually
                            sensitive, users can review and deselect it before proceeding with redaction. This process ensures efficient
                            protection of private data.</li>
                        <li><strong>Manual Redaction:</strong> Users can manually select specific content for redaction to handle
                            sensitive information directly. This feature provides precise control over which parts of the document are
                            redacted. It complements the AI's automated detection by allowing for additional customization. This ensures
                            that only the intended sensitive information is protected.</li>
                    </ul>
                </div>
            </div>
        )
    }
}