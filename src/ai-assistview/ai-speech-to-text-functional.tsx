import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SpeechToTextComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import './ai-speech-to-text.css';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel, FooterToolbarSettingsModel, AttachmentSettingsModel, SpeechToTextSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { updateSampleSection } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import { useEffect, useRef } from 'react';

const SpeechToText = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const aiAssistViewObj = useRef(null);
    const abortControllerRef = useRef<AbortController | undefined>();

    const toolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args) => toolbarItemClicked(args)
    };
    const footerToolbarSettings: FooterToolbarSettingsModel= {
        toolbarPosition: 'Bottom',
        items: [
            { iconCss: 'e-icons e-assist-send', align: 'Right' },
            { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left', tooltip: 'Attach File' },
            { iconCss: 'e-icons e-assist-speech-to-text', align: 'Left'}
        ]
    }

    const enableAttachments: boolean = true;
    const attachmentSettings : AttachmentSettingsModel = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };
    const speechToTextSettings: SpeechToTextSettingsModel = {
        enable: true
    }

    const bannerTemplate = () => {
        return (
            <div className="banner-info">
                <div className="e-icons e-listen-icon"></div>
                <h3>Speech To Text</h3>
                <i>Click the below mic-button to convert your voice to text.</i>
            </div>
        );
    };

    const onPromptRequest = async (args: PromptRequestEventArgs) => {
        if (!args?.prompt?.trim() || !aiAssistViewObj.current) return;
        abortControllerRef.current = new AbortController();
        try {
            const response = await getAIResponse(args as any, abortControllerRef.current);
            if (response && typeof response === 'string') {
                aiAssistViewObj.current.addPromptResponse(response);
            }
        } catch (error: any) {
            console.error('Error getting AI response:', error);
            aiAssistViewObj.current.addPromptResponse(
                'For real-time prompt processing, connect the AI AssistView control to your preferred AI service.'
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
            stopResponse();
        }
    };

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="integration-speech-to-text-assist-section">
                    <AIAssistViewComponent
                        id="aiAssistView"
                        ref={aiAssistViewObj}
                        promptRequest={onPromptRequest}
                        stopRespondingClick={stopResponse}
                        bannerTemplate={bannerTemplate}
                        toolbarSettings={toolbarSettings}
                        footerToolbarSettings={footerToolbarSettings}
                        attachmentSettings={attachmentSettings}
                        enableAttachments={enableAttachments}
                        enableStreaming={true}
                        speechToTextSettings={speechToTextSettings}
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
};

export default SpeechToText;