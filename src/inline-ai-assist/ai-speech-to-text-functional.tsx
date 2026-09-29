import * as React from 'react';
import { useEffect, useRef, useCallback } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { InlineAIAssistComponent, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';
import './ai-speech-to-text.css';

const SpeechToTextFunctional: React.FC = () => {
  useEffect(() => {
    updateSampleSection();
  }, []);
  const inlinePromptRef = useRef<InlineAIAssistComponent | null>(null);
  const targetContentRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | undefined>();
  const savedRangeRef = useRef<Range | null>(null);
  const selectedSpanRef = useRef<HTMLSpanElement | null>(null);
  const originalSpanHTMLRef = useRef<string>('');
  const originalContentHTMLRef = useRef<string>('');
  const isAcceptedRef = useRef<boolean>(false);
  const isPopupOpenRef = useRef<boolean>(false);
  const commandSettings: any = {
    commands: [
      {
        id: 'improveContent',
        label: 'Improve Content',
        iconCss: 'e-icons e-edit',
        tooltip: 'Improve the selected content',
        prompt: 'Improve the selected content.'
      },
      {
        id: 'shorten',
        label: 'Shorten',
        iconCss: 'e-icons e-shorten',
        tooltip: 'Shorten the selected text',
        prompt: 'Shorten the selected text.'
      },
      {
        id: 'elaborate',
        label: 'Elaborate',
        iconCss: 'e-icons e-elaborate',
        tooltip: 'Expand on the following content with more detail and explanation',
        prompt: 'Expand on the following content with more detail and explanation.'
      },
      {
        id: 'summarize',
        label: 'Summarize',
        iconCss: 'e-icons e-description',
        tooltip: 'Summarize the selected text',
        prompt: 'Summarize the selected text.'
      }
    ],
    popupWidth: '240px',
    popupHeight: 'auto'
  };
  const speechToTextSettings: any = {
    enable: true
  };
  const getSelectedText = useCallback((): string => {
    return savedRangeRef.current ? savedRangeRef.current.toString() : '';
  }, []);
  const saveSelection = useCallback((): boolean => {
    const selection: Selection | null = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      savedRangeRef.current = selection.getRangeAt(0).cloneRange();
      return true;
    }
    return false;
  }, []);
  const restoreSelection = useCallback((): boolean => {
    if (!savedRangeRef.current) {
      return false;
    }
    const selection: Selection | null = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(savedRangeRef.current);
    }
    return true;
  }, []);
  const createFragmentFromHTML = useCallback((html: string): DocumentFragment => {
    const tempDiv: HTMLDivElement = document.createElement('div');
    tempDiv.innerHTML = html || '';
    const fragment: DocumentFragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }, []);
  const unwrapSelectedSpan = useCallback((): void => {
    if (!selectedSpanRef.current || !selectedSpanRef.current.parentNode) {
      return;
    }
    const parent: Node = selectedSpanRef.current.parentNode;
    const fragment: DocumentFragment = createFragmentFromHTML(
      selectedSpanRef.current.innerHTML
    );
    parent.replaceChild(fragment, selectedSpanRef.current);
    selectedSpanRef.current = null;
    originalSpanHTMLRef.current = '';
  }, [createFragmentFromHTML]);
  const restoreOriginalSpan = useCallback((): void => {
    if (!selectedSpanRef.current || !selectedSpanRef.current.parentNode) {
      return;
    }
    const parent: Node = selectedSpanRef.current.parentNode;
    const fragment: DocumentFragment = createFragmentFromHTML(
      originalSpanHTMLRef.current
    );
    parent.replaceChild(fragment, selectedSpanRef.current);
    selectedSpanRef.current = null;
    originalSpanHTMLRef.current = '';
  }, [createFragmentFromHTML]);
  const handleResponseItemSelect = useCallback((args: any): void => {
    const instance = inlinePromptRef.current;
    if (!instance) return;
    if (args.command.label === 'Accept') {
      isAcceptedRef.current = true;
      if (selectedSpanRef.current && selectedSpanRef.current.parentNode) {
        unwrapSelectedSpan();
      } else if (savedRangeRef.current) {
        restoreSelection();
        if (savedRangeRef.current) {
          savedRangeRef.current.deleteContents();
          const response: string = (instance.prompts[
            instance.prompts.length - 1
          ] as any).response;
          savedRangeRef.current.insertNode(createFragmentFromHTML(response));
          savedRangeRef.current = null;
        }
      }
      instance.hidePopup();
      isPopupOpenRef.current = false;
    } else if (args.command.label === 'Discard') {
      isAcceptedRef.current = false;
      if (selectedSpanRef.current && selectedSpanRef.current.parentNode) {
        restoreOriginalSpan();
      }
      savedRangeRef.current = null;
      instance.hidePopup();
      isPopupOpenRef.current = false;
    }
  }, [createFragmentFromHTML, restoreOriginalSpan, restoreSelection, unwrapSelectedSpan]);
  const responseSettings: any = {
    itemSelect: handleResponseItemSelect
  };
  const onClose = useCallback((): void => {
    if (!isAcceptedRef.current) {
      if (originalContentHTMLRef.current) {
        targetContentRef.current!.innerHTML = originalContentHTMLRef.current;
      } else if (selectedSpanRef.current && selectedSpanRef.current.parentNode) {
        restoreOriginalSpan();
      }
    } else if (selectedSpanRef.current && selectedSpanRef.current.parentNode) {
      unwrapSelectedSpan();
    }
    selectedSpanRef.current = null;
    originalSpanHTMLRef.current = '';
    savedRangeRef.current = null;
    originalContentHTMLRef.current = '';
    isAcceptedRef.current = false;
    isPopupOpenRef.current = false;
    window.getSelection()?.removeAllRanges();
  }, [restoreOriginalSpan, unwrapSelectedSpan]);
  const onPromptRequest = useCallback(
    (args: PromptRequestEventArgs): void => {
      const instance = inlinePromptRef.current;
      if (!instance) return;
      const selectedText: string = getSelectedText();
      let contextPrompt: string = args.prompt || '';
      if (selectedText && selectedText.length > 0) {
        contextPrompt += ' ' + selectedText;
      }
      if (!contextPrompt.trim()) {
        instance.addResponse(
          "I'm here to assist with your meeting notes. Try selecting text and choosing a command."
        );
        return;
      }
      abortControllerRef.current = new AbortController();
      if (selectedSpanRef.current) {
        instance.dataBind();
        getUserID().then((userID: string) => {
          try {
            fetch(AI_SERVICE_URL + '/api/stream', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': userID
              },
              body: JSON.stringify({ message: contextPrompt }),
              signal: abortControllerRef.current!.signal
            })
              .then((response: Response) => {
                if (!response.ok) {
                  return response.json().then((errorData: any) => {
                    throw new Error(errorData.error || `HTTP Error ${response.status}`);
                  });
                }
                const reader: ReadableStreamDefaultReader<Uint8Array> | undefined =
                  response.body ? response.body.getReader() : undefined;
                const decoder: TextDecoder = new TextDecoder();
                let fullText: string = '';
                if (!reader) {
                  return Promise.resolve();
                }
                const processStream = (): Promise<void> => {
                  return reader.read().then((result: any): Promise<void> | void => {
                    const { value, done } = result;
                    if (done) {
                      if (
                        selectedSpanRef.current &&
                        selectedSpanRef.current.parentNode &&
                        fullText
                      ) {
                        instance.addResponse(fullText, true);
                      }
                      return Promise.resolve();
                    }
                    if (!selectedSpanRef.current || !selectedSpanRef.current.parentNode) {
                      return Promise.resolve();
                    }
                    const chunk: string = decoder.decode(value, { stream: true });
                    fullText += chunk;
                    const tempDiv = document.createElement('div');
                    tempDiv.textContent = fullText;
                    const plainText: string = tempDiv.textContent || fullText;
                    if (selectedSpanRef.current) {
                      selectedSpanRef.current.textContent = plainText;
                    }
                    if ((instance as any).popupObj) {
                      (instance as any).popupObj.refreshPosition();
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
                setTimeout(() => {
                  const fallbackResponse: string =
                    'We could not reach the AI service; please try again later.';
                  if (selectedSpanRef.current) {
                    selectedSpanRef.current.innerHTML = fallbackResponse;
                  }
                  instance.addResponse(fallbackResponse);
                }, 1000);
              });
          } catch (error) {
          }
        });
      } else {
        getUserID().then((userID: string) => {
          try {
            fetch(AI_SERVICE_URL + '/api/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                visitorId: userID,
                messages: {
                  messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: contextPrompt }
                  ]
                }
              }),
              signal: abortControllerRef.current!.signal
            })
              .then((response: Response) => {
                if (!response.ok) {
                  return response.json().then((errorData: any) => {
                    throw new Error(errorData.error || `HTTP Error ${response.status}`);
                  });
                }
                return response.json();
              })
              .then((result: any): void => {
                if (result && result.response) {
                  const aiResponse: string = result.response.replace('END_INSERTION', '');
                  instance.addResponse(aiResponse, true);
                }
              })
              .catch((error: Error) => {
                if (error.name === 'AbortError') {
                  return;
                }
                setTimeout(() => {
                  instance.addResponse(
                    'We could not reach the AI service; please try again later.'
                  );
                }, 1000);
              });
          } catch (error) {
          }
        });
      }
    },
    [getSelectedText]
  );
  const handleMouseUp = useCallback((): void => {
    if (saveSelection()) {
      const selection: Selection | null = window.getSelection();
      const range: Range | null =
        selection && selection.rangeCount ? selection.getRangeAt(0) : null;
      if (range && !range.collapsed) {
        originalContentHTMLRef.current = targetContentRef.current!.innerHTML;
        const wrapper: HTMLSpanElement = document.createElement('span');
        wrapper.className = 'e-inlineaiassist-selected-text';
        const selectedContent: DocumentFragment = range.extractContents();
        wrapper.appendChild(selectedContent);
        range.insertNode(wrapper);
        selectedSpanRef.current = wrapper;
        originalSpanHTMLRef.current = wrapper.innerHTML;
        savedRangeRef.current = document.createRange();
        savedRangeRef.current.selectNodeContents(selectedSpanRef.current);
        if (inlinePromptRef.current) {
          inlinePromptRef.current.relateTo = selectedSpanRef.current;
        }
      } else if (savedRangeRef.current && inlinePromptRef.current) {
        inlinePromptRef.current.relateTo =
          savedRangeRef.current.startContainer.parentElement || '#targetContent';
      }
      if (inlinePromptRef.current) {
        inlinePromptRef.current.dataBind();
        inlinePromptRef.current.showPopup();
      }
      isPopupOpenRef.current = true;
    }
  }, [saveSelection]);
  const handleKeyUp = useCallback((): void => {
    if (saveSelection() && isPopupOpenRef.current && savedRangeRef.current && inlinePromptRef.current) {
      inlinePromptRef.current.relateTo =
        savedRangeRef.current.startContainer.parentElement || '#targetContent';
      inlinePromptRef.current.dataBind();
    }
  }, [saveSelection]);
  useEffect(() => {
    const targetContent = targetContentRef.current;
    if (targetContent) {
      targetContent.addEventListener('mouseup', handleMouseUp);
      targetContent.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      if (targetContent) {
        targetContent.removeEventListener('mouseup', handleMouseUp);
        targetContent.removeEventListener('keyup', handleKeyUp);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [handleMouseUp, handleKeyUp]);
  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="meeting-container inline-speech-to-text">
          <div className="meeting-header">
            <div>
              <h2>Meeting Notes Assistant</h2>
            </div>
          </div>

          <div className="meeting-card meeting-highlight">
            <div className="meeting-meta-grid">
              <div>
                <div className="meta-label">MEETING</div>
                <div className="meta-value meta-bold">Project Phoenix Sprint Planning</div>
              </div>
              <div>
                <div className="meta-label">DATE &amp; TIME</div>
                <div className="meta-value">August 12, 2025 • 2:00 PM - 3:00 PM</div>
              </div>
              <div>
                <div className="meta-label">PARTICIPANTS</div>
                <div className="meta-value">4 attendees</div>
              </div>
            </div>
          </div>

          <h4 className="section-heading">Attendees:</h4>
          <div className="meeting-card">
            <div className="row">
              <span className="attendee">
                <span className="avatar">JD</span> John Doe (Product Lead)
              </span>
              <span className="attendee">
                <span className="avatar">AS</span> Alice Smith (Engineering)
              </span>
              <span className="attendee">
                <span className="avatar">BC</span> Bob Chen (Design)
              </span>
              <span className="attendee">
                <span className="avatar">EM</span> Emily White (QA)
              </span>
            </div>
          </div>
          <h4 className="section-heading">Meeting Notes:</h4>
          <p className="hint">
            <mark>Select text to generate summaries, extract action items, identify decisions, or dictate
            updates using voice input.</mark>
          </p>
          <div id="targetContent" ref={targetContentRef} className="demo-text-area" contentEditable={true} suppressContentEditableWarning={true} >
            <p>
              John opened the meeting by stating that the main goal is to finalize the beta release
              timeline for Project Phoenix. He mentioned that marketing needs the final feature list
              by August 20th to prepare the launch campaign.
            </p>
            <p>
              Alice raised a concern about the API integration. She said, "The third-party payment
              gateway API is rate-limited, and we need to implement exponential backoff. I estimate
              this will take 3 days, pushing the backend freeze to August 15th."
            </p>
            <p>
              Bob presented the new dashboard UI. The team agreed that the dark mode looks excellent,
              but the contrast on the primary buttons needs to be adjusted for accessibility. Bob will
              submit updated designs by Thursday.
            </p>
            <p>
              Emily requested that we freeze code by August 18th to allow exactly one week for QA. She
              emphasized that regression testing must cover the new WebSocket architecture. Action
              items: Alice to document the API backoff strategy, Bob to fix button contrast, and
              Emily to draft the QA matrix by EOD Friday.
            </p>
          </div>
          <InlineAIAssistComponent
            ref={inlinePromptRef}
            commandSettings={commandSettings}
            responseMode="Inline"
            relateTo={null as any}
            promptRequest={onPromptRequest}
            responseSettings={responseSettings}
            speechToTextSettings={speechToTextSettings}
            placeholder="Type prompt for meeting assistance..."
            popupWidth="480px"
            popupHeight="auto"
            close={onClose}
          />
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates the Inline AI Assist component with built-in speech-to-text for
          meeting notes. Select text to run a command or use the mic to dictate prompts.
        </p>
      </div>
      <div id="description">
        <p>In this example, the Inline AI Assist component showcase the following features:</p>
        <ul>
          <li>
            <code>speechToTextSettings</code> - Enable built-in speech-to-text voice input for
            inline prompt request
          </li>
          <li>
            <code>commandSettings</code> - Predefined commands (summary, extract actions,
            decisions, risks, follow-up, executive) applied to the selected text.
          </li>
          <li>
            <code>relateTo</code> - Position the assistant popup near the selected paragraph for
            contextual suggestions.
          </li>
          <li>
            <code>promptRequest</code> - Handle prompt submission and insert formatted AI responses
            into the editable notes area.
          </li>
          <li>
            <code>responseSettings</code> - Manage Accept to insert AI output and Discard to cancel
            the suggestion.
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SpeechToTextFunctional;
