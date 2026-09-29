import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, AIAssistView, AssistThinking } from '@syncfusion/ej2-react-interactive-chat';
import { SampleBase } from '../common/sample-base';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';
import './ai-thinking.css';

AIAssistView.Inject(AssistThinking);

export class Thinking extends SampleBase<{}, {}> {
    assistInstance: AIAssistViewComponent;
    abortController: AbortController | undefined;

    bannerTemplate: string = `<div class="banner-content">
        <div class="e-icons e-brain"></div>
        <h3>💭 Thinking Support</h3>
        <i>Break down complex problems and think through decisions.</i>
    </div>`;

    promptSuggestions: string[] = [
        'Suggest ways to improve decision making',
        'Explain how climate change affects everyday life'
    ];

    promptRequest = async (args: PromptRequestEventArgs) => {
        const assistView = this.assistInstance;
        const partialThinkingBlocks = {
            blockType: 'thinking',
            title: 'Thinking',
            collapsible: true,
            collapsed: true,
            isActive: true,
            stages: [
                {
                    status: 'inprogress',
                    content: 'Analyzing your request to deliver the most relevant response'
                }
            ]
        };

        const finalThinkingBlocks = {
            blockType: 'thinking',
            title: 'Thinking',
            collapsible: true,
            collapsed: true,
            isActive: false,
            stages: [
                {
                    status: 'completed',
                    content: 'Completed analysis and generated the most relevant response'
                }
            ]
        };

        assistView.addPromptResponse(
            { blocks: [partialThinkingBlocks] },
            false
        );

        try {
            const userID = await getUserID();

            if (!userID) {
                return;
            }

            this.abortController = new AbortController();

            const requestBody = {
                visitorId: userID,
                messages: {
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant.'
                        },
                        {
                            role: 'user',
                            content: args.prompt
                        }
                    ]
                },
                reasoning: {
                    effort: 'medium',
                    summary: 'concise'
                }
            };

            const response = await fetch(AI_SERVICE_URL + '/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: this.abortController.signal
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || ('HTTP Error ' + response.status));
            }

            const result = await response.json();

            let responseText = '';

            if (result && result.response) {
                responseText = result.response.replace('END_INSERTION', '');
            }

            assistView.addPromptResponse(
                {
                    blocks: [finalThinkingBlocks],
                    response: responseText || 'We could not reach the AI service; please try again later.'
                }
            );

            // next step: final thinking block + response

        } catch (error: any) {
            if (error?.name === 'AbortError') {
                return;
            } 
            else if (error?.message && error.message.indexOf('token limit') !== -1) {
                assistView.addPromptResponse({ response: error.message });
            }
        
            assistView.addPromptResponse({
                response: 'We could not reach the AI service; please try again later.'
            });
        }
    };

    stopResponse = () => {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    render() {
        return (
            <div className='control-pane'>
                <div className="control-section">
                    <div className="thinking-aiassistview">
                        <AIAssistViewComponent
                            id="aiAssistView"
                            bannerTemplate={this.bannerTemplate}
                            promptSuggestions={this.promptSuggestions}
                            promptRequest={this.promptRequest}
                            stopRespondingClick={this.stopResponse}
                            enableStreaming={true}
                            ref={aiassistView => (this.assistInstance = aiassistView)}>
                        </AIAssistViewComponent>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the thinking support of the AI AssistView control.</p>
                </div>
                <div id="description">
                    <p>In this example, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#bannertemplate">bannerTemplate</a> customizes the banner content with a brain icon, and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptsuggestions">promptSuggestions</a> provides AI prompt suggestions. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview#promptrequest">promptRequest</a> handles prompt requests and demonstrates progressive thinking blocks with multiple stages showing the AI's reasoning process through different steps like understanding, component selection, layout design, and finalization.</p>
                </div>
            </div>
        );
    }
}