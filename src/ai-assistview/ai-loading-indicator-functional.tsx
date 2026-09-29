import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import * as data from './promptResponseData.json';
import { PropertyPane } from '../common/property-pane';
import { getAIResponse } from '../common/ai-service';
import './ai-loading-indicator.css';

const LoadingIndicator = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);

    const assistInstance = useRef<AIAssistViewComponent>(null);
    const suggestions: string[] = data['defaultSuggestions'];
    const promptsData: any = data['defaultPromptResponseData'];
    const toolSystemPrompt: any = data['toolSystemPrompt'];
    const [selectedLoadingType, setSelectedLoadingType] = useState<string>('dot');
    const abortControllerRef = useRef<AbortController | undefined>();

    const loadingTypes = [
        { text: 'Dot', value: 'dot' },
        { text: 'Spinner', value: 'spinner' },
        { text: 'Text', value: 'text' },
        { text: 'Text with indicator', value: 'textIndicator' }
    ];

    const toolbarItemClicked = (args: ToolbarItemClickedEventArgs): void => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            assistInstance.current.prompts = [];
            assistInstance.current.promptSuggestions = suggestions;
            stopResponse();
        }
    };

    const toolbarSettingsRef = useRef<ToolbarSettingsModel>({
        items: [
            {
                iconCss: 'e-icons e-refresh',
                align: 'Right'
            }
        ],
        itemClicked: toolbarItemClicked
    });

    const onLoadingTypeChanged = (args: ChangeEventArgs): void => {
        setSelectedLoadingType(args.value as string);
    };

    const promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
        abortControllerRef.current = new AbortController();
        const promptData = promptsData.find(
            (item: any) => item.prompt === args.prompt
        );
        try {
            const response = await getAIResponse(args, abortControllerRef.current);
            assistInstance.current.addPromptResponse(
                response as string ||
                'We could not reach the AI service; please try again later.'
            );
        }
        catch (error) {
            assistInstance.current.addPromptResponse(
                'We could not reach the AI service; please try again later.'
            );
        }
        if (assistInstance.current) {
            assistInstance.current.promptSuggestions = promptData?.suggestions || suggestions;;
        }
    };

    const stopResponse = () => {
        if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        }
    }

    const bannerTemplate = () => (
        <div className="banner-content">
            <div className="e-icons e-assistview-icon"></div>
            <h3>AI Assistance</h3>
            <i>Explore different loading indicator types displayed while AI-generated responses are being processed.</i>
        </div>
    );

    const responseAnimationTemplate = () => {
        switch (selectedLoadingType) {
            case 'dot':
                return (
                    <div className="assistview-dot-loading">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                );

            case 'spinner':
                return (
                    <div className="assistview-spinner-loading">
                        <div className="spinner"></div>
                    </div>
                );

            case 'text':
                return (
                    <div className="assistview-status-loading">
                        <span className="status-1">🧠 Understanding request...</span>
                        <span className="status-2">✍️ Drafting response...</span>
                        <span className="status-3">🚀 Almost ready...</span>
                    </div>
                );

            default:
                return (
                    <div className="assistview-text-indicator">
                        <span>Generating</span>
                        <div className="assistview-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className='control-pane'>
            <div className="control-section">
                <div className="col-lg-8">
                    <div className="loading-indicator-aiassistview">
                       <AIAssistViewComponent id="aiAssistView" ref={assistInstance} enableStreaming={true} promptSuggestions={suggestions} bannerTemplate={bannerTemplate} toolbarSettings={toolbarSettingsRef.current} promptRequest={promptRequest} stopRespondingClick={stopResponse} responseAnimationTemplate={responseAnimationTemplate} />
                    </div>
                </div>
                <div className="col-lg-4 property-section loading-indicator-property-section">
                        <PropertyPane title='Properties'>
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="loading-type-label">Loading Types</div>
                                    </td>
                                    <td>
                                        <DropDownListComponent width="220px" dataSource={loadingTypes} fields={{ text: 'text', value: 'value' }} value={selectedLoadingType} change={onLoadingTypeChanged} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                <p>
                    This sample demonstrates the loading indicator styles that can be displayed while the AI AssistView is generating a response.
                </p>
                </div>

                <div id="description">
                    <p>In this example, a custom loading indicator can be rendered while the AI response is being generated. The selected loading type is shown before the actual response is rendered using the <code>responseAnimationTemplate</code> property and removed once the response is added.</p>
                    <ul>
                        <li><strong>Dot type:</strong> Three continuously blinking dots with a smooth scale and opacity animation.</li>
                        <li><strong>Spinner type:</strong> A single circular spinner rotating continuously until response is fetched.</li>
                        <li><strong>Text type:</strong> Status messages that cycle through three stages: "🧠 Understanding request..." → "✍️ Drafting response..." → "🚀 Almost ready...".</li>
                        <li><strong>Text with indicator type:</strong> "Generating" text by three animated dots a waiting indicator until AI response is received.</li>
                    </ul>
                    <p>Switch the dropdown items in the property pane to preview each loading animation and <a href="https://ej2.syncfusion.com/react/documentation/api/ai-assistview/toolbarsettings" target="_blank">toolbarSettings</a> adds custom toolbar items like a right-aligned Refresh button.</p>
                </div>

            </div>
            </div>
    );
};

export default LoadingIndicator;