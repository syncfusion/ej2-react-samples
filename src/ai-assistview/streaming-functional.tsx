import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './streaming.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import * as data from './promptResponseData.json';
import * as Marked from 'marked';

const Streaming = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const streamingAIAssistView = useRef<AIAssistViewComponent>(null);
    let stopStreaming: boolean = false;
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

    const handleStopResponse = () => {
        stopStreaming = true
    }

    const onPromptRequest = (args: PromptRequestEventArgs) => {
        let lastResponse: string = "";
        let streamingResponse: any = prompts.find((data: any) => data.prompt === args.prompt);
        const defaultResponse = "For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
        const responseUpdateRate = 10;
        async function streamResponse(response) {
            let i = 0;
            const responseLength = response.length;
            while (i < responseLength && !stopStreaming) {
                lastResponse += response[i];
                i++;
                if (i % responseUpdateRate === 0 || i === responseLength) {
                    const htmlResponse = Marked.marked(lastResponse);
                    streamingAIAssistView.current.addPromptResponse(htmlResponse, i === responseLength);
                    streamingAIAssistView.current.scrollToBottom();
                }
                await new Promise(resolve => setTimeout(resolve, 15)); // Delay before the next chunk
            }
            streamingAIAssistView.current.promptSuggestions = streamingResponse?.suggestions || suggestion;
        }
        if (streamingResponse) {
            stopStreaming = false;
            streamResponse(streamingResponse.response);
        } else {
            streamingAIAssistView.current.addPromptResponse(defaultResponse, true);
            streamingAIAssistView.current.promptSuggestions = suggestion;
        }
    }

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="stream-aiassistview">
                    <AIAssistViewComponent id="streamAssistView" ref={streamingAIAssistView} promptSuggestions={suggestion} toolbarSettings={assistViewToolbarSettings} promptRequest={onPromptRequest} stopRespondingClick={handleStopResponse} bannerTemplate={bannerTemplate}></AIAssistViewComponent>
                </div>
            </div>

            <div id="action-description">
                <p>
                This sample demonstrates the streaming response update in the <code>AI AssistView</code> component.
                </p>
            </div>
            <div id="description">
                <p> 
                    In this example, the <code>AI AssistView</code> component dynamically updates responses in a streaming manner using the <code>addPromptResponse</code> method, while the <code>scrollToBottom</code> method ensures automatic scrolling. The <code>bannerTemplate</code> allows customization of the banner content, and <code>toolbarSettings</code> enables custom toolbar items, including a right-aligned Refresh button. Additionally, <code>promptSuggestions</code> offers AI-generated prompt suggestions, while <code>promptRequest</code> processes prompt requests when triggered.   
                </p> 
                <p>   
                    This implementation provides an interactive AI chat experience with real-time streaming updates, enhanced by Markdown-to-HTML conversion using the <code>Marked</code> plugin.   
                </p>
            </div>
        </div>
    );
}
export default Streaming;