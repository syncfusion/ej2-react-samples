import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { updateAISampleSection } from '../common/sample-base';
/* custom code start*/
import AIToast from '../common/ai-toast';
/* custom code end*/

export class WritingAssist extends SampleBase<{}, {}> {
     componentDidMount() {
          updateAISampleSection(); 
    }

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-document-editor/images/writing-assist.gif'} width='100%' alt="Showcase writing assist Gif" height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        The Writing Assist feature is designed to generate new content based on user-provided ideas or prompts,
                        seamlessly integrating the content into the document editor. This tool, available in the Syncfusion React
                        Document Editor, assists users in expanding their ideas by generating relevant text, ensuring a smooth writing
                        process. Simply provide an idea or topic, and the Writing Assist will suggest content that can be directly
                        inserted into your document.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank'
                        href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>
                <div id='description'>
                    <p><strong>Content Generation:</strong> Writing Assist takes user input, such as a brief idea or keyword, and
                        generates new content that aligns with the theme. This feature aids in content creation, helping users develop
                        their thoughts into fully-formed paragraphs or sections within the document.</p>

                    <p><strong>Idea Expansion:</strong> Users can rely on Writing Assist to expand on initial concepts, offering
                        detailed elaborations or additional perspectives that can enhance the quality of the writing. It is ideal for
                        overcoming writer’s block and ensuring comprehensive coverage of a topic.</p>

                    <p><strong>Seamless Insertion:</strong> Once the content is generated, it can be effortlessly inserted into the
                        document at the cursor's position, allowing users to maintain the flow of their writing without disruption.</p>
                </div>
                <AIToast/>
            </div>
        )
    }
}