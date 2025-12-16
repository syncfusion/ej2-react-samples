import * as React from 'react';
import './text-to-speech.css';
import { SampleBase } from '../common/sample-base';
import { AIAssistViewComponent, PromptRequestEventArgs, ResponseToolbarSettingsModel, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { getAzureOpenAIAssist, AzureOpenAIRequest } from './ai-service';
import { marked } from 'marked';

export class TextToSpeech extends SampleBase<{}, {}> {

    public aiAssistViewObj: AIAssistViewComponent;

    private azureApiKey: string = ''; // Your_Azure_OpenAI_API_Key
    private azureEndpoint: string = ''; // Your_Azure_OpenAI_Endpoint
    private azureDeployment: string = ''; // Your_Deployment_Name
    private azureApiVersion: string = ''; // Your_Azure_OpenAI_API_Version
    
    private stopStreaming: boolean = false;
    private currentUtterance: SpeechSynthesisUtterance | null = null;

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
            { type: 'Button', iconCss: 'e-icons e-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
        ],
        itemClicked: (args) => this.onResponseToolbarItemClicked(args)
    };

    public streamResponse = async (response: string) => {
        let lastResponse = "";
        const responseUpdateRate = 10;
        let i = 0;
        const responseLength = response.length;
        while (i < responseLength && !this.stopStreaming) {
            lastResponse += response[i];
            i++;
            if (i % responseUpdateRate === 0 || i === responseLength) {
                const htmlResponse = marked.parse(lastResponse);
                this.aiAssistViewObj.addPromptResponse(htmlResponse, i === responseLength);
                this.aiAssistViewObj.scrollToBottom();
            }
            await new Promise(resolve => setTimeout(resolve, 15)); // Delay for streaming effect
        }
    };

    public onPromptRequest = async (args: PromptRequestEventArgs) => {
        this.stopStreaming = false;
        if (!this.aiAssistViewObj) return;
        try {
            const responseText = await getAzureOpenAIAssist({
                apiKey: this.azureApiKey,
                endpoint: this.azureEndpoint,
                deployment: this.azureDeployment,
                apiVersion: this.azureApiVersion,
                prompt: args.prompt || 'Hi',
            } as AzureOpenAIRequest);
            await this.streamResponse(responseText);
        } catch (error: any) {
            this.aiAssistViewObj.addPromptResponse(
                '⚠️ Something went wrong while connecting to the OpenAI service. Please check your API key or try again later.'
            );
            this.stopStreaming = true;
        }
    };

    public toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            this.aiAssistViewObj.prompts = [];
        }
    }

    public onResponseToolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        const responseHtml = this.aiAssistViewObj.prompts[args.dataIndex].response;
        if (responseHtml) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = responseHtml;
            const text = (tempDiv.textContent || tempDiv.innerText || '').trim();
            if (args.item.iconCss === 'e-icons e-audio' || args.item.iconCss === 'e-icons e-assist-stop') {
                if (this.currentUtterance) {
                    speechSynthesis.cancel();
                    this.currentUtterance = null;
                    this.aiAssistViewObj.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                    this.aiAssistViewObj.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
                } else {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.onend = () => {
                        this.currentUtterance = null;
                        this.aiAssistViewObj.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                        this.aiAssistViewObj.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
                    };
                    speechSynthesis.speak(utterance);
                    this.currentUtterance = utterance;
                    this.aiAssistViewObj.responseToolbarSettings.items[1].iconCss = 'e-icons e-assist-stop';
                    this.aiAssistViewObj.responseToolbarSettings.items[1].tooltip = 'Stop';
                }
            }
        }
    }

    public stopRespondingClick = () => {
        this.stopStreaming = true;
    };

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="integration-text-to-speech-section">
                        <AIAssistViewComponent id="aiAssistView" ref={(assistview) => { this.aiAssistViewObj = assistview }} prompts={this.prompts} promptRequest={this.onPromptRequest} toolbarSettings={this.toolbarSettings} responseToolbarSettings={this.responseToolbarSettings} stopRespondingClick={this.stopRespondingClick}></AIAssistViewComponent>
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