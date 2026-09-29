import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-default.css';

export class Default extends SampleBase<{}, {}> {
  promptsData: PromptModel[] = [
    {
      response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
    }
  ];
  prompts: { [key: string]: string | string[] }[] = data["defaultPromptResponseData"];

  suggestion: string[] = data["defaultSuggestions"];

  toolbarItemClicked = (args) => {
    if (args.item.iconCss === 'e-icons e-refresh') {
      this.assistInstance.prompts = [];
      this.assistInstance.promptSuggestions = this.suggestion;
      this.stopResponse();
    }
  }

  assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: this.toolbarItemClicked
  };

  assistInstance: AIAssistViewComponent;
  abortController: AbortController | undefined;

  bannerTemplate: string = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>AI Assistance</h3>
    <i>To get started, provide input or choose a suggestion.</i>
  </div>`;

  promptRequest = async (args: PromptRequestEventArgs) => {
    this.abortController = new AbortController();
    const foundPrompt = this.prompts.find((promptObj) => promptObj.prompt === args.prompt);
    const response = await getAIResponse(args as any, this.abortController);
    this.assistInstance.addPromptResponse(response as string);
    this.assistInstance.promptSuggestions = (foundPrompt?.suggestions as string[]) || this.suggestion;
  };

  stopResponse = () => {
    if (this.abortController) {
      this.abortController.abort();
    }
  }
  render() {

    return (
      <div className='control-pane'>
        <div className="control-section">
          <div className="default-aiassistview">
            <AIAssistViewComponent id="aiAssistView" toolbarSettings={this.assistViewToolbarSettings} bannerTemplate={this.bannerTemplate} promptSuggestions={this.suggestion} enableStreaming={true} promptRequest={this.promptRequest} stopRespondingClick={this.stopResponse} ref={aiassistView => (this.assistInstance = aiassistView)}></AIAssistViewComponent>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the default functionalities of the AI AssistView component. The AI AssistView creates an interface through which users can interact with AI-driven suggestions and prompts.</p>
        </div>
        <div id="description">
          <p>In this example, the  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> customizes the banner content, and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#toolbarsettings">toolbarSettings</a> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptsuggestions">promptSuggestions</a> provides AI prompt suggestions, and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> handles prompt requests when triggered.</p>
        </div>
      </div>
    )
  }
}