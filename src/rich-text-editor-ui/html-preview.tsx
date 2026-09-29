import * as React from 'react';
import './html-preview.css';
import { Browser } from '@syncfusion/ej2-base';
import { RichTextEditorUIComponent, RichTextEditorUI } from '@syncfusion/ej2-react-richtexteditor-ui';
import { Splitter } from '@syncfusion/ej2-react-layouts';
import { SampleBase } from '../common/sample-base';

type CodeMirrorEditor = any;
let CodeMirror: any;

export class HtmlPreview extends SampleBase<{}, {}> {
    private rteObj: RichTextEditorUIComponent | null = null;
    private splitObj: Splitter | null = null;
    private codeMirrorObj: CodeMirrorEditor | null = null;

    private initialValue: string =
        '<h3>Welcome to the HTML real-time live editor!</h3>' +
        '<p>Create and edit the valid HTML code simply! You don\'t worry about the HTML syntax to format your text content. ' +
        'The WYSIWYG editor (left side view) provides the toolbar to make format text and insert images, tables, and more options.</p>' +
        '<h4>Don\'t worry about syntax</h4>' +
        '<p>The content editing works bi-directional: you can write the HTML code on the right-side view (code view), ' +
        'and changes will reflect in the WYSIWYG editor.</p>';

    public componentDidMount(): void {
        super.componentDidMount && super.componentDidMount();
        if (typeof window !== 'undefined') {
            // Load CodeMirror on the client only.
            import('codemirror')
                .then((mod: any) => {
                    CodeMirror = mod.default || mod;
                    return import('codemirror/mode/htmlmixed/htmlmixed.js');
                })
                .then(() => {
                    this.initializeCodeMirror();
                });
        }
    }

    public componentWillUnmount(): void {
        if (this.splitObj) {
            this.splitObj.destroy();
            this.splitObj = null;
        }
    }

    private setRteObj = (scope: RichTextEditorUIComponent | null): void => {
        this.rteObj = scope;
    };

    private handleSplitterCreated = (): void => {
        if (Browser.isDevice && this.splitObj) {
            this.splitObj.orientation = 'Vertical';
            const headerEl = document.querySelector('.html-preview-header') as HTMLElement;
            if (headerEl) {
                headerEl.style.width = 'auto';
            }
        }
    };

    private initializeCodeMirror = (): void => {
        this.syncEditorToCodeMirror();
    };

    private onActionComplete = (): void => {
        this.syncEditorToCodeMirror();
    };

    private onChange = (): void => {
        this.syncEditorToCodeMirror();
    };

    private syncEditorToCodeMirror = (): void => {
        const sourceCodeContainer = document.querySelector('.html-preview-source-pane') as HTMLElement;
        if (!sourceCodeContainer || !this.rteObj || !CodeMirror) { return; }

        const rteHtml: string = this.rteObj.getHtml();

        if (!this.codeMirrorObj) {
            this.codeMirrorObj = CodeMirror(sourceCodeContainer, {
                value: rteHtml,
                lineNumbers: true,
                mode: 'text/html',
                lineWrapping: true,
                readOnly: true
            });

            this.codeMirrorObj.on('change', this.handleCodeMirrorChange);
        } else if (!this.codeMirrorObj.hasFocus() && this.codeMirrorObj.getValue() !== rteHtml) {
            const cursor = this.codeMirrorObj.getCursor();
            this.codeMirrorObj.setValue(rteHtml);
            this.codeMirrorObj.setCursor(cursor);
        }
    };

    private handleCodeMirrorChange = (): void => {
        if (this.codeMirrorObj && this.rteObj &&
            this.codeMirrorObj.getValue() !== this.rteObj.getHtml()) {
            this.rteObj.value = this.codeMirrorObj.getValue();
            this.rteObj.dataBind();
        }
    };

    private copyHtmlToClipboard = (): void => {
        const html: string = this.codeMirrorObj ? this.codeMirrorObj.getValue() :
            (this.rteObj ? this.rteObj.getHtml() : '');
        if (!html) { return; }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(html).catch(() => { /* ignore */ });
        }
    };

    public render(): JSX.Element {
        return (
            <div className="control-pane">
                <div className="control-section">
                    <div id="html-preview-splitter" ref={(el) => {
                        if (el && !this.splitObj) {
                            this.splitObj = new Splitter({
                                height: '450px',
                                width: '100%',
                                paneSettings: [
                                    { resizable: true, size: '50%', min: '40%' },
                                    { min: '40%' }
                                ],
                                created: this.handleSplitterCreated
                            });
                            this.splitObj.appendTo('#html-preview-splitter');
                        }
                    }}>
                        <div className="html-preview-editor-pane">
                            <div id="editor">
                                <RichTextEditorUIComponent
                                    ref={this.setRteObj}
                                    height="100%"
                                    valueFormat="html"
                                    value={this.initialValue}
                                    saveInterval={1}
                                    created={this.initializeCodeMirror}
                                    actionComplete={this.onActionComplete}
                                    change={this.onChange}
                                    toolbarSettings={{
                                        enableFloating: false,
                                        items: [
                                            'Bold', 'Italic', 'Underline',
                                            'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                                            'Formats',
                                            'Outdent', 'Indent',
                                            'Link', 'Image', 'Table', '|', 'Undo', 'Redo'
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                        <div className="html-preview-header">
                            <div className="html-preview-header-title">
                                <div className="html-preview-header-content">
                                    <h6 className="html-preview-title"><b>HTML SOURCE</b></h6>
                                    <button
                                        id="copyHtmlBtn"
                                        className="e-btn e-flat"
                                        title="Copy HTML to clipboard"
                                        onClick={this.copyHtmlToClipboard}
                                    >
                                        <span className="e-icons e-btn-icon e-copy"></span> Copy
                                    </button>
                                </div>
                            </div>
                            <div className="html-preview-source-pane"></div>
                        </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>
                        This sample demonstrates the HTML preview feature of the
                        Rich Text Editor UI. It pairs the WYSIWYG editor with a
                        live, two-way HTML source view (powered by CodeMirror) so
                        that content changes are reflected in real time and the
                        generated HTML can be inspected and edited directly.
                    </p>
                </div>

                <div id="description">
                    <p>
                        The Rich Text Editor UI lets users author content in a
                        familiar What-You-See-Is-What-You-Get (WYSIWYG) editor.
                        The <code>actionComplete</code> and <code>change</code>{' '}
                        events sync the latest HTML markup to a CodeMirror
                        instance on the right. Editing the source view updates
                        the editor through the <code>value</code> binding,
                        delivering a true bi-directional editing experience.
                        Use the <strong>Copy</strong> button to copy the current
                        HTML markup to the clipboard.
                    </p>
                </div>
            </div>
        );
    }
}
type _ = RichTextEditorUI;
