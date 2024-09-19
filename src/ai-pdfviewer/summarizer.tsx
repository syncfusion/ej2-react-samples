import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class Summarizer extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-pdfviewer/images/summarize.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>PDF Summarization provides users with a comprehensive overview of a document's content. The AI generates a
                        detailed summary, highlighting key points. This feature streamlines understanding complex documents in just a
                        few clicks.</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id="description">
                    <p><strong>Summarization:</strong> PDF Summarization provides users with a comprehensive overview of a document's content. The AI
                        generates a detailed summary, highlighting key points. This feature streamlines understanding complex documents
                        in just a few clicks.</p>
                    <p><strong>Q&A:</strong> Q&A feature allows users to ask questions about the document's content. Users can either
                        input their own
                        queries or choose from AI-generated suggestions. This makes it easier to find specific information within the
                        document.
                    </p>
                    <p><strong>Reference Page Navigation:</strong> This also allows users to navigate directly to relevant pages in the
                        document based on their queries. When a
                        question is asked, the tool identifies the specific content and directs the user to the corresponding page. It
                        streamlines finding specific information within the document.</p>
                </div>
            </div>
        )
    }
}