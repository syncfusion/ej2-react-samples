import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SpeechToTextComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './speech-to-text.css';
import { SampleBase } from '../common/sample-base';
import { AIAssistViewComponent, PromptRequestEventArgs, PromptToolbarSettingsModel, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { getAzureOpenAIAssist, AzureOpenAIRequest } from './ai-service';
import { marked } from 'marked';

export class SpeechToText extends SampleBase<{}, {}> {

    public aiAssistViewObj: AIAssistViewComponent;
    public speechToTextObj: SpeechToTextComponent;

    private azureApiKey: string = ''; // Your_Azure_OpenAI_API_Key
    private azureEndpoint: string = ''; // Your_Azure_OpenAI_Endpoint
    private azureDeployment: string = ''; // Your_Deployment_Name
    private azureApiVersion: string = ''; // Your_Azure_OpenAI_API_Version
    
    private stopStreaming: boolean = false;

    constructor(props: {}) {
        super(props);
    }

    public toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args) => this.toolbarItemClicked(args)
    };

    public promptToolbarSettings: PromptToolbarSettingsModel = {    
        itemClicked: (args) => {
            if (args.item.iconCss === "e-icons e-assist-edit") {
                const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
                assistviewFooter.innerHTML = this.aiAssistViewObj.prompts[args.dataIndex].prompt;
                this.toggleButtons();
            }
        }
    };

    public bannerTemplate = () => {
        return (<div className="banner-info">
            <div className="e-icons e-listen-icon"></div>
            <h3>Speech To Text</h3>
            <i>Click the below mic-button to convert your voice to text.</i>
        </div>)
    }

    public footerTemplate = () => {
        return (
            <div className="e-footer-wrapper">
                <div id="assistview-footer" className="content-editor" contentEditable="true" placeholder="Click to speak or start typing..." onInput={this.toggleButtons} onKeyDown={this.handleKeyDown}></div>
                <div className="option-container">
                    <SpeechToTextComponent id="speechToText" ref={(speechtotext) => { this.speechToTextObj = speechtotext }} transcriptChanged={this.onTranscriptChange} onStop={this.onListeningStop} created={this.onCreated} />
                    <ButtonComponent id="assistview-sendButton" className="e-assist-send e-icons" onClick={this.sendIconClicked} />
                </div>
            </div>
        )
    }

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
        this.toggleButtons();
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
            this.toggleButtons();
        }
    };

    public toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            this.aiAssistViewObj.prompts = [];
        }
    }

    public sendIconClicked = () => {
        const assistviewFooter = document.getElementById('assistview-footer') as HTMLElement;
        this.aiAssistViewObj.executePrompt(assistviewFooter.innerText);
        assistviewFooter.innerText = "";
    };

    public onTranscriptChange = (args) => {
        const assistviewFooter = document.getElementById('assistview-footer') as HTMLElement;
        assistviewFooter.innerText = args.transcript;
    };

    public onListeningStop = () => {
        this.toggleButtons();
    };

    public onCreated = () => {
        this.toggleButtons();
    };

    public toggleButtons = () => {
        const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
        const sendButton = document.querySelector('#assistview-sendButton') as HTMLElement;
        const speechButton = document.querySelector('#speechToText') as HTMLElement;
        const hasText = assistviewFooter.innerText.trim() !== '';
        sendButton.classList.toggle('visible', hasText);
        speechButton.classList.toggle('visible', !hasText);
        if (!hasText && (assistviewFooter.innerHTML.trim() === '' || assistviewFooter.innerHTML === '<br>')) {
            assistviewFooter.innerHTML = '';
        }
    };

    public handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.sendIconClicked();
            e.preventDefault();
        }
    };

    public stopRespondingClick = () => {
        this.stopStreaming = true;
        this.toggleButtons();
    };

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="integration-speech-to-text-assist-section">
                        <AIAssistViewComponent id="aiAssistView" ref={(assistview) => { this.aiAssistViewObj = assistview }} promptRequest={this.onPromptRequest} bannerTemplate={this.bannerTemplate} footerTemplate={this.footerTemplate} toolbarSettings={this.toolbarSettings} promptToolbarSettings={this.promptToolbarSettings} stopRespondingClick={this.stopRespondingClick}></AIAssistViewComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the integration of <code>Speech-to-Text</code> functionality with the AI AssistView component. It allows users to convert spoken input into text using the device's microphone and the browser's <code>SpeechRecognition</code> API.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the AI AssistView component is integrated with the <code>SpeechToText</code> component to enable voice-based interaction.
                    </p>
                    <p>
                        The sample demonstrates the following features:
                    </p>
                    <ul>
                        <li>
                            The <code>SpeechToText</code> component captures voice input and transcribes it into text, which is then passed to the AI AssistView for generating contextual responses.
                        </li>
                        <li>
                            The <code>footerTemplate</code> includes a content-editable area and a microphone button for initiating voice input.
                        </li>
                        <li>
                            The <code>toolbarSettings</code> adds a right-aligned <code>Refresh</code> button to clear previous prompts.
                        </li>
                        <li>
                            Responses are streamed dynamically using the <code>addPromptResponse</code> method for a real-time experience.
                        </li>
                        <li>
                            Markdown content in the response is rendered using the <code>Marked</code> plugin.
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}