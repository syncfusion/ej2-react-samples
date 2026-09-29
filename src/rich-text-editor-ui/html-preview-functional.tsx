import * as React from 'react';
import './html-preview.css';
import { Browser } from '@syncfusion/ej2-base';
import { RichTextEditorUIComponent } from '@syncfusion/ej2-react-richtexteditor-ui';
import { Splitter } from '@syncfusion/ej2-react-layouts';
import { updateSampleSection } from '../common/sample-base';

let CodeMirror: any;
let codemirrorPromise: Promise<any> | null = null;

function loadCodeMirror(): Promise<any> {
    if (codemirrorPromise) { return codemirrorPromise; }
    codemirrorPromise = import('codemirror').then((mod: any) => {
        CodeMirror = mod.default || mod;
        return import('codemirror/mode/htmlmixed/htmlmixed.js');
    });
    return codemirrorPromise;
}

const initialValue: string =
    '<h3>Welcome to the HTML real-time live editor!</h3>' +
    '<p>Create and edit the valid HTML code simply! You don\'t worry about the HTML syntax to format your text content. ' +
    'The WYSIWYG editor (left side view) provides the toolbar to make format text and insert images, tables, and more options.</p>' +
    '<h4>Don\'t worry about syntax</h4>' +
    '<p>The content editing works bi-directional: you can write the HTML code on the right-side view (code view), ' +
    'and changes will reflect in the WYSIWYG editor.</p>';

function HtmlPreview() {
    const rteRef = React.useRef<RichTextEditorUIComponent | null>(null);
    const splitRef = React.useRef<Splitter | null>(null);
    const codeMirrorRef = React.useRef<any>(null);

    React.useEffect(() => {
        updateSampleSection();
        loadCodeMirror().then(() => {
            // Initialize after CodeMirror is available
            setTimeout(() => syncEditorToCodeMirrorRef.current && syncEditorToCodeMirrorRef.current(), 0);
        });
        return () => {
            if (splitRef.current) {
                try { splitRef.current.destroy(); } catch { /* noop */ }
                splitRef.current = null;
            }
        };
    }, []);

    const syncEditorToCodeMirrorRef = React.useRef<() => void>();
    const handleCodeMirrorChangeRef = React.useRef<() => void>();

    const syncEditorToCodeMirror = (): void => {
        const sourceCodeContainer = document.querySelector('.html-preview-source-pane') as HTMLElement;
        if (!sourceCodeContainer || !rteRef.current || !CodeMirror) { return; }

        const rteHtml: string = rteRef.current.getHtml();

        if (!codeMirrorRef.current) {
            codeMirrorRef.current = CodeMirror(sourceCodeContainer, {
                value: rteHtml,
                lineNumbers: true,
                mode: 'text/html',
                lineWrapping: true,
                readOnly: true
            });
            codeMirrorRef.current.on('change', () => handleCodeMirrorChangeRef.current && handleCodeMirrorChangeRef.current());
        } else if (!codeMirrorRef.current.hasFocus() && codeMirrorRef.current.getValue() !== rteHtml) {
            const cursor = codeMirrorRef.current.getCursor();
            codeMirrorRef.current.setValue(rteHtml);
            codeMirrorRef.current.setCursor(cursor);
        }
    };
    syncEditorToCodeMirrorRef.current = syncEditorToCodeMirror;

    const handleCodeMirrorChange = (): void => {
        if (codeMirrorRef.current && rteRef.current &&
            codeMirrorRef.current.getValue() !== rteRef.current.getHtml()) {
            rteRef.current.value = codeMirrorRef.current.getValue();
            rteRef.current.dataBind();
        }
    };
    handleCodeMirrorChangeRef.current = handleCodeMirrorChange;

    const handleSplitterCreated = (): void => {
        if (Browser.isDevice && splitRef.current) {
            splitRef.current.orientation = 'Vertical';
            const headerEl = document.querySelector('.html-preview-header') as HTMLElement;
            if (headerEl) {
                headerEl.style.width = 'auto';
            }
        }
    };

    const copyHtmlToClipboard = (): void => {
        const html: string = codeMirrorRef.current ? codeMirrorRef.current.getValue() :
            (rteRef.current ? rteRef.current.getHtml() : '');
        if (!html) { return; }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(html).catch(() => { /* ignore */ });
        }
    };

    return (
        <div className="control-pane">
            <div className="control-section">
                <div id="html-preview-splitter" ref={(el) => {
                    if (el && !splitRef.current) {
                        splitRef.current = new Splitter({
                            height: '450px',
                            width: '100%',
                            paneSettings: [
                                { resizable: true, size: '50%', min: '40%' },
                                { min: '40%' }
                            ],
                            created: handleSplitterCreated
                        });
                        splitRef.current.appendTo('#html-preview-splitter');
                    }
                }}>
                    <div className="html-preview-editor-pane">
                        <div id="editor">
                            <RichTextEditorUIComponent
                                ref={rteRef}
                                height="100%"
                                valueFormat="html"
                                value={initialValue}
                                saveInterval={1}
                                created={syncEditorToCodeMirror}
                                actionComplete={syncEditorToCodeMirror}
                                change={syncEditorToCodeMirror}
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
                                    onClick={copyHtmlToClipboard}
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

export default HtmlPreview;
