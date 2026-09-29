import * as React from 'react';
import { useEffect, useRef, useCallback } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel, FooterToolbarSettingsModel, ResponseToolbarSettingsModel, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-interactive-chat';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DropDownButton, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { BlockEditorComponent, BlockModel } from '@syncfusion/ej2-react-blockeditor';
import { updateSampleSection } from '../common/sample-base';
import * as data from './data/ai-ask-assistant.json';
import './ai-ask-assistant.css';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service'
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';

interface ChatSession {
  id: string;
  title: string;
  prompts: any[];
}

const AskAIAssistant = () => {
  useEffect(() => {
    updateSampleSection();
    // FAB click handler wired after mount
    if (fabInstance.current) {
      fabInstance.current!.element.style.display = 'none';
      fabInstance.current.element.onclick = () => {
        toggleBackgroundState(true);
        moveAssistview(currentMode.current);
        fabInstance.current!.element.style.display = 'none';
      };
    }
    const wrapper = document.getElementById('assistviewWrapper');
    if (sidebarInstance.current && wrapper) sidebarInstance.current.element.appendChild(wrapper);
    toggleIconClass('e-horizontal-line', 'e-chevron-right-double');
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const notionSuggestions: string[] = data["notionSuggestions"];
  const iconMapByIndex: { [key: number]: string } = data["iconMapByIndex"];
  const abortControllerRef = React.useRef<AbortController | undefined>();
  const assistInstance    = useRef<AIAssistViewComponent>(null);
  const blockEditorInstance = useRef<BlockEditorComponent>(null);
  const dialogInstance    = useRef<DialogComponent>(null);
  const sidebarInstance   = useRef<SidebarComponent>(null);
  const fabInstance       = useRef<FabComponent>(null);
  const lastPromptWasTranslate = useRef<boolean>(false);

  // Vanilla Syncfusion dropdowns — same pattern as TS version
  const screenDropdownRef   = useRef<DropDownButton | null>(null);
  const historyDropdownRef  = useRef<DropDownButton | null>(null);

  // Mutable refs for state shared across callbacks (avoids stale closure issues)
  const sessionChats         = useRef<ChatSession[]>([]);
  const activeSessionId      = useRef<string | null>(null);
  const isFirstSessionAdded  = useRef<boolean>(false);
  const currentMode          = useRef<string>('Sidebar');

  const toggleBackgroundState = useCallback((show: boolean): void => {
    const editorContainer = document.querySelector('.ask-ai-editor-container');
    if (editorContainer) {
      show ? editorContainer.classList.remove('e-hidden') : editorContainer.classList.add('e-hidden');
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

  const onPromptRequest = useCallback((args: PromptRequestEventArgs): void => {
    if (assistInstance.current) assistInstance.current.promptSuggestions = [];
        getUserID().then((userID: string) => {
        try {
          abortControllerRef.current = new AbortController();
          let contentToProcess: string = blockEditorInstance.current.getDataAsHtml();
        const isDocumentAction = notionSuggestions.includes(args.prompt);
        const isTranslatePage = args.prompt === 'Translate this page';
        const isTranslationFollowUp = lastPromptWasTranslate.current && !isDocumentAction;

        if (isTranslatePage) {
          lastPromptWasTranslate.current = true;
        }

        const messages = isTranslationFollowUp
          ? [
              {
                role: 'system',
                content: `
            You are an assistant for a Block Editor application.
            The user wants to translate the provided Block Editor HTML content into a language they will specify.
            Rules:
            - If the user's input is a valid language name, translate ONLY the visible text inside the HTML tags into that language.
            - Preserve ALL HTML tags, attributes, and structure exactly as-is.
            - Do not translate tag names, attribute names, or attribute values.
            - Return ONLY the translated HTML with no explanation or extra text.
            - If the user's input is NOT a recognizable language, reply exactly: "Please provide a valid language name to translate the document."
                          `
                        },
                        {
                          role: 'user',
                          content: `
            Translate the document into: ${args.prompt}

            Document HTML:
            ${contentToProcess}
                `
              }
            ]
          : isDocumentAction
          ? [
              {
                role: 'system',
                content: `
        You are an assistant for a Block Editor application.

        You must answer ONLY using the provided Block Editor HTML content.

        Rules:
        - Treat the provided HTML as the complete document.
        - Do not use external knowledge.
        - Do not invent missing information.
        - Preserve the meaning of headings, lists, tables, quotes, and code blocks.
        - If the document is empty, say:
          "The document is empty."
        - If translation is requested without specifying a language, ask the user to specify the target language.
        `
              },
              {
                role: 'user',
                content: `
        Request:
        ${args.prompt}

        Document HTML:
        ${contentToProcess}
        `
              }
            ]
          : [
              {
                role: 'system',
                content: 'You are a helpful AI assistant.'
              },
              {
                role: 'user',
                content: args.prompt
              }
            ];
          fetch(AI_SERVICE_URL + '/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              visitorId: userID,
              messages: {
                messages
              }
            }),
            signal: abortControllerRef.current.signal
          })
            .then((response: Response) => {
              if (!response.ok) {
                return response.json().then((errorData: any) => {
                  throw new Error(errorData.error || 'HTTP Error ' + response.status);
                });
              }
              return response.json();
            })
            .then((result: any) => {
              if (result && result.response) {
                const aiResponse: string = result.response.replace('END_INSERTION', '');
            if (isTranslationFollowUp) {
              const isInvalidLanguage = aiResponse.includes(
                'Please provide a valid language name to translate the document.'
              );
              if (!isInvalidLanguage) {
                lastPromptWasTranslate.current = false;
              }
            }
                if (assistInstance.current) {
                  assistInstance.current.addPromptResponse(aiResponse);
                  if (!isFirstSessionAdded.current && !activeSessionId.current) {
                    createNewSession(true);
                    isFirstSessionAdded.current = true;
                  }
                  assistInstance.current.promptSuggestions = [];
                }
              }
            })
            .catch((error: Error) => {
              if (error.name === 'AbortError') {
                return;
              }
              lastPromptWasTranslate.current = false; 
              setTimeout(() => {
                const fallbackResponse: string = 'We could not reach the AI service; please try again later.';
                if (assistInstance.current) {
                  assistInstance.current.addPromptResponse(fallbackResponse);
                  if (!isFirstSessionAdded.current && !activeSessionId.current) {
                    createNewSession(true);
                    isFirstSessionAdded.current = true;
                  }
                  assistInstance.current.promptSuggestions = [];
                }
              }, 1000);
            });
        } catch (error) {
          //catch error
        }
      });
  }, [createNewSession]);

  const moveAssistview = useCallback((mode: string): void => {
    currentMode.current = mode;
    const wrapper = document.getElementById('assistviewWrapper');
    if (dialogInstance.current.visible) dialogInstance.current.hide();
    if (sidebarInstance.current) sidebarInstance.current.hide();

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
    }
  }, [toggleBackgroundState, toggleIconClass]);

  // Mirrors TS `created()` — initialize all imperative dropdowns once AIAssistView is ready
  const onAssistViewCreated = useCallback((): void => {

    screenDropdownRef.current = new DropDownButton({
      items: [{ text: 'Sidebar' }, { text: 'Floating' }],
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (currentMode.current === args.item.text) args.element.classList.add('e-selected');
      },
      select: (args: MenuEventArgs) => {
        if (currentMode.current === args.item.text) return;
        moveAssistview(args.item.text)
      }
    });
    screenDropdownRef.current.appendTo('.screen-resizer');

    historyDropdownRef.current = new DropDownButton({
      items: [{ text: 'No Chat History' }],
      cssClass: 'e-caret-hide e-flat',
      beforeItemRender: (args: MenuEventArgs) => {
        if (activeSessionId.current === args.item.id) args.element.classList.add('e-selected');
      },
      select: (args: MenuEventArgs) => {
        if (args.item.id) loadSession(args.item.id);
      }
    });
    historyDropdownRef.current.appendTo('.history-icon');
  }, [moveAssistview, loadSession]);

  const toolbarItemClicked = useCallback((args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-edit-notes') {
      createNewSession();
      if (assistInstance.current) assistInstance.current.promptSuggestions = notionSuggestions;
    } else if (args.item.iconCss === 'e-icons e-horizontal-line') {
      // Move wrapper back to dialogElem before hiding
      const dialogElem = document.querySelector('#dialogElem');
      const wrapper = document.getElementById('assistviewWrapper');
      if (dialogElem && wrapper) dialogElem.appendChild(wrapper);
      if (sidebarInstance.current) sidebarInstance.current.hide();
      if (dialogInstance.current) dialogInstance.current.hide();
      toggleBackgroundState(true);
      if (fabInstance.current) fabInstance.current.element.style.display = '';
    }
  }, [createNewSession, notionSuggestions, toggleBackgroundState]);

  const responseToolbarItemClicked = useCallback((args: ToolbarItemClickedEventArgs): void => {
    if (args.item.iconCss === 'e-icons e-block-add-icon') {
      const dataIndex = (args as any).dataIndex;
      if (dataIndex !== undefined && dataIndex !== null && assistInstance.current) {
        const prompts = assistInstance.current.prompts;
        if (prompts && prompts[dataIndex]) {
          const response = prompts[dataIndex].response || "We could not reach the AI service; please try again later.";
          const currentPrompt: string = prompts[dataIndex].prompt as string;
          const previousPrompt: string = dataIndex > 0 ? prompts[dataIndex - 1].prompt as string : '';
          const isRecognizableLanguage: boolean =
            (
              previousPrompt === 'Translate this page' ||
              /translate this page to\s+\w+/i.test(currentPrompt)
            ) &&
            !response.includes('Please provide a valid language name to translate the document.');
          const htmlOutput: string | Promise<string> = MarkdownConverter.toHtml(response);
          if (blockEditorInstance.current) {
            const blocks: BlockModel[] = blockEditorInstance.current.parseHtmlToBlocks(htmlOutput as string);
            blockEditorInstance.current.renderBlocksFromJson(blocks, isRecognizableLanguage ? true : false);
          }
        }
      }
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
      { iconCss: 'e-icons e-history',         align: 'Right', tooltip: 'Chat History',     cssClass: 'history-icon' },
      { iconCss: 'e-icons e-edit-notes',      align: 'Right', tooltip: 'Start New chat' },
      { iconCss: 'e-icons e-resize',          align: 'Right', tooltip: 'Switch Chat Mode', cssClass: 'screen-resizer' },
      { iconCss: 'e-icons e-horizontal-line', align: 'Right', tooltip: 'Hide Chat' }
    ],
    itemClicked: toolbarItemClicked
  };

  const footerToolbarSettings: FooterToolbarSettingsModel = {
    toolbarPosition: 'Bottom',
    items: [
      { iconCss: 'e-icons e-assist-attachment-icon', align: 'Left',  tooltip: 'Attach File' },
      { iconCss: 'e-icons e-assist-speech-to-text',  align: 'Right' },
      { iconCss: 'e-icons e-assist-send',            align: 'Right' }
    ]
  };

  const responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy response' },
      { iconCss: 'e-icons e-block-add-icon', tooltip: 'Insert into this page' },
      { iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { iconCss: 'e-icons e-assist-dislike', tooltip: 'Need improvement' },
      { iconCss: 'e-icons e-assist-audio', tooltip: 'Read aloud' }
    ],
    itemClicked: responseToolbarItemClicked
  };

  const attachmentSettings = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
    removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
  };

  const speechToTextSettings = { enable: true };

  // BlockEditor settings
  const imageBlockSettings: any = {
    saveUrl: 'https://services.syncfusion.com/react/production/api/RichTextEditor/SaveFile',
    path: 'https://services.syncfusion.com/react/production/RichTextEditor/'
  };

  return (
    <div className='control-section'>
      <div className="ask-ai-editor e-card">
        <div className="ask-ai-editor-container">
          <div className="ask-ai-editor-page">
            <div className="ask-ai-editor-content">
              <BlockEditorComponent
                height="600px"
                id='ask-ai-block-editor'
                blocks={data["askAssistantData"]} 
                users={data["users"]} 
                imageBlockSettings={imageBlockSettings}
                ref={blockEditorInstance}>
              </BlockEditorComponent>
            </div>
          </div>
        </div>

        {/* Dialog: holds assistviewWrapper on initial mount (Floating mode default) */}
        <DialogComponent
          id="dialogElem"
          target=".ask-ai-editor-page"
          position={{ X: 'right', Y: '0' }}
          animationSettings={{ effect: 'FadeZoom' }}
          width="500px"
          visible={false}
          cssClass="custom-dialog"
          ref={dialogInstance}
        >
          <div id="assistviewWrapper" className="ask-ai-assistview">
            <AIAssistViewComponent
              id="aiAssistView"
              enableStreaming={true}
              promptSuggestions={notionSuggestions}
              promptSuggestionItemTemplate={suggestionItemContent}
              promptRequest={onPromptRequest}
              bannerTemplate={bannerTemplate}
              toolbarSettings={assistViewToolbarSettings}
              footerToolbarSettings={footerToolbarSettings}
              responseToolbarSettings={responseToolbarSettings}
              enableAttachments={true}
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
          id="askAiSidebar"
          target=".ask-ai-editor-page"
          width="400px"
          position="Right"
          enableGestures={false}
          animate={false}
          isOpen={false}
          ref={sidebarInstance}
        />

        <FabComponent
          id="fabElem"
          iconCss="e-icons e-magic-wand"
          target=".ask-ai-editor-page"
          ref={(fab) => { fabInstance.current = fab; }}
        />
      </div>

      <div id="action-description">
        <p>This sample demonstrates an AI AssistView integrated with Block Editor, that supports multiple chat display modes, chat history management, file attachments, and voice-based input and output interactions.</p>
      </div>
      <div id="description">
        <p>This sample demonstrates a AI assistant integrated with Block Editor for enhanced content creation.</p>
        <ul>
          <li>Block Editor component for rich content editing with various block types.</li>
          <li>Floating and sidebar chat modes with seamless view switching.</li>
          <li>Prompt suggestions rendered using a custom item template with contextual icons.</li>
          <li>Chat session creation, persistence, and history navigation.</li>
          <li>File upload and removal support using configured attachment endpoints.</li>
          <li>Response toolbar with copy, add, like, dislike, and audio options.</li>
          <li>Speech-to-text input and text-to-speech playback for hands-free interaction.</li>
          <li>Toolbar actions for starting new chats, hiding the assistant, and resizing views.</li>
          <li>Floating action button (FAB) to restore the assistant when hidden.</li>
        </ul>
      </div>
    </div>
  );
};

export default AskAIAssistant;
