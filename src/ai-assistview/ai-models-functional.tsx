import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import './ai-models.css';

import { SampleBase, updateSampleSection } from '../common/sample-base';
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

const AIAssistModels = () => {
  useEffect(() => {
      updateSampleSection();
  }, []);
          
  const aiAssistRef = useRef<AIAssistViewComponent | null>(null);
  const sidebarRef = useRef<SidebarComponent | null>(null);
  const toastRef = useRef<ToastComponent | null>(null);
  const listRef = useRef<ListViewComponent | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [enableDock, setEnableDock] = useState(false);
  const [dockSize] = useState('50px');
  const [enableGestures] = useState(false);
  const [sidebarType, setSidebarType] = useState<'Push' | 'Over'>('Push');
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [closeOnDocumentClick, setCloseOnDocumentClick] = useState(false);

  const [stopStreaming, setStopStreaming] = useState(false);
  const [showHeader] = useState(false);
  const [suggestions] = useState<string[]>([
    'How can AI help me plan my week?',
    'What are good habits for continuous learning?'
  ]);
  const [listData, setListData] = useState<ConversationItem[]>([]);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelId>('gemini');
  const selectedConvIdRef = useRef<string | null>(null);

  // API config
  const [geminiApiKey] = useState('');
  const [geminiModel] = useState('');
  const [deepseekApiKey] = useState<string>('');

  const attachmentSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };

  const footerToolbarSettings = {
    toolbarPosition: 'Bottom'
  }
  // Ensures the base object for storing conversations exists in localStorage.
  const ensureStore = () => {
    if (!localStorage.getItem('aiassist-model')) {
      localStorage.setItem('aiassist-model', JSON.stringify({}));
    }
  };

  // Retrieves and formats conversation metadata for sidebar listing.
  const getLeftPaneData = (): ConversationItem[] => {
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
  };

  useEffect(() => {
  selectedConvIdRef.current = selectedConvId;
}, [selectedConvId]);

  // Refreshes the conversation list UI with the latest localStorage data.
  const refreshConversationList = () => {
    const next = getLeftPaneData();
    setListData(next);
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.dataSource = next as any;
        listRef.current.dataBind();
      }
    }, 0)
  };

  // Calculates the next incrementing conversation identifier.
  const getNextConvId = (): string => {
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    const ids = Object.keys(appData).map((k) => parseInt(k, 10)).filter((v) => !isNaN(v));
    const maxId = ids.length ? Math.max(...ids) : 0;
    return String(maxId + 1);
  };

  // Creates a new conversation entry in localStorage and returns its ID.
  const createNewConversation = (): string => {
    const newId = getNextConvId();
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    appData[newId] = {
      name: 'New Conversation',
      prompts: [],
      promptSuggestions: [...suggestions]
    };
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
    refreshConversationList();
    return newId;
  };

  // Updates the display name of a conversation once the first prompt is known.
  const updateConversationName = (prompt: string, convId?: string) => {
    const id = convId ?? selectedConvId?? undefined;
    if (!id) return;

    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    const conv = appData[id];
    if (conv && (conv.name === 'New Conversation' || !conv.name)) {
      conv.name = (prompt.slice(0, 40).trim() || 'Untitled Conversation');
      localStorage.setItem('aiassist-model', JSON.stringify(appData));
      refreshConversationList();
    }
  };

  // Saves the current prompt/response history into localStorage for persistence.
  const checkAndUpdateLocalStorage = () => {
    if (!selectedConvId) return;
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    const prompts = aiAssistRef.current?.prompts || [];
    if (!appData[selectedConvId]) return;
    appData[selectedConvId].prompts = prompts.map((p: any) => ({
      prompt: p.prompt || '',
      response: p.response || ''
    }));
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
  };

  // Loads stored prompts and suggestions into the Assist View for a conversation.
  const updateAIAssistViewData = (id?: string) => {
    if (!aiAssistRef.current) return;
    aiAssistRef.current.prompts = [];
    aiAssistRef.current.promptSuggestions = suggestions;
    if (id) {
      const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
      const conv = appData[id];
      if (conv) {
        aiAssistRef.current.prompts = conv.prompts || [];
        aiAssistRef.current.promptSuggestions = conv.promptSuggestions || suggestions;
      }
    }
    aiAssistRef.current.dataBind?.();
  };

  // Configures the sidebar layout to be responsive across device sizes.
  const applySidebarConfig = () => {
    const mobile = window.innerWidth <= 980;
    setIsMobile(mobile);

    if (sidebarRef.current) {
      const s = sidebarRef.current;
      s.enableDock = false;

      if (mobile) {
        setSidebarType('Over');
        setShowBackdrop(true);
        setCloseOnDocumentClick(true);
        s.type = 'Over';
        s.showBackdrop = true;
        s.closeOnDocumentClick = true;
        s.hide();
      } else {
        setSidebarType('Push');
        setShowBackdrop(false);
        setCloseOnDocumentClick(false);
        s.type = 'Push';
        s.showBackdrop = false;
        s.closeOnDocumentClick = false;
        s.show();
      }
      s.dataBind();
    }
  };

  useEffect(() => {
    ensureStore();
    refreshConversationList();

    applySidebarConfig();
    const onResize = () => applySidebarConfig();
    window.addEventListener('resize', onResize);

    if (listData.length === 0) {
      loadNewAIAssist();
    } else if (!selectedConvId && listData[0]) {
      onItemSelect(listData[0]);
    }
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Toggles the visibility of the sidebar in response to user actions.
  const toggleSidebar = () => {
    sidebarRef.current?.toggle();
  };

  // Hides the sidebar when the close button is triggered.
  const closeSidebar = () => {
    sidebarRef.current?.hide();
  };

  // Handles selection of a conversation from the left pane list.
  const onItemSelect = (item: ConversationItem) => {
    setSelectedConvId(item.id);
    updateAIAssistViewData(item.id);
    if (isMobile && (sidebarRef.current as any)?.isOpen) {
      sidebarRef.current?.toggle();
    }
  };

  // Deletes a conversation and manages active selection fallback logic.
  const deleteConversation = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const appData = JSON.parse(localStorage.getItem('aiassist-model') || '{}');
    delete appData[convId];
    localStorage.setItem('aiassist-model', JSON.stringify(appData));
    refreshConversationList();

    if (selectedConvId === convId) {
      const next = getLeftPaneData();
      if (next.length > 0) onItemSelect(next[0]);
      else loadNewAIAssist();
    }
  };

  // Clears the active conversation data and resets the Assist View.
  const loadNewAIAssist = () => {
    setSelectedConvId(null);
    selectedConvIdRef.current = null;
    if (aiAssistRef.current) {
      aiAssistRef.current.prompts = [];
      aiAssistRef.current.promptSuggestions = suggestions;
      aiAssistRef.current.dataBind?.();
    }
  };

  // Responds to AI model selection changes and displays contextual feedback.
  const onModelChange = (args: any) => {
    const value = (args?.value as ModelId) || 'openai';
    setSelectedModel(value);
    const models = [
      { id: 'gemini', name: 'Gemini 2.5 Flash' },
      { id: 'deepseek', name: 'DeepSeek-R1' },
      { id: 'openai', name: 'GPT-4o-mini(Azure)' }
    ];
    const modelName = models.find((m) => m.id === value)?.name || 'the selected model';
    toastRef.current?.show({
      content: `<div class="toast-content"><span class="e-icons e-magic-wand"> </span> <span>You are using <b>${modelName}</b> with standard access</span></div>`
    });
  };

  // Flags streaming to stop when the user clicks the stop button.
  const stopRespondingClick = () => {
    setStopStreaming(true);
  };

  // Streams AI response text character-by-character to emulate live typing.
  const streamAIResponse = async (fullResponse: string) => {
    let streamed = '';
    if (fullResponse && aiAssistRef.current) {
      let i = 0;
      while (i < fullResponse.length && !stopStreaming) {
        streamed += fullResponse[i++];
        aiAssistRef.current.addPromptResponse(marked.parse(streamed), false);
        aiAssistRef.current.scrollToBottom();
        await new Promise((res) => setTimeout(res, 10));
      }
    }
    return streamed;
  };

  // Routes prompt handling to the appropriate model service while managing state.
  const promptRequest = async (args: { prompt: string }) => {
    if (!args.prompt || !args.prompt.trim()) return;

    let convId = selectedConvIdRef.current;
    if (!convId) {
      convId = createNewConversation();
      setSelectedConvId(convId);
      selectedConvIdRef.current = convId;
    }
    updateConversationName(args.prompt, convId);

    if (selectedModel === 'gemini') {
      await handleGeminiRequest(args);
    } 
    else if(selectedModel === 'deepseek') {
      await handleDeepSeekRequest(args);
    }
    else {
      await handleOpenAIRequest(args);
    }
  };

  // Executes a Gemini API call and streams its response into the Assist View.
  const handleGeminiRequest = async (args: { prompt: string }) => {
    setStopStreaming(false);
    try {
      const fullResponse = await getGeminiAIAssit(geminiApiKey, geminiModel, args.prompt);
      const streamed = await streamAIResponse(fullResponse);
      if (!stopStreaming && aiAssistRef.current) {
        aiAssistRef.current.addPromptResponse(marked.parse(streamed), true);
        checkAndUpdateLocalStorage();
      }
    } catch {
      const msg = '⚠️ Something went wrong while connecting to the Gemini service. Please check your API key/model.';
      aiAssistRef.current?.addPromptResponse(marked.parse(msg), true);
      checkAndUpdateLocalStorage();
    }
  };

  // Executes a DeepSeek API call and streams its response into the Assist View.
  const handleDeepSeekRequest = async (args: PromptRequestEventArgs) => {
    setStopStreaming(false);
    try {
      const fullResponse = await getdeepSeekAIAssit(deepseekApiKey, args.prompt!);
      const streamed = await streamAIResponse(fullResponse);
      if (!stopStreaming && aiAssistRef.current) {
        (aiAssistRef.current as any).addPromptResponse(marked.parse(streamed), true);
        checkAndUpdateLocalStorage();
      }
    } catch {
      const msg = '⚠️ Something went wrong while connecting to the DeepSeek service. Please check your API key.';
      (aiAssistRef.current as any)?.addPromptResponse(marked.parse(msg), true);
      checkAndUpdateLocalStorage();
    }
  };
  
  const handleOpenAIRequest = async (args: { prompt: string }) => {
    setStopStreaming(false);
    try {
      const fullResponse = await getAzureOpenAIAssist({
        messages: args.prompt
      });
      const streamed = await streamAIResponse(fullResponse);
      if (!stopStreaming && aiAssistRef.current) {
        aiAssistRef.current.addPromptResponse(marked.parse(streamed), true);
        checkAndUpdateLocalStorage();
      }
    } catch {
      const msg =
        '⚠️ Something went wrong while connecting to the OpenAI service. Please check your Azure endpoint, key, deployment, and API version.';
      aiAssistRef.current?.addPromptResponse(marked.parse(msg), true);
      checkAndUpdateLocalStorage();
    }
  };

  // Renders the Assist View banner that greets the user.
  const bannerTemplate = () => (
    <div className="banner-content e-no-content">
      <div className="e-icons e-assistview-icon" />
      <h3 className="ai-assist-banner-subtitle">How can I help you today?</h3>
    </div>
  );

  // Provides the template for rendering conversation items in the sidebar list.
  const listItemTemplate = (data: ConversationItem) => (
    <div
      className="e-text-content"
      onClick={() => onItemSelect({ id: data.id, text: data.text })}
      title={data.text}
    >
      <span className="e-list-text">{data.text}</span>
      <span
        className="delete-icon e-icons e-trash"
        title="Delete Conversation"
        onClick={(e) => deleteConversation(data.id, e as any)}
      />
    </div>
  );

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
            ref={(inst) => (aiAssistRef.current = inst)}
            bannerTemplate={bannerTemplate} enableAttachments={true}  attachmentSettings= {attachmentSettings}
            promptSuggestions={suggestions}
            promptRequest={promptRequest}
            showHeader={showHeader}
            stopRespondingClick={stopRespondingClick}
            width="auto"
            footerToolbarSettings={footerToolbarSettings}
          >
            <div className="ai-assist-header">
              <ButtonComponent id="close" iconCss="e-icons e-menu" onClick={toggleSidebar} />
              <DropDownListComponent
                id="ai-model-dropdown"
                dataSource={models}
                fields={{ text: 'name', value: 'id' }}
                value={selectedModel}
                change={onModelChange}
                popupHeight="200px"
                width="200px"
              />
            </div>
          </AIAssistViewComponent>
        </div>

        <SidebarComponent
          id="assistantSidebar"
          ref={(inst) => (sidebarRef.current = inst)}
          target=".ai-models"
          width="250px"
          position="Left"
          enableDock={enableDock}
          dockSize={dockSize}
          enableGestures={enableGestures}
          type={sidebarType}
          showBackdrop={showBackdrop}
          closeOnDocumentClick={closeOnDocumentClick}
        >
          <div className="assistant-sidebar-header">
            <div className="header-left">
              <span id="icon-assist" className="header-icon e-icons e-assistview-icon" />
              <span className="header-title">AI Assist</span>
            </div>
            <ButtonComponent id="close" cssClass="e-flat" iconCss="e-icons e-close" onClick={closeSidebar} />
          </div>

          <div className="assistant-sidebar-content">
            <ButtonComponent cssClass="new-thread-btn" iconCss="e-icons e-plus" onClick={loadNewAIAssist}>
              New Thread
            </ButtonComponent>
            <ListViewComponent
              id="conversation-list"
              ref={(inst) => (listRef.current = inst)}
              dataSource={listData as any}
              template={listItemTemplate as any}
            />
          </div>
        </SidebarComponent>

        <ToastComponent
          ref={(inst) => (toastRef.current = inst)}
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
};

export default AIAssistModels;