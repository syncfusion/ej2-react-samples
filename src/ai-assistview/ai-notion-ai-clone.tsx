import * as React from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel, FooterToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { Switch, ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { SampleBase } from '../common/sample-base';
import { getAIResponse } from '../common/ai-service';
import * as data from './promptResponseData.json';
import './ai-notion-ai-clone.css';

interface ChatSession {
  id: string;
  title: string;
  prompts: any[];
}

export class NotionAIClone extends SampleBase<{}, {}> {
  notionSuggestions: string[] = data["notionSuggestions"];
  iconMapByIndex: { [key: number]: string } = data["iconMapByIndex"];
  modelIcons: { [key: string]: string } = data["modelIcons"];

  assistInstance: AIAssistViewComponent;
  dialogInstance: DialogComponent;
  sidebarInstance: SidebarComponent;
  toastInstance: ToastComponent;
  fabInstance: FabComponent;

  // Vanilla Syncfusion dropdowns (initialized imperatively in `created`, like the TS version)
  private modelDropdown: DropDownButton;
  private settingsDropdown: DropDownButton;
  private screenDropdown: DropDownButton;
  private historyDropdown: DropDownButton;

  private sessionChats: ChatSession[] = [];
  private activeSessionId: string | null = null;
  private isFirstSessionAdded: boolean = false;
  private webIconCheckedState: boolean = true;
  private editIconCheckedState: boolean = true;
  private currentMode: string = 'Sidebar';
  private lastActiveMode: string = 'Sidebar'; // tracks mode before hide, used by FAB to restore
  private abortController: AbortController | undefined;

  componentDidMount(): void {
    // FAB is hidden on mount — only shown when assistview is hidden
    if (this.fabInstance) {
      this.fabInstance.element.style.display = 'none';
      this.fabInstance.element.onclick = () => {
        this.toggleBackgroundState(true);
        const modeToRestore = this.lastActiveMode || 'Sidebar';
        // Clear currentMode so moveAssistview's guard doesn't block the restore
        this.currentMode = '';
        this.moveAssistview(modeToRestore);
        this.fabInstance.element.style.display = 'none';
      };
    }
  }

  // Called by AIAssistViewComponent `created` event — mirrors TS `created()`
  private onAssistViewCreated = (): void => {
    const modelItems = [
      { text: 'Auto',           iconCss: 'e-icons e-assistview-icon' },
      { text: 'Sonnet 4.6',     iconCss: 'model-icon model-sonet' },
      { text: 'Opus 4.6',       iconCss: 'model-icon model-opus' },
      { text: 'Gemini 3.1 Pro', iconCss: 'model-icon model-gemini' },
      { text: 'GPT 5.2',        iconCss: 'model-icon model-gpt' }
    ];
    let currentModel = 'Auto';

    this.modelDropdown = new DropDownButton({
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
        if (currentModel === args.item.text) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        currentModel = args.item.text;
        this.modelDropdown.content = args.item.text;
        this.updateModelIcon(args.item.text);
      }
    });
    this.modelDropdown.appendTo('#custombtn');

    // Settings dropdown
    const settingsItems = [
      { text: 'Can make changes', iconCss: 'e-icons e-edit',         id: 'edit' },
      { text: 'Web access',       iconCss: 'e-icons e-time-zone',    id: 'web-access' },
      { text: 'Help Center',      iconCss: 'e-icons e-reading-view', id: 'help-center' }
    ];
    this.settingsDropdown = new DropDownButton({
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
      open: this.onSettingsDropdownCreated
    });
    this.settingsDropdown.appendTo('#settings-icon');

    // Screen mode dropdown
    const screenTypes = [
      { text: 'Sidebar' },
      { text: 'Floating' },
      { separator: true },
      { text: 'Full screen' }
    ];
    this.screenDropdown = new DropDownButton({
      items: screenTypes,
      iconCss: 'e-icons e-resize',
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (this.currentMode === args.item.text) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        this.moveAssistview(args.item.text);
      }
    });
    this.screenDropdown.appendTo('#screen-resizer');

    // History dropdown
    this.historyDropdown = new DropDownButton({
      items: [{ text: 'No Chat History' }],
      iconCss: 'e-icons e-history',
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (this.activeSessionId === args.item.id) {
          args.element.classList.add('e-selected');
        }
      },
      select: (args: MenuEventArgs) => {
        if (args.item.id) {
          this.loadSession(args.item.id);
        }
      }
    });
    this.historyDropdown.appendTo('#history-icon');

    // Initialize sidebar and move wrapper to it (matching JS behavior)
    if (this.sidebarInstance) {
      this.sidebarInstance.show();
      const wrapper = document.getElementById('assistviewWrapper');
      if (wrapper) {
        this.sidebarInstance.element.appendChild(wrapper);
      }
      this.toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
    }
  };

  private onSettingsDropdownCreated = (): void => {
    const settingsItems = [
      { text: 'Can make changes', id: 'edit' },
      { text: 'Web access',       id: 'web-access' },
      { text: 'Help Center',      id: 'help-center' }
    ];
    setTimeout(()=>{
      settingsItems.forEach((item) => {
      if (item.text === 'Help Center') return;
      const isChecked = item.id === 'edit' ? this.editIconCheckedState : this.webIconCheckedState;
      const switchElem = document.getElementById(`settings-switch-${item.id}`);
      if (!switchElem) return;
      new Switch({
        checked: isChecked,
        change: (args: ChangeEventArgs) => this.toggleSwitch(args, item.text)
      }).appendTo(switchElem);
    });
    },0);
  };

  private onPromptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    if (this.assistInstance) this.assistInstance.promptSuggestions = [];
    this.abortController = new AbortController();
    args.prompt = 'Based on the following notes content:\n\n' + (document.querySelector('.notes-content') as HTMLElement)?.textContent + '\n\n---\n\nUser prompt: ' + args.prompt;
    if (this.assistInstance) {
      this.assistInstance.addPromptResponse(await getAIResponse(args as any, this.abortController));
      if (!this.isFirstSessionAdded && !this.activeSessionId) {
        this.createNewSession(true);
        this.isFirstSessionAdded = true;
      }
      this.assistInstance.promptSuggestions = [];
    }
  };

  private stopResponse = () => {
      if (this.abortController) {
      this.abortController.abort();
      }
  }

  private toolbarItemClicked = (args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-edit-notes') {
      this.createNewSession();
      if (this.assistInstance) {
        this.assistInstance.promptSuggestions = this.notionSuggestions;
      }
    } else if (
      args.item.iconCss === 'e-icons e-horizontal-line' ||
      args.item.iconCss === 'e-icons e-chevron-right-double'
    ) {
      // Move wrapper back to dialogElem before hiding
      const dialogElem = document.querySelector('#dialogElem');
      const wrapper = document.getElementById('assistviewWrapper');
      if (dialogElem && wrapper) {
        dialogElem.appendChild(wrapper);
      }
      if (this.sidebarInstance) this.sidebarInstance.hide();
      if (this.dialogInstance) this.dialogInstance.hide();
      this.toggleBackgroundState(true);
      // Preserve lastActiveMode so FAB can restore to the correct mode.
      // Reset currentMode to '' so moveAssistview's guard won't block re-entry on FAB click.
      this.lastActiveMode = this.currentMode || 'Sidebar';
      this.currentMode = '';
      if (this.fabInstance) this.fabInstance.element.style.display = '';
    } else if (args.item.iconCss === 'e-icons e-export') {
      if (this.toastInstance) this.toastInstance.show();
    }
  };

  private footerToolbarItemClicked = (args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-edit' || args.item.iconCss === 'e-icons e-time-zone') {
      if (this.settingsDropdown) this.settingsDropdown.toggle();
    }
  };

  private moveAssistview = (mode: string): void => {
    if (!mode || this.currentMode === mode) return;
    this.lastActiveMode = mode;
    this.currentMode = mode;
    const wrapper = document.getElementById('assistviewWrapper');
    const fs = document.getElementById('fullscreenContainer');
    if (this.dialogInstance) this.dialogInstance.hide();
    if (this.sidebarInstance) this.sidebarInstance.hide();
    if (fs) fs.style.display = 'none';

    switch (mode) {
      case 'Sidebar':
        if (this.sidebarInstance) this.sidebarInstance.show();
        this.toggleBackgroundState(true);
        if (this.sidebarInstance && wrapper) this.sidebarInstance.element.appendChild(wrapper);
        this.toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
        break;
      case 'Floating':
        if (this.dialogInstance) this.dialogInstance.show();
        const dialogElem = document.querySelector('#dialogElem');
        if (dialogElem && wrapper) dialogElem.appendChild(wrapper);
        this.toggleBackgroundState(true);
        this.toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
        break;
      case 'Full screen':
        if (fs && wrapper) {
          fs.style.display = 'block';
          fs.appendChild(wrapper);
        }
        this.toggleBackgroundState(false);
        this.toggleIconClass('e-chevron-right-double', 'e-horizontal-line');
        break;
    }
  };

  private toggleIconClass = (selectorIconClass: string, replaceIconClass: string): void => {
    const icon = (this.assistInstance as any).toolbarHeader?.querySelector(`.${selectorIconClass}`);
    if (icon) {
      icon.className = `e-icons ${replaceIconClass}`;
    }
  };

  private toggleBackgroundState = (show: boolean): void => {
    const notionContainer = document.querySelector('.notes-app-container');
    if (notionContainer) {
      show ? notionContainer.classList.remove('e-hidden') : notionContainer.classList.add('e-hidden');
    }
  };

  private toggleSwitch = (args: ChangeEventArgs, text: string): void => {
    const visibility = !args.checked;
    if (text === 'Can make changes') {
      this.editIconCheckedState = !visibility;
      const editIcon = ((this.assistInstance as any).footerToolbarEle as any)?.element?.querySelector('.e-edit')?.closest('.e-toolbar-item');
      if (editIcon) visibility ? editIcon.classList.remove('e-hidden') : editIcon.classList.add('e-hidden');
    } else if (text === 'Web access') {
      this.webIconCheckedState = !visibility;
      const webIcon = ((this.assistInstance as any).footerToolbarEle as any)?.element?.querySelector('.e-time-zone')?.closest('.e-toolbar-item');
      if (webIcon) visibility ? webIcon.classList.remove('e-hidden') : webIcon.classList.add('e-hidden');
    }
  };

  private suggestionItemContent = (ctx: any): JSX.Element => {
    const iconClass = this.iconMapByIndex[ctx.index] || '';
    return (
      <div className="suggestion-item active">
        <span className={`${iconClass} suggestion-icon`}></span>
        <span className="assist-suggestion-content">{ctx.promptSuggestion}</span>
      </div>
    );
  };

  private updateModelIcon = (modelName: string): void => {
    if (this.modelDropdown) {
      this.modelDropdown.iconCss = `model-icon ${this.modelIcons[modelName]}`;
      this.modelDropdown.dataBind();
    }
  };

  private persistActiveSession = (): void => {
    if (!this.activeSessionId || !this.assistInstance) return;
    const session = this.sessionChats.find((s) => s.id === this.activeSessionId);
    if (session) session.prompts = this.assistInstance.prompts;
  };

  private createNewSession = (isAuto: boolean = false): void => {
    const prompts = this.assistInstance?.prompts;
    if (!prompts || prompts.length === 0) {
      this.activeSessionId = null;
      if (this.assistInstance) {
        this.assistInstance.prompts = [];
        this.assistInstance.dataBind();
      }
      return;
    }
    if (this.activeSessionId) {
      this.persistActiveSession();
    } else {
      const session: ChatSession = {
        id: String(Date.now()),
        title: prompts[0] ? prompts[0].prompt : 'New Chat',
        prompts
      };
      this.sessionChats.push(session);
      this.activeSessionId = session.id;
      this.updateHistoryDropdown();
    }
    if (!isAuto) {
      this.activeSessionId = null;
      if (this.assistInstance) {
        this.assistInstance.prompts = [];
        this.assistInstance.dataBind();
      }
    }
  };

  private updateHistoryDropdown = (): void => {
    const items = this.sessionChats.map((session) => ({
      text: session.title.length > 30 ? session.title.substring(0, 30) + '...' : session.title,
      id: session.id
    }));
    if (this.historyDropdown) {
      this.historyDropdown.items = items.length ? items : [{ text: 'No Chat History' }];
      this.historyDropdown.dataBind();
    }
  };

  private ensureCurrentChatIsSaved = (): void => {
    const prompts = this.assistInstance?.prompts;
    if (!prompts || prompts.length === 0) return;
    if (this.activeSessionId) {
      this.persistActiveSession();
      return;
    }
    const session: ChatSession = {
      id: String(Date.now()),
      title: prompts[0] ? prompts[0].prompt : 'New Chat',
      prompts
    };
    this.sessionChats.push(session);
    this.updateHistoryDropdown();
  };

  private loadSession = (sessionId: string): void => {
    if (sessionId === this.activeSessionId) return;
    this.ensureCurrentChatIsSaved();
    const session = this.sessionChats.find((s) => s.id === sessionId);
    if (!session || !this.assistInstance) return;
    this.activeSessionId = sessionId;
    this.assistInstance.prompts = session.prompts;
    this.assistInstance.promptSuggestions = [];
    this.assistInstance.dataBind();
  };

  bannerTemplate: string = `<div class="banner-content">
    <div class="e-icons e-assistview-icon"></div>
    <h3>How can I help you today ?</h3>
  </div>`;

  assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [
      { iconCss: 'e-icons e-export',         align: 'Right', tooltip: 'Share Chat' },
      { align: 'Right', tooltip: 'Chat History',     template: '<button id="history-icon"></button>' },
      { iconCss: 'e-icons e-edit-notes',      align: 'Right', tooltip: 'Start New chat' },
      { align: 'Right', tooltip: 'Switch Chat Mode', template: '<button id="screen-resizer"></button>' },
      { iconCss: 'e-icons e-horizontal-line', align: 'Right', tooltip: 'Hide Chat' }
    ],
    itemClicked: this.toolbarItemClicked
  };

  footerToolbarSettings: FooterToolbarSettingsModel = {
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
    itemClick: this.footerToolbarItemClicked
  };

  responseToolbarSettings: any = {
    items: [
      { iconCss: 'e-icons e-assist-copy' },
      { iconCss: 'e-icons e-assist-like' },
      { iconCss: 'e-icons e-assist-dislike' },
      { iconCss: 'e-icons e-assist-audio' }
    ]
  };

  attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  speechToTextSettings = { enable: true };

  render() {
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

          {/* Dialog: wraps assistviewWrapper initially (Floating mode default) */}
          <DialogComponent
            id="dialogElem"
            target=".notes-page"
            position={{ X: 'right', Y: 0 }}
            animationSettings={{ effect: 'FadeZoom' }}
            width="500px"
            visible={false}
            cssClass="custom-dialog"
            ref={(dialog) => (this.dialogInstance = dialog)}
          >
            <div id="assistviewWrapper" className="notion-aiassistview">
              <AIAssistViewComponent
                id="aiAssistView"
                promptSuggestions={this.notionSuggestions}
                promptSuggestionItemTemplate={this.suggestionItemContent}
                promptRequest={this.onPromptRequest}
                stopRespondingClick={this.stopResponse}
                bannerTemplate={this.bannerTemplate}
                toolbarSettings={this.assistViewToolbarSettings}
                footerToolbarSettings={this.footerToolbarSettings}
                responseToolbarSettings={this.responseToolbarSettings}
                enableAttachments={true}
                enableStreaming={true}
                attachmentSettings={this.attachmentSettings}
                speechToTextSettings={this.speechToTextSettings}
                created={this.onAssistViewCreated}
                ref={(assist) => (this.assistInstance = assist)}
              />
            </div>
          </DialogComponent>

          {/* Sidebar: empty on mount; wrapper is moved here by moveAssistview('Sidebar') */}
          <SidebarComponent
            id="notionSidebar"
            target=".notes-page"
            width="400px"
            position="Right"
            animate={false}
            isOpen={false}
            ref={(sidebar) => (this.sidebarInstance = sidebar)}
          />

          {/* Fullscreen container: wrapper is moved here by moveAssistview('Full screen') */}
          <div id="fullscreenContainer"></div>

          <FabComponent
            id="fabElem"
            iconCss="e-icons e-magic-wand"
            target=".notes-page"
            ref={(fab) => (this.fabInstance = fab)}
          />
          <div id="toastTarget"></div>

          <ToastComponent
            content="Share chat option is clicked !"
            position={{ X: 'Right', Y: 'Top' }}
            showCloseButton={true}
            ref={(toast) => (this.toastInstance = toast)}
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
  }
}