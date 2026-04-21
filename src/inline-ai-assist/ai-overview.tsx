import * as React from 'react';
import { InlineAIAssistComponent, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';
import './ai-overview.css';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

interface InlinePromptState {
  selectedCommandText: string;
  isGlobalRequest: boolean;
  isPopupOpen: boolean;
}

export class Overview extends SampleBase<{}, InlinePromptState> {
  private InlineAssistRef: React.RefObject<InlineAIAssistComponent> = React.createRef();
  private emailContentRef: React.RefObject<HTMLDivElement> = React.createRef();
  private sparkleButtonRef: React.RefObject<ButtonComponent> = React.createRef();
  private aiAssistantBtnRef: React.RefObject<ButtonComponent> = React.createRef();
  private currentHoveredParagraph: HTMLElement | null = null;
  // Synchronous ref to reliably track hovered element without state delays
  private currentHoveredParagraphSyncRef: HTMLElement | null = null;
  private abortController: AbortController | undefined;

  private initialEmailContent: string =
    '<p>\nDear Team,\n</p>\n<p>\nI hope this email finds you well. I wanted to provide you with an update on our current project status. We successfully completed Phase 1 last week, and I\'m pleased to share that all deliverables were met according to schedule. The client presentation went well and they expressed satisfaction with our progress.\n</p>\n<p>\nAs we move forward into Phase 2, I would appreciate it if everyone could submit their progress reports by Friday. Additionally, we should schedule a team meeting next week to discuss the upcoming timeline and address any questions or concerns you may have.\n</p>\n<p>\nThank you for your continued dedication and hard work on this project.\n</p>\n<p>\nBest regards,<br>\nProject Management Team\n</p>';

  private commandSettings = {
    commands: [
      {
        id: 'summarize',
        label: 'Summarize',
        tooltip: 'Create a brief summary',
        prompt: 'Summarize the main points',
        iconCss: 'e-icons e-collapse-2'
      },
      {
        id: 'fix-grammar',
        label: 'Fix Grammar',
        tooltip: 'Correct grammar and spelling',
        prompt: 'Fix grammar, spelling, and punctuation errors',
        iconCss: 'e-icons e-grammar-check'
      },
      {
        id: 'make-professional',
        label: 'Make Professional',
        tooltip: 'Transform to formal business tone',
        prompt: 'Rewrite this in a professional, formal business tone',
        iconCss: 'e-icons e-annotation-edit'
      },
      {
        id: 'make-friendly',
        label: 'Make Friendly',
        tooltip: 'Make the tone more casual and friendly',
        prompt: 'Rewrite this in a friendly, casual tone',
        iconCss: 'e-icons e-ai-chat'
      }
    ],
    itemSelect: (args: any): void => {
      this.setState({ selectedCommandText: args.command.label || '' });
    }
  };

  constructor(props: any) {
    super(props);
    this.state = {
      selectedCommandText: '',
      isGlobalRequest: false,
      isPopupOpen: false
    };
  }

  componentDidMount(): void {
    if (this.emailContentRef.current) {
      this.attachHoverEventsToChildren(this.emailContentRef.current);
      this.emailContentRef.current.addEventListener('input', this.handleEmailInput);
      this.emailContentRef.current.addEventListener('mouseleave', this.handleEmailMouseLeave);

      new MutationObserver(this.handleMutations).observe(this.emailContentRef.current, {
        childList: true,
        subtree: true
      });
    }

    if (this.sparkleButtonRef.current && (this.sparkleButtonRef.current as any).element) {
      (this.sparkleButtonRef.current as any).element.addEventListener('click', this.handleSparkleClick);
    }

    if (this.aiAssistantBtnRef.current && (this.aiAssistantBtnRef.current as any).element) {
      (this.aiAssistantBtnRef.current as any).element.addEventListener('click', this.handleAIAssistantClick);
    }
  }

  componentWillUnmount(): void {
    if (this.emailContentRef.current) {
      this.emailContentRef.current.removeEventListener('input', this.handleEmailInput);
      this.emailContentRef.current.removeEventListener('mouseleave', this.handleEmailMouseLeave);
    }

    if (this.sparkleButtonRef.current && (this.sparkleButtonRef.current as any).element) {
      (this.sparkleButtonRef.current as any).element.removeEventListener('click', this.handleSparkleClick);
    }

    if (this.aiAssistantBtnRef.current && (this.aiAssistantBtnRef.current as any).element) {
      (this.aiAssistantBtnRef.current as any).element.removeEventListener('click', this.handleAIAssistantClick);
    }

    if (this.abortController) {
      this.abortController.abort();
    }
  }

  private attachHoverEventsToChildren = (container: HTMLElement): void => {
    Array.from(container.children).forEach((child: Element) => {
      const element = child as HTMLElement;
      // Remove old listener first to avoid duplicates
      const existingListener = (element as any).__hoverListener;
      if (existingListener) {
        element.removeEventListener('mouseenter', existingListener);
      }
      
      // Attach new listener
      const handleMouseEnter = (): void => {
        if (!this.state.isPopupOpen && element.parentElement?.classList.contains('email-body')) {
          this.currentHoveredParagraph = element;
          this.currentHoveredParagraphSyncRef = element;
          this.updateSparkleButtonPosition(element);
        }
      };
      (element as any).__hoverListener = handleMouseEnter;
      element.addEventListener('mouseenter', handleMouseEnter);
    });
  };

  private attachHoverEvent = (element: HTMLElement): void => {
    // Remove old listener first to avoid duplicates
    const existingListener = (element as any).__hoverListener;
    if (existingListener) {
      element.removeEventListener('mouseenter', existingListener);
    }
    
    // Attach new listener
    const handleMouseEnter = (): void => {
      if (!this.state.isPopupOpen && element.parentElement?.classList.contains('email-body')) {
        this.currentHoveredParagraph = element;
        this.currentHoveredParagraphSyncRef = element;
        this.updateSparkleButtonPosition(element);
      }
    };
    (element as any).__hoverListener = handleMouseEnter;
    element.addEventListener('mouseenter', handleMouseEnter);
  };

  private updateSparkleButtonPosition = (element: HTMLElement): void => {
    const sparkleButton = (this.sparkleButtonRef.current as any)?.element as HTMLElement | undefined;
    if (!sparkleButton || !this.emailContentRef.current) return;

    const emailRect = (this.emailContentRef.current.parentElement as HTMLElement).getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const buttonHeight = 30;
    const topPosition = rect.top - emailRect.top + rect.height / 2 - buttonHeight / 2;

    sparkleButton.style.position = 'absolute';
    sparkleButton.style.left = '20px';
    sparkleButton.style.top = topPosition + 'px';
    sparkleButton.style.display = 'block';
  };

  private handleEmailInput = (): void => {
    const sparkleEl = (this.sparkleButtonRef.current as any)?.element as HTMLElement | undefined;
    if (sparkleEl) {
      sparkleEl.style.display = 'none';
    }
  };

  private handleEmailMouseLeave = (e: MouseEvent): void => {
    const sparkleEl = (this.sparkleButtonRef.current as any)?.element as HTMLElement | undefined;
    if (sparkleEl && e.relatedTarget !== sparkleEl && !sparkleEl.matches(':hover')) {
      sparkleEl.style.display = 'none';
    }
  };

  private handleMutations = (mutations: MutationRecord[]): void => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'P') {
          this.attachHoverEvent(node as HTMLParagraphElement);
        }
      });
    });
  };

  private handleSparkleClick = (): void => {
    if (this.currentHoveredParagraph && this.InlineAssistRef.current) {
      this.setState({ isGlobalRequest: false });
      this.InlineAssistRef.current.relateTo = this.currentHoveredParagraph;
      this.InlineAssistRef.current.dataBind();
      this.InlineAssistRef.current.showPopup();
    }
  };

  private handleAIAssistantClick = (): void => {
    if (this.InlineAssistRef.current && this.aiAssistantBtnRef.current) {
      this.setState({ isGlobalRequest: true });
      this.InlineAssistRef.current.relateTo = (this.aiAssistantBtnRef.current as any).element as HTMLElement;
      this.InlineAssistRef.current.dataBind();
      this.InlineAssistRef.current.showPopup();
    }
  };

  private handleSendEmail = (): void => {
    if (this.emailContentRef.current) {
      this.emailContentRef.current.innerHTML = this.initialEmailContent;
      this.attachHoverEventsToChildren(this.emailContentRef.current);
      const sparkleEl = (this.sparkleButtonRef.current as any)?.element as HTMLElement | undefined;
      if (sparkleEl) {
        sparkleEl.style.display = 'none';
      }
    }
  };

  private handlePromptRequest = (args: PromptRequestEventArgs): void => {
    getUserID().then((userID: string) => {
      try {
        this.abortController = new AbortController();
        let contentToProcess: string = '';

        if (this.state.isGlobalRequest) {
          const emailContentElem = this.emailContentRef.current;
          contentToProcess = emailContentElem ? emailContentElem.innerText : '';
        } else if (this.currentHoveredParagraph) {
          contentToProcess = this.currentHoveredParagraph.innerText;
        }

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
                { role: 'user', content: args.prompt + ' ' + contentToProcess }
              ]
            }
          }),
          signal: this.abortController.signal
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
              if (this.InlineAssistRef.current) {
                this.InlineAssistRef.current.addResponse(aiResponse);
              }
            }
          })
          .catch((error: Error) => {
            if (error.name === 'AbortError') {
              return;
            }
            setTimeout(() => {
              const fallbackResponse: string = 'We could not reach the AI service; please try again later.';
              if (this.InlineAssistRef.current) {
                this.InlineAssistRef.current.addResponse(fallbackResponse);
                this.setState({ selectedCommandText: '' });
              }
            }, 1000);
          });
      } catch (error) {
        //catch error
      }
    });
  };

  private handleResponseItemSelect = (args: any): void => {
    if (args.command.label === 'Accept') {
      if (this.state.isGlobalRequest && this.emailContentRef.current) {
        const lastPrompt = this.InlineAssistRef.current?.prompts[
          (this.InlineAssistRef.current?.prompts?.length || 1) - 1
        ] as any;
        if (lastPrompt) {
          this.emailContentRef.current.innerHTML = lastPrompt.response;
          this.attachHoverEventsToChildren(this.emailContentRef.current);
        }
      } else if (this.currentHoveredParagraphSyncRef) {
        // Use synchronous ref to ensure we update the correct paragraph
        const lastPrompt = this.InlineAssistRef.current?.prompts[
          (this.InlineAssistRef.current?.prompts?.length || 1) - 1
        ] as any;
        if (lastPrompt) {
          this.currentHoveredParagraphSyncRef.innerHTML = lastPrompt.response;
        }
      }
      if (this.InlineAssistRef.current) {
        this.InlineAssistRef.current.hidePopup();
      }
    } else if (args.command.label === 'Discard') {
      if (this.InlineAssistRef.current) {
        this.InlineAssistRef.current.hidePopup();
      }
    }
  };

  private handlePopupOpen = (): void => {
    this.setState({ isPopupOpen: true });
  };

  private handlePopupClose = (): void => {
    this.currentHoveredParagraphSyncRef = null;
    this.setState({ isPopupOpen: false, selectedCommandText: '', isGlobalRequest: false });
  };

  render() {
    const responseSettings = {
      itemSelect: this.handleResponseItemSelect
    };

    return (
      <div className="control-pane">
        <div className="control-section">
          <div className="overview-inlineAIAssist">
            <div className="email-container">
              <div className="email-composer e-card">
                <h3 className="demo-title">📧 Email Draft Assistant</h3>
                <div className="email-field e-card-content">
                  <label className="field-label">To:</label>
                  <input
                    type="text"
                    className="field-input e-input"
                    value="team@company.com"
                    readOnly
                  />
                </div>

                <div className="email-field e-card-content">
                  <label className="field-label">Subject:</label>
                  <input
                    type="text"
                    className="field-input e-input"
                    value="Project Update - Q1 Deliverables"
                    readOnly
                  />
                </div>

                <div className="email-field-vertical e-card-content">
                  <div className="message-header">
                    <ButtonComponent
                      ref={this.aiAssistantBtnRef}
                      id="aiAssistantBtn"
                      iconCss="e-icons e-ai-chat"
                      isPrimary={true}
                      title= "AI Assistant"
                    >
                      AI Assistant
                    </ButtonComponent>
                  </div>
                  <div
                    ref={this.emailContentRef}
                    className="email-body"
                    id="emailContent"
                    contentEditable={true}
                    dangerouslySetInnerHTML={{ __html: this.initialEmailContent }}
                  />
                  <ButtonComponent
                    ref={this.sparkleButtonRef}
                    id="sparkleBtn"
                    iconCss="e-icons e-ai-chat"
                    isPrimary={true}
                    style={{ display: 'none' }}
                    title= "AI Assistant"
                  />
                </div>

                <div className="email-actions e-card-content">
                  <ButtonComponent
                    id="sendEmailBtn"
                    title="Send"
                    cssClass="e-primary"
                    onClick={this.handleSendEmail}
                  >
                    Send Email
                  </ButtonComponent>
                </div>
              </div>
            </div>

            <InlineAIAssistComponent
              ref={this.InlineAssistRef}
              id="inlineAssist"
              commandSettings={this.commandSettings}
              relateTo="#emailContent"
              promptRequest={this.handlePromptRequest}
              responseSettings={responseSettings}
              open={this.handlePopupOpen}
              close={this.handlePopupClose}
            />
          </div>
        </div>

        <div id="action-description">
          <p>
            This sample demonstrates the overview functionalities of the Inline AI Assist component in an email draft
            assistant scenario. Users can access AI assistance in two ways: hover over any paragraph to see a sparkle
            button for inline editing, or click the AI Assistant button to enhance the entire email content.
          </p>
        </div>

        <div id="description">
          <p>In this example, the Inline AI Assist component showcases the following key features:</p>
          <ul>
            <li>
              <code>commandSettings</code> - Defines predefined AI commands (Summarize, Fix Grammar, Make Professional,
              Make Friendly)
            </li>
            <li>
              <code>relateTo</code> - Positions the popup relative to the element provided in the relateTo property
            </li>
            <li>
              <code>promptRequest</code> - Processes AI requests and adds responses
            </li>
            <li>
              <code>responseSettings</code> - Handles Accept and Reject actions for AI responses
            </li>
            <li>
              <code>showPopup</code> - Programmatically opens the AI Assist popup
            </li>
            <li>
              <code>open</code> and <code>close</code> - Events for tracking popup state
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
