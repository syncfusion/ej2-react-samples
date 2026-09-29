import * as React from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, ToolbarItemClickedEventArgs, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import { DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { SampleBase } from '../common/sample-base';
import * as data from './promptResponseData.json';
import { PropertyPane } from '../common/property-pane';
import { getAIResponse } from '../common/ai-service';
import './ai-loading-indicator.css';

export class LoadingIndicator extends SampleBase<{}, { loadingType: string }> {
    private assistInstance: AIAssistViewComponent;
    abortController: AbortController | undefined;
    private suggestions: string[] = data['defaultSuggestions'];
    private promptsData: any = data['defaultPromptResponseData'];
    private toolSystemPrompt: any = data['toolSystemPrompt'];

    constructor(props: {}) {
        super(props);
        this.state = { loadingType: 'dot' };
    }

    private loadingTypes = [
        { text: 'Dot', value: 'dot' },
        { text: 'Spinner', value: 'spinner' },
        { text: 'Text', value: 'text' },
        { text: 'Text with indicator', value: 'textIndicator' }
    ];

    private toolbarItemClicked = (args: ToolbarItemClickedEventArgs): void => {
        if (args.item.iconCss === 'e-icons e-refresh') {
            this.assistInstance.prompts = [];
            this.assistInstance.promptSuggestions = this.suggestions;
            this.stopResponse();
        }
    };

    private toolbarSettings: ToolbarSettingsModel = {
        items: [
            {
                iconCss: 'e-icons e-refresh',
                align: 'Right'
            }
        ],
        itemClicked: this.toolbarItemClicked
    };

    private onLoadingTypeChanged = (args: ChangeEventArgs): void => {
        this.setState({ loadingType: args.value as string });
    };

    private promptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
        this.abortController = new AbortController();
        const promptData = this.promptsData.find(
            (item: any) => item.prompt === args.prompt
        );

        try {
            const response = await getAIResponse(args, this.abortController);

            this.assistInstance.addPromptResponse(
                response as string ||
                'We could not reach the AI service; please try again later.'
            );
        }
        catch (error) {
            this.assistInstance.addPromptResponse(
                'We could not reach the AI service; please try again later.'
            );
        }
        this.assistInstance.promptSuggestions = promptData?.suggestions || this.suggestions;
    };

    stopResponse = () => {
        if (this.abortController) {
        this.abortController.abort();
        }
    }

    private bannerTemplate = () => {
        return (
            <div className="banner-content">
                <div className="e-icons e-assistview-icon"></div>
                <h3>AI Assistance</h3>
                <i>Explore different loading indicator types displayed while AI-generated responses are being processed.</i>
            </div>
        );
    };

    private responseAnimationTemplate = (): JSX.Element => {
        switch (this.state.loadingType) {
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

    render() {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <div className="col-lg-8">
                        <div className="loading-indicator-aiassistview">
                            <AIAssistViewComponent id="aiAssistView" enableStreaming={true} bannerTemplate={this.bannerTemplate} promptSuggestions={this.suggestions} toolbarSettings={this.toolbarSettings} promptRequest={this.promptRequest} stopRespondingClick={this.stopResponse} responseAnimationTemplate={this.responseAnimationTemplate} ref={(scope) => (this.assistInstance = scope)} />
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
                                            <DropDownListComponent
                                                width="220px"
                                                dataSource={this.loadingTypes}
                                                fields={{ text: 'text', value: 'value' }}
                                                value={this.state.loadingType}
                                                change={this.onLoadingTypeChanged}
                                            />
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
    }
}