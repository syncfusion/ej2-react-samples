import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './ai-default.css';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const promptsData: PromptModel[] = [
        {
            response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
        }
    ];

    const prompts: { [key: string]: string | string[] }[] = data["defaultPromptResponseData"];

    const suggestion: string[] = data["defaultSuggestions"];

    const toolbarItemClicked = (args) => {
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

    const bannerTemplate: string = `<div class="banner-content">
        <div class="e-icons e-assistview-icon"></div>
        <h3>AI Assistance</h3>
        <i>To get started, provide input or choose a suggestion.</i>
    </div>`;

    const assistInstance = useRef<AIAssistViewComponent>(null);
    const abortControllerRef = useRef<AbortController | undefined>();
    const promptRequest = async (args: PromptRequestEventArgs) => {
        abortControllerRef.current = new AbortController();
        const foundPrompt = prompts.find((promptObj) => promptObj.prompt === args.prompt);
        const response = await getAIResponse(args as any, abortControllerRef.current);
        assistInstance.current.addPromptResponse(response as string);
        assistInstance.current.promptSuggestions = (foundPrompt?.suggestions as string[]) || suggestion;
    };
    const stopResponse = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    }
    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="default-aiassistview">
                    <AIAssistViewComponent id="aiAssistView" promptSuggestions={suggestion} toolbarSettings={assistViewToolbarSettings} enableStreaming={true} promptRequest={promptRequest} stopRespondingClick={stopResponse} ref={assistInstance} bannerTemplate={bannerTemplate}></AIAssistViewComponent>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the AI AssistView component. The AI AssistView creates an interface through which users can interact with AI-driven suggestions and prompts.</p>
            </div>
            <div id="description">
                <p>In this example, the  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> customizes the banner content, and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#toolbarsettings">toolbarSettings</a> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptsuggestions">promptSuggestions</a> provides AI prompt suggestions, and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> handles prompt requests when triggered.</p>
            </div>
        </div>
    );
}
export default Default;