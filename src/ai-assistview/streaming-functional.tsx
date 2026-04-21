import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './streaming.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import * as data from './promptResponseData.json';

const Streaming = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const streamingAIAssistView = useRef<AIAssistViewComponent>(null);
    const bannerTemplate: string = `<div class="banner-content">
        <div class="e-icons e-assistview-icon"></div>
        <h3>AI Assistance</h3>
        <i>To get started, provide input or choose a suggestion.</i>
    </div>`;

    const prompts: any[] = data["streamingPromptResponseData"];

    const suggestion: string[] = data["streamingSuggestions"];

    const toolbarItemClicked = (args) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            streamingAIAssistView.current.prompts = [];
            streamingAIAssistView.current.promptSuggestions = suggestion;
        }
    };

    const assistViewToolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked
    };

    const onPromptRequest = (args: PromptRequestEventArgs) => {
        let streamingResponse: any = prompts.find((data: any) => data.prompt === args.prompt);
        const defaultResponse = "For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
        if (streamingResponse) {
            streamingAIAssistView.current.addPromptResponse(streamingResponse.response, true);
            streamingAIAssistView.current.promptSuggestions = streamingResponse?.suggestions || suggestion;
        } else {
            streamingAIAssistView.current.addPromptResponse(defaultResponse, true);
            streamingAIAssistView.current.promptSuggestions = suggestion;
        }
    }

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="stream-aiassistview">
                    <AIAssistViewComponent id="streamAssistView" ref={streamingAIAssistView} enableStreaming={true} promptSuggestions={suggestion} toolbarSettings={assistViewToolbarSettings} promptRequest={onPromptRequest} bannerTemplate={bannerTemplate}></AIAssistViewComponent>
                </div>
            </div>

            <div id="action-description">
                <p>
                    This sample demonstrates the streaming response update in the <code>AI AssistView</code> component.
                </p>
            </div>
            <div id="description">
                <p> In this example, the <code>AI AssistView</code> component dynamically updates responses in a streaming manner using the  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#addpromptresponse">addPromptResponse</a> method, while the  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#scrolltobottom">scrollToBottom</a> method ensures automatic scrolling. The  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> allows customization of the banner content, and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#toolbarsettings">toolbarSettings</a> enables custom toolbar items, including a right-aligned Refresh button. Additionally,  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptsuggestions">promptSuggestions</a> offers AI-generated prompt suggestions, while  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> processes prompt requests when triggered.
                </p>
                <p>
                    This implementation provides an interactive AI chat experience with real-time streaming updates, enhanced by built-in Markdown-to-HTML conversion using the syncfusion <code>MarkdownConverter</code>.
                </p>
            </div>
        </div>
    );
}
export default Streaming;