import * as React from 'react';
import { useEffect, useRef } from 'react';
import { AIAssistViewComponent, FooterToolbarSettingsModel, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { updateSampleSection } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-chatgpt-clone.css';

const ChatGPTClone = () => {
  const prompts: { [key: string]: string | string[] }[] = data['defaultPromptResponseData'];
  const assistInstance = useRef<AIAssistViewComponent>(null);
  const chatgptContainer = useRef<HTMLDivElement>(null);
  const isFirstPrompt = useRef<boolean>(true);
  const abortController = useRef<AbortController | undefined>();

  useEffect(() => {
    updateSampleSection();
    if (chatgptContainer.current) chatgptContainer.current.classList.add('middle-footer');
  }, []);
  
  const attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  const speechToTextSettings = { enable: true };

  const footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Inline',
    items: [
      { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left' },
      { iconCss: 'e-icons e-assist-speech-to-text', align: 'Right' }
    ]
  };

  const promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    if (isFirstPrompt.current && chatgptContainer.current) {
      chatgptContainer.current.classList.remove('middle-footer');
      chatgptContainer.current.classList.add('bottom-footer');
      isFirstPrompt.current = false;
    }

    abortController.current = new AbortController();
    const response = await getAIResponse(args as any, abortController.current);
    assistInstance.current?.addPromptResponse(response as string);
  };
  const stopResponse = () => {
        if (abortController.current) {
            abortController.current.abort();
        }
    }
  return (
    <div className="control-pane">
      <div className="control-section chatgpt-clone">
        <div className="chatgpt-aiassist" id="chatgptContainer" ref={chatgptContainer}>
          <AIAssistViewComponent
            id="chatgpt_aiassistview"
            promptRequest={promptRequest}
            stopRespondingClick={stopResponse}
            showHeader={false}
            promptPlaceholder="Ask anything"
            enableAttachments={true}
            speechToTextSettings={speechToTextSettings}
            bannerTemplate={`<div class="banner-content"><div class="chatgpt-header"><h3>Where should we begin?</h3></div></div>`}
            footerToolbarSettings={footerToolbarSettings}
            attachmentSettings={attachmentSettings}
            ref={assistInstance}
          />
        </div>
      </div>

      <div id="action-description">
          <p> This sample demonstrates a ChatGPT-inspired AI AssistView with a compact, distraction-free layout, attachment support, speech-to-text input, and a simulated AI response flow.</p>
      </div>
      <div id="description">
          <p>
              The AI AssistView in this sample showcases how a branded, lightweight assistant interface can be created using Syncfusion’s <code>AIAssistView</code> control while offering essential interaction features and UI customization options:
          </p>
          <ul>
            <li>Configured the <code>footerToolbarSettings</code> property to add footer toolbar items on both the left and right sides of the footer.</li>
              <li>Custom banner template that displays the welcoming "Where should we begin?" message.</li>
              <li>Simulated AI response handling using the <code>promptRequest</code> event.</li>
              <li>Attachment support with configurable save and remove endpoints.</li>
              <li>Speech-to-text input for hands-free interaction.</li>
          </ul>
          <p>
              This example serves as a foundation for integrating real LLM services and building branded conversational interfaces with modular UI controls.
          </p>
      </div>
    </div>
  );
};

export default ChatGPTClone;