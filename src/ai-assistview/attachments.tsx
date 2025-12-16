import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import * as data from './promptResponseData.json';
import './attachments.css';

export class Attachments extends SampleBase<{}, {}> {
  promptsData: PromptModel[] = [
    {
      response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
    }
  ];
  prompts: { [key: string]: string | string[] } [] = data["defaultPromptResponseData"];

  suggestion: string [] = data["defaultSuggestions"];

  toolbarItemClicked = (args) => {
    if (args.item.iconCss === 'e-icons e-refresh') {
        this.assistInstance.prompts = [];
        this.assistInstance.promptSuggestions = this.suggestion;
    }
  }

  assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [ { iconCss: 'e-icons e-refresh', align: 'Right' } ],
    itemClicked: this.toolbarItemClicked
    
  };

  assistInstance: AIAssistViewComponent;

  bannerTemplate: string = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>AI Assistance</h3>
    <i>Type your message or attach files to get started.</i>
  </div>`;

  attachmentSettings = {
      saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
      removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  
  promptRequest = (args: PromptRequestEventArgs) => {
    setTimeout(() => {
      var foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
      var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
      this.assistInstance.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
      this.assistInstance.promptSuggestions = foundPrompt?.suggestions as string []|| this.suggestion;
    }, 2000);
  };
  render() {

    return (
      <div className='control-pane'>
        <div className="control-section">
            <div className="attachment-aiassistview"> 
                <AIAssistViewComponent id="aiAssistView"  toolbarSettings={this.assistViewToolbarSettings} bannerTemplate={this.bannerTemplate} promptSuggestions={this.suggestion}  enableAttachments={true}  attachmentSettings={this.attachmentSettings} promptRequest={this.promptRequest} ref={aiassistView => (this.assistInstance = aiassistView)}></AIAssistViewComponent>
            </div>
        </div>

        <div id="action-description">
            <p>This sample demonstrates how users can attach files while interacting with the AI AssistView. The control enables file uploads to enhance the context of conversations and responses.</p>
        </div>
        <div id="description">
            <p>In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/#enableattachments">enableAttachments</a> property is set to <code>true</code> to enable file attachments. By, using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/#attachmentsettings">attachmentSettings</a> configure the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/attachmentSettings/#saveurl">saveUrl</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/attachmentSettings/#removeurl">removeUrl</a> to allow file uploads for the attached files. Additionally, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/#bannertemplate">bannerTemplate</a> customizes the banner message, and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/#toolbarsettings">toolbarSettings</a> includes a right-aligned <code>Refresh</code> button. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/#promptsuggestions">promptSuggestions</a> feature offers suggested prompts, while <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/#promptrequest">promptRequest</a> handles user queries.</p>
        </div>
      </div>
    )
  }
}