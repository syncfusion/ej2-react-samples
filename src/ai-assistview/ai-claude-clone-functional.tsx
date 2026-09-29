import * as React from 'react';
import { useEffect, useRef } from 'react';
import { AIAssistViewComponent, FooterToolbarSettingsModel, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { Button, Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { updateSampleSection } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-claude-clone.css';

interface ModelItem {
  text: string;
  description: string;
  id?: string;
}

const ClaudeClone = () => {
  const prompts: { [key: string]: string | string[] }[] = data["claudePromptResponseData"];

  const assistInstance = useRef<AIAssistViewComponent>(null);
  const claudeContainer = useRef<HTMLDivElement>(null);
  const modelDropdown = useRef<DropDownButton | null>(null);
  const isFirstPrompt = useRef<boolean>(true);
  const currentModel = useRef<string>('Opus 4.6');
  const extendedThinkingEnabled = useRef<boolean>(false);
  const abortControllerRef = useRef<AbortController | undefined>();

  useEffect(() => {
    updateSampleSection();
    if (claudeContainer.current) {
      claudeContainer.current.classList.add('middle-footer');
    }
    initializeActionButtons();
  }, []);

  const footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Bottom',
    items: [
      { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left' },
      { align: 'Right', template: '<button id="custombtn">Opus 4.6</button>' }
    ]
  };

  const attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  // Mirrors the TS `created()` — the footer toolbar DOM (including #custombtn) is
  // guaranteed to exist at this point, so we can safely appendTo it.
  const onAssistCreated = (): void => {
    initializeModelDropdown();
  };

  const onModelDropdownOpen = (): void => {
    const toggleInput = document.getElementById('extended-thinking-switch') as HTMLInputElement;
    if (toggleInput && !toggleInput.classList.contains('e-switch')) {
      new Switch({
        checked: extendedThinkingEnabled.current,
        change: (args: ChangeEventArgs) => { extendedThinkingEnabled.current = args.checked; }
      }).appendTo(toggleInput);

      const toggleContainer = toggleInput.closest('.toggle-container');
      if (toggleContainer) {
        toggleContainer.addEventListener('click', (e: Event) => e.stopPropagation());
      }
    }
  };

  const initializeModelDropdown = (): void => {
    const items: ModelItem[] = [
      { text: 'Opus 4.6',         description: 'Most capable for ambitious work' },
      { text: 'Sonnet 4.6',       description: 'Most efficient for everyday tasks' },
      { text: 'Haiku 4.5',        description: 'Fastest for quick answers' },
      { text: 'Extended thinking', description: 'Think longer for complex tasks', id: 'extended-thinking' }
    ];

    const btnElem = document.getElementById('custombtn');
    if (btnElem) {
      const dropdown = new DropDownButton({
        items,
        cssClass: 'e-flat claude_model',
        beforeItemRender: (args: MenuEventArgs) => {
          const item = args.item as ModelItem;
          let contentHtml = `
            <div class="model-content">
              <div class="model-name">${item.text}</div>
              <div class="model-description">${item.description}</div>
            </div>`;
          if (item.id === 'extended-thinking') {
            contentHtml += `
              <div class="toggle-container">
                <input type="checkbox" class="extended-thinking-toggle" id="extended-thinking-switch" />
              </div>`;
          }
          args.element.innerHTML = `<div class="model-item">${contentHtml}</div>`;
          if (currentModel.current === item.text) {
            args.element.classList.add('e-selected');
          }
        },
        open: onModelDropdownOpen,
        select: (args: MenuEventArgs) => {
          currentModel.current = args.item.text;
          if (modelDropdown.current) modelDropdown.current.content = args.item.text;
        }
      });
      dropdown.appendTo(btnElem);
      modelDropdown.current = dropdown;
    }
  };

  const initializeActionButtons = (): void => {
    const buttons = [
      { id: 'codeBtn',   icon: 'e-icons e-code-view' },
      { id: 'writeBtn',  icon: 'e-icons e-edit' },
      { id: 'choiceBtn', icon: 'e-icons e-stamp' },
      { id: 'learnBtn',  icon: 'e-icons e-layers' },
      { id: 'lifeBtn',   icon: 'e-icons e-activities' }
    ];
    buttons.forEach((btn) => {
      const element = document.getElementById(btn.id);
      if (element) new Button({ iconCss: btn.icon }).appendTo(element);
    });
  };

  const promptRequest = async (args: PromptRequestEventArgs) => {
    if (isFirstPrompt.current && claudeContainer.current) {
      claudeContainer.current.classList.remove('middle-footer');
      claudeContainer.current.classList.add('bottom-footer');
      isFirstPrompt.current = false;
    }

    abortControllerRef.current = new AbortController();
    const response = await getAIResponse(args as any, abortControllerRef.current);
    if (assistInstance.current) assistInstance.current.addPromptResponse(response as string);
  };

  const stopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }

  return (
    <div className='control-pane'>
      <div className="control-section claude-clone">
        <div className="claude-aiassist" id="claudeContainer" ref={claudeContainer}>
          <AIAssistViewComponent
            id="claude_aiassistview"
            promptRequest={promptRequest}
            stopRespondingClick={stopResponse}
            showHeader={false}
            promptPlaceholder="How can i help you today?"
            enableAttachments={true}
            enableStreaming={true}
            bannerTemplate={`<div class="banner-content"><div class="claude-header"><img src="https://freepnglogo.com/images/all_img/claude-ai-icon-65aa.png" alt="Claude"><h2>Golden hour thinking</h2></div></div>`}
            footerToolbarSettings={footerToolbarSettings}
            attachmentSettings={attachmentSettings}
            created={onAssistCreated}
            ref={assistInstance}
          />
          <div id="buttonsContainer" className="claude-buttons-container">
            <button id="codeBtn">Code</button>
            <button id="writeBtn">Write</button>
            <button id="choiceBtn">Claude's Choice</button>
            <button id="learnBtn">Learn</button>
            <button id="lifeBtn">Life stuff</button>
          </div>
        </div>
      </div>

      <div id="action-description">
        <p>This sample demonstrates a Claude-inspired AI AssistView with file attachments and a configurable model selector for seamless branded conversational experiences.</p>
      </div>
      <div id="description">
        <p>This sample demonstrates a branded Claude-inspired chat interface with model selection and attachments.</p>
        <ul>
          <li>Minimal header-less chat layout for distraction-free conversations using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#showheader">showHeader</a>.</li>
          <li>Custom <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> displaying branded Claude visuals and contextual messaging.</li>
          <li>Simulated AI response handling using the <code>promptRequest</code> callback.</li>
          <li>File attachment support via <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#attachmentsettings">attachmentSettings</a> with configurable save and remove endpoints.</li>
          <li>Footer toolbar customization with attachment actions and a model selector via <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#footertoolbarsettings">footerToolbarSettings</a>.</li>
          <li>Dropdown-based AI model switching (Opus, Sonnet, Haiku, Extended thinking).</li>
        </ul>
        <p>This example serves as a foundation for integrating real LLM services and building branded conversational interfaces with modular UI controls.</p>
      </div>
    </div>
  );
};

export default ClaudeClone;