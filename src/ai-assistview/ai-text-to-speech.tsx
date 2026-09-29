import * as React from 'react';
import './ai-text-to-speech.css';
import { SampleBase } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import { AIAssistViewComponent, PromptRequestEventArgs, ResponseToolbarSettingsModel, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import * as data from './promptResponseData.json';

const promptResponseData = (data as any).defaultPromptResponseData || data;

export class TextToSpeech extends SampleBase<{}, {}> {

    public aiAssistViewObj: AIAssistViewComponent;
    
    private abortController: AbortController | undefined;

    private prompts = [
        {
            prompt: "What is AI?",
            response: "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>"
        }
    ];

    constructor(props: {}) {
        super(props);
    }

    public toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args) => this.toolbarItemClicked(args)
    };

    public responseToolbarSettings: ResponseToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
        ]
    };

    public onPromptRequest = async (args: PromptRequestEventArgs) => {
        if (!this.aiAssistViewObj) return;
        this.abortController = new AbortController();
        try {
            const response = await getAIResponse(args as any, this.abortController);
            if (response && typeof response === 'string') {
                this.aiAssistViewObj.addPromptResponse(response, true);
            }
        } catch (error: any) {
            this.aiAssistViewObj.addPromptResponse(
                '⚠️ Something went wrong. Please try again later.'
            );
        }
    };

    stopResponse = () => {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    public toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            this.aiAssistViewObj.prompts = [];
            this.abortController?.abort();
            this.stopResponse();
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="integration-texttospeech-section">
                        <AIAssistViewComponent id="aiAssistView" ref={(assistview) => { this.aiAssistViewObj = assistview }} prompts={this.prompts} promptRequest={this.onPromptRequest} enableStreaming={true} toolbarSettings={this.toolbarSettings} responseToolbarSettings={this.responseToolbarSettings} stopRespondingClick={this.stopResponse}></AIAssistViewComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the integration of <code>Text-to-Speech</code> functionality with the AI AssistView component. It allows users to convert AI-generated responses into spoken audio using the browser's Web Speech API.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the AI AssistView component is integrated with <code>Text-to-Speech</code> functionality to enable voice-based interaction with AI-generated responses.
                    </p>
                    <p>
                        The sample demonstrates the following features:
                    </p>
                    <ul>
                        <li>
                            The <code>responseToolbarSettings</code> includes a custom <code>Read Aloud</code> button that extracts plain text from the AI response and uses the browser's <code>SpeechSynthesis</code> API to vocalize it.
                        </li>
                        <li>
                            The <code>SpeechSynthesisUtterance</code> interface is used to manage speech playback, including toggling between play and stop states.
                        </li>
                        <li>
                            The <code>toolbarSettings</code> adds a right-aligned <code>Refresh</code> button to clear previous prompts.
                        </li>
                        <li>
                            Responses are streamed dynamically using the <code>addPromptResponse</code> method, and the <code>scrollToBottom</code> method ensures the latest response is always visible.
                        </li>
                        <li>
                            Markdown content is rendered using the <code>Marked</code> plugin for rich formatting in AI responses.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}