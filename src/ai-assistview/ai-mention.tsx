import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, MentionSettingsModel, PromptRequestEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './mentionData.json';
import './ai-mention.css';

export class Mentions extends SampleBase<{}, {}> {

  suggestion: string[] = data["mentionSuggestions"];
  agentPrompts = data['agentPrompts'];
  commandPrompts = data['commandPrompts'];

  agentMentionData: any = [
    { id: 'TechSupport', name: 'TechSupport', description: 'Help troubleshoot VPN connectivity issues.', placeholder: 'Ask about VPN, network, or device issues', iconCss: 'e-icons e-comment-status' },
    { id: 'HRAssistant', name: 'HRAssistant', description: 'What is the parental leave policy?', placeholder: 'Ask about leave, benefits, and HR policies', iconCss: 'e-icons e-people' },
    { id: 'KnowledgeBase', name: 'KnowledgeBase', description: 'Find details about the employee onboarding process.', iconCss: 'e-icons e-objects' }
  ];

  commandMentionData: any = [
    { id: 'table', name: '/table', description: 'Answer as a markdown table', placeholder: 'Format the response as a table', iconCss: 'e-icons e-table' },
    { id: 'rewrite', name: '/rewrite', description: 'Rewrite content for clarity and professionalism.', placeholder: 'Improve clarity and professional tone', iconCss: 'e-icons e-rename' },
    { id: 'checklist', name: '/checklist', description: 'Convert a process into a step-by-step checklist.', iconCss: 'e-icons e-list-unordered' }
  ];

  commandItemTemplate: string = '<div class="listItems"><span class="commandIcon ${iconCss}"></span><span class="commandName">${name}</span><span class="commandDesc">${description}</span></div>';
  commandDisplayTemplate: string = '<span class="e-aiassist-mention-item-chip">${name}</span>';

  mentions: MentionSettingsModel[] = [
    {
      mentionChar: '@',
      dataSource: this.agentMentionData,
      fields: { text: 'name', value: 'id', iconCss: 'iconCss' },
      filterType: 'StartsWith',
      highlight: true
    },
    {
      mentionChar: '/',
      dataSource: this.commandMentionData,
      showMentionChar: false,
      fields: { text: 'name', value: 'id' },
      itemTemplate: this.commandItemTemplate,
      displayTemplate: this.commandDisplayTemplate
    }
  ];

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
        <h3>AI Assistant with Mentions</h3>
        <i>Use mentions to quickly access contextual options and enhance prompts within the AI AssistView.</i>
    </div>`;

  buildSystemPrompt = (mentions: any[]): string => {
    const prompts: string[] = [];

    mentions.forEach((mention) => {
      const name = mention.itemData.id;

      if (this.agentPrompts[name]) {
        prompts.push(this.agentPrompts[name]);
      }

      if (this.commandPrompts[name]) {
        prompts.push(this.commandPrompts[name]);
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

  promptRequest = async (args: PromptRequestEventArgs) => {
    this.abortController = new AbortController();
    try {
      const aiArgs = {
          prompt: args.prompt,
          systemPrompt: this.buildSystemPrompt(args.mentions || [])
      };
      const reply = await getAIResponse(aiArgs, this.abortController);
      const response = aiArgs.systemPrompt && reply?.response ? reply.response : reply;
      this.assistInstance.addPromptResponse(response);
    } catch (error) {
        this.assistInstance.addPromptResponse("We could not reach the AI service; please try again later.");
    }
    this.assistInstance.promptSuggestions = this.suggestion;
  };

  onCreated = (): void => {
    const assistViewElement = document.getElementById('aiAssistView') as any;
    this.assistInstance = assistViewElement.ej2_instances[0];
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
          <div className="mention-aiassistview">
            <AIAssistViewComponent id="aiAssistView" promptPlaceholder="Type a prompt and use '/' for commands or '@' for agents..." mentions={this.mentions} toolbarSettings={this.assistViewToolbarSettings} bannerTemplate={this.bannerTemplate} promptSuggestions={this.suggestion} enableStreaming={true} promptRequest={this.promptRequest} stopRespondingClick={this.stopResponse} created={this.onCreated} ref={aiassistView => (this.assistInstance = aiassistView)}></AIAssistViewComponent>
          </div>
        </div>

        <div id="action-description">
          <p>This sample demonstrates the mention support capabilities of the AI AssistView component. Mentions can be referenced directly within prompts, enabling intelligent and context-aware interactions.</p>
        </div>
        <div id="description">
          <p>In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#mentions">mentions</a> property is used to configure multiple mention sources, enabling users to quickly access contextual actions within the AI AssistView. The <code>@</code> mentions expose purpose-bound agents such as <strong>TechSupport</strong>, <strong>HRAssistant</strong>, and <strong>KnowledgeBase</strong>; the <code>/</code> mentions expose use-case commands such as <strong>/table</strong>, <strong>/rewrite</strong>, and <strong>/checklist</strong>. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> customizes the banner content, and  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#toolbarsettings">toolbarSettings</a> adds custom toolbar items like a right-aligned <code>Refresh</code> button. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> event processes the selected mentions and generates responses based on the chosen agents and commands.</p>
        </div>
      </div>
    )
  }
}