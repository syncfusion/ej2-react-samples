import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import './ai-mention.css';
import { AIAssistViewComponent, MentionSettingsModel, PromptModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { getAIResponse } from '../common/ai-service';
import * as data from './mentionData.json';

const Mentions = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const suggestion: string[] = data["mentionSuggestions"];
    const agentPrompts: any = data['agentPrompts'];
    const commandPrompts: any = data['commandPrompts'];

    const agentMentionData: any = [
        { id: 'TechSupport', name: 'TechSupport', description: 'Help troubleshoot VPN connectivity issues.', placeholder: 'Ask about VPN, network, or device issues', iconCss: 'e-icons e-comment-status' },
        { id: 'HRAssistant', name: 'HRAssistant', description: 'What is the parental leave policy?', placeholder: 'Ask about leave, benefits, and HR policies', iconCss: 'e-icons e-people' },
        { id: 'KnowledgeBase', name: 'KnowledgeBase', description: 'Find details about the employee onboarding process.', iconCss: 'e-icons e-objects' }
    ];

    const commandMentionData: any = [
        { id: 'table', name: '/table', description: 'Answer as a markdown table', placeholder: 'Format the response as a table', iconCss: 'e-icons e-table' },
        { id: 'rewrite', name: '/rewrite', description: 'Rewrite content for clarity and professionalism.', placeholder: 'Improve clarity and professional tone', iconCss: 'e-icons e-rename' },
        { id: 'checklist', name: '/checklist', description: 'Convert a process into a step-by-step checklist.', iconCss: 'e-icons e-list-unordered' }
    ];

    const commandItemTemplate: string = '<div class="listItems"><span class="commandIcon ${iconCss}"></span><span class="commandName">${name}</span><span class="commandDesc">${description}</span></div>';
    const commandDisplayTemplate: string = '<span class="e-aiassist-mention-item-chip">${name}</span>';

    const mentions: MentionSettingsModel[]  = [
        {
            mentionChar: '@',
            dataSource: agentMentionData,
            fields: { text: 'name', value: 'id', iconCss: 'iconCss' },
            filterType: 'StartsWith',
            highlight: true
        },
        {
            mentionChar: '/',
            dataSource: commandMentionData,
            showMentionChar: false,
            fields: { text: 'name', value: 'id' },
            itemTemplate: commandItemTemplate,
            displayTemplate: commandDisplayTemplate
        }
    ];

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
        <h3>AI Assistant with Mentions</h3>
        <i>Use mentions to quickly access contextual options and enhance prompts within the AI AssistView.</i>
    </div>`;

    const buildSystemPrompt = (mentions: any[]): string => {
        const prompts: string[] = [];

        mentions.forEach((mention) => {
        const name = mention.itemData.id;

        if (agentPrompts[name]) {
            prompts.push(agentPrompts[name]);
        }

        if (commandPrompts[name]) {
            prompts.push(commandPrompts[name]);
        }
        });

        const selectedCount = (mentions && mentions.length) || 0;
        if (selectedCount > 1) {
            prompts.unshift(
                'Composition: ' + selectedCount + ' mentions are active. ' +
                'Produce a single response that respects every selected agent scope and applies every selected command in order. ' +
                'Commands format the agents\' content; never let one agent override another. '
            );
        }

        return prompts.join('\n\n');
    };

    const assistInstance = useRef<AIAssistViewComponent>(null);
    const abortControllerRef = useRef<AbortController | undefined>();
    const promptRequest = async (args: PromptRequestEventArgs) => {
        abortControllerRef.current = new AbortController();
        try {
              const aiArgs = {
                  prompt: args.prompt,
                  systemPrompt: buildSystemPrompt(args.mentions || [])
              };
              const reply = await getAIResponse(aiArgs, abortControllerRef.current);
              const response = aiArgs.systemPrompt && reply?.response ? reply.response : reply;
              assistInstance.current.addPromptResponse(response);
            } catch (error) {
                assistInstance.current.addPromptResponse("We could not reach the AI service; please try again later.");
            }
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
                <div className="mention-aiassistview">
                    <AIAssistViewComponent id="aiAssistView" promptPlaceholder="Type a prompt and use '/' for commands or '@' for agents..." mentions={mentions} promptSuggestions={suggestion} toolbarSettings={assistViewToolbarSettings} enableStreaming={true} promptRequest={promptRequest} ref={assistInstance} bannerTemplate={bannerTemplate} stopRespondingClick={stopResponse}></AIAssistViewComponent>
                </div>
            </div>

            <div id="action-description">
                <p>This sample demonstrates the mention support capabilities of the AI AssistView component. Mentions can be referenced directly within prompts, enabling intelligent and context-aware interactions.</p>
            </div>
            <div id="description">
                <p>In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#mentions">mentions</a> property is used to configure multiple mention sources, enabling users to quickly access contextual actions within the AI AssistView. The <code>@</code> mentions expose purpose-bound agents such as <strong>TechSupport</strong>, <strong>HRAssistant</strong>, and <strong>KnowledgeBase</strong>; the <code>/</code> mentions expose use-case commands such as <strong>/table</strong>, <strong>/rewrite</strong>, and <strong>/checklist</strong>. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> customizes the banner content, and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#toolbarsettings">toolbarSettings</a> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> event processes the selected mentions and generates responses based on the chosen agents and commands.</p>
            </div>
        </div>
    );
}
export default Mentions;