import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './default.css';
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
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
        <i>To get started, provide input or choose a suggestion.</i>
    </div>`;

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
                <div className="default-aiassistview">
                    <AIAssistViewComponent id="aiAssistView" promptSuggestions={suggestion} toolbarSettings={assistViewToolbarSettings} promptRequest={promptRequest} ref={assistInstance} bannerTemplate={bannerTemplate}></AIAssistViewComponent>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the default functionalities of the AI AssistView component. The AI AssistView creates an interface through which users can interact with AI-driven suggestions and prompts.</p>
            </div>
            <div id="description">
                <p>In this example, the <code>bannerTemplate</code> customizes the banner content, and <code>toolbarSettings</code> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The <code>promptSuggestions</code> provides AI prompt suggestions, and <code>promptRequest</code> handles prompt requests when triggered.</p>
            </div>
        </div>
    );
}
export default Default;
