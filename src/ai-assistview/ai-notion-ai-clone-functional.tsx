import * as React from 'react';
import { useEffect, useRef, useCallback } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel, FooterToolbarSettingsModel,ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-interactive-chat';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { updateSampleSection } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-notion-ai-clone.css';

interface ChatSession {
  id: string;
  title: string;
  prompts: any[];
}

const NotionAIClone = () => {
  const notionSuggestions: string[] = data["notionSuggestions"];
  const iconMapByIndex: { [key: number]: string } = data["iconMapByIndex"];
  const modelIcons: { [key: string]: string } = data["modelIcons"];
  const abortController = useRef<AbortController | undefined>(undefined);

  const assistInstance    = useRef<AIAssistViewComponent>(null);
  const dialogInstance    = useRef<DialogComponent>(null);
  const sidebarInstance   = useRef<SidebarComponent>(null);
  const toastInstance     = useRef<ToastComponent>(null);
  const fabInstance       = useRef<FabComponent>(null);

  // Vanilla Syncfusion dropdowns — same pattern as TS version
  const modelDropdownRef    = useRef<DropDownButton | null>(null);
  const settingsDropdownRef = useRef<DropDownButton | null>(null);
  const screenDropdownRef   = useRef<DropDownButton | null>(null);
  const historyDropdownRef  = useRef<DropDownButton | null>(null);

  // Mutable refs for state shared across callbacks (avoids stale closure issues)
  const sessionChats         = useRef<ChatSession[]>([]);
  const activeSessionId      = useRef<string | null>(null);
  const isFirstSessionAdded  = useRef<boolean>(false);
  const webIconCheckedState  = useRef<boolean>(true);
  const editIconCheckedState = useRef<boolean>(true);
  const currentMode          = useRef<string>('Sidebar');
  const lastActiveMode       = useRef<string>('Sidebar'); // tracks mode before hide, used by FAB to restore

  const toggleBackgroundState = useCallback((show: boolean): void => {
    const notionContainer = document.querySelector('.notes-app-container');
    if (notionContainer) {
      show ? notionContainer.classList.remove('e-hidden') : notionContainer.classList.add('e-hidden');
    }
  }, []);

  const toggleIconClass = useCallback((selectorIconClass: string, replaceIconClass: string): void => {
    const icon = (assistInstance.current as any)?.toolbarHeader?.querySelector(`.${selectorIconClass}`);
    if (icon) {
      icon.className = `e-icons ${replaceIconClass}`;
    }
  }, []);

  const updateHistoryDropdown = useCallback((sessions: ChatSession[]): void => {
    const items = sessions.map((session) => ({
      text: session.title.length > 30 ? session.title.substring(0, 30) + '...' : session.title,
      id: session.id
    }));
    if (historyDropdownRef.current) {
      historyDropdownRef.current.items = items.length ? items : [{ text: 'No Chat History' }];
      historyDropdownRef.current.dataBind();
    }
  }, []);

  const persistActiveSession = useCallback((): void => {
    if (!activeSessionId.current || !assistInstance.current) return;
    const session = sessionChats.current.find((s) => s.id === activeSessionId.current);
    if (session) session.prompts = assistInstance.current.prompts;
  }, []);

  const createNewSession = useCallback((isAuto: boolean = false): void => {
    const prompts = assistInstance.current?.prompts;
    if (!prompts || prompts.length === 0) {
      activeSessionId.current = null;
      if (assistInstance.current) {
        assistInstance.current.prompts = [];
        assistInstance.current.dataBind();
      }
      return;
    }
    if (activeSessionId.current) {
      persistActiveSession();
    } else {
      const session: ChatSession = {
        id: String(Date.now()),
        title: prompts[0] ? prompts[0].prompt : 'New Chat',
        prompts
      };
      sessionChats.current.push(session);
      activeSessionId.current = session.id;
      updateHistoryDropdown(sessionChats.current);
    }
    if (!isAuto) {
      activeSessionId.current = null;
      if (assistInstance.current) {
        assistInstance.current.prompts = [];
        assistInstance.current.dataBind();
      }
    }
  }, [persistActiveSession, updateHistoryDropdown]);

  const ensureCurrentChatIsSaved = useCallback((): void => {
    const prompts = assistInstance.current?.prompts;
    if (!prompts || prompts.length === 0) return;
    if (activeSessionId.current) {
      persistActiveSession();
      return;
    }
    const session: ChatSession = {
      id: String(Date.now()),
      title: prompts[0] ? prompts[0].prompt : 'New Chat',
      prompts
    };
    sessionChats.current.push(session);
    updateHistoryDropdown(sessionChats.current);
  }, [persistActiveSession, updateHistoryDropdown]);

  const loadSession = useCallback((sessionId: string): void => {
    if (sessionId === activeSessionId.current) return;
    ensureCurrentChatIsSaved();
    const session = sessionChats.current.find((s) => s.id === sessionId);
    if (!session || !assistInstance.current) return;
    activeSessionId.current = sessionId;
    assistInstance.current.prompts = session.prompts;
    assistInstance.current.promptSuggestions = [];
    assistInstance.current.dataBind();
  }, [ensureCurrentChatIsSaved]);

  const onPromptRequest = useCallback(async (args: PromptRequestEventArgs): Promise<void> => {
    if (assistInstance.current) assistInstance.current.promptSuggestions = [];
    abortController.current = new AbortController();
    args.prompt = 'Based on the following notes content:\n\n' + (document.querySelector('.notes-content') as HTMLElement)?.textContent + '\n\n---\n\nUser prompt: ' + args.prompt;
    if (assistInstance.current) {
      assistInstance.current.addPromptResponse(await getAIResponse(args as any, abortController.current));
      if (!isFirstSessionAdded.current && !activeSessionId.current) {
        createNewSession(true);
        isFirstSessionAdded.current = true;
      }
      assistInstance.current.promptSuggestions = [];
    }
  }, [createNewSession]);

  const stopResponse = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }

  const moveAssistview = useCallback((mode: string): void => {
    if (!mode || currentMode.current === mode) return;
    lastActiveMode.current = mode;
    currentMode.current = mode;
    const wrapper = document.getElementById('assistviewWrapper');
    const fs = document.getElementById('fullscreenContainer');
    if (dialogInstance.current) dialogInstance.current.hide();
    if (sidebarInstance.current) sidebarInstance.current.hide();
    if (fs) fs.style.display = 'none';

    switch (mode) {
      case 'Sidebar':
        if (sidebarInstance.current) sidebarInstance.current.show();
        toggleBackgroundState(true);
        if (sidebarInstance.current && wrapper) sidebarInstance.current.element.appendChild(wrapper);
        toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
        break;
      case 'Floating':
        if (dialogInstance.current) dialogInstance.current.show();
        const dialogElem = document.querySelector('#dialogElem');
        if (dialogElem && wrapper) dialogElem.appendChild(wrapper);
        toggleBackgroundState(true);
        toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
        break;
      case 'Full screen':
        if (fs && wrapper) {
          fs.style.display = 'block';
          fs.appendChild(wrapper);
        }
        toggleBackgroundState(false);
        toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
        break;
    }
  }, [toggleBackgroundState, toggleIconClass]);

  const toggleSwitch = useCallback((args: ChangeEventArgs, text: string): void => {
    const visibility = !args.checked;
    if (text === 'Can make changes') {
      editIconCheckedState.current = !visibility;
      const editIcon = ((assistInstance.current as any).footerToolbarEle as any)?.element?.querySelector('.e-edit')?.closest('.e-toolbar-item');
      if (editIcon) visibility ? editIcon.classList.remove('e-hidden') : editIcon.classList.add('e-hidden');
    } else if (text === 'Web access') {
      webIconCheckedState.current = !visibility;
      const webIcon = ((assistInstance.current as any).footerToolbarEle as any)?.element?.querySelector('.e-time-zone')?.closest('.e-toolbar-item');
      if (webIcon) visibility ? webIcon.classList.remove('e-hidden') : webIcon.classList.add('e-hidden');
    }
  }, []);

  const onSettingsDropdownCreated = useCallback((): void => {
    const settingsItems = [
      { text: 'Can make changes', id: 'edit' },
      { text: 'Web access',       id: 'web-access' },
      { text: 'Help Center',      id: 'help-center' }
    ];
    setTimeout(()=>{
    settingsItems.forEach((item) => {
      if (item.text === 'Help Center') return;
      const isChecked = item.id === 'edit' ? editIconCheckedState.current : webIconCheckedState.current;
      const switchElem = document.getElementById(`settings-switch-${item.id}`);
      if (!switchElem) return;
      new Switch({
        checked: isChecked,
        change: (args: ChangeEventArgs) => toggleSwitch(args, item.text)
      }).appendTo(switchElem);
    });
    },50);
  }, [toggleSwitch]);

  const updateModelIcon = useCallback((modelName: string): void => {
    if (modelDropdownRef.current) {
      modelDropdownRef.current.iconCss = `model-icon ${modelIcons[modelName]}`;
      modelDropdownRef.current.dataBind();
    }
  }, [modelIcons]);

  // Mirrors TS `created()` — initialize all imperative dropdowns once AIAssistView is ready
  const onAssistViewCreated = useCallback((): void => {
    const modelItems = [
      { text: 'Auto',            iconCss: 'e-icons e-assistview-icon' },
      { text: 'Sonnet 4.6',      iconCss: 'model-icon model-sonet' },
      { text: 'Opus 4.6',        iconCss: 'model-icon model-opus' },
      { text: 'Gemini 3.1 Pro',  iconCss: 'model-icon model-gemini' },
      { text: 'GPT 5.2',         iconCss: 'model-icon model-gpt' }
    ];
    let currentModelLabel = 'Auto';

    modelDropdownRef.current = new DropDownButton({
      items: modelItems,
      cssClass: 'e-caret-hide e-flat',
      iconCss: 'e-icons e-assistview-icon',
      beforeItemRender: (args: MenuEventArgs) => {
        const item = modelItems.find((m) => m.text === args.item.text);
        const iconCss = item ? item.iconCss : '';
        const isEIcon = iconCss.startsWith('e-icons');
        args.element.innerHTML = `
          <span class="${iconCss}" style="margin-right:8px;vertical-align:middle;${isEIcon ? 'margin-top:10px;display:inline-block;' : ''}"></span>
          <span>${args.item.text}</span>`;
        if (currentModelLabel === args.item.text) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        currentModelLabel = args.item.text;
        modelDropdownRef.current!.content = args.item.text;
        updateModelIcon(args.item.text);
      }
    });
    modelDropdownRef.current.appendTo('#custombtn');

    const settingsItems = [
      { text: 'Can make changes', iconCss: 'e-icons e-edit',         id: 'edit' },
      { text: 'Web access',       iconCss: 'e-icons e-time-zone',    id: 'web-access' },
      { text: 'Help Center',      iconCss: 'e-icons e-reading-view', id: 'help-center' }
    ];
    settingsDropdownRef.current = new DropDownButton({
      items: settingsItems,
      iconCss: 'e-icons e-settings',
      cssClass: 'e-caret-hide e-flat',
      popupWidth: '230px',
      beforeItemRender: (args) => {
        const item = args.item;
        if (item.text === 'Help Center') {
          args.element.innerHTML = `
                    <div class="settings-item">
                      <span class="e-menu-icon ${item.iconCss}"></span>
                      <span class="settings-label">${item.text}</span>
                    </div>`;
          return;
        }
        args.element.innerHTML = `
                  <div class="settings-item">
                    <span class="e-menu-icon ${item.iconCss}"></span>
                    <span class="settings-label">${item.text}</span>
                    <input type="checkbox" class="settings-switch" id="settings-switch-${item.id}" />
                  </div>`;
      },
      open: onSettingsDropdownCreated
    });
    settingsDropdownRef.current.appendTo('#settings-icon');

    screenDropdownRef.current = new DropDownButton({
      items: [{ text: 'Sidebar' }, { text: 'Floating' }, { separator: true }, { text: 'Full screen' }],
      iconCss: 'e-icons e-resize',
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (currentMode.current === args.item.text) args.element.classList.add('e-selected');
      },
      select: (args: MenuEventArgs) => moveAssistview(args.item.text)
    });
    screenDropdownRef.current.appendTo('#screen-resizer');

    historyDropdownRef.current = new DropDownButton({
      items: [{ text: 'No Chat History' }],
      iconCss: 'e-icons e-history',
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (activeSessionId.current === args.item.id) args.element.classList.add('e-selected');
      },
      select: (args: MenuEventArgs) => {
        if (args.item.id) loadSession(args.item.id);
      }
    });
    historyDropdownRef.current.appendTo('#history-icon');

    // Initialize sidebar and move wrapper to it (matching JS behavior)
    if (sidebarInstance.current) {
      sidebarInstance.current.show();
      const wrapper = document.getElementById('assistviewWrapper');
      if (wrapper) {
        sidebarInstance.current.element.appendChild(wrapper);
      }
      toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
    }
  }, [onSettingsDropdownCreated, updateModelIcon, moveAssistview, loadSession, toggleIconClass]);

  useEffect(() => {
    updateSampleSection();
    if (fabInstance.current) {
      // FAB is hidden on mount — only shown when assistview is hidden
      fabInstance.current.element.style.display = 'none';
      fabInstance.current.element.onclick = () => {
        toggleBackgroundState(true);
        const modeToRestore = lastActiveMode.current || 'Sidebar';
        // Temporarily clear currentMode so moveAssistview's guard doesn't block the restore
        currentMode.current = '';
        moveAssistview(modeToRestore);
        fabInstance.current!.element.style.display = 'none';
      };
    }
  }, [moveAssistview, toggleBackgroundState]);

  const toolbarItemClicked = useCallback((args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-edit-notes') {
      createNewSession();
      if (assistInstance.current) assistInstance.current.promptSuggestions = notionSuggestions;
    } else if (
      args.item.iconCss === 'e-icons e-horizontal-line' ||
      args.item.iconCss === 'e-icons e-chevron-right-double'
    ) {
      // Move wrapper back to dialogElem before hiding
      const dialogElem = document.querySelector('#dialogElem');
      const wrapper = document.getElementById('assistviewWrapper');
      if (dialogElem && wrapper) dialogElem.appendChild(wrapper);
      if (sidebarInstance.current) sidebarInstance.current.hide();
      if (dialogInstance.current) dialogInstance.current.hide();
      toggleBackgroundState(true);
      // Preserve lastActiveMode so the FAB can restore to the correct mode.
      // Reset currentMode to '' so moveAssistview's guard won't block re-entry on FAB click.
      lastActiveMode.current = currentMode.current || 'Sidebar';
      currentMode.current = '';
      if (fabInstance.current) fabInstance.current.element.style.display = '';
    } else if (args.item.iconCss === 'e-icons e-export') {
      if (toastInstance.current) toastInstance.current.show();
    }
  }, [createNewSession, notionSuggestions, toggleBackgroundState]);

  const footerToolbarItemClicked = useCallback((args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-edit' || args.item.iconCss === 'e-icons e-time-zone') {
      if (settingsDropdownRef.current) settingsDropdownRef.current.toggle();
    }
  }, []);

  const suggestionItemContent = useCallback((ctx: any): JSX.Element => {
    const iconClass = iconMapByIndex[ctx.index] || '';
    return (
      <div className="suggestion-item active">
        <span className={`${iconClass} suggestion-icon`}></span>
        <span className="assist-suggestion-content">{ctx.promptSuggestion}</span>
      </div>
    );
  }, [iconMapByIndex]);

  const bannerTemplate: string = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>How can I help you today ?</h3>
  </div>`;

  const assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [
      { iconCss: 'e-icons e-export',         align: 'Right', tooltip: 'Share Chat' },
      { align: 'Right', tooltip: 'Chat History',     template: '<button id="history-icon"></button>' },
      { iconCss: 'e-icons e-edit-notes',      align: 'Right', tooltip: 'Start New chat' },
      { align: 'Right', tooltip: 'Switch Chat Mode', template: '<button id="screen-resizer"></button>' },
      { iconCss: 'e-icons e-horizontal-line', align: 'Right', tooltip: 'Hide Chat' }
    ],
    itemClicked: toolbarItemClicked
  };

  const footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Bottom',
    items: [
      { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left',  tooltip: 'Attach File' },
      { align: 'Left',  tooltip: 'Settings',    template: '<button id="settings-icon"></button>' },
      { iconCss: 'e-icons e-edit',                   align: 'Left',  tooltip: 'Edit access', visible: false },
      { iconCss: 'e-icons e-time-zone',              align: 'Left',  tooltip: 'Web access',  visible: false },
      { align: 'Right', text: 'Auto',                template: '<button id="custombtn">Auto</button>' },
      { iconCss: 'e-icons e-assist-speech-to-text',  align: 'Right' },
      { iconCss: 'e-icons e-assist-send',            align: 'Right' }
    ],
    itemClick: footerToolbarItemClicked
  };

  const responseToolbarSettings: any = {
    items: [
      { iconCss: 'e-icons e-assist-copy' },
      { iconCss: 'e-icons e-assist-like' },
      { iconCss: 'e-icons e-assist-dislike' },
      { iconCss: 'e-icons e-assist-audio' }
    ]
  };

  const attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  const speechToTextSettings = { enable: true };

  return (
    <div className='control-section'>
      <div className="notion-like-ui e-card">
        <div className="notes-app-container">
          <div className="notes-page">
            <header className="notes-header">
              <span className="page-icon">📘</span>
              <h1 className="page-title">Product Planning Notes</h1>
            </header>
            <section className="notes-content">
              <h3>Project: Website Revamp</h3>
              <h4>Objectives</h4>
              <ul>
                <li>Improve page load performance</li>
                <li>Simplify navigation for end users</li>
                <li>Optimize mobile experience</li>
                <li>Increase accessibility compliance</li>
              </ul>
              <h4>Discussion Points</h4>
              <ul>
                <li>Dashboard load time is slow on mobile devices</li>
                <li>Export and reporting options are difficult to locate</li>
                <li>Accessibility audit flagged missing ARIA labels</li>
              </ul>
              <h4>Ideas</h4>
              <ul>
                <li>Introduce lazy loading for charts and grids</li>
                <li>Move advanced filters into a secondary panel</li>
                <li>Add keyboard navigation and screen reader support</li>
              </ul>
            </section>
            <footer className="notes-footer">
              <span className="hint-icon">✨</span>
              <span className="hint-text">Use AI Assist to summarize notes, generate tasks, or get insights.</span>
            </footer>
          </div>
        </div>

        {/* Dialog: holds assistviewWrapper on initial mount (Floating mode default) */}
        <DialogComponent
          id="dialogElem"
          target=".notes-page"
          position={{ X: 'right', Y: 0 }}
          animationSettings={{ effect: 'FadeZoom' }}
          width="500px"
          visible={false}
          cssClass="custom-dialog"
          ref={dialogInstance}
        >
          <div id="assistviewWrapper" className="notion-aiassistview">
            <AIAssistViewComponent
              id="aiAssistView"
              promptSuggestions={notionSuggestions}
              promptSuggestionItemTemplate={suggestionItemContent}
              promptRequest={onPromptRequest}
              stopRespondingClick={stopResponse}
              bannerTemplate={bannerTemplate}
              toolbarSettings={assistViewToolbarSettings}
              footerToolbarSettings={footerToolbarSettings}
              responseToolbarSettings={responseToolbarSettings}
              enableAttachments={true}
              enableStreaming={true}
              attachmentSettings={attachmentSettings}
              speechToTextSettings={speechToTextSettings}
              created={onAssistViewCreated}
              ref={assistInstance}
            >
            <ViewsDirective>
              <ViewDirective type='Assist' name='New AI chat'></ViewDirective>
            </ViewsDirective>
            </AIAssistViewComponent>
          </div>
        </DialogComponent>

        {/* Sidebar: empty on mount; wrapper DOM-moved here on Sidebar mode */}
        <SidebarComponent
          id="notionSidebar"
          target=".notes-page"
          width="400px"
          position="Right"
          animate={false}
          isOpen={false}
          ref={sidebarInstance}
        />

        {/* Fullscreen container: wrapper DOM-moved here on Full screen mode */}
        <div id="fullscreenContainer"></div>

        <FabComponent
          id="fabElem"
          iconCss="e-icons e-magic-wand"
          target=".notes-page"
          ref={(fab) => { fabInstance.current = fab; }}
        />
        <div id="toastTarget"></div>

        <ToastComponent
          content="Share chat option is clicked !"
          position={{ X: 'Right', Y: 'Top' }}
          showCloseButton={true}
          ref={toastInstance}
        />
      </div>

      <div id="action-description">
        <p>This sample demonstrates a configurable AI AssistView that supports multiple chat display modes, model selection, chat history management, file attachments, and voice-based input and output interactions.</p>
      </div>
      <div id="description">
        <p>
          The AI AssistView sample showcases how an interactive assistant experience can be embedded and managed
          within different UI layouts while offering rich user controls and session persistence:
        </p>
        <ul>
          <li>Floating, sidebar, and full-screen chat modes with seamless view switching.</li>
          <li>Prompt suggestions rendered using a custom item template with contextual icons.</li>
          <li>Multiple AI model selection via a dropdown, with dynamic icon updates.</li>
          <li>Chat session creation, persistence, and history navigation.</li>
          <li>File upload and removal support using configured attachment endpoints.</li>
          <li>Speech-to-text input and text-to-speech playback for hands-free interaction.</li>
          <li>Toolbar actions for starting new chats, sharing conversations, hiding the assistant, and resizing views.</li>
          <li>Floating action button (FAB) to restore the assistant when hidden.</li>
        </ul>
      </div>
    </div>
  );
};

export default NotionAIClone;