import * as React from 'react';
import { useEffect } from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { InlineAIAssistComponent, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service'
import './ai-overview.css';

const initialEmailContent: string =
  '<p>\nDear Team,\n</p>\n<p>\nI hope this email finds you well. I wanted to provide you with an update on our current project status. We successfully completed Phase 1 last week, and I\'m pleased to share that all deliverables were met according to schedule. The client presentation went well and they expressed satisfaction with our progress.\n</p>\n<p>\nAs we move forward into Phase 2, I would appreciate it if everyone could submit their progress reports by Friday. Additionally, we should schedule a team meeting next week to discuss the upcoming timeline and address any questions or concerns you may have.\n</p>\n<p>\nThank you for your continued dedication and hard work on this project.\n</p>\n<p>\nBest regards,<br>\nProject Management Team\n</p>';

const commandSettings = {
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
    // Command selection handled in component state
  }
};

const Overview = () => {
  useEffect(() => {
      updateSampleSection();
  }, []);
  const [selectedCommandText, setSelectedCommandText] = React.useState<string>('');
  const [isGlobalRequest, setIsGlobalRequest] = React.useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);

  const inlineAssistRef = React.useRef<InlineAIAssistComponent | null>(null);
  const emailContentRef = React.useRef<HTMLDivElement>(null);
  const sparkleButtonRef = React.useRef<ButtonComponent | null>(null);
  const aiAssistantBtnRef = React.useRef<ButtonComponent | null>(null);
  const currentHoveredParagraphRef = React.useRef<HTMLElement | null>(null);
  const abortControllerRef = React.useRef<AbortController | undefined>();
  // Synchronous ref to reliably track hovered element without state delays
  const currentHoveredParagraphSyncRef = React.useRef<HTMLElement | null>(null);

  const attachHoverEvent = React.useCallback((element: HTMLElement): void => {
    const handleMouseEnter = (): void => {
      if (!isPopupOpen && element.parentElement?.classList.contains('email-body')) {
        currentHoveredParagraphRef.current = element;
        currentHoveredParagraphSyncRef.current = element;
        updateSparkleButtonPosition(element);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
  }, [isPopupOpen]);

  const attachHoverEventsToChildren = React.useCallback((container: HTMLElement): void => {
    Array.from(container.children).forEach((child: Element) => {
      const element = child as HTMLElement;
      // Remove old listener first to avoid duplicates
      const existingListener = (element as any).__hoverListener;
      if (existingListener) {
        element.removeEventListener('mouseenter', existingListener);
      }
      
      // Attach new listener
      const handleMouseEnter = (): void => {
        if (!isPopupOpen && element.parentElement?.classList.contains('email-body')) {
          currentHoveredParagraphRef.current = element;
          currentHoveredParagraphSyncRef.current = element;
          updateSparkleButtonPosition(element);
        }
      };
      (element as any).__hoverListener = handleMouseEnter;
      element.addEventListener('mouseenter', handleMouseEnter);
    });
  }, [isPopupOpen]);

  const updateSparkleButtonPosition = React.useCallback((element: HTMLElement): void => {
    const sparkleButton = sparkleButtonRef.current?.element;
    if (!sparkleButton || !emailContentRef.current?.parentElement) return;

    const emailRect = emailContentRef.current.parentElement.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const buttonHeight = 30;
    const topPosition = rect.top - emailRect.top + rect.height / 2 - buttonHeight / 2;

    sparkleButton.style.position = 'absolute';
    sparkleButton.style.left = '20px';
    sparkleButton.style.top = topPosition + 'px';
    sparkleButton.style.display = 'block';
  }, []);

  const handleEmailInput = React.useCallback((): void => {
    const sparkleButton = sparkleButtonRef.current?.element;
    if (sparkleButton) {
      sparkleButton.style.display = 'none';
    }
  }, []);

  const handleEmailMouseLeave = React.useCallback((e: MouseEvent): void => {
    const sparkleButton = sparkleButtonRef.current?.element;
    if (sparkleButton && e.relatedTarget !== sparkleButton && !sparkleButton.matches(':hover')) {
      sparkleButton.style.display = 'none';
    }
  }, []);

  const handleMutations = React.useCallback(
    (mutations: MutationRecord[]): void => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            attachHoverEvent(node as HTMLElement);
          }
        });
      });
    },
    [attachHoverEvent]
  );

  React.useEffect(() => {
    if (emailContentRef.current) {
      attachHoverEventsToChildren(emailContentRef.current);
      emailContentRef.current.addEventListener('input', handleEmailInput);
      emailContentRef.current.addEventListener('mouseleave', handleEmailMouseLeave);

      const mutationObserver = new MutationObserver(handleMutations);
      mutationObserver.observe(emailContentRef.current, { childList: true, subtree: true });

      return () => {
        emailContentRef.current?.removeEventListener('input', handleEmailInput);
        emailContentRef.current?.removeEventListener('mouseleave', handleEmailMouseLeave);
        mutationObserver.disconnect();
      };
    }
  }, [attachHoverEventsToChildren, handleEmailInput, handleEmailMouseLeave, handleMutations]);

  const handleSparkleClick = React.useCallback((): void => {
    if (currentHoveredParagraphRef.current && inlineAssistRef.current) {
      setIsGlobalRequest(false);
      inlineAssistRef.current.relateTo = currentHoveredParagraphRef.current;
      inlineAssistRef.current.dataBind();
      inlineAssistRef.current.showPopup();
    }
  }, []);

  const handleAIAssistantClick = React.useCallback((): void => {
    if (inlineAssistRef.current && aiAssistantBtnRef.current) {
      setIsGlobalRequest(true);
      inlineAssistRef.current.relateTo = aiAssistantBtnRef.current.element;
      inlineAssistRef.current.dataBind();
      inlineAssistRef.current.showPopup();
    }
  }, []);

  const handleSendEmail = React.useCallback((): void => {
    if (emailContentRef.current) {
      emailContentRef.current.innerHTML = initialEmailContent;
      attachHoverEventsToChildren(emailContentRef.current);
      const sparkleButton = sparkleButtonRef.current?.element;
      if (sparkleButton) {
        sparkleButton.style.display = 'none';
      }
    }
  }, [attachHoverEventsToChildren]);

  const handlePromptRequest = React.useCallback(
    (args: PromptRequestEventArgs): void => {
      getUserID().then((userID: string) => {
        try {
          abortControllerRef.current = new AbortController();
          let contentToProcess: string = '';

          if (isGlobalRequest) {
            const emailContentElem = emailContentRef.current;
            contentToProcess = emailContentElem ? emailContentElem.innerText : '';
          } else if (currentHoveredParagraphRef.current) {
            contentToProcess = currentHoveredParagraphRef.current.innerText;
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
                if (inlineAssistRef.current) {
                  inlineAssistRef.current.addResponse(aiResponse);
                }
              }
            })
            .catch((error: Error) => {
              if (error.name === 'AbortError') {
                return;
              }
              setTimeout(() => {
                const fallbackResponse: string = 'We could not reach the AI service; please try again later.';
                if (inlineAssistRef.current) {
                  inlineAssistRef.current.addResponse(fallbackResponse);
                  setSelectedCommandText('');
                }
              }, 1000);
            });
        } catch (error) {
          //catch error
        }
      });
    },
    [isGlobalRequest]
  );

  const handleResponseItemSelect = React.useCallback((args: any): void => {
    if (args.command.label === 'Accept') {
      if (isGlobalRequest && emailContentRef.current) {
        const lastPrompt = inlineAssistRef.current?.prompts[
          (inlineAssistRef.current?.prompts?.length || 1) - 1
        ] as any;
        if (lastPrompt) {
          emailContentRef.current.innerHTML = lastPrompt.response;
          attachHoverEventsToChildren(emailContentRef.current);
        }
      } else if (currentHoveredParagraphSyncRef.current) {
        // Use synchronous ref to ensure we update the correct paragraph
        const lastPrompt = inlineAssistRef.current?.prompts[
          (inlineAssistRef.current?.prompts?.length || 1) - 1
        ] as any;
        if (lastPrompt) {
          currentHoveredParagraphSyncRef.current.innerHTML = lastPrompt.response;
        }
      }
      if (inlineAssistRef.current) {
        inlineAssistRef.current.hidePopup();
      }
    } else if (args.command.label === 'Discard') {
      if (inlineAssistRef.current) {
        inlineAssistRef.current.hidePopup();
      }
    }
  }, [isGlobalRequest, attachHoverEventsToChildren]);

  const responseSettings = {
    itemSelect: handleResponseItemSelect
  };

  // click handlers are attached via ButtonComponent onClick props

  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Update commandSettings itemSelect with current state
  React.useMemo(() => {
    commandSettings.itemSelect = (args: any) => {
      setSelectedCommandText(args.command.label || '');
    };
  }, []);

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="overview-inlineAIAssist">
          <div className="email-container">
            <div className="email-composer e-card">
              <h3 className="demo-title">📧 Email Draft Assistant</h3>
              <div className="email-field e-card-content">
                <label className="field-label">To:</label>
                <input type="text" className="field-input e-input" value="team@company.com" readOnly />
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
                      ref={aiAssistantBtnRef}
                      id="aiAssistantBtn"
                      title="AI Assistant"
                      iconCss="e-icons e-ai-chat"
                      isPrimary={true}
                      onClick={handleAIAssistantClick}
                    >
                      AI Assistant
                    </ButtonComponent>
                </div>
                <div
                  ref={emailContentRef}
                  className="email-body"
                  id="emailContent"
                  contentEditable={true}
                  dangerouslySetInnerHTML={{ __html: initialEmailContent }}
                />
                <ButtonComponent
                  ref={sparkleButtonRef}
                  id="sparkleBtn"
                  title="AI Assistant"
                  iconCss="e-icons e-ai-chat"
                  isPrimary={true}
                  style={{ display: 'none' }}
                  onClick={handleSparkleClick}
                />
              </div>

              <div className="email-actions e-card-content">
                <ButtonComponent id="sendEmailBtn" title="Send" cssClass="e-primary" onClick={handleSendEmail}>
                  Send Email
                </ButtonComponent>
              </div>
            </div>
          </div>

          <InlineAIAssistComponent
            ref={inlineAssistRef}
            id="inlineAssist"
            commandSettings={commandSettings}
            relateTo="#emailContent"
            promptRequest={handlePromptRequest}
            responseSettings={responseSettings}
            open={() => setIsPopupOpen(true)}
            close={() => {
              currentHoveredParagraphSyncRef.current = null;
              setIsPopupOpen(false);
              setSelectedCommandText('');
              setIsGlobalRequest(false);
            }}
          />
        </div>
      </div>

      <div id="action-description">
        <p>
          This sample demonstrates the overview functionalities of the Inline AI Prompt component in an email draft
          assistant scenario. Users can access AI assistance in two ways: hover over any paragraph to see a sparkle
          button for inline editing, or click the AI Assistant button to enhance the entire email content.
        </p>
      </div>

      <div id="description">
        <p>In this example, the Inline AI Prompt component showcases the following key features:</p>
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
};

export default Overview;
