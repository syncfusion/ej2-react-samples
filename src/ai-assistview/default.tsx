import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import * as data from './promptResponseData.json';
import './default.css';

export class Default extends SampleBase<{}, {}> {
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

  bannerTemplate: `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>AI Assistance</h3>
    <i>To get started, provide input or choose a suggestion.</i>
  </div>`;

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
            <div className="default-aiassistview"> 
                <AIAssistViewComponent id="aiAssistView" bannerTemplate={this.bannerTemplate} promptSuggestions={this.suggestion} promptRequest={this.promptRequest} ref={aiassistView => (this.assistInstance = aiassistView)}></AIAssistViewComponent>
            </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the AI AssistView component. The AI AssistView creates an interface through which users can interact with AI-driven suggestions and prompts.</p>
        </div>
        <div id="description">
          <p>In this example, the <code>bannerTemplate</code> customizes the banner content, and <code>toolbarSettings</code> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The <code>promptSuggestions</code> provides AI prompt suggestions, and <code>promptRequest</code> handles prompt requests when triggered.</p>
        </div>
      </div>
    )
  }
}