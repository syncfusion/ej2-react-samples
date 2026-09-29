import * as React from 'react';
import { useEffect, useRef } from 'react';
import { AIAssistViewComponent, FooterToolbarSettingsModel, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { updateSampleSection } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-gemini-clone.css';

interface ModelItem {
  text: string;
  description: string;
}

const GeminiClone = () => {
  const prompts: { [key: string]: string | string[] }[] = data["geminiPromptResponseData"];

  const assistInstance = useRef<AIAssistViewComponent>(null);
  const geminiContainer = useRef<HTMLDivElement>(null);
  const modelDropdown = useRef<DropDownButton | null>(null);
  const isFirstPrompt = useRef<boolean>(true);
  const currentModel = useRef<string>('Fast');
  const abortControllerRef = useRef<AbortController | undefined>();

  useEffect(() => {
    updateSampleSection();
    if (geminiContainer.current) {
      geminiContainer.current.classList.add('middle-footer');
    }
    initializeActionButtons();
  }, []);

  const footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Bottom',
    items: [
      { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left' },
      { align: 'Right', template: '<button id="custombtn">Fast</button>' },
      { iconCss: 'e-icons e-assist-speech-to-text', align: 'Right' }
    ]
  };

  const attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  const speechToTextSettings = { enable: true };

  const toggleButtons = (): void => {
    if (!assistInstance.current) return;
    const sendBtn = (assistInstance.current.element.querySelector('.e-assist-send') as any)?.parentElement;
    const audioBtn = assistInstance.current.element.querySelector('.e-assistview-speech-to-text');

    const hasPrompt =
      assistInstance.current.prompt &&
      assistInstance.current.prompt
        .replace(/<br\s*\/?>/gi, '')
        .replace(/&nbsp;/gi, '')
        .replace(/\s+/g, '')
        .trim();

    if (hasPrompt) {
      if (sendBtn) sendBtn.style.display = 'block';
      if (audioBtn) (audioBtn as any).style.display = 'none';
    } else {
      if (sendBtn) sendBtn.style.display = 'none';
      if (audioBtn) (audioBtn as any).style.display = 'block';
    }
  };

  // Mirrors the TS `created()` — footer DOM is ready, #custombtn exists.
  const onAssistCreated = (): void => {
    initializeModelDropdown();
    toggleButtons();
  };

  const initializeModelDropdown = (): void => {
    const items: ModelItem[] = [
      { text: 'Fast',     description: 'Answers quickly' },
      { text: 'Thinking', description: 'Solve complex problems' },
      { text: 'Pro',      description: 'Advanced maths and code with 3.1 Pro' }
    ];

    const btnElem = document.getElementById('custombtn');
    if (btnElem) {
      const dropdown = new DropDownButton({
        items,
        cssClass: 'e-flat gemini_model',
        beforeItemRender: (args: MenuEventArgs) => {
          const item = args.item as ModelItem;
          args.element.innerHTML = `
            <div class="model-item">
              <div class="model-content">
                <div class="model-name">${item.text}</div>
                <div class="model-description">${item.description}</div>
              </div>
            </div>`;
          if (currentModel.current === item.text) {
            args.element.classList.add('e-selected');
          }
        },
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
      { id: 'imgBtn',   icon: 'e-icons e-image' },
      { id: 'iplBtn',   icon: 'e-icons e-callout' },
      { id: 'musicBtn', icon: 'e-icons e-play' },
      { id: 'writeBtn', icon: '' }
    ];
    buttons.forEach((btn) => {
      const element = document.getElementById(btn.id);
      if (element) new Button({ iconCss: btn.icon }).appendTo(element);
    });
  };

  const promptRequest = async (args: PromptRequestEventArgs) => {
    if (isFirstPrompt.current && geminiContainer.current) {
      geminiContainer.current.classList.remove('middle-footer');
      geminiContainer.current.classList.add('bottom-footer');
      isFirstPrompt.current = false;
    }

    abortControllerRef.current = new AbortController();
    const response = await getAIResponse(args as any, abortControllerRef.current);
    if (assistInstance.current) {
      assistInstance.current.addPromptResponse(response as string);
      toggleButtons();
    }
  };

  const stopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }

  const promptChanged = (): void => {
    toggleButtons();
  };

  return (
    <div className='control-pane'>
      <div className="control-section gemini-clone">
        <div className="gemini-aiassist" id="geminiContainer" ref={geminiContainer}>
          <AIAssistViewComponent
            id="gemini_aiassistview"
            promptRequest={promptRequest}
            promptChanged={promptChanged}
            stopRespondingClick={stopResponse}
            showHeader={false}
            promptPlaceholder="Ask Gemini"
            enableAttachments={true}
            enableStreaming={true}
            speechToTextSettings={speechToTextSettings}
            bannerTemplate={`<div class="banner-content"><div class="gemini-header"><h3>Meet Gemini, your personal AI assistant</h3></div></div>`}
            footerToolbarSettings={footerToolbarSettings}
            attachmentSettings={attachmentSettings}
            created={onAssistCreated}
            ref={assistInstance}
          />
          <div id="buttonsContainer" className="gemini-buttons-container">
            <button id="imgBtn">Create image</button>
            <button id="iplBtn">Follow IPL</button>
            <button id="musicBtn">Create Music</button>
            <button id="writeBtn">Write anything</button>
          </div>
        </div>
      </div>

      <div id="action-description">
        <p>This sample demonstrates a Gemini-inspired AI AssistView with voice input, file attachments, and a model selector for interactive assistant experiences.</p>
      </div>
      <div id="description">
        <p>This sample demonstrates a branded Gemini-inspired chat interface with voice input and model selection.</p>
        <ul>
          <li>Minimal header-less chat layout for distraction-free conversations using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#showheader">showHeader</a>.</li>
          <li>Custom <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> displaying branded Gemini messaging.</li>
          <li>Simulated AI response handling using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> callback.</li>
          <li>File attachment support via <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#attachmentsettings">attachmentSettings</a> with configurable save and remove endpoints.</li>
          <li>Footer toolbar customization with attachment actions and a model selector via <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#footertoolbarsettings">footerToolbarSettings</a>.</li>
          <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#speechtotextsettings">Speech-to-text</a> input for hands-free interaction.</li>
          <li>Dynamic button toggling using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptchanged">promptChanged</a> to show/hide send and audio buttons.</li>
          <li>Dropdown-based AI model switching (Fast, Thinking, Pro).</li>
        </ul>
        <p>This example serves as a foundation for integrating real LLM services and building branded conversational interfaces with modular UI controls.</p>
      </div>
    </div>
  );
};

export default GeminiClone;