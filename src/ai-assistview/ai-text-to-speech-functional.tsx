import * as React from 'react';
import './ai-text-to-speech.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ResponseToolbarSettingsModel, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { updateSampleSection } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import { useEffect, useRef } from 'react';
import * as data from './promptResponseData.json';

const promptResponseData = (data as any).defaultPromptResponseData || data;

const TextToSpeech = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const aiAssistViewObj = useRef(null);
    const abortControllerRef = useRef<AbortController | undefined>();
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
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' },
        ]
    };

    const onPromptRequest = async (args: PromptRequestEventArgs) => {
        if (!aiAssistViewObj.current) return;
        abortControllerRef.current = new AbortController();
        try {
            const response = await getAIResponse(args as any, abortControllerRef.current);
            if (response && typeof response === 'string') {
                aiAssistViewObj.current?.addPromptResponse(response, true);
            }
        } catch (error: any) {
            aiAssistViewObj.current?.addPromptResponse(
                '⚠️ Something went wrong. Please try again later.'
            );
        }
    };

    const stopResponse = () => {
        if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        }
    }

    const toolbarItemClicked = (args: ToolbarItemClickedEventArgs) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            aiAssistViewObj.current!.prompts = [];
            abortControllerRef.current?.abort();
            stopResponse();
        }
    };

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="integration-texttospeech-section">
                    <AIAssistViewComponent
                        id="aiAssistView"
                        ref={aiAssistViewObj}
                        prompts={prompts}
                        enableStreaming={true}
                        promptRequest={onPromptRequest}
                        toolbarSettings={toolbarSettings}
                        responseToolbarSettings={responseToolbarSettings}
                        stopRespondingClick={stopResponse}
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