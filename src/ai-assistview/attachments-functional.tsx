import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './attachments.css';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import * as data from './promptResponseData.json';

const Attachments = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const promptsData: PromptModel[] = [
        {
            response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
        }
    ];

    const prompts:{ [key: string]: string | string[] } [] = data["defaultPromptResponseData"];

    const suggestion: string[] = data["defaultSuggestions"];

    const toolbarItemClicked = (args) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            assistInstance.current.prompts = [];
            assistInstance.current.promptSuggestions = suggestion;
        }
    };

    const assistViewToolbarSettings: ToolbarSettingsModel = {
        items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
        itemClicked: toolbarItemClicked
    };

    const bannerTemplate: string = `<div class="banner-content">
        <div class="e-icons e-assistview-icon"></div>
        <h3>AI Assistance</h3>
        <i>Type your message or attach files to get started.</i>
    </div>`;

     const attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };


    const assistInstance = useRef<AIAssistViewComponent>(null);
    const promptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(function () {
            var foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

            assistInstance.current.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            assistInstance.current.promptSuggestions = foundPrompt?.suggestions as string [] || suggestion;
        }, 2000);
      }
    return(
        <div className='control-pane'>
            <div className="control-section">
                <div className="attachment-aiassistview">
                    <AIAssistViewComponent id="aiAssistView" promptSuggestions={suggestion} toolbarSettings={assistViewToolbarSettings} promptRequest={promptRequest} ref={assistInstance}  enableAttachments={true}  attachmentSettings= {attachmentSettings} bannerTemplate={bannerTemplate}></AIAssistViewComponent>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates how users can attach files while interacting with the AI AssistView. The control enables file uploads to enhance the context of conversations and responses.</p>
            </div>
            <div id="description">
                <p>In this example, the <code>enableAttachments</code> property is set to <code>true</code> to enable file attachments. By, using the <code>attachmentSettings</code> configure the <code>saveUrl</code> and <code>removeUrl</code> to allow file uploads for the attached files. Additionally, the <code>bannerTemplate</code> customizes the banner message, and <code>toolbarSettings</code> includes a right-aligned <code>Refresh</code> button. The <code>promptSuggestions</code> feature offers suggested prompts, while <code>promptRequest</code> handles user queries.</p>
        </div>
        </div>
    );
}
export default Attachments;
