import * as React from 'react';
import { SampleBase, updateSampleSection } from '../common/sample-base';
import { AIAssistant, AIAssistantPromptRequestArgs, AIAssistantSettingsModel, HtmlEditor, Image, Inject, Link, PasteCleanup, QuickToolbar, QuickToolbarSettingsModel, RichTextEditorComponent, Table, Toolbar, ToolbarSettingsModel, CodeBlock } from '@syncfusion/ej2-react-richtexteditor';
import { AI_SERVICE_URL, getUserID } from '../common/ai-service';
import AIToast from '../common/ai-toast';

export class AIAssistantClassComponent extends SampleBase<{}, {}> {
    private editorRef: RichTextEditorComponent;
    private userID?: string;
    private abortController?: AbortController;

    private toolbarSettings: ToolbarSettingsModel = {
        items: ['AICommands', 'AIQuery', '|', 'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'Alignments', 'Formats', 'OrderedList', 'UnorderedList', 'CheckList', 'CodeBlock',
            'Blockquote', 'CreateLink', 'Image', 'CreateTable', '|', 'SourceCode', '|', 'Undo', 'Redo']
    };

    private quickToolbarSettings: QuickToolbarSettingsModel = {
        text: ['AICommands', 'AIQuery', '|', 'Bold', 'Italic', 'Underline', 'StrikeThrough',
            'Fontcolor', 'BackgroundColor', '|', 'Unorderedlist', 'Orderedlist']
    };

    private aiAssistantSettings: AIAssistantSettingsModel = {
        popupWidth: '550px'
    };

    componentDidMount(): void {
        updateSampleSection();
    }

    async onAIAssistantPromptRequest(args: AIAssistantPromptRequestArgs): Promise<void> {
        this.userID = await getUserID();
        try {
            this.abortController = new AbortController();
            const response: Response = await fetch(AI_SERVICE_URL + '/api/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.userID ?? ''
                },
                body: JSON.stringify({ message: args.prompt + (args.text) }),
                signal: this.abortController.signal
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP Error ${response.status}`);
            }
            const stream: ReadableStream<string> = response.body.pipeThrough(new TextDecoderStream());
            let fullText: string = '';
            for await (const chunk of stream as unknown as AsyncIterable<string>) {
                fullText += chunk;
                this.editorRef.addAIPromptResponse(fullText, false);
            }
            this.editorRef.addAIPromptResponse(fullText, true);
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('AI Request aborted by user.');
                return;
            } else if (typeof error.message === 'string' && error.message.includes('token limit')) {
                this.editorRef.addAIPromptResponse(error.message, false);
                this.editorRef.addAIPromptResponse(error.message, true);
                const banner = document.querySelector('.banner-message') as HTMLElement | null;
                const header = document.querySelector('.sb-header1') as HTMLElement | null;
                if (banner) banner.innerHTML = error.message;
                if (header) header.classList.remove('sb-hide');
            } else {
                console.error('There was a problem with your fetch operation:', error);
            }
        }
    }

    render(): React.ReactNode {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <RichTextEditorComponent id='editor' ref={richtexteditor => { this.editorRef = richtexteditor; }} toolbarSettings={this.toolbarSettings} 
                        quickToolbarSettings={this.quickToolbarSettings} aiAssistantSettings={this.aiAssistantSettings} aiAssistantPromptRequest={this.onAIAssistantPromptRequest.bind(this)}>
                        <p>
                            <strong>Editing and Improving</strong>
                        </p>
                        <p>
                            In today's competitive landscape, effective marketing focuses on building lasting customer relationships
                            rather than just selling products. Brands are expected to provide personalized experiences through data
                            analytics and consumer insights. As expectations evolve, marketers must stay agile and proactive in their
                            strategies.
                        </p>
                        <p>
                            <strong>Tone and style</strong>
                        </p>
                        <p>
                            Agile methodologies are essential in modern project management, particularly in software development.
                            They enable teams to adapt quickly and deliver greater customer value through iterative processes and
                            collaboration. Successful Agile implementation requires fostering a culture of adaptability, trust,
                            and shared ownership.
                        </p>
                        <p>
                            <strong>Grammar</strong>
                        </p>
                        <p>
                            Strong leadership is more than directing a team—it's about inspiring people toward a common vision.
                            Effective leaders cultivate transparency, empathy, and accountability within their organizations.
                            They empower others by encouraging autonomy and providing opportunities for growth. In times of
                            uncertainty or rapid change, it's the leaders who stay grounded and lead with clarity who build the
                            most resilient and high-performing teams.
                        </p>
                        <p>
                            <strong>Summarization, simplification, or elaboration</strong>
                        </p>
                        <p>
                            Strong leadership inspires a team toward a shared vision while promoting transparency, empathy,
                            and accountability. Effective leaders empower others through autonomy and growth. In times of
                            uncertainty or change, clear leaders build resilient, high-performing teams.
                        </p>
                        <Inject services={[AIAssistant, Toolbar, HtmlEditor, QuickToolbar, Image, Table, Link, PasteCleanup, CodeBlock]} />
                    </RichTextEditorComponent>
                </div>
                <div id='action-description'>
                    <p>
                        The AI Assistant feature provides a user interface such as an AssistView inside a popup, nested dropdown with predefined prompts, and a toolbar button for interacting with an
                        AI model.
                    </p>
                </div>
                <div id='description'>
                    <p>
                        The <b>AI Assistant</b> feature provides a predefined user interface for integrating AI capabilities into the Rich Text Editor, enabling users to create, edit, and enhance
                        content more efficiently.
                    </p>
                    <ul>
                        <li>
                            The AI Assistant can be accessed via the keyboard shortcut (<code>Alt + Enter or ⌥ + Enter</code>) or toolbar.
                        </li>
                        <li>
                            The <b>AI Commands</b> menu provides a predefined list of prompts useful for performing common content-related actions such as improving, shortening, elaborating,
                            simplifying, summarizing, and checking grammar.
                        </li>
                        <li>
                            The <b>AI Query </b>button helps to open the AI Assistant with the flexibility to provide a user defined prompt when processing the content.
                        </li>
                    </ul>
                    <p>In this sample the AI Assistant feature is enabled by </p>
                    <ul>
                        <li>
                            Injecting the <code>AIAssistant</code> Service in to the Component <code>providers</code> section.
                        </li>
                        <li>
                            Adding the <code>AICommands</code>, <code>AIQuery</code> into the <code>toolbarSettings</code> items property.
                        </li>
                    </ul>
                    <p>
                        <b>Processing of the Prompt:</b>
                    </p>
                    <ul>
                        <li>
                            When a prompt is executed the <code>aiAssistantPromptRequest</code> event is triggered, followed by a<code>fetch</code> request to the backend service to process the query.
                        </li>
                        <li>
                            The response from the LLM is streamed back into the editor’s Assistant view using the
                            <code>addAIPromptResponse</code> public method.
                        </li>
                        <li>
                            When the Stop Responding button is clicked the streaming process is cancelled by setting the
                            <code>stopStreaming</code> boolean to false.
                        </li>
                    </ul>
                    <p>
                        <b>Injectible Modules:</b>
                    </p>
                    <p>
                        The AI Assistant feature is built as an injectable module to be modular and then tree-shaken and opted in only when needed. It can be used by injecting the module in the{" "}
                        <code>Inject</code> component.
                        <br />
                        For example: The <code>AIAssistant</code> service can be injected by using the <code>Inject</code>
                        component with the services array:
                    </p>
                </div>
                <AIToast></AIToast>
            </div>
        );
    }
}
