import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';

export class SmartEditor extends SampleBase<{}, {}> {

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-document-editor/images/smart-editor.gif'} width='100%' alt="Showcase smart editor Gif" height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the capabilities of the Smart Editor in enhancing document editing within the
                        Syncfusion React Document Editor. Users can refine their content by:
                    </p>
                    <ul>
                        <li>Rewriting text for improved clarity and style.</li>
                        <li>Checking grammar to ensure correct language use.</li>
                        <li>Translating content into different languages seamlessly.</li>
                    </ul>
                    <p>With the selection context feature, users can enhance their writing quality directly within the editor, making
                        it easier to achieve polished and accurate documents.</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id='description'>
                    <p>
                        <strong>Rewriting:</strong> The rewriting feature enables users to rephrase sentences or paragraphs, enhancing
                        content clarity and adapting the tone to fit different contexts. This tool is designed to improve the overall
                        readability and effectiveness of the document.
                    </p>
                    <p><strong>Grammar Check:</strong> The grammar check function scans the document for grammatical errors, providing
                        suggestions for corrections related to subject-verb agreement, punctuation, and sentence structure. This ensures
                        the document maintains high grammatical accuracy.</p>
                    <p><strong>Translation:</strong> The translation feature allows users to convert the document content into multiple
                        languages. This is particularly useful for creating multilingual documents or understanding content written in
                        foreign languages.</p>
                </div>
            </div>
        )
    }
}