import * as React from 'react';
import './text-to-speech.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ResponseToolbarSettingsModel, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { getAzureOpenAIAssist, AzureOpenAIRequest } from './ai-service';
import { marked } from 'marked';
import { updateSampleSection } from '../common/sample-base';
import { useEffect } from 'react';

const TextToSpeech = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    let aiAssistViewObj =  React.useRef(null);
    
    let azureApiKey: string = ''; // Your_Azure_OpenAI_API_Key
    let azureEndpoint: string = ''; // Your_Azure_OpenAI_Endpoint
    let azureDeployment: string = ''; // Your_Deployment_Name
    let azureApiVersion: string = ''; // Your_Azure_OpenAI_API_Version
    
    let stopStreaming: boolean = false;
    let currentUtterance: SpeechSynthesisUtterance | null = null;

    const prompts = [
        {
            prompt: "What is AI?",
            response: "<div>AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.</div>"
        }
    ];

    const toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args) => toolbarItemClicked(args)
    };

    const responseToolbarSettings: ResponseToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
        ],
        itemClicked: (args) => onResponseToolbarItemClicked(args)
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
        }
    };

    const toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewObj.current!.prompts = [];
        }
    };

    const onResponseToolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        const responseHtml = aiAssistViewObj.current?.prompts[args.dataIndex].response;
        if (responseHtml) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = responseHtml;
            const text = (tempDiv.textContent || tempDiv.innerText || '').trim();
            if (args.item.iconCss === 'e-icons e-audio' || args.item.iconCss === 'e-icons e-assist-stop') {
                if (currentUtterance) {
                    speechSynthesis.cancel();
                    currentUtterance = null;
                    aiAssistViewObj.current.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                    aiAssistViewObj.current.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
                } else {
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.onend = () => {
                        currentUtterance = null;
                        aiAssistViewObj.current.responseToolbarSettings.items[1].iconCss = 'e-icons e-audio';
                        aiAssistViewObj.current.responseToolbarSettings.items[1].tooltip = 'Read Aloud';
                    };
                    speechSynthesis.speak(utterance);
                    currentUtterance = utterance;
                    aiAssistViewObj.current.responseToolbarSettings.items[1].iconCss = 'e-icons e-assist-stop';
                    aiAssistViewObj.current.responseToolbarSettings.items[1].tooltip = 'Stop';
                }
            }
        }
    };

    const stopRespondingClick = () => {
        stopStreaming = true;
    };

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="integration-text-to-speech-assist-section">
                    <AIAssistViewComponent
                        id="aiAssistView"
                        ref={aiAssistViewObj}
                        prompts={prompts}
                        promptRequest={onPromptRequest}
                        toolbarSettings={toolbarSettings}
                        responseToolbarSettings={responseToolbarSettings}
                        stopRespondingClick={stopRespondingClick}
                    />
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
};

export default TextToSpeech;