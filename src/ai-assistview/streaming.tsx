import * as React from 'react';
import './streaming.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import * as data from './promptResponseData.json';
import { SampleBase } from '../common/sample-base';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

export class Streaming extends SampleBase<{}, {}> {

    streamingAIAssistView: AIAssistViewComponent;
    stopStreaming = false;

    bannerTemplate: string = `<div class="banner-content">
        <div class="e-icons e-assistview-icon"></div>
        <h3>AI Assistance</h3>
        <i>To get started, provide input or choose a suggestion.</i>
    </div>`;

    prompts: any[] = data["streamingPromptResponseData"];

    suggestion: string[] = data["streamingSuggestions"];

    toolbarItemClicked = (args) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            this.streamingAIAssistView.prompts = [];
            this.streamingAIAssistView.promptSuggestions = this.suggestion;
        }
    };

    assistViewToolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: this.toolbarItemClicked
    };

    handleStopResponse = () => {
        this.stopStreaming = true;
    }

    onPromptRequest = (args: PromptRequestEventArgs) => {
        let lastResponse: string = "";
        let streamingResponse: any = this.prompts.find((data: any) => data.prompt === args.prompt);
        const defaultResponse = "For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.";
        const responseUpdateRate = 10;
        const streamResponse = async (response) => {
            let i = 0;
            const responseLength = response.length;
            while (i < responseLength && !this.stopStreaming) {
                lastResponse += response[i];
                i++;
                if (i % responseUpdateRate === 0 || i === responseLength) {
                    const htmlResponse = MarkdownConverter.toHtml(lastResponse);
                    this.streamingAIAssistView.addPromptResponse(htmlResponse, i === responseLength);
                    this.streamingAIAssistView.scrollToBottom();
                }
                await new Promise(resolve => setTimeout(resolve, 15)); // Delay before the next chunk
            }
            this.streamingAIAssistView.promptSuggestions = streamingResponse?.suggestions || this.suggestion;
        }
        if (streamingResponse) {
            this.stopStreaming = false;
            streamResponse(streamingResponse.response);
        } else {
            this.streamingAIAssistView.addPromptResponse(defaultResponse, true);
            this.streamingAIAssistView.promptSuggestions = this.suggestion;
        }
    }
    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="stream-aiassistview">
                        <AIAssistViewComponent id="streamAssistView" ref={aiassistView => (this.streamingAIAssistView = aiassistView)} promptSuggestions={this.suggestion} toolbarSettings={this.assistViewToolbarSettings} promptRequest={this.onPromptRequest} stopRespondingClick={this.handleStopResponse} bannerTemplate={this.bannerTemplate}></AIAssistViewComponent>
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
                        This implementation provides an interactive AI chat experience with real-time streaming updates, enhanced by Markdown-to-HTML conversion using the <code>MarkdownConverter</code>.
                    </p>
                </div>
            </div>
        );
    }
}