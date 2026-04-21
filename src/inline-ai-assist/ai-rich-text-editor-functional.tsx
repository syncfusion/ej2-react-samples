import * as React from 'react';
import { useEffect } from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { InlineAIAssistComponent, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
// Import EJ2 RichTextEditor modules to ensure they're bundled
import { RichTextEditor, HtmlEditor, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { NodeSelection } from '@syncfusion/ej2-richtexteditor';
import { MarkdownConverter } from '@syncfusion/ej2-markdown-converter';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';
import './ai-rich-text-editor.css';

// Inject required modules for RichTextEditor
RichTextEditor.Inject(HtmlEditor, Toolbar, Image, Link, QuickToolbar);

interface SelectedContent {
  text: string;
  span: HTMLElement | null;
  range: Range | null;
}

/**
 * Functional React component for Rich Text Editor with Inline AI Assist integration
 * Modern React hooks-based implementation with streaming AI responses
 */
const RichTextEditorFunctional: React.FC = () => {
  useEffect(() => {
      updateSampleSection();
  }, []);
  const promptRef = React.useRef<InlineAIAssistComponent>(null);
  const rteEditorRef = React.useRef<HTMLDivElement>(null);
  const rteInstanceRef = React.useRef<any>(null);
  const abortControllerRef = React.useRef<AbortController>();
  const rteSelectionRef = React.useRef<any>(null);
  const markdownConverterRef = React.useRef<any>(null);
  const selectedSpanRef = React.useRef<HTMLElement | null>(null);

  const [selectedContent, setSelectedContent] = React.useState<SelectedContent>({
    text: '',
    span: null,
    range: null
  });

  const commandSettings = {
    popupWidth: '250px',
    commands: [
      {
        label: 'Improve Content',
        prompt: 'Improve the clarity, coherence, and overall quality of the following content:',
        iconCss: 'e-icons e-magic-wand'
      },
      {
        label: 'Shorten',
        prompt: 'Shorten the following content without losing its core message:',
        iconCss: 'e-icons e-shorten'
      },
      {
        label: 'Elaborate',
        prompt: 'Expand on the following content with more detail and explanation:',
        iconCss: 'e-icons e-elaborate'
      },
      {
        label: 'Simplify',
        prompt: 'Simplify the language and make the following content easier to understand:',
        iconCss: 'e-icons e-text-wrap'
      },
      {
        label: 'Summarize',
        prompt: 'Summarize the following content in a concise and clear way:',
        iconCss: 'e-icons e-collapse-2'
      },
      {
        label: 'Check Grammar & Spelling',
        prompt: 'Check the following content for grammar and spelling mistakes, and correct them:',
        iconCss: 'e-icons e-grammar-check'
      }
    ]
  };

  const initialContent = `<p><strong>Introduction</strong></p>
<p>Technology has transformed the way we communicate and collaborate in both personal and professional 
    settings. Digital tools enable instant connectivity across global distances, breaking down traditional 
    barriers and creating new opportunities for innovation and growth.</p>
<p><strong>Key Benefits</strong></p>
<p>The integration of artificial intelligence into everyday applications is revolutionizing user experiences. 
    From smart assistants to predictive analytics, AI-powered features help users accomplish tasks more 
    efficiently while providing personalized recommendations based on individual preferences and behavior 
    patterns.</p>
<p><strong>Implementation Approach</strong></p>
<p>When adopting new technologies, organizations should focus on user training and change management. 
    A phased rollout allows teams to adapt gradually while providing feedback for continuous improvement. 
    Clear communication about benefits and proper support resources are essential for successful adoption 
    and long-term sustainability of technological initiatives.</p>
<p><strong>Future Outlook</strong></p>
<p>As digital transformation continues to accelerate, businesses must remain adaptable and open to 
    emerging trends. Cloud computing, automation, and data-driven decision-making will play increasingly 
    important roles in shaping competitive advantages. Organizations that embrace innovation while 
    maintaining focus on user needs will be best positioned for future success.</p>`;

  /**
   * Initialize Rich Text Editor instance
   */
  React.useEffect(() => {
    // Use a small delay to ensure EJ2 library is fully loaded
    const timer = setTimeout(() => {
      initializeRichTextEditor();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (rteInstanceRef.current) {
        rteInstanceRef.current.destroy();
      }
    };
  }, []);

  /**
   * Initialize RichTextEditor with EJ2 library
   */
  const initializeRichTextEditor = (): void => {
    if (!rteEditorRef.current) {
      //RTE editor ref not available
      return;
    }

    // Use imported modules directly
    rteSelectionRef.current = new NodeSelection();
    markdownConverterRef.current = MarkdownConverter;

    // Create RichTextEditor instance
    rteInstanceRef.current = new RichTextEditor({
      quickToolbarSettings: {
        text: [
          { prefixIcon: 'e-icons e-ai-chat', tooltipText: 'AI Assistant' } as any,
          'Bold',
          'Italic',
          'Underline',
          'StrikeThrough',
          'Fontcolor',
          'BackgroundColor',
          '|',
          'Unorderedlist',
          'Orderedlist'
        ]
      },
      value: initialContent,
      toolbarClick: handleToolbarClick
    });

    rteInstanceRef.current.appendTo(rteEditorRef.current);
  };

  /**
   * Handle toolbar click event to trigger AI Assist
   */
  const handleToolbarClick = (args: any): void => {
    if (args.item.prefixIcon === 'e-icons e-ai-chat') {
      if (!rteInstanceRef.current || !rteSelectionRef.current) return;

      const range: Range = rteSelectionRef.current.getRange(document);
      const relateToEl = range.endContainer && (range.endContainer as any).parentElement;
      const selectedText: string = rteInstanceRef.current.getSelection();

      if (selectedText && selectedText.length > 0) {
        const wrapper: HTMLSpanElement = document.createElement('span');
        wrapper.className = 'e-inlineaiassist-selected-text';

        // Extract the selected contents from the range (match JS behavior)
        const selectedContents = range.extractContents();
        wrapper.appendChild(selectedContents);
        range.insertNode(wrapper);

        selectedSpanRef.current = wrapper;
        setSelectedContent({
          text: selectedText,
          span: wrapper,
          range: range
        });

        // Show popup after state update
        setTimeout(() => {
          if (promptRef.current) {
            promptRef.current.relateTo = relateToEl ? relateToEl : wrapper;
            promptRef.current.dataBind();
            promptRef.current.showPopup();
          }
        }, 0);
      }
    }
  };

  /**
   * Handle prompt request from AI - sends selected text to AI service
   */
  const handlePromptRequest = (args: PromptRequestEventArgs): void => {
    if (!rteInstanceRef.current || !args.prompt) return;

    // Save undo/redo stack
    if ((rteInstanceRef.current.formatter as any).getUndoRedoStack().length === 0) {
      (rteInstanceRef.current.formatter as any).saveData();
    }

    let contextPrompt: string = args.prompt || '';
    if (selectedContent.text && selectedContent.text.length > 0) {
      contextPrompt = contextPrompt + ' ' + selectedContent.text;
    }

    const selectedSpan = selectedSpanRef.current || selectedContent.span;
    if (selectedSpan) {
      if (promptRef.current && selectedSpan.parentElement) {
        promptRef.current.dataBind();
      }

      getUserID().then((userID: string) => {
        try {
          abortControllerRef.current = new AbortController();

          // Make streaming request to AI service
          fetch(AI_SERVICE_URL + '/api/stream', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': userID
            },
            body: JSON.stringify({ message: contextPrompt }),
            signal: abortControllerRef.current.signal
          })
            .then((response: Response) => {
              if (!response.ok) {
                return response.json().then((errorData: any) => {
                  throw new Error(errorData.error || ('HTTP Error ' + response.status));
                });
              }

              // Process streaming response
              const reader: ReadableStreamDefaultReader<Uint8Array> = response.body!.getReader();
              const decoder: TextDecoder = new TextDecoder();
              let fullText: string = '';

              const processStream = (): Promise<void> => {
                return reader.read().then((result: any) => {
                  const value: Uint8Array | undefined = result.value;
                  const done: boolean = result.done;

                  if (done) {
                    // Stream complete - add response to assist component
                    if (selectedSpanRef.current && selectedSpanRef.current.parentNode) {
                      if (promptRef.current) {
                        promptRef.current.addResponse(fullText, true);
                      }
                      const newRange: Range = document.createRange();
                      newRange.selectNodeContents(selectedSpanRef.current);
                      if (rteInstanceRef.current) {
                        rteInstanceRef.current.selectRange(newRange);
                      }
                    }
                    return Promise.resolve();
                  }

                  // Check if selectedSpan still exists in DOM before processing
                  if (!selectedSpanRef.current || !selectedSpanRef.current.parentNode) {
                    return Promise.resolve();
                  }

                  // Process chunk from stream
                  const chunk: string = decoder.decode(value, { stream: true });
                  fullText += chunk;
                  if (promptRef.current) {
                      promptRef.current.addResponse(fullText, false);
                  }
                  // Convert markdown to HTML and display
                  if (markdownConverterRef.current) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = markdownConverterRef.current.toHtml(fullText);
                    const plainText = tempDiv.textContent || tempDiv.innerText || fullText;
                    if (selectedSpanRef.current) {
                      selectedSpanRef.current.innerHTML = plainText;
                    }
                  }
                  // Refresh popup position to prevent coordinate errors
                  if (promptRef.current && (promptRef.current as any).popupObj) {
                    (promptRef.current as any).popupObj.refreshPosition();
                  }
                  return processStream();
                });
              };

              return processStream();
            })
            .catch((error: Error) => {
              if (error.name === 'AbortError') {
                return;
              }

              // Show fallback error message
              setTimeout(() => {
                if (selectedSpanRef.current && selectedSpanRef.current.parentNode) {
                  const fallbackResponse: string = 'We could not reach the AI service; please try again later.';
                  selectedSpanRef.current.innerHTML = fallbackResponse;
                  if (promptRef.current) {
                    promptRef.current.addResponse(fallbackResponse);
                  }
                  const newRange: Range = document.createRange();
                  newRange.selectNodeContents(selectedSpanRef.current);
                  if (rteInstanceRef.current) {
                    rteInstanceRef.current.selectRange(newRange);
                  }
                }
              }, 1000);
            });
        } catch (error) {
          //catch error
        }
      });
    }
  };

  /**
   * Handle prompt close event - cleanup when popup is closed
   */
  const handlePromptClose = (): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (selectedSpanRef.current) {
      if (rteInstanceRef.current) {
        (rteInstanceRef.current.formatter as any).saveData();
      }

      selectedSpanRef.current = null;
      setSelectedContent(prev => ({ ...prev, span: null }));

      if (rteInstanceRef.current) {
        rteInstanceRef.current.executeCommand('undo');
        rteInstanceRef.current.clearUndoRedo();
      }

      window.getSelection().removeAllRanges();
    }
  };

  /**
   * Handle response item selection (Accept/Reject)
   */
  const handleResponseItemSelect = (args: any): void => {
    const selectedSpan = selectedContent.span;
    if (args.command.label === 'Accept') {
      // Accept the AI response
      if (selectedSpan && selectedSpan.parentNode) {
        const parent: Node = selectedSpan.parentNode;
        const textContent = selectedSpan.textContent || selectedSpan.innerText;
        const textNode = document.createTextNode(textContent);
        parent.replaceChild(textNode, selectedSpan);
        // Clear the synchronous ref first so the close handler doesn't undo this change
        selectedSpanRef.current = null;
        setSelectedContent(prev => ({ ...prev, span: null }));

        if (rteInstanceRef.current) {
          (rteInstanceRef.current.formatter as any).saveData();
          (rteInstanceRef.current.formatter as any).enableUndo(rteInstanceRef.current);
        }
      }

      if (promptRef.current) {
        promptRef.current.hidePopup();
      }
    } else if (args.command.label === 'Discard') {
      // Reject the AI response and restore original text
      if (rteInstanceRef.current) {
        (rteInstanceRef.current.formatter as any).saveData();
      }
      // Clear the synchronous ref so the close handler doesn't also attempt undo
      selectedSpanRef.current = null;
      setSelectedContent(prev => ({ ...prev, span: null }));

      if (rteInstanceRef.current) {
        rteInstanceRef.current.executeCommand('undo');
        rteInstanceRef.current.clearUndoRedo();
      }

      window.getSelection().removeAllRanges();

      if (promptRef.current) {
        promptRef.current.hidePopup();
      }
    }
  };

  const inlineToolbarSettings = {
    itemClick: (args: any) => {
      if (args.item.iconCss === 'e-icons e-inline-stop') {
          if (abortControllerRef.current) {
              abortControllerRef.current.abort();
          }
      }
    }
  }

  const responseSettings = {
    itemSelect: handleResponseItemSelect
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="rte-integration-container">
          <div ref={rteEditorRef} id="rte-editor" style={{ width: '100%' }} />

          <InlineAIAssistComponent
            ref={promptRef}
            id="inline-ai-assist"
            commandSettings={commandSettings}
            inlineToolbarSettings={inlineToolbarSettings}
            responseMode="Inline"
            promptRequest={handlePromptRequest}
            close={handlePromptClose}
            responseSettings={responseSettings}
          />
        </div>
      </div>

      <div id="action-description">
        <p>
          This sample demonstrates the integration of the Inline AI Assist component with the Syncfusion Rich Text
          Editor. It showcases advanced customization including command settings, response settings, and footer
          toolbar options for enhanced content editing experience.
        </p>
      </div>

      <div id="description">
        <p>
          In this example, the Inline AI Assist component is seamlessly integrated with the Rich Text Editor,
          providing an advanced use-case scenario. This integration demonstrates how AI-powered assistance can
          enhance content creation and editing workflows.
        </p>
        <p>Key features demonstrated:</p>
        <ul>
          <li>
            <code>CommandSettings</code> - Custom AI command buttons (Improve, Shorten, Elaborate, Summarize)
            integrated into the interface
          </li>
          <li>
            <code>ResponseSettings</code> - Configured response behavior with dynamic suggestion updates based on
            user actions
          </li>
          <li>
            <code>ResponseMode</code> - Set to <code>'Inline'</code> mode where the AI response can be directly
            streamed or added into the editor area, allowing users to see real-time content changes
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RichTextEditorFunctional;
