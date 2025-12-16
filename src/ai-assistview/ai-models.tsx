import * as React from 'react';
import './ai-models.css';
import { SampleBase } from '../common/sample-base';
import { AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { marked } from 'marked';

import {
  getGeminiAIAssit,
  getdeepSeekAIAssit,
  getAzureOpenAIAssist
} from './ai-services';

type ModelId = 'gemini' | 'deepseek' | 'openai';
interface ConversationItem { id: string; text: string; }

export default class AIAssistModels extends SampleBase<{}, {}> {
  private aiAssist!: AIAssistViewComponent | null;
  private sidebar!: SidebarComponent | null;
  private toast!: ToastComponent | null;
  private list!: ListViewComponent | null;

  private isMobile = false;
  private enableDock = false;
  private dockSize = '50px';
  private enableGestures = false;
  private sidebarType: 'Push' | 'Over' = 'Push';
  private showBackdrop = false;
  private closeOnDocumentClick = false;

  private stopStreaming = false;
  private showHeader = false;
  private suggestions: string[] = [
    'How can AI help me plan my week?',
    'What are good habits for continuous learning?'
  ];

  private listData: ConversationItem[] = [];
  // CHANGED: make nullable so "New Thread" truly clears it
  private selectedConvId: string | null = null;
  private selectedModel: ModelId = 'gemini';

  // API configuration (kept as fields)
  private geminiApiKey = '';
  private geminiModel = '';
  private deepseekApiKey = '';
  attachmentSettings = {
      saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
      removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };
  footerToolbarSettings = {
    toolbarPosition: 'Bottom'
  }
  // Handles initial setup once the component mounts.
  componentDidMount(): void {
    this.ensureStore();
    this.refreshConversationList();

    this.applySidebarConfig();
    window.addEventListener('resize', this.onResize);

    if (this.listData.length === 0) {
      this.loadNewAIAssist();
    } else if (!this.selectedConvId && this.listData[0]) {
      this.onItemSelect(this.listData[0]);
    }
  }

  // Cleans up listeners and shows the informational toast on unmount.
  componentWillUnmount(): void {
    window.removeEventListener('resize', this.onResize);
  }

  // Responds to window resize events by reapplying sidebar configuration.
  private onResize = (): void => {
    this.applySidebarConfig();
  };

  // Ensures the conversation storage structure exists in localStorage.
  private ensureStore(): void {
    if (!localStorage.getItem('aiassist-model')) {
      localStorage.setItem('aiassist-model', JSON.stringify({}));
    }
  }

  // Retrieves and formats conversation summaries for the sidebar list.
  private getLeftPaneData(): ConversationItem[] {
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    return Object.keys(appData)
      .map((k) => ({ id: k, num: parseInt(k, 10) }))
      .filter((x) => !isNaN(x.num))
      .sort((a, b) => b.num - a.num)
      .map((x) => {
        const conv = appData[x.id];
        const name = conv?.name ? String(conv.name).split('\n')[0] : 'Untitled Conversation';
        return { id: x.id, text: name };
      });
  }

  // Updates the ListView with the latest conversation data.
  private refreshConversationList(): void {
    this.listData = this.getLeftPaneData();
    if (this.list) {
      this.list.dataSource = this.listData as any;
      this.list.dataBind();
    }
  }

  // Generates the next sequential conversation ID.
  private getNextConvId(): string {
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    const ids = Object.keys(appData).map((k) => parseInt(k, 10)).filter((v) => !isNaN(v));
    const maxId = ids.length ? Math.max(...ids) : 0;
    return String(maxId + 1);
  }

  // Creates a new conversation entry in storage and returns its ID.
  private createNewConversation(): string {
    const newId = this.getNextConvId();
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    appData[newId] = {
      name: 'New Conversation',
      prompts: [],
      promptSuggestions: [...this.suggestions]
    };
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
    this.refreshConversationList();
    return newId;
  }

  // Sets a human-readable conversation name based on the first prompt.
  private updateConversationName(prompt: string, convId?: string): void {
    const id = convId ?? this.selectedConvId ?? undefined;
    if (!id) return;

    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    const conv = appData[id];
    if (conv && (conv.name === 'New Conversation' || !conv.name)) {
      conv.name = (prompt.slice(0, 40).trim() || 'Untitled Conversation');
      localStorage.setItem('aiassist-model', JSON.stringify(appData));
      this.refreshConversationList();
    }
  }

  // Persists the current prompt/response history for the active conversation.
  private checkAndUpdateLocalStorage(): void {
    if (!this.selectedConvId) return;
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    const prompts = this.aiAssist?.prompts || [];
    if (!appData[this.selectedConvId]) return;
    appData[this.selectedConvId].prompts = prompts.map((p: any) => ({
      prompt: p.prompt || '',
      response: p.response || ''
    }));
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
  }

  // Loads stored prompts and suggestions into the Assist View.
  private updateAIAssistViewData(id?: string): void {
    if (!this.aiAssist) return;
    this.aiAssist.prompts = [];
    this.aiAssist.promptSuggestions = this.suggestions;

    if (id) {
      const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
      const conv = appData[id];
      if (conv) {
        this.aiAssist.prompts = conv.prompts || [];
        this.aiAssist.promptSuggestions = conv.promptSuggestions || this.suggestions;
      }
    }
    this.aiAssist.dataBind?.();
  }

  // Adjusts the sidebar behavior depending on viewport width.
  private applySidebarConfig(): void {
    const mobile = window.innerWidth <= 680;
    this.isMobile = mobile;

    if (this.sidebar) {
      const s = this.sidebar;
      s.enableDock = false;

      if (mobile) {
        s.type = 'Over';
        s.showBackdrop = true;
        s.closeOnDocumentClick = true;
        s.hide();
      } else {
        s.type = 'Push';
        s.showBackdrop = false;
        s.closeOnDocumentClick = false;
        s.show();
      }
      s.dataBind();
    }
  }

  // Toggles the sidebar open/close state.
  private toggleSidebar = (): void => {
    this.sidebar?.toggle();
  };

  // Closes the sidebar explicitly.
  private closeSidebar = (): void => {
    this.sidebar?.hide();
  };

  // Activates a conversation and loads its prompts in the Assist View.
  private onItemSelect = (item: ConversationItem): void => {
    this.selectedConvId = item.id;
    this.updateAIAssistViewData(item.id);
    if (this.isMobile && (this.sidebar as any)?.isOpen) {
      this.sidebar?.toggle();
    }
  };

  // Deletes a conversation and manages the fallback selection.
  private deleteConversation = (convId: string, e: React.MouseEvent): void => {
    e.stopPropagation();
    e.preventDefault();

    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    delete appData[convId];
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
    this.refreshConversationList();

    if (this.selectedConvId === convId) {
      const next = this.getLeftPaneData();
      if (next.length > 0) this.onItemSelect(next[0]);
      else this.loadNewAIAssist();
    }
  };

  // Clears the Assist View to start a brand-new conversation.
  private loadNewAIAssist = (): void => {
    this.selectedConvId = null;
    if (this.aiAssist) {
      this.aiAssist.prompts = [];
      this.aiAssist.promptSuggestions = this.suggestions;
      this.aiAssist.dataBind?.();
    }
  };

  // Handles model selection changes and shows contextual toast feedback.
  private onModelChange = (args: any): void => {
    const value = (args?.value as ModelId) || 'openai';
    this.selectedModel = value;

    const models = [
      { id: 'gemini', name: 'Gemini 2.5 Flash' },
      { id: 'deepseek', name: 'DeepSeek-R1' },
      { id: 'openai', name: 'GPT-4o-mini(Azure)' }
    ];
    const modelName = models.find(m => m.id === value)?.name || 'the selected model';

    this.toast?.show({
      content: `<div class="toast-content"><span class="e-icons e-magic-wand"> </span> <span>You are using <b>${modelName}</b> with standard access</span></div>`
    });
  };

  // Sets the stop flag when the user requests to halt streaming.
  private stopRespondingClick = (): void => {
    this.stopStreaming = true;
  };

  // Streams AI responses incrementally to simulate live typing.
  private async streamAIResponse(fullResponse: string): Promise<string> {
    let streamed = '';
    if (fullResponse && this.aiAssist) {
      let i = 0;
      while (i < fullResponse.length && !this.stopStreaming) {
        streamed += fullResponse[i++];
        this.aiAssist.addPromptResponse(marked.parse(streamed), false);
        this.aiAssist.scrollToBottom();
        await new Promise((res) => setTimeout(res, 10));
      }
    }
    return streamed;
  }

  private promptRequest = async (args: { prompt: string }) => {
    if (!args.prompt || !args.prompt.trim()) return;

    let convId = this.selectedConvId;
    if (!convId) {
      convId = this.createNewConversation();
      this.selectedConvId = convId;
    }

    this.updateConversationName(args.prompt, convId);

    if (this.selectedModel === 'gemini') {
      await this.handleGeminiRequest(args);
    } else if (this.selectedModel === 'deepseek') {
      await this.handleDeepSeekRequest(args);
    } else {
      await this.handleOpenAIRequest(args);
    }
  };

  private async handleGeminiRequest(args: { prompt: string }): Promise<void> {
    this.stopStreaming = false;
    try {
      const fullResponse = await getGeminiAIAssit(this.geminiApiKey, this.geminiModel, args.prompt);
      const streamed = await this.streamAIResponse(fullResponse);
      if (!this.stopStreaming && this.aiAssist) {
        this.aiAssist.addPromptResponse(marked.parse(streamed), true);
        this.checkAndUpdateLocalStorage();
      }
    } catch {
      const msg = '⚠️ Something went wrong while connecting to the Gemini service. Please check your API key/model.';
      this.aiAssist?.addPromptResponse(marked.parse(msg), true);
      this.checkAndUpdateLocalStorage();
    }
  }

  // Handles DeepSeek API interaction and updates the Assist View with responses.
  private async handleDeepSeekRequest(args: PromptRequestEventArgs): Promise<void> {
    this.stopStreaming = false; // FIX: use field, not setState
    try {
      const fullResponse = await getdeepSeekAIAssit(this.deepseekApiKey, args.prompt!);
      const streamed = await this.streamAIResponse(fullResponse);
      if (!this.stopStreaming && this.aiAssist) {
        this.aiAssist.addPromptResponse(marked.parse(streamed), true);
        this.checkAndUpdateLocalStorage();
      }
    } catch {
      const msg = '⚠️ Something went wrong while connecting to the DeepSeek service. Please check your API key.';
      this.aiAssist.addPromptResponse(marked.parse(msg), true);
      this.checkAndUpdateLocalStorage();
    }
  }

  private async handleOpenAIRequest(args: { prompt: string }): Promise<void> {
    this.stopStreaming = false;
    try {
      const fullResponse = await getAzureOpenAIAssist({
        messages: args.prompt
      });
      const streamed = await this.streamAIResponse(fullResponse);
      if (!this.stopStreaming && this.aiAssist) {
        this.aiAssist.addPromptResponse(marked.parse(streamed), true);
        this.checkAndUpdateLocalStorage();
      }
    } catch {
      const msg =
        '⚠️ Something went wrong while connecting to the OpenAI service. Please check your Azure endpoint, key, deployment, and API version.';
      this.aiAssist?.addPromptResponse(marked.parse(msg), true);
      this.checkAndUpdateLocalStorage();
    }
  }

  // Renders the banner content displayed at the top of the Assist View.
  private bannerTemplate = (): React.ReactNode => (
    <div className="banner-content e-no-content">
      <div className="e-icons e-assistview-icon" />
      <h3 className="ai-assist-banner-subtitle">How can I help you today?</h3>
    </div>
  );

  // Renders each conversation item in the sidebar list with delete support.
  private listItemTemplate = (data: ConversationItem): React.ReactNode => (
    <div
      className="conversation-item"
      onClick={() => this.onItemSelect({ id: data.id, text: data.text })}
      title={data.text || 'Untitled Conversation'}
    >
      <div className="conversation-name">{data.text || 'Untitled Conversation'}</div>
      <span
        className="delete-icon e-icons e-trash"
        title="Delete Conversation"
        onClick={(e) => this.deleteConversation(data.id, e as any)}
      />
    </div>
  );

  // Renders the main layout including the Assist View, sidebar, and toasts.
  render(): React.ReactNode {
    const models = [
      { id: 'gemini', name: 'Gemini 2.5 Flash' },
      { id: 'deepseek', name: 'DeepSeek-R1' },
      { id: 'openai', name: 'GPT-4o-mini(Azure)' }
    ];

    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="ai-models">
            <AIAssistViewComponent
              id="aiAssistView"
              ref={(inst) => (this.aiAssist = inst)}
              bannerTemplate={this.bannerTemplate}
              promptSuggestions={this.suggestions}
              promptRequest={this.promptRequest}
              showHeader={this.showHeader}
              stopRespondingClick={this.stopRespondingClick}
              width="auto" enableAttachments={true}  attachmentSettings={this.attachmentSettings} footerToolbarSettings={this.footerToolbarSettings}
            >
              <div className="ai-assist-header">
                <ButtonComponent id="close" iconCss="e-icons e-menu" onClick={this.toggleSidebar} />
                <DropDownListComponent
                  id="ai-model-dropdown"
                  dataSource={models}
                  fields={{ text: 'name', value: 'id' }}
                  value={this.selectedModel}
                  change={this.onModelChange}
                  popupHeight="200px"
                />
              </div>
            </AIAssistViewComponent>
          </div>

          <SidebarComponent
            id="assistantSidebar"
            ref={(inst) => (this.sidebar = inst)}
            target=".ai-models"
            width="250px"
            position="Left"
            enableDock={this.enableDock}
            dockSize={this.dockSize}
            enableGestures={this.enableGestures}
            type={this.sidebarType}
            showBackdrop={this.showBackdrop}
            closeOnDocumentClick={this.closeOnDocumentClick}
          >
            <div className="assistant-sidebar-header">
              <div className="header-left">
                <span id="icon-assist" className="header-icon e-icons e-assistview-icon" />
                <span className="header-title">AI Assist</span>
              </div>
              <ButtonComponent id="close" cssClass="e-flat" iconCss="e-icons e-close" onClick={this.closeSidebar} />
            </div>

            <div className="assistant-sidebar-content">
              <ButtonComponent cssClass="new-thread-btn" iconCss="e-icons e-plus" onClick={this.loadNewAIAssist}>
                New Thread
              </ButtonComponent>

              <ListViewComponent
                id="conversation-list"
                ref={(inst) => (this.list = inst)}
                dataSource={this.listData as any}
                template={this.listItemTemplate as any}
              />
            </div>
          </SidebarComponent>

          <ToastComponent
            ref={(inst) => (this.toast = inst)}
            position={{ X: 'right', Y: 'Top' }}
            target=".e-views"
            timeOut={1500}
            showCloseButton={true}
          />
        </div>

        <div id="action-description">
          <p>
            This example demonstrates the <strong>AI AssistView</strong> designed to integrate multiple AI models:
            <code>Azure OpenAI</code>, <code>Gemini</code> and <code>DeepSeek</code>.
          </p>
        </div>

        <div id="description">
          <p>
            In this example, the <strong>AI AssistView</strong> with a responsive sidebar, AI models dropdown and Markdown streaming to deliver an AI-powered chat interface.
          </p>
          <ul>
            <li>Switch between providers (Azure OpenAI, Gemini and DeepSeek) via a dropdown menu, with toast notifications confirming selection.</li>
            <li>Enter your API key(s) to enable live, dynamic responses from the selected provider.</li>
            <li>Stream AI responses with auto-scroll and rich Markdown rendering using <code>marked</code>.</li>
            <li>Create, select, and delete conversations with conversations stored in the localStorage.</li>
          </ul>
        </div>
      </div>
    );
  }
}