import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SpeechToTextComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './speech-to-text.css';
import { SampleBase } from '../common/sample-base';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel, FooterToolbarSettingsModel, AttachmentSettingsModel, SpeechToTextSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
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

    public footerToolbarSettings: FooterToolbarSettingsModel= {
        toolbarPosition: 'Bottom',
        items: [
            { iconCss: 'e-icons e-assist-send', align: 'Right' },
            { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left', tooltip: 'Attach File' },
            { iconCss: 'e-icons e-assist-speech-to-text', align: 'Left'}
        ]
    }

    public enableAttachments: boolean = true;
    public attachmentSettings : AttachmentSettingsModel = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
    public speechToTextSettings: SpeechToTextSettingsModel = {
        enable: true
    }

    public bannerTemplate = () => {
        return (<div className="banner-info">
            <div className="e-icons e-listen-icon"></div>
            <h3>Speech To Text</h3>
            <i>Click the below mic-button to convert your voice to text.</i>
        </div>)
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

    public stopRespondingClick = () => {
        this.stopStreaming = true;
    };

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="integration-speech-to-text-assist-section">
                        <AIAssistViewComponent id="aiAssistView" ref={(assistview) => { this.aiAssistViewObj = assistview }} promptRequest={this.onPromptRequest} bannerTemplate={this.bannerTemplate}  toolbarSettings={this.toolbarSettings} stopRespondingClick={this.stopRespondingClick} footerToolbarSettings={this.footerToolbarSettings} enableAttachments={this.enableAttachments} attachmentSettings={this.attachmentSettings} speechToTextSettings={this.speechToTextSettings}></AIAssistViewComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the integration of <code>Speech-to-Text</code> functionality with the AI AssistView component. It allows users to convert spoken input into text using the device's microphone and the browser's <code>SpeechRecognition</code> API.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the AI AssistView component is integrated with the built-in <code>SpeechToText</code> component to enable voice-based interaction.
                    </p>
                    <p>
                        The sample demonstrates the following features:
                    </p>
                    <ul>
                        <li>
                            The <code>footerToolbarSettings</code> to customize the footer options with speech to text, attachments and a send icon.
                        </li>
                        <li>
                            The <code>speechToTextSettings</code> adds the speech to text button at the footer to captures voice input and transcribes it into text.
                        </li>
                        <li>
                            The <code>attachmentSettings</code> to allow file uploads for the attached files.
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