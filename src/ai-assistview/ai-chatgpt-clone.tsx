import * as React from 'react';
import { AIAssistViewComponent, FooterToolbarSettingsModel, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-chatgpt-clone.css';

export class ChatGPTClone extends SampleBase<{}, {}> {
  prompts: { [key: string]: string | string[] }[] = data['defaultPromptResponseData'];
  assistInstance: AIAssistViewComponent;
  chatgptContainer: HTMLElement | null;
  private isFirstPrompt: boolean = true;
  private abortController: AbortController | undefined;

  componentDidMount(): void {
    this.chatgptContainer = document.getElementById('chatgptContainer');
    if (this.chatgptContainer) this.chatgptContainer.classList.add('middle-footer');
  }

  bannerTemplate: string = `<div class="banner-content">
    <div class="chatgpt-header">
        <h3>Where should we begin?</h3>
    </div>
  </div>`;

  attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  speechToTextSettings = { enable: true };

  footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Inline',
    items: [
      { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left' },
      { iconCss: 'e-icons e-assist-speech-to-text', align: 'Right' }
    ]
  };

  promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    if (this.isFirstPrompt && this.chatgptContainer) {
      this.chatgptContainer.classList.remove('middle-footer');
      this.chatgptContainer.classList.add('bottom-footer');
      this.isFirstPrompt = false;
    }

    this.abortController = new AbortController();
    const response = await getAIResponse(args as any, this.abortController);
    this.assistInstance.addPromptResponse(response as string);
  };

  stopResponse = () => {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  render() {
    return (
      <div className="control-pane">
        <div className="control-section chatgpt-clone">
          <div className="chatgpt-aiassist" id="chatgptContainer">
            <AIAssistViewComponent
              id="chatgpt_aiassistview"
              promptRequest={this.promptRequest}
              stopRespondingClick={this.stopResponse}
              showHeader={false}
              promptPlaceholder="Ask anything"
              enableAttachments={true}
              speechToTextSettings={this.speechToTextSettings}
              bannerTemplate={this.bannerTemplate}
              footerToolbarSettings={this.footerToolbarSettings}
              attachmentSettings={this.attachmentSettings}
              ref={(assist) => (this.assistInstance = assist)}
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
  }
}