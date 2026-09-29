import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, TelemetrySettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import { getOpenAIModelAssistview } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-telemetry.css';

export class Telemetry extends SampleBase<{}, {}> {
  
  suggestion: string[] = data["telemetrySuggestions"];

  toolbarItemClicked = (args: any) => {
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

  telemetrySettings: TelemetrySettingsModel = {
    enable: true
  }

  assistInstance: AIAssistViewComponent;
  abortController: AbortController | undefined;

  bannerTemplate: string = `<div class="banner-content">
      <div class="e-icons e-assistview-icon">
      </div><h3>AI Telemetry</h3>
      <i>Send a prompt or pick a suggestion to see telemetry metrics for the turn.</i>
  </div>`;

  promptRequest = async (args: PromptRequestEventArgs) => {
    this.abortController = new AbortController();
    var telemetryData: any = null;
    const result = await getOpenAIModelAssistview(args as any, this.abortController);
    if (result && result.usage) {
      // Map the usage details returned by the AI service to update the telemetry data.
      telemetryData = {
        model: result.model,
        inputTokens: result.usage.prompt_tokens,
        outputTokens: result.usage.completion_tokens,
        reasoningTokens: result.usage.completion_tokens_details.reasoning_tokens,
        cachedInputTokens: result.usage.prompt_tokens_details.cached_tokens
      };
    }
    this.assistInstance.addPromptResponse(result.response, true, telemetryData);
    this.assistInstance.promptSuggestions = this.suggestion;
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
          <div className="telemetry-aiassistview">
            <AIAssistViewComponent id="aiAssistView" toolbarSettings={this.assistViewToolbarSettings} bannerTemplate={this.bannerTemplate} promptSuggestions={this.suggestion} enableStreaming={true} promptRequest={this.promptRequest} stopRespondingClick={this.stopResponse} telemetrySettings={this.telemetrySettings} ref={aiassistView => (this.assistInstance = aiassistView)}></AIAssistViewComponent>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the telemetry functionality in the AI AssistView. When enabled, it captures per-turn metrics such as response duration, streaming chunks, model identifier, and token usage, and reports them on every response.</p>
        </div>
        <div id="description">
          <p>In this example, the <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#telemetrysettings">telemetrySettings</a> <code>enable</code> property is set to <code>true</code>, so each prompt/response turn automatically reports its metrics. Additionally, the <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> customizes the banner content, and <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#toolbarsettings">toolbarSettings</a> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#promptsuggestions">promptSuggestions</a> provides AI prompt suggestions, and <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#promptrequest">promptRequest</a> handles prompt requests when triggered. Hover the duration chip shown in the response toolbar to inspect the metric breakdown for that turn.</p>
        </div>
      </div>
    )
  }
}