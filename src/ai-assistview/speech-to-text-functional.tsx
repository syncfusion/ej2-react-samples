import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SpeechToTextComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './speech-to-text.css';
import { AIAssistViewComponent, PromptRequestEventArgs, PromptToolbarSettingsModel, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { getAzureOpenAIAssist, AzureOpenAIRequest } from './ai-service';
import { marked } from 'marked';
import { updateSampleSection } from '../common/sample-base';
import { useEffect } from 'react';

const SpeechToText = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    let aiAssistViewObj =  React.useRef(null);
    let speechToTextObj = React.useRef(null);
    
    let azureApiKey: string = ''; // Your_Azure_OpenAI_API_Key
    let azureEndpoint: string = ''; // Your_Azure_OpenAI_Endpoint
    let azureDeployment: string = ''; // Your_Deployment_Name
    let azureApiVersion: string = ''; // Your_Azure_OpenAI_API_Version
    
    let stopStreaming: boolean = false;

    const toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args) => toolbarItemClicked(args)
    };

    const promptToolbarSettings: PromptToolbarSettingsModel = {    
        itemClicked: (args) => {
            if (args.item.iconCss === "e-icons e-assist-edit") {
                const assistviewFooter = document.querySelector('#assistview-footer') as HTMLElement;
                assistviewFooter.innerHTML = aiAssistViewObj.current?.prompts[args.dataIndex].prompt;
                toggleButtons();
            }
        }
    };

    const bannerTemplate = () => {
        return (
            <div className="banner-info">
                <div className="e-icons e-listen-icon"></div>
                <h3>Speech To Text</h3>
                <i>Click the below mic-button to convert your voice to text.</i>
            </div>
        );
    };

    const footerTemplate = () => {
        return (
            <div className="e-footer-wrapper">
                <div id="assistview-footer" className="content-editor" contentEditable="true" placeholder="Click to speak or start typing..." onInput={toggleButtons} onKeyDown={handleKeyDown}></div>
                <div className="option-container">
                    <SpeechToTextComponent id="speechToText" ref={speechToTextObj} cssClass="e-flat" transcriptChanged={onTranscriptChange} onStop={onListeningStop} created={onCreated} />
                    <ButtonComponent id="assistview-sendButton" className="e-assist-send e-icons" onClick={sendIconClicked} />
                </div>
            </div>
        );
    };

    const streamResponse = async (response: string) => {
        let lastResponse = "";
        const responseUpdateRate = 10;
        let i = 0;
        const responseLength = response.length;
        while (i < responseLength && !stopStreaming) {
            lastResponse += response[i];
            i++;
            if (i % responseUpdateRate === 0 || i === responseLength) {
                const htmlResponse = marked.parse(lastResponse);
                aiAssistViewObj.current?.addPromptResponse(htmlResponse, i === responseLength);
                aiAssistViewObj.current?.scrollToBottom();
            }
            await new Promise(resolve => setTimeout(resolve, 15)); // Delay for streaming effect
        }
        toggleButtons();
    };

    const onPromptRequest = async (args: PromptRequestEventArgs) => {
        stopStreaming = false;
        if (!aiAssistViewObj.current) return;
        try {
            const responseText = await getAzureOpenAIAssist({
                apiKey: azureApiKey,
                endpoint: azureEndpoint,
                deployment: azureDeployment,
                apiVersion: azureApiVersion,
                prompt: args.prompt || 'Hi',
            } as AzureOpenAIRequest);
            await streamResponse(responseText);
        } catch (error: any) {
            aiAssistViewObj.current.addPromptResponse(
                '⚠️ Something went wrong while connecting to the OpenAI service. Please check your API key or try again later.'
            );
            stopStreaming = true;
            toggleButtons();
        }
    };

    const toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewObj.current!.prompts = [];
        }
    };

    const sendIconClicked = () => {
        const assistviewFooter = document.getElementById('assistview-footer') as HTMLElement;
        aiAssistViewObj.current?.executePrompt(assistviewFooter.innerText);
        assistviewFooter.innerText = "";
    };

    const onTranscriptChange = (args: any) => {
        const assistviewFooter = document.getElementById('assistview-footer') as HTMLElement;
        assistviewFooter.innerText = args.transcript;
    };

    const onListeningStop = () => {
        toggleButtons();
    };

    const onCreated = () => {
        toggleButtons();
    };

    const toggleButtons = () => {
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            sendIconClicked();
            event.preventDefault();
        }
    };

    const stopRespondingClick = () => {
        stopStreaming = true;
        toggleButtons();
    };

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="integration-speech-to-text-assist-section">
                    <AIAssistViewComponent
                        id="aiAssistView"
                        ref={aiAssistViewObj}
                        promptRequest={onPromptRequest}
                        bannerTemplate={bannerTemplate}
                        footerTemplate={footerTemplate}
                        toolbarSettings={toolbarSettings}
                        promptToolbarSettings={promptToolbarSettings}
                        stopRespondingClick={stopRespondingClick}
                    />
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
};

export default SpeechToText;