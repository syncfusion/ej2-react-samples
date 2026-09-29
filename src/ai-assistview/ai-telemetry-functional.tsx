import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './ai-telemetry.css';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, TelemetrySettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { getOpenAIModelAssistview } from '../common/ai-service';
import * as data from './promptResponseData.json';

const Telemetry = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const suggestion: string[] = data["telemetrySuggestions"];

    const toolbarItemClicked = (args: any) => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            assistInstance.current.prompts = [];
            assistInstance.current.promptSuggestions = suggestion;
            stopResponse();
        }
    };

    const assistViewToolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked
    };

    const telemetrySettings: TelemetrySettingsModel = {
        enable: true
    }

    const bannerTemplate: string = `<div class="banner-content">
      <div class="e-icons e-assistview-icon">
      </div><h3>AI Telemetry</h3>
      <i>Send a prompt or pick a suggestion to see telemetry metrics for the turn.</i>
  </div>`;

    const assistInstance = useRef<AIAssistViewComponent>(null);
    const abortControllerRef = useRef<AbortController | undefined>();
    const promptRequest = async (args: PromptRequestEventArgs) => {
        abortControllerRef.current = new AbortController();
        var telemetryData: any = null;
        const result = await getOpenAIModelAssistview(args as any, abortControllerRef.current);
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
        assistInstance.current.addPromptResponse(result.response, true, telemetryData);
        assistInstance.current.promptSuggestions = suggestion;
    };
    const stopResponse = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }
    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="telemetry-aiassistview">
                    <AIAssistViewComponent id="aiAssistView" promptSuggestions={suggestion} toolbarSettings={assistViewToolbarSettings} enableStreaming={true} promptRequest={promptRequest} stopRespondingClick={stopResponse} telemetrySettings={telemetrySettings} ref={assistInstance} bannerTemplate={bannerTemplate}></AIAssistViewComponent>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the telemetry functionality in the AI AssistView. When enabled, it captures per-turn metrics such as response duration, streaming chunks, model identifier, and token usage, and reports them on every response.</p>
            </div>
            <div id="description">
                <p>In this example, the <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#telemetrysettings">telemetrySettings</a> <code>enable</code> property is set to <code>true</code>, so each prompt/response turn automatically reports its metrics. Additionally, the <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> customizes the banner content, and <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#toolbarsettings">toolbarSettings</a> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#promptsuggestions">promptSuggestions</a> provides AI prompt suggestions, and <a target="_blank" href="https://ej2.syncfusion.com/javascript/documentation/api/ai-assistview#promptrequest">promptRequest</a> handles prompt requests when triggered. Hover the duration chip shown in the response toolbar to inspect the metric breakdown for that turn.</p>
            </div>
        </div>
    );
}
export default Telemetry;