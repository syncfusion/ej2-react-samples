import * as React from 'react';
import { InlineAIAssistComponent, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';
import './ai-speech-to-text.css';

export class SpeechToText extends SampleBase<{}, {}> {
  private inlinePrompt: React.RefObject<InlineAIAssistComponent> = React.createRef();
  private targetContent: React.RefObject<HTMLDivElement> = React.createRef();
  private abortController: AbortController | undefined;
  private savedRange: Range | null = null;
  private selectedSpan: HTMLSpanElement | null = null;
  private originalSpanHTML: string = '';
  private originalContentHTML: string = '';
  private isAccepted: boolean = false;
  private isPopupOpen: boolean = false;
  private commandSettings: any = {
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
  private responseSettings: any = {
    itemSelect: (args: any): void => {
      if (args.command.label === 'Accept') {
        this.isAccepted = true;
        if (this.selectedSpan && this.selectedSpan.parentNode) {
          this.unwrapSelectedSpan();
        } else if (this.savedRange) {
          this.restoreSelection();
          if (this.savedRange) {
            this.savedRange.deleteContents();
            const response: string = (this.inlinePrompt.current?.prompts[
              this.inlinePrompt.current?.prompts.length - 1
            ] as any).response;
            this.savedRange.insertNode(this.createFragmentFromHTML(response));
            this.savedRange = null;
          }
        }
        this.inlinePrompt.current?.hidePopup();
        this.isPopupOpen = false;
      } else if (args.command.label === 'Discard') {
        this.isAccepted = false;
        if (this.selectedSpan && this.selectedSpan.parentNode) {
          this.restoreOriginalSpan();
        }
        this.savedRange = null;
        this.inlinePrompt.current?.hidePopup();
        this.isPopupOpen = false;
      }
    }
  };
  private speechToTextSettings: any = {
    enable: true
  };
  componentDidMount(): void {
    if (this.targetContent.current) {
      this.targetContent.current.addEventListener('mouseup', this.handleMouseUp);
      this.targetContent.current.addEventListener('keyup', this.handleKeyUp);
    }
  }
  componentWillUnmount(): void {
    if (this.targetContent.current) {
      this.targetContent.current.removeEventListener('mouseup', this.handleMouseUp);
      this.targetContent.current.removeEventListener('keyup', this.handleKeyUp);
    }
    if (this.abortController) {
      this.abortController.abort();
    }
  }
  private onClose = (): void => {
    if (!this.isAccepted) {
      if (this.originalContentHTML) {
        this.targetContent.current!.innerHTML = this.originalContentHTML;
      } else if (this.selectedSpan && this.selectedSpan.parentNode) {
        this.restoreOriginalSpan();
      }
    } else if (this.selectedSpan && this.selectedSpan.parentNode) {
      this.unwrapSelectedSpan();
    }
    this.selectedSpan = null;
    this.originalSpanHTML = '';
    this.savedRange = null;
    this.originalContentHTML = '';
    this.isAccepted = false;
    this.isPopupOpen = false;
    window.getSelection()?.removeAllRanges();
  };
  private onPromptRequest = (args: PromptRequestEventArgs): void => {
    const instance = this.inlinePrompt.current;
    if (!instance) return;
    const selectedText: string = this.getSelectedText();
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
    this.abortController = new AbortController();
    if (this.selectedSpan) {
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
            signal: this.abortController!.signal
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
                    if (this.selectedSpan && this.selectedSpan.parentNode && fullText) {
                      instance.addResponse(fullText, true);
                    }
                    return Promise.resolve();
                  }
                  if (!this.selectedSpan || !this.selectedSpan.parentNode) {
                    return Promise.resolve();
                  }
                  const chunk: string = decoder.decode(value, { stream: true });
                  fullText += chunk;
                  const tempDiv = document.createElement('div');
                  tempDiv.textContent = fullText;
                  const plainText: string = tempDiv.textContent || fullText;
                  if (this.selectedSpan) {
                    this.selectedSpan.textContent = plainText;
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
                if (this.selectedSpan) {
                  this.selectedSpan.innerHTML = fallbackResponse;
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
          this.abortController = new AbortController();
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
            signal: this.abortController!.signal
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
  };
  private getSelectedText(): string { return this.savedRange ? this.savedRange.toString() : ''; }
  private createFragmentFromHTML(html: string): DocumentFragment {
    const tempDiv: HTMLDivElement = document.createElement('div');
    tempDiv.innerHTML = html || '';
    const fragment: DocumentFragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }
  private unwrapSelectedSpan(): void {
    if (!this.selectedSpan || !this.selectedSpan.parentNode) {
      return;
    }
    const parent: Node = this.selectedSpan.parentNode;
    const fragment: DocumentFragment = this.createFragmentFromHTML(this.selectedSpan.innerHTML);
    parent.replaceChild(fragment, this.selectedSpan);
    this.selectedSpan = null;
    this.originalSpanHTML = '';
  }
  private restoreOriginalSpan(): void {
    if (!this.selectedSpan || !this.selectedSpan.parentNode) {
      return;
    }
    const parent: Node = this.selectedSpan.parentNode;
    const fragment: DocumentFragment = this.createFragmentFromHTML(this.originalSpanHTML);
    parent.replaceChild(fragment, this.selectedSpan);
    this.selectedSpan = null;
    this.originalSpanHTML = '';
  }
  private handleMouseUp = (): void => {
    if (this.saveSelection()) {
      const selection: Selection | null = window.getSelection();
      const range: Range | null =
        selection && selection.rangeCount ? selection.getRangeAt(0) : null;
      if (range && !range.collapsed) {
        this.originalContentHTML = this.targetContent.current?.innerHTML;
        const wrapper: HTMLSpanElement = document.createElement('span');
        wrapper.className = 'e-inlineaiassist-selected-text';
        const selectedContent: DocumentFragment = range.extractContents();
        wrapper.appendChild(selectedContent);
        range.insertNode(wrapper);
        this.selectedSpan = wrapper;
        this.originalSpanHTML = wrapper.innerHTML;
        this.savedRange = document.createRange();
        this.savedRange.selectNodeContents(this.selectedSpan);
        if (this.inlinePrompt.current) {
          this.inlinePrompt.current.relateTo = this.selectedSpan;
        }
      } else if (this.savedRange && this.inlinePrompt.current) {
        this.inlinePrompt.current.relateTo =
          this.savedRange.startContainer.parentElement || '#targetContent';
      }
      if (this.inlinePrompt.current) {
        this.inlinePrompt.current.dataBind();
        this.inlinePrompt.current.showPopup();
      }
      this.isPopupOpen = true;
    }
  };
  private handleKeyUp = (): void => {
    if (this.saveSelection() && this.isPopupOpen && this.savedRange && this.inlinePrompt.current) {
      this.inlinePrompt.current.relateTo =
        this.savedRange.startContainer.parentElement || '#targetContent';
      this.inlinePrompt.current.dataBind();
    }
  };
  private saveSelection(): boolean {
    const selection: Selection | null = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      this.savedRange = selection.getRangeAt(0).cloneRange();
      return true;
    }
    return false;
  }
  private restoreSelection(): boolean {
    if (!this.savedRange) {
      return false;
    }
    const selection: Selection | null = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(this.savedRange);
    }
    return true;
  }
  render() {
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
            <div id="targetContent" ref={this.targetContent} className="demo-text-area" contentEditable={true}>
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
              ref={this.inlinePrompt}
              commandSettings={this.commandSettings}
              responseMode="Inline"
              relateTo={null as any}
              promptRequest={this.onPromptRequest}
              responseSettings={this.responseSettings}
              speechToTextSettings={this.speechToTextSettings}
              placeholder="Type prompt for meeting assistance..."
              popupWidth="480px"
              popupHeight="auto"
              close={this.onClose}
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
  }
}
