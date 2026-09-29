import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { getUserID, AI_SERVICE_URL } from '../common/ai-service';
import './ai-thinking.css';
import { AIAssistViewComponent, PromptRequestEventArgs, AIAssistView, AssistThinking } from '@syncfusion/ej2-react-interactive-chat';

AIAssistView.Inject(AssistThinking);

const Thinking = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const bannerTemplate: string = `<div class="banner-content">
        <div class="e-icons e-brain"></div>
        <h3>💭 Thinking Support</h3>
        <i>Break down complex problems and think through decisions.</i>
    </div>`;

    const promptSuggestions: string[] = [
        'Build a modern dashboard for my business',
        'Create a login page with validation',
        'Make a task management board'
    ];

    const assistInstance = useRef<AIAssistViewComponent>(null);
    const abortController = useRef<AbortController | undefined>();

    const promptRequest = async (args: PromptRequestEventArgs) => {
        const assistView = assistInstance.current;
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

        // STEP 1: show initial thinking
        assistView.addPromptResponse(
            { blocks: [partialThinkingBlocks] },
            false
        );

        try {
            const userID = await getUserID();

            if (!userID) return;

            abortController.current = new AbortController();

            const requestBody = {
                visitorId: userID,
                messages: {
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: args.prompt }
                    ]
                },
                reasoning: {
                    effort: 'medium',
                    summary: 'concise'
                }
            };

            const response = await fetch(AI_SERVICE_URL + '/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal: abortController.current.signal
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP Error ${response.status}`);
            }

            const result = await response.json();

            let responseText = '';

            if (result?.response) {
                responseText = result.response.replace('END_INSERTION', '');
            }

            assistView.addPromptResponse(
                {
                    blocks: [finalThinkingBlocks],
                    response: responseText || 'We could not reach the AI service; please try again later.'
                }
            );

        } catch (error: any) {
            if (error?.name === 'AbortError') return;

            if (error?.message?.includes('token limit')) {
                assistView.addPromptResponse({ response: error.message });
            }

            assistView.addPromptResponse({
                response: 'We could not reach the AI service; please try again later.'
            });
        }
    };

    const stopResponse = () => {
        if (abortController.current) {
        abortController.current.abort();
        }
    }

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="thinking-aiassistview">
                    <AIAssistViewComponent
                        id="aiAssistView"
                        bannerTemplate={bannerTemplate}
                        promptSuggestions={promptSuggestions}
                        promptRequest={promptRequest}
                        stopRespondingClick={stopResponse}
                        enableStreaming={true}
                        ref={assistInstance}>
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
};
export default Thinking;